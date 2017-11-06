<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<head>
	<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
	<%
		String typeName=request.getParameter("typeName");   
		String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
	%>
	<script type="text/javascript">
		var typeName='<%=typeName==null?-1:typeName%>';
		var treeSelectOrgId = '<%=orgId%>';
	</script>
</head>
<body> 
	<!-- 中间布局	-->	
	<input type="hidden" data-rightcode="FSU_DEAL"/>
	<input type="hidden" data-rightcode="FSU_BIND"/>
	<input type="hidden" data-rightcode="FSU_UNBIND"/>
	<input type="hidden" data-rightcode="FSU_SETPARAM"/>
	
	<div class="main-container" id="user-index-layout">
		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">安防系统监测主机列表</span>
				<button id="fsu-refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
			</div>
			
			<!-- 表格 -->
			<table id="bootstrapTable" class="table" 
				data-pagination="true" data-height="380" >
				<thead>
					<tr>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="processResult" data-formatter="operateFormater" data-events="operateEvents">处理</th>
						<th data-field="pathName">组织机构</th>
						<th data-field="name">设备名称</th>
						<th data-field="moduleType">设备类型</th>
						<th data-field="netAddress">IP地址</th>
						<th data-field="netPort">端口</th>
						<th data-field="netStatus">网络状态</th>
					</tr>
				</thead>
			</table>	
		</div>
		
	</div>

	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/fsuinfo/index.js"></script>
</body>
</html>