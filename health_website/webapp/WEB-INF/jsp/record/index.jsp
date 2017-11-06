<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<%
	String typeName=request.getParameter("typeName");   
	String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
%>
<script type="text/javascript">
	var typeName='<%=typeName==null?-1:typeName%>';
	var treeSelectOrgId = '<%=orgId%>';
</script>
<body> 
	<!-- 中间布局	-->	
	<input type="hidden" data-rightcode="RECORD_DEAL"/>
	<input type="hidden" data-rightcode="RECORD_FOCUS"/>
	<div class="main-container" id="user-index-layout">
		<div class="search-content">
	    		<div class="form-inline" role="form" style="padding-left: 4px" >
		    		<div class="form-group">
		    		
			            <div class="input-group">
					        
			                <div class="input-group-addon">日期：</div>
			                <div class="input-group-addon">
			                	<button id="preBtn" class="btn btn-dodgerblue flat-btn" type="button" style="height:30px;width:25px;padding:0px;"><</button>
			                </div>		                
			                <input type="text"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{\'2030-10-01\'}'})"
								id="startTime" placeholder="" class="form-control txt Wdate" style="height:30px;border:1px solid #ccc;border-radius:4px;margin-top:2x;">
							 <div class="input-group-addon">
								<button id="nextBtn" class="btn btn-dodgerblue flat-btn" type="button" style="height:30px;width:25px;padding:0px;">></button>
							</div>
			            </div>
			           
			            <div class="input-group">
			                <div class="input-group-addon">通道名称：</div>
			                <input id="search_equipmentName" type="text"  class="form-control txt" style="height:30px;border:1px solid #ccc;border-radius:4px;">
			            </div>
			        </div>
			        
			        <button id="search" class="btn btn-dodgerblue search-btn" type="button">
				         <i class="glyphicon glyphicon-search"></i> 查询
				    </button>
		    	</div>
		 </div>
		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">录像状态列表</span><span style="color:red">(系统默认忽略5秒内的视频丢失)</span>
				<button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
				<span style="float:right;">丢失录像</span><div style="background-color:#E0E0E0;width:20px;height:20px;float:right;margin:10px;"></div>
				<span style="float:right;">报警录像</span><div style="background-color:#ffb137;width:20px;height:20px;float:right;margin:10px;"></div>
				<span style="float:right;">定时录像</span><div style="background-color:#51CA65;width:20px;height:20px;float:right;margin:10px;"></div>		
			</div>
			
			<!-- 表格 -->
			<table id="bootstrapTable" class="table"  data-show-pagination-switch="true"
				data-pagination="true" data-height="380" >
				<thead>
					<tr>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="processResult" data-formatter="operateFormater" data-events="operateEvents">处理</th>
						<th data-field="focusFlag"  data-formatter="focusFormater">关注</th>
						<th data-field="equipmentName">设备名称</th>
						<th data-field="chnnName">通道名称</th>
						<!-- <th data-field="alarmRecord" data-formatter="statusFormater">报警录像</th> -->
						<th data-field="timeRecord" data-formatter="statusFormater">定时录像</th>
						<th data-field="daysAlarm" data-formatter="statusFormater">存储天数</th>
						<th data-field="realSaveDays"  data-formatter="realSaveDaysFormater">实际(计划)天数</th>
                		<th data-field="isMask" data-formatter="maskFormater">旁路状态</th>
                		<th data-field="repairFlag" data-formatter="repairFormater">报修状态</th>
					<!-- 	<th data-field="id" data-formatter="operateFormater3" data-events="operateEvents">历史录像</th> -->
						<th data-field="loseSpan" data-formatter="loseSpanFormater">
							<div class="datagrid-cell"  style="min-width:500px">
								<div style="width:100%;padding-left:0px;padding-right:0px;">
									<img style="top: 0px; width: 100%; height: 17px;  " src="../content/images/timeline.png">
								</div>
							</div>
						</th>
						<th data-field="producer">设备品牌</th>
						<th data-field="moduleName"><div class="datagrid-cell" style="width:150px">设备型号</div></th>
						<th data-field="netAddress">IP地址</th>
					</tr>
				</thead>
			</table>	
		</div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/record/index.js"></script>
</body>
</html>