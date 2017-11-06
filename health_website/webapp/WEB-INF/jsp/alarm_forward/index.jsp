<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
 <%@ include file="/WEB-INF/jsp/base/header.jsp"%>
 <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/alarm_forward/index.js"></script>
 <!-- 滑动开关 -->
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/content/uilib/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css" />
 <style type="text/css">
 	.form-control{
 		width:80px;
 	}
 	.timeTemplate{
 		width:120px;
 	}
 	.search-table{
 		border-spacing:0px 15px;
 		border-collapse:separate; 
 	}
 </style>
</head>
<body class="main-container"> 
    <!-- /. my-container-side-->
    <div class="gradient-right"></div>
    <div class="my-container-right">
        <div class="my-container-right-content">
        	
            <div class="container">
            	<table class="search-table" style="width:850px">		
				<tbody>
				 <tr data-alarm-level="紧急">
					<td class="tb-left">报警级别：</td>
					<td class="tb-right">紧急</td>
					<td class="tb-left">转发时间：</td>
					<td class="tb-right">
						<select class="form-control txt input-border1 timeTemplate">
							<option value="-1">暂无</option>
						 </select>
					</td> 
					<td class="tb-left">延迟时间：</td>
					<td class="tb-right">
						 <input class="readyTime form-control" type="text"></input> 秒
					</td>
					<td class="tb-left">是否启动：</td>
					<td class="tb-right">
						 <input class="switch offFireParamSwitch" type="checkbox" />
					</td>
					<td>
						<button id="saveBtn" class="btn btn-dodgerblue flat-btn" style="margin: 4px" type="button">保存设置</button>
					</td> 
				</tr>
				 <tr data-alarm-level="重要">
					<td class="tb-left">报警级别：</td>
					<td class="tb-right">重要</td>
					<td class="tb-left">转发时间：</td>
					<td class="tb-right">
						<select class="form-control txt input-border1 timeTemplate">
							<option value="-1">暂无</option>
						 </select>
					</td> 
					<td class="tb-left">延迟时间：</td>
					<td class="tb-right">
						 <input class="readyTime form-control" type="text"></input> 秒
					</td>
					<td class="tb-left">是否启动：</td>
					<td class="tb-right">
						 <input class="switch offFireParamSwitch" type="checkbox" />
					</td>
				</tr>
				 <tr data-alarm-level="普通">
					<td class="tb-left">报警级别：</td>
					<td class="tb-right">普通</td>
					<td class="tb-left">转发时间：</td>
					<td class="tb-right">
						<select class="form-control txt input-border1 timeTemplate">
							<option value="-1">暂无</option>
						 </select>
					</td> 
					<td class="tb-left">延迟时间：</td>
					<td class="tb-right">
						 <input class="readyTime form-control" type="text"></input> 秒
					</td>
					<td class="tb-left">是否启动：</td>
					<td class="tb-right">
						 <input class="switch offFireParamSwitch" type="checkbox" />
					</td>
				</tr>
			</tbody>
			</table>
                <div class="row">
                    <div class="col-xs-3">
		                <h3>转发时间模板</h3>
                        <input name="ruleCode" type="hidden" value="">
                        <ul id="rule" class="list-group" style="overflow: auto; max-height: 500px;">
                            <li class="list-group-item list-fir">
                                <label>规则</label>
                                <button title="添加" class="btn-danger btn-xs btn-link pull-right" id="addBtn" data-toggle="modal"><span class="glyphicon glyphicon-plus"></span></button>
                            </li>
                        </ul>                    </div>
                    <div class="col-xs-9">
                        <div class="row"style="hight:100px">
                            <div id="planContent" data-highcharts-chart="7"  style="hight:100px"></div>
                        </div>
                    </div>
                </div>
                <!-- /. my-container-right-conten-->
            </div>

        <!-- /. my-container-right-->
    </div>
</div>
<div class="opwin nice-validator n-default" id="planwin" style="display: none;" >
    <form class="form-horizontal" id="planForm" role="form">
        <div class="form-group">
            <div class="col-xs-6">
            	<div class="col-xs-4">
            		<label>规则名称</label>
            	</div>
            	<div class="col-xs-6" style="margin: 4px 0;padding: 0">
            		<input name="RuleName" id="RuleName" class="form-control"  type="text" maxlength="36" placeholder="规则名称">
            	</div>
            </div>
            <div class="col-xs-2">
                <input name="Enable" class="bootstrap" id="isEnable" type="checkbox" checked='"checked"' data-animated="true">
                <label for="isEnable">启用</label>
            </div>
            <div class="col-xs-4">
            	<div class="col-xs-6">
            		<label>存储天数</label>
            	</div>
            	<div class="col-xs-6" style="margin: 4px 0;padding: 0">
            		<input name="saveDays" id="saveDays" class="form-control" type="text" style="width:50px" maxlength="10" placeholder="存储天数">
            	</div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <div class="viewport">
                    <ul class="nav nav-tabs" id="tabRule">
                                <li title="星期一" class="active">
                                    <a data-toggle="tab" ext="1">
                                        <span class="tabname">星期一</span>
                                    </a>
                                </li>
                                <li title="星期二">
                                    <a data-toggle="tab" ext="2">
                                        <span class="tabname">星期二</span>
                                    </a>
                                </li>
                                <li title="星期三">
                                    <a data-toggle="tab" ext="3">
                                        <span class="tabname">星期三</span>
                                    </a>
                                </li>
                                <li title="星期四">
                                    <a data-toggle="tab" ext="4">
                                        <span class="tabname">星期四</span>
                                    </a>
                                </li>
                                <li title="星期五">
                                    <a data-toggle="tab" ext="5">
                                        <span class="tabname">星期五</span>
                                    </a>
                                </li>
                                <li title="星期六">
                                    <a data-toggle="tab" ext="6">
                                        <span class="tabname">星期六</span>
                                    </a>
                                </li>
                                <li title="星期天">
                                    <a data-toggle="tab" ext="0">
                                        <span class="tabname">星期天</span>
                                    </a>
                                </li>

                    </ul>
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="col-xs-12" id="leftTime">
                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active">
                        <div class="pull-right margin-bottom">
                            <div class="btn-group">
                                <a class="btn btn-default" id="btnCopyTo" href="#">复制到...</a>
                            </div>
                        </div>
                        <div class="panel-body" id="divTimeContent" style="padding: 0px;">
                                <table class="table table-condensed table-bordered table-hover" id="tblRule1" style="margin-bottom: 0px;">
                                    <thead>
                                        <tr>
                                            <th width="60">时间段</th>
                                            <th>开始时间</th>
                                            <th>停止时间</th>
                                            <th width="60">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <input name="StartTime1_0" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime1_0" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="0" week="1">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <input name="StartTime1_1" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime1_1" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>

                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="1" week="1">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <input name="StartTime1_2" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime1_2" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="2" week="1">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <input name="StartTime1_3" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime1_3" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="3" week="1">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <input name="StartTime1_4" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime1_4" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="4" week="1">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <input name="StartTime1_5" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime1_5" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>

                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="5" week="1">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>
                                                    <input name="StartTime1_6" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime1_6" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>

                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="6" week="1">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>
                                                    <input name="StartTime1_7" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime1_7" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="7" week="1">清除</a>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                                <table class="table table-condensed table-bordered table-hover" id="tblRule2" style="margin-bottom: 0px; display: none;">
                                    <thead>
                                        <tr>
                                            <th width="60">时间段</th>
                                            <th>开始时间</th>
                                            <th>停止时间</th>
                                            
                                            <th width="60">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <input name="StartTime2_0" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime2_0" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="0" week="2">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <input name="StartTime2_1" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime2_1" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="1" week="2">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <input name="StartTime2_2" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime2_2" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="2" week="2">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <input name="StartTime2_3" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime2_3" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="3" week="2">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <input name="StartTime2_4" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime2_4" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="4" week="2">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <input name="StartTime2_5" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime2_5" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="5" week="2">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>
                                                    <input name="StartTime2_6" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime2_6" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="6" week="2">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>
                                                    <input name="StartTime2_7" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime2_7" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="7" week="2">清除</a>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                                <table class="table table-condensed table-bordered table-hover" id="tblRule3" style="margin-bottom: 0px; display: none;">
                                    <thead>
                                        <tr>
                                            <th width="60">时间段</th>
                                            <th>开始时间</th>
                                            <th>停止时间</th>
                                            
                                            <th width="60">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <input name="StartTime3_0" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime3_0" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="0" week="3">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <input name="StartTime3_1" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime3_1" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="1" week="3">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <input name="StartTime3_2" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime3_2" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="2" week="3">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <input name="StartTime3_3" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime3_3" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="3" week="3">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <input name="StartTime3_4" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime3_4" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="4" week="3">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <input name="StartTime3_5" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime3_5" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="5" week="3">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>
                                                    <input name="StartTime3_6" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime3_6" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="6" week="3">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>
                                                    <input name="StartTime3_7" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime3_7" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="7" week="3">清除</a>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                                <table class="table table-condensed table-bordered table-hover" id="tblRule4" style="margin-bottom: 0px; display: none;">
                                    <thead>
                                        <tr>
                                            <th width="60">时间段</th>
                                            <th>开始时间</th>
                                            <th>停止时间</th>
                                            
                                            <th width="60">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <input name="StartTime4_0" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime4_0" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="0" week="4">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <input name="StartTime4_1" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime4_1" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>

                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="1" week="4">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <input name="StartTime4_2" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime4_2" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="2" week="4">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <input name="StartTime4_3" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime4_3" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="3" week="4">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <input name="StartTime4_4" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime4_4" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="4" week="4">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <input name="StartTime4_5" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime4_5" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="5" week="4">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>
                                                    <input name="StartTime4_6" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime4_6" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>

                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="6" week="4">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>
                                                    <input name="StartTime4_7" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime4_7" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="7" week="4">清除</a>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                                <table class="table table-condensed table-bordered table-hover" id="tblRule5" style="margin-bottom: 0px; display: none;">
                                    <thead>
                                        <tr>
                                            <th width="60">时间段</th>
                                            <th>开始时间</th>
                                            <th>停止时间</th>
                                            
                                            <th width="60">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <input name="StartTime5_0" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime5_0" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="0" week="5">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <input name="StartTime5_1" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime5_1" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="1" week="5">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <input name="StartTime5_2" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime5_2" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="2" week="5">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <input name="StartTime5_3" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime5_3" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="3" week="5">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <input name="StartTime5_4" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime5_4" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="4" week="5">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <input name="StartTime5_5" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime5_5" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="5" week="5">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>
                                                    <input name="StartTime5_6" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime5_6" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="6" week="5">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>
                                                    <input name="StartTime5_7" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime5_7" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="7" week="5">清除</a>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                                <table class="table table-condensed table-bordered table-hover" id="tblRule6" style="margin-bottom: 0px; display: none;">
                                    <thead>
                                        <tr>
                                            <th width="60">时间段</th>
                                            <th>开始时间</th>
                                            <th>停止时间</th>
                                            
                                            <th width="60">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <input name="StartTime6_0" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime6_0" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="0" week="6">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <input name="StartTime6_1" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime6_1" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="1" week="6">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <input name="StartTime6_2" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime6_2" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="2" week="6">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <input name="StartTime6_3" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime6_3" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="3" week="6">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <input name="StartTime6_4" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime6_4" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="4" week="6">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <input name="StartTime6_5" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime6_5" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="5" week="6">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>
                                                    <input name="StartTime6_6" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime6_6" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="6" week="6">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>
                                                    <input name="StartTime6_7" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime6_7" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="7" week="6">清除</a>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                                <table class="table table-condensed table-bordered table-hover" id="tblRule0" style="margin-bottom: 0px; display: none;">
                                    <thead>
                                        <tr>
                                            <th width="60">时间段</th>
                                            <th>开始时间</th>
                                            <th>停止时间</th>
                                            
                                            <th width="60">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <input name="StartTime0_0" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime0_0" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="0" week="0">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <input name="StartTime0_1" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime0_1" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="1" week="0">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <input name="StartTime0_2" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime0_2" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="2" week="0">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <input name="StartTime0_3" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime0_3" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="3" week="0">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <input name="StartTime0_4" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime0_4" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="4" week="0">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <input name="StartTime0_5" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime0_5" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="5" week="0">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>
                                                    <input name="StartTime0_6" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime0_6" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="6" week="0">清除</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>
                                                    <input name="StartTime0_7" class="form-control" onclick="WdatePicker({ isShowClear: true,readOnly: false, dateFmt: 'HH:mm',isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <input name="EndTime0_7" class="form-control" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm', isShowToday: true})" type="text" value="00:00">
                                                </td>
                                                <td>
                                                    <a class="btn btn-default btnClear" href="#" ext="7" week="0">清除</a>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xs-3" id="rightTime" style="display: none;">
                <div class="panel panel-default">
                    <div class="panel-body">
                            <div>
                                <input name="chkRule1" disabled="" type="checkbox" value="1">
                                <label style="vertical-align:middle;margin-left:5px">星期一</label>
                            </div>
                            <div>
                                <input name="chkRule2" disabled="" type="checkbox" value="2">
                                <label style="vertical-align:middle;margin-left:5px">星期二</label>
                            </div>
                            <div>
                                <input name="chkRule3" disabled="" type="checkbox" value="3">
                                <label style="vertical-align:middle;margin-left:5px">星期三</label>
                            </div>
                            <div>
                                <input name="chkRule4" disabled="" type="checkbox" value="4">
                                <label style="vertical-align:middle;margin-left:5px">星期四</label>
                            </div>
                            <div>
                                <input name="chkRule5" disabled="" type="checkbox" value="5">
                                <label style="vertical-align:middle;margin-left:5px">星期五</label>
                            </div>
                            <div>
                                <input name="chkRule6" disabled="" type="checkbox" value="6">
                                <label style="vertical-align:middle;margin-left:5px">星期六</label>
                            </div>
                            <div>
                                <input name="chkRule0" disabled="" type="checkbox" value="0">
                                <label style="vertical-align:middle;margin-left:5px;">星期天</label>
                            </div>
                            <div>
                           		<input name="chkRuleAll" type="checkbox" value="All">
                                <label style="vertical-align:middle;margin-left:5px;">全部</label>
                            </div>
                        <div>
                            <a class="btn btn-default" id="btnCopy" href="#">复制</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
	</div>
</body>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/main.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts-more.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
<!-- 滑动开关js -->
<script type="text/javascript"
		src="${pageContext.request.contextPath}/content/uilib/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
</html>