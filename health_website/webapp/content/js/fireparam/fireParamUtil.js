/**
 * 电气火灾辅助方法
 */
// /////////////////////////////////////////////////////////////辅助方法///////////////////////////////////////////////////////////////////////


/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
//	$(window).resize(function() {
//		$('.main-container').height($(window).height() - 100);
//	});
	
	//左侧树高度设置
	var pageHeight=$("#mainContent").height();
	$("#sidebar").height($(window).height()-50);
	$("#treeWraper").height($(window).height()-80);
	$("#treeWraperPb").height($(window).height()-100);
	//分割线一致
	$(".hrSplitLine").width($(".trSplitLine").width()+50);
}

/**
 * 根据class设置开关
 */
function commSwitch(className) {
	$('.' + className).each(function() {
		$(this).bootstrapSwitch({
			onText : "开",
			offText : "关",
			onColor : "success",
			offColor : "info",
			size : "small",
			onInit: function(){
//				if(className.indexOf('onFireParamSwitch')!=-1){
//					$(this).val("1")
//				}else{
//					$(this).val("0")
//				}
			},
			onSwitchChange : function(event, state) {
				if (state == true) {
					$(this).val("1");
				} else {
					$(this).val("0");
				}
			}
		});
	})
}



/**
 * 新增过程列表表格数据
 */
function addProcedureListRow(node) {
	var table = document.getElementById("bootstrapTable");
	// 更新过程列表
	var operateNode = node;
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	cell1.innerHTML = operateNode["orgPath"];
	cell2.innerHTML = operateNode["host"];
	cell3.innerHTML = operateNode["hostIp"];
	cell4.innerHTML = operateNode["name"];
	cell5.innerHTML = "--";
	cell5.id = operateNode["idStr"];
	cell6.innerHTML = "<a href='javascript:detailLayer("+operateNode["idStr"]+")'>详情</a>";
	$(".no-records-found").css("display", "none");
}

/**
 * 发送ajax请求
 * 
 * @param url
 * @param data
 */
function ajaxFun(url, data,successFunction) {
	return $.ajax({
//		async : false,
		url : url+"?fresh="+Math.random(),
		data : data,
		beforeSend:function(){
			var loadingParams="<span id='getParams' class='layui-layer-content layui-layer-loading1'>设备参数获取中...</span>";
			var loadingMask =layer.msg(loadingParams, {
			  icon: 16 ,
			  time:0,
			  shade: 0.1
			});
		},
		method : "POST",
		dataType : 'json',
		traditional: true,//支持传递数组参数
		success : function(data) {
			if(successFunction){
				successFunction(data);
			}
		},
		error : function() {
//			layer.close(layer.index);
		}
	});
}

/**
 * 获取参数code
 * @returns {Array}
 */
function getCode(){
	var result = [];
	var index = 0;
	// input标签
	//input[name='text']
	// input[name='checkbox']
	$("#fireParamTb :input[type='text']").each(function() {
		var name = $(this).attr("name");
			result[index] = name;
			index++;
	});
	$("#fireParamTb :input[type='checkbox']").each(function() {
		var name = $(this).attr("name");
			result[index] = name;
			index++;
	});

	return result;
}

/**
 * 回显某台设备设置的值
 * @param data
 */
function initOneNodeSetting(data){
	layer.close(layer.index);
	for (var key in data) {
		//判断是否为通信状态
		if(key.indexOf('45006001')>-1){
			var $ele = $('#transStatus');
			if(data[key]*1==1){
				$ele.text('中断').css('color','red');
			}else{
				$ele.text('正常').css('color','green');
			}
		}
		//跳过参数设置页面不存在的元素
		if(inputObject[key] == undefined){ 
			continue;
		}
		
		//修改inputObject值
		inputObject[key] = data[key];
		var obj=$("#fireParamTb :input[name='"+key+"']");
		//判断input框所填是否为时间
		if(obj.data('type') == 'time'){
			obj.val( getTimeDetail(parseFloat(data[key]*1000))); //正常时间
			continue;
		}
		//开关特殊处理
		if(obj.attr("type")=="checkbox"){
			if(data[key]==0){
				obj.bootstrapSwitch('state',false); //关状态
				continue;
			}else{
				obj.bootstrapSwitch('state',true); //开状态
				continue;
			}
		}
		obj.val(parseFloat(data[key]));
		//日期特殊处理
    }
}


/**
 * 获取页面查询元素
 * 
 * @returns {Array}
 */
function getParamData() {
	var result = {};
	// input标签
	$("input:not(:button)").each(function() {
		// 不可用直接返回
		if ($(this).attr("disabled")) {
			return;
		}
		var type = $(this).attr("type");
		var name = $(this).attr("name");
		var value = $(this).val();
		
		if (name && value) {
			var division =  $(this).data("type");
			if(division && division == "time"){
				var date = new Date(new Date(Date.parse(value.replace(/-/g, "/"))));
				value = (date.getTime())/1000; //日期作为参数的时候转换成从1970年1月1日到当前时间的秒数
			}
			//bootstrap没改变的按钮值
			if(value=="on"){ 
				return;
			}
			//获取参数后没有改变值则不传递到后台
			if(parseFloat(value) == inputObject[name]){
				return;
			}
			if(division && division == "protect"){ //保护设定值
				value = value*10;
			}
			result[name] = value;
		}
	});
	// select标签
	$("select").each(function() {
		// 不可用直接返回
		if ($(this).attr("disabled"))
			return;
		var name = $(this).attr("name");
		var value = $(this).val();
		if (name && value) {
			result[name] = value;
		}
	})
	return result;
}

// 加载错误提示
function zTreeOnAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus,
		errorThrown) {
	alert("加载错误：" + XMLHttpRequest);
};

// 过滤函数
function filter(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for (var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
}

/**
 * 详情
 */
function detailLayer(equipmentId){
	layer.open({
	  type: 2,
	  title: '系统设置 — 电气火灾监控探测器 — 详情',
	  shadeClose: true,
	  shade: 0.3,
	  area: ['95%', '95%'],
	  content: Constants.CONTEXT_PATH+ "/fire_param/detail?equipmentId="+equipmentId // iframe的url
   }); 
}	

/**
 * 清空过程列表页面显示数据
 */
function emptyProcedureList(){
	$(".no-records-found").css("display","").siblings().each(function(){
		$(this).remove();
		$("#fireParamSetBtn").attr("disabled", "disabled");
	});
}

/**
 * 初始化自动完成的搜索框数据
 */
function initSearchAutCompleter(){
	 $( "#fireParamOrgSearch" ).autocompleter({
	        source: getAutoCompleteData(),
			limit : 5,
			highlightMatches : true, // 高亮匹配的值
			customValue : "label", // 显示在input上的value
			callback : function(label,index) {
				//打开节点
				var zTree=$.fn.zTree.getZTreeObj("orgtree");
				var idStr=getAutoCompleteData()[index].value;
				var zTreeNode= zTree.getNodeByParam("idStr",idStr);
				if(zTreeNode!=null){
		            zTree.selectNode(zTreeNode);  
		            zTree.expandNode(zTreeNode, true, true, true);
		            //选中节点
		            
				}
			}});
}

/**
 * 获取所有树节点数据，转换成符合自动填充的格式
 * @returns {Array}
 */
function getAutoCompleteData(){
	var data=[];
	var zTree=$.fn.zTree.getZTreeObj("orgtree");
	var treeObj =zTree .getNodes();
	var treeObjArray= zTree.transformToArray(treeObj)
	for(var i=0;i<treeObjArray.length;i++){
		var treeNode={};
		treeNode["label"]=treeObjArray[i].name;
		treeNode["value"]=treeObjArray[i].idStr;
		data[i]=treeNode;
	}
	return data;
}

/**
 * 根据时间搓格式化时间
 * @param obj
 * @returns {String}
 */
function getTimeDetail(obj){
	var TIME = new Date(obj);
    var iYear = TIME.getFullYear();
    var iMonth = TIME.getMonth() + 1;
    var iDate = TIME.getDate();
    var iDay = TIME.getDay();
    var iHours = TIME.getHours();
    var iMinutes = TIME.getMinutes();
    var iSeconds = TIME.getSeconds();
    if(iMinutes < 10) {
        iMinutes = "0" + iMinutes
    };
    if(iHours < 10) {
        iHours = "0" + iHours
    };
    if(iSeconds < 10) {
      iSeconds = "0" + iSeconds
    };
    var res=iYear+'-'+iMonth+'-'+iDate+' '+iHours+':'+iMinutes+':'+iSeconds;
  return res;
}
