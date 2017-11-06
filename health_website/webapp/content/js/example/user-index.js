/**
 * 用户管理js
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	initUserLayout();
	
	//initTable();
	//initOrgUserTree();
	//initUserList();
	//bindEvent();
});

var sysApps = new Array();

function initTable(){
	/*$.ajax({
		url : Constants.CONTEXT_PATH + "/user/getUserList.do",
		type : "post",
		async : false,
		error : function(req , textStatus , errorThrow) {
			//errorBox('服务器请求出错，请重试！',2000);
			alert("服务器请求出错，请重试！");
		},
		cache : false,
		success : function(result) {
			alert(result.data);
			
			//var data = result == "" ? "" : eval('('+result.data+')');
			//sysApps = "[{'userId':'1','userName':'11','accountName':'11'},{'userId':'1','userName':'11','accountName':'11'}]";
		}
	}); 
	*/
	sysApps = eval("[{'userId':'1','userName':'11','accountName':'11'},{'userId':'1','userName':'11','accountName':'11'}]");
	
	$('#bootstrapTable').bootstrapTable({
		data : sysApps,
		striped: true,
		idField : 'userId',
		formatNoMatches : function(){
			return '加载数据为空';
		}
	});
}

/**
 * 绑定事件
 */
function bindEvent() {

	$("#rightMenu li").on("click",function(ev){
		switch($(this).attr("id")){
		case "addOrg":
			break;
		case "editOrg":
			break;
		case "delOrg":
			break;
		case "searchOrg":
			break;
		}
		dialog(
				{
					id  : "saveOrUpdateOrgd",
					url : Constants.CONTEXT_PATH
							+ "/user/toSaveOrUpdateOrg.do",
					width : 270,
					height : 100,
					title : "编辑部门",
					button : [ {
						value : '确定',
						autofocus : true,
						callback : function() {
							$.gmsg({theme : "danger"});
						}
					}, {
						value : '取消'
					} ]
		}).showModal();
		rightContext.hide(ev);
		
	});
	
	$("button").on(
			"click",
			function() {

				switch ($(this).attr("id")) {

				case "addUser":
					dialog(
							{
								id  : "saveOrUpdateUserId",
								url : Constants.CONTEXT_PATH
										+ "/user/findUserByUserId.do?userId=0",
								width : 580,
								height : 400,
								title : "编辑用户",
								button : [ {
									value : '确定',
									autofocus : true,
									callback : function() {
										$.gmsg({theme : "success"});
									}
								}, {
									value : '取消'
								} ]
							}).showModal();

					break;
				case "editUser":
					dialog(
							{
								id  : "saveOrUpdateUserId",
								url : Constants.CONTEXT_PATH
								+ "/user/findUserByUserId.do?userId=1",
								width : 580,
								height : 400,
								title : "编辑用户",
								button : [ {
									value : '确定',
									autofocus : true,
									callback : function() {
										$.gmsg({theme : "success"});
									}
								}, {
									value : '取消'
								} ]
							}).showModal();
					
					break;

				}
				

			});

}

/**
 * 打开部门树dialog
 * @iframeDocument 子页面的document，可以获取弹出窗口的一些信息
 */
function openOrgTreeDialog(){
	dialog(
			{
				id  : "orgTreeId",
				url : Constants.CONTEXT_PATH
						+ "/user/toOrgTree.do",
				width : 230,
				height : 300,
				title : "部门树"
			}).show();
}

/**
 * 打开的部门树的双击事件调用的接口
 * @param ev
 * @param treeId
 * @param treeNode
 */
function orgTreeDlClick(ev,treeId,treeNode){
	if(dialog.get("saveOrUpdateUserId")){
		var orgName = dialog.get("saveOrUpdateUserId").iframeNode.contentDocument.getElementsByName("orgName")
		if(orgName){
			orgName[0].value = treeNode.name ;
		}
	}
	if(dialog.get("orgTreeId")){
		dialog.get("orgTreeId").close();
	}
	
}

/**
 * 高危帐号提醒
 */
function accountTip(){
	$.gmsg({theme : "warning",maskLayer : false ,contentHtml : "帐号存在异常操作!!",delayTime : 2 * 1000});
}

/**
 * 初始化用户列表
 */
function initUserList() {

	$('#user-list')
			.dataTable(
					{
						"dom" : 'frt<"bottom"ip<"lstyle"l>>',
						"searching" : false,
						"ordering" : false,
						"language" : {
							"lengthMenu" : "每页 _MENU_ 条记录",
							"zeroRecords" : "没有找到记录",
							"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
							"infoEmpty" : "无记录",
							"infoFiltered" : "(从 _MAX_ 条记录过滤)",
							"paginate" : {
								"first" : "首页",
								"previous" : "前一页",
								"next" : "后一页",
								"last" : "尾页"
							},
							"processing" : "正在加载.."
						},
						"processing" : true,
						"serverSide" : true,
						"ajax" : {
							"url" : Constants.CONTEXT_PATH
									+ "/user/findPageUserListByOrgId.do",
							"type" : "POST",
							"data" : function(param) { // 添加额外的参数

							}/*
								 * , "dataSrc": function ( json ) {
								 * //服务器返回的数据,可以格式话或者调试 return json; }
								 */
						},
						"initComplete": function(settings, json) { //行被创建时的回调函数,初始化进度条
							$("div[class='number-pb custom']").NumberProgressBar({
								style : 'percentage', //[basic, percentage, step]
								current : 75,
								duration : 3000
							})
						 },
						"columns" : [
								{
									"data" : "userId",
									"title" : "序号"
								},
								{
									"data" : "userName",
									"title" : "姓名"
								},
								{
									"data" : "accountName",
									"title" : "帐号",
									"render" : function(data, type, row) { // 格式化
										if(data == "accountName7"){
											return '<span class = "glabel warning" title = "高危帐号" '+
											        ' onclick = "accountTip()">'+
											       '<a href = "#"><i class = "fa fa-exclamation-triangle"></i>'+data+'</a></span>' ;
										}else{
											return data;
										}
										
									}
								},
								{
									"data" : "mobilePhone",
									"title" : "手机"
								},
								{
									"data" : "birthday",
									"title" : "生日"
								},
								{
									"data" : "position",
									"title" : "任务进度",
									"render" : function(data, type, row) { // 格式化
										return '<div class="number-pb custom" id = "pd'+row.userId+'">'+
											   '	<div class="number-pb-shown"></div>'+
											   '	<div class="number-pb-num"></div>'+
											   '</div>'
									}
								},
								{
									"data" : null,
									"title" : "操作",
									"render" : function(data, type, row){
										return    '<button class="gbtn gbtn-pure-no-border " style = "margin:0px 5px" title = "修改" id = "editUser">'
												+ '<i class="fa  fa-pencil info"></i>'
												+ '</button>'
												+ '<button class="gbtn gbtn-pure-no-border " style = "margin:0px 5px" title = "删除">'
												+ '	<i class="fa  fa-trash-o danger"></i>'
												+ '</button>'
												+ '<button class="gbtn gbtn-pure-no-border " style = "margin:0px 5px" title = "消息">'
												+ '	<i class="fa  fa-comments wounded"></i>'
												+ '</button>'
												+ '<button class="gbtn gbtn-pure-no-border " style = "margin:0px 5px" title = "禁用">'
												+ '	<i class="fa  fa-lock warning"></i>'
												+ '</button>'
									}
								} ]
					});

	
	
}

/**
 * 初始化用户布局
 */
function initUserLayout() {
	//alert($('#user-index-layout').layout);
	alert(1);
	//$('#user-index-layout').layout({
	//	applyDefaultStyles : true
	//});
	alert(2);
	//$(".main-container").height($(window).outerHeight() - 50 - 30 - 5);
	//alert(1);
	/*var treeHeight = $(".ui-layout-west").outerHeight()
			- $(".search").outerHeight() - 12;
	$(".tree").height(treeHeight);
	alert(1);*/
}

/**
 * initOrgUserTree
 */
function initOrgUserTree() {

	var setting = {
		"callback" : {
              onClick : function(event, treeId, treeNode){ //点击事件
            	   //更新右边用户列表
            	   
              },
              onRightClick : function(ev, treeId, treeNode){ //右键菜单
            	 rightContext =  $.gdropdown({content : "#rightMenu",target : ev.target,triev:ev,width : "90px",height : "50px"}); //返回值作为全局变量
              }
		}
	};
	$.ajax({
		url : Constants.CONTEXT_PATH + "/user/findOrgUserTree.do",
		success : function(zNodes) {
			var zTree = $.fn.zTree.init($("#userOrgTree"), setting, zNodes);
			autoComplete(zNodes, zTree);
		},
		error : function() {
			errorBox("服务器出错");
		}
	});

}
/**
 * 将tree的格式转话成autocomplete的格式
 */
function tree2autoComplate(treeData, list) {
	for (var i = 0; i < treeData.length; i++) {
		if (treeData[i].id != -1) {
			list.push({
				label : treeData[i].name,
				id : treeData[i].id,
				nodeType : treeData[i].nodeType
			});
		}
		if (treeData[i].children.length > 0) {
			tree2autoComplate(treeData[i].children, list);
		}
	}
	return list;
}

function autoComplete(treeData, zTree) {
	var data = tree2autoComplate(treeData, new Array());
	$("#orgUserSearch").autocompleter(
			{
				source : data,
				limit : 5,
				highlightMatches : true, // 高亮匹配的值
				customValue : "label", // 显示在input上的value
				callback : function(label, index, selected) {
					zTree.getNodesByFilter(function(node) {
						if (node.id == selected.id
								&& node.nodeType == selected.nodeType) {
							zTree.selectNode(node);
						}
					});
				}
			});

}
