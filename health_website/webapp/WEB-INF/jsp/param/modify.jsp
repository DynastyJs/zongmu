<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
 <%@ include file="/WEB-INF/jsp/base/header.jsp"%>
 <%
    String paramId =request.getParameter("paramId")==null?"":request.getParameter("paramId");
 %>
 <script type="text/javascript">
    var paramId='<%=paramId%>';
 </script>
</head>
<body class="main-container"> 
	<div class="opwin nice-validator n-default" id="alarmconwin" style="padding-left:20px;">
		<input id="conditionId" type="hidden" name="conditionId">
		<table>
			<tbody>
				<tr>
					<td class="tb-left">
						<label class="glabel">设备类型：</label>
					</td>
					<td class="tb-right">
						<select id="equipmentTypeId" name="equipmentTypeId">
						  <option value ="-1">全部</option>
						</select>
					</td>
				<!-- 	<td class="tb-left">
						<label class="glabel">设备品牌：</label>
					</td>
					<td class="tb-right">
						<select id="producer" name="producer">
						  <option value ="-1">全部</option>
						</select>
					</td>
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">设备型号：</label>
					</td>
					<td class="tb-right">
						<select id="moduleName" name="moduleName">
						  <option value ="-1">全部</option>
						</select>
					</td>
					<td class="tb-left">
					</td>
					<td class="tb-right">
					</td> -->
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">设备属性：</label>
						<span class="tip">*</span>
					</td>
					<td class="tb-right">
						<select id="propertyName" name="propertyName">			  						 
						</select>
					</td>
					<td class="tb-left">
						<label class="glabel">报警级别：</label>
						<span class="tip">*</span>
					</td>
					<td class="tb-right">
						<select id="alarmLevel" name="alarmLevel">
						  <option value ="紧急">紧急</option>
						  <option value ="重要">重要</option>
						  <option value ="普通">普通</option>						  						 
						</select>
					</td>
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">报警表达式：</label>
					</td>
					<td class="tb-right" colspan="3">
						<textarea rows="5" cols="60" id="expression" name="expression"></textarea>
					</td>					
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">报警结果：</label>
						<span class="tip">*</span>
					</td>
					<td class="tb-right" colspan="3">
						<select id="alarmResult" name="alarmResult"></select>
					</td>					
				</tr>
				<tr>
					<td class="tb-left">
						<label class="glabel">详细描述：</label>
						<span class="tip">*</span>
					</td>
					<td class="tb-right" colspan="3">
						<textarea rows="3" cols="60" id="alarmDesc" name="alarmDesc"></textarea>
					</td>					
				</tr>
			</tbody>
		</table>
	</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/param/modify.js"></script>
</html>