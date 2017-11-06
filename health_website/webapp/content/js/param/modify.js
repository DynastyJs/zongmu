/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	validator.verify1();
	initEvent();
	if(paramId>0){
		initData();
	}
});
function initData(){
	//赋值
	$.ajax({
		url:Constants.CONTEXT_PATH+'/alarmcon/findById.do?fresh=' + Math.random(),
		data:{id:paramId},
		dataType:'json',
		success:function(data){
			$("#conditionId").val(data.conditionId);
			$("#equipmentTypeId").val(data.equipmentTypeId);
//			$("#producer").val(data.producer);
//			$("#moduleName").val(data.moduleName);
			$("#propertyName").val(data.propertyName);
			$("#expression").val(data.expression);
			$("#alarmResult").val(data.alarmResult);
			$("#alarmLevel").val(data.alarmLevel);
			$("#alarmDesc").val(data.alarmDesc);
		},
		error:function(){
			layer.alert('请求服务器出错！',{icon: 2});
		}
	});
}


function initEvent(){
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/netstatus/getAllAlarmResult.do?fresh=" + Math.random(),
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			var i, len, data = {value: []};

	            if(!json || !json.data || json.data.length == 0) {
	                return false;
	            }

                len = json.data.length;
				var options ='<option value="">--全部--</option>';
	            for (i = 0; i < len; i++) {
	                options += '<option>'+json.data[i]+'</option>';
	            }
	            $('#alarmResult').html(options);
	        	if(alarmType!=''){
	        		$('#alarmResult').val(alarmType);
	        		alarmType='';
	        	}
		}
	});
	$.ajax({
		url:Constants.CONTEXT_PATH+'/home/getAllSysEquProperties.do',
		dataType:'json',
		async:false,
		success:function(result){
			if(result.data&&result.data.length>0){
				var options ='<option value="">--请选择--</option>';
				 for (i = 0; i < result.data.length; i++) {
		            options += '<option value="'+result.data[i]+'">'+result.data[i]+'</option>';
		        }  
		        $("#propertyName").append(options);
			}
		},
		error:function(){
			layer.alert('请求服务器出错！',{icon: 2});
		}
	});
	
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/netstatus/getAllEquipType.do",
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			var i, len, data = {value: []};
	
	            if(!json || !json.data || json.data.length == 0) {
	                return false;
	            }
	
                len = json.data.length;
				var options ='<option value="-1">--全部--</option>';
	            for (i = 0; i < len; i++) {
	                options += '<option value='+json.data[i][0]+'>'+json.data[i][2]+'</option>';
	            }
	            $('#equipmentTypeId').html(options);
		}
	});
	
}

/**
 * 弹出窗
 */
var popUpWindow = {
	/**
	 * 初始化弹出窗内容
	 */
	initWin:function(){
		this.emptyWin();
	},
	/**
	 * 清空弹出窗内容
	 */
	emptyWin:function(){
		$("#conditionId").val('');
		$("#equipmentTypeId").val(-1);
//		$("#producer").val('-1');
//		$("#moduleName").val('-1');
		$("#propertyName").val('');
		$("#expression").val('');
		$("#alarmResult").val('');
		$("#alarmLevel").val('');
		$("#alarmDesc").val('');
	}	
}

/**
 * 提交信息
 */
var postData = {
	conditionId : function(){
		return $("#conditionId").val();
	},
	equipmentTypeId : function(){
		return $("#equipmentTypeId").val()||'-1';
	},
	producer : function(){
//		return $("#producer").val();
		return '-1';
	},
	moduleName : function(){
//		return $("#moduleName").val();
		return '-1';
	},
	propertyName : function(){
		return $("#propertyName").val();
	},
	expression : function(){
		return $("#expression").val();
	},
	alarmResult : function(){
		return $("#alarmResult").val();
	},
	alarmLevel : function(){
		return $("#alarmLevel").val();
	},
	alarmDesc : function(){
		return $("#alarmDesc").val();
	},
	/**
	 * 提交操作
	 * @param type
	 */
	postAciton:function(){
		var data = null;
		var url = null;
		if(paramId>0){
			url = Constants.CONTEXT_PATH+'/alarmcon/update.do';
			data = {
				'conditionId': postData.conditionId(),
				'equipmentTypeId':postData.equipmentTypeId(),
				'producer':postData.producer(),
				'moduleName':postData.moduleName(),
				'propertyName':postData.propertyName(),
				'expression':postData.expression(),
				'alarmResult':postData.alarmResult(),
				'alarmLevel':postData.alarmLevel(),
				'alarmDesc':postData.alarmDesc()
			}
		}else{//编辑组织结构

			url = Constants.CONTEXT_PATH+'/alarmcon/save.do';
			data = {
				'equipmentTypeId':postData.equipmentTypeId(),
				'producer':postData.producer(),
				'moduleName':postData.moduleName(),
				'propertyName':postData.propertyName(),
				'expression':postData.expression(),
				'alarmResult':postData.alarmResult(),
				'alarmLevel':postData.alarmLevel(),
				'alarmDesc':postData.alarmDesc()
			}
		}
		$.ajax({
			async:false,
			data:data,
			dataType:'json',
			type:'POST',
			url:url,
			success:function(data){
				if(data.ret == 1){
					top.layer.alert(data.msg,{icon: 1});
					return true;
				}else{
					top.layer.alert(data.msg,{icon: 1});
					return false;
				}
			},
			error:function(){
				top.layer.alert("请求服务器失败！",{icon: 0});
				return false;
			}
		});
	}
}

/**
 * 验证规则
 */
var validator = {
	/**
	 * 验证填写1
	 */
	verify1:function(){
		$("#alarmconwin").validator({
		    fields: {
		        'propertyName': 'required',
		        'expression': 'required',
		        'alarmResult': 'required',
		        'alarmLevel': 'required',
		        'alarmDesc':'required'
		    }
		});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass:function(){
		var isValid = false;
		$('#alarmconwin').isValid(function(v){    
		    if(v){
		    	isValid = true;
		    }
		});
		return isValid;
	}
	
};


