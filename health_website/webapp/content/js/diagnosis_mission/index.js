
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
	});
	$('.nav-tabs li').each(function(){
		var $li = $(this);
		var rightCode = $li.data("rightcode");
//		if(checkRight(rightCode)){
			var url = $li.data("url");
			$li.css('display','block');
			$li.click(function(){
				 var src = $("#mainIframeId").attr("src"),typeName='';
				$("#mainIframeId").attr("src",Constants.CONTEXT_PATH+url);
				$('.nav-tabs li.active').removeClass("active");
				$li.addClass("active");
			});
//		}
	});
	$('.nav-tabs li:visible:first').click();
});


/**
 * 初始化布局
 */
function initLayout() {
	$("#mainContent").height($(window).height());
	$("#mainIframeId").height($("#mainContent").height()-$('.viewport').height()-50);
}