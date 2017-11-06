<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
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
	<input type="hidden" data-rightcode="RING_DEAL"/>
	<input type="hidden" data-rightcode="RING_FOCUS"/>
	<div class="main-container" id="user-index-layout">
			<div class="search-content">
	    		<div class="form-inline" role="form" style="padding-left: 4px" >
		    		<div class="form-group">
			            <div class="input-group">
			                <div class="input-group-addon">设备名称：</div>
			                <input id="search_equipmentName" type="text"  class="form-control txt">
			            </div>
			        </div>
			        
			        <button id="search" class="btn btn-dodgerblue search-btn" type="button">
				         <i class="glyphicon glyphicon-search"></i> 查询
				    </button>
		    	</div>
		 </div>
		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">动力及环境监测状态列表</span>
				<button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
			</div>
			
			<!-- 表格 -->
			<table id="bootstrapTable" class="table"
				data-pagination="true" data-height="380">
				<thead>
					<tr>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="focusFlag" data-formatter="operateFormater1" data-events="operateEvents">关注</th>
						<th data-field="processResult" data-formatter="operateFormater" data-events="operateEvents">处理</th>
						<th data-field="pathName">组织机构</th>
						<th data-field="equipmentName">设备名称</th>
						<th data-field="equipmentTypeName">设备类型</th>
						<th data-field="propertyName">检测项目</th>
						<th data-field="netAddress">IP地址</th>
						<th data-field="netStatus">网络状态</th>
						<th data-field="lastUpdateTime">最近检测时间</th>
						<th data-field="electricCity" data-formatter="operateFormater2">市电异常</th>
						<th data-field="ups" data-formatter="operateFormater2">UPS异常</th>
						<th data-field="temperature" data-formatter="operateFormater2">温度异常</th>
						<th data-field="humidity" data-formatter="operateFormater2">湿度异常</th>
						<!--<th data-field="alarmCount">未处理报警累计</th>-->
						<th data-field="lastProcessTime">上次处理时间</th>
						<th data-field="processResult">上次处置结果</th>
						<th data-field="processDesc">上次回复内容</th>
						<!--<th data-field="equipmentId">设备ID</th>-->
					</tr>
				</thead>
			</table>	
		</div>
		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">预警信息显示列表</span>
				<button id="refreshBtn_uialarm" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
			</div>
			
			<!-- 表格 -->
			<table id="bootstrapTable_uialarm" class="table"
				data-pagination="true" data-height="380">
				<thead>
					<tr>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="name">设备名称</th>
						<th data-field="beginTimeStr">报警时间</th>
						<th data-field="orginizeName">来源机构</th>
						<th data-field="propertyName">报警源名称</th>
						<th data-field="alarmType">报警类型</th>
						<th data-field="netAddress">IP地址</th>
						<th data-field="alarmDesc">报警详细描述</th>
						<th data-field="alarmLevel">报警级别</th>
						<th data-field="processUser">处置人</th>
						<th data-field="processTimeStr">处置时间</th>
						<th data-field="processResult">处置结果</th>
						<th data-field="processDesc">回复内容</th>
						<th data-field="isMask" data-formatter="maskFormatter">旁路状态</th>
						<th data-field="maskTime">旁路时长</th>
					</tr>
				</thead>
			</table>	
		</div>
	</div>
	<div class="opwin nice-validator n-default" id="ringwin" style="display: none;">
		<input id="alarmId" type="hidden" name="alarmId">
		<input id="equipmentId" type="hidden" name="equipmentId">
		<input id="maskId" type="hidden" name="maskId">
		<input id="propertyName" type="hidden" name="propertyName">
		<input id="orgId" type="hidden" name="orgId">
		<div style="padding:2px 10px;">
			<span id="pathName"></span>
		</div>
		<table style="margin:2px 10px;">
			<tbody>
				<tr>
					<td><span id="equipmentName"></span> </td>
					<td><span id="equipmentTypeName"></span></td>
					<td><span id="netAddress"></span> </td>
					<td><span id="netStatus"></span></td>
				</tr>
			</tbody>
		</table>
		   <div class="thumbnail" style="margin:10px;">
		   		<!-- 表格 -->
		   		<div class="orgmgr-table">
					<div class="orgmgr-tool">
						<span class="tool-title">未处理报警信息</span>
						<button class="btn btn-dodgerblue flat-btn" type="button" onclick="showHistoryLog()" style="width:120px;">历史日志查询</button>
					</div>
					<table id="bootstrapTable_alarm" class="table"
						data-pagination="true" data-height="380">
						<thead>
							<tr>
								<th data-checkbox="true"></th>
								<th data-field="beginTimeStr">报警时间</th>
								<th data-field="alarmType">报警类型</th>
								<th data-field="alarmDesc">报警详细描述</th>
								<th data-field="alarmLevel">报警级别</th>
							</tr>
						</thead>
					</table>	
				</div>
				<div style="padding:2px 10px;">
				 	<span>处理结果：</span>
   					<select id="processResult" name="processResult">
					  <option value ="误报">误报</option>
					  <option value ="确认异常">确认异常</option>
					  <option value ="已处置">已处置</option>
					  <option value ="测试">测试</option>
					  <option value ="设备调整">设备调整</option>
					  <option value ="发送">发送</option>
					</select>
		   		</div>
		   		<div style="padding:2px 10px;">
		   			<textarea rows="5" cols="60" id="processDesc" placeholder="处理信息录入"></textarea>
		   		</div>
		   </div>
		   <div class="thumbnail" id="maskwin" data-rightcode="RING_PANGLU" style="margin:10px;display:none">
				<span>旁路时长(小时)：</span> 
				<input type="text" style="width:80px;" id="maskTime" name="maskTime"/>
				<button id="maskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;" type="button">设置旁路</button>
				<button id="unmaskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;" type="button">取消旁路</button>
		   </div>	
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/ring/index.js"></script>
</body>
</html>