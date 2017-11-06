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
table#equinfo {
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
		<div class="infoTitle" style="width:70px;border:none">基本信息</div>
		<div style="border-top:1px solid #595959;font-size:12px;padding-top: 10px;margin-left: 17px;height: 30px;">
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">设备名称：</span><span style="color:#333;" id="equimentName"></span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">设备品牌：</span><span style="color:#333;" id="producer"></span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">主机地址：</span><span style="color:#333;" id="netAddress"></span></div>
		</div>
		<!-- 检测信息 -->
		<div class="infoTitle" style="width:70px;border:none">检测信息</div>
		<div style="border-top:1px solid #595959;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 40px;width:15%;line-height:40px;">
				<span style="color:#666;" class="path1">回路1</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(1);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路1</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">漏电短路检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路1漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路1漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">漏电短路报警：</span><span style="color:#333;" name="回路1漏电短路检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">剩余电流测量值：</span><span style="color:#333;"  name="回路1漏电短路检测器测量值"></span><span style="color:#333;">mA</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">剩余电流报警测量值：</span><span style="color:#333;" name="回路1漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">mA</span><span style="color:green">(</span><span style="color:green;" name="回路1漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">mA</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路1</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路1温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路1温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="回路1温度检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="回路1温度检测器测量值" data-formatter="format.sensorValue">℃</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="回路1温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">℃</span><span style="color:green">(</span><span style="color:green;" name="回路1温度检测器保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">℃</span><span style="color:green">)</span></div>
		</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 40px;width:15%;line-height:40px;">
				<span style="color:#666;" class="path2">回路2</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(2);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路2</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">漏电短路检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路2漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路2漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">漏电短路报警：</span><span style="color:#333;" name="回路2漏电短路检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">剩余电流测量值：</span><span style="color:#333;"  name="回路2漏电短路检测器测量值"></span><span style="color:#333;">mA</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">剩余电流报警测量值：</span><span style="color:#333;" name="回路2漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">mA</span><span style="color:green">(</span><span style="color:green;" name="回路2漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">mA</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路2</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路2温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路2温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="回路2温度检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="回路2温度检测器测量值" data-formatter="format.sensorValue">℃</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="回路2温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">℃</span><span style="color:green">(</span><span style="color:green;" name="回路2温度检测器保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">℃</span><span style="color:green">)</span></div>
		</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 40px;width:15%;line-height:40px;">
				<span style="color:#666;" class="path3">回路3</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(3);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路3</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">漏电短路检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路3漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路3漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">漏电短路报警：</span><span style="color:#333;" name="回路3漏电短路检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">剩余电流测量值：</span><span style="color:#333;"  name="回路3漏电短路检测器测量值"></span><span style="color:#333;">mA</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">剩余电流报警测量值：</span><span style="color:#333;" name="回路3漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">mA</span><span style="color:green">(</span><span style="color:green;" name="回路3漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">mA</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路3</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路3温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路3温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="回路3温度检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="回路3温度检测器测量值" data-formatter="format.sensorValue">℃</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="回路3温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">℃</span><span style="color:green">(</span><span style="color:green;" name="回路3温度检测器保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">℃</span><span style="color:green">)</span></div>
		</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 40px;width:15%;line-height:40px;">
				<span style="color:#666;" class="path4">回路4</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(4);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路4</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">漏电短路检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路4漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路4漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">漏电短路报警：</span><span style="color:#333;" name="回路4漏电短路检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">剩余电流测量值：</span><span style="color:#333;"  name="回路4漏电短路检测器测量值"></span><span style="color:#333;">mA</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">剩余电流报警测量值：</span><span style="color:#333;" name="回路4漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">mA</span><span style="color:green">(</span><span style="color:green;" name="回路4漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">mA</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路4</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路4温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路4温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="回路4温度检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="回路4温度检测器测量值" data-formatter="format.sensorValue">℃</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="回路4温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">℃</span><span style="color:green">(</span><span style="color:green;" name="回路4温度检测器保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">℃</span><span style="color:green">)</span></div>
		</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 40px;width:15%;line-height:40px;">
				<span style="color:#666;" class="path5">回路5</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(5);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路5</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">漏电短路检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路5漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路5漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">漏电短路报警：</span><span style="color:#333;" name="回路5漏电短路检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">剩余电流测量值：</span><span style="color:#333;"  name="回路5漏电短路检测器测量值"></span><span style="color:#333;">mA</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">剩余电流报警测量值：</span><span style="color:#333;" name="回路5漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">mA</span><span style="color:green">(</span><span style="color:green;" name="回路5漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">mA</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路5</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路5温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路5温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="回路5温度检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="回路5温度检测器测量值" data-formatter="format.sensorValue">℃</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="回路5温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">℃</span><span style="color:green">(</span><span style="color:green;" name="回路5温度检测器保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">℃</span><span style="color:green">)</span></div>
		</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 40px;width:15%;line-height:40px;">
				<span style="color:#666;" class="path6">回路6</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(6);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路6</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">漏电短路检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路6漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路6漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">漏电短路报警：</span><span style="color:#333;" name="回路6漏电短路检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">剩余电流测量值：</span><span style="color:#333;"  name="回路6漏电短路检测器测量值"></span><span style="color:#333;">mA</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">剩余电流报警测量值：</span><span style="color:#333;" name="回路6漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">mA</span><span style="color:green">(</span><span style="color:green;" name="回路6漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">mA</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路6</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路6温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路6温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="回路6温度检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="回路6温度检测器测量值" data-formatter="format.sensorValue">℃</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="回路6温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">℃</span><span style="color:green">(</span><span style="color:green;" name="回路6温度检测器保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">℃</span><span style="color:green">)</span></div>
		</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 40px;width:15%;line-height:40px;">
				<span style="color:#666;" class="path7">回路7</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(7);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路7</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">漏电短路检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路7漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路7漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">漏电短路报警：</span><span style="color:#333;" name="回路7漏电短路检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">剩余电流测量值：</span><span style="color:#333;"  name="回路7漏电短路检测器测量值"></span><span style="color:#333;">mA</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">剩余电流报警测量值：</span><span style="color:#333;" name="回路7漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">mA</span><span style="color:green">(</span><span style="color:green;" name="回路7漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">mA</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路7</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路7温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路7温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="回路7温度检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="回路7温度检测器测量值" data-formatter="format.sensorValue">℃</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="回路7温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">℃</span><span style="color:green">(</span><span style="color:green;" name="回路7温度检测器保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">℃</span><span style="color:green">)</span></div>
		</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 40px;width:15%;line-height:40px;">
				<span style="color:#666;" class="path8">回路8</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(8);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路8</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">漏电短路检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路8漏电短路检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路8漏电短路检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">漏电短路报警：</span><span style="color:#333;" name="回路8漏电短路检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">剩余电流测量值：</span><span style="color:#333;"  name="回路8漏电短路检测器测量值"></span><span style="color:#333;">mA</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">剩余电流报警测量值：</span><span style="color:#333;" name="回路8漏电短路检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">mA</span><span style="color:green">(</span><span style="color:green;" name="回路8漏电检测保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">mA</span><span style="color:green">)</span></div>
			
			<div style="float:left;height: 20px;width:5%;"><span style="color:#666;">回路8</span></div>
			<div style="float:left;height: 20px;width:15%;"><span style="color:#666;">线路温度检测器：</span><span style="color:#333;" name="检测器状态"></span><span name="回路8温度检测器断线告警" data-formatter="format.sensorlineBreak"></span><span name="回路8温度检测器短路告警" data-formatter="format.sensorShortCircuit"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">温度异常报警：</span><span style="color:#333;" name="回路8温度检测器短路告警" data-formatter="format.sensorStatus"></span></div>
			<div style="float:left;height: 20px;width:20%;"><span style="color:#666;">线路温度测量值：</span><span style="color:#333;" name="回路8温度检测器测量值" data-formatter="format.sensorValue">℃</span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">线路温度报警测量值：</span><span style="color:#333;" name="回路8温度检测器报警测量值" data-formatter="format.sensorAlarmValue"></span><span style="color:#333;">℃</span><span style="color:green">(</span><span style="color:green;" name="回路8温度检测器保护设定值" data-formatter="format.sensorProtectedValue"></span><span style="color:green;">℃</span><span style="color:green">)</span></div>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/handle/mulipathFireHandle.js"></script>
</html>
