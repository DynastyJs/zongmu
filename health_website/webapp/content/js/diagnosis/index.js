/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
			initLayout();
//			$(window).resize(function(){
//				initLayout();
//				$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()*2-20*2} );			});
			initEvent();
			serverTable.setTable();
			serverTable.searchTb();
			$("#alarmId").val('');
			$("[data-rightcode]").each(function(){
				var $em = $(this);
				var rightCode = $em.data("rightcode");
				if(top.checkRight(rightCode)){
		    		$em.css('display','block');
				}else{					
					if(rightCode=='DIAGNOSIS_DEAL'){
						$("#bootstrapTable").bootstrapTable('hideColumn', 'processResult');
					}
				}
		  	});
		});

var serverTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()*2;
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
						+ '/diagnosis/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb1 : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/diagnosis/getPageList.do?fresh=' + Math.random()
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

}
//行处理
function operateFormater(value,row,index){
	if(row.nosignal==2)
		return '';
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



window.operateEvents = {
	'click .dealBtn' : function(e, value, row, index) {
		var url = Constants.CONTEXT_PATH +'/diagnosis/diagnosisHandle'
			+'?chnnCode=' + row.chnnCode+'&dvsCode='+row.dvsCode
			+'&equipmentId='+row.chnnEquipmentId
			+'&treeSelectOrgId='+treeSelectOrgId
			+'&dvsEquipmentId='+row.dvsEquipmentId;
		showDialog(url,'摄像机视频异常');
	},
	'click .historyBtn' : function(e, value, row, index) {
			// 弹窗编辑
			var d = dialog({
						title : '设备录像详情',
						width:800,
						height:400,
						url : Constants.CONTEXT_PATH + '/record/history'
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
