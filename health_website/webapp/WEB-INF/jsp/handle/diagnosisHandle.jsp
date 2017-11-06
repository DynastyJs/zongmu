
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<%
    String chnnCode =request.getParameter("chnnCode")==null?"":request.getParameter("chnnCode");
    String dvsCode =request.getParameter("dvsCode")==null?"":request.getParameter("dvsCode");
    String equipmentId =request.getParameter("equipmentId")==null?"":request.getParameter("equipmentId");
    String dvsEquipmentId = request.getParameter("dvsEquipmentId")==null?"":request.getParameter("dvsEquipmentId");
%>
<script type="text/javascript">
    var chnnCode='<%=chnnCode%>';
    var dvsCode='<%=dvsCode%>';
    var equipmentId='<%=equipmentId%>';
    var dvsEquipmentId='<%=dvsEquipmentId%>';
</script>
<style>
	.fixed-table-pagination .page-list {
	    display: none;
	}
	#imgId {
		cursor: pointer;
	}
</style>

<body>
    <div class="opwin nice-validator n-default" id="diagnonsiswin">
    <input id="delIds" type="hidden" name="delIds"/>
    <input id="alarmId" type="hidden" name="alarmId">
    <input id="equipmentId" type="hidden" name="equipmentId">
    <input id="propertyName" type="hidden" name="propertyName" >
    <input id="maskId" type="hidden" name="maskId">
    <input id="orgId" type="hidden" name="orgId">
   <!--  <div style="padding:2px 10px;">
        <span id="pathName"></span>
    </div> -->
    <!-- 
    <table style="margin:2px 10px;">
        <tbody>
        <tr>
            <td><span id="equipmentName"></span> </td>
            <td><span id="equipmentTypeName"></span></td>
            <td><span id="netAddress"></span> </td>
            <td><span id="netStatus"></span></td>
        </tr>
        </tbody>
    </table> -->
    <%--<div style="padding:2px 10px;">--%>
        <%--<iframe src="${pageContext.request.contextPath}/record/replay" width="100%" height="300"></iframe>--%>
    <%--</div>--%>
    <div class="thumbnail" style="margin:10px;border:0;margin-bottom: 0;">
        <!-- 表格 -->
        <table id="diagnosisTable" class="diagnosisTable"  data-show-pagination-switch="true"  data-pagination="true" data-page-size="5">
            <thead>
            <tr>
            	<th data-field="dataId" data-checkbox="true"></th>
           	 	<th data-formatter="numberFormatter">序号</th>
                <th data-field="equipmentName">设备名称</th>
                <th data-field="chnnName">视频通道名称</th>
				<th data-field="nosignal" data-formatter="statusFormater">无信号</th>
				<th data-field="bright" data-formatter="statusFormater">亮度</th>
				<th data-field="color" data-formatter="statusFormater">偏色</th>
				<th data-field="snow" data-formatter="statusFormater">雪花</th>
				<th data-field="roll" data-formatter="statusFormater">条纹</th>
				<th data-field="freeze" data-formatter="statusFormater">冻结</th>
				<th data-field="shake" data-formatter="statusFormater">抖动</th>
				<th data-field="covered" data-formatter="statusFormater">遮挡</th>
				<th data-field="fuzzy" data-formatter="statusFormater">模糊</th>
				<th data-field="contrast" data-formatter="statusFormater">对比度</th>
				<th data-field="move" data-formatter="statusFormater">移位</th>
                <th data-field="isMask" data-formatter="maskFormater">旁路状态</th>
                <th data-field="repairFlag" data-formatter="repairFormater">报修状态</th>
                <td style="display: none" data-field="chnnCode"></td>
                <td style="display: none" data-field="dvsCode"></td>
                <td style="display: none" data-field="dvsEquipmentId"></td>
            </tr>
            </thead>
        </table>
       <table style="margin:2px 10px;width:100%">
	        <tbody>
	        <tr>	        	
	            <td width="50%"><iframe id="diagnosisIframe" src="${pageContext.request.contextPath}/record/realtime?dvsCode=<%=dvsCode%>&chnnCode=<%=chnnCode%>" width="100%" height="300"></iframe></td>	            
				
					<td width="50%"><img id="imgId" src="" width="100%" height="300" title="点击查看放大图片" onclick="enlargeImage(this)"></img></td>
				
	        </tr>
	        </tbody>
	    </table>
	    
		 <div id="imgPreview" style="display: none;">
        <!--    <span class="layui-layer-setwin">
             <a  href="javascript:void(0)" title="删除" onclick="deletePic(this)">
               <i class="glyphicon delete_con"></i>
             </a>
            </span> -->
           <img width="100%" height="100%" src="" />
         </div>
         
        <div style="padding:2px 10px;">
            <span>处理结果：</span>
            <select id="processResult" name="processResult">
            </select>
            <button id="confirmBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;float:right;" type="button">处理报警</button>
        </div>
        <div style="padding:2px 10px;">
            <textarea id="processDesc" name="processDesc" placeholder="处理信息录入"></textarea>
        </div>
    </div>
    <div id="maskwin"  class="thumbnail"  style="padding-left: 23px;font-size: 14px;border: 0;border-bottom: 1px solid #dedede;">
       	<table>
			<tr>
				<td>
			       <div id="left_side" data-rightcode="DIAGNOSIS_FOCUS" style="display:none;">
			       		<span >关注：</span><input id="focusFlag" type="checkbox">
			       </div> 
				</td>
				<td>
			       <div id="content" data-rightcode="DIAGNOSIS_REPAIR" style="display:none;">
			       		<span style="padding-left:20px;">已报修：</span><input id="repairFlag" type="checkbox"></input>
			       	</div>
				</td>
				<td>
			       <div id="right_side"  data-rightcode="DIAGNOSIS_PANGLU" style="display:none;">
						<span style="padding-left:20px;">旁路时长(小时)：</span>
			        	<input type="text" style="width:120px;" id="maskTime" name="maskTime"/>
			        	<button id="maskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;margin-bottom: 6px;"  type="button">设置旁路</button>
			        	<button id="unmaskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;margin-bottom: 5px;margin: 0;" type="button">取消旁路</button>
			        </div>
				</td>
			</tr>
		</table>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/handle/diagnosisHandle.js"></script>
</html>
