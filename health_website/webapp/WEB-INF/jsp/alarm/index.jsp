<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<head>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/main.css"/>
	<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
	<%
		String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
	%>
	<script type="text/javascript">
		var treeSelectOrgId = '<%=orgId%>';
	</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
	<style type="text/css">
	.selObject{
		float:left;
		margin-left:5px;
		text-decoration:none;
	}
	.option{
		width:100px;
		height:33px;
		float:left;
		margin-top:4px;
		margin:5px 5px;
		cursor:pointer;
	}
	.selected{
		color:#fff;
		border-color:#4ba8e6 !important;
		background-color : rgb(75, 168, 230) !important;
	}
	
	</style>
</head>
<body> 
	<!-- 中间布局	-->	
	<div class="main-container" id="user-index-layout">
		<div class="search-content" style="height:110px">
			<table class="search-table">		
				<tbody>
				 <tr>
					<td class="tb-left">报警时间：</td>
					<td class="tb-right">
						<input type="text"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'endTime\')||\'2030-10-01\'}'})"
								id="startTime" placeholder="" class="form-control">
					</td>
					<td class="tb-left">至：</td>
					<td class="tb-right">
						<input type="text"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'startTime\')||\'2030-10-01\'}'})"
								id="endTime" placeholder=""  class="form-control">
					</td>
					<td class="tb-left">是否关注：</td>
					<td class="tb-right">
						<select class="form-control txt input-border1" id="isFocus">
							<option value="-1">--全部--</option>
						 	<option value="0">否</option>
						 	<option value="1">是</option>
						 </select>
					</td> 
					<td class="tb-left">报警源名称：</td>
					<td class="tb-right">
						 <input id="propertyName" type="text"  class="form-control"></input>
					</td>
				</tr>
				  <tr>
				  	<td class="tb-left">处置时间：</td>
					<td class="tb-right">
						<input type="text"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'pendTime\')||\'2030-10-01\'}'})"
								id="pstartTime" placeholder="" class="form-control">
					</td>
					<td class="tb-left">至：</td>
					<td class="tb-right">
						<input type="text"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'pstartTime\')||\'2030-10-01\'}'})"
								id="pendTime" placeholder=""  class="form-control">
					</td>
					<td class="tb-left">处置结果：</td>
					<td class="tb-right">
						<select id="processResultSearch"  class="form-control txt input-border1">
						 <option value ="">--全部--</option>
						  <option value ="误报">误报</option>
						  <option value ="确认异常">确认异常</option>
						  <option value ="已处置">已处置</option>
						  <option value ="测试">测试</option>
						  <option value ="设备调整">设备调整</option>
						  <option value ="发送">发送</option>
						</select>
					</td> 
				   	<td class="tb-left">是否旁路：</td>
					<td class="tb-right">
						 <select class="form-control txt input-border1" id="isMask">
						 	<option value="">--全部--</option>
						 	<option value="0">否</option>
						 	<option value="1">是</option>
						 </select>
					</td>

				</tr>
				<tr>
					<td class="tb-left">设备名称：</td>
					<td class="tb-right">
						 <input id="name" type="text"  class="form-control"></input>
					</td>
					<td class="tb-left">设备类型：</td>
					<td class="tb-right">
						 <select  class="form-control txt input-border1" id="equType"></select>
					</td>
					
					<td class="tb-left">报警类型：</td>
					<td class="tb-right">
						<input id="alarmType" type="text"  class="form-control"></input>
					</td>	
					<!-- <td class="tb-left"></td> -->
					<td class="tb-right">
					<button id="search" class="btn btn-dodgerblue search-btn" type="button">
				         <i class="glyphicon glyphicon-search"></i> 查询
				    </button>
					</td></tr>
			</tbody>
			</table>
		</div>

		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">未结束报警事件列表</span>
				<button id="dealBtn" class="btn btn-dodgerblue flat-btn" data-rightcode="ALARM_DEAL" style="display:none;margin: 4px" type="button">处理</button>
				<button id="refreshBtn" class="btn btn-dodgerblue flat-btn" style="margin: 4px" type="button">刷新</button>
			</div>
			
			<!-- 表格 -->
			<table id="bootstrapTable" class="table" data-pagination="true" >
				<thead>
					<tr>
						<th data-checkbox="true"></th>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="name">设备名称</th>
						<th data-field="equipmentName">设备类型</th>
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
	<div class="opwin nice-validator n-default" id="alarmwin" style="display: none;">
		   <input id="dealIds" type="hidden" name="dealIds">		
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
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/alarm/index.js"></script>
</body>
</html>