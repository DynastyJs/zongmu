var timerRef = null;
var pageNumber = 1;
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
				$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30} );
			});
			initEvent();
			alarmTable.setTable();
			alarmTable.searchTb();
			isValid = false;// 验证标记
			$("#dealIds").val('');
			$("[data-rightcode]").each(function(){
				var $em = $(this);
				var rightCode = $em.data("rightcode");
				if(top.checkRight(rightCode)){
		    		$em.css('display','block');
				}
		  	});
		});

var alarmTable = {
	alarmTypeArray:[],
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30;
		var settings = {
			classes : 'table table-hover',
			height : height,
			queryParams : function(params) {

				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				params['search_GE_beginTime'] = $("#startTime").val() || "";
				params['search_LE_beginTime'] = $("#endTime").val() || "";
				//params['search_LIKE_alarmType'] = $("#alarmType").val() || "";
				params['search_LIKE_equipmentName'] = $("#equipmentName").val() || "";
				params['search_EQ_equipmentType'] = $("#equType").val() || "";
				params['search_EQ_equipmentType'] = $("#equType").val() || equipType;
				//params['search_LIKE_propertyName'] = $("#propertyName").val() || "";
				params['search_EQ_alarmLevel'] = $("#alarmLevel").val() || "" ;
				if($("#focusFlag").val()=='0'){
					params['search_ISNULLOR_focusFlag'] =  $("#focusFlag").val() || "";	
				}else{
					params['search_EQ_focusFlag'] =  $("#focusFlag").val() || "";	
				}
				params['search_ISNULLOR_repairFlag'] = "0" ;
				params['search_EQ_alarmType'] = alarmType||$("#alarmResultType").val() ;
				params['search_ORGLIKE_path'] = treeSelectOrgId;
				params['search_ISNULL_isMask'] = '-1';
				return params;
			},
			rowStyle : function(row,index) {
//				var classes = ['active', 'success', 'info', 'warning', 'danger'];
//
//		        if (index % 2 === 0 && index / 2 < classes.length) {
//		            return {
//		                classes: classes[index / 2]
//		            };
//		        }
		        return {classes:'handIcon'};

			},
			onClickRow : function(row,$element){
				//改变行颜色
				$("tr").removeClass("danger");
				$element.addClass("danger");	
				// 弹窗编辑
				if(top.checkRight("ALARM_EVENT_DEAL")){
		    		setProperties(row);
				}
			},
			onDblClickRow : function(row){
			},
			// 全部勾选
			onCheckAll : function(rows) {
				$("#dealIds").val('');
				$.each(this.data, function(i, item) {
							var delIds = $("#dealIds").val();
							$("#dealIds").val(delIds + item.alarmId + ',');
						})
			},
			// 取消全部
			onUncheckAll : function(rows) {
				$("#dealIds").val('');
			},
			// 单次勾选
			onCheck : function(row, $element) {
				var dealIds = $("#dealIds").val();
				$("#dealIds").val(dealIds + row.alarmId + ',');
			},
			// 取消单次勾选
			onUncheck : function(row, $element) {
				var dealIds = $("#dealIds").val();
				var replaceStr = row.alarmId + ',';
				var reg = new RegExp(replaceStr, "g");
				var newStr = dealIds.replace(reg, "");
				$("#dealIds").val(newStr);
			},
			// 翻页时清空勾选信息
			onPageChange : function(number, size) {
				$("#dealIds").val('');
			}
		}
		C.createTable("#bootstrapTable", Constants.CONTEXT_PATH
						+ '/uiAlarmEvent/getAlarmevent.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb1 : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/uiAlarmEvent/getAlarmevent.do?fresh=' + Math.random()
		});
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		var page = $("#bootstrapTable").bootstrapTable("getPage");  
//		$("#bootstrapTable").bootstrapTable('refresh', {
//			query:{pageNumber:page.pageNumber,pageSize:page.pageSize},
//			url : Constants.CONTEXT_PATH + '/uiAlarmEvent/getAlarmevent.do?fresh=' + Math.random()
//		});
		$("#bootstrapTable").bootstrapTable('selectPage',page.pageNumber)
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#search").click(function(){
			alarmTable.refreshTb1();
		});
		$("#refreshBtn").click(function(){
			alarmTable.refreshTb1();
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

function focusFormater(value,row,index){
	for(var i in alarmTable.alarmTypeArray){
		if(row.alarmType.indexOf(alarmTable.alarmTypeArray[i])>-1){
			top.showMessage(row.alarmType+"报警");
			break;
		}
	}
	if(value==0){
//		return [
//			'<i class="focus"></i>'].join("");
	}else if(value==1){
//		return [
//			'<i class="hasfocus"></i>'].join("");
		return '已关注';
	}
	return "";
}
function repairFlagFormatter(value, row, index) {
	if(value=='1'){
		return '已报修';
	}
	return '';
}

//行处理
function operateFormater(value,row,index){
	    return [
	    	'<a  href="javascript:void(0)" title="处理">',
	        '<i class="glyphicon glyphicon glyphicon-cog"></i>',
	        '</a>'].join("");
}

/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
}

function mySetInterVal(){
	if(timerRef!=null){
		clearInterval(timerRef);
		timerRef = null;
	}
	setTimeout(function(){
		timerRef = setInterval(function(){
			if($("#autoFlag").is(":checked")){
				alarmTable.refreshTb1();
			}
	  	},$("#refreshTime").children('option:selected').val()*1000); //指定10秒刷新一次	
	},1000);
}

function initEvent() {
	/**
	 * 告警类别集合
	 */
	var result = getDictionaryFieldsByCatalogCode('SOUND_ALARM_TYPE');
	for(var i in result){
		alarmTable.alarmTypeArray.push(result[i].fieldName);
	}
	$('#autoFlag').change(function() {
		var checked = $(this).is(":checked");
		if (checked) { 
			mySetInterVal();
		} else {
			if(timerRef!=null){
				clearInterval(timerRef);
				timerRef = null;
			}
		}
	});
	$("#refreshTime").append(createAutoRefreshSelectOptions());
	$('#refreshTime').change(function(){ 
//		var p1=$(this).children('option:selected').val();//这就是selected的值 
//		clearInterval(timerRef);
		mySetInterVal();
	});
	mySetInterVal();
	$("#dealBtn").click(function() {
		var Ids = $("#dealIds").val();
		Ids = Ids.substring(0, Ids.length - 1);
		//popUpWindow.handleEvent(Ids);
	});
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/netstatus/getAllEquipType.do?fresh=" + Math.random(),
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			var i, len, data = {value: []};
	
	            if(!json || !json.data || json.data.length == 0) {
	                return false;
	            }
	
                len = json.data.length;
				var options ='<option value="">--全部--</option>';
	            for (i = 0; i < len; i++) {
	                options += '<option>'+json.data[i][2]+'</option>';
	            }
	            $('#equType').html(options);
	        	if(equipType!=''){
	        		$('#equType').val(equipType);
	        		equipType='';
	        	}
		}
	});
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/netstatus/getAllAlarmResult.do?fresh=" + Math.random(),
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			var i, len, data = {value: []};

	            if(!json || !json.data || json.data.length == 0) {
	                return false;
	            }

                len = json.data.length;
				var options ='<option value="">--全部--</option>';
	            for (i = 0; i < len; i++) {
	                options += '<option>'+json.data[i]+'</option>';
	            }
	            $('#alarmResultType').html(options);
	        	if(alarmType!=''){
	        		$('#alarmResultType').val(alarmType);
	        		alarmType='';
	        	}
		}
	});
	
	/*
	 * 箭头点击事件
	 */
	$('.arrow_position').click(function() {
		$(this).css("display","none");
		$(this).siblings().css("display","block");
		setTimeout(function(){
			changeTableHeight();  //0.35秒延时后$('.search-content').height()重新生成，即关闭搜索框时变为14px，打开搜索框时为88px
		},350)
		
	}) 
	function changeTableHeight(){
		$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30} );
	}
	
}