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
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/constants.js"></script>
<script type="text/javascript">
	var equipmentId='${param.equipmentId}';
</script>
<!-- 多回路电气火灾探测器详情 -->
<body>
    <div class="opwin nice-validator n-default" id="devicewin">
    <div style="padding:2px" id="equInfo">
    	<button id="refresh" class="btn btn-dodgerblue search-btn" type="button" style="position:absolute;right:25px;top:5px">
	         <i class="glyphicon glyphicon-refresh"></i> 刷新
	    </button>
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
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/sysdev/detailMultipathFire.js"></script>
</html>
