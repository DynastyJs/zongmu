<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
 <%@ include file="/WEB-INF/jsp/base/header.jsp"%>
 <link href="${pageContext.request.contextPath}/content/css/server.css" rel="stylesheet" />
 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/server/index.js"></script>
 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/md5.js"></script>
</head>
<body> 
	<input id="delIds" type="hidden" value="">
	<!-- 中间布局	-->	
	<div class="main-container" id="user-index-layout">	
		<div class="ui-layout-center" id="centerDiv">
			<div class="panel panel-default" >
			  <!-- 工具栏-->
			  <div id="custom-toolbar" >		    	
			    	<div class="btn-toolbar" role="toolbar" style="padding: 4px;float:right;">
					  <div class="btn-group">
						  <button type="button" class="btn btn-success" id="addBtn">添加</button>
					  </div>
					  
					  <div class="btn-group">
					  	 <button type="button" class="btn btn-success" id="editBtn">修改</button>
					  </div>
					  
					  <div class="btn-group">
					  	<button type="button" class="btn btn-success" id="delBtn">删除</button>
					  </div>
					</div>
			  </div>
			
				<!-- 表格 -->
				<table id="bootstrapTable" class="table table-bordered" data-pagination="true"  data-height="400" data-click-to-select="true">
					<thead>
						<tr>
							<th  data-checkbox="true"></th>
							<th data-field="id" data-formatter="numberFormatter">序号</th>
							<th data-field="serverType" data-formatter="serverTypeFormatter">服务类型</th>
							<th data-field="serverName">服务名称</th>
							<th data-field="serverVersion">版本号</th>
							<th data-field="ip">IP</th>
							<th data-field="port">端口</th>
						</tr>
					</thead>
				</table>
				
			</div>
			</div>
		</div>
	<div class="opwin nice-validator n-default" id="serverwin" style="display: none;" >
		<input id="serverId" type="hidden" name="serverId">
		<table>
			<tbody>
				<tr>
					<td class="left">
						<label class="glabel">服务类型：</label>
						<span class="tip">*</span>
					</td>
					<td class="right">
						<select id="serverType" name="serverType">
						  <option value ="1">CMS</option>
						  <option value ="2">VSS</option>
						</select>
					</td>
				</tr>
				<tr>
					<td class="left">
						<label class="glabel">服务名称：</label>
						<span class="tip">*</span>
					</td>
					<td class="right">
						<input id="serverName" type="text" name="serverName">
					</td>
				</tr>
				<tr>
					<td class="left">
						<label class="glabel">域名解析：</label>
						<span class="tip">*</span>
					</td>
					<td class="right">
						<select id="isDNS" name="isDNS">
						  <option value ="0">否</option>
						  <option value ="1">是</option>
						</select>
					</td>
				</tr>
				<tr>
					<td class="left">
						<label class="glabel">服务IP：</label>
					</td>
					<td class="right">
						<input id="ip" type="text" name="ip">
					</td>
				</tr>
				<tr>
					<td class="left">
						<label class="glabel">服务端口：</label>
					</td>
					<td class="right">
						<input id="port" type="text" name="port">
					</td>
				</tr>
				<tr>
					<td class="left">
						<label class="glabel">登录名称：</label>
					</td>
					<td class="right">
						<input id="loginName" name="loginName" type="text">
					</td>
				</tr>
				<tr>
					<td class="left">
						<label class="glabel">登录密码：</label>
					</td>
					<td class="right">
						<input id="loginPwd" name="loginPwd" type="password">
					</td>
				</tr>
				<tr>
					<td class="left">
						<label class="glabel">版本号：</label>
					</td>
					<td class="right">
						<input id="serverVersion" name="serverVersion" type="text">
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</body>
</html>