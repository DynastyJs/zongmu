
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<%
    String deviceEquipmentId =request.getParameter("equipmentId");
    String devicePropertyName =request.getParameter("propertyName");
%>
<script type="text/javascript">
    var propertyName='<%=devicePropertyName%>';
    var equipmentId='<%=deviceEquipmentId%>';
</script>
<style>
.mytitle {
    width: 63px;
    font-size:14px;
    border-bottom: 2px solid #6fa2ee;
    margin: 10px 29px 0;
    /* border-bottom: 1px solid #eee; */
    color: #347be3;
}
table#equiParam,table#equinfo {
    border-top: 1px solid #eee;
    margin: 0px 5%;
    width: 90%;
}
</style>
<body>
    <div class="opwin nice-validator n-default" id="devicewin">
    <input id="alarmId" type="hidden" name="alarmId">
    <input id="equipmentId" type="hidden" name="equipmentId">
    <input id="maskId" type="hidden" name="maskId">
    <input id="orgId" type="hidden" name="orgId">
    <div style="padding:2px 10px;">
        <span id="pathName"></span>
    </div>
    <div class="mytitle">基本信息</div>
    <table id="equinfo">
    </table>
    <div class="mytitle">设备参数</div>
    <table id="equiParam">
    </table> 
    <div class="thumbnail" style="margin:10px;">
        <!-- 表格 -->
        <div style="padding:2px 10px;">
            <span>处理结果：</span>
            <select id="processResult" name="processResult">
            </select>
            <button id="confirmBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;float:right" type="button">处理报警</button>
        </div>


        <div style="padding:2px 10px;">
            <textarea rows="5" cols="60" id="processDesc" name="processDesc" placeholder="处理信息录入"></textarea>
        </div>
    </div>
    <div id="maskwin"  class="thumbnail"  style="padding-left: 23px;font-size: 14px;border: 0;border-bottom: 1px solid #dedede;">
        <table>
			<tr>
				<td>
			       <div id="left_side" data-rightcode="SYSDEV_FOCUS" style="display:none;">
			       		<span >关注：</span><input id="focusFlag" type="checkbox">
			       </div> 
				</td>
				<td>
			       <div id="content" data-rightcode="SYSDEV_REPAIR" style="display:none;">
			       		<span style="padding-left:20px;">已报修：</span><input id="repairFlag" type="checkbox"></input>
			       	</div>
				</td>
				<td>
			       <div id="right_side"  data-rightcode="SYSDEV_PANGLU" style="display:none;bottom: 3px;">
						<span style="padding-left:20px;">旁路时长(小时)：</span>
			        	<input type="text" style="width:80px;" id="maskTime" name="maskTime"/>
			        	<button id="maskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;"  type="button">设置旁路</button>
			        	<button id="unmaskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;" type="button">取消旁路</button>
			        </div>
				</td>
			</tr>
		</table>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/handle/sysdevHandle.js"></script>
</html>
