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
				$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-20} );
			});
			fsuTable.setTable();
			fsuTable.searchTb();
			$("#fsuId").val('');
			initEvent();
			$("[data-rightcode]").each(function(){
				var $em = $(this);
				var rightCode = $em.data("rightcode");
				if(top.checkRight(rightCode)){
		    		$em.css('display','block');
		    		
				}else{
					if(rightCode=="FSU_DEAL"){
						$("#bootstrapTable").bootstrapTable('hideColumn', 'processResult');
					}
				}
		  	});
		});
function initEvent(){
	$("#fsu-refreshBtn").click(function(){
		fsuTable.refreshTb();
	});
}

var fsuTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-20;;
		var settings = {
			classes : 'table table-hover',
			height : height,
			queryParams : function(params) {
				params['search_ORGLIKE_path'] = treeSelectOrgId;
				return params;
			}
		}
		C.createTable("#bootstrapTable", Constants.CONTEXT_PATH
						+ '/fsuinfo/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/fsuinfo/getPageList.do?fresh=' + Math.random()
		});
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#search").click(function(){
			fsuTable.refreshTb();
		});
	},
	
	/**
	 * 更新行数据
	 */
	updateRow : function(index, row){
		$("#bootstrapTable").bootstrapTable('updateRow', {index : index, row : row
		});
	}
}



function operateFormater(value,row,index){
	if(row.netStatus=='正常'){
	    return [
	    	'<a class="dealBtn" href="javascript:void(0)" title="处理">',
	        '<i class="deal"></i>',
	        '</a>'].join("");
	}
	return "";
}

window.operateEvents = {
	'click .dealBtn' : function(e, value, row, index) {
		var winIndex = top.layer.open({
			type: 2,
			title : '处理',
			content : Constants.CONTEXT_PATH + '/fsuinfo/config?fsuId='+row.fsuId+'&orgId='+treeSelectOrgId+'&name='+row.name,
			area:['80%','80%'],
			btn: ['关闭'],
			yes : function(index) {
				 top.layer.close(index);
			}

		});
	}
}


/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
}

