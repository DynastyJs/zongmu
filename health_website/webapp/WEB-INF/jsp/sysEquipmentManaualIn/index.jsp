<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<head>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/content/css/main.css"/>
	<%@ include file="/WEB-INF/jsp/base/header.jsp"%>
	<%
		String orgId = request.getParameter("orgId")==null?"":request.getParameter("orgId");
		String path = request.getParameter("path")==null?"":request.getParameter("path").replaceAll("_", "#");
	%>
	<script type="text/javascript">
		var treeSelectOrgId = '<%=orgId%>';
		var treeSelectPath = '<%=path%>';
	</script>
	<style type="text/css">
	.selObject{
		float:left;
		margin-left:5px;
		text-decoration:none;
	}
	.option{
		width:100px;
		height:33px;
		float:left;
		margin-top:4px;
		margin:5px 5px;
		cursor:pointer;
	}
	.selected{
		color:#fff;
		border-color:#4ba8e6 !important;
		background-color : rgb(75, 168, 230) !important;
	}
	.arrow-up {
	    border-color: transparent transparent #4696f5;
	    width: 0;
	    height: 0;
	    border-width: 7px;
	    display: inline-block;
	    overflow: hidden;
	    border-style: solid;
	}
	.arrow-down {
	    border-color: #4696f5 transparent transparent;
	    width: 0;
	    height: 0;
	    border-width: 7px;
	    display: inline-block;
	    overflow: hidden;
	    border-style: solid;
	}
	.arrow_position {
		position:relative;
		left:40%;
		width:50%;
	}
	#param_table tr td{
		padding:10px 0px;
	}
	</style>
</head>
<body> 
	<!-- 中间布局	-->	
	<div class="main-container" id="user-index-layout">
		<div class="search-content">
			<div id="search_collapse" class="collapse in">
				<table class="search-table">		
					<tbody>
					 <tr>
						<td class="tb-left">设备名称：</td>
						<td class="tb-right">
							 <input id="equipmentName" type="text"  class="form-control"></input>
						</td>
						<td class="tb-left">设备IP：</td>
						<td class="tb-right">
							 <input id="netAddress" type="text"  class="form-control"></input>
						</td>
						<td colspan="2">
							<button id="search" class="btn btn-dodgerblue search-btn" type="button" style="margin-left:69px">
						         <i class="glyphicon glyphicon-search"></i> 查询
						    </button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div>
			<a class="arrow_position" data-toggle="collapse" href="#search_collapse">
         			<span class="arrow-up"></span>
       		</a>
       		<a class="arrow_position fn-hide" data-toggle="collapse" href="#search_collapse">
         			<span class="arrow-down"></span>
       		</a>
		</div>
		</div>
		<div class="orgmgr-table">
			<div class="orgmgr-tool">
				<span class="tool-title">设备管理列表</span>
				<button id="deleteBtn" class="btn btn-dodgerblue flat-btn" style="margin-top:0px" type="button">删除</button>
				<button id="modifyBtn" class="btn btn-dodgerblue flat-btn" style="margin-top:0px" type="button">修改</button>
				<button id="addBtn" class="btn btn-dodgerblue flat-btn" style="margin-top:0px" type="button">新增</button>
				<button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button">刷新</button>
			</div>
			
			<!-- 表格 -->
			<table id="bootstrapTable" class="table" data-pagination="true" data-click-to-select="true" >
				<thead>
					<tr>
						<th data-checkbox="true"></th>
						<th data-field="id" data-formatter="numberFormatter">序号</th>
						<th data-field="name">设备名称</th>
						<th data-field="equipmentTypeId" data-formatter="equipmentTypeFormatter">设备类型</th>
						<th data-field="netAddress">网络地址</th>
					</tr>
				</thead>
			</table>	
		</div>
	</div>
	<div id="param_content" class="collapse in" style="display:none;">
			<table id="param_table"  style="width:400px;">		
				<tbody>
				 <tr>
					<td class="tb-left">设备名称：</td>
					<td class="tb-right">
						 <input id="param_name" name="param_name" type="text"  class="form-control" style="width:140px;"></input>
					</td>
				</tr>
				 <tr>
				 	<td class="tb-left">设备类型：</td>
					<td class="tb-right">
						 <select id="param_equipmentType" name="param_equipmentType">
						 </select>
					</td>
				</tr>
				<tr>
					<td class="tb-left">网络地址：</td>
					<td class="tb-right">
						 <input id="param_netAddress" name="param_netAddress" type="text"  class="form-control" style="width:140px;"></input>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/sysEquipmentManaualIn/index.js"></script>
	<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/util.js"></script> --%>
</body>
</html>