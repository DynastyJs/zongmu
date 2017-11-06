<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
 <%@ include file="/WEB-INF/jsp/base/header.jsp"%>
</head>
<script>
/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	$('.main-container').height($(window).height() - 60);
	$(window).resize(function() {
		$('.main-container').height($(window).height() - 60);
	});
	$('.nav-tabs li').each(function(){
		var $li = $(this);
		var url = $li.data("url");
		$li.click(function(){
			$("#mainIframeId").attr("src",Constants.CONTEXT_PATH+url);
			$('.nav-tabs li.active').removeClass("active");
			$li.addClass("active");
		});
	});
	//默认展开第一个
	$('.nav-tabs li:first').click();
});
</script>
<body class="main-container"> 

	<ul class="nav nav-tabs" >
		<li class="active" data-url = "/domain/index">
			<a href="javascript:void(0)" data-url="/domain/index">区域管理</a> 
		</li>
		<li data-url = "/server/index">
			<a href="javascript:void(0)" data-url="/server/index">服务管理</a> 
		</li>
		<li data-url="/platform/index">
			<a href="javascript:void(0)" data-url="/platform/index">平台管理</a>
		</li>
		<li data-url="/loginLog/index">
			<a href="javascript:void(0)" data-url="/loginLog/index">登陆日志</a>
		</li>
		<li data-url="/operateLog/index">
			<a href="javascript:void(0)" data-url="/operateLog/index">操作日志</a>
		</li>
	</ul>
	<!-- 中间布局	-->	
	<div class="main-container" id="user-index-layout">
		<iframe id="mainIframeId"  height="100%" width="100%" frameBorder="0"></iframe>
	</div>
</body>
</html>