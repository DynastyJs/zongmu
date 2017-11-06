<%--
  Created by IntelliJ IDEA.
  User: whoszus
  Date: 2016/7/26
  Time: 15:52
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
<%
    String deviceEquipmentId =request.getParameter("equipmentId");
    String devicePropertyName =request.getParameter("propertyName");
%>
<script type="text/javascript">
    var propertyName='<%=devicePropertyName%>';
    var equipmentId=parseInt('<%=deviceEquipmentId%>');
</script>
<style>
.mytitle {
    width: 63px;
    font-size:14px;
    border-bottom: 2px solid #6fa2ee;
    margin: 10px 29px 0;
    /* border-bottom: 1px solid #eee; */
    color: #347be3;
}
table#equinfo {
    border-top: 1px solid #eee;
    margin: 0px 5%;
    width: 90%;
}
p{ 
		font-size: 12px;
	    margin: 0;
	    margin-bottom: 10px;
	    text-align: left;
    }
    .hardwareInfo{
	 	text-align: left;
   	 	line-height: 23px;
    	display: inline-block;
    	width: 50%;
    	height: 23px;
	}
	span.leftAlign {
    	/* padding-left: 19px; */
    	color: #666;
    	width: 130px;
    	display: inline-block;
	}
	span.rightAlign {
    	color: #333;
    	width: 100px;
    	display: inline-block;
	}
</style>
<body>
    <div class="opwin nice-validator n-default" id="devicewin">
    <input id="alarmId" type="hidden" name="alarmId">
    <input id="equipmentId" type="hidden" name="equipmentId">
    <input id="maskId" type="hidden" name="maskId">
    <input id="orgId" type="hidden" name="orgId">
    <div style="padding:2px 10px;">
        <span id="pathName"></span>
    </div>
    <div style="padding:20px;height:550px;" id="equInfo">
		<!-- 基本信息 -->
		<div class="infoTitle" style="width:70px;border:none">基本信息</div>
		<div style="border-top:1px solid #595959;font-size:12px;padding-top: 10px;margin-left: 17px;height: 30px;">
			<div style="float:left;height: 30px;width:25%;"><span style="color:#666;">设备名称：</span><span style="color:#333;" id="equimentName"></span></div>
			<div style="float:left;height: 30px;width:25%;"><span style="color:#666;">设备品牌：</span><span style="color:#333;" id="producer"></span></div>
			<div style="float:left;height: 30px;width:25%;"><span style="color:#666;">主机地址：</span><span style="color:#333;" id="netAddress"></span></div>
		</div>
		<!-- 检测信息 -->
		<div class="infoTitle" style="width:70px;border:none">检测信息</div>
		<!-- 三向回路信息 -->
		<div style="border-top:1px solid #595959;font-size:12px;padding-top: 10px;margin-left: 17px;height: 130px;">
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;">回路名称</span>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路序号</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">总有功功率</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">总功率因数</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">电压</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">频率</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">总有功电能</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path1">回路1</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(1);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路1</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路1总有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路1总功率因数"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L1相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="频率"></span><span style="color:#333;">Hz</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路1总有功功率"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path2">回路2</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(2);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路2</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路2总有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路2总功率因数"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L2相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="频率"></span><span style="color:#333;">Hz</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路2总有功功率"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path3">回路3</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(3);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路3</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路3总有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路3总功率因数"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L3相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="频率"></span><span style="color:#333;">Hz</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="三相回路3总有功功率"></span><span style="color:#333;">kWh</span></div>
		</div>
		<!-- 各向回路信息 -->
		<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 60px;">
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;">回路名称</span>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路序号</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">有功功率</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">功率因数</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">电压</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">电流</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;">有功电能</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path4">回路1</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(4);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路1</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L1有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L1功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L1相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L1相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L1有功电能"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path5">回路2</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(5);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路2</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L2有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L2功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L1相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L2相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L2有功电能"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path6">回路3</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(6);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路3</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L3有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L3功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L1相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L3相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L3有功电能"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path7">回路4</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(7);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路4</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L4有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L4功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L2相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L4相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L4有功电能"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path8">回路5</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(8);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路5</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L5有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L5功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L2相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L5相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L5有功电能"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path9">回路6</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(9);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路6</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L6有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L6功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L2相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L6相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L6有功电能"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path10">回路7</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(10);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路7</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L7有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L7功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L3相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L7相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L7有功电能"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path11">回路8</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(11);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路8</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L8有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L8功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L3相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L8相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L8有功电能"></span><span style="color:#333;">kWh</span></div>
			
			<div style="float:left;height: 30px;width:15%;">
				<span style="color:#666;" class="path12">回路9</span>
				<button title="修改回路名称" class="btn-danger btn-xs btn-link  btnModify" onclick="_util.modifyPathName(12);">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
			</div>
			<div style="float:left;height: 30px;width:5%;text-align:center;"><span style="color:#666;">回路9</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L9有功功率"></span><span style="color:#333;">KW</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L9功率因素"></span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="母线L3相电压"></span><span style="color:#333;">V</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L9相电流"></span><span style="color:#333;">A</span></div>
			<div style="float:left;height: 30px;width:16%;text-align:center;"><span style="color:#666;" name="L9有功电能"></span><span style="color:#333;">kWh</span></div>
	 </div>
    </div>
    <div class="thumbnail" style="margin:10px;">
        <!-- 表格 -->
        <div style="padding:2px 10px;">
            <span>处理结果：</span>
            <select id="processResult" name="processResult">
            </select>
            <button id="confirmBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;float: right;" type="button">处理报警</button>
        </div>


        <div style="padding:2px 10px;">
            <textarea rows="5" cols="60" id="processDesc" name="processDesc" placeholder="处理信息录入"></textarea>
        </div>
    </div>
    <div id="maskwin"  class="thumbnail"  style="padding-left: 23px;font-size: 14px;border: 0;border-bottom: 1px solid #dedede;">      
        <table>
			<tr>
				<td>
			       <div id="left_side" data-rightcode="SYSDEV_FOCUS" style="display:none;margin-top: -4px;">
			       		<span >关注：</span><input id="focusFlag" type="checkbox">
			       </div> 
				</td>
				<td>
			       <div id="content" data-rightcode="SYSDEV_REPAIR" style="display:none;margin-top: -4px;">
			       		<span style="padding-left:20px;">已报修：</span><input id="repairFlag" type="checkbox"></input>
			       	</div>
				</td>
				<td>
			       <div id="right_side"  data-rightcode="SYSDEV_PANGLU" style="display:none;bottom: 3px;">
						<span style="padding-left:20px;">旁路时长(小时)：</span>
			        	<input type="text" style="width:120px;" id="maskTime" name="maskTime"/>
			        	<button id="maskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;"  type="button" title="请先报修再旁路">设置旁路</button>
			        	<button id="unmaskBtn" class="btn btn-dodgerblue flat-btn" style="width:80px;" type="button">取消旁路</button>
			        </div>
				</td>
			</tr>
		</table>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/handle/mulipathMonitorHandle.js"></script>
</html>
