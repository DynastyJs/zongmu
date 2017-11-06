<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 

<head>
<%@ include file="/WEB-INF/jsp/base/header.jsp" %>
	<%
		String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
	%>
	<script type="text/javascript">
		var treeSelectOrgId = '<%=orgId%>';
	</script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/hisRecord.css"/>
<style type="text/css">

.myBottom{
	height:2px;
	border:2px solid #f2f2f2;
	border-top:0px;
	border-left:0px;
	border-right:0px;
	margin-bottom:2px;
}
.myTitle{
    margin-left: 0px;
	color:#666666;
	margin-bottom:10px;
	font-size: 14px; 
	font-weight: bold;
}
.pagination > li > a, .pagination > li > span {
	line-height:1;
}
 .pagination, .pagination-detail {
    margin-bottom: 6px;
    margin-top: 6px;
}
.panel-heading {
    background-color: #f8f8f8;
    color: #666666;
    font-size: 14px;
    height: 32px;
    padding-top: 3px;
    text-align: center;
    overflow: hidden; 
    text-overflow:ellipsis;
    white-space:nowrap;
}
.panel-body {
    padding: 5px;
}
span.rightAlign {
    display: inline-block;
}
span.leftAlign {
    width: 53%;
    display: inline-block;
}
span.pagination-info {
    font-weight: normal;
    line-height: 0;
}

.pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
    color: #fff !important;
    background-color: #4696f5 !important;
    border-color: #4696f5 !important;
}

</style>
</head>
<body>
<input type="hidden" data-rightcode="SYSDEV_DEAL"/>
<input type="hidden" data-rightcode="SYSDEV_FOCUS"/>
<div class="his-record">
		<div class="main_content">
			<div id="timeDiv" style="overflow:hidden;"><span style="float:right;font-weight:normal;"><input id="autoFlag" type="checkbox"></input>自动刷新：<select id="refreshTime"></select><button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button" style="margin-top:0px;">刷新</button></span></div>
				<div style="display:none" class="no-data1">
           			<div class="">
            				<span id="error-msg">很抱歉   , 该组织机构下未添加有设备 !</span>
           			</div>
           		</div> 
			<div id="temp-container" class="car-list grid"></div>
			<!-- 分页容器 -->
		</div>
	</div>
	<div style="display:none">
		<fieldset>
          <legend><div id="equType">fdfdf</div></legend>
		<!-- 列表模板 -->
		<div id="myTemp" class="car-list-item grid-col col-19">
			<div class="thumbnail">
				<div>
					<div class="grid">
						<div class="grid-col col-4">
							<a class="imgwrapper">
								<img alt="carimage" src="" class="lazy loading">
							</a>
						</div>
					     <div class="grid-col col-4">
					     	<div class="caption">
								<p class="name">aaa</p>
								<p class="netstatus">bbb</p>
								<p class="passTime"></p>
								<p class="carNum"></p>
								<p class="carType"></p>
							</div>
					      </div>
					</div>
				</div>
				<p class="analy"></p>
				<button class="btn btn-royalblue flat-btn analyBtn" type="button">处理</button>
			</div>
		</div>
		<!-- 分页模板 -->
		<input type="hidden" id="currentPage" name="currentPage" value="1">
		<input type="hidden" id="pageSize" name="pageSize" value="10">
		<input type="hidden" id="pageCount" name="pageCount" value="100">
		<div id="myPage" class="text-right bottom-pagination clearfix">
			<div class="pull-left pagination-detail">
				<span class="pagination-info"> 总共 <b class="total-row">289804</b>条记录 </span>
				<span class="page-list">每页显示 
					<span class="btn-group dropup">
						<button data-toggle="dropdown" class="btn btn-dodgerblue flat-btn  dropdown-toggle" type="button">
							<span class="page-size">10</span> 
							<span class="caret"></span>
						</button>
						<ul role="menu" class="dropdown-menu ">
							<li class="active"><a href="javascript:void(0)">10</a></li>
							<li><a href="javascript:void(0)">25</a></li>
							<li><a href="javascript:void(0)">50</a></li>
							<li><a href="javascript:void(0)">100</a></li>
						</ul>
					</span> 条 &nbsp;最多显示100页
				</span>
			</div>
			<div id="right-pagination" class="pull-right pagination"><li class="page-pre"><a href="javascript:void(0)"><i class="glyphicon glyphicon-menu-left"></i></a></li><li class="page-number active"><a href="javascript:void(0)">1</a></li><li class="page-number"><a href="javascript:void(0)">2</a></li><li class="page-number"><a href="javascript:void(0)">3</a></li><li class="page-number"><a href="javascript:void(0)">4</a></li><li class="page-number"><a href="javascript:void(0)">5</a></li><li class="page-number disabled"><a href="javascript:void(0)">...</a></li><li class="page-number"><a href="javascript:void(0)">100</a></li><li class="page-next"><a href="javascript:void(0)"><i class="glyphicon glyphicon-menu-right"></i></a></li></div>
		</div>
		</fieldset>
	</div>
	<div class="opwin nice-validator n-default" id="maskwin" style="display: none;">
		<div style="margin:20px;">
			<div style="padding:2px 10px;">
				<span>设备名称：</span> 
				<input type="text"  style="width:80px;" id="aliasName" name="aliasName"/>
	   		</div>
		</div>
	</div>
</center>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/sysdev/index.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/pagination.js"></script>
</html>