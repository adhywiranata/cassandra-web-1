webpackJsonp([1],{"0DJ8":function(e,t){},"1qvS":function(e,t){},"7bcC":function(e,t){},BMy3:function(e,t){},CT0B:function(e,t){},IwlT:function(e,t){},KZ8L:function(e,t){},LuM7:function(e,t){},Mobx:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("7bcC"),n("jDwb");var a=n("2X9z"),r=n.n(a),s=(n("Mobx"),n("+TD8")),o=n.n(s),c=(n("0DJ8"),n("6oiW")),i=n.n(c),u=(n("UjAo"),n("eBGF")),l=n.n(u),p=(n("KZ8L"),n("fDPO")),f=n.n(p),d=(n("jlNI"),n("RDoK")),m=n.n(d),h=(n("Sm8n"),n("oTyR")),y=n.n(h),v=(n("ovMW"),n("6mNG")),w=n.n(v),b=(n("QIAS"),n("D8db")),k=n.n(b),g=(n("lh9Z"),n("ACGT")),x=n.n(g),C=(n("BMy3"),n("exT9")),_=n.n(C),$=(n("SUQY"),n("SExR")),S=n.n($),T=(n("CT0B"),n("q4le")),q=n.n(T),M=(n("sCLk"),n("LR6y")),Q=n.n(M),E=(n("a9Mr"),n("nu7/")),j=n.n(E),R=n("7+uW");n("LuM7");R.default.use(j.a.directive),R.default.use(Q.a),R.default.use(q.a),R.default.use(S.a),R.default.use(_.a),R.default.use(x.a),R.default.use(k.a),R.default.use(w.a),R.default.use(y.a),R.default.use(m.a),R.default.use(f.a),R.default.use(l.a),R.default.use(i.a),R.default.prototype.$loading=j.a.service,R.default.prototype.$prompt=o.a.prompt,R.default.prototype.$msgbox=o.a,R.default.prototype.$message=r.a;var F={render:function(){var e=this.$createElement;return(this._self._c||e)("router-view",{directives:[{name:"loading",rawName:"v-loading",value:!1,expression:"false"}]})},staticRenderFns:[]};var L=n("VU/8")({name:"App"},F,!1,function(e){n("1qvS")},null,null).exports,U=n("/ocq"),A={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"container"},[t("div",{staticClass:"content"},[t("div",{staticClass:"title"},[t("router-link",{attrs:{to:"/keyspace"}},[this._v("Cassandra-Web")])],1)])])},staticRenderFns:[]};var D=n("VU/8")({name:"Home",data:function(){return{}},created:function(){},methods:{}},A,!1,function(e){n("IwlT")},null,null).exports,B=n("Xxa5"),G=n.n(B),N=n("exGp"),I=n.n(N),O=n("HdQ4"),V=n.n(O),W=window.location.origin,Z={root:{keyspace:{type:"GET",url:W+"/keyspace"},table:{type:"GET",url:W+"/table"},row:{type:"GET",url:W+"/row"},query:{type:"POST",url:W+"/query"}}},H=new V.a(Z,{cors:!1}),K=H.make("root"),J={name:"Keyspace",data:function(){return{isCollapse:!1,keyspace:[]}},created:function(){this.fetch()},methods:{getTable:function(e){var t=this;return I()(G.a.mark(function n(){return G.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:try{t.$router.push({name:"table",params:{keyspace:e}})}catch(e){t.$message({type:"error",showClose:!0,duration:0,message:e})}case 1:case"end":return n.stop()}},n,t)}))()},fetch:function(){var e=this;return I()(G.a.mark(function t(){var n;return G.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,K.request("keyspace");case 3:n=t.sent,e.keyspace=n.get(),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.$message({type:"error",showClose:!0,duration:0,message:t.t0});case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()},toggleMenu:function(){this.isCollapse=!this.isCollapse},openQuery:function(){var e,t=this;this.$prompt("Enter Query","CQL Query",{confirmButtonText:"Execute",cancelButtonText:"Cancel"}).then((e=I()(G.a.mark(function e(n){var a,r=n.value;return G.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,K.request("query",{data:{query:r}});case 3:a=e.sent,t.$message({type:"success",showClose:!0,duration:0,message:a.get()}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t.$message({type:"error",showClose:!0,duration:0,message:e.t0});case 10:case"end":return e.stop()}},e,t,[[0,7]])})),function(t){return e.apply(this,arguments)})).catch(function(){t.$message({type:"info",message:"Cancel Query"})})}}},P={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticStyle:{height:"600px",border:"1px solid #eee"}},[n("el-aside",{staticStyle:{width:"auto"}},[n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"2","collapse-transition":!1,collapse:e.isCollapse}},[e._l(e.keyspace,function(t,a){return n("el-menu-item",{attrs:{index:a.toString()},on:{click:function(n){e.getTable(t.keyspace_name)}}},[n("i",{staticClass:"el-icon-tickets"}),n("span",{attrs:{lot:"title"}},[e._v(e._s(t.keyspace_name))])])}),n("el-menu-item",{attrs:{index:"-1"},on:{click:e.openQuery}},[n("i",{staticClass:"el-icon-edit"}),n("span",{attrs:{lot:"title"}},[e._v("Query")])]),n("el-menu-item",{attrs:{index:"-2"},on:{click:e.toggleMenu}},[n("i",{class:[e.isCollapse?"el-icon-caret-right":"el-icon-caret-left"]}),n("span",{attrs:{lot:"title"}},[e._v("Folding menu")])])],2)],1),n("el-container",[n("router-view",{directives:[{name:"loading",rawName:"v-loading",value:!1,expression:"false"}]})],1)],1)},staticRenderFns:[]};var X=n("VU/8")(J,P,!1,function(e){n("dtcj")},null,null).exports,Y=H.make("root"),z={name:"Table",data:function(){return{tabledata:[]}},created:function(){this.fetch()},watch:{$route:function(){this.fetch()}},methods:{click:function(e){this.$router.push({name:"row",params:{table:e.keyspace_name+"."+e.table_name}})},fetch:function(){var e=this;return I()(G.a.mark(function t(){var n;return G.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Y.request("table",{query:{keyspace:e.$route.params.keyspace}});case 3:n=t.sent,e.tabledata=n.get(),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.$message({type:"error",showClose:!0,duration:0,message:t.t0});case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()},rowStyle:function(){return{cursor:"pointer"}}}},ee={render:function(){var e=this.$createElement,t=this._self._c||e;return t("el-table",{staticStyle:{width:"100%"},attrs:{data:this.tabledata,"empty-text":"empty data",stripe:"stripe","row-style":this.rowStyle},on:{"row-click":this.click}},[t("el-table-column",{attrs:{prop:"table_name",label:"table_name"}}),t("el-table-column",{attrs:{prop:"id",label:"id"}})],1)},staticRenderFns:[]},te=n("VU/8")(z,ee,!1,null,null,null).exports,ne=n("fZjL"),ae=n.n(ne),re=H.make("root"),se={name:"Row",data:function(){return{keys:[],rowdata:[]}},created:function(){this.fetch()},watch:{$route:function(){this.fetch()}},methods:{fetch:function(){var e=this;return I()(G.a.mark(function t(){var n,a;return G.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,re.request("row",{query:{limit:1e3,table:e.$route.params.table}});case 3:n=t.sent,void 0!==(a=n.get("row"))&&a.length>0?(e.keys=ae()(a[0]),e.rowdata=a):(e.keys=[],e.rowdata=[]),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),e.$message({type:"error",showClose:!0,duration:0,message:t.t0});case 11:case"end":return t.stop()}},t,e,[[0,8]])}))()},handleCurrentChange:function(e){this.$message({type:"error",showClose:!0,duration:0,message:e})}}},oe={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"w100"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:this.rowdata,"empty-text":"empty data",stripe:"stripe"}},this._l(this.keys,function(e){return t("el-table-column",{attrs:{prop:e,label:e}})}))],1)},staticRenderFns:[]};var ce=n("VU/8")(se,oe,!1,function(e){n("OSbF")},null,null).exports;R.default.use(U.a);var ie=new U.a({routes:[{path:"/",name:"home",component:D},{path:"/keyspace",name:"keyspace",component:X,children:[{path:":keyspace/table",name:"table",component:te},{path:":table/row",name:"row",component:ce}]}]});R.default.config.productionTip=!1,new R.default({el:"#app",router:ie,components:{App:L},template:"<App/>",render:function(e){return e(L)}})},OSbF:function(e,t){},QIAS:function(e,t){},SUQY:function(e,t){},Sm8n:function(e,t){},UjAo:function(e,t){},a9Mr:function(e,t){},dtcj:function(e,t){},jDwb:function(e,t){},jlNI:function(e,t){},lh9Z:function(e,t){},ovMW:function(e,t){},sCLk:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.js.map?b31dff497a8c5ed54a5a