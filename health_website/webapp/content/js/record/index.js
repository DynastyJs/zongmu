/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	 		
			initLayout();
			$(window).resize(function(){
//				initLayout();
				$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-20} );			
			});
			initEvent();
			serverTable.setTable();
			serverTable.searchTb();
			$("#alarmId").val('');
			initAlarmTable = false;
			$("[data-rightcode]").each(function(){
				var $em = $(this);
				var rightCode = $em.data("rightcode");
				if(top.checkRight(rightCode)){
		    		$em.css('display','block');
				}else{					
					if(rightCode=='RECORD_DEAL'){
						$("#bootstrapTable").bootstrapTable('hideColumn', 'processResult');
					}
				}
		  	});
		});

var serverTable = {
	/**
	 * 加载中弹窗
	 */
	loaderIndex:{},
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-20;
		var settings = {
			classes:'table table-hover table-condensed',
			height : height,
			queryParams : function(params) {
				serverTable.loaderIndex = layer.load(0, {shade: false});
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				params['search_ORGLIKE_path'] = treeSelectOrgId;
				params['search_EQ_recordDate'] = $('#startTime').val();
				params['search_LIKE_equipmentName'] = $('#search_equipmentName').val();
				return params;
			},
			onLoadSuccess: function(data){  //加载成功时执行
				layer.close(serverTable.loaderIndex);
		    }
		}
		C.createTable("#bootstrapTable", Constants.CONTEXT_PATH
						+ '/record/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb1 : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/record/getPageList.do?fresh=' + Math.random()
		});
	},
	
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		var page = $("#bootstrapTable").bootstrapTable("getPage");  
		$("#bootstrapTable").bootstrapTable('selectPage',page.pageNumber)
	},
	
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#search").click(function(){
			serverTable.refreshTb1();
		});
		$("#refreshBtn").click(function(){
			serverTable.refreshTb1();
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
	var myDate = new Date();
	myDate.setDate(myDate.getDate()-1);
	$("#startTime").val(myDate.format("yyyy-MM-dd"));
	
	$('#preBtn').click(function(){
		var str = $("#startTime").val().replace(/-/g,"/"); 
		var date = new Date(str);
		date.setDate(date.getDate()-1);
		$("#startTime").val(date.format("yyyy-MM-dd"));
		serverTable.refreshTb1();
	});
	$('#nextBtn').click(function(){
		var str = $("#startTime").val().replace(/-/g,"/"); 
		var date = new Date(str);
		date.setDate(date.getDate()+1)
		$("#startTime").val(date.format("yyyy-MM-dd"));
		serverTable.refreshTb1();
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

function daysAlarmFormater(value,row,index){
	if(row.realSaveDaysInplan==""){
		return ['<i class="except"></i>'].join("");
	}
	if(parseInt(row.realSaveDaysInplan)<parseInt(row.saveDays)){
			return ['<i class="except"></i>'].join("");
	}else{
		return ['<i class="equipmentNormal"></i>'].join("");
		//return '正常';
	}
}

function realSaveDaysFormater(value,row,index){
	var saveDays = row.saveDays!=""?row.saveDays:"未配置";
	return value+'--(计划：'+saveDays+')';
}




window.operateEvents = {
	'click .dealBtn' : function(e, value, row, index) {
		popUpWindow.handleEvent(row);
	},
	'click .historyBtn' : function(e, value, row, index) {
			// 弹窗编辑
			var d = dialog({
						title : '设备录像详情',
						width:800,
						height:400,
						url : Constants.CONTEXT_PATH + '/record/history?dvsCode='+row.dvsCode+'&chnnCode='+row.chnnCode
					});

			d.showModal();
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
	handleEvent : function(row) {
		if (typeof(row.dvsEquipmentId) == 'undefined' || row.dvsEquipmentId == '') {
			layer.alert('请选择需要修改的记录!', {icon : 0});
		} else if (isNaN(row.dvsEquipmentId)) {
			layer.alert('只能选择一条记录!', {
						icon : 0
					});
		} else {
		var url = Constants.CONTEXT_PATH +'/record/handle'
			+'?chnnCode=' + row.chnnCode+'&dvsCode='+row.dvsCode
			+'&equipmentId='+row.chnnEquipmentId+'&recordDate='+ $('#startTime').val()+'&dvsEquipmentId='+row.dvsEquipmentId;
		showDialog(url,'录像存储异常');	
//			// 弹窗编辑
//			var d = dialog({
//						title : '处理',
//						url : Constants.CONTEXT_PATH + '/record/handle?dvsCode='+row.dvsCode+'&chnnCode='+row.chnnCode+'&equipmentId='+row.dvsEquipmentId,
//						cancelValue : '取消',
//						cancel : function() {
//						},
//						okValue : '确 定',
//						ok : function() {
//
//						}
//					});
//
//			d.showModal();
		}
	}
}
