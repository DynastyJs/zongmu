<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<head>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/main.css"/>
	<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
	<%
		String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
		String equId = request.getParameter("equId")==null?"":request.getParameter("equId");
		String type = request.getParameter("type")==null?"":request.getParameter("type");
		
	%>
	<script type="text/javascript">
		var treeSelectOrgId = '<%=orgId%>';
		var equId = '<%=equId%>';
		var type = '<%=type%>';
	</script>
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
	.arrow-up {
	    border-color: transparent transparent #4696f5;
	    width: 0;
	    height: 0;
	    border-width: 7px;
	    display: inline-block;
	    overflow: hidden;
	    border-style: solid;
	}
	.arrow-down {
	    border-color: #4696f5 transparent transparent;
	    width: 0;
	    height: 0;
	    border-width: 7px;
	    display: inline-block;
	    overflow: hidden;
	    border-style: solid;
	}
	.arrow_position {
		position:relative;
		left:40%;
		width:50%;
	}
	</style>
</head>
<body> 
	<!-- 中间布局	-->	
	<div class="main-container" id="user-index-layout">
		<div class="search-content">
			<div id="search_collapse" class="collapse in">
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
								<select class="form-control txt input-border1" id="focusFlag">
									<option value="">--全部--</option>
								 	<option value="0">否</option>
								 	<option value="1">是</option>
								 </select>
							</td> 
							<td class="tb-left">报警级别：</td>
							<td class="tb-right">
								<select class="form-control txt input-border1" id="alarmLevel">
									<option value="">--全部--</option>
								 	<option value="紧急">紧急</option>
								 	<option value="重要">重要</option>
								 	<option value="普通">普通</option>
								 </select>
							</td>
						</tr>
						  <tr>
						  	<td class="tb-left">恢复时间：</td>
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
			<!-- 				<td class="tb-left">处置结果：</td>
							<td class="tb-right">
								<select id="processResultSearch"  class="form-control txt input-border1">
									 <option value ="">--全部--</option>
								  	 <option value ="误报">误报</option>
								  	 <option value ="已处置">已处置</option>
								  	 <option value ="恢复正常">恢复正常</option>
								</select>
							</td>  -->
												<td class="tb-left">事件类型：</td>
							<td class="tb-right">
								<select  class="form-control txt input-border1" id="alarmType"></select>
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
							<td colspan="2">
								<button id="search" class="btn btn-dodgerblue search-btn" type="button" style="margin-left:69px">
							         <i class="glyphicon glyphicon-search"></i> 查询
							    </button>
							</td>
							</tr>
					</tbody>
				</table>
			</div>
			<div>
				<a class="arrow_position" data-toggle="collapse" href="#search_collapse">
          			<span class="arrow-up"></span>
        		</a>
        		<a class="arrow_position fn-hide" data-toggle="collapse" href="#search_collapse">
          			<span class="arrow-down"></span>
        		</a>
			</div>
		</div>

		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">自动恢复报警日志列表</span>
				<button id="exportBtn" class="btn btn-dodgerblue flat-btn" type="button" data-rightcode="ALARM_AUTORECOVERY_EXPORT" style="display:none">导出</button>				
				<button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
				<span style="float:right;font-weight:normal;"><input id="autoFlag" type="checkbox" ></input>自动刷新：<select id="refreshTime"></select></span>	
			</div>
			
			<!-- 表格 -->
			<table id="bootstrapTable" class="table" data-pagination="true">
				<thead>
					<tr>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="focusFlag"  data-formatter="focusFormater">关注</th>
						<th data-field="orginizeName">组织机构</th>
						<th data-field="name">设备名称</th>
						<th data-field="equipmentName">设备类型</th>
						<th data-field="producer">设备品牌</th>
						<th data-field="moduleName">设备型号</th>
						<th data-field="netAddress">IP地址</th>					
						<th data-field="propertyName">检测属性</th>
						<th data-field="alarmLevel">报警级别</th>
						<th data-field="alarmType">事件类型</th>						
						<th data-field="alarmDesc">报警描述</th>		
						<th data-field="propertyValue" data-formatter="propertyValueFormater">检测值</th>											
						<th data-field="beginTimeStr">报警时间</th>	
						<th data-field="endTimeStr">自动恢复时间</th>
						<!--<th data-field="processUser">处置人</th>
						<th data-field="processResult">处置结果</th>
						<!--<th data-field="processDesc">回复内容</th>
						<th data-field="isMask" data-formatter="maskFormatter">旁路状态</th>
						<th data-field="maskTime">旁路时长</th> -->
					</tr>
				</thead>
			</table>	
		</div>
	<!--  	<div class="thumbnail" style="margin:10px;">
			<span class="tool-title">汇总统计</span>
			<div id="pieChart"></div>
		</div>-->
	</div>
	<div class="opwin nice-validator n-default" id="alarmwin" style="display: none;">
		   <input id="dealIds" type="hidden" name="dealIds">		
		   <div class="thumbnail" style="margin:10px;">
		   		<div style="padding:2px 10px;">
   					<select id="processResult" name="processResult">
					  <option value ="误报">误报</option>
					  <option value ="已处置">已处置</option>
					  <option value ="恢复正常">恢复正常</option>
					</select>
					<label>旁路时长：</label> 
					<input type="text" placeholder="0~10000" style="width:80px;"/>
					<select id="isPlatform1" name="isPlatform">
					  <option value ="0">小时</option>
					  <option value ="1">天</option>
					</select>
		   		</div>
		   		<div style="padding:2px 10px;">
		   			<textarea rows="5" cols="60" id="processDesc" placeholder="处理信息录入"></textarea>
		   		</div>
		   </div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/alarmlog/autoRecovery.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/util.js"></script>
</body>
</html>