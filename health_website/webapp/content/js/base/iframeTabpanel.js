var Tab = (function(){
	var config = {
		shareIframe : false	,
		menuId :'',
		mainBody: ''
	};
	
	function initLayout(){
	}


	

	/**
	 * 显示tab和list
	 * @param obj
	 * @param index
	 */
	function showTabList(obj,index,url){
	    index = index? index : 0;

	    //tab高亮
	    if(obj){
	       $(obj).addClass("active").siblings("li").removeClass("active");
	    }else{
	       $(config.menuId).find("li").eq(index).addClass("active").siblings("li").removeClass("active");
	    }
	     url =  $(obj).data("url");
	     framId =  $(obj).data("id");

	    //show iframe
	    //refreshAll 的设置在参数设置初始化
	   
				url = Constants.CONTEXT_PATH + url;
				if(!hasIframe(framId)){//没有相关iframe,则创建
					var iframe = createIframe(framId);
					iframe.attr("src",url);
					append2Main(iframe);
				}
				$("#" + framId).addClass("on").removeClass("off");
				$("#" + framId).siblings("iframe").addClass("off").removeClass("on");
	}

	/**
	 * 初始化Tab
	 */
	function initTab (){
	        
	        //遍历所有tab
	        $(config.menuId).find("li").each(function(index){
	            var $li = $(this);
	            //li绑定click事件
	            $li.click(function(){
	                showTabList(this,index);
	            });
	        });
	         $(config.menuId).find("li:first").click();
	}
	
	/**
	 * 构建Iframe对象
	 */
	function createIframe(id) {
		var iframe = $("<iframe class='iframe off'>").attr("id",id);
		return iframe;
	}

	/**
	 * 添加到.main DOM中
	 */
	function append2Main (iframe){
		
		$(config.mainBody).append(iframe);
	}

	/**
	 * 判断是否存在指定的Iframe
	 * @param id Iframe id
	 */
	function hasIframe(id){
		var iframes = $(config.mainBody).find(".iframe"),flag=false;
		$.each(iframes,function(idx,iframe){
			if($(iframe).attr("id") == id){
				flag = true;
			}
		})
		return flag;
	}

	/**
	 * 标记刷新操作
	 * 如果在非监控页面刷新，刷新后，返回监控页面，会出现折线图不能铺满空间的现象
	 * 标志状态，当从其他页面切换到监控页面时，进行一次刷新
	 */
	function observeRefresh() {
	}
	
	function removeIframe(id){
		$("iframe[id='"+id+"']").empty();
	}
	function applyParams(obj){
		for(o in obj){
			config[o] = obj[o];
		}
	}
	function init(obj){
		applyParams(obj);
		initLayout();
		initTab();
		observeRefresh();
	}
	
	return {
		init : init
	}
})();
