<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link
	href="${pageContext.request.contextPath}/content/uilib/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<link
	href="${pageContext.request.contextPath}/content/uilib/zTree/css/zTreeStyle/zTreeStyle.css"
	rel="stylesheet" type="text/css">
<link
	href="${pageContext.request.contextPath}/content/css/base/ztree-plus.css"
	rel="stylesheet" type="text/css">
<link
	href="${pageContext.request.contextPath}/content/uilib/artDialog/css/ui-dialog.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/content/uilib/autocompleter/jquery.autocompleter.css"
	rel="stylesheet" />
<title>部门树</title>
</head>
<body>
	<div class="ztree-plus">
		<div class="search">
			<input type="text" placeholder="输入部门查询" id="orgSearch"> <i
				class="fa fa-search"></i>
		</div>
		<div class="tree">
			<ul class="ztree" id="orgTree"></ul>
		</div>
	</div>
</body>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/uilib/jquery/jquery-1.11.2.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/uilib/zTree/js/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/js/base/constants.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/uilib/artDialog/dist/dialog-plus-min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/uilib/autocompleter/jquery.autocompleter.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/uilib/custom-scrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/js/base/org-tree.js"></script>

</html>