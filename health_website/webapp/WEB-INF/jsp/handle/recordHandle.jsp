
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<%
    String deviceEquipmentId = request.getParameter("dvsEquipmentId")==null?"":request.getParameter("dvsEquipmentId");
	String equipmentId =request.getParameter("equipmentId")==null?"":request.getParameter("equipmentId");
    String recordDate =request.getParameter("recordDate")==null?"":request.getParameter("recordDate");
	String dvsCode = request.getParameter("dvsCode")==null?"":request.getParameter("dvsCode");
	String chnnCode = request.getParameter("chnnCode")==null?"":request.getParameter("chnnCode");
%>
<script type="text/javascript">
    var recordDate='<%=recordDate%>';
    var equipmentId='<%=equipmentId%>';
    var devEquipmentId='<%=deviceEquipmentId%>';
	var dvsCode = '<%=dvsCode%>';
	var chnnCode = '<%=chnnCode%>';
</script>
<style>
	.myleft {
	    padding:5px; 
	}
	.myright {
    	width: 533px;
    	height: 340px;
	}
	.fixed-table-pagination .page-list {
	    display: none;
	}
	#timelineDiv div{
		cursor:default!important;
	}
	.WdateDiv{
		width:448px!important;
	}
</style>
<body>
<map name="planetmap" id="planetmap">
  <area shape="rect" coords="0,0,1,53" onclick="playRecordByTime(1)" alt="Sun" onmouseover="convertPxToTime(1)" />
  <area shape="rect" coords="1,0,2,53" onclick="playRecordByTime(2)" onmouseover="convertPxToTime(2)"/>
  <area shape="rect" coords="2,0,3,53" onclick="playRecordByTime(3)" onmouseover="convertPxToTime(3)"/>
</map>
    <div class="opwin nice-validator n-default" id="devicewin">
    <input id="delIds" type="hidden" name="delIds"/>
    <input id="alarmId" type="hidden" name="alarmId">
    <input id="equipmentId" type="hidden" name="equipmentId">
    <input id="maskId" type="hidden" name="maskId">
    <input id="orgId" type="hidden" name="orgId">
    <div style="padding:2px 10px;">
        <span id="pathName"></span>
    </div>
    <!-- <table>
        <tbody>
        <tr>
            <td><label id="equipmentName" style="padding-left:20px;"></label> </td>
            <td><label id="equipmentTypeName"></label></td>
            <td><label id="netAddress"></label> </td>
            <td><label id="netStatus"></label></td>
        </tr>
        </tbody>
    </table> -->
	<div class="layout" style="margin:2px 10px;">
		<table style="width: 100%;">
			<tbody>
				<tr>
					<td>
						<!-- 表格 -->
						<div class="myleft">
							<div style="margin:0 auto;width:450px;height:200px;">
								<div style="margin: 2px 0; width:450px;display:inline-block;overflow: auto; border: 1px solid #dedede; height:180px">
									<table id="bootstrapTable" class="table1"
										data-show-pagination-switch="false" data-pagination="false">
										<thead>
											<tr>
												<th data-field="dataId" data-checkbox="true"></th>
												<th data-formatter="numberFormatter">序号</th>
												<!-- <th data-field="equipmentName">设备名称</th>-->
												<th data-field="chnnName">通道名称</th>
												<th data-field="timeRecord"
													data-formatter="statusFormater">定时录像</th>
												<th data-field="daysAlarm"
													data-formatter="statusFormater">存储天数</th>
												<th data-field="realSaveDays"  data-formatter="realSaveDaysFormater">实际(计划)天数</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
							<div style="margin:0 auto;width:450px;">
								<div id="myCalendar"></div>
								<div>
									<div style="display:inline-block;vertical-align:middle;margin-right:10px">
										<div style="width:10px;height:8px;background:rgb(50, 204, 103);display:inline-block;"></div>
										<label>代表当天录像完整</label>
									</div>
									<div style="display:inline-block;vertical-align:middle;margin-right:10px;">
										<div style="width:10px;height:8px;background:rgb(247, 132, 132);display:inline-block;"></div>
										<label>代表当天录像不完整</label>
									</div>
								<!-- 	<div style="display:inline-block;vertical-align:middle;margin-right:10px;">
										<div style="width:10px;height:8px;background:#3876d6;display:inline-block;"></div>
										<label>代表选中状态</label>
									</div> -->
								</div>
							</div>
							
						</div>
							</td><td>
								<div class="myright">
									<div style="margin: 2px 7px 2px 11px;font-weight:bold">选中日期：<span id="nowDate" style="color:blue"></span></div>
									<iframe id="replayIframe" frameborder="0"
										src="${pageContext.request.contextPath}/record/replay?dvsCode=<%=dvsCode%>&chnnCode=<%=chnnCode%>"
										width="100%" height="100%"></iframe>
									<div style="width: 100%">
										<img style="top: 0; width: 533px;cursor:pointer"
											src="../content/images/timeline1.png"
											usemap="#planetmap">
											<div id="timelineDiv"></div>
									</div>

									<div style="width: 100%">
										<span id="chnName" style="color:blue"></span>
										<span id="tips"
											style="font-weight: bold; padding: 5px; left: 0; z-index: 9999">点击时间轴回放</span>
										<div style="float: right">
											<input id="locateTime" style="width: 80px"
												class="form-control"
												onclick="WdatePicker({ isShowClear: true, readOnly: false, dateFmt: 'HH:mm:ss', isShowToday: true})"
												type="text" value="00:00:00">
												<button id="locateBtn"
													class="btn btn-dodgerblue search-btn" type="button" style="margin-top:0px"
													onClick="locateBtn()">定位播放</button>
										</div>
									</div>
							</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
    <div class="thumbnail" style="margin:10px;margin-left: 26px;">
        <!-- 表格 -->
        <div style="padding:2px 10px;">
            <span>处理结果：</span>
            <select id="processResult" name="processResult">
            </select>
            <button id="confirmBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;margin-top: 0px;float: right;" type="button">处理报警</button>
        </div>


        <div style="padding:2px 10px;">
            <textarea rows="5" cols="60" id="processDesc" name="processDesc" placeholder="处理信息录入"></textarea>
        </div>
    </div>
    <div id="maskwin"  class="thumbnail"  style="padding-left: 23px;font-size: 14px;border: 0;border-bottom: 1px solid #dedede;">       
        <table>
				<tr>
					<td>
				       <div id="left_side" data-rightcode="RECORD_FOCUS" style="display:none;">
				       		<span >关注：</span><input id="focusFlag" type="checkbox">
				       </div> 
					</td>
					<td>
				       <div id="content" data-rightcode="RECORD_REPAIR" style="display:none;">
				       		<span style="padding-left:20px;">已报修：</span><input id="repairFlag" type="checkbox"></input>
				       	</div>
					</td>
					<td>
				       <div id="right_side"  data-rightcode="RECORD_PANGLU" style="display:none;bottom: 3px;">
							<span style="padding-left:20px;">旁路时长(小时)：</span>
				        	<input type="text" style="width:120px;" id="maskTime" name="maskTime"/>
				        	<button id="maskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;margin-top: -4px;"  type="button">设置旁路</button>
				        	<button id="unmaskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;margin-top: -4px;" type="button">取消旁路</button>
				        </div>
					</td>
				</tr>
			</table>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/handle/recordHandle.js"></script>
</html>
