/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	 		WdatePicker({eCont:'myCalendar',onpicked:function(dp){alert('你选择的日期是a:'+dp.cal.getDateStr())}})
			setCalendar();
			initLayout();
			$(window).resize(function(){
				initLayout();
				$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height()} );
			});
			initEvent();
			serverTable.setTable();
			serverTable.searchTb();
			validator.verify1();
			$("#alarmId").val('');
		});

//对日历设置  
function setCalendar() {  
    var WdateIframe = $("div#myCalendar iframe");
    if (WdateIframe.length > 0) {
        WdateIframe = WdateIframe[0];
    } else {
        return;
    }
    var reg = /day_Click\((\d{4}),(\d{1,2}),(\d{1,2})\);/;
    var doc = WdateIframe.contentWindow.document;
    var _tables = doc.getElementsByTagName("table");    //当日历表格加载后才执行事件处理
    if (_tables.length == 0) {
        setTimeout(setCalendar, 100);
        return;
    }
    $(doc).find('.WdayTable td').each(function (index, element) {
        var html = element.outerHTML;
        var m = reg.exec(html);
        if (m) {
            //m[1],m[2],m[3]分别为年月日
            var date = m[1] + '-' + m[2] + '-' + m[3];
            //此段可以作出判断，比如是节假日时候处理
            if (m[3] % 3 == 0) {
                element.innerHTML = "<span style='color:#eeeeee; font-weight:bold;'>" + m[3] + "</span>";
                element.onclick = function () {
                    alert( " 单击了日期：" + date);
                    return;
                };
            }
        }
    });
}

var serverTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = $(window).height();
		var settings = {
			classes:'table table-hover table-condensed',
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
						+ '/netstatus/getPageList.do', settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/netstatus/getPageList.do'
		});
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
				params['search_EQ_propertyName'] =  "网络状态";
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
				var delIds = $("#alarmId").val();
				$("#alarmId").val(delIds + row.alarmId + ',');
			},
			// 取消单次勾选
			onUncheck : function(row, $element) {
				var alarmId = $("#alarmId").val();
				var replaceStr = row.alarmId + ',';
				var reg = new RegExp(replaceStr, "g");
				var newStr = alarmId.replace(reg, "");
				$("#alarmId").val(newStr);
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

//名称转换
function maskFormatter(value, row, index) {
	if(value=='1'){
		return '已旁路';
	}
	return '';
}

function initEvent(){
	$('#testBtn').click(function(){
		$("#pingResult").val('');
		$.ajax({
			url : Constants.CONTEXT_PATH + '/netstatus/pingTest.do',
			type:'post',
			data : {
				ip : $('#netAddress').html(),
				param :$('#lsize').val()||'32'
			},
			dataType : 'json',
			success : function(data) {
				$("#pingResult").val(data);
			},
			error : function(data) {
				$("#pingResult").val(data.responseText);
			}
		});
	});
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/netstatus/getAllEquipType.do",
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
				url : Constants.CONTEXT_PATH+ "/mask/saveEquByProperty.do",
				type:'POST',
				data:{
					orgId : $('#orgId').val(),
					equipmentId:$('#equipmentId').val(),
					equipmentPropertyName:'网络状态',
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
				$('#maskBtn').show();
				$('#unmaskBtn').hide();
				$("#maskTime").val('');
			},
			error : function() {
				layer.alert('请求服务器出错！', {icon : 2});
			}
		});	
	});
}
//行处理
function operateFormater(value,row,index){
	    return [
	    	'<a class="dealBtn" href="javascript:void(0)" title="处理">',
	        '<i class="deal"></i>',
	        '</a>'].join("");
}

//行处理
function operateFormater1(value,row,index){
		if(value==0){
			 return [
		    	'<a class="attentionBtn" href="javascript:void(0)">',
		        '<i class="focus"></i>',
		        '</a>'].join("");
		}else if(value==1){
			 return [
		    	'<a class="attentionBtn" href="javascript:void(0)">',
		        '<i class="hasfocus"></i>',
		        '</a>'].join("");
		}
		return "";
}

//行处理
function operateFormater3(value,row,index){
		 return [
	    	'<a class="historyBtn" href="javascript:void(0)">',
	        '<i class="history"></i>',
	        '</a>'].join("");
}

//行处理
function operateFormater2(value,row,index){
		
		return '<div style="background: rgb(81, 202, 101); width: 100%; height: 20px; overflow: hidden; position: relative;"><div title="丢失时段&#10; 00:00:00至16:3:41" style="background: rgb(224, 224, 224); left: 0%; width: 66.92%; height: 20px; float: left; display: inline; position: absolute; cursor: pointer;"></div></div>';
}


window.operateEvents = {
	'click .dealBtn' : function(e, value, row, index) {
		popUpWindow.handleEvent(row.equipmentId);
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
	$(".main-container").height($(window).outerHeight());
	$(".west-container").height($(window).outerHeight());
}

/**
 * 弹出窗
 */
var popUpWindow = {
	/**
	 * 处理
	 */
	handleEvent : function(Id) {
		if (typeof(Id) == 'undefined' || Id == '') {
			layer.alert('请选择需要修改的记录!', {icon : 0});
		} else if (isNaN(Id)) {
			layer.alert('只能选择一条记录!', {
						icon : 0
					});
		} else {
			popUpWindow.initWin();
			
			// 赋值
			$.ajax({
						async : false,
						url : Constants.CONTEXT_PATH + '/netstatus/findById.do',
						data : {
							id : Id
						},
						dataType : 'json',
						success : function(data) {
							if(!data){
								return ;
							}
							$("#orgId").val(data.orgId);
							$("#alarmId").val(data.alarmId);
							$("#pathName").text(data.pathName);
							$("#equipmentTypeName").text(data.equipmentTypeName);
							$("#netAddress").text(data.netAddress);
							$("#netStatus").text(data.netStatus);
							$("#equipmentId").val(data.equipmentId);
							// 赋值
							$.ajax({
										async : false,
										url : Constants.CONTEXT_PATH + '/mask/findByEquIdAndProperty.do',
										data : {
											equipmentId : data.equipmentId,
											propertyName : '网络状态'	
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
											
										}
									});
						},
						error : function() {
							layer.alert('请求服务器出错！', {
										icon : 2
									});
						}
					});
			
			// 弹窗编辑
			var d = dialog({
						title : '处理',
						content : document.getElementById('networkwin'),
						cancelValue : '取消',
						cancel : function() {
							validator.verify1();
						},
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
		$("#networkwin").validator({
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
		$('#networkwin').isValid(function(v){    
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
