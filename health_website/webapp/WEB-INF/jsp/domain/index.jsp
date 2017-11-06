<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible"
	content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<link href="${pageContext.request.contextPath}/content/css/server.css" rel="stylesheet" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/content/js/domain/index.js"></script>
</head>
<body class="main-container">
	<input id="delIds" type="hidden" value="">
		<div class="orgmgr-container" id="user-index-layout">
			<div class="tree-container">
				<div class="tree-title">组织结构</div>
				<div id="orgtree" class="tree-content ztree"
					style="-moz-user-select: none;"></div>
			</div>
			<!-- 中间布局	-->
			<div class="orgmgr-content" id="centerDiv">
				<div class="search-content">
					<input id="condition" class="form-control input-search" type="text"
						placeholder="请输入组织名称" size="100"> <input id="search"
						class="btn btn-dodgerblue search" type="button" value="查询">
				</div>
				<div class="orgmgr-table">
					<div class="orgmgr-tool">
						<span class="tool-title">组织列表</span>
						<button id="delBtn" class="btn btn-default" type="button">删除</button>
						<button id="editBtn" class="btn btn-default" type="button">修改</button>
						<button id="addBtn" class="btn btn-default" type="button">新增</button>
					</div>

					<!-- 表格 -->
					<table id="bootstrapTable" class="table table-bordered"
						data-pagination="true" data-height="380"
						data-click-to-select="true">
						<thead>
							<tr>
								<th data-checkbox="true"></th>
								<th data-field="id" data-formatter="numberFormatter">序号</th>
								<th data-field="name">组织名称</th>
								<th data-field="parentName" data-formatter="nameFormatter">上级组织</th>
								<th data-field="isPlatform" data-formatter="isPlatformFormatter">平台分组</th>
							</tr>
						</thead>
					</table>

				</div>
			</div>
		</div>
	<div class="opwin nice-validator n-default" id="platformwin"
		style="display: none;">
		<input id="id" type="hidden" name="id">
		<input id="parentId" type="hidden" name="parentId" value="0">
			<table>
				<tbody>
					<tr>
						<td class="left"><label class="glabel">组织名称：</label> <span
							class="tip">*</span></td>
						<td class="right"><input id="name" type="text" name="name"></td>
					</tr>
					<tr>
						<td class="left"><label class="glabel">上级组织：</label> </td>
						<td class="right"><input id="parentName" type="text" name="parentName" disabled="disabled"></td>
					</tr>
					<tr>
						<td class="left">
							<label class="glabel">平台分组：</label>
							<span class="tip">*</span>
						</td>
						<td class="right">
							<select id="isPlatform" name="isPlatform">
							  <option value ="0">否</option>
							  <option value ="1">是</option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
	</div>
</body>
</html>