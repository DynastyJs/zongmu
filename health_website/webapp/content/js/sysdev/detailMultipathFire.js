$(function() {
	_init.initEvent();
	_init.initBaseData();
	_init.initPathName();
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
			_init.initPathName();
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
				$('#producer').text(data.producer);
				$('#equimentName').text(data.name);
			},
			error:function(){
				layer.alert("请求服务器出错！", {icon : 0});
			}
		});
	},
	/**
	 *加载回路名称 
	 */
	initPathName:function(){
		$.ajax({
			async:true,
			url:Constants.CONTEXT_PATH + '/sysdev/getMultiPathName?fresh=' + Math.random(),
			data:{
				equipmentId:equipmentId
			},
			dataType:'json',
			success:function(res){
				if(res.length>0){
					for(var i in res){//查询不到的则按照默认回路名称显示
						$('.path'+res[i].multiLoopReNameId.orderNo).text(res[i].name);
					}
				}
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
				$('#equInfo [name="检测器状态"]').each(function(){
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
		if(value==1){
			$(ele).siblings('[name="检测器状态"]').text('断线').css('color','red');
		}
		return '';
	},
	sensorShortCircuit:function(value,ele){
		if(value==1)
			$(ele).siblings('[name="检测器状态"]').text('短路').css('color','red');
		return '';
	},
	sensorStatus:function(value,ele){
		var index = 'unknow';
		if(value==0) {
			index = '正常';
			$(ele).css('color','#333');
		}else {
			index = '告警';
			$(ele).css('color','red');
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
	}
}
/**
 * 方法集合
 */
var _util  = {
	/**
	 * 修改回路名称 modifyPathName 
	 * @param order 回路序号
	 */
	modifyPathName:function(order){
		var $ele = $('.path'+order);
		var index = layer.open({
			  type: 1,
			  title:'修改回路'+order+'名称',
			  skin: 'layui-layer-rim', //加上边框
			  area: ['400px', '160px'], //宽高
			  content: '<div class="col-4 padding-large card-5 block-center" style="margin:10px 10px" id="modifyPathName"><div class="form-group"><label style="float:left;margin-right:5px">回路名称:</label><input type="text" class="form-control" style="width:150px" name="newPathName" id="newPathName" placeholder="请输入回路名称(不超过10个字)" value="'+$ele.text()+'"></div></div>',
			  btn: ['确定','取消'],
			  yes:function(index, layero){
					_validator.verify();
					if(_validator.isPass()){
						$.ajax({
							url:Constants.CONTEXT_PATH+"/sysdev/modifyPathName",
							type:"POST",
							dataType:'json',
							data:{
								equipmentId:equipmentId,
								orderNo:order,
								name:$('#newPathName').val()
							},
							success:function (data) {
								if(data.ret==1){
									layer.alert(data.msg,{icon: 1});
									$ele.text($('#newPathName').val());
									layer.close(index);
								}else{
									layer.alert(data.msg,{icon: 0});
								}
					        },
					        error:function(){
					        	layer.alert('系统出错!',{icon: 2});
					        }
						});
					}
				}
			});
	}
}
/**
 * 验证规则
 */
var _validator = {
	/**
	 * 验证填写：修改回路名称
	 */
	verify:function(){
		$("#modifyPathName").validator({
			rules: {        
				isNameTooLong:function(element){
					return $(element).val().length<11;
				}
			}, 
			messages: {        
				required: "回路名称不能为空",
				isNameTooLong:"回路名称不能超过10个字"
			},
		    fields: {
		        'newPathName': 'required;isNameTooLong'
		    }
		});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass:function(){
		var isValid = false;
		$('#modifyPathName').isValid(function(v){    
		    if(v){
		    	isValid = true;
		    }
		});
		return isValid;
	}
};