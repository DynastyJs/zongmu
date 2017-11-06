<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<%
	String typeName=request.getParameter("typeName");   
	String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
%>
<script type="text/javascript">
jQuery.support.cors=true;
	var typeName='<%=typeName==null?-1:typeName%>';
	var treeSelectOrgId = '<%=orgId%>';
</script>
<body> 
	<!-- 中间布局	-->	
	<input type="hidden" data-rightcode="NETWORK_DEAL"/>
	<input type="hidden" data-rightcode="NETWORK_FOCUS"/>
	<div class="main-container" id="user-index-layout">
		<div class="west-container">
			<div class="tree-title">我的日历</div>
			<div id="myCalendar"></div>
		</div>
		
	<div class="center-container" id="user-index-layout">
		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">录像状态列表</span>
				<button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
			</div>
			
			<!-- 表格 -->
			<table id="bootstrapTable" class="table"  data-show-pagination-switch="true"
				data-pagination="true">
				<thead>
					<tr>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="">日期</th>
						<th data-field="">是否完整</th>
						<th data-formatter="operateFormater2">
							<div class="datagrid-cell" style="width:500px">
								<div style="width:100%;padding-left:0px;padding-right:0px;">
									<img style="top: 0px; width: 100%; height: 17px;  " src="../content/images/timeline.png">
								</div>
							</div>
						</th>
					</tr>
				</thead>
			</table>	
		</div>
		</div>
	</div>
	<div class="opwin nice-validator n-default" id="networkwin" style="display: none;">
		<input id="alarmId" type="hidden" name="alarmId">
		<input id="equipmentId" type="hidden" name="equipmentId">
		<input id="propertyName" type="hidden" name="propertyName" value="网络状态">		
		<input id="maskId" type="hidden" name="maskId">
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
	       <div class="myTitle">ping参数设置</div>
		   <div class="myBottom"></div>
		    	<table style="margin:2px 10px;">
					<tbody>
					<!-- <tr>
						<td><span>参数：-t不自动停止</span></td>
						<td><input type="checkbox"/></td>
					</tr> -->
					<tr>
						<td><span>参数：-l发送缓冲区大小</span> </td>
						<td><input id="lsize" type="text" placeholder="0~65500" value="32"/></td>
						<td><div></div></td>
						<td><div style="text-align:right;padding-right:20px;"><button id="testBtn" class="btn btn-dodgerblue flat-btn">检测</button></div>	</td>
					</tr>
				</tbody>
			</table>
		   <div style="padding:2px 10px;">
		   		   	
		   		<textarea rows="7" cols="80" id="pingResult" readonly="readonly" style="background-color:#000;color:#fff;font:bold;"></textarea>
		   </div>
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
								<th data-formatter="numberFormatter">序号</th>
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
		   <div id="maskwin" class="thumbnail" data-rightcode="NETWORK_PANGLU" style="margin:10px;display:none;">
				<span>旁路时长(小时)：</span> 
				<input type="text" style="width:80px;" id="maskTime" name="maskTime"/>
				<button id="maskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;"  type="button">设置旁路</button>
				<button id="unmaskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;" type="button">取消旁路</button>
		   </div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/record/history.js"></script>
</body>
</html>