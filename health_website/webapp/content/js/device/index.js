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
				$('#bootstrapTable').bootstrapTable( 'resetView' , {height: ($(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()*2-20*2)*0.6} );
				$('#bootstrapTable_uialarm').bootstrapTable( 'resetView' , {height: ($(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()*2-20*2)*0.4} );
			});
			initEvent();
			serverTable.setTable();
			initAlarmTable = false;
			serverTable.searchTb();
			validator.verify1();
			$("#alarmId").val('');
			uiAlarmTable.setTable();
			uiAlarmTable.searchTb();
			$("[data-rightcode]").each(function(){
				var $em = $(this);
				var rightCode = $em.data("rightcode");
				if(top.checkRight(rightCode)){
		    		$em.css('display','block');
				}else{
					if(rightCode=='DEVICE_DEAL'){
						$("#bootstrapTable").bootstrapTable('hideColumn', 'processResult');
					}else if(rightCode=='DEVICE_FOCUS'){
						$("#bootstrapTable").bootstrapTable('hideColumn', 'focusFlag');
					}
				}
		  	});
		});

var serverTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = ($(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()*2-20*2)*0.6;
		var settings = {
			classes : 'table table-hover',
			height : height,
			queryParams : function(params) {
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				if($("#equType").val()!=-1){
					params['search_LIKE_equipmentTypeName'] = $("#equType").val() || (typeName==-1?'':typeName);
				}
				params['search_LIKE_equipmentName'] = $("#search_equipmentName").val()||'';
				params['search_ORGLIKE_path'] = treeSelectOrgId;
				return params;
			}
		}
		C.createTable("#bootstrapTable", Constants.CONTEXT_PATH
						+ '/device/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/device/getPageList.do?fresh=' + Math.random()
		});
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#search").click(function(){
			serverTable.refreshTb();
		});
		$("#refreshBtn").click(function(){
			serverTable.refreshTb();
		});
	}
}

var uiAlarmTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = ($(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()*2-20*2)*0.4;
		var settings = {
			classes : 'table table-hover',
			height : height,
			queryParams : function(params) {
//				params['id'] = $("#curorgId").val() || "";
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				params['search_IN_propertyName'] =  "CPU使用率,物理内存使用率,剩余存储空间,总存储空间大小";
				params['search_ORGLIKE_path'] = treeSelectOrgId;
				return params;
			}
		}
		C.createTable("#bootstrapTable_uialarm", Constants.CONTEXT_PATH
						+ '/uialarm/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable_uialarm").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/uialarm/getPageList.do?fresh=' + Math.random()
		});
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#refreshBtn_uialarm").click(function(){
			uiAlarmTable.refreshTb();
		});
	}
}

var alarmTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = 150;
		var settings = {
			classes : 'table table-hover',
			height : height,
			queryParams : function(params) {
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				params['search_EQ_equipmentId'] = $("#equipmentId").val() || "-1";
				params['search_IN_propertyName'] =  "CPU使用率,物理内存使用率,剩余存储空间,总存储空间大小";
				return params;
			},
			// 全部勾选
			onCheckAll : function(rows) {
				$("#alarmId").val('');
				$.each(this.data, function(i, item) {
							var delIds = $("#alarmId").val();
							$("#alarmId").val(delIds + item.alarmId + ',');
						})
			},
			// 取消全部
			onUncheckAll : function(rows) {
				$("#alarmId").val('');
			},
			// 单次勾选
			onCheck : function(row, $element) {
				var alarmId = $("#alarmId").val();
				$("#alarmId").val(alarmId + row.alarmId + ',');
			},
			// 取消单次勾选
			onUncheck : function(row, $element) {
				var alarmId = $("#alarmId").val();
				var replaceStr = row.alarmId + ',';
				var reg = new RegExp(replaceStr, "g");
				var newStr = alarmId.replace(reg, "");
				$("#alarmId").val(newStr);
			},
			// 翻页时清空勾选信息
			onPageChange : function(number, size) {
				$("#alarmId").val('');
			}
		}
		C.createTable("#bootstrapTable_alarm", Constants.CONTEXT_PATH+ '/uialarm/getUnDoPageList.do', settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable_alarm").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/uialarm/getUnDoPageList.do'
		});
	}
}
//序号
function numberFormatter(value, row, index) {
	return index + 1;
}
//名称转换
function maskFormatter(value, row, index) {
	if(value=='1'){
		return '已旁路';
	}
	return '';
}

function initEvent(){
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/netstatus/getAllEquipType.do?timestamp="+new Date(),
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			var i, len, data = {value: []};
	
	            if(!json || !json.data || json.data.length == 0) {
	                return false;
	            }
	
                len = json.data.length;
				var options ='<option value="-1">--全部--</option>';
	            for (i = 0; i < len; i++) {
	                options += '<option>'+json.data[i][2]+'</option>';
	            }
	            $('#equType').html(options);
	            $('#equType').val(typeName);
		}
	});
	$('#maskBtn').click(function(){
		if(validator.isPass1()){  
			$.ajax({
				url : Constants.CONTEXT_PATH+ "/mask/saveEquByProperty.do?timestamp="+new Date(),
				data:{
					orgId : $('#orgId').val(),
					equipmentId:$('#equipmentId').val(),
					equipmentPropertyName:$('#propertyName').val(),
					isMask:1,
					maskTime:$("#maskTime").val()
				},
				dataType : 'json',
				success : function(data) {
					layer.alert(data.msg, {icon : 1});
					$('#maskId').val(data.maskId);
					$('#maskBtn').hide();
					$('#unmaskBtn').show();
				},
				error : function() {
					layer.alert('请求服务器出错！', {icon : 2});
				}
			});	
		  } 
	});
	$('#unmaskBtn').click(function(){
		$.ajax({
			url : Constants.CONTEXT_PATH + '/mask/deleteByEquAndProperty.do',
			type:'POST',
			data : {
				ids : $('#maskId').val(),
				propertyName : '网络状态'				
			},
			dataType : 'json',
			success : function(data) {
				layer.alert(data.msg, {icon : 1});
				$("#maskTime").val('');
				$('#maskBtn').show();
				$('#unmaskBtn').hide();
			},
			error : function() {
				layer.alert('请求服务器出错！', {icon : 2});
			}
		});	
	});
}
//处理
function operateFormater(value,row,index){
	    return [
	    	'<a class="dealBtn" href="javascript:void(0)" title="处理">',
	        '<i class="deal"></i>',
	        '</a>'].join("");
}

//关注
function operateFormater1(value,row,index){
//		if(value==0&&row.alarmId>0){
			 return [
		    	'<a class="attentionBtn" href="javascript:void(0)">',
		        '<i class="focus"></i>',
		        '</a>'].join("");
//		}
//		return ""
}

//异常
function operateFormater2(value,row,index){
	if(value==1){
		 return [
	    	'<a href="javascript:void(0)">',
	        '<i class="except"></i>',
	        '</a>'].join("");
	}
	return ""
}


window.operateEvents = {
	'click .dealBtn' : function(e, value, row, index) {
		popUpWindow.handleEvent(row.equipmentId,row.propertyName);
	},
	'click .attentionBtn' : function(e, value, row, index) {
		var data = {
			'alarmId' : row.alarmId,
			'alarmExtendId' : row.alarmExtendId,
			'equipmentId' : row.equipmentId,
			'focusFlag':1
		}
		postData.postAciton(data);
	}
	
}

/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
}

/**
 * 弹出窗
 */
var popUpWindow = {
	/**
	 * 处理
	 */
	handleEvent : function(equipmentId,propertyName) {
		if (typeof(equipmentId) == 'undefined' || equipmentId == '') {
			layer.alert('请选择需要处理的记录!', {
						icon : 0
					});
		} else if (isNaN(equipmentId)) {
			layer.alert('只能选择一条记录!', {
						icon : 0
					});
		} else {
			popUpWindow.initWin();
			
			// 赋值
			$.ajax({
						async : false,
						url : Constants.CONTEXT_PATH + '/device/findByEquIdAndProperty.do?timestamp='+new Date(),
						data : {
							equipmentId : equipmentId,
							equipmentPropertyName : propertyName
						},
						dataType : 'json',
						success : function(data) {
							if(!data){
								return ;
							}
							$("#orgId").val(data.orgId);
							$("#alarmId").val(data.alarmId);
							$("#orgName").text(data.orgName);
							$("#equipmentName").text(data.equipmentName);
							$("#orgParentName").text(data.orgParentName);
							$("#equipmentTypeName").text(data.equipmentTypeName);
							$("#netAddress").text(data.netAddress);
							$("#netStatus").text(data.netStatus);
							$("#equipmentId").val(data.equipmentId);
							$('#propertyName').val(data.propertyName);
							// 赋值
							$.ajax({
									async : false,
									url : Constants.CONTEXT_PATH + '/mask/findByEquIdAndProperty.do',
									data : {
										equipmentId : data.equipmentId,
										propertyName : data.propertyName	
									},
									dataType : 'json',
									success : function(data) {
										if(data.data&&data.data.length>0){
											$("#maskTime").val(data.data[0].maskTime);
											$("#maskId").val(data.data[0].maskId);
											$('#maskBtn').hide();
										}else{
											$('#unmaskBtn').hide();
										}
									},
									error : function() {
										layer.alert('请求服务器出错！', {icon : 2});
									}
								});
//							$.ajax({
//								async : false,
//								url : Constants.CONTEXT_PATH + '/equstatus/getListByEquId.do',
//								data : {
//									id :  $('#equipmentId').val()
//								},
//								dataType : 'json',
//								success : function(data) {
//									var ret = '';
//									for(var i=0;i<data.data.length;i++){
//										ret+=data.data[i].propertyValue;
//									}
//									$('#diskinfo').html(ret);
//								},
//								error : function() {
//									layer.alert('请求出错！', {
//												icon : 2
//											});
//								}
//							});
						},
						error : function() {
							layer.alert('请求出错！', {
										icon : 2
									});
						}
					});
			// 弹窗编辑
			var d = dialog({
						title : '处理',
						content : document.getElementById('devicewin'),
//						button:[{value: '取消旁路', callback: function () {
//							$.ajax({
//								url : Constants.CONTEXT_PATH + '/mask/deleteByEqu.do',
//								data : {
//									ids : $('#equipmentId').val()
//								},
//								dataType : 'json',
//								success : function(data) {
//									layer.alert(data.msg, {
//												icon : 1
//											});
//								},
//								error : function() {
//									layer.alert('取消旁路出错！', {
//												icon : 2
//											});
//								}
//							});
//						}}] ,
						okValue : '确 定',
						ok : function() {
							if($('#alarmId').val()==""){
						 		layer.alert('请勾选需要处理的记录!', {icon : 0});
						 		return false;
						 	}
							 if (validator.isPass()) {
								postData.postAciton("chuli");
								serverTable.refreshTb();
								uiAlarmTable.refreshTb();
								validator.verify1();
							 }else{
							 	return false;
							 }

						},
						cancelValue : '取消',
						cancel : function() {
							validator.verify1();
						}
					});

			d.showModal();
			if(initAlarmTable==false){
				alarmTable.setTable();
				initAlarmTable = true;
			}else{
				alarmTable.refreshTb();
			}
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
		$("#alarmId").val();
		$("#equipmentId").val();
		$("#processResult").val('');
		$("#processDesc").val('');
		$("#pingResult").val('');
		$("#lsize").val('');
		$("#maskTime").val('');
		$('#maskBtn').show();
		$('#unmaskBtn').show();
	}
}

/**
 * 提交信息
 */
var postData = {
	alarmId : function() {
		return $("#alarmId").val();
	},
	processResult : function() {
		return $("#processResult").val();
	},
	processDesc : function() {
		return $("#processDesc").val();
	},
	/**
	 * 提交操作
	 * 
	 * @param type
	 */
	postAciton : function(type) {
		var data = null;
		var url = null;
		if(type!='chuli'){
			data = type;
			url = Constants.CONTEXT_PATH + '/alarmexd/focus.do';
			
		}else{
			data = {
				'ids' :postData.alarmId(),
				'processResult' : postData.processResult(),
				'processDesc':postData.processDesc(),
				'processFlag':1
			}
			url = Constants.CONTEXT_PATH + '/alarmexd/save.do';
		}
		$.ajax({
					async : false,
					data : data,
					dataType : 'json',
					url : url,
					success : function(data) {
						if (data.ret == 1) {
							layer.alert(data.msg, {
										icon : 1
									});
							serverTable.refreshTb();
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
		$("#devicewin").validator({
					fields : {
						'processResult' : 'required'
					}
				});
		$("#maskwin").validator({
			fields : {
				'maskTime' : 'required;range[0~10000]'
			}
		});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass : function() {
		var mark = false;
		$('#devicewin').isValid(function(v){    
		    if(v){
		    	mark = true;
		    }
		});
		return mark;
	},
	/**
	 * 判断验证是否通过
	 */
	isPass1 : function() {
		var mark = false;
		$('#maskwin').isValid(function(v){    
		    if(v){
		    	mark = true;
		    }
		});
		return mark;
	}

};

function showHistoryLog(){
	searchHistoryLog($('#equipmentId').val(),$('#propertyName').val());
}
