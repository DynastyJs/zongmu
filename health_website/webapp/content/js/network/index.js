/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
var timerRef = null;
$(function() {
	 		
			initLayout();
			$(window).resize(function(){
				initLayout();
				$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30} );
			});
			initEvent();
			serverTable.setTable();
			serverTable.searchTb();
			$("[data-rightcode]").each(function(){
				var $em = $(this);
				var rightCode = $em.data("rightcode");
				if(top.checkRight(rightCode)){
		    		$em.css('display','block');
				}else{					
					if(rightCode=='NETWORK_DEAL'){
						$("#bootstrapTable").bootstrapTable('hideColumn', 'processResult');
					}else if(rightCode==('NETWORK_FOCUS')){
						$("#bootstrapTable").bootstrapTable('hideColumn', 'focusFlag');
					}
				}
		  	});
		});
function mySetInterVal(){
	if(timerRef!=null){
		clearInterval(timerRef);
		timerRef = null;
	}
	setTimeout(function(){
		timerRef = setInterval(function(){
			if($("#autoFlag").is(":checked")){
				serverTable.refreshTb();
			}
	  	},$("#refreshTime").children('option:selected').val()*1000); //指定10秒刷新一次	
	},1000);
}
var serverTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height =  $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30;
		var settings = {
			classes:'table table-hover table-condensed',
			height:height,
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
						+ '/netstatus/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/netstatus/getPageList.do?fresh=' + Math.random()
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
		C.createTable("#bootstrapTable_alarm", Constants.CONTEXT_PATH+ '/uialarm/getUnDoPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable_alarm").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/uialarm/getUnDoPageList.do?fresh=' + Math.random()
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

function repairFlagFormatter(value, row, index) {
	if(value=='1'){
		return '已报修';
	}
	return '';
}

function initEvent(){
	$("#refreshTime").append(createAutoRefreshSelectOptions());
	$('#refreshTime').change(function(){ 
//		var p1=$(this).children('option:selected').val();//这就是selected的值 
//		clearInterval(timerRef);
		mySetInterVal();
	});
	mySetInterVal();


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
				var options ='<option value="-1">--全部--</option>';
	            for (i = 0; i < len; i++) {
	                options += '<option>'+json.data[i][2]+'</option>';
	            }
	            $('#equType').html(options);
	            $('#equType').val(typeName);
		}
	});

}
//行处理
function operateFormater(value,row,index){
	if(row.netStatus!='正常'&&row.netStatus!='在线'){
	    return [
	    	'<a class="dealBtn" href="javascript:void(0)" title="处理">',
	        '<i class="deal"></i>',
	        '</a>'].join("");
	}else{
		return '';
	}
}
//行处理 关注
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

function statusFormater(value,row,index){
	if(value == '异常'){

		return [
			'<i class="statusException">异常</i>'
		].join("");
	}else if(value== "中断"){
		return['<i class="statuspause">中断</i>'].join("");
	}else{
		return value;
	}
}

window.operateEvents = {
	'click .dealBtn' : function(e, value, row, index) {		
			var url = Constants.CONTEXT_PATH+'/netstatus/handlingWin?equipmentId='+row.equipmentId;
			showDialog(url);
	}
	
}
/**
 * 初始化布局
 */

function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
}

function showHistoryLog(){
	searchHistoryLog($('#equipmentId').val(),$('#propertyName').val());
}

