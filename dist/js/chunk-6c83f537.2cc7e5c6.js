(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c83f537"],{"06a9":function(e,t,r){},"0db5":function(e,t,r){"use strict";r.d(t,"j",(function(){return a})),r.d(t,"l",(function(){return i})),r.d(t,"r",(function(){return n})),r.d(t,"s",(function(){return s})),r.d(t,"e",(function(){return c})),r.d(t,"u",(function(){return l})),r.d(t,"n",(function(){return p})),r.d(t,"m",(function(){return u})),r.d(t,"h",(function(){return d})),r.d(t,"i",(function(){return m})),r.d(t,"q",(function(){return v})),r.d(t,"o",(function(){return g})),r.d(t,"b",(function(){return f})),r.d(t,"a",(function(){return h})),r.d(t,"f",(function(){return x})),r.d(t,"k",(function(){return w})),r.d(t,"p",(function(){return b})),r.d(t,"t",(function(){return j})),r.d(t,"d",(function(){return D})),r.d(t,"c",(function(){return y})),r.d(t,"g",(function(){return _}));var o=r("8238");function a(e,t){o["a"].get("/private/project").then(e).catch(t)}function i(e,t,r){o["a"].get("/private/project/"+e).then(t).catch(r)}function n(e,t,r){o["a"].post("/private/project/",e).then(t).catch(r)}function s(e,t,r){o["a"].post("/private/project/fromJson",e).then(t).catch(r)}function c(e,t,r){o["a"].post("/private/project/copy/"+e).then(t).catch(r)}function l(e,t,r){o["a"].put("/private/project/",e).then(t).catch(r)}function p(e,t,r){o["a"].put("/private/project/moveUp/"+e).then(t).catch(r)}function u(e,t,r){o["a"].put("/private/project/moveDown/"+e).then(t).catch(r)}function d(e,t,r){o["a"].delete("/private/project/"+e).then(t).catch(r)}function m(e,t,r){o["a"].get("/private/project/apiGroup/"+e).then(t).catch(r)}function v(e,t,r){o["a"].post("/private/apiGroup",e).then(t).catch(r)}function g(e,t,r){o["a"].put("/private/apiGroup",e).then(t).catch(r)}function f(e,t,r){o["a"].put("/private/apiGroup/moveUp/"+e).then(t).catch(r)}function h(e,t,r){o["a"].put("/private/apiGroup/moveDown/"+e).then(t).catch(r)}function x(e,t,r){o["a"].delete("/private/apiGroup/"+e).then(t).catch(r)}function w(e,t,r){o["a"].get("/private/api/"+e).then(t).catch(r)}function b(e,t,r){o["a"].post("/private/api",e).then(t).catch(r)}function j(e,t,r){o["a"].put("/private/api",e).then(t).catch(r)}function D(e,t,r){o["a"].put("/private/api/moveUp/"+e).then(t).catch(r)}function y(e,t,r){o["a"].put("/private/api/moveDown/"+e).then(t).catch(r)}function _(e,t,r){o["a"].delete("/private/api/"+e).then(t).catch(r)}},"4f37":function(e,t,r){"use strict";r("aa77")("trim",(function(e){return function(){return e(this,3)}}))},"8a63":function(e,t,r){"use strict";function o(e){var t="",r=new Date;return r.setTime(e),t+=r.getFullYear(),t+="-"+a(r),t+="-"+i(r),t+=" "+n(r),t+=":"+s(r),t+=":"+c(r),t}function a(e){var t="";return t=e.getMonth()+1,t<10&&(t="0"+t),t}function i(e){var t="";return t=e.getDate(),t<10&&(t="0"+t),t}function n(e){var t="";return t=e.getHours(),t<10&&(t="0"+t),t}function s(e){var t="";return t=e.getMinutes(),t<10&&(t="0"+t),t}function c(e){var t="";return t=e.getSeconds(),t<10&&(t="0"+t),t}r.d(t,"a",(function(){return o}))},aa77:function(e,t,r){var o=r("5ca1"),a=r("be13"),i=r("79e5"),n=r("fdef"),s="["+n+"]",c="​",l=RegExp("^"+s+s+"*"),p=RegExp(s+s+"*$"),u=function(e,t,r){var a={},s=i((function(){return!!n[e]()||c[e]()!=c})),l=a[e]=s?t(d):n[e];r&&(a[r]=l),o(o.P+o.F*s,"String",a)},d=u.trim=function(e,t){return e=String(a(e)),1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(p,"")),e};e.exports=u},d21d:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticStyle:{width:"98%","max-width":"1240px",padding:"10px 0",margin:"auto",display:"flex","align-items":"center"}},[r("div",[r("b",[e._v(e._s("edit"===e.mode?"修改项目信息":"项目信息"))])]),r("div",{staticStyle:{"margin-left":"auto"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:"view"===e.mode,expression:"mode === 'view'"}]},[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.copySubmit()}}},[e._v("复制副本")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.mode="edit"}}},[e._v("修改")]),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.deleteSubmit()}}},[e._v("删除")])],1),r("div",{directives:[{name:"show",rawName:"v-show",value:"edit"===e.mode,expression:"mode === 'edit'"}]},[r("el-button",{attrs:{size:"mini"},on:{click:function(t){e.mode="view"}}},[e._v("取消")])],1)])]),r("div",{staticStyle:{width:"98%","max-width":"1240px",margin:"auto"}},[r("table",{directives:[{name:"show",rawName:"v-show",value:"view"===e.mode,expression:"mode === 'view'"}],staticStyle:{width:"100%"},attrs:{cellspacing:"10"}},[r("tr",[r("td",{staticClass:"project-item",attrs:{width:"120px"}},[e._v("项目名称")]),r("td",[e._v("\n\t\t\t\t\t"+e._s(e.project.name)+"\n\t\t\t\t\t"),r("span",{staticStyle:{"font-size":"0.8em"}},[e._v(e._s(e.project.versions))])])]),r("tr",{directives:[{name:"show",rawName:"v-show",value:e.project.lastTime,expression:"project.lastTime"}]},[r("td",{staticClass:"project-item"},[e._v("最后更新时间")]),r("td",[e._v(e._s(e.formatDate(e.project.lastTime)))])]),r("tr",{directives:[{name:"show",rawName:"v-show",value:e.project.description,expression:"project.description"}],attrs:{valign:"top"}},[r("td",{staticClass:"project-item",attrs:{width:"120px"}},[e._v("项目描述")]),r("td",{domProps:{innerHTML:e._s(e.project.description)}})]),r("tr",[r("td",{staticClass:"project-item",attrs:{valign:"top"}},[e._v("服务地址集")]),r("td",e._l(e.project.servers,(function(t,o){return r("div",{key:o},[r("div",[e._v(e._s(t.url))]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.description,expression:"item.description"}],staticStyle:{color:"#888"}},[e._v(e._s(t.description))])])})),0)]),r("tr",{directives:[{name:"show",rawName:"v-show",value:e.project.contactName,expression:"project.contactName"}]},[r("td",{staticClass:"project-item"},[e._v("联系人")]),r("td",[e._v(e._s(e.project.contactName))])]),r("tr",{directives:[{name:"show",rawName:"v-show",value:e.project.contactInfo,expression:"project.contactInfo"}]},[r("td",{staticClass:"project-item"},[e._v("联系信息")]),r("td",{domProps:{innerHTML:e._s(e.project.contactInfo)}})]),r("tr",{directives:[{name:"show",rawName:"v-show",value:e.project.exDdescription&&e.project.exDurl,expression:"project.exDdescription && project.exDurl"}]},[r("td",{staticClass:"project-item",attrs:{valign:"top"}},[e._v("附加文档")]),r("td",[r("div",{directives:[{name:"show",rawName:"v-show",value:e.project.exDdescription,expression:"project.exDdescription"}],domProps:{innerHTML:e._s(e.project.exDdescription)}}),r("a",{directives:[{name:"show",rawName:"v-show",value:e.project.exDurl,expression:"project.exDurl"}],staticClass:"alink",staticStyle:{"margin-left":"0"},attrs:{href:e.project.exDurl,target:"_blank"}},[e._v(e._s(e.projectEdit.exDurl))])])]),r("tr",[r("td",{staticClass:"project-item"},[e._v("操作")]),r("td",[r("a",{staticClass:"alink",staticStyle:{"margin-left":"0"},attrs:{href:"/project/downJson/"+e.project.key}},[e._v("下载.json文件")]),r("a",{staticClass:"alink",attrs:{href:"/Client-UI/index.html?id="+e.project.key,target:"_blank"}},[e._v("在Client-UI中查看")])])])]),r("el-form",{directives:[{name:"show",rawName:"v-show",value:"edit"===e.mode,expression:"mode === 'edit'"}],ref:"projectEditForm",attrs:{rules:e.editRules,model:e.projectEdit,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"项目名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入项目名称"},model:{value:e.projectEdit.name,callback:function(t){e.$set(e.projectEdit,"name",t)},expression:"projectEdit.name"}})],1),r("el-form-item",{attrs:{label:"项目版本",prop:"versions"}},[r("el-input",{attrs:{placeholder:"请输入项目版本号"},model:{value:e.projectEdit.versions,callback:function(t){e.$set(e.projectEdit,"versions",t)},expression:"projectEdit.versions"}})],1),r("el-form-item",{attrs:{label:"项目排序",prop:"sorts"}},[r("el-input",{attrs:{placeholder:"请输入项目排序"},model:{value:e.projectEdit.sorts,callback:function(t){e.$set(e.projectEdit,"sorts",e._n(t))},expression:"projectEdit.sorts"}})],1),r("el-form-item",{attrs:{label:"项目描述",prop:"description"}},[r("el-input",{attrs:{type:"textarea",placeholder:"请输入项目描述"},model:{value:e.projectEdit.description,callback:function(t){e.$set(e.projectEdit,"description",t)},expression:"projectEdit.description"}})],1),r("el-form-item",{attrs:{label:"服务地址集",prop:"servers"}},[[e._l(e.projectEdit.servers,(function(t,o){return r("div",{key:o,staticStyle:{border:"1px solid #DCDFE6",padding:"5px","margin-bottom":"5px"}},[r("el-input",{attrs:{placeholder:"请输入主机地址,必填,示例 http://127.0.0.1:8080/v1"},model:{value:t.url,callback:function(r){e.$set(t,"url",r)},expression:"server.url"}}),r("el-input",{staticClass:"novalidate",attrs:{placeholder:"请输入主机说明,选填,示例 本地开发服务器"},model:{value:t.description,callback:function(r){e.$set(t,"description",r)},expression:"server.description"}}),r("div",{staticStyle:{"text-align":"right","padding-top":"3px"}},[r("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.removeServer(o)}}},[e._v("移除")])],1)],1)})),r("div",{staticStyle:{"text-align":"right"}},[r("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.addServer()}}},[e._v("添加更多")])],1)]],2),r("el-form-item",{attrs:{label:"联系人",prop:"contactName"}},[r("el-input",{attrs:{placeholder:"请输入联系人"},model:{value:e.projectEdit.contactName,callback:function(t){e.$set(e.projectEdit,"contactName",t)},expression:"projectEdit.contactName"}})],1),r("el-form-item",{attrs:{label:"联系信息",prop:"contactInfo"}},[r("el-input",{attrs:{placeholder:"请输入联系信息"},model:{value:e.projectEdit.contactInfo,callback:function(t){e.$set(e.projectEdit,"contactInfo",t)},expression:"projectEdit.contactInfo"}})],1),r("el-form-item",{attrs:{label:"附加文档URL",prop:"exDurl"}},[r("el-input",{attrs:{placeholder:"请输入附加文档URL"},model:{value:e.projectEdit.exDurl,callback:function(t){e.$set(e.projectEdit,"exDurl",t)},expression:"projectEdit.exDurl"}})],1),r("el-form-item",{attrs:{label:"附加文档描述",prop:"exDdescription"}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:10},placeholder:"请输入附加文档描述,支持HTML"},model:{value:e.projectEdit.exDdescription,callback:function(t){e.$set(e.projectEdit,"exDdescription",t)},expression:"projectEdit.exDdescription"}})],1),r("el-form-item",[r("div",{staticStyle:{"text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updateSubmit()}}},[e._v("提交修改")])],1)])],1)],1),r("el-dialog",{attrs:{title:"view"==e.groupDialogMode?"修改分组信息":"新增分组信息",visible:e.dialogCreateGroupVisible},on:{"update:visible":function(t){e.dialogCreateGroupVisible=t}}},[r("el-form",{ref:"groupEditForm",attrs:{model:e.groupData,rules:e.groupDataRules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"分组名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入分组的名称(必填)"},model:{value:e.groupData.name,callback:function(t){e.$set(e.groupData,"name",t)},expression:"groupData.name"}})],1),r("el-form-item",{attrs:{label:"分组简介",prop:"summary"}},[r("el-input",{attrs:{placeholder:"请输入分组的简介(必填)"},model:{value:e.groupData.summary,callback:function(t){e.$set(e.groupData,"summary",t)},expression:"groupData.summary"}})],1),r("el-form-item",{attrs:{label:"分组排序",prop:"sorts"}},[r("el-input",{attrs:{type:"number",placeholder:"请输入项目排序(选填)"},model:{value:e.groupData.sorts,callback:function(t){e.$set(e.groupData,"sorts",t)},expression:"groupData.sorts"}})],1),r("el-form-item",{attrs:{label:"分组描述",prop:"description"}},[r("el-input",{attrs:{type:"textarea",placeholder:"请输入分组的详细描述,支持HTML(选填)"},model:{value:e.groupData.description,callback:function(t){e.$set(e.groupData,"description",t)},expression:"groupData.description"}})],1),r("el-form-item",{attrs:{label:"附加文档URL",prop:"externalUrl"}},[r("el-input",{attrs:{placeholder:"请输入附加文档URL(选填)"},model:{value:e.groupData.externalUrl,callback:function(t){e.$set(e.groupData,"externalUrl",t)},expression:"groupData.externalUrl"}})],1),r("el-form-item",{attrs:{label:"附加文档描述",prop:"externalDesc"}},[r("el-input",{attrs:{type:"textarea",placeholder:"请输入附加文档详细描述,支持HTML(选填)"},model:{value:e.groupData.externalDesc,callback:function(t){e.$set(e.groupData,"externalDesc",t)},expression:"groupData.externalDesc"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogCreateGroupVisible=!1}}},[e._v("取 消")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:"edit"==e.groupDialogMode,expression:"groupDialogMode == 'edit'"}],attrs:{type:"primary"},on:{click:e.groupCreateSubmit}},[e._v("确定新增")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:"view"==e.groupDialogMode,expression:"groupDialogMode == 'view'"}],attrs:{type:"primary"},on:{click:e.groupUpdateSubmit}},[e._v("确定修改")])],1)],1),r("div",{directives:[{name:"show",rawName:"v-show",value:"view"===e.mode,expression:"mode === 'view'"}],staticStyle:{width:"98%","max-width":"1240px",margin:"auto"}},[r("div",{staticStyle:{padding:"10px 0",display:"flex","align-items":"center"}},[e._m(0),r("div",{staticStyle:{"margin-left":"auto"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:"view"===e.mode,expression:"mode === 'view'"}]},[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.dialogCreateGroupVisible=!0,e.groupDialogMode="edit",e.groupData={}}}},[e._v("\n\t\t\t\t\t\t新增分组\n\t\t\t\t\t")])],1)])]),r("div",[r("el-collapse",{directives:[{name:"loading",rawName:"v-loading",value:e.groupsLoading,expression:"groupsLoading"}]},e._l(e.groups,(function(t){return r("el-collapse-item",{key:t.groupId},[r("template",{slot:"title"},[r("div",{staticStyle:{"vertical-align":"middle"}},[r("span",{staticStyle:{"font-size":"20px"}},[r("b",[e._v(e._s(t.name))])]),r("span",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(t.summary))])])]),r("div",{staticStyle:{"padding-bottom":"10px"}},[r("div",{staticStyle:{display:"flex"}},[r("el-button",{attrs:{size:"mini"},on:{click:function(r){return e.groupMoveUp(t.groupId)}}},[e._v("上移")]),r("el-button",{attrs:{size:"mini"},on:{click:function(r){return e.groupMoveDown(t.groupId)}}},[e._v("下移")]),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.showGroupUpdateDialog(t)}}},[e._v("修改分组")]),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.groupDeleteSubmit(t.groupId)}}},[e._v("删除分组")]),r("el-button",{staticStyle:{"margin-left":"auto"},attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.$router.push({path:"/index/post/project/api/"+e.project.key+"/"+t.groupId})}}},[e._v("\n\t\t\t\t\t\t\t\t新增接口\n\t\t\t\t\t\t\t")])],1),r("p",{domProps:{innerHTML:e._s(t.description)}}),null!=t.externalDocs?r("div",[null!=JSON.parse(t.externalDocs).description?r("div",{domProps:{innerHTML:e._s(JSON.parse(t.externalDocs).description)}}):e._e(),null!=JSON.parse(t.externalDocs).url?r("a",{staticClass:"alink",staticStyle:{"margin-left":"0"},attrs:{href:JSON.parse(t.externalDocs).url,target:"_blank"}},[e._v("\n\t\t\t\t\t\t\t\t"+e._s(JSON.parse(t.externalDocs).url)+"\n\t\t\t\t\t\t\t")]):e._e()]):e._e()]),e._l(t.apis,(function(t){return r("div",{key:t.apiId,staticStyle:{"margin-bottom":"10px"}},[r("div",{class:["api",t.method]},[r("div",{class:["api-header",1==t.deprecated||"true"==t.deprecated?"text-through":""],on:{click:function(e){t.show=!t.show}}},[r("div",{staticClass:"api-method"},[e._v(e._s(t.method))]),r("div",{staticClass:"api-path-summary"},[1==t.deprecated||"true"==t.deprecated?r("span",[r("b",[e._v("(已过期)")])]):e._e(),e._v("\n\t\t\t\t\t\t\t\t\t"+e._s(t.path)+"\n\t\t\t\t\t\t\t\t")]),r("div",{staticClass:"api-path-summary"},[e._v(e._s(t.title))]),r("div",{staticStyle:{"margin-left":"auto"}},[r("i",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!api.show"}],staticClass:"el-icon-arrow-right"}),r("i",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"api.show"}],staticClass:"el-icon-arrow-down"})])]),r("div",{staticStyle:{padding:"5px 10px","text-align":"right"},on:{click:function(e){t.show=!t.show}}},[r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.apiDeleteSubmit(t.apiId)}}},[e._v("删除")]),r("a",{staticStyle:{margin:"0 10px"},attrs:{href:"#/index/put/project/api/"+e.project.key+"/"+t.groupId+"/"+t.apiId}},[r("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("修改")])],1),r("el-button",{attrs:{size:"mini"},on:{click:function(r){return e.apiMoveUp(t.apiId)}}},[e._v("上移")]),r("el-button",{attrs:{size:"mini"},on:{click:function(r){return e.apiMoveDown(t.apiId)}}},[e._v("下移")])],1),r("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"api.show"}]},[r("div",{staticStyle:{padding:"10px","background-color":"white"}},[t.description?r("div",{domProps:{innerHTML:e._s(t.description.replace(/\n/g,"<br>"))}}):e._e(),e._l(t.additional,(function(t,o){return r("div",{key:o},[r("div",[r("b",[e._v(e._s(t.title))])]),t.description?r("div",{domProps:{innerHTML:e._s(t.description.replace(/\n/g,"<br>"))}}):e._e()])})),null!=t.externalDocs?r("div",[null!=t.externalDocs.description?r("div",{domProps:{innerHTML:e._s(t.externalDocs.description)}}):e._e(),null!=t.externalDocs.url?r("a",{staticClass:"alink",staticStyle:{"margin-left":"0"},attrs:{href:t.externalDocs.url,target:"_blank"}},[e._v(e._s(t.externalDocs.url))]):e._e()]):e._e()],2),r("div",{staticStyle:{padding:"10px"}},[r("div",{staticStyle:{display:"flex","align-items":"center"}},[r("div",{staticStyle:{"min-width":"60px"}},[r("b",[e._v("请求参数")])]),null!=t.consumes?r("div",{staticStyle:{"margin-left":"auto"}},[e._v("Consumes: "+e._s(t.consumes))]):e._e()])]),r("div",{staticStyle:{padding:"5px 10px","background-color":"white"}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.parameters,"row-key":"tableRowKeyId",border:"","default-expand-all":"","tree-props":{children:"items",hasChildren:"hasChildren"},"empty-text":"无需请求数据"}},[r("el-table-column",{attrs:{prop:"required",label:"必填",width:"100",align:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s("true"==t.row.required||1==t.row.required?"是":"否"))])]}}],null,!0)}),r("el-table-column",{attrs:{prop:"in",label:"参数位置",width:"120"}}),r("el-table-column",{attrs:{prop:"type",label:"参数类型",width:"120"}}),r("el-table-column",{attrs:{prop:"name",label:"参数名称",width:"300"}}),r("el-table-column",{attrs:{prop:"description",label:"参数描述"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.description?r("div",{domProps:{innerHTML:e._s(t.row.description)}}):e._e(),r("div",{staticClass:"desc-constraint"},[t.row.def?r("span",[e._v("默认值: "+e._s(t.row.def))]):e._e(),t.row.minLength?r("span",[e._v("最小长度: "+e._s(t.row.minLength))]):e._e(),t.row.maxLength?r("span",[e._v("最大长度: "+e._s(t.row.maxLength))]):e._e(),t.row.minimum?r("span",[e._v("最小值: "+e._s(t.row.minimum))]):e._e(),t.row.maximum?r("span",[e._v("最大值: "+e._s(t.row.maximum))]):e._e(),t.row.enums?r("span",[e._v("枚举值: "+e._s(t.row.enums))]):e._e(),t.row.pattern?r("span",[e._v("正则: "+e._s(t.row.pattern))]):e._e()])]}}],null,!0)})],1),t.body&&""!=t.body?r("div",[r("el-input",{staticStyle:{border:"0"},attrs:{type:"textarea",autosize:{minRows:1}},model:{value:t.body,callback:function(r){e.$set(t,"body",r)},expression:"api.body"}})],1):e._e()],1),r("div",{staticStyle:{padding:"10px"}},[r("div",{staticStyle:{display:"flex","align-items":"center"}},[r("div",{staticStyle:{"min-width":"60px"}},[r("b",[e._v("响应参数")])]),null!=t.produces?r("div",{staticStyle:{"margin-left":"auto"}},[e._v("Produces: "+e._s(t.produces))]):e._e()])]),r("div",{staticStyle:{padding:"5px 10px","background-color":"white"}},e._l(t.responses,(function(t,o){return r("div",{key:o},[r("p",[e._v("状态码: "+e._s(t.status)+" 状态信息: "+e._s(t.msg))]),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data,"row-key":"tableRowKeyId",border:"","default-expand-all":"","tree-props":{children:"items",hasChildren:"hasChildren"}}},[r("el-table-column",{attrs:{prop:"in",label:"参数位置",width:"120",align:"right"}}),r("el-table-column",{attrs:{prop:"type",label:"参数类型",width:"100",align:"right"}}),r("el-table-column",{attrs:{prop:"name",label:"参数名称",width:"300"}}),r("el-table-column",{attrs:{prop:"description",label:"参数描述"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.description?r("div",{domProps:{innerHTML:e._s(t.row.description)}}):e._e()]}}],null,!0)})],1)],1)})),0)])])])}))],2)})),1)],1)])],1)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("b",[e._v("分组列表")])])}],i=(r("aef6"),r("7f7f"),r("4f37"),r("0db5")),n=r("8a63"),s="view",c="edit",l={data:function(){var e=function(e,t,r){var o=!1;if(null!=t)for(var a=0;a<t.length;a++)if(""!=t[a].url.trim()){o=!0;break}o?r():r(new Error("请最少添加一个主机地址"))};return{project:{},projectEdit:{},editRules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"}],versions:[{required:!0,message:"请输入项目版本号",trigger:"blur"}],servers:[{required:!0,validator:e,trigger:"blur"}]},mode:s,dialogCreateGroupVisible:!1,groupDialogMode:c,groupData:{name:"",summary:"",sorts:0,description:"",externalUrl:null,externalDesc:null},groupDataRules:{name:[{required:!0,message:"请输入分组的名称",trigger:"blur"}],summary:[{required:!0,message:"请输入分组的简介",trigger:"blur"}]},groups:[],groupsLoading:!0}},created:function(){var e=this.$route.params.pid;null!=e?this.loadProject(e):this.$message.warning("加载项目信息失败!项目的id不能为空!")},methods:{loadProject:function(e){var t=this;Object(i["l"])(e,(function(r){var o=r.data;if(console.log("获取项目..."),console.log(o),200==o.code){if(null==o.data)return void t.$message.error("获取项目信息失败:请检查项目id是否正确!");t.project=o.data,t.loadProjectGroups(e),t.project.servers=JSON.parse(t.project.servers),null!=t.project.externalDocs&&(t.project.externalDocs=JSON.parse(t.project.externalDocs),null!=t.project.externalDocs.description&&(t.project.exDdescription=t.project.externalDocs.description),null!=t.project.externalDocs.url&&(t.project.exDurl=t.project.externalDocs.url)),t.projectEdit=JSON.parse(JSON.stringify(t.project))}else t.$message.error("获取项目信息失败:"+o.msg)}),(function(e){t.$message.error("获取项目信息失败,更多信息请查看浏览器控制台!"),console.log(e)}))},addServer:function(){this.projectEdit.servers.push({url:"",description:""})},removeServer:function(e){var t=this.projectEdit.servers;""==t[e].url&&""==t[e].description?t.splice(e,1):this.$confirm("确定移除数据吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.splice(e,1)})).catch((function(){}))},updateSubmit:function(){var e=this;this.$refs.projectEditForm.validate((function(t){if(!t)return e.$message.error("修改失败,请按提示完善项目信息!"),!1;var r={};r.key=e.projectEdit.key,r.name=e.projectEdit.name,r.versions=e.projectEdit.versions,null!=e.projectEdit.description&&(r.description=e.projectEdit.description),isNaN(e.projectEdit.sorts)||(r.sorts=parseInt(e.projectEdit.sorts));for(var o=[],a=0;a<e.projectEdit.servers.length;a++){var n=e.projectEdit.servers[a];""!=n.url&&(n.url.endsWith("/")&&(n.url=n.url.substring(0,n.url.length-1)),o.push(n))}r.servers=JSON.stringify(o);var c=null;null!=e.projectEdit.exDdescription&&""!=e.projectEdit.exDdescription&&(c={description:e.projectEdit.exDdescription}),null!=e.projectEdit.exDurl&&""!=e.projectEdit.exDurl&&(null==c&&(c={}),c.url=e.projectEdit.exDurl),null!=c&&(r.externalDocs=JSON.stringify(c)),null!=e.projectEdit.contactName&&""!=e.projectEdit.contactName&&(r.contactName=e.projectEdit.contactName),null!=e.projectEdit.contactInfo&&""!=e.projectEdit.contactInfo&&(r.contactInfo=e.projectEdit.contactInfo),console.log("执行修改项目..."),console.log(r),Object(i["u"])(r,(function(t){console.log(o);var o=t.data;200==o.code?(e.$message.success("修改成功!"),e.loadProject(r.key),e.mode=s):e.$message.error("修改失败:"+o.msg)}),(function(t){e.$message.error("修改失败,更多信息请查看控制台!"),console.log(t)}))}))},copySubmit:function(){var e=this;this.$confirm("确定复制该项目吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["e"])(e.project.key,(function(t){console.log(r);var r=t.data;200==r.code?(e.$message.success("复制成功!"),e.$router.push("/index")):e.$message.error("复制失败:"+r.msg)}),(function(t){e.$message.error("复制失败,更多信息请查看控制台!"),console.log(err)}))})).catch((function(){}))},deleteSubmit:function(){var e=this;this.$confirm("确定删除该项目吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["h"])(e.project.key,(function(t){console.log(r);var r=t.data;200==r.code?(e.$message.success("删除成功!"),e.$router.push("/index")):e.$message.error("删除失败:"+r.msg)}),(function(t){e.$message.error("删除失败,更多信息请查看控制台!"),console.log(err)}))})).catch((function(){}))},loadProjectGroups:function(e){var t=this;null!=e&&""!=e&&(this.groupsLoading=!0,Object(i["i"])(e,(function(e){var r=e.data;if(console.log("获取项目分组..."),console.log(r),200==r.code){for(var o=0;o<r.data.length;o++)for(var a=0;a<r.data[o].apis.length;a++){var i=r.data[o].apis[a];if(i.show=!1,null!=i.additional&&""!=i.additional&&(i.additional=JSON.parse(i.additional)),null!=i.externalDocs&&""!=i.externalDocs&&(i.externalDocs=JSON.parse(i.externalDocs)),null!=i.parameters){i.parameters=JSON.parse(i.parameters);for(var n=0;n<i.parameters.length;n++)t.recursionCreateTableRandomRowKey(i.parameters[n])}else i.parameters=[];if(null!=i.responses){var s=JSON.parse(i.responses);null!=s&&s.length>0&&(void 0==s[0].status||void 0==s[0].data)?i.responses=[{status:200,msg:"ok",data:s}]:i.responses=s;for(var c=0;c<i.responses.length;c++){var l=i.responses[c].data;for(n=0;n<l.length;n++)t.recursionCreateTableRandomRowKey(l[n])}}else i.responses=[]}t.groups=r.data,t.groupsLoading=!1}else t.$message.error("获取项目分组信息失败:"+r.msg)}),(function(e){t.$message.error("获取项目分组信息失败,更多信息请查看浏览器控制台!"),console.log(e)})))},groupCreateSubmit:function(){var e=this;this.$refs.groupEditForm.validate((function(t){if(t){var r={},o=e.project.key;if(r.projectId=o,r.sorts=e.groupData.sorts,r.name=e.groupData.name,r.summary=e.groupData.summary,r.description=e.groupData.description,null!=e.groupData.externalUrl&&""!=e.groupData.externalUrl||null!=e.groupData.externalDesc&&""!=e.groupData.externalDesc){var a={};null!=e.groupData.externalUrl&&""!=e.groupData.externalUrl&&(a.url=e.groupData.externalUrl),null!=e.groupData.externalDesc&&""!=e.groupData.externalDesc&&(a.description=e.groupData.externalDesc),r.externalDocs=JSON.stringify(a)}Object(i["q"])(r,(function(t){var r=t.data;console.log("新增分组..."),console.log(r),200==r.code?(e.loadProjectGroups(o),e.groupData={}):e.$message.error("新增分组失败:"+r.msg),e.dialogCreateGroupVisible=!1}),(function(t){e.$message.error("新增分组失败,更多信息请查看浏览器控制台!"),console.log(t),e.dialogCreateGroupVisible=!1}))}}))},showGroupUpdateDialog:function(e){this.dialogCreateGroupVisible=!0,this.groupDialogMode="view";var t={groupId:e.groupId,name:e.name,summary:e.summary,sorts:e.sorts,description:e.description};if(null!=e.externalDocs&&""!=e.externalDocs){var r=JSON.parse(e.externalDocs);t.externalUrl=r.url,t.externalDesc=r.description}this.groupData=t},groupUpdateSubmit:function(){var e=this;this.$refs.groupEditForm.validate((function(t){if(t){var r={},o=e.project.key;if(r.projectId=o,r.groupId=e.groupData.groupId,r.name=e.groupData.name,r.summary=e.groupData.summary,r.sorts=e.groupData.sorts,r.description=e.groupData.description,null!=e.groupData.externalUrl&&""!=e.groupData.externalUrl||null!=e.groupData.externalDesc&&""!=e.groupData.externalDesc){var a={};null!=e.groupData.externalUrl&&""!=e.groupData.externalUrl&&(a.url=e.groupData.externalUrl),null!=e.groupData.externalDesc&&""!=e.groupData.externalDesc&&(a.description=e.groupData.externalDesc),r.externalDocs=JSON.stringify(a)}Object(i["o"])(r,(function(t){var r=t.data;console.log("新增分组..."),console.log(r),200==r.code?e.loadProjectGroups(o):e.$message.error("新增分组失败:"+r.msg),e.dialogCreateGroupVisible=!1}),(function(t){e.$message.error("新增分组失败,更多信息请查看浏览器控制台!"),console.log(t),e.dialogCreateGroupVisible=!1}))}}))},groupDeleteSubmit:function(e){var t=this;this.$confirm("确定删除分组吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["f"])(e,(function(e){console.log("删除分组..."),console.log(r);var r=e.data;200==r.code?(t.$message.success("删除成功!"),t.loadProjectGroups(t.project.key)):t.$message.error("删除失败:"+r.msg)}),(function(e){t.$message.error("删除失败,更多信息请查看控制台!"),console.log(e)}))})).catch((function(){}))},groupMoveUp:function(e){var t=this;Object(i["b"])(e,(function(e){var r=e.data;200==r.code?(t.$message.success("移动成功!"),t.loadProjectGroups(t.project.key)):t.$message.error("分组排序上移失败:"+r.msg)}),(function(e){t.$message.error("分组排序上移失败,更多信息请查看浏览器控制台!"),console.log(e)}))},groupMoveDown:function(e){var t=this;Object(i["a"])(e,(function(e){var r=e.data;200==r.code?(t.$message.success("移动成功!"),t.loadProjectGroups(t.project.key)):t.$message.error("分组排序上移失败:"+r.msg)}),(function(e){t.$message.error("分组排序上移失败,更多信息请查看浏览器控制台!"),console.log(e)}))},apiDeleteSubmit:function(e){var t=this;this.$confirm("确定删除API吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["g"])(e,(function(e){var r=e.data;console.log("删除API..."),console.log(r),200==r.code?(t.$message.success("删除成功!"),t.loadProjectGroups(t.project.key)):t.$message.error("删除失败:"+r.msg)}),(function(e){t.$message.error("删除失败,更多信息请查看控制台!"),console.log(e)}))})).catch((function(){}))},apiMoveUp:function(e){var t=this;Object(i["d"])(e,(function(e){var r=e.data;console.log("API排序上移动..."),console.log(r),200==r.code?(t.$message.success("移动成功!"),t.loadProjectGroups(t.project.key)):t.$message.error("API排序上移失败:"+r.msg)}),(function(e){t.$message.error("API排序上移失败,更多信息请查看浏览器控制台!"),console.log(e)}))},apiMoveDown:function(e){var t=this;Object(i["c"])(e,(function(e){var r=e.data;console.log("API排序下移动..."),console.log(r),200==r.code?(t.$message.success("移动成功!"),t.loadProjectGroups(t.project.key)):t.$message.error("API排序上移失败:"+r.msg)}),(function(e){t.$message.error("API排序上移失败,更多信息请查看浏览器控制台!"),console.log(e)}))},recursionCreateTableRandomRowKey:function(e){if(e.tableRowKeyId="rowkey-"+Math.random(),null==e.items)return e;for(var t=0;t<e.items.length;t++)this.recursionCreateTableRandomRowKey(e.items[t])},formatDate:function(e){return Object(n["a"])(e)}}},p=l,u=(r("fc94"),r("2877")),d=Object(u["a"])(p,o,a,!1,null,"3c0230de",null);t["default"]=d.exports},fc94:function(e,t,r){"use strict";var o=r("06a9"),a=r.n(o);a.a},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-6c83f537.2cc7e5c6.js.map