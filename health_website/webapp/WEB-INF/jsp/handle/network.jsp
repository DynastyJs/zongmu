<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<%
    String selectedEquipmentId =request.getParameter("equipmentId");
%>
<script type="text/javascript">
    var selectedEquipmentId='<%=selectedEquipmentId%>';
</script>
<style>
	.mytitle {
    width: 95px;
    font-size:14px;
    border-bottom: 2px solid #6fa2ee;
    margin: 10px 29px 0;
    /* border-bottom: 1px solid #eee; */
    color: #347be3;
}
</style>
    <body>
        <div class="opwin nice-validator n-default" id="networkwin">
        <input id="alarmId" type="hidden" name="alarmId">
        <input id="equipmentId" type="hidden" name="equipmentId">
        <input id="propertyName" type="hidden" name="propertyName" value="网络状态">
        <input id="maskId" type="hidden" name="maskId">
        <input id="orgId" type="hidden" name="orgId">
        <!-- <div style="padding:2px 10px;">
            <span>设备名称：</span><span id="pathName"></span>
        </div> -->
       <div class="mytitle" style="width:58px;">基本信息</div>
        <table style="border-top: 1px solid #eee;margin: 0px 34px;width: 840px;">
            <tbody>
            <tr>
             	<td><span id="equipmentName"></span> </td> 
               	<td><span>设备名称：</span><span id="pathName"></span></td>
                <td><span>设备类型：</span><span id="equipmentTypeName"></span></td>
                <td><span>IP地址：</span><span id="netAddress"></span> </td>
                <td><span>网络状态：</span><span id="netStatus"></span></td>
            </tr>
            </tbody>
        </table>
       <div class="mytitle">PING参数设置</div>
        <table style="margin: 0px 35px;border-top: 1px solid #eee;">
            <tbody>
            <!-- <tr>
                <td><span>参数：-t不自动停止</span></td>
                <td><input type="checkbox"/></td>
            </tr> -->
            <tr>
                <td><span>参数：-n发出测试包个数  </span></td>
                <td><input id ="packageNum" type="text" placeholder = "1-100" value="4" style="text-align: center;width:60px;"/></td>
            </tr>
            <tr>
                <td><span>参数：-l发送缓冲区大小</span> </td>
                <td><input id="lsize" type="text" placeholder="0~65500" value="32" style="text-align: center;width:60px;"/></td>
                <td><div></div></td>
                <td><div style="text-align:left;padding-right:20px;"><button id="testBtn" class="btn btn-dodgerblue flat-btn">检测</button></div>	</td>
            </tr>
            </tbody>
        </table>



        <div style="padding:2px 35px;">

            <textarea rows="7" cols="80" id="pingResult" readonly="readonly" style="background-color:#000;color:#fff;font:bold;"></textarea>



        </div>
        <div class="thumbnail" style="margin:10px;">
            <!-- 表格 -->
            <%--<div class="orgmgr-table">--%>
            <%--<div class="orgmgr-tool">--%>
            <%--<span class="tool-title">未处理报警信息</span>--%>
            <%--<button class="btn btn-dodgerblue flat-btn" type="button" onclick="showHistoryLog()" style="width:120px;">历史日志查询</button>--%>
            <%--</div>--%>
            <%--<table id="bootstrapTable_alarm" class="table"--%>
            <%--data-pagination="true" data-height="380">--%>
            <%--<thead>--%>
            <%--<tr>--%>
            <%--<th data-checkbox="true"></th>--%>
            <%--<th data-formatter="numberFormatter">序号</th>--%>
            <%--<th data-field="beginTimeStr">报警时间</th>--%>
            <%--<th data-field="alarmType">报警类型</th>--%>
            <%--<th data-field="alarmDesc">报警详细描述</th>--%>
            <%--<th data-field="alarmLevel">报警级别</th>--%>
            <%--</tr>--%>
            <%--</thead>--%>
            <%--</table>--%>
            <%--</div>--%>
            <div style="padding:2px 20px;">
                <span>处理结果：</span>
                <select id="processResult" name="processResult">
                </select>
                <button id="confirmBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;margin-top: -3px;float:right;" type="button">处理报警</button>
            </div>
            <div style="padding:2px 20px;">
                <textarea rows="5" cols="60" id="processDesc" name="processDesc" placeholder="处理信息录入"></textarea>
            </div>
        </div>
	    <div id="maskwin"  class="thumbnail"  style="padding-left: 35px;border: 0;border-bottom: 1px solid #dedede;">
			<table>
				<tr>
					<td>
						<div id="left_side" data-rightcode="NETWORK_FOCUS"
							style="display: none;">
							<label>关注：<input id="focusFlag" type="checkbox"></<label>
						</div>
					</td>
					<td>
						<div id="content" data-rightcode="NETWORK_REPAIR"
							style="display: none;">
							<label>已报修：<input id="repairFlag" type="checkbox"></label>
						</div>
					</td>
					<td>
						<div id="right_side" data-rightcode="NETWORK_PANGLU"
							style="display: none; bottom: 3px;">
							<label>旁路时长(小时)：<input type="text"
								style="width: 120px;" id="maskTime" name="maskTime" /></label>
							<button id="maskBtn" class="btn btn-dodgerblue flat-btn"
								style="width: 80px; margin-top: -5px;" type="button">设置旁路</button>
							<button id="unmaskBtn" class="btn btn-dodgerblue flat-btn"
								style="width: 80px; margin-top: -5px;" type="button">取消旁路</button>
						</div>
					</td>
				</tr>
			</table>
		</div>
    </div>

        <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/handle/networkHandle.js"></script>
    </body>
</html>