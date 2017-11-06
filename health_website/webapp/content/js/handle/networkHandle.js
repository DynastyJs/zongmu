var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
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
	$('#processResult').append( createSelectOptions('DEAL_RESULT'));
	$('#focusFlag').change(function() {
		var checked = $(this).is(":checked");
		if(checked) { //关注
			FPEquipmentStatus(selectedEquipmentId,"网络状态","0","focusFlag",1,false);
		}else{ //取消关注
			FPEquipmentStatus(selectedEquipmentId,"网络状态","0","focusFlag",0,false);
		}
	});
//	var checked = $('#repairFlag').is(":checked");
//	if(checked) { //已报修
//		$('#maskBtn').removeAttr('disabled');
//	}else{
//		//$('#unmaskBtn').click();
//		$('#maskBtn').prop('disabled','disabled');
//	}

	$('#repairFlag').change(function() {
		var checked = $(this).is(":checked");
		if(checked) { //已报修
//			$('#maskBtn').removeAttr('disabled');
			FPEquipmentStatus(selectedEquipmentId,"网络状态","0","repairFlag",1,false);
		}else{ //取消已报修
//			$('#maskBtn').prop('disabled','disabled');
			$('#unmaskBtn').click();
			FPEquipmentStatus(selectedEquipmentId,"网络状态","0","repairFlag",0,true);
		}
	});

	$('#testBtn').click(function(){
		var index = layer.load(1, {
		   shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
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
				layer.close(index);
			},
			error : function(data) {
				$("#pingResult").val(data.responseText);
				layer.close(index);
			}
		});
	});
	
//	/**旁路时长文本框验证用开始**/
//	$('#maskTime').focus(function(){
//		$(this).css('color','black').val("");
//		
//	})
//	$('#maskTime').blur(function(){
//		var reg=/^\+?[1-9][0-9]*$/
//		var mess='请输入正整数值';
//		if(!reg.test($(this).val())){
//			$(this).val("");
//			$(this).css('color','red').val(mess);
//			$('#maskBtn').attr('disabled','disabled');
//			return;
//		}
//		$('#maskBtn').removeAttr('disabled');
//	});
	
	$('#maskBtn').click(function(){
		var checked = $('#repairFlag').is(":checked");
		if(!checked) { //已报修
			layer.alert('请您先报修，再旁路！', {icon : 0});
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
					equipmentId:$('#equipmentId').val(),
					equipmentPropertyName:'网络状态',
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
				propertyName : '网络状态'
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
		url : Constants.CONTEXT_PATH + '/netstatus/findById.do?fresh=' + Math.random(),
		data : {
			id : selectedEquipmentId
		},
		dataType : 'json',
		success : function(data) {
			if(!data){
				return ;
			}
			$("#orgId").val(data.orgId);
			$("#alarmId").val(data.alarmId);
			$("#pathName").text(data.equipmentName);
			$("#equipmentTypeName").text(data.equipmentTypeName);
			$("#netAddress").text(data.netAddress);
			$("#netStatus").text(data.netStatus);
			$("#equipmentId").val(data.equipmentId);

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

			// 赋值
			$.ajax({
				async : false,
				url : Constants.CONTEXT_PATH + '/mask/findByEquIdAndProperty.do?fresh=' + Math.random(),
				data : {
					equipmentId : selectedEquipmentId,
					propertyName : '网络状态'
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
		},
		error : function() {
			layer.alert('请求服务器出错！', {
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
//			FPEquipmentStatus(selectedEquipmentId,"网络状态","0","repairFlag",0,'',false);
//		}
		//把这个设备的这个类型（“网络状态”）的告警全部设为 processResult

		data = {
			'ids' :'',
			'equipmentId':selectedEquipmentId,
			'propertyName':'网络状态',
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
					if(parent.serverTable){
						parent.serverTable.refreshTb();
					}else{
						if(parent.alarmTable){
							parent.alarmTable.refreshTb();
						}
					}
					top.layer.closeAll();//关闭处理窗口
					return true;
				} else {
					layer.alert(data.msg, {
						icon : 1
					});
					return false;
				}
			},
			error : function() {
				layer.alert("请求服务器失败！", {
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
		$("#networkwin").validator({
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
		$('#networkwin').isValid(function(v){
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
