<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="${pageContext.request.contextPath}/content/uilib/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/content/uilib/artDialog/css/ui-dialog.css" rel="stylesheet" />
<link href="${pageContext.request.contextPath}/content/uilib/gui/gtitlebar/gtitlebar.css" rel="stylesheet" />
<link href="${pageContext.request.contextPath}/content/uilib/gui/gform/gform.css" rel="stylesheet" />
<link href="${pageContext.request.contextPath}/content/uilib/gui/gdropdown/gdropdown.css" rel="stylesheet" />
<link href="${pageContext.request.contextPath}/content/uilib/nice-validator/jquery.validator.css" rel="stylesheet" />
<title>保存和编辑用户</title>
</head>
<body>

	<form>
		<div class="gtitlebar">
			<span class="title">基本信息</span>
		</div>
		<div class="gform">
			<div class="grow">
				<span class="col-5"><i class="need">*</i><label
					class="glabel">帐号：</label><input value="${user.accountName}"
					type="text" name="accountName"></span> <span class="col-5"><i class="need">*</i><label
					class="glabel">密码：</label><input type="password"
					value="${user.password}" name="password"></span>
			</div>
			<div class="grow">
				<span class="col-5"><i class="need">*</i><label class="glabel">姓名：</label><input
					value="${user.userName}" type="text" name="userName"></span> <span
					class="col-5"><i class="need">*</i><label class="glabel">手机：</label><input
					type="text" value="${user.mobilePhone} " name="mobilePhone"></span>
			</div>
			<div class="grow">
				<span class="col-5"><label class="glabel">职位：</label><input
					value="${user.position}" type="text" name="position"></span> <span
					class="col-5"><label class="glabel">地址：</label><input
					type="text" value="${user.address}" name="address"></span>
			</div>
			<div class="grow">
				<span class="col-5"><label class="glabel">生日：</label><input
					value="${user.birthday}" type="text" name="birthday"><i class = "fa fa-calendar"></i></span> <span
					class="col-5"><label class="glabel">部门：</label><input
					type="text" value="${user.orgName}" name="orgName"><i class = "fa fa-search"></i></span>
			</div>
			<div class="grow">
				<span class="col-5"><label class="glabel">技能：</label><input readonly="readonly"
					name="skill" type="text"></span> <span class="col-5"><label
					class="glabel">学校：</label><input type="text" name="school" readonly="readonly"></span>
			</div>
			<div class="grow">
				<span class="col-5"><label class="glabel">性别：</label> <input
					type="radio" name="gender" checked="checked">男 <input
					type="radio" name="gender">女 </span> <span class="col-5"><label
					class="glabel">爱好：</label> <input type="checkbox" name="hobby">足球
					<input type="checkbox" name="gender" checked="checked">排球 <input
					type="checkbox" name="篮球" checked="checked">篮球 </span>
			</div>
		</div>
		<div class="gtitlebar">
			<span class="title">其他信息</span>
		</div>
		<div class="gform">
			<div class="grow">
				<span class="col-10"> <textarea name="otherContent">${user.otherContent}</textarea>
				</span>
			</div>
		</div>
	</form>

	<div id="for-skill" class="gdropdown shadow">
		<p>
			<span style="margin: 0px 10px"><input type="checkbox">C++</span>
			<span><input type="checkbox">JAVA</span>
		</p>
		<p>
			<span style="margin: 0px 10px"><input type="checkbox">.Net</span>
			<span><input type="checkbox">ORCLE</span>
		</p>
		<p>
			<span style="margin: 0px 13px 0px 10px"><input type="checkbox">IOS</span>
			<span><input type="checkbox">Android</span>
		</p>
	</div>

	<div id="for-school" class="gdropdown shadow">
		<ul class="list">
			<li>广东工业大学</li>
			<li>华南师范大学</li>
			<li>广州大学</li>
			<li>华南理工大学</li>
			<li>中山大学</li>
			<li class="devider"></li>
			<li>其他大学</li>
		</ul>
	</div>

	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/jquery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/base/constants.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/artDialog/dist/dialog-plus-min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/gui/gdropdown/gdropdown.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/uilib/nice-validator/jquery.validator.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/content/js/example/save-or-update-user.js"></script>
		
</body>
</html>
