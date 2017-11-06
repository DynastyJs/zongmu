var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
var fsuId = null;moduleName=null;
$(function() {
	_init.initData();
	_init.initEvent();
	_validator.verify1();
	isValid = false;// 验证标记
	$("[data-rightcode]").each(function(){
		var $em = $(this);
		var rightCode = $em.data("rightcode");
		if(top.checkRight(rightCode)){
    		$em.css('display','inline-block');
		}
  	});
});
var _init = {
	initEvent:function(){
		$('#processResult').append( createSelectOptions('DEAL_RESULT'));
		$('#focusFlag').change(function() {
			var checked = $(this).is(":checked");
			if(checked) { //关注
				FPEquipmentStatus(equipmentId,propertyName,"0","focusFlag",1,false);
			}else{ //取消关注
				FPEquipmentStatus(equipmentId,propertyName,"0","focusFlag",0,true);
			}
		});

		$('#repairFlag').change(function() {
			var checked = $(this).is(":checked");
			if(checked) { //已报修
			//	$('#maskBtn').removeAttr('disabled');

				FPEquipmentStatus(equipmentId,propertyName,"0","repairFlag",1,false);
			}else{ //取消已报修
			//	$('#maskBtn').prop('disabled','disabled');
				//取消旁路
				$('#unmaskBtn').click();
				FPEquipmentStatus(equipmentId,propertyName,"0","repairFlag",0,true);
			}
		});

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
			if (_validator.isPass()) {
				layer.confirm('要确认报警信息么？（建议故障修复后再确认报警）', {
				  icon:3,
				  btn: ['是','否'] //按钮
				}, function(index1){
					layer.close(index1);
					_postData.postAciton();
				}, function(){
		
				});
				
			}
		});
	},
	initData:function(){
		_init.initEquipmentInfo();
		_init.initFPStatus();
		_init.initMaskData();
	},
	/**
	 * 查询设备详情信息
	 */
	initEquipmentInfo:function(){
		//扩展jq对象方法，按格式输出,检测到拥有该方法时不为空时按格式输出
		jQuery.fn.extend({
			formatter:function(value){
				var functionName = $(this).data('formatter');
				if(functionName!=null&&functionName!=''){
					var fun = eval(functionName);
					if(fun!=null){
						$(this).text(fun(value,this));
						return;
					}
				}
				$(this).text(value);
			}
		});
		//加载基础信息
		$.ajax({
			async : true,
			url : Constants.CONTEXT_PATH + '/sysdev/findById.do?fresh=' + Math.random(),
			data : {
				id : equipmentId
			},
			dataType : 'json',
			success : function(data){
				$('#netAddress').text(data.netAddress);
				//$('#netStatus').text(data.netStatus);
				$('#producer').text(data.producer);
				$('#equimentName').text(data.name);
			},
			error:function(){
				layer.alert("请求服务器出错！", {icon : 0});
			}
		});
		//加载参数信息
		$.ajax({
			async: true,
			url: Constants.CONTEXT_PATH + '/equstatus/getListByEquId.do?fresh=' + Math.random(),
			data: {
				id: equipmentId
			},
			dataType: 'json',
			success: function (res) {
				$('#equInfo [name="检测器线路状态"]').each(function(){
					$(this).text('正常').css('color','#333');
				});
				$('#equInfo [name="电流状态情况"]').each(function(){
					$(this).text('正常').css('color','#333');
				});
				$('#equInfo [name="电压状态情况"]').each(function(){
					$(this).text('正常').css('color','#333');
				});
				for(var i in res.data){
					$('#equInfo [name="'+res.data[i].propertyName+'"').each(function(){
						if(typeof(res.data[i].propertyValue*1)!='string'){
							$(this).formatter( Number(res.data[i].propertyValue).toFixed(2));//强转
						}
					});
					
				}
			},
			error:function(){
				layer.alert("请求服务器出错！", {icon : 0});
			}
		});
	},
	/**
	 * 设置关注报修初始状态
	 */
	initFPStatus:function(){
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
	},
	/**
	 * 赋值
	 */ 
	initMaskData:function(){
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
	}
}

/**
 * 提交信息
 */
var _postData = {
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
		data = {
			'ids' :'',
			'equipmentId':equipmentId,
			'propertyName':propertyName,
			'processResult' : _postData.processResult(),
			'processDesc':_postData.processDesc(),
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
					parent.layer.alert(data.msg, {
						icon : 1
					});
					top.layer.closeAll();//关闭处理窗口
					parent.alarmTable.refreshTb();
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
var _validator = {
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
/**
 * 格式函数
 */
var format = {
	sensorlineBreak:function(value,ele){
		if(value==1)
			$(ele).siblings('[name="检测器线路状态"]').text('断线').css('color','red');
		return '';
	},
	sensorShortCircuit:function(value,ele){
		if(value==1)
			$(ele).siblings('[name="检测器线路状态"]').text('短路').css('color','red');
		return '';
	},
	sensorStatus:function(value,ele){
		var index = 'unknown';
		value=parseInt(value);
		switch(value){
		case 0:index = '正常';$(ele).css('color','#333');break;
		case 1:index = '告警';$(ele).css('color','red');break;
		}
		return index;
	},
	sensorValue:function(value){
		return value;
	},
	sensorAlarmValue:function(value,ele){
		var $alarmEle = $(ele).siblings('[data-formatter="format.sensorProtectedValue"]');
		if(value>$alarmEle.text()){//若检测值大于设定保护值
			$(ele).css('color','red');
			$(ele).next().css('color','red');
		}else{
			$(ele).css('color','#333');
			$(ele).next().css('color','#333');
		}
		return value;
	},
	sensorProtectedValue:function(value,ele){
		var $alarmEle = $(ele).siblings('[data-formatter="format.sensorAlarmValue"]');
		if(value<$alarmEle.text()){//若检测值大于设定保护值
			$alarmEle.css('color','red');
			$alarmEle.next().css('color','red');
		}else{
			$alarmEle.css('color','#333');
			$alarmEle.next().css('color','#333');
		}
		return value;
	},
	sensorTypeForValue:function(value,ele){
		var index = 'unknown';
		if(value==0){
			index = 'mA';
			$(ele).siblings(':first').text('剩余电流测量值：');//做特殊修改
			$(ele).parent().prev().children(':first').text('漏电短路报警：');
			$(ele).parent().prev().prev().children(':first').text('漏电断路检测器：');
		}else{
			index = '℃'
		}
		return index;
	},
	sensorTypeForAlarmValue:function(value,ele){
		var index = 'unknown';
		if(value==0){
			index = 'mA';
			$(ele).siblings(':first').text('剩余电流报警测量值：');//做特殊修改
		}else{
			index = '℃'
		}
		return index;
	},
	underVoltage:function(value,ele){
		var $alarmEle = $(ele).siblings('[data-formatter="format.underVoltageAlarmValue"]');
		var $statusEle = $('#equInfo [name="电压状态情况"][index="'+$(ele).attr('index')+'"]');
		if(value<$alarmEle.text()){//若检测值小于设定保护值
			$(ele).css('color','red');
			$(ele).next().css('color','red');
			$statusEle.text('欠压').css('color','red');
		}else{
			$(ele).css('color','#333');
			$(ele).next().css('color','#333');
		}
		return value;
	},
	overVoltage:function(value,ele){
		var $alarmEle = $(ele).siblings('[data-formatter="format.overVoltageAlarmValue"]');
		var $statusEle = $('#equInfo [name="电压状态情况"][index="'+$(ele).attr('index')+'"]');
		if(value>$alarmEle.text()){//若检测值大于设定保护值
			$(ele).css('color','red');
			$(ele).next().css('color','red');
			$statusEle.text('过压').css('color','red');
		}else{
			$(ele).css('color','#333');
			$(ele).next().css('color','#333');
		}
		return value;
	},
	underVoltageAlarmValue:function(value,ele){
		value = value*100*2.2/100;//(计算公式:220V*value%)先转为整数再进行计算,保证精准.
		var $alarmEle = $(ele).siblings('[data-formatter="format.underVoltage"]');
		var $statusEle = $('#equInfo [name="电压状态情况"][index="'+$(ele).attr('index')+'"]');
		if(value>$alarmEle.text()){//若检测值小于设定保护值
			$alarmEle.css('color','red');
			$alarmEle.next().css('color','red');
			$statusEle.text('欠压').css('color','red');
		}else{
			$alarmEle.css('color','#333');
			$alarmEle.next().css('color','#333');
		}
		return Number(value).toFixed(2);
	},
	overVoltageAlarmValue:function(value,ele){
		value = value*100*2.2/100;//(计算公式:220V*value%)先转为整数再进行计算,保证精准.
		var $alarmEle = $(ele).siblings('[data-formatter="format.overVoltage"]');
		var $statusEle = $('#equInfo [name="电压状态情况"][index="'+$(ele).attr('index')+'"]');
		if(value<$alarmEle.text()){//若检测值大于设定保护值
			$alarmEle.css('color','red');
			$alarmEle.next().css('color','red');
			$statusEle.text('过压').css('color','red');
		}else{
			$alarmEle.css('color','#333');
			$alarmEle.next().css('color','#333');
		}
		return Number(value).toFixed(2);
	},
	overCurrent:function(value,ele){
		var $alarmEle = $(ele).siblings('[data-formatter="format.overCurrentAlarmValue"]');
		var $statusEle = $('#equInfo [name="电流状态情况"][index="'+$(ele).attr('index')+'"]');
		if(value>$alarmEle.text()){//若检测值大于设定保护值
			$(ele).css('color','red');
			$(ele).next().css('color','red');
			$statusEle.text('过流').css('color','red');
		}else{
			$(ele).css('color','#333');
			$(ele).next().css('color','#333');
		}
		return value;
	},
	overCurrentAlarmValue:function(value,ele){
		value = value*1;//(计算公式:100A*value%)
		var $alarmEle = $(ele).siblings('[data-formatter="format.overCurrent"]');
		var $statusEle = $('#equInfo [name="电流状态情况"][index="'+$(ele).attr('index')+'"]');
		if(value<$alarmEle.text()){//若检测值大于设定保护值
			$alarmEle.css('color','red');
			$alarmEle.next().css('color','red');
			$statusEle.text('过流').css('color','red');
		}else{
			$alarmEle.css('color','#333');
			$alarmEle.next().css('color','#333');
		}
		return Number(value).toFixed(2);
	},
	tempMultiplyTwenty:function(value,ele){
		return Number(value).toFixed(2)*20;
	}
}