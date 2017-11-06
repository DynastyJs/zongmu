$(function() {
	_init.initEvent();
	_init.initBaseData();
	_init.initParamData();
});

var _init = {
	initEvent:function(){
		/**
		 * 扩展jq对象方法，按格式输出
		 * 检测到拥有该方法时不为空时按格式输出
		 */
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
		/**
		 * 注册刷新事件
		 */
		$('#refresh').bind('click',function(){
			_init.initBaseData();
			_init.initParamData();
		});
	},
	/**
	 * 加载基本信息
	 */
	initBaseData:function(){
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
	},
	/**
	 * 加载参数信息
	 */
	initParamData:function(){
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
	}
}

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
