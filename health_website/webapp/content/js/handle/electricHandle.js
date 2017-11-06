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
	initEquipmentInfo(equipmentId);
	//$('#equinfo').append(initEquipmentInfo(equipmentId));
//	if(fsuId!=null){
//		$.ajax({
//			async : false,
//			url : Constants.CONTEXT_PATH + '/sysdev/getPageList.do?fresh=' + Math.random(),
//			data : {
//	            pageNumber: 1,
//	            pageSize: 10,
//	            search_EQ_fsuId: fsuId,
//	            search_EQ_moduleName:moduleName=="UPS设备"?"智能电表（交流）":"UPS设备"
//			},
//			dataType : 'json',
//			success : function(data) {
//				var result = data.content;
//				for(var i=0;i<result.length;i++){
//					initEquipmentInfo(result[i].equipmentId,1)
//					//$('#equinfo').append(initEquipmentInfo(result[i].equipmentId,1));
//				}
//			}
//		});
//	}
	initFPStatus();
	initMaskData();
}

function initFPStatus(){
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
}

function initMaskData(){
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
}
var fsuId = null;moduleName=null;
function initEquipmentInfo(equId,type){
	var netStatus ='',cpu = '',memory = '',upsUar='',upsdy='',upstempreature='',upsfr='',memory_size='',disk_space='',diskStatus = '',equipmentName='',netAddress='',producer='',Ua='',Ub='',Uc='',ia='',ib='',ic='',f='',upsUa='',upsUb=''
		,upsUc='',upsia='',upsib='',upsic='',upsf='',tempreature = '',humidy = '',upspl='',upslx='',upscs='',upsgz='',upsbj='',upsgj='',upsdcd='',upssd='',upssrgz='',type181='',type182='',type184='',type185='',jlsrtd='',jldygg='',jldygd='';
	$.ajax({
		async : false,
		url : Constants.CONTEXT_PATH + '/sysdev/findById.do?fresh=' + Math.random(),
		data : {
			id : equId
		},
		dataType : 'json',
		success : function(data) {
			if(!data){
				return ;
			}
			$("#orgId").val(data.orgId);
			if(fsuId == null){
				fsuId = data.fsuId;
				moduleName = data.moduleName;
			}
			equipmentName = data.name;
			netAddress = data.netAddress;
			producer = data.producer;
			var equipmentTypeId = data.equipmentTypeId;
			var myhtml='<div>'	+ 
			'<div class="mytitle">基本信息</div>'+
			'<div style="border-top:1px solid #dedede;padding-top: 10px;margin-left: 17px;height: 49px;">'+
				'<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">设备名称：</span><span style="color:#333;">'+equipmentName+'</span></div>'+
				'<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">设备品牌：</span><span style="color:#333;">'+producer+'</span></div>'+
				'<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">网络地址：</span><span style="color:#333;">'+netAddress+'</span></div>'+
			'</div>'+
		  '</div>';
			myhtml+="<div class='mytitle'>硬件信息</div><div style='padding-top: 10px;border-top: 1px solid #dedede;margin-left: 18px;'><div>"
			$.ajax({
				async: false,
				url: Constants.CONTEXT_PATH + '/equstatus/getListByEquId.do?fresh=' + Math.random(),
				data: {
					id: data.equipmentId
				},
				dataType: 'json',
				success: function (data) {
					var ret = '',diskarr='',statusarr='';
					for (var i = 0; i < data.data.length; i++) {
						var value = data.data[i].propertyValue;
						var name = data.data[i].propertyName;
						if(name=="网络状态"){
							if(equipmentTypeId == -2){
								continue;
							}
						}
						if(!isNaN(value)){
							value = Number(value).toFixed(2);
						}
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
						if(name=="CPU使用率"){
							value = value+"%";
						}else if(name=="物理内存使用率"){
							value = value+"%";
						}else if(name=="虚拟内存使用率"){
							value = value+"%";
						}else if(name=="剩余存储空间"){
							value = value+"G";
						}else if(name=="物理内存大小"){
							value = value+"G";
						}else if(name=="虚拟内存容量"){
							value = value+"G";
						}else if(name=="虚拟内存容量"){
							value = value+"G";
						}else if(name=="已使用物理内存"){
							value = value+"G";
						}else if(name=="已使用物理内存"){
							value = value+"G";
						}else if(name=="已用虚拟内存"){
							value = value+"G";
						}else if(name=="环境温度"){
							value = value+"℃";
						}else if(name=="环境湿度"){
							value = value+"%";
						}else if(name=="UPS旁路状态"){
							value = value==0?"逆变/直接输出":"旁通输出";
						}else if(name=="UPS类型"){
							value = value==0?"在线式":"后备式";
						}else if(name=="UPS测试状态"){
							value = value==0?"没有在测试":"正在进行测试";
						}else if(name.indexOf('电压')>-1&&name.indexOf('告警')==-1){
							value = value+"V";
						}else if(name.indexOf('电流')>-1&&name.indexOf('告警')==-1){
							value = value+"A";
						}else if(name.indexOf('频率')>-1&&name.indexOf('告警')==-1){
							value = value+"HZ";
						}else if (name == '门磁开关状态') {
	                    	value = value==0?"关":"开";
	                    }
						if(value.length>10){
							value=value.substr(0,10)+'...';
						}
						if(data.data[i].alarmEventViewID == ""){/*style="width:70px;disply:inline-block;text-align:right;color:#666;"*/
							ret ='<div class="hardwareInfo"><span class="leftAlign">'+ data.data[i].propertyName + ':</span><span class="rightAlign" title="'+data.data[i].propertyValue+'"> ' + value+'</span></div>' ;			
						}else{ //这种状态有告警
							ret ='<div class="hardwareInfo"><span class="leftAlign">'+ data.data[i].propertyName + ':</span><span class="rightAlign" title="'+data.data[i].propertyValue+'" style="display:inline-block;text-align:left;color:red;"> ' + value+'</span></div>' ;
						}
						myhtml+=ret;
					}
					$.each(statusarr, function(i, item) {						
						if(item.status == "正常"){
							diskStatus +=	'<p ><span style="color:#666;">'+item.name + '</span>: <span style="color:#333;">' + item.status +"</span></span>";
						}else{ //这种状态有告警
							diskStatus += "<p '><span style='color:red;color:#666;'>"+item.name + '</span>: <span style="color:#333;">' +item.status +"</span></span>";
						}
						diskStatus+="<span style='color:#333;'>(总存储空间"+diskarr[i].total+",剩余存储空间"+diskarr[i].available+")</span></p>"
					})
					/*var myhtml = '<div style="padding-left:20px;padding-right:20px;"><p>'+ equipmentName+"&nbsp;&nbsp;&nbsp;&nbsp;"+netStatus+"<p/><p>"+producer +"&nbsp;&nbsp;&nbsp;&nbsp;"+netAddress+"</p>";*/
					myhtml+=diskStatus;
					$('#equInfo').append(myhtml+'</div>');			
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
//	var color = type==1?"#c2c2c2":"none";
//	var basehtml ="<tr><td>设备名称："+equipmentName+"</td><td>"+netStatus+"</td><td>设备品牌："+producer+"</td><td>IP："+netAddress+"</td></tr>";
//	$("#equinfo").append(basehtml);
//	var morehtml="<tr><td>"+Ua+"</td><td>"+Ub+"</td></tr>";
//		morehtml+="<tr><td>"+Uc+"</td><td>"+ia+"</td></tr>";
//		morehtml+="<tr><td>"+ib+"</td><td>"+ic+"</td></tr>";
//		morehtml+="<tr><td>"+f+"</td><td>"+upsUar+"</td></tr>";
//		morehtml+="<tr><td>"+upsUa+"</td><td>"+upsia+"</td></tr>";
//		morehtml+="<tr><td>"+upsdy+"</td><td>"+upsf+"</td></tr>";
//		morehtml+="<tr><td>"+upstempreature+"</td><td>"+upssd+"</td></tr>";
//		morehtml+="<tr><td>"+upsdcd+"</td><td>"+upsgj+"</td></tr>";
//		morehtml+="<tr><td>"+upssrgz+"</td><td>"+upspl+"</td></tr>";
//		morehtml+="<tr><td>"+upslx+"</td><td>"+upscs+"</td></tr>";
//		morehtml+="<tr><td>"+upsgz+"</td><td>"+upsbj+"</td></tr>";
//		
//	$("#equiParam").append(morehtml);
//	$("#equiParam td:empty").parent("tr").remove();
	/*var myhtml = '<td style="background-color:'+color+'"><div style="width:100%;padding-left:20px;">'+ equipmentName+"&nbsp;&nbsp;&nbsp;&nbsp;"+netStatus+producer +"&nbsp;&nbsp;&nbsp;&nbsp;"+netAddress+"</br>";
	myhtml+=Ua;
	myhtml+=Ub;
	myhtml+=Uc;
	myhtml+=ia;
	myhtml+=ib;
	myhtml+=ic;
	myhtml+=f;
	myhtml+=upsUa;
	myhtml+=upsUb;
	myhtml+=upsUc;
	myhtml+=upsia;
	myhtml+=upsib;
	myhtml+=upsic;
	myhtml+=upsf;
	return myhtml+'</div></td>';*/
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
//				'maskTime' : 'required;range[0~1440]'
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

