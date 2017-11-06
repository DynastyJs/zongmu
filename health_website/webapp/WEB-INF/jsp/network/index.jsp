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
	<input type="hidden" data-rightcode="NETWORK_DEAL"/>
	<input type="hidden" data-rightcode="NETWORK_FOCUS"/>
	<div class="main-container" id="user-index-layout">
		<div class="search-content">
	    		<div class="form-inline" role="form" style="padding-left: 4px" >
		    		<div class="form-group">
			            <div class="input-group">
			                <div class="input-group-addon">设备类型：</div>
			                <select class="form-control txt input-border1" id="equType" style="height:30px;border:1px solid #ccc;border-radius:4px;"></select>
			            </div>
			            <div class="input-group">
			                <div class="input-group-addon">设备名称：</div>
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
				<span class="tool-title">网络状态列表</span>
				<button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
				<span style="float:right;font-weight:normal;"><input id="autoFlag" type="checkbox" ></input>自动刷新：<select id="refreshTime"></select></span>
			</div>
			<table id="bootstrapTable" class="table"  data-show-pagination-switch="true"
				   data-pagination="true"  >
				<thead>
				<tr>
					<th data-field="id" data-formatter="numberFormatter">序号</th>
					<th data-field="processResult" data-formatter="operateFormater" data-events="operateEvents">处理</th>
					<th data-field="netStatus" data-formatter="statusFormater">状态</th>
					<th data-field="focusFlag"  data-formatter="focusFormater">关注</th>
					<!--	<th data-field="isMask" data-formatter="maskFormater">状态</th>-->
					<th data-field="isMask" data-formatter="maskFormatter">旁路状态</th>
					<th data-field="repairFlag" data-formatter="repairFlagFormatter" >报修状态</th>
					<th data-field="lastUpdateTime" data-formatter="alarmCountFormater">报警时间(累计次数)</th>
					<th data-field="equipmentName"><div class="datagrid-cell" style="width:200px">设备名称</div></th>
					<th data-field="netAddress">IP地址</th>
					<th data-field="equipmentTypeName"><div class="datagrid-cell" style="width:120px">设备类型</div></th>
					<th data-field="producer">设备品牌</th>
					<th data-field="moduleName"><div class="datagrid-cell" style="width:150px">设备型号</div></th>
					
					<%--<th data-field="pathName">组织机构</th>--%>
					<!--<th data-field="alarmCount">未处理报警累计</th> -->
					<%--<th data-field="lastProcessTime">上次处理时间</th>--%>
					<%--<th data-field="processResult">上次处置结果</th>--%>
					<%--<th data-field="processDesc">上次回复内容</th>--%>
					<!--<th data-field="equipmentId">设备ID</th>-->
				</tr>
				</thead>
			</table>
		</div>

		<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/network/index.js"></script>
	</div>
</body>
</html>