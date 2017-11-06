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
				$('#producer').text(data.producer);
				$('#equimentName').text(data.name);
			},
			error:function(){
				layer.alert("请求服务器出错！", {icon : 0});
			}
		});
		//加载回路名称 
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
		//加载参数信息
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
	 * 验证填写：修改回路名称
	 */
	verify2:function(){
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
	},
	/**
	 * 判断回路名称验证是否通过
	 */
	isPass2:function(){
		var isValid = false;
		$('#modifyPathName').isValid(function(v){    
		    if(v){
		    	isValid = true;
		    }
		});
		return isValid;
	}
};
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
					_validator.verify2();
					if(_validator.isPass2()){
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