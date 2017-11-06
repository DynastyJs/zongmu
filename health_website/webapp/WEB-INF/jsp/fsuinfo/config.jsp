
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<%
    String fsuId = request.getParameter("fsuId")==null?"":request.getParameter("fsuId");
	String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
	String name = request.getParameter("name")==null?"":request.getParameter("name");
%>
<script type="text/javascript">
    var fsuId='<%=fsuId%>';
    var treeSelectOrgId = '<%=orgId%>';
    var name = '<%=name%>';
</script>
<style>
	#fsuConfigForm input{
		text-align:center;
		width: 100px;
	}
	
	.infoTitle {
   	 	margin-left: 7px;
   	 	color: #347be3;
    	padding-bottom: 5px;
    	font-size: 14px;
    	border-bottom: 2px solid #6fa2ee;
    	width: 65px;
    	padding-left: 3px;
	}
</style>
<body>
   <div class="opwin nice-validator n-default" id="eqwin" >
		<input id="delIds" type="hidden" name="delIds"/>
		 <div class="infoTitle">参数设置</div>
		   <div class="myBottom"></div>
		    	<center>
		    	</center>
		    	<form id="fsuConfigForm">
		    	<table align="center" style="margin-left:10px;">
					<tbody>
					<tr>
						<td><span>ping包频率(s)：</span></td>
						<td><input name="nFrequ" name="nFrequ" id="nFrequ" type="text" value="2"/>
						</td>
						<td><span>平均往返时间(ms)：</span></td>
						<td><input name="fMaxRoundTripAvg" id="fMaxRoundTripAvg" type="text" value="1"/>
						</td> 
						<td>
						</td> 
					</tr>
					<tr>
						<td><span>丢包率阈值(‰)：</span></td>
						<td><input name="nMaxPacketLoss"id="nMaxPacketLoss" type="text" value="100"/>
						</td> 
						<td><span>ping包时长(s)：</span></td>
						<td><input  name="nTimePeriod"  id="nTimePeriod" type="text" value="10"/>
						</td>
						<td><button id="saveParamBtn" class="btn btn-dodgerblue flat-btn" type="button" data-rightcode="FSU_SAVE_PARAM" style="display:none">保存参数</button>
						</td>
					</tr>
				</tbody>
			</table>
		   		<!-- 表格 -->
		   		<div class="orgmgr-table">
		   			<div class="infoTitle">设备列表</div>
					<div class="orgmgr-tool">
						<span style="padding-left:20px;">未绑定：</span><input id="bindFlag" type="checkbox" checked="checked"></input>						
						<input name="equ_name" id="equ_name" type="text" value="" placeholder="请输入设备名称查询" style="width:200px"/>
						<input id="searchBtn" class="btn btn-dodgerblue flat-btn" type="button" value="查询"/>
						<button id="eq-refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
						<button id="unbindBtn" class="btn btn-dodgerblue flat-btn" type="button" data-rightcode="FSU_UNBIND" style="display:none">解绑</button>
						<button id="bindBtn" class="btn btn-dodgerblue flat-btn" type="button" data-rightcode="FSU_BIND" style="display:none">绑定</button>
						
					</div>
					<table id="bootstrapTable_eq" class="table"
						data-pagination="true" data-click-to-select="true">
						<thead>
							<tr>
								<th data-checkbox="true"></th>
								<th data-field="equipmentId">设备ID</th>
								<th data-field="name">设备名称</th>
								<th data-field="netAddress">IP地址</th>
								<th data-field="netPort">端口</th>
								<th data-field="fsuId">主机ID</th>
								<th data-field="fsuId"  data-formatter="bindStatusFormater">状态</th>
							<!--	<th data-field="link" data-formatter="operateFormater2" data-events="operateEvents2">挂载</th>-->
							</tr>
						</thead>
					</table>
				</div>
			</form>
	</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/fsuinfo/setFsuConfig.js"></script>
</html>
