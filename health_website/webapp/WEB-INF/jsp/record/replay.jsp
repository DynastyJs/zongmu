<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/activex/common.js"></script>
<%
	String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
	String dvsCode = request.getParameter("dvsCode")==null?"":request.getParameter("dvsCode");
	String chnnCode = request.getParameter("chnnCode")==null?"":request.getParameter("chnnCode");
%>
<script type="text/javascript">
	var dvsCode = '<%=dvsCode%>';
	var chnnCode = '<%=chnnCode%>';

</script>
<style>
    .nav > li > a {
        margin-bottom: -1px;
    }

</style>
<body> 
<table  cellpadding="0" cellspacing="0" height="100%" width="100%">
  <tr>
    <td valign="top" class="bs-con-main"  ms-controller="AxVideoHomeVideo">
            <div class="xm-center">
				<div class="xm-vido">
		            <div id="playContentMain" class="xm-vido-v">
		                <!--ms-if-->
		                <div id="playBackContainer" class="xm-vido16">
		                    <!--播放窗口-->
		                    <div class="" style="height: 100%;">
		                        <div class="xm-vido16-child-pc selected">
		                        	<object id="playBackPanel_1" objIndex="1" width="100%" height="100%" classid="CLSID:039A2134-AE3A-48FF-A4AC-C23C789983EE" onerror="NotInstall()"></object>
		                        </div>
		                    </div>
		                    <!--播放窗口 end-->
		                </div>
		            </div>
		            <div class="xm-vido-b">
		                <div style="height:18px;">
		                    <div ms-class="xm-progress:Mode==1">
		                        <div ms-if="Mode==2" id="progressSilder" style="width:100%;margin-top:2px;"></div>
		                    </div>
		                </div>
		                <div class="row xm-row">
		                    <div class="col-xs-8">
		                        <ul class="nav nav-pills xm-nav-pills">
	                            <!--<li ms-if="Mode==2"><a href="#"><span class="glyphicon glyphicon-fast-backward"></span></a></li>-->
	                            <li ms-if="Mode==2&&PlayState==1"><a href="#" title="慢进" onclick="onSlowPlay()" id="slowPlay"><img src="${pageContext.request.contextPath}/content/js/activex/img/glyphicon-backward.png"></a></li>
	                            <li ms-if="Mode==2&&PlayState==1"><a href="#" title="暂停" onclick="onPlayBackPause()" id="playBackPause"><img src="${pageContext.request.contextPath}/content/js/activex/img/glyphicon-pause.png"></a></li>
	                            <li class="xm-nav-pills-play" ms-if="PlayState==0"><a href="#" ms-click="Play" title="播放" id="play"><img src="${pageContext.request.contextPath}/content/js/activex/img/glyphicon-play.png"></a></li>
	                            <li class="xm-nav-pills-play" ms-if="PlayState==1"><a href="#" ms-click="Stop" title="停止播放" id="puse"><img src="${pageContext.request.contextPath}/content/js/activex/img/glyphicon-stop.png"></a></li>
	                            <li ms-if="Mode==2&&PlayState==1"><a href="#" title="快进" onclick="onFastPlay()" id="fastPlay"><img src="${pageContext.request.contextPath}/content/js/activex/img/glyphicon-forward.png"></a></li>
	                            <li ms-if="Mode==2&&PlayState==1"><a href="#" title="帧进" onclick="onStepPlay()" id="stepPlay"><img src="${pageContext.request.contextPath}/content/js/activex/img/glyphicon-fast-forward.png"></a></li>
	                            <li ms-if="PlayState!=3"><span class="xm-nav-pills-border"></span></li>
		                        <li>
	                                <a href="#" style="padding-top:5px" ms-click="SetVolumeCalm">
	                                    <img ms-if="!IsCalm&&PlayState!=3" src="${pageContext.request.contextPath}/content/js/activex/img/glyphicon-volume-up.png">
	                                    <img ms-if="IsCalm&&PlayState!=3" src="${pageContext.request.contextPath}/content/js/activex/img/glyphicon-volume-off.png">
	                                </a>
	                            </li>
		                            <li ms-if="PlayState!=3" style="padding-top:4px;">
		                                 <div id="audioSlider" style="width:80px;"></div>
		                            </li>
		                        </ul>
		                    </div>
		                  <!--  <div class="col-xs-4">
		                        <ul class="nav nav-pills xm-nav-pills pull-right">
		                            <li class="active"><a href="#"><img src="/Content/images/1f.png"></a></li>
		                            <li class=""><a href="#"><img src="/Content/images/4f.png"></a></li>
		                            <li><a href="#"><img src="/Content/images/9f.png"></a></li>
		                            <li><a href="#"><img src="/Content/images/16f.png"></a></li>
		                        </ul>
		                    </div>  -->
		                </div>
		            </div>
		        </div>
		       </div>
            </td>
          </tr>
        </table>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/activex/avalon.shim.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/activex/VGSIIActiveX.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/activex/slider_extras.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/activex/FrameWork.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/activex/AxVideoHomeVideo.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/record/replay.js"></script>
<!--  	<object id="basicPanel" CLASSID="CLSID:6C4C424C-7911-45C9-88CA-9E20965730D8" onerror="GlobalParam.LoadAXSuccess = false;" style="height:0px; display:inherit"></object>-->
	
	<script for="playBackPanel_1" event="VGSII_ActiveX_OnMouseEvent(eventInfo)" language="javascript">
	    VGSII_ActiveX_PlayBackEvent(playBackPanel_1, eventInfo);
	</script>	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/js/activex/css/docs.css"/>
</body>
</html>