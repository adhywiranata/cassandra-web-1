package main

import (
	"net/http"
	"os"
	"strconv"

	"github.com/gocql/gocql"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
	"github.com/spf13/viper"
	"github.com/urfave/cli"
)

const (
	SystemSchemaKey = "system_schema"
)

var env envStruct

// envStruct type
type envStruct struct {
	HostPort      string `mapstructure:"HOST_PORT" json:"HOST_PORT"`
	CassandraHost string `mapstructure:"CASSANDRA_HOST" json:"CASSANDRA_HOST"`
	CassandraPort int    `mapstructure:"CASSANDRA_PORT" json:"CASSANDRA_PORT"`
}

func main() {
	app := cli.NewApp()
	app.Name = "Cassandra-Web"
	app.Version = "0.6.0"
	app.Authors = []cli.Author{
		cli.Author{
			Name:  "Ken",
			Email: "ipushc@gmail.com",
		},
	}
	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:   "config, c",
			Value:  "config.yaml",
			Usage:  "app config",
			EnvVar: "CONFIG_PATH",
		},
	}
	app.Action = run

	err := app.Run(os.Args)

	if err != nil {
		log.Fatal(err)
	}
}

// run
func run(c *cli.Context) {
	viper.SetConfigFile(c.String("config"))
	viper.AutomaticEnv()

	err := viper.ReadInConfig()

	if err != nil {
		log.Fatal(err)
	}

	envTmp := &envStruct{}
	err = viper.Unmarshal(envTmp)

	if err != nil {
		panic(err)
	}

	env = *envTmp

	log.Info("Cofing 設定成功")

	cluster := gocql.NewCluster(env.CassandraHost)
	cluster.Port = env.CassandraPort
	cluster.Keyspace = SystemSchemaKey
	cluster.Consistency = gocql.One

	session, err := cluster.CreateSession()

	defer session.Close()

	if err != nil {
		log.Fatal(err)
	}

	h := &Handler{Session: session}

	// Echo instance
	e := echo.New()

	e.Use(middleware.Logger())

	// 跨網域用
	// e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	// 	AllowOrigins: []string{"http://localhost:8081", "http://localhost:8082"},
	// 	AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	// }))

	e.Static("/static", "client/dist/static")
	e.File("/", "client/dist/index.html")

	e.POST("/query", h.postQuery)

	e.GET("/keyspace", h.keySpace)
	e.GET("/table", h.table)
	e.GET("/row", h.row)

	// Start server
	e.Logger.Fatal(e.Start(env.HostPort))
}

type CqlQuery struct {
	Query string `json:"query" form:"query" query:"query"`
}

type Handler struct {
	Session *gocql.Session
}

func (h *Handler) postQuery(c echo.Context) error {
	query := new(CqlQuery)

	if err := c.Bind(query); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	iter := h.Session.Query(query.Query).Iter()

	ret, err := iter.SliceMap()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ret)
}

func (h *Handler) keySpace(c echo.Context) error {
	iter := h.Session.Query(`SELECT * FROM system_schema.keyspaces`).Iter()

	ret, err := iter.SliceMap()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ret)
}

func (h *Handler) table(c echo.Context) error {
	keyspace := c.QueryParam("keyspace")

	iter := h.Session.Query(`SELECT * FROM system_schema.tables WHERE  keyspace_name = ?`, keyspace).Iter()

	ret, err := iter.SliceMap()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ret)
}

func (h *Handler) row(c echo.Context) error {
	data := make(map[string]interface{})

	table := c.QueryParam("table")
	tokenKey := c.QueryParam("token_key")
	nextToken := c.QueryParam("next_token")
	prevToken := c.QueryParam("prev_token")
	limit, err := strconv.Atoi(c.QueryParam("limit"))

	countIter := h.Session.Query(`SELECT COUNT(*) FROM ` + table).Iter()
	countRet, err := countIter.SliceMap()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	data["count"] = countRet[0]["count"]

	if nextToken != "" {
		rowIter := h.Session.Query(`SELECT * FROM `+table+` WHERE token(`+tokenKey+`) > token('`+nextToken+`') LIMIT ? ALLOW FILTERING`, limit).Iter()
		rowRet, nextErr := rowIter.SliceMap()

		if nextErr != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, nextErr.Error())
		}

		data["row"] = rowRet

		return c.JSON(http.StatusOK, data)
	}

	if prevToken != "" {
		rowIter := h.Session.Query(`SELECT * FROM `+table+` WHERE token(`+tokenKey+`) < token('`+prevToken+`') LIMIT ? ALLOW FILTERING`, limit).Iter()
		rowRet, prevErr := rowIter.SliceMap()

		if prevErr != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, prevErr.Error())
		}

		data["row"] = rowRet

		return c.JSON(http.StatusOK, data)
	}

	rowIter := h.Session.Query(`SELECT * FROM `+table+` LIMIT ? ALLOW FILTERING`, limit).Iter()
	rowRet, err := rowIter.SliceMap()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	data["row"] = rowRet

	return c.JSON(http.StatusOK, data)
}
