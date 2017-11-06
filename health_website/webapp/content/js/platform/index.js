/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	initLayout();
	$(window).resize(function(){
		initLayout();
	});
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
							$("#delIds").val(delIds+item.id+',');
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
					$("#delIds").val(delIds+row.id+',');
				},
				//取消单次勾选
				onUncheck:function(row, $element){
					var delIds = $("#delIds").val();
					var replaceStr = row.id+',';
					var reg = new RegExp(replaceStr,"g"); 
					var newStr = delIds.replace(reg,"");
					$("#delIds").val(newStr);
				},
				//翻页时清空勾选信息
				onPageChange:function(number, size){
					$("#delIds").val('');
				}
		  }
		  C.createTable("#bootstrapTable",Constants.CONTEXT_PATH+ '/platform/getPageList.do',settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb:function(){
		$("#bootstrapTable").bootstrapTable('refresh', {
			url:Constants.CONTEXT_PATH+'/platform/getPageList.do'
		});
		$("#delIds").val('');
	}
}

function typeFormatter(value, row, index) {
    if(value==1){
    	return "高新兴"
    }
    return "";
}

function numberFormatter(value, row, index) {
    return index+1;
}

function operateFormatter(value, row, index) {
	if(value==0){
	   return ['<a class="enable" href="javascript:void(0)" title="启用">','<i class="glyphicon glyphicon-ok"></i>','</a>'].join("");
	}else{
	   return ['<a class="noenable" href="javascript:void(0)" title="禁用">','<i class="glyphicon glyphicon-remove"></i>','</a>'].join("");
	}
}

window.operateEvents = {
	'click .enable' : function(e, value, row, index) {
			$.ajax({
				url:Constants.CONTEXT_PATH+'/platform/enablePlatform.do',
				data:{id:row.id,isEnable:1},
				dataType:'json',
				success:function(data){
					layer.alert(data.msg,{icon: 1});
					serverTable.refreshTb();
				}
			});
	},
	'click .noenable' : function(e, value, row, index) {
			$.ajax({
				url:Constants.CONTEXT_PATH+'/platform/enablePlatform.do',
				data:{id:row.id,isEnable:0},
				dataType:'json',
				success:function(data){
					layer.alert(data.msg,{icon: 1});
					serverTable.refreshTb();
				}
			});
	}
	
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
			title: '新增平台',
			content:document.getElementById('platformwin'),
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
				url:Constants.CONTEXT_PATH+'/platform/findById.do?timestamp='+new Date(),
				data:{id:Id},
				dataType:'json',
				success:function(data){
					$("#id").val(data.id);
					$("#type").val(data.type);
					$("#name").val(data.name);
					$("#ip").val(data.ip);
					$("#port").val(data.port);
					$("#gbCode").val(data.gbCode);
					$("#loginName").val(data.loginName);
					$("#loginPwd").val(data.loginPwd);
					$("#loginPwd").focus(function(){ 
						$("#loginPwd").select();
						$("#loginPwd").val('');
					});
					$("#version").val(data.version);
					$("#remark").val(data.remark);
				},
				error:function(){
					layer.alert('请求服务器出错！',{icon: 2});
				}
			});
			//弹窗编辑
			var d = dialog({
				title: '编辑平台',
				content:document.getElementById('platformwin'),
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
				title: '删除平台',
				content:'确定要删除平台？',
				okValue: '确 定',
				ok: function () {
					$.ajax({
						async:false,
						data:{ids:Ids},
						dataType:'json',
						url:Constants.CONTEXT_PATH+'/platform/delete.do',
						success:function(data){
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
		$("#id").val('');
		$("#type").val(1);
		$("#name").val('');
		$("#ip").val('');
		$("#port").val('');
		$("#loginName").val('');
		$("#loginPwd").val('');
		$("#version").val('');
		$("#remark").val('');
		$("#gbCode").val('');
	}	
}

/**
 * 提交信息
 */
var postData = {
	id : function(){
		return $("#id").val();
	},
	type : function(){
		return $("#type").val();
	},
	name : function(){
		return $("#name").val();
	},
	ip : function(){
		return $("#ip").val();
	},
	port : function(){
		return $("#port").val();
	},
	loginName : function(){
		return $("#loginName").val();
	},
	loginPwd : function(){
		return $("#loginPwd").val();
	},
	version : function(){
		return $("#version").val();
	},
	remark : function(){
		return $("#remark").val();
	},
	gbCode : function(){
		return $("#gbCode").val();
	},
	/**
	 * 提交操作
	 * @param type
	 */
	postAciton:function(type){
		var data = null;
		if(type == "addServer"){//添加组织结构
			data = {
				'type':postData.type(),
				'name':postData.name(),
				'ip':postData.ip(),
				'port':postData.port(),
				'loginName':postData.loginName(),
				'loginPwd':hex_md5(postData.loginPwd()),
				'version':postData.version(),
				'remark':postData.remark(),
				'gbCode':postData.gbCode()
			}
		}else if(type == "editServer"){//编辑组织结构
			data = {
				'id': postData.id(),
				'type':postData.type(),
				'name':postData.name(),
				'ip':postData.ip(),
				'port':postData.port(),
				'loginName':postData.loginName(),
				'loginPwd':postData.loginPwd().length==32?postData.loginPwd():hex_md5(postData.loginPwd()),
				'version':postData.version(),
				'gbCode':postData.gbCode(),
				'remark':postData.remark()
			}
		}
		$.ajax({
			async:false,
			data:data,
			dataType:'json',
			url:Constants.CONTEXT_PATH+'/platform/saveOrUpdate.do',
			success:function(data){
				if(top.getPlatInfo){
					top.getPlatInfo();
				}
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
		$("#platformwin").validator({
		    fields: {
		        'type': 'required',
		        'name': 'required',
		        'ip': 'required',
		        'port': 'required',
		        'loginName': 'required',
		        'loginPwd': 'required'
		    }
		});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass:function(){
		$('#platformwin').isValid(function(v){    
		    if(v){
		    	isValid = true;
		    }
		});
	}
	
};


