<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 

<head>
<%@ include file="/WEB-INF/jsp/base/header.jsp" %>
<style type="text/css">

	* {
	    font-family: 微软雅黑;
	    outline: medium none !important;
	    font-size: 13px;
	    line-height: 150%;
	}
	
.title1{
	  	text-align:center;
	  	font:bold;
	  	font-size:15px;
	  }
.border{
border:1px solid #acd;
}

.div_title{
	margin-top: -10px;
	margin-left:10px;
}
</style>
</head>
<body>
<center>
<!-- <div id="div" class="col-md-1" style="width:220px">
<div class="thumbnail">
<div title="div1" id="div1" class = "title1">报警主机网络状态</div>
</div>
</div>
<table border=1>
<tr>
<td>(0,0)</td>
<td>(0,1)</td>
</tr>
</table> -->
<!-- 布局容器 -->
<button id="btn2" class="btn btn-default">Test</button>
<div class="main-container" id="user-index-layout">
<fieldset>
 <legend>服务器状态</legend>
<div class="row" id="div-server" style="height:200px; overflow:auto">

<div class="col-md-6" align="left">
<div class="thumbnail">
<div class="row">
<div class="col-md-3" align="center">
<div class="thumbnail colorBox" style="height:100px; width:100px; background-color:green !important">图</div>
<button  class="btn btn-default">处理</button>
</div>
<div class="col-md-9" align="left" >
<div class="row">设备1  在线</div>
<div class="row">CPU使用率 55%  内存使用 85%  物理内存 3.89GB</div>
<div class="row">C盘 119.90GB  剩余78.73GB(65.66%); D盘 150.45GB  剩余140.85GB(93.62%); E盘 195.31GB  剩余193.28GB(98.96%)</div>
<div class="row">总存储空间大小 476846.08MB; 剩余存储空间 422768.64MB(88.66%)</div>

</div>
</div>
</div>
</div>

<!-- <div class="col-md-2">
<div class="thumbnail">设备2
</div>
</div> -->
</div>
</fieldset>

</div>
</center>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/equipment_status/index.js"></script>
</html>