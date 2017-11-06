<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>过程列表详情</title>
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<style>
	.orgmgr-tool{
		font-weight:normal;
	}
</style>
<script type="text/javascript">
	//设备唯一标识详情
	var deviceId=${equipmentId};
</script>
</head>
<body>
	<!-- 过程列表详情 -->
	<div class="content margin-top-small">
		<div class="orgmgr-table">
			<div class="orgmgr-tool" >
				<!-- 第一行查询导出 -->
				<span style="float:left;height:30px;line-height:30px;margin: 5px auto 10px 10px;">设置时间：</span>
				<input type="text" class="form-control"  onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
					    name="settingFireParamBeginDT" style="margin:5px auto 10px 10px;float:left;width:150px"/>
						<span style="float:left;height:30px;line-height:30px;margin:5px auto 10px 10px;float:left">至</span>
				<input type="text" class="form-control"  onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
						name="settingFireParamEndDT" style="margin:5px auto 10px 10px;float:left;width:150px"/>
				
				<button id="fireParamDetailQueryBtn" class="btn btn-dodgerblue flat-btn" type="button" style="margin:5px auto 10px 10px;float:left">查询</button>
				
				<button id="exportFieParamDetail" class="btn btn-dodgerblue flat-btn"  type="button" style="margin:5px auto 10px 10px;float:right;">导出清单</button>
			</div>
			<!-- 表格 -->
			
			<table id="fireParamsDetailTB" class="table"
						data-pagination="false" >
						<thead>
							<tr>
								<th data-field="areaName">组织机构</th>
								<th data-field="equipmentName">电器火灾探测器名称</th>
								<th data-field="fsuName">安防系统监测主机名称</th>
								<th data-field="fsuIp">安防系统监测主机Ip</th>
								<th data-field="signalName">参数名称</th>
								<th data-field="setUpValue" data-formatter="switchSetUpValFormat">数值</th>
								<th data-field="operationTime"  data-formatter="dateFormat">设置时间</th>
								<th data-field="operationStatus">设置结果</th>
								<th data-field="userName">操作人</th>
							</tr>
						</thead>
					</table>	
		</div>
		
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>	
		<!-- 生成url查询参数使用 -->	
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/js/base/util.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/js/fireparam/detail.js"></script>		
		
</body>
</html>