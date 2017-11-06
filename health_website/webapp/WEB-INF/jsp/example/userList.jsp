<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title>用户管理主页</title>

<!-- bootstrap 样式 -->
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/uilib/bootstrap/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/uilib/bootstrapTable/bootstrap-table.min.css"/>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/css/base/header.css"/>
 
<!-- bootstrap 兼容IE8 -->
<!--[if lt IE 9]>
 <script type="text/javascript"  src="${pageContext.request.contextPath}/content/uilib/bootstrap/js/respond.min.js"></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/content/uilib/bootstrap/js/html5shiv.js"></script>
<![endif]-->
</head>
<body> 
	<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
	
	<!-- 中间布局	-->	
	<div class="main-container" id="user-index-layout">
		<div class="ui-layout-west" id="westDiv">
			<div class="search">
				<input type="text" placeholder="输入部门或人员查询" id = "orgUserSearch" /> 
				<i class="fa fa-search"></i>
			</div>
			
			<div class="tree" id="treeDiv">
				<ul class="ztree" id="userOrgTree"></ul>
			</div>
			
		</div>
		
		<div class="ui-layout-center" id="centerDiv">
			<div class="panel panel-default" >
			  <div class="panel-heading">人员列表</div>
			  
			  <!-- 工具栏-->
			  <div id="custom-toolbar" >
		    		<div class="form-inline" role="form" style="padding-left: 4px" >
			    		<div class="form-group">
				            <div class="input-group">
				                <div class="input-group-addon">任务标题：</div>
				                <input class="form-control" id="search_LIKE_title" placeholder="任务标题" >
				            </div>
				        </div>
				        
				        <div class="form-group">
				            <div class="input-group">
				                <div class="input-group-addon">任务描述：</div>
				                <input class="form-control" id="search_LIKE_description" placeholder="任务描述" >
				            </div>
				        </div>
				        
				        <button type="submit" class="btn btn-primary" id="queryBtn">查询</button>
			    	</div>
			    	
			    	<div class="btn-toolbar" role="toolbar" style="padding-left: 4px;padding-top: 4px;">
					  <div class="btn-group">
						  <button type="button" class="btn btn-success" id="addBtn">添加</button>
					  </div>
					  
					  <div class="btn-group">
					  	 <button type="button" class="btn btn-success" id="modBtn">修改</button>
					  </div>
					  
					  <div class="btn-group">
					  	<button type="button" class="btn btn-success" id="delBtn">删除</button>
					  </div>
					  
					  <div class="btn-group">
					  	<button type="button" class="btn btn-success" id="ajaxBtn">ajax异常</button>
					  </div>
					  
					  <div class="btn-group">
					  	<button type="button" class="btn btn-success" id="titleEqualBtn">title equal</button>
					  </div>
					  
					  <div class="btn-group">
					  	<button type="button" class="btn btn-success" id="titleLikeBtn">title like</button>
					  </div>
					  
					  <div class="btn-group">
					  	<button type="button" class="btn btn-success" id="sqlQueryBtn">sql query</button>
					  </div>
					</div>
			  </div>
			
				<!-- 表格 -->
				<table id="bootstrapTable" class="table table-bordered" data-pagination="true" data-toolbar="#custom-toolbar" data-height="400" >
					<thead>
						<tr>
							<th data-field="id">编号</th>
							<th data-field="title">任务标题</th>
							<th data-field="description">任务描述</th>
						</tr>
					</thead>
				</table>
				
			</div>
			
			<div class="row">
				<div class="col-xs-4">
					<div class="panel panel-default">
					  <!-- Default panel contents -->
					  <div class="panel-heading">曲线图</div>
					  <div class="panel-body">
					   	<div id="chart1">
					    	
						</div>
					  </div>
					</div>
				</div>
				
  				<div class="col-xs-4">
					<div class="panel panel-default">
					  <!-- Default panel contents -->
					  <div class="panel-heading">面积图</div>
					  <div class="panel-body">
					    <div  id="chart2">
					    	
						</div>
					  </div>
					</div>
				</div>
				
				<div class="col-xs-4">
					<div class="panel panel-default">
					  <!-- Default panel contents -->
					  <div class="panel-heading">饼图</div>
					  <div class="panel-body">
					    <div  id="chart3">
					    	
						</div>
					  </div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div id="rightMenu" class="gdropdown shadow">
			<ul class = "list">
				<li id = "addOrg"><i class="fa fa-plus-circle "></i>添加部门</li>
				<li id = "editOrg"><i class="fa fa-pencil "></i>修改部门</li>
				<li id = "delOrg"><i class="fa fa-trash-o "></i>删除部门</li>
				<li class="devider"></li>
				<li id = "searchOrg"><i class="fa fa-search"></i>查看区域</li>
			</ul>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/example/userList.js"></script>
</body>
</html>