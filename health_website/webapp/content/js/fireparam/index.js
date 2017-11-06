/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
// ////////////////////////////////////////////具体业务///////////////////////////////////////////////////////////
$(function() {
	initLayout();
	$(window).resize(function() {
		initLayout();
	});
	
	validator.verify();  // 注册表单验证
	
	//tooptip提示初始化
	$("#fireParamTb :input[type='text']").each(function(){
		inputObject[$(this).attr("name")] = 10000;
		if($(this).data('type')=="time"){
			return;
		}
		$(this).focus(function(){
			layer.tips($(this).data("tooltip"),$(this), {
				  tips: [1, '#3595CC'],
				  time:''
				});
		})
	})
	
	$("#fireParamTb :input[type='checkbox']").each(function(){
		inputObject[$(this).attr("name")] = 10000;
	})
	// 初始化开关样式
	initFireParamSwitch();
	// 左侧树生成初始化注册
	$.fn.zTree.init($("#orgtree"), treeSetting);
	// 页面初始化时设置按钮不可用,选中节点后可用
	$("#fireParamSetBtn").attr("disabled", "disabled");
	// 刷新按钮不可用
	$("#fireParamRefreshBtn").attr("disabled","disabled");
	// 设置按钮点击事件注册
	$("#fireParamSetBtn").click(settingBtn);
	// 刷新按钮
	$("#fireParamRefreshBtn").click(function(){
		// 回显数据
		var param={};
		param["deviceId"]=selectNode[0].idStr;
// param["signalIds"]=getCode();
		param["signalIds"]=['9999999999'];
		param["fsuId"] = selectNode[0].fsuId;
		param["c3mDeviceId"] = selectNode[0].c3mDeviceId;
		param["fsuIp"] = selectNode[0].hostIp;
		param["fsuPort"] = selectNode[0].hostPort;
		ajaxFun(getOneNodeSettingUrl,param,initOneNodeSetting);
	})
	// 初始化过程列表表格
	initFireParaGrid();	
});





/**
 * 初始化表格
 */
function initFireParaGrid() {
	$('#bootstrapTable').bootstrapTable({
		method : 'get',
		cache : false,
		striped : true,
		pagination : true,
		sortable:false,
		pageSize : 20,
		pageNumber : 1,
		showColumns : true,
		clickToSelect : true,
		data : "",
		columns : [ {
			field : "orgPat",
			title : "组织机构",
			align : "center",
			valign : "middle",
			sortable : "false"
		}, {
			field : "host",
			title : "安防系统监测主机",
			align : "center",
			valign : "middle",
			sortable : "false"
		}, {
			field : "hostIp",
			title : "安防系统监测主机IP",
			align : "center",
			valign : "middle",
			sortable : "false"
		}, {
			field : "equipName",
			title : "探测器名称",
			align : "center",
			valign : "middle",
			sortable : "false"
		}, {
			field : "settingStatus",
			title : "参数设置状态",
			align : "center",
			valign : "middle",
			sortable : "falseS"
		}, {
			field : "operate",
			title : "配置详情",
			align : "center",
			valign : "middle",
			sortable : "false"
		} ]
	});
}



/**
 * 左侧树生成配置开始
 */
var treeSetting = {
	// 复选框
	check : {
		enable : true,
		chkStyle : "checkbox",
		chkboxType : {
			"Y" : "s",
			"N" : "ps"
		}
	},
	async : {
		enable : true, // 设置 zTree是否开启异步加载模式
		url : initTreeUrl,
		autoParam : [ "id" ]
	// 异步加载时自动提交父节点属性的参数,假设父节点 node = {id:1, name:"test"}，异步加载时，提交参数 zId=1
	},
	data : { // 必须使用data
		simpleData : {
			enable : true,
			idKey : "id", // id编号命名 默认
			pIdKey : "parentId", // 父id编号命名 默认
			rootPId : 100
		// 用于修正根节点父节点数据，即 pIdKey 指定的属性值
		}
	},
	// 回调函数
	callback : {
		onClick : function(event, treeId, treeNode, clickFlag) {
			// 不做处理
/*
 * var zTree = $.fn.zTree.getZTreeObj("orgtree"); zTree.checkNode(treeNode,
 * !treeNode.checked, true);
 */

		}, // 节点点击
		onCheck : function(event, treeId, treeNode) {
			// 直接清空，重新加载过程列表表格
			emptyProcedureList();
			// 设置按钮可用
			$("#fireParamSetBtn").removeAttr("disabled");
			var zTree = $.fn.zTree.getZTreeObj("orgtree");
			var nodes = zTree.getCheckedNodes(true);
			var index = 0;
			selectNode=[];
			for (var i = 0; i < nodes.length; i++) {
				// 处理最后一级节点
				if (!nodes[i].isParent) {
					// 存储最后一级节点的id
					if (selectNodeId == "") {
						selectNodeId = nodes[i].idStr;
					} else {
						selectNodeId = selectNodeId + "," + nodes[i].idStr;
					}
					// 存储最后一级节点
					selectNode[index] = nodes[i];
					index = index + 1;
					// 新增一行过程数据(如果过程列表存在，则不加)
					if ($("#" + nodes[i].idStr).length<=0) {
						// 对象不存在
						addProcedureListRow(nodes[i]);
					}
				}
			}
			if(index==0){
				// 未选择节点，清空过程列表,并显示没选择的提示信息（列表中）
				emptyProcedureList();
				//隐藏通信状态
				$('#transStatus').hide().prev().hide();
				//input值初始化为空
				$("#fireParamTb :input[type='text']").each(function(){
					inputObject[$(this).attr("name")] = 10000;
					$(this).val("");
				})
				
				$("#fireParamTb :input[type='checkbox']").each(function(){
					inputObject[$(this).attr("name")] = 10000;
					$(this).val("");
				})
				
				$("#fireParamSetBtn").attr("disabled", "disabled");
				// 刷新按钮不可用
				$("#fireParamRefreshBtn").attr("disabled","disabled");
			}else{
				$("#fireParamSetBtn").removeAttr("disabled");
			}
			// 只选择了一个节点
			if(index==1){
				//显示通信状态
				$('#transStatus').show().prev().show();
				// 回显数据
				$("#fireParamRefreshBtn").removeAttr("disabled");
				$("#fireParamRefreshBtn").click();
			}
			 //选择了多个节点,input的值清空
			if(index>1){
				//隐藏通信状态
				$('#transStatus').hide().prev().hide();
				//tooptip提示初始化
				$("#fireParamTb :input[type='text']").each(function(){
					inputObject[$(this).attr("name")] = 10000;
					var type = $(this).data("type");
					switch(type){
						case 1:
							$(this).val(100);
							break;
						case 2:
							$(this).val(50);
							break;
						case 3:
							$(this).val(5);
							break;
						case 'protect':
							$(this).val(100);
							break;
						case 'time':
							$(this).val(getTimeDetail(new Date()));
						default:
							$(this).val();
					}
				})
				
				$("#fireParamTb :input[type='checkbox']").each(function(){
					inputObject[$(this).attr("name")] = 10000;
					if($(this).hasClass("offFireParamSwitch")){
						$(this).val('');
					}else{
						$(this).bootstrapSwitch('state',true);
					}
					
				})
				// 刷新按钮不可用
				$("#fireParamRefreshBtn").attr("disabled","disabled");
			}
		},// 树选中

		// 捕获异步加载出现异常错误的事件回调函数 和 成功的回调函数
		onAsyncError : zTreeOnAsyncError,
		onAsyncSuccess : function(event, treeId, treeNode, msg) {
			// 初始化自动搜索填充框
			initSearchAutCompleter();
		}
	}
};



// 点击设置按钮事件
function settingBtn() {
	if (validator.isPass()) {  // 通过表单验证
		 if (selectNodeId == "") {
				layer.alert('未选择节点！', {
					icon : 2
				});
				return;
			}
			// 过压、欠压、过流报警时间验证
		   var overpressure = $('#overpressure').val();
		   var lackpressure = $('#lackpressure').val();
		   var overflow = $('#overflow').val();
			
			 // 获取设置参数
			var params = getParamData();
			if(JSON.stringify(params) == "{}"){
				layer.msg("参数都没有改变，无需重新设置！",{time:1000});
				return;
			}
			// 添加设备id
			
			var temp=[];;
			for(var i = 0; i<selectNode.length; i++) {
				var equipment = {}
				equipment["deviceId"] = selectNode[i].idStr;
				equipment["c3mDeviceId"] = selectNode[i].c3mDeviceId;
				equipment["fsuIp"] = selectNode[i].hostIp;
				equipment["fsuPort"] = selectNode[i].hostPort;
				equipment["fsuId"] = selectNode[i].fsuId;
				equipment["orgId"]=selectNode[i].parentId;
				temp[i]=equipment;
			}
			params["equipmentIds"]=JSON.stringify(temp);
			// 获取设置参数进度
			var interval = setInterval( function() {
				$.ajax({  
					url : processUrl,
					method : "POST",
					success : function(data) {
						$('#bottomTips').html(data.bottomTips);
//						$('#processTips').html(data.totalTips);
						var rows = data.eachRowTips;
						for(var key in rows){
							$('#'+key.substr(4)).html(rows[key])
						}
					}
				})
			},1500);
			
			// 设置参数
			$.ajax({  
				url : settingUrl,
				data : params,
				method : "POST",
				traditional: true,
				dataType : 'json',
				success : function(data) {
					if(data.ret){
						// $('.layui-layer-btn0').trigger('click');
						layer.msg(data.message);
						setTimeout(function(){  // 3秒后停止获取设置参数进度
							clearInterval(interval);
						},1500);
					}else{
						layer.msg(data.message);
						setTimeout(function(){  // 2秒后停止获取设置参数进度
							clearInterval(interval);
						},1500);
					}
				},
				error : function() {
					clearInterval(interval);
					layer.close(layer.index);
					layer.msg("设置失败！",{time:2000})
				}
			})
			
			
			
		var loadingContent="<span id='getParams' class='layui-layer-content layui-layer-loading1'>修改设备参数中...</span>";
		var loadingMask =layer.msg(loadingContent, {
			  icon: 16 ,
			  time:0,
			  shade: 0.1,
		});
	 } else {  // 校验不通过，什么都不用做，校验信息已经正常显示在表单上
	  
	 }
	
}

/**
 * 初始化开关样式
 */
function initFireParamSwitch() {
	// 关
	commSwitch("offFireParamSwitch");
	// 开
	commSwitch("onFireParamSwitch");
//	$('.onFireParamSwitch').bootstrapSwitch('state',true);
}

/**
 * 编写表单验证函数validform，使之通过按钮点击事件调用验证函数对象
 */
var validator = {
		/**
		 * 验证填写1
		 */
		verify:function(){
		    $('#ajaxForm').validator({
		        fields: {
		            '0445340001': 'number;range[1~9999];digits;',
		            '0445310001': 'number;range[1~9999];digits',
		            '0445311001': 'number;range[1~9999];digits',
		            '0445312001': 'number;range[1~9999];digits',
		            '0445315001': 'number;range[1~9999];digits',
		            '0445316001': 'number;range[1~9999];digits',
		            '0445317001': 'number;range[1~9999];digits',
		            '0445320001': 'number;range[1~9999];digits',
		            '0445321001': 'number;range[1~9999];digits',
		            '0445322001': 'number;range[1~9999];digits',
		            '0445325001': 'number;range[1~9999];digits',
		            '0445326001': 'number;range[1~9999];digits',
		            '0445327001': 'number;range[1~9999];digits',
		            '0445330001': 'number;range[1~9999];digits',
		            '0445331001': 'number;range[1~9999];digits',
		            '0445332001': 'number;range[1~9999];digits',
		            '0445341001': 'number;range[100.0~120.0];decimal',
		            '0445342001': 'number;range[0.1~60.0];decimal',
		            '0445343001': 'number;range[40.0~100.0];decimal',
		            '0445344001': 'number;range[0.1~60.0];decimal',
		            '0445345001': 'number;range[100.0~120.0];decimal',
		            '0445346001': 'number;range[0.1~60.0];decimal'
		        },
		        errorPlacement: function(error, element) { //错误信息位置设置方法
		        	error.appendTo( element.parent().next() ); //这里的element是录入数据的对象
		        	}
		    })
		},
		/**
		 * 判断验证是否通过
		 */
		isPass : function() {
			var mark = false;
			$('#ajaxForm').isValid(function(v){    
			    if(v){
			    	mark = true;
			    }
			});
			return mark;
		}
	};
