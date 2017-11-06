<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title>资源管理</title>

<!-- bootstrap 样式 -->
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/uilib/bootstrap/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/uilib/bootstrapTable/bootstrap-table.min.css"/>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/css/base/header.css"/>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/css/base/iframe.css"/>
	
<!-- bootstrap 兼容IE8 -->
<!--[if lt IE 9]>
 <script type="text/javascript"  src="${pageContext.request.contextPath}/content/uilib/bootstrap/js/respond.min.js"></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/content/uilib/bootstrap/js/html5shiv.js"></script>
<![endif]-->
</head>
<body style="height:100%;width:100%;margin:0;padding:0;position:absolute;"> 
	<div id="headerBody">
		<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
	</div>
	<div id="centerBody">
	</div>
	<div id="footerBody">
		<%@ include file="/WEB-INF/jsp/base/footer.jsp"%>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/main/TopTab.js"></script>
</body>
</html>