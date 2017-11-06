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
	href="${pageContext.request.contextPath}/content/css/fireParam.css" />

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
				<tr style="height: 10px;">
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
					<tr style="height: 10px;"></tr>
					<tr class="firstPathParams">
						<td style="word-break: keep-all; white-space: nowrap;">日期时间设置：</td>
						<td   colspan="2"><input type="text"  data-type="time"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
							id="fireParamDateTime" name="0445335001" placeholder="设置时间" 
							class="form-control " style="width:150px"/></td>
						<td style="word-break: keep-all; white-space: nowrap;width:80px;text-align:center;display:none;">通信状态：</td>
						<td id="transStatus" style="word-break: keep-all; white-space: nowrap;display:none;"></td>
	<!-- 
						<td style="word-break: keep-all; white-space: nowrap;">通讯1波特率：</td>
						<td><input id="comm01BaudRate" type="text"
							class="form-control" name="0445337001"></td>
						<td style="word-break: keep-all; white-space: nowrap;">通讯2波特率：</td>
						<td><input id="comm02BaudRate" type="text" name="0445339001"
							class="form-control"></td>
					</tr>
					end first_01 tr
					<tr class="firstPathParams"> -->
				<!-- 		<td style="padding-left: 3em;">密码：</td>
						<td><input id="fireParamPwd" type="text" class="form-control"
							name="0445340001" data-tooltip="1~9999"  data-validate="1"/></td> -->
						<!-- <td class="fireParamAddr"
							style="word-break: keep-all; white-space: nowrap;">通讯地址1：</td>
						<td class="fireParamAddr"><input id="comm01BaudRate"
							type="text" class="form-control" name="0445336001"></td>
						<td class="fireParamAddr"
							style="word-break: keep-all; white-space: nowrap;">通讯地址2：</td>
						<td class="fireParamAddr"><input id="comm02BaudRate"
							type="text" name="0445338001" class="form-control"></td> -->
					</tr>
					<!-- end first_02 tr -->
					<tr style="height: 10px;"></tr>
					<!-- 分割线 -->
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
					<!-- 第二行参数-->
					<tr style="height: 10px;"></tr>
					<tr class="secondPathParams">
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">漏电/短路检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0445313001"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0445310001" data-tooltip="1~9999" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0445311001" data-tooltip="1~9999" data-type="1"></td>					
	<!-- 					<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0445312001" data-tooltip="1~9999" data-type="protect"></td> -->
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0445314001"></td>
					</tr>
					<!-- end second tr -->
					<tr style="height: 10px;"></tr>
					<!-- 第三行参数 -->
					<tr class="secondPathParams">
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">A相线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0445318001"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0445315001" data-tooltip="1~9999"  data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0445316001" data-tooltip="1~9999"  data-type="1"></td>					
<!-- 						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0445317001" data-tooltip="1~9999"  data-type="protect"></td> -->
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0445319001" ></td>
					</tr>
					<!-- end third tr -->
					<tr style="height: 10px;"></tr>
					<!-- 第四行参数 -->
					<tr class="secondPathParams">
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">B相线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0445323001"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0445320001" data-tooltip="1~9999" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0445321001" data-tooltip="1~9999" data-type="1"></td>
					<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0445322001" data-tooltip="1~9999"  data-type="protect"></td> -->
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0445324001"></td>
					</tr>
					<!-- end fourth tr -->
					<!-- 第五行参数 -->
					<tr style="height: 10px;"></tr>
					<tr class="secondPathParams">
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">C相线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0445328001"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0445325001" data-tooltip="1~9999" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0445326001" data-tooltip="1~9999" data-type="1"></td>
					<!-- 	<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0445327001" data-tooltip="1~9999" data-type="protect"></td> -->
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0445329001"></td>
					</tr>
					<!-- end fifth tr -->
					<!-- 第六行参数 -->
					<tr style="height: 10px;"></tr>
					<tr class="secondPathParams">
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">零线线路温度检测开关：</td>
						<td><input class="onFireParamSwitch" type="checkbox"
							name="0445333001"></td>
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值：</td>
						<td><input type="text" class="form-control" name="0445330001" data-tooltip="1~9999" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护延时：</td>
						<td><input type="text" class="form-control" name="0445331001" data-tooltip="1~9999" data-type="1"></td>
						<!-- <td style="word-break: keep-all; white-space: nowrap;text-align:right;">保护设定值%：</td>
						<td><input type="text" class="form-control" name="0445332001" data-tooltip="1~9999"  data-type="protect"></td> -->
	
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">清除报警：</td>
						<td><input class="offFireParamSwitch" type="checkbox"
							name="0445334001"></td>
					</tr>
					<!-- end sixth tr -->
					<!-- 分割线 -->
					<tr style="height: 10px;"></tr>
					<tr style="height: 1px;">
						<td colspan="10"
							style="border-top: 1px solid #cecece; height: 1px;padding-bottom:5px"></td>
					</tr>
	
					<!-- 第七行参数 -->
					<tr style="height: 10px;"></tr>
					<tr class="thirdPathParams">
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;" >过压报警值(%)：</td>
						<td><input type="text" class="form-control" name="0445341001" data-tooltip="100.0~120.0,一位小数" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;" >过压报警时间(s)：</td>
						<td><input type="text"  class="form-control" name="0445342001"  id="overpressure" data-tooltip="0.1~60.0,一位小数"  data-type="3"/></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">欠压报警值(%)：</td>
						<td><input type="text" class="form-control" name="0445343001"  data-tooltip="40.0~100.0,一位小数"  data-type="2"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">欠压报警时间(s)：</td>
						<td><input type="text" class="form-control" name="0445344001"  id= "lackpressure"  data-tooltip="0.1~60.0,一位小数"  data-type="3"/></td>
					</tr>
					<!-- 第八行 -->
					<tr style="height: 10px;"></tr>
					<tr class="thirdPathParams">
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;">过流报警值(%)：</td>
						<td><input type="text" class="form-control" name="0445345001" data-tooltip="100.0~120.0,一位小数" data-type="1"></td>
						<td style="word-break: keep-all; white-space: nowrap;text-align:right;" >过流报警时间(s)：</td>
						<td><input type="text"  class="form-control " name="0445346001"  id= "overflow"  data-tooltip="0.1~60.0,一位小数" data-type="3" /></td>
					</tr>
				<!-- 分割线 -->
				<tr style="height: 10px;"></tr>
				<tr style="height: 1px;" class="trSplitLine">
					<td colspan="10"
						style="border-bottom: 1px solid #cecece; height: 1px"></td>
				</tr>

				<!-- 第九行 -->
				<tr style="height: 10px;"></tr>
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
		src="${pageContext.request.contextPath}/content/js/fireparam/index.js"></script>
</body>
</html>