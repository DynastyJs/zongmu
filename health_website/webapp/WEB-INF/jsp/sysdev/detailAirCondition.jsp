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
	.info-green{
		color:green;	
	}
	.info-red{
		color:red;
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
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 80px;">
			<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">设备名称：</span><span style="color:#333;" id="equimentName"></span></div>
			<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">连接状态：</span><span style="color:green;" id="netStatus">正常</span></div> 
			<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">设备品牌：</span><span style="color:#333;" id="producer"></span></div>
		<!--	<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">空调状态：</span><span style="color:green;" id="airStatus">开机</span></div>  -->
			<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">探头温度1：</span><span style="color:#333;" id="temperatureOne"></span></div>
			<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">探头温度2：</span><span style="color:#333;" id="temperatureTwo"></span></div>
		</div>
		<!-- 空调控制 -->
		<div class="infoTitle" style="width:70px">空调控制</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;">
			<div style="margin-bottom:15px;">
				<span style="color:#666;">空调控制：</span>
				<button class="btn btn-info" onclick="btnClickEvent('airOn')">开机</button>
				<button class="btn btn-info" onclick="btnClickEvent('airOff')">关机</button>
			</div>
			<div style="margin-bottom:5px;">
				<span style="color:#666;">温度调节：</span>
				<button class="btn btn-info" onclick="btnClickEvent('tempOne')">温度1</button>
				<button class="btn btn-info" onclick="btnClickEvent('tempTwo')">温度2</button>
				<button class="btn btn-info" onclick="btnClickEvent('tempThree')">温度3</button>
			</div>
    	</div>
    	<!-- 设置信息 
		<div class="infoTitle" style="width:70px">设置信息</div>
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 30px;">
			<div style="float:left;height: 20px;width:50%;">
				<span style="color:green;" id="setResult"></span>
			</div>
    	</div>-->
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/sysdev/detailAirCondition.js"></script>
</html>
