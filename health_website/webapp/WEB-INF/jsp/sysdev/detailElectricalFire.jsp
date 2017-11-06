<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<style type="text/css">
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
    	font-size: 12px;
    	height: 23px;
	}
	span.leftAlign {
    	/* padding-left: 19px; */
    	color: #666;
    	width: 110px;
    	display: inline-block;
	}
	span.rightAlign {
    	color: #333;
    	width: 78px;
    	display: inline-block;
	}
	.infoTitle {
   	 	margin-left: 7px;
   	 	color: #347be3;
    	padding-bottom: 5px;
    	font-size: 14px;
    	border-bottom: 2px solid #6fa2ee;
    	width: 58px;
    	padding-left: 3px;
	}
	.layui-layer-btn {
    	text-align: center !important;
    	border-top: 1px solid #dedede !important;
    	background: #f5f5f5 !important;
	}
	a.layui-layer-btn0 {
    	width: 74px !important;
    	height: 26px !important;
    	line-height: 26px !important;
    	font-size: 13px !important;
    	letter-spacing: 2px !important;
    	padding-left: 18px !important;
	}
</style>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/jquery/jquery-1.11.2.min.js"></script>	
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/constants.js"></script>
<script type="text/javascript">
	var equipmentId='${param.equipmentId}';
</script>

<body>
    <div class="opwin nice-validator n-default" id="devicewin">
    <div style="padding:2px" id="equInfo">
    	<button id="refresh" class="btn btn-dodgerblue search-btn" type="button" style="position:absolute;right:25px;top:5px">
	         <i class="glyphicon glyphicon-refresh"></i> 刷新
	    </button>
    	<!-- 基本信息 -->
		<div class="infoTitle" style="width:70px">基本信息</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 30px;">
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">设备名称：</span><span style="color:#333;" id="equimentName"></span></div>
			<!-- <div style="float:left;height: 20px;width:25%;"><span style="color:#666;">网络状态：</span><span style="color:#333;" id="netStatus"></span></div> -->
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">设备品牌：</span><span style="color:#333;" id="producer"></span></div>
			<div style="float:left;height: 20px;width:25%;"><span style="color:#666;">网络地址：</span><span style="color:#333;" id="netAddress"></span></div>
		</div>
		<!-- 检测信息 -->
		<div class="infoTitle" style="width:70px">检测信息</div>
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
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相电流Ia" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相电流Ib" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相电流Ic" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">A</span></div>
			
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
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相有功功率Pa" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相有功功率Pb" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相有功功率Pc" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KW</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">无功功率</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相无功功率Qa" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KVar</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相无功功率Qb" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KVar</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相无功功率Qc" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KVar</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">视在功率</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相视在功率" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相视在功率" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相视在功率" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KW</span></div>
			
			<div style="float:left;height: 20px;width:10%;text-align:center"><span style="color:#666;">功率因数</span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="A相功率因数PF"></span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="B相功率因数PF"></span></div>
			<div style="float:left;height: 20px;width:30%;text-align:center"><span style="color:#333;" name="C相功率因数PF"></span></div>
		</div>
		<!-- 参数统计 -->
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 30px;">
			<div style="float:left;height: 20px;width:15%;text-align:center"><span style="color:#666;">市电频率：</span><span style="color:#333;" name="频率F"></span><span style="color:#333;">Hz</span></div>
			<div style="float:left;height: 20px;width:22%;text-align:center"><span style="color:#666;">总有功功率：</span><span style="color:#333;" name="总有功功率" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:20%;text-align:center"><span style="color:#666;">总无功功率：</span><span style="color:#333;" name="总无功功率" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KVar</span></div>
			<div style="float:left;height: 20px;width:23%;text-align:center"><span style="color:#666;">总视在功率：</span><span style="color:#333;" name="总视在功率" data-formatter="format.tempMultiplyTwenty"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 20px;width:20%;text-align:center"><span style="color:#666;">总功率因数：</span><span style="color:#333;" name="总功率因数"></span></div>
		</div>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/sysdev/detailElectricalFire.js"></script>
</html>
