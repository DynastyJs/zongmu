
$(function() {
	initData();
});


function initData(){
	var netStatus ='',cpu = '',memory = '',upsUar='',upsdy='',upstempreature='',upsfr='',memory_size='',disk_space='',diskStatus = '',equipmentName='',netAddress='',producer='',Ua='',Ub='',Uc='',ia='',ib='',ic='',f='',upsUa='',upsUb=''
	,upsUc='',upsia='',upsib='',upsic='',upsf='',tempreature = '',humidy = '',upspl='',upslx='',upscs='',upsgz='',upsbj='',upsgj='',upsdcd='',upssd='',upssrgz='',type181='',type182='',type184='',type185='',jlsrtd='',jldygg='',jldygd='',
	upsTransStatus='',elecTransStatus='';
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
			equipmentName = data.name;
			netAddress = data.netAddress;
			producer = data.producer;
			var equipmentTypeId = data.equipmentTypeId;
			var myhtml='<div>'	+ 
			'<div class="infoTitle">基本信息</div>'+
			'<div style="border-top:1px solid #dedede;font-size:12px;padding-top: 10px;margin-left: 17px;height: 49px;">'+
				'<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">设备名称：</span><span style="color:#333;">'+equipmentName+'</span></div>';
//			if(equipmentTypeId != -2){
//				myhtml+='<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">网络状态：</span><span id="netStatusSpan" style="color:#333;">'+netStatus+'</span></div>';
//			};
			myhtml+=	'<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">设备品牌：</span><span style="color:#333;">'+producer+'</span></div>'+
				'<div style="float:left;height: 20px;width:50%;"><span style="color:#666;">网络地址：</span><span style="color:#333;">'+netAddress+'</span></div>'+
			'</div>'+
		'</div>';
			myhtml+="<div class='infoTitle'>硬件信息</div><div style='padding-top: 10px;border-top: 1px solid #dedede;margin-left: 18px;'><div>";

			$.ajax({
				async: false,
				url: Constants.CONTEXT_PATH + '/equstatus/getListByEquId.do?fresh=' + Math.random(),
				data: {
					id: equipmentId
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
							ret ='<div class="hardwareInfo"><span class="leftAlign">'+ data.data[i].propertyName + ':</span><span class="rightAlign" title="'+data.data[i].propertyValue+'" style="color:red;"> ' + value+'</span></div>' ;
						}						
						
						myhtml+=ret;
					}
					$.each(statusarr, function(i, item) {						
						if(item.status == "正常"){
							diskStatus +=	'<p style="font-size:12px;"><span style="color:#666;">'+item.name + '</span>: <span style="color:#333;">' + item.status +"</span></span>";
						}else{ //这种状态有告警
							diskStatus += "<p style='font-size:12px;'><span style='color:red;color:#666;'>"+item.name + '</span>: <span style="color:#333;">' +item.status +"</span></span>";
						}
						diskStatus+="<span style='color:#333;'>(总存储空间"+diskarr[i].total+",剩余存储空间"+diskarr[i].available+",序列号"+diskarr[i].diskSerialNum+")</span></p>"
					})			
					myhtml+=diskStatus;
					$('#equInfo').append(myhtml+'</div>');
					$('#netStatusSpan').text();
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


