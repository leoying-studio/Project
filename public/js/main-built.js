<<<<<<< HEAD
define("common/init",["require"],function(e){return{grid:function(e,t){var i=$("#grid");i.data("kendoGrid")&&(i.data("kendoGrid").destroy(),i.empty());var a=$(".right-wrapper").eq(0).height(),n=$(".right-header").eq(0).height(),r=a-n-2+"px";return e={serverPaging:!0,serverFiltering:!0,serverSorting:!0,pageSize:10},i.kendoGrid({dataSource:new kendo.data.DataSource(e),height:r,scrollable:!0,resizable:!0,sortable:!0,filterable:!0,refresh:!0,editable:"inline",pageable:{input:!0,numeric:!1,refresh:!0},columns:t,columnMenu:!0})},window:function(e,t,i){if(e.data("kendoWindow"))return e.data("kendoWindow").center().open();e.kendoWindow({width:i||"400px",title:t||"form",visible:!1,actions:["Pin","Minimize","Maximize","Close"]}).data("kendoWindow").center().open()}}}),define("common/utils",["require"],function(e){return{htmlEncode:function(e){var t=document.createElement("div");void 0!=t.textContent?t.textContent=e:t.innerText=e;var i=t.innerHTML;return t=null,i},htmlDecode:function(e){var t=document.createElement("div");t.innerHTML=e;var i=t.innerText||t.textContent;return t=null,i},htmlEncodeByRegExp:function(e){var t="";return 0==e.length?"":(t=e.replace(/&/g,"&amp;"),t=t.replace(/</g,"&lt;"),t=t.replace(/>/g,"&gt;"),t=t.replace(/ /g,"&nbsp;"),t=t.replace(/\'/g,"&#39;"),t=t.replace(/\"/g,"&quot;"))},htmlDecodeByRegExp:function(e){var t="";return 0==e.length?"":(t=e.replace(/&amp;/g,"&"),t=t.replace(/&lt;/g,"<"),t=t.replace(/&gt;/g,">"),t=t.replace(/&nbsp;/g," "),t=t.replace(/&#39;/g,"'"),t=t.replace(/&quot;/g,'"'))}}}),define("manager/config",["require","../common/utils"],function(e,t){return{columns:{articles:[{field:"title",title:"标题",width:"100px"},{field:"description",title:"文章说明"},{field:"img",title:"图片地址",width:"100px"},{field:"navId",title:"导航id",width:"100px"},{field:"createdTime",title:"发布时间"},{title:"操作",command:[{text:"删除",click:function(e){var t=this.dataItem($(e.currentTarget).closest("tr")),i=t.categoriesId.toJSON()[0].id;window.confirm("确定删除吗?",function(){$.ajax({url:"/article/del",dataType:"json",type:"post",data:{navId:t.navId,articleId:t._id,categoryId:i},success:function(e){$("#grid").data("kendoGrid").dataSource.read()},error:function(e){alert(e.msg)}})})}},{text:"编辑",click:function(e){var t=this.dataItem($(e.currentTarget).closest("tr")),i=t.categoriesId.toJSON()[0].id;$("#article-update-title").val(t.title),$("#article-update-navId").val(t.navId),$("#article-update-description").val(t.description),$("#article-update-img").val(t.img),$("#article-update-categoryId").val(i),$("#article-update-articleId").val(t._id),$("#articleUpdateForm").kendoWindow({width:"400px",title:"文章项编辑",visible:!1,actions:["Pin","Minimize","Maximize","Close"]}).data("kendoWindow").center().open()}},{text:"详情",click:function(e){var t=this.dataItem($(e.currentTarget).closest("tr"));$.ajax({url:"/article/article_detail/getDetail",type:"get",dataType:"json",data:{articleId:t._id},success:function(e){$("#article_detail_articleId").val(e.data.params.articleId),$("#article_detail_title").val(e.data.title||""),$("#article-detail-content").data("kendoEditor").value($("<div>").html(e.data.content).text()),$("#detailForm").kendoWindow({width:"1000px",title:"设置文章详情",visible:!1,actions:["Pin","Minimize","Maximize","Close"]}).data("kendoWindow").center().open()},error:function(){alert("获取信息失败")}})}}]}],categories:[{field:"name",title:"类别名称"},{field:"_id",title:"id"},{command:"destroy",title:" ",width:"150px"}],navs:[{field:"name",title:"导航名称"},{field:"_id",title:"id"},{title:"操作",command:[{name:"destroy",text:"删除",click:function(){}},{name:"edit",text:"编辑",click:function(e){}}]}]},editor:{tools:["bold","italic","underline","strikethrough","justifyLeft","justifyCenter","justifyRight","justifyFull","insertUnorderedList","insertOrderedList","indent","outdent","createLink","unlink","insertImage","insertFile","subscript","superscript","createTable","addRowAbove","addRowBelow","addColumnLeft","addColumnRight","deleteRow","deleteColumn","viewHtml","formatting","cleanFormatting","fontName","fontSize","foreColor","backColor","print"],resizable:{content:!0,toolbar:!1}}}}),define("manager/navs",["require","../common/init","./config"],function(e,t,i){var a=0,n=null,r=null,o=null;$("#navMenu").kendoMenu({}),$("#panelWrapper").kendoPanelBar({expandMode:"multiple",select:function(e){var d=e.item;switch(a=d.getAttribute("panel-item-type")){case"0":n=d.getAttribute("navId");var l=JSON.parse(d.getAttribute("navs"));o=t.grid(l,i.columns.navs);break;case"1":n=d.getAttribute("navId"),categories=JSON.parse(d.getAttribute("categories")),o=t.grid(categories,i.columns.categories);break;case"2":n=d.getAttribute("navId"),r=d.getAttribute("categoryId");var c="/article/list?navId="+n+"&categoryId="+r,s={transport:{read:{url:c,dataType:"json",type:"get"},parameterMap:function(e,t){return e}},batch:!0,schema:{data:"articles",total:"total"}};t.grid(s,i.columns.articles)}}}),$("#groupItemAdd").click(function(){if(0==a)t.window($("#navForm"),"添加导航模块");else if(1==a)$("#categoryNavId").val(n),t.window($("#categoryForm"),"添加文章类别");else if(2==a){$("#blog-cateory").html("");for(var e=0;e<categories.length;e++)$("#blog-cateory").append("<input type='checkbox' name='categoriesId[]' value="+categories[e]._id+">"+categories[e].name);$("#navId-input").val(n),t.window($("#articleForm"),"添加文章列表项")}}),$("#article-detail-content").kendoEditor(i.editor),$("#article_detail_submit").click(function(){var e=$("#article-detail-content").val(),t=$("#article_detail_title").val(),i=$("#article_detail_articleId").val();$.ajax({url:"/article/article_detail/submit",type:"post",data:{articleId:i,content:e,title:t},dataType:"json",success:function(e){200==e.code&&alert("success")},error:function(e){alert("error")}})}),$("#toolbar").kendoToolBar({items:[{type:"button",text:"添加",id:"add"},{type:"button",text:"刷新",id:"refresh"}],click:function(e){if("add"==e.id)switch(a){case"0":t.window($("#navForm"));break;case"1":t.window($("#categoryForm"));break;case"2":t.window($("#articleForm"))}else $("#grid").data("kendoGrid").dataSource.read()}})}),require.config({paths:{manager:"./manager/index",config:"./manager/config",init:"./common/init",utils:"./common/utils",navs:"./manager/navs"},shim:{manager:{deps:["css!./../css/reset.css","css!./../css/common.css","css!./../css/manager.css"]}},map:{"*":{css:"../lib/require/css.min.js"}}}),require(["./manager/navs"],function(){}),define("main",function(){});
=======
define("common/init",["require"],function(e){function t(e,t){var n=$("#grid");n.data("kendoGrid")&&(n.data("kendoGrid").destroy(),n.empty());var i=$(".right-wrapper").eq(0).height(),r=$(".right-header").eq(0).height(),a=i-r-2+"px";DataSource.serverPaging=!0,DataSource.serverFiltering=!0,DataSource.serverSorting=!0,DataSource.pageSize=10;var n=n.kendoGrid({dataSource:new kendo.data.DataSource(e),height:a,scrollable:!0,resizable:!0,sortable:!0,filterable:!0,refresh:!0,editable:"inline",pageable:{input:!0,numeric:!1,refresh:!0},columns:t,columnMenu:!0});return n}function n(e,t,n){if(e.data("kendoWindow"))return e.data("kendoWindow").center().open();e.kendoWindow({width:n||"400px",title:t||"form",visible:!1,actions:["Pin","Minimize","Maximize","Close"]}).data("kendoWindow").center().open()}function i(e){return e.data("kendoEditor")?e.data("kendoEditor"):e.kendoEditor({resizable:{content:!1,toolbar:!0},change:function(){},select:function(){},execute:function(){},paste:function(){},tools:["bold","italic","underline","strikethrough","justifyLeft","justifyCenter","justifyRight","justifyFull","insertUnorderedList","insertOrderedList","indent","outdent","createLink","unlink","insertImage","insertFile","subscript","superscript","createTable","addRowAbove","addRowBelow","addColumnLeft","addColumnRight","deleteRow","deleteColumn","viewHtml","formatting","cleanFormatting","fontName","fontSize","foreColor","backColor","print"]}).data("kendoEditor")}return{grid:t,window:n,editor:i}}),define("common/utils",["require"],function(e){return{htmlEncode:function(e){var t=document.createElement("div");void 0!=t.textContent?t.textContent=e:t.innerText=e;var n=t.innerHTML;return t=null,n},htmlDecode:function(e){var t=document.createElement("div");t.innerHTML=e;var n=t.innerText||t.textContent;return t=null,n},htmlEncodeByRegExp:function(e){var t="";return 0==e.length?"":(t=e.replace(/&/g,"&amp;"),t=t.replace(/</g,"&lt;"),t=t.replace(/>/g,"&gt;"),t=t.replace(/ /g,"&nbsp;"),t=t.replace(/\'/g,"&#39;"),t=t.replace(/\"/g,"&quot;"))},htmlDecodeByRegExp:function(e){var t="";return 0==e.length?"":(t=e.replace(/&amp;/g,"&"),t=t.replace(/&lt;/g,"<"),t=t.replace(/&gt;/g,">"),t=t.replace(/&nbsp;/g," "),t=t.replace(/&#39;/g,"'"),t=t.replace(/&quot;/g,'"'))}}}),define("manager/config",["require","./../common/utils","./../common/init"],function(e,t,n){var i={};return i.articles=function(e,t){return[{field:"title",title:"标题",width:"100px"},{field:"description",title:"文章说明"},{field:"img",title:"图片地址",width:"100px"},{field:"navId",title:"导航id",width:"100px"},{field:"createdTime",title:"发布时间"},{title:"操作",command:[{text:"删除",click:e||new Function},{text:"编辑",click:t||new Function}]}]},i.categories=function(){return[{field:"name",title:"类别名称"},{field:"_id",title:"id"},{command:"destroy",title:" ",width:"150px"}]},i.navs=function(e,t){return[{field:"name",title:"导航名称"},{field:"_id",title:"id"},{title:"操作",command:[{name:"destroy",text:"删除",click:e||new Function},{name:"edit",text:"编辑",click:t||new Function}]}]},{columns:i,editor:{tools:["bold","italic","underline","strikethrough","justifyLeft","justifyCenter","justifyRight","justifyFull","insertUnorderedList","insertOrderedList","indent","outdent","createLink","unlink","insertImage","insertFile","subscript","superscript","createTable","addRowAbove","addRowBelow","addColumnLeft","addColumnRight","deleteRow","deleteColumn","viewHtml","formatting","cleanFormatting","fontName","fontSize","foreColor","backColor","print"],resizable:{content:!0,toolbar:!1}}}}),define("manager/index",["require","./../common/init","./config"],function(e,t,n){function i(e){var n=this.dataItem($(e.currentTarget).closest("tr"));t.editor($("#articleUpdateEditor")).value(n.content||""),$("#articleUpdateForm").children().each(function(e,t){var i=$(t).children().eq(1),r=i.attr("name"),a=n[r];"recommend"==r&&$(i).attr("checkbox",a),i.val(a)}),l($("#articleUpdateForm #categories"),$(d).siblings().andSelf()),$("#articleUpdateForm #categories").children().each(function(e,t){var i=$(t).attr("value");n.categoriesId.forEach(function(e,n){i==e.id&&$(t).attr("checked",!0)})}),t.window($("#articleUpdateForm"),"文章项编辑","800px")}var r=0,a=null,o=null,c=null,d=null;$("#navMenu").kendoMenu({}),$("#panelWrapper").kendoPanelBar({expandMode:"multiple",select:function(e){switch(d=$(e.item),r=d.attr("panel-item-type")){case"0":break;case"1":a=d.attr("navId"),c=t.grid(null,n.columns.categories());break;case"2":o=d.attr("categoryId"),l($("#articleForm #categories"),$(d).siblings().andSelf()),$("#navIdInput").val(a);var u="/article/data?navId="+a+"&categoryId="+o,s={transport:{read:{url:u,dataType:"json",type:"get"},parameterMap:function(e,t){return e}},batch:!0,schema:{data:"articles",total:"total"}};t.grid(s,n.columns.articles(null,i))}}});var l=function(e,t){var n="";$.each(t,function(e,t){var t=$(t),i=t.attr("categoryId"),r=t.text();n+="<input type='checkbox' name='categoriesId[]' value="+i+">"+r}),e.html(n)};$("#toolbar").kendoToolBar({items:[{type:"button",text:"添加",id:"add"},{type:"button",text:"刷新",id:"refresh"}],click:function(e){if("add"==e.id)switch(r){case"0":t.window($("#navForm"));break;case"1":t.window($("#categoryForm"));break;case"2":l($("#articleForm #categories"),$(d).siblings().andSelf()),t.window($("#articleForm"),"添加文章","900px")}else $("#grid").data("kendoGrid").dataSource.read()}})}),require.config({paths:{manager:"./manager/index",config:"./manager/config",init:"./common/init",utils:"./common/utils"},shim:{manager:{deps:["css!./../css/reset.css","css!./../css/common.css","css!./../css/manager.css"]}},map:{"*":{css:"../lib/require/css.min.js"}}}),require(["./manager/index"],function(e){}),define("main",function(){});
>>>>>>> 5274742a67c0fe5b672feacc34e45eaa99075f4f
