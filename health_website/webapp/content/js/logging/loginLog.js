/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	initLayout();
	serverTable.setTable();
	serverTable.searchTb();
	initEvent();
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
		  	queryParams : function(params) {
		  		if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params['search_LIKE_userName'] = $("#userName").val() || "";
				params['search_GTE_logTime'] = $("#startTime").val() || "";
				params['search_LTE_logTime'] = $("#endTime").val() || "";
				params['search_EQ_result'] = $("#result").val() || "";
				params['pageSize'] = params.limit;
				params['pageNumber'] = pageNumber;
				return params;
			}
		  };
			  C.createTable("#bootstrapTable",Constants.CONTEXT_PATH+ '/loginLog/getPageList.do',settings);
		 
	},
	/**
	 * 更新表格
	 */
	refreshTb:function(){
		$("#bootstrapTable").bootstrapTable('refresh', {
			url:Constants.CONTEXT_PATH+'/loginLog/getPageList.do'
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
};

function statusFormatter(value, row, index) {
	if(value==0){
		return "成功";
	}else{
		return "失败";
	}
}

function DateFormatter(value, row, index) {
     return value.substring(0,19);
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
	$('.dropdown-menu li').each(function(){
		var $li = $(this);
		var value = $li.data('value');
		var text = $li.find("a").text();
		$li.click(function(){
			$('#result').html(text+' <span class="caret"></span>');
			$('#result').val(value);
		});
	});
}


/**
 * 提交信息
 */
var postData = {
	postAciton:function(result){
		var data = {
				'search_EQ_result' : result
		};
		$.ajax({
			async:false,
			data:data,
			dataType:'json',
			url:Constants.CONTEXT_PATH+'/loginLog/getPageList.do',
			success:function(data){
				if(data.ret == 1){
					serverTable.setTable();
					return true;
				}else{
					return false;
				}
			},
			error:function(){
				return false;
			}
		});
	}
};



