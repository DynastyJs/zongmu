<%--
  Created by IntelliJ IDEA.
  User: whoszus
  Date: 2016/7/26
  Time: 15:52
--%>
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
    var equipmentId=parseInt('<%=deviceEquipmentId%>');
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
p{ 
		font-size: 12px;
	    margin: 0;
	    margin-bottom: 10px;
	    text-align: left;
    }
    .hardwareInfo{
	 	text-align: left;
   	 	line-height: 23px;
    	display: inline-block;
    	width: 50%;
    	height: 23px;
	}
	span.leftAlign {
    	/* padding-left: 19px; */
    	color: #666;
    	width: 130px;
    	display: inline-block;
	}
	span.rightAlign {
    	color: #333;
    	width: 100px;
    	display: inline-block;
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
    <div style="padding:20px" id="equInfo">
		<!-- 基本信息 -->
		<div class="mytitle" style="width:70px">基本信息</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 30px;">
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">设备名称：</span><span style="color:#333;" id="equimentName"></span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">设备品牌：</span><span style="color:#333;" id="producer"></span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">网络地址：</span><span style="color:#333;" id="netAddress"></span></div>
		</div>
		<!-- 检测信息 -->
		<div class="mytitle" style="width:70px">检测信息</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 120px;">
			<div style="float:left;height: 20px;width:10%;"></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器线路状态"></span><span name="漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="漏电短路检测器告警状态" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;"  name="漏电短路检测器测量值" data-formatter="format.sensorValue"></span><span style="color:#333;"  name="漏电短路检测器通道类别" data-formatter="format.sensorTypeForValue">℃</span></div>
			<div style="float:left;height: 20px;width:30%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;" name="漏电短路检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">(</span><span style="color:green;" name="漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;" name="漏电短路检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:10%;"><span style="color:#666;">A相</span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器线路状态"></span><span name="A相线路温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="A相线路温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="A相线路温度检测器告警状态" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="A相线路温度检测器测量值" data-formatter="format.sensorValue"></span><span style="color:#333;" name="A相线路温度检测器通道类别" data-formatter="format.sensorTypeForValue">℃</span></div>
			<div style="float:left;height: 20px;width:30%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="A相线路温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;" name="A相线路温度检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">(</span><span style="color:green;" name="A相线路检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;" name="A相线路温度检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:10%;"><span style="color:#666;">B相</span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器线路状态"></span><span name="B相线路温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="B相线路温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="B相线路温度检测器告警状态" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="B相线路温度检测器测量值" data-formatter="format.sensorValue"></span><span style="color:#333;" name="B相线路温度检测器通道类别" data-formatter="format.sensorTypeForValue">℃</span></div>
			<div style="float:left;height: 20px;width:30%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="B相线路温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;" name="B相线路温度检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">(</span><span style="color:green;" name="B相线路检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;" name="B相线路温度检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:10%;"><span style="color:#666;">C相</span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器线路状态"></span><span name="C相线路温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="C相线路温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="C相线路温度检测器告警状态" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="C相线路温度检测器测量值" data-formatter="format.sensorValue"></span><span style="color:#333;" name="C相线路温度检测器通道类别" data-formatter="format.sensorTypeForValue">℃</span></div>
			<div style="float:left;height: 20px;width:30%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="C相线路温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;" name="C相线路温度检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">(</span><span style="color:green;" name="C相线路检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;" name="C相线路温度检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:10%;"><span style="color:#666;">零线</span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器线路状态"></span><span name="零线线路温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="零线线路温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="零线线路温度检测器告警状态" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="零线线路温度检测器测量值" data-formatter="format.sensorValue"></span><span style="color:#333;" name="零线线路温度检测器通道类别" data-formatter="format.sensorTypeForValue">℃</span></div>
			<div style="float:left;height: 20px;width:30%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="零线线路温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;" name="零线线路温度检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">(</span><span style="color:green;" name="零线线路检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;" name="零线线路温度检测器通道类别" data-formatter="format.sensorTypeForAlarmValue">℃</span><span style="color:green">)</span></div>
		</div>
		<!-- 具体电气参数 -->
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 280px;">
			<div style="float:left;height: 20px;width:10%;"></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#666;">A相</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#666;">B相</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#666;">C相</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">电压测量值</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相电压Ua" ></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相电压Ub" ></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相电压Uc" ></span><span style="color:#333;">V</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">电压状态</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="电压状态情况" index="1"></span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="电压状态情况" index="2"></span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="电压状态情况" index="3"></span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">欠压/过压值</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相欠压值" data-formatter="format.underVoltage" index="1"></span><span style="color:#333;">V</span><span style="color:#333;">/</span><span style="color:#333;" name="A相过压值" data-formatter="format.overVoltage" index="1"></span><span style="color:#333;">V</span><span style="color:green;">(</span><span style="color:green;" name="欠压报警值" data-formatter="format.underVoltageAlarmValue" index="1"></span><span style="color:green;">V~</span><span style="color:green;" name="过压报警值" data-formatter="format.overVoltageAlarmValue" index="1"></span><span style="color:green;">V)</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相欠压值" data-formatter="format.underVoltage" index="2"></span><span style="color:#333;">V</span><span style="color:#333;">/</span><span style="color:#333;" name="B相过压值" data-formatter="format.overVoltage" index="2"></span><span style="color:#333;">V</span><span style="color:green;">(</span><span style="color:green;" name="欠压报警值" data-formatter="format.underVoltageAlarmValue" index="2"></span><span style="color:green;">V~</span><span style="color:green;" name="过压报警值" data-formatter="format.overVoltageAlarmValue" index="2"></span><span style="color:green;">V)</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相欠压值" data-formatter="format.underVoltage" index="3"></span><span style="color:#333;">V</span><span style="color:#333;">/</span><span style="color:#333;" name="C相过压值" data-formatter="format.overVoltage" index="3"></span><span style="color:#333;">V</span><span style="color:green;">(</span><span style="color:green;" name="欠压报警值" data-formatter="format.underVoltageAlarmValue" index="3"></span><span style="color:green;">V~</span><span style="color:green;" name="过压报警值" data-formatter="format.overVoltageAlarmValue" index="3"></span><span style="color:green;">V)</span></div>
			
			<div style="float:left;height: 20px;width:100%;"></div>
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">电流测量值</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相电流Ia"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相电流Ib"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相电流Ic"></span><span style="color:#333;">A</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">电流状态</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="电流状态情况" index="1"></span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="电流状态情况" index="2"></span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="电流状态情况" index="3"></span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">过流值</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相过流值" data-formatter="format.overCurrent" index="1"></span><span style="color:#333;">A</span><span style="color:green">(</span><span style="color:green;" name="过流报警值" data-formatter="format.overCurrentAlarmValue" index="1"></span><span style="color:green;">A)</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相过流值" data-formatter="format.overCurrent" index="2"></span><span style="color:#333;">A</span><span style="color:green">(</span><span style="color:green;" name="过流报警值" data-formatter="format.overCurrentAlarmValue" index="2"></span><span style="color:green;">A)</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相过流值" data-formatter="format.overCurrent" index="3"></span><span style="color:#333;">A</span><span style="color:green">(</span><span style="color:green;" name="过流报警值" data-formatter="format.overCurrentAlarmValue" index="3"></span><span style="color:green;">A)</span></div>
			
			<div style="float:left;height: 20px;width:100%;"></div>
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">有功功率</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相有功功率Pa"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相有功功率Pb"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相有功功率Pc"></span><span style="color:#333;">KW</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">无功功率</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相无功功率Qa"></span><span style="color:#333;">KVor</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相无功功率Qb"></span><span style="color:#333;">KVor</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相无功功率Qc"></span><span style="color:#333;">KVor</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">视在功率</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相视在功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相视在功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相视在功率"></span><span style="color:#333;">KW</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">功率因数</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相功率因数PF"></span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相功率因数PF"></span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相功率因数PF"></span></div>
		</div>
    </div>
    <div class="thumbnail" style="margin:10px;">
        <!-- 表格 -->
        <div style="padding:2px 10px;">
            <span>处理结果：</span>
            <select id="processResult" name="processResult">
            </select>
            <button id="confirmBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;float: right;" type="button">处理报警</button>
        </div>


        <div style="padding:2px 10px;">
            <textarea rows="5" cols="60" id="processDesc" name="processDesc" placeholder="处理信息录入"></textarea>
        </div>
    </div>
    <div id="maskwin"  class="thumbnail"  style="padding-left: 23px;font-size: 14px;border: 0;border-bottom: 1px solid #dedede;">      
        <table>
			<tr>
				<td>
			       <div id="left_side" data-rightcode="SYSDEV_FOCUS" style="display:none;margin-top: -4px;">
			       		<span >关注：</span><input id="focusFlag" type="checkbox">
			       </div> 
				</td>
				<td>
			       <div id="content" data-rightcode="SYSDEV_REPAIR" style="display:none;margin-top: -4px;">
			       		<span style="padding-left:20px;">已报修：</span><input id="repairFlag" type="checkbox"></input>
			       	</div>
				</td>
				<td>
			       <div id="right_side"  data-rightcode="SYSDEV_PANGLU" style="display:none;bottom: 3px;">
						<span style="padding-left:20px;">旁路时长(小时)：</span>
			        	<input type="text" style="width:120px;" id="maskTime" name="maskTime"/>
			        	<button id="maskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;"  type="button" title="请先报修再旁路">设置旁路</button>
			        	<button id="unmaskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;" type="button">取消旁路</button>
			        </div>
				</td>
			</tr>
		</table>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/handle/fireHandle.js"></script>
</html>
