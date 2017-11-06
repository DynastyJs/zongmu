<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible"
	content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>

<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/content/css/main.css" />
<link
	href="${pageContext.request.contextPath}/content/uilib/autocompleter/jquery.autocompleter.css"
	rel="stylesheet" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/content/css/multilFireParam.css" />

<!-- 滑动开关 -->
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/content/uilib/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css" />

<!-- 树样式 -->
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/content/css/common.css" />
<style>
	.ztree li span.button.chk.checkbox_false_part {background-position:initial}
	.n-ok{
		display:none;
	}
	.n-error{
		    margin-left: -112px!important;
   		    margin-top: -20px!important;
   		    font-size: 10px;
	}
	.secondPathParams .form-control ,.thirdPathParams .form-control{width:90px;}
	#fireParamTb tr td .form-control{
		width:90px;
	}
</style>
</head>
<body class="main-container">
	<div id="wrapper" class="wrapper">
		<!-- 左侧 -->
		<aside id="sidebar" class="aside sidebar"  style="position:fixed;height:95%;">
		<div id="searchWraper" class="panel panel-default">
			<div class="panel-heading">
				<span>组织机构 </span>
			</div>
			
			<div class="panel-body">
				<!-- 搜索 -->
				<div class="form-group has-feedback text">
					<input type="text" placeholder="请输入组织名称" size="100"
						class="form-control input-search text-txt " id="fireParamOrgSearch"
						autocomplete="true">
				</div>
			</div>
		</div>
		<!-- 组织机构树 -->
		<div id="treeWraper" class="panel panel-default tree-wraper"  style="height:95%;">
			<div class="panel-body" style="overflow-y: scroll;" id="treeWraperPb"  style="height:95%;">
				<ul class="ztree content_ztree" id="orgtree"
					style="-moz-user-select: none;"></ul>
			</div>
		</div>
		</aside>
		<!-- 左侧结束 -->

		<!-- 右侧+底部 布局	-->
		<section id="mainContent" class="main-content" style="background-color:#fff;">
		<form id="ajaxForm">
		<table id="fireParamTb" class="search-table" style="border-collapse: collapse;margin:auto auto auto 10px">
			<thead style="border-collapse: collapse;">
				<tr style="height: 5px;">
					<td
						style="margin-left: 7px; color: #347be3; padding-bottom: 5px; font-size: 14px; border-bottom: 2px solid #6fa2ee; width: 58px; padding-left: 3px;">参数设置</td>
					<td colspan="9"><button
							class="btn btn-default btn-info setting" id="fireParamRefreshBtn">刷新</button></td>
				</tr>
				<!-- 分割线 -->
				<tr style="height: 0px;"></tr>
				<tr style="height: 1px;">
					<td colspan="10"
						style="border-bottom: 1px solid #cecece; height: 1px;"></td>
				</tr>
			</thead>
			<tbody style="border-collapse: collapse;">
					<!-- 第一行参数 -->
					<tr style="height: 5px;"></tr>
					<tr class="firstPathParams">
						<td style="word-break: keep-all; white-space: nowrap;">日期时间设置：</td>
						<td   colspan="2"><input type="text"  data-type="time"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
							id="fireParamDateTime" name="0446335001" placeholder="设置时间" 
							class="form-control " style="width:150px"/></td>
					<tr style="height: 5px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					<!-- 第二行参数-->
					<tr style="height: 5px;"></tr>
					<tr >
						<td id="line1" rowSpan="3" class="path1">回路1</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路1</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446304001"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446301001" data-tooltip="300~1000" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446302001" data-tooltip="0.1~60(单位：秒)" data-type="1"></td>
					<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446303001" data-tooltip="1~9999" data-type="protect"></td> 					 -->
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446305001"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 5px;"></tr>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路1</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446309001"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446306001" data-tooltip="45~110(单位：度)"  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446307001" data-tooltip="0.1~60(单位：秒)"  data-type="1"></td>
					<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446308001" data-tooltip="1~9999" data-type="protect"></td>  -->					
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446310001" ></td>
					</tr>
					<tr style="height: 5px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					<tr >
						<td id="line2" rowSpan="3" class="path2">回路2</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路2</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446304002"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446301002" data-tooltip="300~1000" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446302002" data-tooltip="0.1~60(单位：秒)" data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446303002" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446305002"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 5px;"></tr>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路2</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446309002"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446306002" data-tooltip="45~110(单位：度)""  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446307002" data-tooltip="0.1~60(单位：秒)"  data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446308002" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446310002" ></td>
					</tr>
					<tr style="height: 5px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					
					<tr >
						<td id="line3" rowSpan="3" class="path3">回路3</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路3</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446304003"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446301003" data-tooltip="300~1000" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446302003" data-tooltip="0.1~60(单位：秒)" data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446303003" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446305003"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 5px;"></tr>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路3</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446309003"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446306003" data-tooltip="45~110(单位：度)""  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446307003" data-tooltip="0.1~60(单位：秒)"  data-type="1"></td>					
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446308003" data-tooltip="1~9999" data-type="protect"></td>  -->	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446310003" ></td>
					</tr>
					<tr style="height: 5px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					
					<tr >
						<td id="line4" rowSpan="3" class="path4">回路4</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路4</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446304004"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446301004" data-tooltip="300~1000"" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446302004" data-tooltip="0.1~60(单位：秒)" data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446303004" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446305004"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 5px;"></tr>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路4</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446309004"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446306004" data-tooltip="45~110(单位：度)""  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446307004" data-tooltip="0.1~60(单位：秒)"  data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446308004" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446310004" ></td>
					</tr>
					<tr style="height: 5px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					
					<tr >
						<td id="line4" rowSpan="3" class="path5">回路5</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路5</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446304005"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446301005" data-tooltip="300~1000" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446302005" data-tooltip="0.1~60(单位：秒)" data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446303005" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446305005"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 5px;"></tr>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路5</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446309005"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446306005" data-tooltip="45~110(单位：度)""  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446307005" data-tooltip="0.1~60(单位：秒)"  data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446308005" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446310005" ></td>
					</tr>
					<tr style="height: 5px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					
					<tr >
						<td id="line4" rowSpan="3" class="path6">回路6</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路6</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446304006"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446301006" data-tooltip="300~1000" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446302006" data-tooltip="0.1~60(单位：秒)" data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446303006" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446305006"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 5px;"></tr>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路6</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446309006"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446306006" data-tooltip="45~110(单位：度)""  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446307006" data-tooltip="0.1~60(单位：秒)"  data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446308006" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446310006" ></td>
					</tr>
					<tr style="height: 5px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					
					<tr >
						<td id="line4" rowSpan="3" class="path7">回路7</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路7</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446304007"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446301007" data-tooltip="300~1000" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446302007" data-tooltip="0.1~60(单位：秒)" data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446303007" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446305007"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 5px;"></tr>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路7</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446309007"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446306007" data-tooltip="45~110(单位：度)""  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446307007" data-tooltip="0.1~60(单位：秒)"  data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446308007" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446310007" ></td>
					</tr>
					<tr style="height: 5px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					
					<tr >
						<td id="line5" rowSpan="3" class="path8">回路8</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路8</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446304008"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446301008" data-tooltip="300~1000" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446302008" data-tooltip="0.1~60(单位：秒)" data-type="1"></td>
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446303008" data-tooltip="1~9999" data-type="protect"></td>  -->						
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446305008"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 5px;"></tr>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">回路8</td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0446309008"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0446306008" data-tooltip="45~110(单位：度)""  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0446307008" data-tooltip="0.1~60(单位：秒)"  data-type="1"></td>	
						<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0446308008" data-tooltip="1~9999" data-type="protect"></td>  -->					
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0446310008" ></td>
					</tr>
					
				<!-- 分割线 -->
				<tr style="height: 5px;"></tr>
				<tr style="height: 1px;" class="trSplitLine">
					<td colspan="10"
						style="border-bottom: 1px solid #cecece; height: 1px"></td>
				</tr>

				<!-- 第九行 -->
				<tr style="height: 5px;"></tr>
				<tr>
					<td colspan="10"><button
							class="btn btn-default btn-info setting" id="fireParamSetBtn">设置</button></td>
				</tr>
				<!-- 第十行 -->
				<tr>
					<td
						style="margin-left: 7px; color: #347be3; padding-bottom: 5px; font-size: 14px; border-bottom: 2px solid #6fa2ee; width: 58px; padding-left: 3px;">过程列表</td>
				</tr>
				<!-- 分割线 -->
				<tr style="height: 0px;"></tr>
				<tr style="height: 1px;">
					<td colspan="10"
						style="border-bottom: 1px solid #cecece; height: 1px;"></td>
				</tr>
				<!-- 第十一行 -->
				<tr>
					<td colspan="11">
						<!-- 底部过程列表 -->
						<div class="content margin-top-small" style="border:0px">
							<div class="orgmgr-table">
								<!-- 表格 -->
								<table id="bootstrapTable">
								</table>
							</div>						
					</td>
				</tr>
				<!-- 第十二行 -->
				<tr>
					<td colspan="10">
						<div class="orgmgr-tool">
							<span id="bottomTips">总共需设置设备 <span id="totalCountToSet">0</span>台，已完成设置 <span
								id="finishCountToSet">0</span>台，待设置 <span id="readyCountToSet">0</span>台
							</span>
						</div>						
					</td>
				</tr>			
			</tbody>
		</table>
		<!-- end search-table -->
		</form>
	</div>
	</div>
	</section>
	</div>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/uilib/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
	<!-- 左侧组织结构树 -->
	<!-- 自动匹配 -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/js/base/jquery.atmosphere.js"></script>
	<!-- ztree -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/uilib/zTree/js/jquery.ztree.exedit-3.5.min.js"></script>
<!-- 本页面辅助函数 -->
			<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/js/fireparam/fireParamUtil.js"></script>
<!-- 本页面常量 -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/js/fireparam/fireParamConst.js"></script>
<!-- 本页面具体业务 -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/js/fireparam/multilIndex.js"></script>
</body>
</html>