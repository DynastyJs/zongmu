<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>   
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/activex/common.js"></script>
<style type="text/css">
.dropdown-menu{
  left:-16px;
  top:80%;
}
.dropdown-menu>li>a{
	padding:3px 15px;
}
</style>
<body style="min-width:500px;"> 
	<!-- 头部 -->	
	<div class="header">
	    <div class="container-fluid">
	        <a href="#" class="ma-brand">
	            <img src="../content/images/header/logo.png">
	        	安防系统监测平台
	        </a>
	        <ul id="nav" class="ma-nav">
	        </ul>
	        <div class="dropdown" style="float:right;top:16px;">
       	    <!-- <span><a title="退出" class="log-out" href="javascript:window.parent.location.href='/security/login/sysCenterMain.html'"></a></span> -->
			  	<span class="set"></span>
					<span><a
						onclick="setAlarmVoice(this)" href="javascript:void(0);"
						style="text-decoration:none;"><img title="停止语音告警" id="play" style="padding-bottom:10px"
							src="${pageContext.request.contextPath}/content/images/header/close_sound.png">
					</a></span> 
				<span>
			  	<span class="user-info" style="margin-left: 16px;"></span>
			  	<span style="color:white;top: 4px; width: auto; margin-right: 0px; margin-left: 5px;"><%=request.getAttribute("accountName") %></span>
			  	<button style="background: transparent;padding: 0px;border: 0px;" type="button" id="dropdownMenu1" data-toggle="dropdown">
			    <span class="caret top-dropdown" style="margin-top: 0px;padding:10px;"></span>
			  </button>
			  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
			  	<li role="presentation" data-rightcode="FIRE_PAEAM"><a role="menuitem" style="font-size: 12px;" tabindex="-1" href="javascript:fireParamSet()"><i class="param"></i>电气火灾探测器配置</a></li>
			  	<li role="presentation" data-rightcode="MULTIL_FIRE_PAEAM" ><a role="menuitem" style="font-size: 12px;" tabindex="-1" href="javascript:multilFireParamSet()"><i class="param"></i>多回路火灾探测器配置</a></li>
			    <li role="presentation" data-rightcode="PARAM" style="display:none;"><a role="menuitem" style="font-size: 12px;" tabindex="-1" href="javascript:paramSet()"><i class="param"></i>参数配置</a></li>
			    <li role="presentation" data-rightcode="RECORD_PLAN" style="display:none;"><a role="menuitem" style="font-size: 12px;" tabindex="-1" href="javascript:plan()"><i class="plan"></i>录像计划</a></li>
			    <li role="presentation" data-rightcode="RECORD_PLAN" style="display:none;"><a role="menuitem" style="font-size: 12px;" tabindex="-1" href="javascript:alarmForward()"><i class="param"></i>告警转发规则</a></li>
			    <li role="presentation" data-rightcode="DIGNOSE_PLAN" style="display:none;"><a role="menuitem" style="font-size: 12px;" tabindex="-1" href="javascript:diagnosis()"><i class="diagnosis"></i>诊断任务</a></li>
			    <li role="presentation"><a role="menuitem" style="font-size: 12px;" tabindex="-1" href="javascript:downloadOcx()"><i class="download"></i>控件下载</a></li>
			    <li role="presentation"><a role="menuitem" style="font-size: 12px;" tabindex="-1" href="javascript:loginout()"><i class="log-out"></i>退出系统</a></li>
			  </ul>
			</div>
	        <!-- 右侧导航工具
	        <ul class="ma-nav ma-nav-clear navbar-right">
	            <li class="" data-rightcode="PARAM" style="display:none;">
	                <a title="参数设置" href="javascript:paramSet()">
	                    <i class="download-alt"></i>
	                </a>
	            </li>
	            <li class="" data-rightcode="RECORD_PLAN" style="display:none;">
	                <a title="诊断计划" href="javascript:plan()">
	                    <i class="glyphicon glyphicon glyphicon-list-alt"></i>
	                </a>
	            </li>
	            <li class="" data-rightcode="RECORD_PLAN" style="display:none;">
	                <a title="视频质量诊断任务" href="javascript:diagnosis()">
	                    <i class="glyphicon glyphicon glyphicon-list-alt"></i>
	                </a>
	            </li>
	            <li class="">
	                <a title="退出" href="javascript:window.parent.location.href='/security/login/sysCenterMain.html'">
	                    <i class="log-out"></i>
	                </a>
	            </li>
	            <li><span style="color:white;"><%=request.getAttribute("accountName") %></span></li>
	        </ul> -->
	        <object id="basicPanel" classid="CLSID:6C4C424C-7911-45C9-88CA-9E20965730D8" style="height: 0px; display: inherit;" onerror="isLoadAxSucc = false;"></object>
	    </div>
	</div>
	<!-- 中间布局	-->	
			<div id="wrapper" class="wrapper clearfix">
				<aside id="sidebar" class="aside sidebar ">
					<div id="searchWraper" class="panel panel-default">
					   <div class="panel-heading">
					      	<span>组织机构 </span>
					   </div>
					   <div class="panel-body">
					   		<!-- 搜索 -->
								<div class="form-group has-feedback text">
							           <input type="text" placeholder="请输入组织名称" size="100" class="form-control input-search text-txt " id="devSearch" autocomplete="off">
							     </div>
					   </div>
					</div>
					<!-- 组织机构树 -->
					<div id="treeWraper" class="panel panel-default tree-wraper" style="height: 135px;">
						<div class="panel-body">
							<ul class="ztree content_ztree" id="orgtree" style="-moz-user-select: none;"></ul>
						</div>
					</div>
				</aside>
			
			<!-- 中间布局	-->
			<section id="mainContent" class="main-content">
					<div class="viewport">
						<ul class="nav nav-tabs" >
							<li data-url = "/home/homeindex" style="border-left:1px solid #d9d9d9;display:none;" data-rightcode="HOME">
								<a href="javascript:void(0)">首页</a> 
							</li>
							<li data-url="/uiAlarmEvent/index" style="display:none;" data-rightcode="ALARM_EVENT">
								<a href="javascript:void(0)" >报警事件</a>
							</li>
							<li data-url="/uiAlarmEvent/handling" style="display:none; width:100px;" data-rightcode="ALARM_HANDING">
								<a href="javascript:void(0)" >处理中事件</a>
							</li>
							<li data-url="/uialarm/autoRecoveryIndex" style="display:none;width:110px;" data-rightcode="ALARM_AUTORECOVERY">
								<a href="javascript:void(0)">自动恢复报警</a>
							</li>
							<li data-url = "/netstatus/index" style="display:none;" data-rightcode="NETWORK"   data-owner="bh">
								<a href="javascript:void(0)" >网络状态</a> 
							</li>
							<li data-url="/sysdev/index" style="display:none;" data-rightcode="SYSDEV">
								<a href="javascript:void(0)" >设备状态</a>
							</li>
							<li data-url="/record/index" style="display:none;width:100px;" data-rightcode="RECORD" data-owner="bh">
								<a href="javascript:void(0)">录像状态</a>
							</li>
							<li data-url="/diagnosis/index" style="display:none;width:100px;" data-rightcode="DIAGNOSIS" data-owner="bh"> 
								<a href="javascript:void(0)">视频诊断</a>
							</li>
							<li data-url="/uialarm/logindex" style="display:none;" data-rightcode="ALARMLOG">
								<a href="javascript:void(0)">报警日志</a>
							</li>
							<li data-url="/fsuinfo/index" style="display:none;width:140px;" data-rightcode="FSU"  data-owner="bh">
								<a href="javascript:void(0)">安防系统监测主机</a>
							</li>
							<li data-url="/sysEquipmentManaualIn/index" style="display:none;" data-rightcode="DEV_MANAGE">
								<a href="javascript:void(0)">设备管理</a>
							</li>
						</ul>
					</div>
					<div class="content" >
						<iframe id="mainIframeId" class="iframe show" frameBorder="0"></iframe>
					</div>
	
			</section>
		</div>
		<div class="opwin nice-validator n-default" id="maskwin" style="display: none;">
			<input type='hidden' id="isMask"/>
			<input type='hidden' id="maskId"/>		
			<div style="margin:20px;">
				<div style="padding:2px 10px;">
					<span>旁路时长(小时)：</span> 
					<input type="text" placeholder="0~10000" style="width:80px;" id="maskTime" name="maskTime"/>
		   		</div>
			</div>
		</div>
	 <!-- 自动匹配 -->
	 <link href="${pageContext.request.contextPath}/content/uilib/autocompleter/jquery.autocompleter.css" rel="stylesheet" />
	 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/base/header.css"/>
	 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/main.css"/>
	 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/index.js"></script>
	 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/jquery.atmosphere.js"></script>
	 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/activex/FrameWork.js"></script>
	 <!-- ztree -->
	 <script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/zTree/js/jquery.ztree.exedit-3.5.min.js"></script>
	 <script type="text/javascript" src="/security/common/heartBeatPackage.js"></script>	
	 <script type="text/javascript" src="/security/common/securityAtmosphereUtil.js"></script>
</body>
</html>