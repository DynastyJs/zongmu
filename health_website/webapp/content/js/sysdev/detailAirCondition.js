$(function() {
	// 设备信息全局变量
	var equipmentInfo={}; 
	
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
				equipmentInfo = data;
//				$('#netAddress').text(data.netAddress);
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
			success: function (json) {
                if (!json || !json.data || json.data.length == 0) {
                    return false;
                }
                var ret = '';
                for (var i = 0; i < json.data.length; i++) {
                	if(json.data[i].propertyName=="出风温度"){
                		$('#temperatureOne').text((json.data[i].propertyValue*1).toFixed(2));
                	}
                	if(json.data[i].propertyName=="回风温度"){
                		$('#temperatureTwo').text((json.data[i].propertyValue*1).toFixed(2));
                	}
                	if(json.data[i].propertyName=="空调通信中断告警"){
                		if((json.data[i].propertyValue*1).toFixed(0)==1){
                			$('#netStatus').html('<font color="red">中断</font>');
                		}
                	}
                }
			},
			error:function(){
				layer.alert("请求服务器出错！", {icon : 0});
			}
		});
	}
}

/*
 * 设置按钮点击事件
 */
function btnClickEvent(instr){
	var interval = setInterval( function() {
		$.ajax({  
			url : Constants.CONTEXT_PATH + '/fire_param/tips',
			method : "POST",
			success : function(data) {
				$('#bottomTips').html(data.bottomTips);
//				$('#processTips').html(data.totalTips);
				var rows = data.eachRowTips;
				for(var key in rows){
					$('#'+key.substr(4)).html(rows[key])
				}
			}
		})
	},1500);
	$.ajax({
		url:Constants.CONTEXT_PATH + '/fire_param/setFireParam.do',
		data:getData(instr),
		method : "POST",
		dataType : 'json',
		traditional: true,
		success : function(data) {
			if(data.ret){
				// $('.layui-layer-btn0').trigger('click');
				layer.msg(data.message);
				setTimeout(function(){  // 3秒后停止获取设置参数进度
					clearInterval(interval);
				},1500);
			}else{
				layer.msg(data.message);
				setTimeout(function(){  // 2秒后停止获取设置参数进度
					clearInterval(interval);
				},1500);
			}
		},
		error : function() {
			clearInterval(interval);
			layer.close(layer.index);
			layer.msg("设置失败！",{time:2000})
		}
	})
	var loadingContent="<span id='getParams' class='layui-layer-content layui-layer-loading1'>修改设置中...</span>";
	var loadingMask =layer.msg(loadingContent, {
		  icon: 16 ,
		  time:0,
		  shade: 0.1,
	});
}

function getData(instr){
	var param={};
	switch(instr){
	case 'airOn':
		param['0415201001']=1;
		break;
	case 'airOff':
		param['0415202001']=1;
		break;
	case 'tempOne':
		param['0415203001']=1;
		break;
	case 'tempTwo':
		param['0415204001']=1;
		break;
	case 'tempThree':
		param['0415205001']=1;
		break;
	}
	var temp=[];
	var equipment = {};
	equipment["deviceId"] = equipmentInfo.equipmentId;
	equipment["c3mDeviceId"] = equipmentInfo.c3MDeviceId;
	equipment["fsuIp"] = equipmentInfo.netAddress;
	equipment["fsuPort"] = equipmentInfo.netPort;
	equipment["fsuId"] = equipmentInfo.fsuId;
	equipment["orgId"]=equipmentInfo.orgId;
	temp[0]=equipment;
	param["equipmentIds"]=JSON.stringify(temp);
	return param;
}