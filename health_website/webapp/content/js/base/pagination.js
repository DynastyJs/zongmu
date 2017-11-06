/**
 * 基于boostrapTable分页样式的分页


/**
 * 获取页码
 * @type 
 */
var pageNum = {
	getMaxPage:function(){//最多显示页码数(最小设置为7)
		return 7;
	},
	getCurrentPage:function(id){//获取当前页码
		return $("#currentPage_"+id).val();
	},
	getPageCount:function(id){//获取页码总数
		return $("#pageCount_"+id).val();
	}
}

/**
 * 分页操作
 * @type 
 */
var pagination = {
	/**
	 * 显示分页
	 */
	showPage:function(id,currentPage,pageCount,maxPage){
		var currentPage = parseInt(currentPage);
		var pageCount = parseInt(pageCount);
		var maxPage = parseInt(maxPage);
		$("div#myfieldset_"+id+" .pagination").empty();
		var temp = null;
		var firstTemp = '<li class="page-pre"><a href="javascript:void(0)"><i class="glyphicon glyphicon-menu-left"></i></a></li>';
		var lastTemp = '<li class="page-next"><a href="javascript:void(0)"><i class="glyphicon glyphicon-menu-right"></i></a></li>';
		$("div#myfieldset_"+id+" .pagination").append(firstTemp);
		
		if(pageCount <= maxPage){//小于最多显示页码数则不需要用...隐藏其余页码
			for(var i = 1; i <= pageCount; i++){
				if( i == currentPage){//当前分页为选中状态
					temp = '<li class="page-number active"><a href="javascript:void(0)">'+currentPage+'</a></li>';
					$("div#myfieldset_"+id+" .pagination").append(temp);
				}else{
					temp = '<li class="page-number"><a href="javascript:void(0)">'+i+'</a></li>';
					$("div#myfieldset_"+id+" .pagination").append(temp);
				}
			}
		}else{//大于最多显示页码数
			if(currentPage >= 1 && currentPage <= (maxPage - 3)){
				for(var i = 1 ;i <= maxPage - 2; i++){
					if( i == currentPage){//当前分页为选中状态
						temp = '<li class="page-number active"><a href="javascript:void(0)">'+currentPage+'</a></li>';
						$("div#myfieldset_"+id+" .pagination").append(temp);
					}else{
						temp = '<li class="page-number"><a href="javascript:void(0)">'+i+'</a></li>';
						$("div#myfieldset_"+id+" .pagination").append(temp);
					}
				}
				temp = '<li class="page-number disabled"><a href="javascript:void(0)">...</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				temp = '<li class="page-number"><a href="javascript:void(0)">'+pageCount+'</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
			}else if(currentPage > (maxPage - 3) && currentPage < (pageCount-(maxPage - 4))){
				temp = '<li class="page-number"><a href="javascript:void(0)">1</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				temp = '<li class="page-number disabled"><a href="javascript:void(0)">...</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				temp = '<li class="page-number"><a href="javascript:void(0)">'+(currentPage-1)+'</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				temp = '<li class="page-number active"><a href="javascript:void(0)">'+currentPage+'</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				temp = '<li class="page-number"><a href="javascript:void(0)">'+(currentPage+1)+'</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				temp = '<li class="page-number disabled"><a href="javascript:void(0)">...</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				temp = '<li class="page-number"><a href="javascript:void(0)">'+pageCount+'</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
			}else if((currentPage >= (pageCount-(maxPage - 4))) && currentPage <= pageCount){
				temp = '<li class="page-number"><a href="javascript:void(0)">1</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				temp = '<li class="page-number disabled"><a href="javascript:void(0)">...</a></li>';
				$("div#myfieldset_"+id+" .pagination").append(temp);
				for(var i = (pageCount-(maxPage - 3)); i <= pageCount; i++){
					if( i == currentPage){//当前分页为选中状态
						temp = '<li class="page-number active"><a href="javascript:void(0)">'+currentPage+'</a></li>';
						$("div#myfieldset_"+id+" .pagination").append(temp);
					}else{
						temp = '<li class="page-number"><a href="javascript:void(0)">'+i+'</a></li>';
						$("div#myfieldset_"+id+" .pagination").append(temp);
					}
				}
			}
		}
		$("div#myfieldset_"+id+" .pagination").append(lastTemp);
		//pagination.clickEvent();//初始化点击事件
	},
	/**
	 * 点击事件
	 */
	clickEvent:function(id){
		/**
		 * 点击分页
		 */
		$("div#myfieldset_"+id+" .bottom-pagination").on('click','li',function(event){
			if($(this).attr("class") == "page-pre"){//点击上一页
				if(pageNum.getCurrentPage(id) == 1){
				//	pagination.showPage(id,pageNum.getPageCount(id),pageNum.getPageCount(id),pageNum.getMaxPage());
					$("#currentPage_"+id).val(pageNum.getPageCount(id));
				}else{
				//	pagination.showPage(parseInt(pageNum.getCurrentPage(id))-1,pageNum.getPageCount(id),pageNum.getMaxPage());
					$("#currentPage_"+id).val(parseInt(pageNum.getCurrentPage(id))-1);
				}
			}else if($(this).attr("class") == "page-next"){//点击下一页
				if(pageNum.getCurrentPage(id) == pageNum.getPageCount(id)){
				//	pagination.showPage(id,1,pageNum.getPageCount(id),pageNum.getMaxPage());
					$("#currentPage_"+id).val(1);
				}else{
				//	pagination.showPage(parseInt(pageNum.getCurrentPage(id))+1,pageNum.getPageCount(id),pageNum.getMaxPage());
					$("#currentPage_"+id).val(parseInt(pageNum.getCurrentPage(id))+1)
				}
			}else if($(this).attr("class") == "page-number"){//点击对应分页
				var page = $(this).find("a").html();
				pagination.showPage(id,page,pageNum.getPageCount(id),pageNum.getMaxPage());
				$("#currentPage_"+id).val(page);
				if(id==1){
			   	   searchList.updateListByType('1,2,3,4,6,8,9,10,11,14,15,20',1);
//			     searchList.initDom(2, '硬盘录像机硬盘状态');
				}else if(id==2){
					 searchList.updateListByType('5',2);
				}else if(id==3){
//			     searchList.initDom(3, '动环状态');
			   	    searchList.updateListByType('-2',3);
				}
//				debugger;
			}
		});
		$("div#myPage_"+id+" .dropdown-menu").on('click','li',function (){
			var pageSize = $(this).find("a").html();
			$("div#myPage_"+id+" .dropdown-menu li").removeClass("active");
			
			$("div#myPage_"+id+" .dropdown-menu li").each(function(i){
				if(pageSize == $(this).find("a").html()){
					 $(this).addClass("active");
				}
			})
			$(this).addClass("active");
			$("#pageSize_"+id).val($(this).find("a").html());
			$("div#myPage_"+id+" .page-size").html($(this).find("a").html());
			//从第一页开始
			$("#currentPage_"+id).val("1");
			if(id==1){
			   	   searchList.updateListByType('1,2,3,4,6,8,9,10,11,14,15,20',1);
//			     searchList.initDom(2, '硬盘录像机硬盘状态');
				}else if(id==2){
					 searchList.updateListByType('5',2);
				}else if(id==3){
//			     searchList.initDom(3, '动环状态');
			   	    searchList.updateListByType('-2',3);
				}
			
			//
			//hisRecord.blurCheck();
		})
		
	}
}

