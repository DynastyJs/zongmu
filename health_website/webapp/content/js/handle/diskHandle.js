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
			FPEquipmentStatus(equipmentId,propertyName,"0","focusFlag",1,false);
		}else{ //取消关注
			FPEquipmentStatus(equipmentId,propertyName,"0","focusFlag",0,true);
		}
	});

//	var checked = $('#repairFlag').is(":checked");
//	if(checked) { //已报修
//		$('#maskBtn').removeAttr('disabled');
//	}else{
//		$('#maskBtn').prop('disabled','disabled');
//	}

	$('#repairFlag').change(function() {
		var checked = $(this).is(":checked");
		if(checked) { //已报修
//			$('#maskBtn').removeAttr('disabled');

			FPEquipmentStatus(equipmentId,propertyName,"0","repairFlag",1,false);
		}else{ //取消已报修
//			$('#maskBtn').prop('disabled','disabled');
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
	var netStatus ='',diskSpace='',diskStatus = '',equipmentName='',netAddress='',producer='';
	$.ajax({
		async : false,
		url : Constants.CONTEXT_PATH + '/sysdev/findById.do?timestamp='+new Date(),
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
			equipmentName = data.name;
			netAddress = data.netAddress;
			producer = data.producer;

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
				url : Constants.CONTEXT_PATH + '/mask/findByEquIdAndProperty.do',
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
			var myhtml='';
			$.ajax({
				async: false,
				url: Constants.CONTEXT_PATH + '/equstatus/getListByEquId.do?fresh=' + Math.random(),
				data: {
					id: $('#equipmentId').val()
				},
				dataType: 'json',
				success: function (data) {
					var ret = '',diskarr='',statusarr='';
					for (var i = 0; i < data.data.length; i++) {
						var value = data.data[i].propertyValue;
						var name = data.data[i].propertyName;
						if(typeof(value)=='object'){
							var arr = eval(value);
							value = '';
							if(name=="硬盘空间"){
								diskarr = arr;
								continue;
							}else if(name=="硬盘状态"){
								statusarr = arr;
								continue;
							}
			
						}
						if(value.length>20){
							value=value.substr(0,20)+'...';
						}
						if(data.data[i].alarmEventViewID == ""){/*style="width:70px;disply:inline-block;text-align:right;color:#666;"*/
							ret ='<div class="hardwareInfo"><span class="leftAlign">'+ data.data[i].propertyName + ':</span><span class="rightAlign" title="'+data.data[i].propertyValue+'"> ' + value+'</span></div>' ;			
						}else{ //这种状态有告警
							ret ='<div class="hardwareInfo"><span class="leftAlign">'+ data.data[i].propertyName + ':</span><span class="rightAlign" title="'+data.data[i].propertyValue+'" style="color:red;"> ' + value+'</span></div>' ;
						}	
						if(name=="网络状态"){
							netStatus = ret;
							continue;
						}
						myhtml+=ret;
					}
					$.each(statusarr, function(i, item) {						
						if(item.status == "正常"){
							diskStatus +=	item.name + ': ' + item.status+ "";
						}else{ //这种状态有告警
							diskStatus += "<span style='color:red'>"+item.name + ': ' + item.status +"</span>";
						}
						diskStatus+="&nbsp;&nbsp;&nbsp;&nbsp;"+"总存储空间"+diskarr[i].total+",剩余存储空间"+diskarr[i].available+",序列号"+diskarr[i].diskSerialNum+";<br/>"
					})
					var basehtml ="<tr><td>设备名称："+equipmentName+"</td><td>"+netStatus+"</td><td>设备品牌："+producer+"</td><td>IP地址："+netAddress+"</td></tr>";
					$("#equinfo").append(basehtml);
					$("#equiParam").append(diskStatus);
					$("#equiParam").append(myhtml);
				/*	var myhtml = '<td><div style="width:100%;padding-left:20px;">'+ equipmentName+"&nbsp;&nbsp;&nbsp;&nbsp;"+netStatus+producer +"&nbsp;&nbsp;&nbsp;&nbsp;"+netAddress+"</br>";
					myhtml+=diskStatus;
					$('#diskinfo').append(myhtml+'</div></td>');*/
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
			dataType : 'json',
			type:'post',
			url : url,
			success : function(data) {
				if (data.ret == 1) {
					layer.alert(data.msg, {
						icon : 1
					});
					top.layer.closeAll();//关闭处理窗口
					if(parent.serverTable){
						parent.serverTable.refreshTb();
					}else if(parent.alarmTable){
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

