(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0efc70"],{"9a0b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card-code",{attrs:{title:"功能表管理"}},[a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-center",modifiers:{"modal-center":!0}}],on:{click:function(t){e.modalShow=!e.modalShow}}},[a("span",[e._v("新增")])]),a("div",{staticClass:"custom-search d-flex justify-content-end"},[a("b-form-group",[a("div",{staticClass:"d-flex align-items-center"},[a("label",{staticClass:"mr-1",staticStyle:{"min-width":"max-content"}},[e._v("查詢")]),a("b-form-input",{staticClass:"d-inline-block",attrs:{placeholder:"Search",type:"text"},model:{value:e.searchTerm,callback:function(t){e.searchTerm=t},expression:"searchTerm"}})],1)])],1),a("vue-good-table",{attrs:{columns:e.columns,rows:e.rows,"group-options":{enabled:!0,collapsable:!0},"search-options":{enabled:!0,externalQuery:e.searchTerm},"pagination-options":{enabled:!0,perPage:e.pageLength}},scopedSlots:e._u([{key:"table-row",fn:function(t){return["action"===t.column.field?a("span",[a("span",[a("b-button",{staticClass:"mr-50",attrs:{variant:"gradient-primary"},on:{click:function(a){return e.editRow(t)}}},[a("feather-icon",{staticClass:"mr-50",attrs:{icon:"Edit2Icon"}}),a("span",[e._v("編輯")])],1),a("b-button",{attrs:{variant:"gradient-danger"}},[a("feather-icon",{staticClass:"mr-50",attrs:{icon:"TrashIcon"}}),a("span",[e._v("刪除")])],1)],1)]):e._e()]}},{key:"pagination-bottom",fn:function(t){return[a("div",{staticClass:"d-flex justify-content-between flex-wrap"},[a("div",{staticClass:"d-flex align-items-center mb-0 mt-1"},[a("span",{staticClass:"text-nowrap "},[e._v(" Showing 1 to ")]),a("b-form-select",{staticClass:"mx-1",attrs:{options:["10","20","50"]},on:{input:function(e){return t.perPageChanged({currentPerPage:e})}},model:{value:e.pageLength,callback:function(t){e.pageLength=t},expression:"pageLength"}}),a("span",{staticClass:"text-nowrap"},[e._v(" of "+e._s(t.total)+" entries ")])],1),a("div",[a("b-pagination",{staticClass:"mt-1 mb-0",attrs:{value:1,"total-rows":t.total,"per-page":e.pageLength,"first-number":"","last-number":"",align:"right","prev-class":"prev-item","next-class":"next-item"},on:{input:function(e){return t.pageChanged({currentPage:e})}},scopedSlots:e._u([{key:"prev-text",fn:function(){return[a("feather-icon",{attrs:{icon:"ChevronLeftIcon",size:"18"}})]},proxy:!0},{key:"next-text",fn:function(){return[a("feather-icon",{attrs:{icon:"ChevronRightIcon",size:"18"}})]},proxy:!0}],null,!0)})],1)])]}}])}),a("b-modal",{attrs:{id:"newRoleModal",centered:""},on:{ok:e.onSubmit},model:{value:e.modalShow,callback:function(t){e.modalShow=t},expression:"modalShow"}},[a("b-card-code",{attrs:{title:"新增選單"}},[a("b-form",[a("b-form-group",{attrs:{id:"input-group-5",label:"層級","label-for":"input-5"}},[a("b-form-select",{attrs:{id:"input-5",options:e.selectParent,required:""},model:{value:e.modalform.ParentTid,callback:function(t){e.$set(e.modalform,"ParentTid",t)},expression:"modalform.ParentTid"}})],1),a("b-form-group",{attrs:{id:"input-group-1",label:"名稱","label-for":"input-1"}},[a("b-form-input",{attrs:{id:"input-1",type:"email",required:""},model:{value:e.modalform.Name,callback:function(t){e.$set(e.modalform,"Name",t)},expression:"modalform.Name"}})],1),a("b-form-group",{attrs:{id:"input-group-2",label:"資源路徑","label-for":"input-2"}},[a("b-form-input",{attrs:{id:"input-2",required:""},model:{value:e.modalform.Url,callback:function(t){e.$set(e.modalform,"Url",t)},expression:"modalform.Url"}})],1),a("b-form-group",{attrs:{id:"input-group-3",label:"排序","label-for":"input-2"}},[a("b-form-input",{attrs:{id:"input-2",required:""},model:{value:e.modalform.OrderRule,callback:function(t){e.$set(e.modalform,"OrderRule",t)},expression:"modalform.OrderRule"}})],1)],1)],1)],1),a("b-modal",{attrs:{id:"editRoleModal",centered:""},on:{ok:e.onEdit},model:{value:e.editModalShow,callback:function(t){e.editModalShow=t},expression:"editModalShow"}},[a("b-card-code",{attrs:{title:"修改角色"}},[a("b-form",[a("b-form-group",{attrs:{id:"input-group-5",label:"層級","label-for":"input-5"}},[a("b-form-select",{attrs:{id:"input-5",options:e.selectParent,required:""},model:{value:e.editModalform.ParentTid,callback:function(t){e.$set(e.editModalform,"ParentTid",t)},expression:"editModalform.ParentTid"}})],1),a("b-form-group",{attrs:{id:"input-group-1",label:"名稱","label-for":"input-1"}},[a("b-form-input",{attrs:{id:"input-1",required:""},model:{value:e.editModalform.Name,callback:function(t){e.$set(e.editModalform,"Name",t)},expression:"editModalform.Name"}})],1),a("b-form-group",{attrs:{id:"input-group-2",label:"資源路徑","label-for":"input-2"}},[a("b-form-input",{attrs:{id:"input-2",required:""},model:{value:e.editModalform.Url,callback:function(t){e.$set(e.editModalform,"Url",t)},expression:"editModalform.Url"}})],1),a("b-form-group",{attrs:{id:"input-group-3",label:"排序","label-for":"input-2"}},[a("b-form-input",{attrs:{id:"input-2",required:""},model:{value:e.editModalform.OrderRule,callback:function(t){e.$set(e.editModalform,"OrderRule",t)},expression:"editModalform.OrderRule"}})],1)],1)],1)],1)],1)},o=[],n=(a("d3b7"),a("159b"),a("b0c0"),a("541c")),i=a("1947"),l=a("e8a3"),d=a("e98b"),s=a("26d2"),u=a("8226"),c=a("4797"),m=a("8361"),f=a("dd9a"),p=a("9eaa"),h=a("11de"),b=a("f617"),g=(a("4360"),a("42ea"));a("3e84");var v={components:{BCardCode:n["a"],VueGoodTable:b["a"],BButton:i["a"],BAvatar:l["a"],BBadge:d["a"],BPagination:s["a"],BFormGroup:u["a"],BFormInput:c["a"],BFormSelect:m["a"],BDropdown:f["a"],BDropdownItem:p["a"],BForm:h["a"]},data:function(){return{pageLength:10,dir:!1,columns:[{label:"名稱",field:"name"},{label:"資源路徑",field:"url"},{label:"排序",field:"orderRule"},{label:"階層",field:"level"},{label:"操作",field:"action"}],rows:[],searchTerm:"",childrenList:[],modalShow:!1,editModalShow:!1,modalform:{ParentTid:"",Name:"",Url:"",OrderRule:-1,Level:""},editModalform:{Tid:"",ParentTid:"",Name:"",Url:"",OrderRule:-1,Level:""},selectParent:[{text:"最上層",value:0}]}},computed:{},created:function(){this.getParentList(),this.getMenuList()},methods:{getMenuList:function(){var e=this;g["a"].get("/api/Menus").then((function(t){e.rows=[],t.data.forEach((function(t){var a=[];e.getChildren(t.children,a,t.tid),e.rows.push({tid:t.tid,parentTid:t.parentTid,name:t.name,url:t.url,orderRule:t.orderRule,level:t.level,children:a})}))})).catch((function(e){}))},getParentList:function(){var e=this;g["a"].get("/api/Menus/Parent").then((function(t){t.data.forEach((function(t){e.selectParent.push({value:t.tid,text:t.name})}))})).catch((function(e){}))},getChildren:function(e,t,a){var r=this,o=[];e.forEach((function(e){e.children.length>0&&r.getChildren(e.children,o,e.tid),o.length<=0?t.push({tid:e.tid,parentTid:a,name:e.name,url:e.url,orderRule:e.orderRule,level:e.level}):t.push({tid:e.tid,parentTid:a,name:e.name,url:e.url,orderRule:e.orderRule,level:e.level,children:o}),o=[]}))},onSubmit:function(e){var t=this;e.preventDefault(),g["a"].post("/api/Menus",{Name:this.modalform.Name,Url:this.modalform.Url,OrderRule:1*this.modalform.OrderRule,ParentTid:this.modalform.ParentTid}).then((function(e){t.modalShow=!1,t.onReset(),t.getMenuList()})).catch((function(e){t.$swal.fire("錯誤","新增失敗! 請稍後再試","error")}))},onEdit:function(e){var t=this;e.preventDefault(),g["a"].patch("/api/Menus/"+this.editModalform.Tid,{Name:this.editModalform.Name,Url:this.editModalform.Url,OrderRule:1*this.editModalform.OrderRule,ParentTid:this.editModalform.ParentTid}).then((function(e){t.editModalShow=!1,t.onReset(),t.getMenuList()})).catch((function(e){t.$swal.fire("錯誤","新增失敗! 請稍後再試","error")}))},onReset:function(){this.modalform=this.$options.data().modalform,this.editModalform=this.$options.data().editModalform},editRow:function(e){this.editModalShow=!this.editModalShow,this.editModalform.Tid=e.row.tid,this.editModalform.Name=e.row.name,this.editModalform.Url=e.row.url,this.editModalform.OrderRule=e.row.orderRule,this.editModalform.ParentTid=e.row.parentTid}}},w=v,M=a("2877"),x=Object(M["a"])(w,r,o,!1,null,null,null);t["default"]=x.exports}}]);
//# sourceMappingURL=chunk-2d0efc70.a16d3b48.js.map