
$(function() {
	initData();
	initEvent();
	validator.verify1();
	isValid = false;// 验证标记
	$("[data-rightcode]").each(function(){
		var $em = $(this);
		var rightCode = $em.data("rightcode");
		if(top.checkRight(rightCode)){
    		$em.css('display','inline-block');
		}
  	});
});

function initEvent(){
	$('#focusFlag').change(function() {
		var checked = $(this).is(":checked");
		if(checked) { //关注
			FPEquipmentStatus(equipmentId,propertyName,"0","focusFlag",1,false);
		}else{ //取消关注
			FPEquipmentStatus(equipmentId,propertyName,"0","focusFlag",0,true);
		}
	});

	var checked = $('#repairFlag').is(":checked");
	if(checked) { //已报修
		$('#maskBtn').removeAttr('disabled');
	}else{
		$('#maskBtn').prop('disabled','disabled');
	}

	$('#repairFlag').change(function() {
		var checked = $(this).is(":checked");
		if(checked) { //已报修
			$('#maskBtn').removeAttr('disabled');

			FPEquipmentStatus(equipmentId,propertyName,"0","repairFlag",1,false);
		}else{ //取消已报修
			$('#maskBtn').prop('disabled','disabled');
			//取消旁路
			$('#unmaskBtn').click();
			FPEquipmentStatus(equipmentId,propertyName,"0","repairFlag",0,true);
		}
	});

	$('#testBtn').click(function(){
		$("#pingResult").val('');
		if( $('#lsize').val() == ""){
			$('#lsize').val(32);
		}
		params = "-l "+ $('#lsize').val() +" -n "+  $('#packageNum').val();
		$.ajax({
			url : Constants.CONTEXT_PATH + '/netstatus/pingTest.do',
			type:'post',
			data : {
				ip : $('#netAddress').html(),
				param : params
			},
			dataType : 'json',
			success : function(data) {
				$("#pingResult").val(data);
			},
			error : function(data) {
				$("#pingResult").val(data.responseText);
			}
		});
	});

	$('#maskBtn').click(function(){
		var checked = $('#repairFlag').is(":checked");
		if (!checked) { // 已报修
			ShowLayerWarn('请您先报修，再旁路！');
			return;
		}
		var reg=/^\+?[1-9][0-9]*$/
		if(!reg.test($('#maskTime').val())){
			ShowLayerWarn('不合法的旁路时长！只能输入正整数值');
			return;
		}
		if(top.getMaxMaskTime()!=''&&parseInt($('#maskTime').val())>parseInt(top.getMaxMaskTime())){
			ShowLayerWarn('不能超过旁路时长的最大时限'+top.getMaxMaskTime()+'小时!');
			return;
		}
		$.ajax({
			url : Constants.CONTEXT_PATH+ "/mask/saveEquByProperty.do",
			type:'POST',
			data:{
				orgId : $('#orgId').val(),
				equipmentId:equipmentId,
				equipmentPropertyName:propertyName,
				isMask:1,
				maskTime:$("#maskTime").val()
			},
			dataType : 'json',
			success : function(data) {
				layer.alert(data.msg, {icon : 1});
				$('#maskId').val(data.maskId);
				$('#maskBtn').hide();
				$('#unmaskBtn').show();
			},
			error : function() {
				layer.alert('请求服务器出错！', {icon : 2});
			}
		});
	});

	$('#unmaskBtn').click(function(){
		if($("#maskTime").val()==''){
			$('#maskBtn').show();
			$('#unmaskBtn').hide();
			$("#maskTime").val('');
			return;
		}
		$.ajax({
			url : Constants.CONTEXT_PATH + '/mask/deleteByEquAndProperty.do',
			type:'POST',
			data : {
				ids : $('#maskId').val(),
				propertyName : propertyName
			},
			dataType : 'json',
			success : function(data) {
				layer.alert(data.msg, {icon : 1});
				$('#maskBtn').show();
				$('#unmaskBtn').hide();
				$("#maskTime").val('');
			},
			error : function() {
				layer.alert('请求服务器出错！', {icon : 2});
			}
		});
	});
	$('#confirmBtn').click(function(){
		if (validator.isPass()) {
			layer.confirm('要确认报警信息么？（建议故障修复后再确认报警）', {
			  icon:3,
			  btn: ['是','否'] //按钮
			}, function(index1){
				layer.close(index1);
				postData.postAciton();
			}, function(){
	
			});
			
		}
	});
}

function initData(){
	$.ajax({
		async : false,
		url : Constants.CONTEXT_PATH + '/sysdev/findById.do?fresh=' + Math.random(),
		data : {
			id : equipmentId
		},
		dataType : 'json',
		success : function(data) {
			if(!data){
				return ;
			}
			$("#orgId").val(data.orgId);
			$("#orgName").text(data.orgName);
			$("#equipmentName").text(data.name);
			$("#equipmentTypeName").text(data.equipmentTypeName);
			$("#netAddress").text(data.netAddress);
			$("#netStatus").text(data.netStatus);
			$("#equipmentId").val(data.equipmentId);
			$('#propertyName').val(data.propertyName);

			//设置关注报修初始状态
			$.ajax({
				async : false,
				url : Constants.CONTEXT_PATH + '/focuRepair/getFPStatus',
				data : {
					equipmentId : equipmentId,
					propertyName : propertyName,
					type:'0'
				},
				dataType : 'json',
				success : function(data) {
					switch (data.focusFlag){
						case "0" :{
							$('#focusFlag').prop("checked",false);
							break;
						}
						case "1":{
							$('#focusFlag').prop("checked",true);
							break;
						}
						default :{
							$('#focusFlag').prop("checked",false);
							break;
						}
					}
					switch (data.repairFlag){
						case "0" :{
							$('#repairFlag').prop("checked",false);
							break;
						}
						case "1":{
							$('#repairFlag').prop("checked",true);
							break;
						}
						default :{
							$('#repairFlag').prop("checked",false);
							break;
						}
					}
				}
			});
			// 赋值
			$.ajax({
				async : false,
				url : Constants.CONTEXT_PATH + '/mask/findByEquIdAndProperty.do?fresh=' + Math.random(),
				data : {
					equipmentId : equipmentId,
					propertyName : propertyName
				},
				dataType : 'json',
				success : function(data) {
					if(data.data&&data.data.length>0){
						$("#maskTime").val(data.data[0].maskTime);
						$("#maskId").val(data.data[0].maskId);
						$('#maskBtn').hide();
						$('#unmaskBtn').show();
					}else{
						$('#unmaskBtn').hide();
					}
				},
				error : function() {

				}
			});
			$.ajax({
				async: false,
				url: Constants.CONTEXT_PATH + '/equstatus/getListByEquId.do?fresh=' + Math.random(),
				data: {
					id: $('#equipmentId').val()
				},
				dataType: 'json',
				success: function (data) {
					var ret = '';
					for (var i = 0; i < data.data.length; i++) {
						if(data.data[i].alarmEventViewID == ""){
							ret += data.data[i].propertyName + ': ' + data.data[i].propertyValue + ";  ";
						}else{ //这种状态有告警
							ret += "<span style='color:red'>"+data.data[i].propertyName + ': ' + data.data[i].propertyValue +";  " +"</span>";
						}
					}
					$('#diskinfo').html(ret);
				},
				error: function () {
					layer.alert('请求出错！', {
						icon: 2
					});
				}
			});
		},
		error : function() {
			parent.layer.alert('请求服务器出错！', {
				icon : 2
			});
		}
	});
}

/**
 * 提交信息
 */
var postData = {
	alarmId : function() {
		return $("#alarmId").val();
	},
	processResult : function() {
		return $("#processResult").val();
	},
	processDesc : function() {
		return $("#processDesc").val();
	},
	/**
	 * 提交操作
	 *
	 * @param type
	 */
	postAciton : function() {
		var data = null;
		var url = null;

//		if(postData.processResult() == "恢复正常" ){
//			//设置已报修为 "0"
//			FPEquipmentStatus(equipmentId,propertyName,"0","repairFlag",0);
//		}
		//把这个设备的这个类型（“网络状态”）的告警全部设为 processResult

		data = {
			'ids' :'',
			'equipmentId':equipmentId,
			'propertyName':propertyName,
			'processResult' : postData.processResult(),
			'processDesc':postData.processDesc(),
			'processFlag':1
		}
		url = Constants.CONTEXT_PATH + '/alarmexd/setEqmAlarmDone.do';

		$.ajax({
			async : false,
			data : data,
			type:'post',
			dataType : 'json',
			url : url,
			success : function(data) {
				if (data.ret == 1) {
					layer.alert(data.msg, {
						icon : 1
					});
					top.layer.closeAll();//关闭处理窗口
					if(parent.alarmTable){
						parent.alarmTable.refreshTb();
					}
					return true;
				} else {
					parent.layer.alert(data.msg, {
						icon : 1
					});
					return false;
				}
			},
			error : function() {
				parent.layer.alert("请求服务器失败！", {
					icon : 0
				});
				return false;
			}
		});
	}
};

/**
 * 验证规则
 */
var validator = {
	/**
	 * 验证填写1
	 */
	verify1 : function() {
		$("#devicewin").validator({
			rules: {
				chinese: [/^[\w\u0391-\uFFE5，；。！]+$/, '只能输入中文、字母、数字和[，；。！]!']
			},
			fields : {
				'processResult' : 'required',
				'processDesc' : 'required;length[0~255];chinese;'
			}
		});
//		$("#maskwin").validator({
//			fields : {
//				'maskTime' : 'required;range[0~10000]'
//			}
//		});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass : function() {
		var mark = false;
		$('#devicewin').isValid(function(v){
			if(v){
				mark = true;
			}
		});
		return mark;
	},
	/**
	 * 判断验证是否通过
	 */
	isPass1 : function() {
		var mark = false;
		$('#maskwin').isValid(function(v){
			if(v){
				mark = true;
			}
		});
		return mark;
	}

};

///**
// * 关注或报修 操作
// * @param flag 标识关注还是报修
// * @param status 1 0
// * @param prestatus 失败之后回到之前状态
// * @constructor
// */
//function FPEquipmentStatus(flag,status,prestatus){
//	dcmId = "#"+flag;
//	var data ={
//		equipmentId:equipmentId,
//		flag:flag,
//		status:status,
//		propertyName:propertyName
//	};
//	url =  Constants.CONTEXT_PATH + '/equstatus/FPEquipmentStatus.do';
//	$.ajax({
//		data :data,
//		url: url,
//		success :function(data){
//			if(data.ret != 1){
//				$(dcmId).prop("checked",prestatus);
//			}
//		},
//		error: function () {
//			$(dcmId).prop("checked",prestatus);
//			layer.alert("请求服务器失败！", {
//				icon : 0
//			});
//			return false;
//		}
//	});
//}

