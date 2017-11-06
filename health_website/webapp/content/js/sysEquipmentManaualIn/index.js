$(function() {
	_init.initLayout();
	_init.initEvent();
	_serverTable.setTable();
	_validator.verify1();
});

var _serverTable = {
	typeMap:{},
	rowMap:{},
	/**
	 * 设置表格
	 */
	setTable:function(){
		  var height = $(window).height()-110;
		  var settings = {
		  	classes : 'table table-hover',
		  	height:height,
	  		//全部勾选
			onCheckAll:function(rows){
				_init.delIds = '';
				$.each(this.data,function(i,item){
					_init.delIds +=item.equipmentId+',';
				})
			},
			//取消全部
			onUncheckAll:function(rows){
				_init.delIds = '';
			},
			//单次勾选
			onCheck:function(row, $element){
				_init.delIds += row.equipmentId+',';
			},
			//取消单次勾选
			onUncheck:function(row, $element){
				var delIds = _init.delIds;
				var replaceStr = row.equipmentId+',';
				var reg = new RegExp(replaceStr,"g"); 
				_init.delIds = delIds.replace(reg,"");
			},
			//翻页时清空勾选信息
			onPageChange:function(number, size){
				_init.delIds = '';
			},
			queryParams : function(params) {
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;					
				params['search_LIKE_name'] = $("#equipmentName").val() || "";
				params['search_LIKE_netAddress'] = $("#netAddress").val() || "";
				params['search_EQ_orgId'] = treeSelectOrgId;
				return params;
			}
			,
			responseHandler :  function(result) {
				_serverTable.rowMap = {};
				if (result) {
					for(var i in result.content){
						_serverTable.rowMap[result.content[i].equipmentId] = result.content[i];
					}
					return {
						rows : result.content,
						total : result.totalElements
					};
				} else {
					return {
						"rows" : [],
						"total" : 0
					};
				}
			}
		  }
		  C.createTable("#bootstrapTable",Constants.CONTEXT_PATH+ '/sysEquipmentManaualIn/getPageList.do',settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb:function(){
		$("#bootstrapTable").bootstrapTable('refresh', {
			url:Constants.CONTEXT_PATH+'/sysEquipmentManaualIn/getPageList.do'
		});
		_init.delIds = '';
	},
	resize:function(){
		$("#bootstrapTable").bootstrapTable('resetView',{height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30});
	}
}

function numberFormatter(value, row, index){
	return index+1;
}
function equipmentTypeFormatter(value, row, index){
	return _serverTable.typeMap[value];
}
/**
 * 初始化
 */
var _init = {
    delIds:'',
	initLayout:function() {
		$(".main-container").height($(window).outerHeight() - 100);
		$(window).resize(function(){
			$(".main-container").height($(window).outerHeight() - 100);
			_serverTable.resize();
		});

	},
	initEvent:function(){
		/**
		 * 初始化设备类型 getManaulEquipmentType
		 */
		$.ajax({
			url:Constants.CONTEXT_PATH+"/sysEquipmentManaualIn/getManaulEquipmentType",
			type:"POST",
			dataType:'json',
			success:function (types) {
				if(types.length==0){
					layer.alert('获取不到设备类别',{icon:0});
					return;
				}
				var options ='';
				for(var i in types){
					_serverTable.typeMap[types[i][0]] = types[i][2];
					options += '<option value="'+types[i][0]+'">'+types[i][2]+'</option>';
				}
				$("#param_equipmentType").append(options);
	        },
	        error:function(){
	        	layer.alert('系统出错!',{icon: 2});
	        }
		});
		$("#addBtn").click(function(){
			_popUpWindow.editServer(null);
		});
		$("#modifyBtn").click(function(){
			var Ids = _init.delIds;
			Ids = Ids.substring(0,Ids.length-1);
			if(typeof(Ids) == 'undefined' || Ids == ''){
				layer.alert('请选择需要修改的记录!',{icon: 0});
				return;
			}else if(isNaN(Ids)){
				layer.alert('只能选择一条记录!',{icon: 0});
				return;
			}
			var row = _serverTable.rowMap[Ids];
			if(row){
				_popUpWindow.editServer(row);
			}else{
				layer.alert('查找不到该记录!',{icon: 0});
			}
		});
		$('#deleteBtn').click(function(){
			var Ids = _init.delIds;
			Ids = Ids.substring(0,Ids.length-1);
			_popUpWindow.deleteServer(Ids);
		});
		$("#search,#refreshBtn").click(function(){
			_serverTable.refreshTb();
		});
	}
}

/**
 * 弹出窗
 */
var _popUpWindow = {
	/**
	 * 设值
	 */
	setPeroerty:function(row){
		$('#param_name').val(row.name);
		$('#param_equipmentType').val(row.equipmentTypeId);
		$('#param_netAddress').val(row.netAddress);
//		$('#param_netPort').val(row.netPort);
		$('#param_code').val(row.code);
	},
	/**
	 * 清空
	 */
	emptyWindow:function(){
		$('#param_name').val('');
		$('#param_equipmentType').val('');
		$('#param_netAddress').val('');
//		$('#param_netPort').val('');
		$('#param_code').val('');
	},
	/**
	 * 新增或修改
	 */
	editServer:function(row){
		if(row){
			this.setPeroerty(row);
		}else{
			this.emptyWindow();
		}
		var index = layer.open({
			  type: 1,
			  title:row?'修改':'新增'+'设备',
			  skin: 'layui-layer-rim', //加上边框
			  area: ['420px', '300px'], //宽高
			  content: $('#param_content'),
			  btn: ['确定','取消'],
			  yes:function(index){
					if(_validator.isPass()){
						$.ajax({
							url:Constants.CONTEXT_PATH+"/sysEquipmentManaualIn/addEquipment",
							async:false,
							type:"POST",
							dataType:'json',
							data:{
								equipmentId:row?row.equipmentId:'',
								name:$('#param_name').val(),
								equipmentTypeId:$('#param_equipmentType').val(),
								netAddress:$('#param_netAddress').val(),
//								netPort:$('#param_netPort').val(),
								code:$('#param_code').val(),
								orgId:treeSelectOrgId,
								path:treeSelectPath
							},
							success:function (data) {
								if(data.ret){
									layer.alert((row?'修改':'新增')+'成功',{icon: 1});
									_serverTable.refreshTb();
								}else{
									layer.alert(data.msg,{icon: 0});
								}
								layer.close(index);
					        },
					        error:function(){
					        	layer.alert('编号已存在!',{icon: 2});
					        }
						});
					}
				}
			});
	},
	/**
	 * 删除
	 */
	deleteServer:function(Ids){
		if(typeof(Ids) == 'undefined' || Ids ==''){
			layer.alert('请至少选择一条记录!',{icon: 0});
		}else{
			var index = layer.confirm('确定要删除所选中的记录？', function(index){
				  $.ajax({
						url:Constants.CONTEXT_PATH+'/sysEquipmentManaualIn/deleteEquipment',
						async:false,
						dataType:'json',
						data:{ids:Ids},
						success:function(data){
							if(data.ret == 1){
								layer.alert(data.msg,{icon: 1});
								_serverTable.refreshTb();
							}else{
								layer.alert(data.msg,{icon: 0});
							}
							layer.close(index);
						},
						error:function(){
							layer.alert("请求服务器出错！",{icon: 2});
						}
				  });
			});  
		}
	}
}
/**
 * 验证规则
 */
var _validator = {
	/**
	 * 验证填写1：添加修改新闻
	 */
	verify1:function(){
		$("#param_content").validator({
			rules: {        
				isNumber:function(element){
					var reg = /^\d+$/;
					return reg.test($(element).val());
				},
				isNetAddress:function(element){
					var reg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
					return reg.test($(element).val());
				}
			}, 
			messages: {        
				required: "不能为空",
				isNumber:"请输入一个正整数",
				isNetAddress:"格式错误,应为xxx.xxx.xxx.xxx,x为数字"
			},
		    fields: {
		        'param_name':'required;',
	        	'param_equipmentType':'required;',
        		'param_netAddress':'required;isNetAddress'
    		//	'param_netPort':'required;isNumber'
		    }
		});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass:function(){
		var isValid = false;
		$('#param_content').isValid(function(v){    
		    if(v){
		    	isValid = true;
		    }
		});
		return isValid;
	}
};
