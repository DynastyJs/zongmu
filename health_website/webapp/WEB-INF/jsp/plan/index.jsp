<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>

</head>
<body>
	<!-- 中间布局	-->
	<div class="main-container" id="mainContent">
		<div class="viewport">
			<ul class="nav nav-tabs">
				<li data-url="/plan/rule"
					style="border-left: 1px solid #d9d9d9; display: block;"
					data-rightcode="PLAN_RULE"><a href="javascript:void(0)">计划规则</a></li>
				<li data-url="/plan/list" style="display: block;"
					data-rightcode="PLAN_LIST" ><a href="javascript:void(0)">录像列表</a></li>
			</ul>
	</div>
			<div class="content" >
				<iframe id="mainIframeId" height="100%" width="100%" frameBorder="0"></iframe>
			</div>
		
	</div>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/main.css"/>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/js/plan/index.js"></script>
</body>
</html>