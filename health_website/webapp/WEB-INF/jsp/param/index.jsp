<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
 <%@ include file="/WEB-INF/jsp/base/header.jsp"%>
 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/param/index.js"></script>
</head>
<body class="main-container"> 
	<input id="delIds" type="hidden" value="">
	<!-- 中间布局	-->	
	<div class="main-container" id="user-index-layout">	
		<div class="ui-layout-center" id="centerDiv">
			<div class="panel panel-default" style="border:0px; margin:0px 10px;">
			  		<!-- 工具栏-->
			<div class="search-content">
				<table class="search-table">		
					<tbody>
					  <tr>
						<td class="tb-left">设备属性：</td>
						<td class="tb-right">
							<select id="condition" class="form-control txt"></select>
						</td>
						<td class="tb-left">报警结果：</td>
						<td class="tb-right">
							<select id="alarmResult" class="form-control txt"></select>
						</td>
						<td class="tb-left"></td>
						<td class="tb-right">
				        <button id="search" class="btn btn-dodgerblue search-btn" type="button">
					         <i class="glyphicon glyphicon-search"></i> 查询
					    </button>
						</td>
					</tr>
				</tbody>
				</table>
			</div>
			  <!-- 工具栏-->
			  <div id="custom-toolbar" >		
			  		<span class="tool-title">服务器参数列表</span>    	
			    	<div class="btn-toolbar" role="toolbar" style="padding: 4px;float:right;">
					  <div class="btn-group">
						  <button type="button" class="btn btn-dodgerblue flat-btn" id="addBtn">添加</button>
					  </div>
					  
					  <div class="btn-group">
					  	 <button type="button" class="btn btn-dodgerblue flat-btn" id="editBtn">修改</button>
					  </div>
					  
					  <div class="btn-group">
					  	<button type="button" class="btn btn-dodgerblue flat-btn" id="delBtn">删除</button>
					  </div>
					</div>
			  </div>
			
				<!-- 表格 -->
				<table id="bootstrapTable" class="table" data-pagination="true" data-height="380" data-click-to-select="true">
					<thead>
						<tr>
							<th  data-checkbox="true"></th>
							<th data-field="id" data-formatter="numberFormatter">序号</th>
							<th data-field="equipmentTypeId" data-formatter="typeFormatter">设备类型</th>
						<!--  	<th data-field="producer">设备品牌</th>
							<th data-field="moduleName">设备型号</th>-->
							<th data-field="propertyName">设备属性</th>
							<th data-field="expression">报警表达式</th>
							<th data-field="alarmResult">报警结果</th>
							<th data-field="alarmLevel">报警级别</th>
							<th data-field="alarmDesc">报警详细描述</th>
						</tr>
					</thead>
				</table>
				
			</div>
			</div>
		</div>
	<div class="opwin nice-validator n-default" id="alarmconwin" style="display: none;" >
		<input id="conditionId" type="hidden" name="conditionId">
		<table>
			<tbody>
				<tr>
					<td class="tb-left">
						<label class="glabel">设备类型：</label>
					</td>
					<td class="tb-right">
						<select id="equipmentTypeId" name="equipmentTypeId">
						  <option value ="-1">全部</option>
						</select>
					</td>
					<td class="tb-left">
						<label class="glabel">设备品牌：</label>
					</td>
					<td class="tb-right">
						<select id="producer" name="producer">
						  <option value ="-1">全部</option>
						</select>
					</td>
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">设备型号：</label>
					</td>
					<td class="tb-right">
						<select id="moduleName" name="moduleName">
						  <option value ="-1">全部</option>
						</select>
					</td>
					<td class="tb-left">
					</td>
					<td class="tb-right">
					</td>
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">设备属性：</label>
						<span class="tip">*</span>
					</td>
					<td class="tb-right">
						<select id="propertyName" name="propertyName">		  						 
						</select>
					</td>
					<td class="tb-left">
						<label class="glabel">报警级别：</label>
						<span class="tip">*</span>
					</td>
					<td class="tb-right">
						<select id="alarmLevel" name="alarmLevel">
						  <option value ="一般">一般</option>
						  <option value ="重要">重要</option>
						  <option value ="紧急">紧急</option>						  						 
						</select>
					</td>
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">报警表达式：</label>
						<span class="tip">*</span>
					</td>
					<td class="tb-right" colspan="3">
						<textarea rows="5" cols="60" id="expression"></textarea>
					</td>					
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">报警结果：</label>
					</td>
					<td class="tb-right" colspan="3">
						<select id="alarmResult"></select>
					</td>					
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">报警详细描述：</label>
					</td>
					<td class="tb-right" colspan="3">
						<textarea rows="3" cols="60" id="alarmDesc"></textarea>
					</td>					
				</tr>
			</tbody>
		</table>
	</div>
</body>
</html>