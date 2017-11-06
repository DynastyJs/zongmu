/**
 * 头部js
 * 
 * @author liuxg
 * @date 2015年6月12日 下午7:23:51
 */

$(function(){
	nprogress();
})

/**
 * 显示加载进度条
 */
function nprogress() {
	
	NProgress.configure({ showSpinner: false }); //取消旋转框
	$(document).ajaxStart(function() { //ajax请求开始
		NProgress.start();
	}).ajaxComplete(function() {//ajax请求结束
	    NProgress.done();
	});
	window.onload = function() { // 删除全站控件
		NProgress.remove();
	}
}
