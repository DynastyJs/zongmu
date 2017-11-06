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
	<input type="hidden" data-rightcode="DIAGNOSIS_DEAL"/>
	<div class="main-container" id="user-index-layout">
		<div class="search-content">
	    		<div class="form-inline" role="form" style="padding-left: 4px" >
		    		<div class="form-group">
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
				<span class="tool-title">视频质量诊断列表</span>
				<button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
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
						<th data-field="chnnName">视频通道名称</th>
						<th data-field="nosignal" data-formatter="statusFormater">无视频</th>
						<th data-field="bright" data-formatter="statusFormater">亮度</th>
						<th data-field="color" data-formatter="statusFormater">偏色</th>
						<th data-field="snow" data-formatter="statusFormater">雪花</th>
						<th data-field="roll" data-formatter="statusFormater">条纹</th>
						<th data-field="freeze" data-formatter="statusFormater">冻结</th>
						<th data-field="shake" data-formatter="statusFormater">抖动</th>
						<th data-field="covered" data-formatter="statusFormater">遮挡</th>
						<th data-field="fuzzy" data-formatter="statusFormater">模糊</th>
						<th data-field="contrast" data-formatter="statusFormater">对比度</th>
						<th data-field="move" data-formatter="statusFormater">移位</th>
                		<th data-field="isMask" data-formatter="maskFormater">旁路状态</th>
                		<th data-field="repairFlag" data-formatter="repairFormater">报修状态</th>
						<th data-field="producer">设备品牌</th>
						<th data-field="moduleName"><div class="datagrid-cell" style="width:150px">设备型号</div></th>
						<th data-field="netAddress">IP地址</th>
						<td style="display: none" data-field="chnnCode"></td>
						<td style="display: none" data-field="dvsCode"></td>
						<td style="display: none" data-field="dvsEquipmentId"></td>
					</tr>
				</thead>
			</table>	
		</div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/diagnosis/index.js"></script>
</body>
</html>