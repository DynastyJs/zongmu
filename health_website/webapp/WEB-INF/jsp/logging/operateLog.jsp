<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible"
	content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<link href="${pageContext.request.contextPath}/content/css/server.css"
	rel="stylesheet" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/js/logging/operateLog.js"></script>
<link href="${pageContext.request.contextPath}/content/css/form-group.css" rel="stylesheet" />

</head>

<body class="main-container">
	<!-- 中间布局	-->
	<div class="main-container" id="user-index-layout">
		<div class="ui-layout-center" id="centerDiv">
			<div class="panel panel-default">
				<!-- 按条件查询 -->
				<div class="orgmgr-container">

					<!-- 工具栏-->
					<div class="btn-group" style="float: left;">

						<div class="navbar-form navbar-left" role="form"
							style="padding-left: 4px">
							<div class="btn-group"
								style="float: left; ">
								<button type="button" value="" id="result"
									class="btn dropdown-toggle" data-toggle="dropdown">
									状态 <span class="caret"></span>
								</button>
								<ul class="dropdown-menu" role="menu" aria-labelledby="result">
									<li data-value="0"><a href="#">成功</a></li>
									<li data-value="1"><a href="#">失败</a></li>
									<li class="divider"></li>
									<li data-value=""><a href="#">全部</a></li>
								</ul>
							</div>
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">用户：</div>
									<input class="form-control" id="operName" placeholder="用户">
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">开始时间：</div>
									<input type="text"
										onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'endTime\')||\'2030-10-01\'}'})"
										id="startTime" placeholder="开始时间" class="form-control">
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">结束时间：</div>
									<input type="text"
										onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'startTime\')||\'2030-10-01\'}'})"
										id="endTime" placeholder="结束时间" class="form-control">
								</div>
							</div>
							<div class="form-group" >
								<input type="text" class="btn btn-primary col-xs-5" id="search"
									value="查询" />
							</div>

						</div>
					</div>
				</div>
					<!-- 表格 -->
					<table id="bootstrapTable" class="table table-bordered"
						data-pagination="true" data-height="400">
						<thead>
							<tr>
								<th data-field="id" data-formatter="numberFormatter">序号</th>
								<th data-field="operName">用户</th>
								<th data-field="ip">IP</th>
								<th data-field="content">内容</th> 
								<th data-field="result" data-formatter="statusFormatter">结果</th>
								<th data-field="errorReason">失败原因</th> 
								<th data-field="opTime"  data-formatter="DateFormatter">时间</th>
							</tr>
						</thead>
					</table>

				
			</div>
		</div>
	</div>
</body>

</html>