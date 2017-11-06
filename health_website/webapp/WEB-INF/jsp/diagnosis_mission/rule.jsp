<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/uilib/bootstrap/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css"  href="${pageContext.request.contextPath}/content/uilib/bootstrapTable/bootstrap-table.min.css"/>
<meta http-equiv="X-UA-Compatible" content="IE=9;ie=8;text/html; charset=utf-8;" />
<title></title>
 <%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/diagnosis_mission/rule.js"></script>
 <style type="text/css">
 	.form-control{
 		width:150px;
 	}
 	.td-btn-div{
 		margin-top: -9px;
 	}
 </style>
</head>
<body class="main-container"> 
    <!-- /. my-container-side-->
    <div class="gradient-right"></div>
    <div class="my-container-right">
        <div class="my-container-right-content">
            <div class="container">
                <h3>视频质量诊断任务</h3>
                <p class="text-muted">设置视频质量诊断规则</p>
				<div id="toolbar" class="btn-group">
					<button id="btn_add" type="button" class="btn btn-dodgerblue search-btn" style="height:30px">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
				</div>
				<table id="bootstrapTable" class="table table-bordered" data-pagination="true" data-toolbar="#toolbar" data-show-export="true">
					<thead>
						<tr> 
						</tr>
					</thead>
				</table>
            </div>
			
        <!-- /. my-container-right-->
    </div>
</div>

<!-- 新增编辑模态框 -->
<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="add_model">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button>
        <h4 class="modal-title" id="myModalLabel">新增视频质量诊断任务</h4>
      </div>
      <div class="modal-body">
      <div class="row">
      <div class="col-md-4">
		<form role="form">
			<div class="form-group">
				<input type="text" class="form-control" id="mission_id" style="display:none"/>
			</div>
			<div class="form-group">
				<label for="mission_name">任务名称</label><span style="color:red" id="name_spam"></span><br/> 
				<input type="text" class="form-control" id="mission_name" placeholder="任务名称"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="mission_name">开始时间</label><span style="color:red" id="begin_time_spam"></span><br/> 
				<input id="begin_time" class="form-control" readonly="readonly" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm:ss', isShowToday: true})" type="text" value="00:00:00"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="mission_name">结束时间</label><span style="color:red" id="end_time_spam"></span><br/>
				<input id="end_time" class="form-control" readonly="readonly" onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm:ss', isShowToday: true})" type="text" value="00:00:00"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="cycle">诊断周期(小时)</label><span style="color:red" id="cycle_spam"></span><br/> 
				<input type="text" class="form-control" id="cycle" placeholder="诊断周期"/>
			</div>
			<br/>
			<div class="checkbox">
				<label> <input type="checkbox" id="is_run"/>启用</label>
			</div>	
		</form>
		</div>
		<div class="col-md-4">
		<form role="form" id="form2">
			<div class="form-group">
				<input type="text" class="form-control" style="display:none" value="text"/>
			</div>
			<div class="form-group">
				<label for="nosignal">信号丢失</label><span style="color:red" id="nosignal_spam"></span><br/> 
				<input type="text" class="form-control" id="nosignal" placeholder="信号丢失"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="freeze">冻结</label><span style="color:red" id="freeze_spam"></span><br/> 
				<input type="text" class="form-control" id="freeze" placeholder="冻结"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="color">偏色</label><span style="color:red" id="color_spam"></span><br/> 
				<input type="text" class="form-control" id="color" placeholder="偏色"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="snow">雪花</label><span style="color:red" id="snow_spam"></span><br/> 
				<input type="text" class="form-control" id="snow" placeholder="雪花"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="covered">遮挡</label><span style="color:red" id="covered_spam"></span><br/> 
				<input type="text" class="form-control" id="covered" placeholder="遮挡"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="luminance">亮度</label><span style="color:red" id="luminance_spam"></span><br/> 
				<input type="text" class="form-control" id="luminance" placeholder="亮度"/>
			</div>
			<br/>
		</form>
		</div>
		 <div class="col-md-4">
		<form role="form3" id="form3">
			<div class="form-group">
				<input type="text" class="form-control" style="display:none" value="text"/>
			</div>
			<div class="form-group">
				<label for="move">像机移动</label><span style="color:red" id="move_spam"></span><br/> 
				<input type="text" class="form-control" id="move" placeholder="移动"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="roll">条纹</label><span style="color:red" id="roll_spam"></span><br/> 
				<input type="text" class="form-control" id="roll" placeholder="条纹"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="fuzzy">模糊</label><span style="color:red" id="fuzzy_spam"></span><br/> 
				<input type="text" class="form-control" id="fuzzy" placeholder="模糊"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="contrast">对比度</label><span style="color:red" id="contrast_spam"></span><br/> 
				<input type="text" class="form-control" id="contrast" placeholder="对比度"/>
			</div>
			<br/>
			<div class="form-group">
				<label for="shake">抖动</label><span style="color:red" id="shake_spam"></span><br/> 
				<input type="text" class="form-control" id="shake" placeholder="抖动"/>
			</div>
			</form>
		</div> 
		
		</div>
				</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" id="save_mission">保存</button>
      </div>
    </div>
  </div>
</div>
<div class="opwin nice-validator n-default" id="eqwin" style="display: none;">
		<div class="panel-body">
			<ul class="ztree content_ztree" id="chnntree" style="-moz-user-select: none;height:400px;"></ul>
		</div>
</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/bootstrapTable/bootstrap-table.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/bootstrapTable/bootstrap-table-zh-CN.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/bootstrapPaginator/bootstrap-paginator.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/main.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/Highcharts/js/highcharts-more.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
</html>