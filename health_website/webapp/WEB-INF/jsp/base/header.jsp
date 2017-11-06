<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<head>
<meta content="webkit" name="renderer">
<meta http-equiv="X-UA-Compatible" content="IE=EDGE;chrome=1">
<meta http-equiv="Expires" CONTENT="0">        
<meta http-equiv="Cache-Control" CONTENT="no-cache">        
<meta http-equiv="Pragma" CONTENT="no-cache">        
<title>安防系统监测平台</title>
<!-- 全局样式 -->
<link rel="shortcut" href="/favicon.ico" /> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/uilib/bootstrap/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/uilib/font-awesome/css/font-awesome.min.css"/>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/uilib/bootstrapTable/bootstrap-table.min.css"/>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/uilib/nice-validator/jquery.validator.css"/>
<!-- layout布局 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/uilib/jqlayout/layout-default-latest.css" />

<!-- 滚动条样式 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/uilib/mCustomScrollbar/jquery.mCustomScrollbar.css"/>


<!-- ztree -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/uilib/zTree/css/zTreeStyle/zTreeStyle.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/base/ztree-plus.css"/>

<!-- 弹框样式 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/uilib/artDialog/css/ui-dialog.css"/>

<!-- 右键菜单 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/uilib/gui/gdropdown/gdropdown.css">

<!-- 提示 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/uilib/gui/gmsg/gmsg.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/common.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/ztree.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/normalize.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/normal.css"/>


	<!-- 常量信息 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/jquery/jquery-1.11.2.min.js"></script>	
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/constants.js"></script>
	<!-- jquery layout -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/jqlayout/jquery.layout-latest.js"></script>
	
	<!-- bootstrap table -->
	<!-- ztree -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/bootstrapTable/bootstrap-table.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/bootstrapTable/bootstrap-table-zh-CN.min.js"></script>

	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/zTree/js/jquery.ztree.core-3.5.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/zTree/js/jquery.ztree.excheck-3.5.min.js"></script>
	<!-- scrollbar -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
	
	<!-- 自动匹配 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/autocompleter/jquery.autocompleter.min.js"></script>
	
	<!-- 图形 
	<script type="text/javascript" src='${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts.js'></script>-->
	
	<!-- 弹框 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/artDialog/dist/dialog-plus-min.js"></script>
	
	<!-- 右键菜单 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/gui/gdropdown/gdropdown.js"></script>
	
	<!-- 提示-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/gui/gmsg/gmsg.js"></script>

	<!-- 验证-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/nice-validator/jquery.validator.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/nice-validator/local/zh_CN.js"></script>
	<!-- 通用组件 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/common.js"></script>
	<!-- 提示框-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/layer/layer.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/bootstrap-suggest/bootstrap-suggest.min.js"></script>
	<!-- bootstrap 兼容IE8 -->
	<!--[if lt IE 9]>
	 <script type="text/javascript"  src="${pageContext.request.contextPath}/content/uilib/bootstrap/js/respond.min.js"></script>
	<script type="text/javascript"  src="${pageContext.request.contextPath}/content/uilib/bootstrap/js/html5shiv.js"></script>
	<![endif]-->
	<script type="text/javascript">
	window.onload=function(){
		var mainIframeDom=window.parent.document.getElementById("mainIframeId");
		if(mainIframeDom!=null){
			mainIframeDom.onload=function(){
				var iframeSrc= mainIframeDom.contentWindow.location.href;
				var liSrc = '';
				if(iframeSrc.indexOf("?")>-1){
					liSrc=iframeSrc.substring(iframeSrc.indexOf("${pageContext.request.contextPath}"),iframeSrc.indexOf("?"));
				}else{
					liSrc=iframeSrc.substr(iframeSrc.indexOf("${pageContext.request.contextPath}"));
				}
				var content= window.parent.document.getElementById("mainContent");
				var ulObj=content.getElementsByTagName("ul")[0];
				var liObjs=ulObj.getElementsByTagName("li");
				for(var i=0;i<liObjs.length;i++){
					var realLiSrc="${pageContext.request.contextPath}"+liObjs[i].getAttribute("data-url");
					if(realLiSrc==liSrc){
						liObjs[i].setAttribute("class","active");
						$(liObjs[i]).siblings().removeClass("active");
						mainIframeDom.focus();
						if(liSrc.indexOf('/plan/')==-1||liSrc.indexOf('/diagnosis_mission/')==-1){
							return;
						}
						top.layer.closeAll();
						return;
					}
				}
			}
		}
	}
	</script>
</head>
