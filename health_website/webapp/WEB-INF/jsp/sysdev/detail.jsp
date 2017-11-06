
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
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
    	width: 115px;
    	display: inline-block;
	}
	span.rightAlign {
    	color: #333;
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
<%
    String deviceEquipmentId =request.getParameter("equipmentId");
    String devicePropertyName =request.getParameter("propertyName");
%>
<script type="text/javascript">
    var propertyName='<%=devicePropertyName%>';
    var equipmentId='<%=deviceEquipmentId%>';
</script>

<body>
    <div class="opwin nice-validator n-default" id="devicewin">
    <div style="padding:2px" id="equInfo">

    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/sysdev/detail.js"></script>
</html>
