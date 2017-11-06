<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
 <%@ include file="/WEB-INF/jsp/base/header.jsp"%>
 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/plan/chnnlist.js"></script>
</head>
<body class="main-container"> 
    <!-- /. my-container-side-->
    <div class="gradient-right"></div>
    <div class="my-container-right">
        <div class="my-container-right-content">
            <div class="container">
                <h3>录像列表</h3>
                <p class="text-muted">设置按照计划录像的摄像机列表</p>

                <div class="row">
                    <div class="col-xs-2">
                        <input name="ruleCode" type="hidden" value="">
                        <ul class="list-group" style="overflow: auto; max-height: 500px;">
                            <li class="list-group-item list-fir">
                                <label>规则</label>                         
                            </li>
                        </ul>                   
                    </div>
                    <div class="col-xs-10">
                    	<div class="orgmgr-tool">
							<div class="row">
                            <div class="col-xs-8">
                                <div class="input-group">
                                    <input id="condition" class="form-control txt" style="width:100%;height:30px;" type="text" placeholder="设备名称/摄像机名称/机构名称/IP地址">
                                    <span class="input-group-btn">
                                        <button class="btn btn-default-gray" style="height:30px;margin-top:0px;" id="search" type="button"><span class="glyphicon glyphicon-search"></span></button>
                                    </span>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="pull-right">                              		
                                    <span class="text-muted" id="canedittxt" style="display: none;">注：该计划未启用不能对摄像机列表进行编辑！</span>
                                    <button id="btnModify" class="btn btn-dodgerblue flat-btn" style="height:30px;margin-top:0px;" type="button">编辑</button>
                                </div>
                            </div>
                        </div>
                        </div>
		      			<!-- 表格 -->
						<table id="bootstrapTable" class="table" data-pagination="true" data-height="380" data-click-to-select="true">
							<thead>
								<tr>
									<th data-field="id" data-formatter="numberFormatter">序号</th>
									<th data-field="orgName">组织机构</th>
									<th data-field="devName" data-formatter="devFormatter">设备</th>
									<th data-field="chnnName">通道</th>							
								</tr>
							</thead>
						</table>
                    </div>
                </div>
            </div>
    </div>
</div>
	<div class="opwin nice-validator n-default" id="eqwin" style="display: none;width:500px">
		<div class="panel-body">
			<ul class="ztree content_ztree" id="chnntree" style="-moz-user-select: none;height:400px;"></ul>
		</div>
	</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts-more.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
</html>