/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	initLayout();
	serverTable.setTable();
	initEvent();
	validator.verify1();
	isValid = false;//验证标记
	$("#delIds").val('');
});

var serverTable = {
	/**
	 * 设置表格
	 */
	setTable:function(){
		  var height = $(window).height()-90;
		  var settings = {
		  	classes : 'table table-hover',
		  	height:height,
		  		//全部勾选
				onCheckAll:function(rows){
					if(rows){
						$("#delIds").val('');
						$.each(rows,function(i,item){
							var delIds = $("#delIds").val();
							$("#delIds").val(delIds+item.serverId+',');
						})
					}
				},
				//取消全部
				onUncheckAll:function(rows){
					$("#delIds").val('');
				},
				//单次勾选
				onCheck:function(row, $element){
					var delIds = $("#delIds").val();
					$("#delIds").val(delIds+row.serverId+',');
				},
				//取消单次勾选
				onUncheck:function(row, $element){
					var delIds = $("#delIds").val();
					var replaceStr = row.serverId+',';
					var reg = new RegExp(replaceStr,"g"); 
					var newStr = delIds.replace(reg,"");
					$("#delIds").val(newStr);
				},
				//翻页时清空勾选信息
				onPageChange:function(number, size){
					$("#delIds").val('');
				}
		  }
		  C.createTable("#bootstrapTable",Constants.CONTEXT_PATH+ '/server/getPageList.do',settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb:function(){
		$("#bootstrapTable").bootstrapTable('refresh', {
			url:Constants.CONTEXT_PATH+'/server/getPageList.do'
		});
		$("#delIds").val('');
	}
}

function serverTypeFormatter(value, row, index) {
    if(value==1){
    	return "CMS"
    }else if(value==2){
    	return "VSS";
    };
    return "";
}

function numberFormatter(value, row, index) {
    return index+1;
}
/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
	$(window).resize(function() {
		$('.main-container').height($(window).height() - 100);
	});
}

function initEvent(){
	//添加按钮
	$("#addBtn").click(function(){
		popUpWindow.addServer();
	});
	$("#editBtn").click(function(){
		var Ids = $("#delIds").val();
		Ids = Ids.substring(0,Ids.length-1);
		popUpWindow.editServer(Ids);
	});
	$("#delBtn").click(function(){
		var Ids = $("#delIds").val();
		Ids = Ids.substring(0,Ids.length-1);
		popUpWindow.deleteServer(Ids);
	});
}

/**
 * 弹出窗
 */
var popUpWindow = {
	/**
	 * 新增
	 */
	addServer:function(){
		popUpWindow.initWin();
		var d = dialog({
			title: '新增服务',
			content:document.getElementById('serverwin'),
			okValue: '确 定',
			ok: function () {
				validator.isPass();
				if(isValid){//全部验证通过
					postData.postAciton("addServer");
					serverTable.refreshTb();
					validator.verify1();
					return true;
				}else{
					return false;
				}
			},
			cancelValue: '取消',
			cancel: function () {
				validator.verify1();
			}
		});

		d.showModal();
	},
	/**
	 * 编辑
	 */
	editServer:function(Id){
		if(typeof(Id) == 'undefined' || Id == ''){
			layer.alert('请选择需要修改的记录!',{icon: 0});
		}else if(isNaN(Id)){
			layer.alert('只能选择一条记录!',{icon: 0});
		}else{
			popUpWindow.initWin();
			//赋值
			$.ajax({
				async:false,
				url:Constants.CONTEXT_PATH+'/server/findServerById.do',
				data:{id:Id},
				dataType:'json',
				success:function(data){
					console.log(data);
					$("#serverId").val(data.serverId);
					$("#serverType").val(data.serverType);
					$("#serverName").val(data.serverName);
					$("#ip").val(data.ip);
					$("#port").val(data.port);
					$("#isDNS").val(data.isDNS);
					$("#loginName").val(data.loginName);
					$("#loginPwd").val(data.loginPwd);
					$("#serverVersion").val(data.serverVersion);
					$("#loginPwd").focus(function(){ 
						$("#loginPwd").select();
						$("#loginPwd").val('');
					});
				},
				error:function(){
					layer.alert('请求服务器出错！',{icon: 2});
				}
			});
			//弹窗编辑
			var d = dialog({
				title: '编辑服务',
				content:document.getElementById('serverwin'),
				okValue: '确 定',
				ok: function () {
					validator.isPass();
					if(isValid){
						postData.postAciton("editServer");
						serverTable.refreshTb();
						validator.verify1();
						return true;
					}else{
						return false;
					}
				},
				cancelValue: '取消',
				cancel: function () {
					validator.verify1();
				}
			});

			d.showModal();
		}
	},
	/**
	 * 删除
	 */
	deleteServer:function(Ids){
		if(typeof(Ids) == 'undefined' || Ids ==''){
			layer.alert('请至少选择一条记录!',{icon: 0});
		}else{
			var d = dialog({
				title: '删除服务',
				content:'确定要删除服务？',
				okValue: '确 定',
				ok: function () {
					$.ajax({
						async:false,
						data:{ids:Ids},
						dataType:'json',
						url:Constants.CONTEXT_PATH+'/server/delete.do',
						success:function(data){
							console.log(data);
							if(data.ret == 1){
								layer.alert(data.msg,{icon: 1});
								serverTable.refreshTb();
							}else{
								layer.alert(data.msg,{icon: 1});
								return false;
							}
						},
						error:function(){
							layer.alert("请求服务器出错！",{icon: 2});
						}
					});
				},
				cancelValue: '取消',
				cancel: function () {
					
				}
			});

			d.showModal();
		}
	},
	/**
	 * 初始化弹出窗内容
	 */
	initWin:function(){
		this.emptyWin();
	},
	/**
	 * 清空弹出窗内容
	 */
	emptyWin:function(){
		$("#serverId").val('');
		$("#serverType").val('');
		$("#serverName").val('');
		$("#ip").val('');
		$("#port").val('');
		$("#isDNS").val(0);
		$("#loginName").val('');
		$("#loginPwd").val('');
		$("#serverVersion").val('');
	}	
}

/**
 * 提交信息
 */
var postData = {
	serverId : function(){
		return $("#serverId").val();
	},
	serverType : function(){
		return $("#serverType").val();
	},
	serverName : function(){
		return $("#serverName").val();
	},
	ip : function(){
		return $("#ip").val();
	},
	port : function(){
		return $("#port").val();
	},
	isDNS : function(){
		return $("#isDNS").val();
	},
	loginName : function(){
		return $("#loginName").val();
	},
	loginPwd : function(){
		return $("#loginPwd").val();
	},
	serverVersion : function(){
		return $("#serverVersion").val();
	},
	/**
	 * 提交操作
	 * @param type
	 */
	postAciton:function(type){
		var data = null;
		if(type == "addServer"){//添加组织结构
			data = {
				'server.serverType':postData.serverType(),
				'server.serverName':postData.serverName(),
				'server.ip':postData.ip(),
				'server.port':postData.port(),
				'server.isDNS':postData.isDNS(),
				'server.loginName':postData.loginName(),
				'server.loginPwd':hex_md5(postData.loginPwd()),
				'server.serverVersion':postData.serverVersion()
			}
		}else if(type == "editServer"){//编辑组织结构
			data = {
				'server.serverId': postData.serverId(),
				'server.serverType':postData.serverType(),
				'server.serverName':postData.serverName(),
				'server.ip':postData.ip(),
				'server.port':postData.port(),
				'server.isDNS':postData.isDNS(),
				'server.loginName':postData.loginName(),
				'server.loginPwd':postData.loginPwd().length==32?postData.loginPwd():hex_md5(postData.loginPwd()),
				'server.serverVersion':postData.serverVersion()
			}
		}
		$.ajax({
			async:false,
			data:data,
			dataType:'json',
			url:Constants.CONTEXT_PATH+'/server/saveOrUpdate.do',
			success:function(data){
				if(data.ret == 1){
					layer.alert(data.msg,{icon: 1});
					validator.verify1();
					serverTable.setTable();
					return true;
				}else{
					layer.alert(data.msg,{icon: 1});
					return false;
				}
			},
			error:function(){
				layer.alert("请求服务器失败！",{icon: 0});
				return false;
			}
		});
	}
}

/**
 * 验证规则
 */
var validator = {
	/**
	 * 验证填写1
	 */
	verify1:function(){
		$("#serverwin").validator({
		    fields: {
		        'serverType': 'required',
		        'serverName': 'required',
		        'isDNS': 'required'
		    }
		});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass:function(){
		$('#serverwin').isValid(function(v){    
		    if(v){
		    	isValid = true;
		    }
		});
	}
	
};


