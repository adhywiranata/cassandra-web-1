# cassandra-web
cassandra web ui
![index](index.png)

## Features
* Table Row Page
* Table Row Edit
* Table Row Delete
* Table Rown Find
* Table Definition
* Table Export
* Table Import
* CQL Query

## Docker

```sh
docker pull ipushc/cassandra-web
```

----

## Environment

* HOST_PORT: ":80"
* CASSANDRA_HOST: cassandra
* CASSANDRA_PORT: 9042

----

## API

API [Doc](./Doc.md)

## Issue

* CQL Data Types Map. JSON only allows key names to be strings.
* JSON int64 to string