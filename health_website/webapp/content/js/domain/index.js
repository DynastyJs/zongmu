/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
			initLayout();
			myZtree.showZtree();
			serverTable.setTable();
			serverTable.searchTb();
			initEvent();
			validator.verify1();
			isValid = false;// 验证标记
			$("#delIds").val('');
		});

var serverTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = $(window).height() - 90;
		var settings = {
			classes : 'table table-hover',
			height : height,
			// 全部勾选
			onCheckAll : function(rows) {
				if (rows) {
					$("#delIds").val('');
					$.each(rows, function(i, item) {
								var delIds = $("#delIds").val();
								$("#delIds").val(delIds + item.id + ',');
							})
				}
			},
			// 取消全部
			onUncheckAll : function(rows) {
				$("#delIds").val('');
			},
			// 单次勾选
			onCheck : function(row, $element) {
				var delIds = $("#delIds").val();
				$("#delIds").val(delIds + row.id + ',');
			},
			// 取消单次勾选
			onUncheck : function(row, $element) {
				var delIds = $("#delIds").val();
				var replaceStr = row.id + ',';
				var reg = new RegExp(replaceStr, "g");
				var newStr = delIds.replace(reg, "");
				$("#delIds").val(newStr);
			},
			// 翻页时清空勾选信息
			onPageChange : function(number, size) {
				$("#delIds").val('');
			},
			queryParams : function(params) {
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				params['id'] = $("#curorgId").val() || "";
				params['search_LIKE_name'] = $("#condition").val() || "";
				return params;
			}
		}
		C.createTable("#bootstrapTable", Constants.CONTEXT_PATH
						+ '/domain/getPageList.do', settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
					url : Constants.CONTEXT_PATH + '/domain/getPageList.do'
				});
		$("#delIds").val('');
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#search").click(function(){
			serverTable.refreshTb();
		});
	}
}

/**
 * 组织结构树
 */
var myZtree = {
	/**
	 * 生成树结构
	 */
	showZtree : function() {
		// 扩展点击事件
		var settings = $.extend(true, {
					callback : {
						onClick : this.zTreeOnClick
					}
				}, orgZtree.setting);
		$.fn.zTree.init($("#orgtree"), settings, orgZtree.zNodes());
		$("#id").val('');
	},
	/**
	 * 点击事件的实现
	 */
	zTreeOnClick : function(event, treeId, treeNode) {
		$("#id").val(treeNode.id);
		$("#parentId").val(treeNode.id);
		$("#parentName").val(treeNode.name);
		serverTable.refreshTb();// 更新表格
	}
}

function numberFormatter(value, row, index) {
	return index + 1;
}
function nameFormatter(value, row, index) {
	if(row.parent){
		return row.parent.name;
	}
	return '';
}

function isPlatformFormatter(value, row, index) {
	if(value==0){
		return '否';
	}
	return '是';
}
/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
	$(".tree-container").height($(window).outerHeight() - 30);
	$(window).resize(function() {
				$('.main-container').height($(window).height() - 100);
			});
}

function initEvent() {
	// 添加按钮
	$("#addBtn").click(function() {
		popUpWindow.addServer();
	});
	$("#editBtn").click(function() {
				var Ids = $("#delIds").val();
				Ids = Ids.substring(0, Ids.length - 1);
				popUpWindow.editServer(Ids);
			});
	$("#delBtn").click(function() {
				var Ids = $("#delIds").val();
				Ids = Ids.substring(0, Ids.length - 1);
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
	addServer : function() {
		popUpWindow.initWin();
		var d = dialog({
					title : '新增组织机构',
					content : document.getElementById('platformwin'),
					okValue : '确 定',
					ok : function() {
						validator.isPass();
						if (isValid) {// 全部验证通过
							postData.postAciton("addServer");
							serverTable.refreshTb();
							validator.verify1();
						}
					},
					cancelValue : '取消',
					cancel : function() {
						validator.verify1();
					}
				});

		d.showModal();
	},
	/**
	 * 编辑
	 */
	editServer : function(Id) {
		if (typeof(Id) == 'undefined' || Id == '') {
			layer.alert('请选择需要修改的记录!', {
						icon : 0
					});
		} else if (isNaN(Id)) {
			layer.alert('只能选择一条记录!', {
						icon : 0
					});
		} else {
			popUpWindow.initWin();
			// 赋值
			$.ajax({
						async : false,
						url : Constants.CONTEXT_PATH + '/domain/findById.do?timestamp='+new Date(),
						data : {
							id : Id
						},
						dataType : 'json',
						success : function(data) {
							$("#id").val(data.id);
							$("#name").val(data.name);
							if(data.parent){
								$("#parentId").val(data.parent.id);
								$("#parentName").val(data.parent.name);
							}else{
								$("#parentId").val(0);	
								$("#parentName").val('');
							}
						},
						error : function() {
							layer.alert('请求组织机构器出错！', {
										icon : 2
									});
						}
					});
			// 弹窗编辑
			var d = dialog({
						title : '编辑组织机构',
						content : document.getElementById('platformwin'),
						okValue : '确 定',
						ok : function() {
							validator.isPass();
							 if (isValid) {
								postData.postAciton("editServer");
								serverTable.refreshTb();
								validator.verify1();
							 }

						},
						cancelValue : '取消',
						cancel : function() {
							validator.verify1();
						}
					});

			d.showModal();
		}
	},
	/**
	 * 删除
	 */
	deleteServer : function(Ids) {
		if (typeof(Ids) == 'undefined' || Ids == '') {
			layer.alert('请至少选择一条记录!', {
						icon : 0
					});
		} else {
			var d = dialog({
						title : '删除组织机构',
						content : '确定要删除组织机构？',
						okValue : '确 定',
						ok : function() {
							$.ajax({
										async : false,
										data : {
											ids : Ids
										},
										dataType : 'json',
										url : Constants.CONTEXT_PATH
												+ '/domain/delete.do',
										success : function(data) {
											if (data.ret == 1) {
												layer.alert(data.msg, {
															icon : 1
														});
												serverTable.refreshTb();
												myZtree.showZtree();
											} else {
												layer.alert(data.msg, {
															icon : 2
														});
												return false;
											}
										},
										error : function() {
											layer.alert("请求服务器出错！", {
														icon : 2
													});
										}
									});
						},
						cancelValue : '取消',
						cancel : function() {

						}
					});

			d.showModal();
		}
	},
	/**
	 * 初始化弹出窗内容
	 */
	initWin : function() {
		this.emptyWin();
	},
	/**
	 * 清空弹出窗内容
	 */
	emptyWin : function() {
		$("#name").val('');
		$("#isPlatform").val(0);
	}
}

/**
 * 提交信息
 */
var postData = {
	id : function() {
		return $("#id").val();
	},
	name : function() {
		return $("#name").val();
	},
	parentId : function() {
		return $("#parentId").val();
	},
	isPlatform : function() {
		return $("#isPlatform").val();
	},
	/**
	 * 提交操作
	 * 
	 * @param type
	 */
	postAciton : function(type) {
		var data = null;
		if (type == "addServer") {// 添加组织结构
			data = {
				'name' : postData.name(),
				'parentId' : postData.parentId(),
				'isPlatform':postData.isPlatform()
			}
		} else if (type == "editServer") {// 编辑组织结构
			data = {
				'id' : postData.id(),
				'name' : postData.name(),
				'parentId':postData.parentId(),
				'isPlatform':postData.isPlatform()
			}
		}
		$.ajax({
					async : false,
					data : data,
					dataType : 'json',
					url : Constants.CONTEXT_PATH + '/domain/saveOrUpdate.do',
					success : function(data) {
						if (data.ret == 1) {
							layer.alert(data.msg, {
										icon : 1
									});
							validator.verify1();
							serverTable.setTable();
							myZtree.showZtree();
							return true;
						} else {
							layer.alert(data.msg, {
										icon : 1
									});
							return false;
						}
					},
					error : function() {
						layer.alert("请求服务器失败！", {
									icon : 0
								});
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
	verify1 : function() {
		$("#platformwin").validator({
					fields : {
						'name' : 'required'
					}
				});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass : function() {
		$('#platformwin').isValid(function(v){    
		    if(v){
		    	isValid = true;
		    }
		});
	}

};
