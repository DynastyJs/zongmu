<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
	<%
		String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
	%>
	<script type="text/javascript">
		var treeSelectOrgId = '<%=orgId%>';
	</script>
</head>
<body> 
	<!-- 中间布局	-->	
	<div ><span style="float:right;font-weight:normal;"><input id="autoFlag" type="checkbox"></input>自动刷新：<select id="refreshTime"></select><button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button" style="margin-top:0px;">刷新</button></span></div>
	<div class="main-container" id="mainContainer">
	     <!--   <div class="myTitle">基本信息</div>
		   <div class="myBottom"></div>
		   <div class="panel panel-default">
				<div class="panel-heading">
				      <span>组织机构 </span>
				</div>
				<div class="panel-body">
				<div class="left">fdsfdsfsfdsf</div>
				<div class="right">
					<div class="row">
						<div class="col-md-1 padding textRight" style="width:14px"><div class="colorBox" style="background-color: #52b4ea !important;"></div></div>
			  			<div class="col-md-6 padding" style="width:60px;text-align:center;">在线</div>			  			
			  			<div class="col-md-4 padding textRight">2300</div>
			  			<div class="col-md-1 padding" style="text-align:left;padding-left:5px">台</div>
			  		</div>
			  		<div class="row">
			  			<div class="col-md-1 padding textRight" style="width:14px"><div class="colorBox" style="background-color: #ff634d !important;"></div></div>
			  			<div class="col-md-6 padding" style="width:60px;text-align:center;">离线</div>			  			
			  			<div class="col-md-4 padding textRight">2300</div>
			  			<div class="col-md-1 padding" style="text-align:left;padding-left:5px">台</div>
			  		</div>
			  		<div style="text-align:right; padding-top: 10px;"><a href="javascript:void(0)"  onclick="window.parent.changeTab('/network/index')">详情</a></div>
		  		</div>
		  		
		  	 </div>
		  </div>
		<div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">硬盘录像机网络状态</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		  <div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">服务器网络状态</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		  <div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">PC网络状态</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		  <div class="col-md-1" style="width:220px">
		 	<div class="thumbnail">
		  		<div class = "title1">门禁控制器网络状态</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		 </div>
		 <div class="col-md-1" style="width:220px">
		 	<div class="thumbnail">
		  		<div class = "title1">报警主机网络状态</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		 </div>
		 <div class="col-md-1" style="width:220px">
		 	<div class="thumbnail">
		  		<div class = "title1">健康度检查主机网络状态</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		 </div>
		</div>
		<div class="row" style="width:1600px">	
		  <div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">服务器系统资源</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		  <div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">PC系统资源</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		  <div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">存储设备硬盘状态</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		 </div>
		<div class="row" style="width:1600px">	
		  <div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">市电供应</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		  <div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">UPS工作状态</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		  <div class="col-md-1" style="width:220px">
		  	<div class="thumbnail">
		  		<div class = "title1">温湿度监测</div>
		  		<div class="row">
		  			<div class="col-md-4" style="text-align:right;"> 离线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: red !important;"></div>		  			
		  			<div class="col-md-3"></div>台
		  		</div>
		  		<div class="row" style="padding-top:5px;">
		  			<div class="col-md-4" style="text-align:right;">在线</div>
		  			<div class="col-md-2 colorBox"  style="background-color: green !important;"></div>
		  			<div class="col-md-3" style="text-align:right;">3</div>台
		  		</div>
		  		<div id="container" style="height:200px"></div>
		  	 </div>
		  </div>
		 </div>
	  	 
		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">预警信息显示列表</span>
				<button id="refreshBtn_uialarm" class="btn btn-default" type="button">刷新</button>
			</div>
			
			<table id="bootstrapTable_uialarm" class="table table-bordered"
				data-pagination="true" data-height="380">
				<thead>
					<tr>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="beginTime">报警时间</th>
						<th data-field="orginizeName">来源机构</th>
						<th data-field="propertyName">报警源名称</th>
						<th data-field="alarmType">报警类型</th>
						<th data-field="netAddress">IP地址</th>
						<th data-field="alarmDesc">报警详细描述</th>
						<th data-field="alarmLevel">报警级别</th>
						<th data-field="processUser">处置人</th>
						<th data-field="processTime">处置时间</th>
						<th data-field="processResult">处置结果</th>
						<th data-field="processDesc">回复内容</th>
						<th data-field="isPlatform">旁路状态</th>
						<th data-field="isPlatform">旁路时长</th>
					</tr>
				</thead>
			</table>	
		</div>
		-->
	</div>
	 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/home.css"/>
	 <script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts.js"></script>
	  <script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/modules/data.js"></script>
	 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/home/index.js"></script>
	 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/hisRecord.css"/>
</body>
</html>