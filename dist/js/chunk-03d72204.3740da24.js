(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03d72204"],{"2caf":function(t,e,a){var i=a("5ca1");i(i.S,"Array",{isArray:a("1169")})},"4fb8":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{width:"98%","max-width":"1240px",padding:"10px 0",margin:"auto"}},[a("div",{staticStyle:{display:"flex","align-items":"center","padding-bottom":"8px"}},[a("div",[a("b",[t._v(t._s(t.$t("ApiDetails")))])]),a("div",{staticStyle:{"margin-left":"auto"}},[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){return t.apiDeleteSubmit(t.apiId)}}},[t._v(t._s(t.$t("Delete")))]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.copyApiSubmit(t.api.apiId)}}},[t._v(t._s(t.$t("Copy")))]),a("a",{staticStyle:{margin:"0 10px"},attrs:{href:"#/index/put/project/api/"+t.projectId+"/"+t.groupId+"/"+t.apiId}},[a("el-button",{attrs:{size:"mini",type:"primary"}},[t._v(t._s(t.$t("Modify")))])],1)],1)]),a("div",{staticClass:"api-body",class:["api-body-"+t.api.method]},[t.api.deprecated?a("div",{staticClass:"prem05"},[t._v(t._s(t.api.deprecated?t.$t("DeprecatedWillDelete"):"")+" ")]):t._e(),a("div",{staticClass:"api-header",class:["api-header-"+t.api.method],style:t.api.deprecated?"text-decoration: line-through;":""},[a("div",{staticClass:"api-header-item"},[t._v("Method: "+t._s(t.api.method.toUpperCase()))]),a("div",{staticClass:"api-header-item"},[t._v("Path: "+t._s(t.api.path))]),a("div",{staticClass:"api-header-item"},[t._v(t._s(t.api.title))])]),a("div",{staticClass:"prem05 background-color-white"},[a("div",{domProps:{innerHTML:t._s((t.api.description||"").replace(/\n/g,"<br>"))}}),t._l(t.api.additional,(function(e,i){return a("div",{key:i},[a("div",{staticStyle:{"margin-top":"5px"}},[a("b",[t._v(t._s(e.title))])]),a("div",{domProps:{innerHTML:t._s((e.description||"").replace(/\n/g,"<br>"))}})])})),t.api.externalDocs?a("div",{staticStyle:{"margin-top":"0.5rem"}},[a("div",{staticStyle:{"padding-right":"0.5rem"}},[a("b",[t._v(t._s(t.$t("ExtDocsDesc"))+":")])]),a("div",[a("div",{domProps:{innerHTML:t._s((t.api.externalDocs.description||"").replace(/\n/g,"<br>"))}}),a("b",[t._v(t._s(t.$t("ExtDocsURL"))+":")]),a("br"),a("a",{staticStyle:{color:"#409EFF"},attrs:{href:t.api.externalDocs.url,target:"_blank"}},[t._v(t._s(t.api.externalDocs.url))])])]):t._e()],2),a("div",{staticStyle:{padding:"10px"}},[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("div",{staticStyle:{"min-width":"60px"}},[a("b",[t._v(t._s(t.$t("Parameters")))])]),null!=t.api.consumes?a("div",{staticStyle:{"margin-left":"auto"}},[t._v("Consumes:\n\t\t\t\t\t"+t._s(t.api.consumes)+"\n\t\t\t\t")]):t._e()])]),a("div",{staticStyle:{padding:"5px 10px","background-color":"white"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.parameters,"row-key":"tableRowkey",border:"","default-expand-all":"","tree-props":{children:"items",hasChildren:"hasChildren"},"empty-text":t.$t("ThereIsNoNeedToRequestParameters")}},[a("el-table-column",{attrs:{prop:"required",label:t.$t("Required"),width:"100",align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[null!=e.row.required?a("span",[t._v(t._s("true"==e.row.required||1==e.row.required?t.$t("True"):t.$t("False")))]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"in",label:t.$t("Position"),width:"120",align:"right"}}),a("el-table-column",{attrs:{prop:"type",label:t.$t("Type"),width:"120"}}),a("el-table-column",{attrs:{prop:"name",label:t.$t("ParamName"),width:"300"}}),a("el-table-column",{attrs:{prop:"description",label:t.$t("ParamDescription")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.description?a("div",{domProps:{innerHTML:t._s(e.row.description)}}):t._e(),a("div",{staticClass:"desc-constraint"},[e.row.def?a("span",[t._v(t._s(t.$t("Default"))+":\n\t\t\t\t\t\t\t\t"+t._s(e.row.def))]):t._e(),e.row.minLength?a("span",[t._v(t._s(t.$t("MinLength"))+":\n\t\t\t\t\t\t\t\t"+t._s(e.row.minLength))]):t._e(),e.row.maxLength?a("span",[t._v(t._s(t.$t("MaxLength"))+":\n\t\t\t\t\t\t\t\t"+t._s(e.row.maxLength))]):t._e(),e.row.minValue?a("span",[t._v(t._s(t.$t("Minimum"))+":\n\t\t\t\t\t\t\t\t"+t._s(e.row.minValue))]):t._e(),e.row.maxValue?a("span",[t._v(t._s(t.$t("Maximum"))+":\n\t\t\t\t\t\t\t\t"+t._s(e.row.maxValue))]):t._e(),e.row.enums?a("span",[t._v(t._s(t.$t("Enums"))+":\n\t\t\t\t\t\t\t\t"+t._s(e.row.enums))]):t._e(),e.row.regex?a("span",[t._v(t._s(t.$t("Pattern"))+":\n\t\t\t\t\t\t\t\t"+t._s(e.row.regex))]):t._e()])]}}])})],1),t.api.body?a("div",[a("json-viewer",{attrs:{"expand-depth":10,value:t.api.body}})],1):t._e()],1),a("div",{staticStyle:{padding:"10px"}},[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("div",{staticStyle:{"min-width":"60px"}},[a("b",[t._v(t._s(t.$t("Responses")))])]),null!=t.api.produces?a("div",{staticStyle:{"margin-left":"auto"}},[t._v("Produces:\n\t\t\t\t\t"+t._s(t.api.produces)+"\n\t\t\t\t")]):t._e()])]),a("div",{staticStyle:{padding:"5px 10px","background-color":"white"}},t._l(t.responses,(function(e,i){return a("div",{key:i},[a("p",[t._v(t._s(t.$t("Status"))+": "+t._s(e.status)+" "+t._s(t.$t("StatusMsg"))+":\n\t\t\t\t\t"+t._s(e.msg)+"\n\t\t\t\t")]),e.schema?a("div",[a("json-viewer",{attrs:{"expand-depth":10,value:e.schema}})],1):t._e(),e.data&&e.data.length>0?a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.data,"row-key":"tableRowkey",border:"","default-expand-all":"","tree-props":{children:"items",hasChildren:"hasChildren"}}},[a("el-table-column",{attrs:{prop:"in",label:t.$t("Position"),width:"120",align:"right"}}),a("el-table-column",{attrs:{prop:"type",label:t.$t("Type"),width:"100",align:"right"}}),a("el-table-column",{attrs:{prop:"name",label:t.$t("ParamName"),width:"300"}}),a("el-table-column",{attrs:{prop:"description",label:t.$t("ParamDescription")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.description?a("div",{domProps:{innerHTML:t._s(e.row.description)}}):t._e()]}}],null,!0)})],1):t._e()],1)})),0)])])},n=[],s=(a("28a5"),a("7f7f"),a("f559"),a("a481"),a("2caf"),a("349e")),r=a.n(s),o=a("0db5"),l=a("4360"),d={components:{JsonViewer:r.a},data:function(){return{projectId:"",groupId:"",apiId:"",dataLoading:!0,api:{method:"get"},apiRules:{path:[{required:!0,message:this.$t("EnterPath"),trigger:"blur"}],title:[{required:!0,message:this.$t("EnterApiName"),trigger:"blur"}]},parameters:[],dialogDataEditVisible:!1,parameterData:{},responses:[{status:200,msg:"ok",data:[]}],additional:[]}},created:function(){var t=l["a"].getters.role;if("ROOT"!=t&&"SERVER"!=t)this.$router.push("/index");else{if(this.projectId=this.$route.params.pid,this.groupId=this.$route.params.gid,this.apiId=this.$route.params.aid,null==this.apiId)return void this.$message.warning(this.$t("FailedToLoadTheProjectInvalidID"));this.loadApi(this.apiId)}},methods:{copyApiSubmit:function(t){var e=this;this.$confirm(this.$t("CopyConfirm"),this.$t("Tips"),{confirmButtonText:this.$t("Confirm"),cancelButtonText:this.$t("Cancel"),type:"warning"}).then((function(){Object(o["e"])(t,(function(t){console.log(a);var a=t.data;200==a.code&&e.$message.success(e.$t("CopySuccess"))}),(function(t){e.$message.error(e.$t("FailedToModifySeeConsole")),console.log(t)}))})).catch((function(){}))},apiDeleteSubmit:function(t){var e=this;this.$confirm(this.$t("DeleteConfirm"),this.$t("Tips"),{confirmButtonText:this.$t("Confirm"),cancelButtonText:this.$t("Cancel"),type:"warning"}).then((function(){Object(o["h"])(t,(function(t){var a=t.data;console.log("delete API..."),console.log(a),200==a.code&&(e.$message.success(e.$t("DeleteSuccess")),e.$router.push("/index/get/groups/"+e.projectId))}),(function(t){e.$message.error(e.$t("FailedToModifySeeConsole")),console.log(t)}))})).catch((function(){}))},loadApi:function(t){var e=this;null!=t&&""!=t&&(this.dataLoading=!0,Object(o["q"])(t,(function(t){var a=t.data;if(console.log("load API..."),console.log(a),200==a.code){if(null==a.data.apiId||""==a.data.apiId)return void e.$message.error(e.$t("FailedToLoadTheProjectInvalidID"));if(null!=a.data.additional&&""!=a.data.additional&&(a.data.additional=JSON.parse(a.data.additional)),null!=a.data.externalDocs&&""!=a.data.externalDocs&&(a.data.externalDocs=JSON.parse(a.data.externalDocs),null!=a.data.externalDocs.description&&(a.data.exDdescription=a.data.externalDocs.description),null!=a.data.externalDocs.url&&(a.data.exDurl=a.data.externalDocs.url)),a.data.deprecated=1==a.data.deprecated||"true"==a.data.deprecated,null!=a.data.consumes&&""!=a.data.consumes&&(a.data.consumes=JSON.parse(a.data.consumes)),null!=a.data.produces&&""!=a.data.produces&&(a.data.produces=JSON.parse(a.data.produces)),null!=a.data.parameters&&""!=a.data.parameters){for(var i=JSON.parse(a.data.parameters),n=0;n<i.length;n++)i[n].tableRowkey=e.getTableRandomRowKey(),i[n].tableRowLevel=1,i[n].required=1==i[n].required||"true"==i[n].required,i[n].ref=i,null!=i[n].items?e.recursionLoadTableData(i[n]):i[n].items=[];e.parameters=i}else e.parameters=[];if(null!=a.data.responses&&""!=a.data.responses){var s=JSON.parse(a.data.responses);s=null!=s&&s.length>0&&(null==s[0].status||null==s[0].data)?[{status:200,msg:"ok",data:s}]:s;for(var r=0;r<s.length;r++)for(var o=s[r].data,l=0;l<o.length;l++){var d=o[l];d.tableRowkey=e.getTableRandomRowKey(),d.tableRowLevel=1,d.ref=o,null!=d.items?e.recursionLoadTableData(d):d.items=[]}e.responses=s}else e.responses=[];null!=a.data.additional&&""!=a.data.additional&&(Array.isArray(a.data.additional)?e.additional=a.data.additional:e.additional=JSON.parse(a.data.additional)),e.api=a.data}e.dataLoading=!1}),(function(t){e.$message.error(e.$t("FailedToGetGroupInfoSeeConsole")),console.log(t)})))},recursionLoadTableData:function(t){if(null!=t.items&&0!=t.items.length)for(var e=0;e<t.items.length;e++){var a=t.items[e];a.tableRowkey=this.getTableRandomRowKey(),a.tableRowLevel=t.tableRowLevel+1,a.ref=t.items,null!=a.items?this.recursionLoadTableData(a):a.items=[]}},submitUpdateApi:function(){var t=this;this.$refs.apiForm.validate((function(e){if(!e)return t.$message.warning(t.$t("MissingRequiredInformation")),!1;var a={};if(a.apiId=t.apiId,a.groupId=t.groupId,a.method=t.api.method,a.deprecated=t.api.deprecated,a.path=t.api.path.replace(/(\/)+/g,"/"),a.path.startsWith("/")||(a.path="/"+a.path),a.title=t.api.title,a.description=t.api.description||"",isNaN(t.api.sorts)||(a.sorts=parseInt(t.api.sorts)),null!=t.api.consumes&&t.api.consumes.length>0?a.consumes=JSON.stringify(t.api.consumes):a.consumes="[]",null!=t.api.produces&&t.api.produces.length>0?a.produces=JSON.stringify(t.api.produces):a.produces="[]",t.parameters.length>0){for(var i=[],n=0;n<t.parameters.length;n++){var s=t.parameters[n];if(null!=s.name&&""!=s.name){var r={required:s.required,in:s.in,type:s.type,name:s.name,description:s.description};if(null!=s.def&&""!=s.def&&(r.def=s.def),null!=s.minLength&&""!=s.minLength&&(r.minLength=s.minLength),null!=s.maxLength&&""!=s.maxLength&&(r.maxLength=s.maxLength),null!=s.minimum&&""!=s.minimum&&(r.minimum=s.minimum),null!=s.maximum&&""!=s.maximum&&(r.maximum=s.maximum),null!=s.enums&&""!=s.enums){for(var l=s.enums.split(","),d=[],p=0;p<l.length;p++)","!=l[p]&&""!=l[p]&&d.push(l[p]);d.length>0&&(r.enums=JSON.stringify(d))}null!=s.pattern&&""!=s.pattern&&(r.pattern=s.pattern),null!=s.items&&s.items.length>0&&(r.items=[],t.recursionConverter(r.items,s.items)),i.push(r)}}a.parameters=JSON.stringify(i)}else a.parameters="[]";if(a.body=t.api.body,t.responses.length>0){for(var u=[],c=0;c<t.responses.length;c++){var m=t.responses[c];if(null!=m.status&&""!=m.status||null!=m.data&&0!=m.data.length){for(var h={status:m.status,msg:m.msg,data:[]},f=0;f<m.data.length;f++){var g=m.data[f];if(null!=g.name&&""!=g.name){var v={type:g.type,in:g.in,name:g.name,description:g.description};null!=g.items&&g.items.length>0&&(v.items=[],t.recursionConverter(v.items,g.items)),h.data.push(v)}}u.push(h)}}a.responses=JSON.stringify(u)}else a.responses="[]";var y=null;null!=t.api.exDdescription&&(y={description:t.api.exDdescription}),null!=t.api.exDurl&&(null==y&&(y={}),y.url=t.api.exDurl),null!=y&&(a.externalDocs=JSON.stringify(y)),null!=t.additional&&t.additional.length>0&&(a.additional=JSON.stringify(t.additional)),console.log("update API"),console.log(a),Object(o["B"])(a,(function(e){var a=e.data;200==a.code&&t.$confirm(t.$t("ModifySuccessAskReturn"),t.$t("ModifySuccess"),{confirmButtonText:t.$t("GoBack"),cancelButtonText:t.$t("Cancel"),type:"success"}).then((function(){t.$router.go(-1)})).catch((function(){location.reload()}))}),(function(e){t.$message.error(t.$t("FailedToModifySeeConsole")),console.log(e)}))}))},recursionConverter:function(t,e){if(null!=e&&0!=e.length)for(var a=0;a<e.length;a++){var i={};i.type=e[a].type,i.name=e[a].name,i.description=e[a].description,null!=e[a].items&&0!=e[a].items.length&&(i.items=[],this.recursionConverter(i.items,e[a].items)),t.push(i)}},addParameter:function(){this.parameters.push({tableRowkey:this.getTableRandomRowKey(),tableRowLevel:1,required:!0,in:"query",type:"string",name:"",description:"",items:[],ref:this.parameters})},showParameterEdit:function(t){if(this.dialogDataEditVisible=!0,null!=t.enums)try{t.enums=JSON.parse(t.enums).join(",")}catch(e){console.log("data.enums convert err: ",e)}this.parameterData=t},addResponse:function(){this.responses.push({status:null,msg:null,data:[]})},addResponseData:function(t){t.push({tableRowkey:this.getTableRandomRowKey(),tableRowLevel:1,type:"string",name:"",in:"body",description:"",items:[],ref:t})},removeResponseData:function(t){var e=this;this.$confirm(this.$t("RemoveConfirm"),this.$t("Tips"),{confirmButtonText:this.$t("Confirm"),cancelButtonText:this.$t("Cancel"),type:"warning"}).then((function(){e.responses.splice(t,1)})).catch((function(){}))},showResponseDataEdit:function(t){this.dialogResponseEditVisible=!0,this.responseEditData=t,console.log(t)},addDataItems:function(t){t.items.push({tableRowkey:this.getTableRandomRowKey(),tableRowLevel:t.tableRowLevel+1,type:"string",name:"",in:"body",description:"",items:[],ref:t.items})},tableColumnMove:function(t,e,a){for(var i=-1,n=t.ref,s=0;s<n.length;s++)if(n[s].tableRowkey==e){i=s;break}if(!(-1==i||0==a&&0==i||1==a&&i==n.length-1)){var r=n[i];0==a?(this.$set(n,i,n[i-1]),this.$set(n,i-1,r)):(this.$set(n,i,n[i+1]),this.$set(n,i+1,r))}},tableColumnRemove:function(t){var e=this;this.$confirm(this.$t("RemoveConfirm"),this.$t("Tips"),{confirmButtonText:this.$t("Confirm"),cancelButtonText:this.$t("Cancel"),type:"warning"}).then((function(){e.findDataAndDelete(t.ref,t.tableRowkey)})).catch((function(){}))},findDataAndDelete:function(t,e){for(var a=0;a<t.length;a++){if(t[a].tableRowkey==e)return void t.splice(a,1);null!=t[a].items&&t[a].items.length>0&&this.findDataAndDelete(t[a].items,e)}},removeAdditional:function(t){var e=this;this.$confirm(this.$t("RemoveConfirm"),this.$t("Tips"),{confirmButtonText:this.$t("Confirm"),cancelButtonText:this.$t("Cancel"),type:"warning"}).then((function(){e.additional.splice(t,1)})).catch((function(){}))},isNumber:function(t){return"int"==t||"long"==t||"float"==t||"double"==t||"number"==t},isCanEnumsOrRegex:function(t){return"boolean"!=t&&"object"!=t&&"array"!=t},getTableRandomRowKey:function(){return"rowkey-"+Math.random()}}},p=d,u=(a("59f4"),a("2877")),c=Object(u["a"])(p,i,n,!1,null,"4e8ef4ab",null);e["default"]=c.exports},"59f4":function(t,e,a){"use strict";var i=a("722e"),n=a.n(i);n.a},"722e":function(t,e,a){}}]);
//# sourceMappingURL=chunk-03d72204.3740da24.js.map