
var winIndex = parent.layer.getFrameIndex(window.name); //获取窗口索引
var replayWin= document.getElementById('replayIframe').contentWindow;
var reg = /day_Click\((\d{4}),(\d{1,2}),(\d{1,2})\);/;
var errorRecordDateArr = null;
var normalRecordDateArr = null;
var GlobalReplayParam = {
};
var alarmMessage="要确认报警信息么？（建议故障修复后再确认报警）";
$(function() {
	$(".myleft").css("width",$(".layout").width()-550);
//	$("#bootstrapTable").css("height","220px");
	$("#delIds").val('');
	initData();
	initEvent();
	serverTable.setTable();
	validator.verify();
	$("[data-rightcode]").each(function(){
		var $em = $(this);
		var rightCode = $em.data("rightcode");
		if(top.checkRight(rightCode)){
    		$em.css('display','inline-block');
		}
  	});
  	WdatePicker({
		eCont : 'myCalendar',
		skin : 'twoer',
		Mchanged : cMonthFunc,
		ychanged : cYearFunc,
		onpicking : function(dp) {
			return false;
		},
		onclearing : function(){
			return false;
		}
	});
	renderMapArea();
});

function initEvent(){
	
	
	$('#processResult').append( createSelectOptions('DEAL_RESULT'));
	$('#focusFlag').change(function() {
		var checked = $(this).is(":checked");
		if(checked) { //关注
			FPEquipmentStatus(equipmentId,'',"1","focusFlag",1,false);
		}else{ //取消关注
			FPEquipmentStatus(equipmentId,'',"1","focusFlag",0,true);
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
//			if(ids!=null&&ids.length>0){
//				$.each(data, function(i, item) {
//					FPEquipmentStatus(item.chnnEquipmentId,'',"0","repairFlag",1,false,i==ids.length-1?false:'');
//				})
//			}else{
				FPEquipmentStatus(equipmentId,'',"1","repairFlag",1,false);
//			}
		}else{ //取消已报修
//			$('#maskBtn').prop('disabled','disabled');
			//取消旁路
			$('#unmaskBtn').click();
			FPEquipmentStatus(equipmentId,'',"1","repairFlag",0,true);
		}
	});
	
	
	$('#maskBtn').click(function(){
		var checked = $('#repairFlag').is(":checked");
		if(!checked) { //已报修
			ShowLayerWarn('请您先报修，再旁路！');
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
				isMask:1,
				maskTime:$("#maskTime").val()
			},
			dataType : 'json',
			success : function(data) {
				ShowLayerSuccess('旁路设备成功!');
				$('#maskId').val(data.maskId);
				$('#maskBtn').hide();
				$('#unmaskBtn').show();
			},
			error : function() {
				ShowLayerFailure('请求服务器出错！');
			}
		});
		}
	);

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
				ids : $('#maskId').val()
			},
			dataType : 'json',
			success : function(data) {
				ShowLayerSuccess('取消旁路成功！');
				$('#maskBtn').show();
				$('#unmaskBtn').hide();
				$("#maskTime").val('');
			},
			error : function() {
				ShowLayerFailure('请求服务器出错！');
			}
		});
	});
	$('#confirmBtn').click(function(){
		var Ids = $("#delIds").val();
		if(typeof(Ids) == 'undefined' || Ids ==''){
			ShowLayerWarn('请至少选择一条记录!');
			return;
		}
		
		if (validator.isPass()) {
			layer.confirm(alarmMessage, {
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

var serverTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var settings = {
			classes:'table table-hover table-condensed',
			pagination : false,
			onCheckAll : function(rows) {
				$("#delIds").val('');
				$.each(this.data, function(i, item) {
							var delIds = $("#delIds").val();
							$("#delIds").val(delIds + item.chnnEquipmentId + ',');
						});
			},
			// 取消全部
			onUncheckAll : function(rows) {
				$("#delIds").val('');
			},
			// 单次勾选
			onCheck : function(row, $element) {
				var delIds = $("#delIds").val();
				$("#delIds").val(delIds + row.chnnEquipmentId + ',');
			},
			// 取消单次勾选
			onUncheck : function(row, $element) {
				var delIds = $("#delIds").val();
				var replaceStr = row.chnnEquipmentId + ',';
				var reg1 = new RegExp(replaceStr, "g");
				var newStr = delIds.replace(reg1, "");
				$("#delIds").val(newStr);
			},
			queryParams : function(params) {
				var pageNumber = 1;
//				if (params.limit != 0) {
//					pageNumber = params.offset / params.limit + 1;
//				}
				params.pageSize = 100000;
				params.pageNumber=pageNumber;
				params['search_EQ_dvsCode'] = dvsCode||'';
				params['search_EQ_chnnCode'] = chnnCode||'';
				params['search_EQ_recordDate'] = recordDate||'';
//				params['search_NOTEQ_alarmRecord'] = 1;
//				params['search_NOTEQ_timeRecord'] = 1;
				if(chnnCode.length==0){
					params['search_EQ_dvsEquipmentId'] = devEquipmentId ;
				}
				return params;
			},
			rowStyle : function(row,index) {
				 return {classes:'handIcon'};
			},
			onClickRow : function(row,$element){
				//改变行颜色
				$("tr").removeClass("danger");
				$element.addClass("danger");
				$('#chnName').text(row.chnnName);
				GlobalReplayParam.dvsCode = row.dvsCode;
				GlobalReplayParam.chnnCode = row.chnnCode;
				getDataByMonth(GlobalReplayParam.Year,GlobalReplayParam.Month);	
				renderRecordTimeLine(row.loseSpan,row);				
			},
			onLoadSuccess:function(result){
//				ids=null;
//				if(data&&data.length>1){
//					if(ids==null){
//						ids = [];
//					}
//					$.each(data, function(i, item) {
//						ids.push(item.chnnEquipmentId);
//					})
//				}
				var data = null;
				if(result){
					data=result.rows;
					for(var key in data){  //判断data是否为空对象
						$('#nowDate').empty();
						$('#nowDate').append('<span>'+data[0].recordDate+'</span>');  //将日期添加至表格上的检测时间
					}
				}
				$("#delIds").val('');
				var nowDate = new Date();
				if (data && data.length > 0) {
					if (chnnCode.length > 0) {
						$("#bootstrapTable").bootstrapTable('hideColumn','dataId');
					}
					$("#bootstrapTable").bootstrapTable('check', 0);
					$("tr").removeClass("danger");
					$(".table1 tr:eq(1)").addClass("danger");
					$('#chnName').text(data[0].chnnName);
					GlobalReplayParam.dvsCode = data[0].dvsCode;
					GlobalReplayParam.chnnCode = data[0].chnnCode;
					$("#delIds").val(data[0].chnnEquipmentId + ',');
					renderRecordTimeLine(data[0].loseSpan,data[0]);
					nowDate = new Date(data[0].recordDate)
				}
				setCalendar(nowDate.getFullYear(),nowDate.getMonth()+1);
			}
		}
		C.createTable("#bootstrapTable", Constants.CONTEXT_PATH
						+ '/record/getAlarmPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/record/getAlarmPageList.do?fresh=' + Math.random()
		});
	}
}

function findDataByDateClick(){
	var params = {};
	params.pageSize = 10;
	params.pageNumber=1;
	params['search_EQ_dvsCode'] = dvsCode||'';
	params['search_EQ_chnnCode'] = chnnCode||'';
	params['search_EQ_recordDate'] = recordDate||'';
	if(chnnCode.length==0){
		params['search_EQ_dvsEquipmentId'] = devEquipmentId ;
	}
	// 赋值
	$.ajax({
		async : false,
		url : Constants.CONTEXT_PATH + '/record/getAlarmPageList.do?fresh=' + Math.random(),
		data : params,
		dataType : 'json',
		success : function(res) {
			if (res) {
				var data = res.content;
				if(data!=null&&data.length>0){
					renderRecordTimeLine(data[0].loseSpan,data[0]);
				}
			}
		},
		error : function() {

		}
	});
}


function initData(){
	$('#unmaskBtn').hide();
	$.ajax({
		async : false,
		url : Constants.CONTEXT_PATH + '/sysdev/findById.do?fresh=' + Math.random(),
		data : {
			id : devEquipmentId
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

			//设置关注报修初始状态
			$.ajax({
				async : false,
				url : Constants.CONTEXT_PATH + '/focuRepair/getFPStatus',
				data : {
					equipmentId : equipmentId,
					type:'1'
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
				url : Constants.CONTEXT_PATH + '/mask/findByEquId.do?fresh=' + Math.random(),
				data : {
					equipmentId : equipmentId
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
//			$.ajax({
//				async: false,
//				url: Constants.CONTEXT_PATH + '/equstatus/getListByEquId.do',
//				data: {
//					id: $('#equipmentId').val()
//				},
//				dataType: 'json',
//				success: function (data) {
//					var ret = '';
//					for (var i = 0; i < data.data.length; i++) {
//						if(data.data[i].alarmEventViewID == ""){
//							ret += data.data[i].propertyName + ': ' + data.data[i].propertyValue + ";  ";
//						}else{ //这种状态有告警
//							ret += "<span style='color:red'>"+data.data[i].propertyName + ': ' + data.data[i].propertyValue +";  " +"</span>";
//						}
//					}
//					$('#diskinfo').html(ret);
//				},
//				error: function () {
//					layer.alert('请求出错！', {
//						icon: 2
//					});
//				}
//			});
		},
		error : function() {
			ShowLayerFailure('请求服务器出错！');
		}
	});
}

/**
 * 提交信息
 */
var postData = {
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
//			FPEquipmentStatus(equipmentId,"","0","repairFlag",0,'',false);
//		}
		//把这个设备的这个类型（“网络状态”）的告警全部设为 processResult

		data = {
			 'ids' : $("#delIds").val(),                                                                  
			'equipmentId':equipmentId,
			'propertyName':-1,
			'processResult' : postData.processResult(),
			'processDesc':postData.processDesc(),
			'processFlag':1,
			'alarmType':'录像存储异常'
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
//					if (chnnCode.length == 1) {
						top.layer.closeAll();//关闭处理窗口
						if(parent.serverTable){
							parent.serverTable.refreshTb();
						}else if(parent.alarmTable){
							parent.alarmTable.refreshTb();
						}
						ShowLayerSuccess('处理成功！');
//					}
					return true;
				} 
			},
			error : function() {
				ShowLayerFailure("请求服务器失败！");
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
	verify : function() {
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
//				'maskTime' : 'required;range[0~10000];integer;'
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
//		var mark = false;
//		$('#maskwin').isValid(function(v) {
//					if (v) {
//						mark = true;
//					}
//				});
//		return mark;
	}

};

function cMonthFunc($dp){
	var year = $dp.cal.date['y'];
	var month =  $dp.cal.date['M'];
	getDataByMonth(year,month);
}
function cYearFunc($dp){
 	var year = $dp.cal.date['y'];
	var month =  $dp.cal.date['M'];
	getDataByMonth(year,month);
}

function getDataByMonth(year,month){
	GlobalReplayParam.Year = year;
	GlobalReplayParam.Month = month;
	if(month<10){
		month="0"+month;
	}
	var firstdate = year + '-' + month + '-01';	
	var lastdate = getLastMonthDay(year,month);
	
	if(firstdate){
		firstdate+=" 00:00:00";
	}
	if(lastdate){
		lastdate+=" 23:59:59";
	}
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/recordIntegrity/getRecordDateAndIntegrity.do?fresh=" + Math.random(),
		type : 'GET',
		dataType : 'json',
		data:{
			startTime : firstdate || "",
			endTime : lastdate || "",
			dvsCode : GlobalReplayParam.dvsCode,
			chnnCode : GlobalReplayParam.chnnCode||'-1'
		},
		success : function(json) { //json为本月有数据的日期的数据
			if(json==null||json.length==0){
				changeCalendarColor();
				return;
			}
			errorRecordDateArr = [];
			normalRecordDateArr = [];
			var rows = json;
			for (var i = 0; i < rows.length; i++) {
		        if (rows[i].isIntegrity == 0) {
		            normalRecordDateArr.push(rows[i].recordDateString);
		        }else if (rows[i].isIntegrity == 1) {
		            errorRecordDateArr.push(rows[i].recordDateString);
		        }
		    }
		    changeCalendarColor();
		
		}
	});
}

//对日历设置  
function setCalendar(year,month) {  
	
    WdateIframe = $("div#myCalendar iframe");
    WdateIframe.css("width","450px");
    if (WdateIframe.length > 0) {
        WdateIframe = WdateIframe[0];
    } else {
        return;
    }
    var doc = WdateIframe.contentWindow.document;
    var _tables = doc.getElementsByTagName("table");    //当日历表格加载后才执行事件处理
    if (_tables.length == 0) {
        setTimeout(function(){ setCalendar(year,month);} , 100);
        return;
    }
    getDataByMonth(year,month);
}

function changeCalendarColor(){
     var doc = WdateIframe.contentWindow.document;
     $(doc).find('.WdateDiv').css('width','438px');
     $(doc).find('.WdayTable td').each(function (index, element) {
        var html = element.outerHTML;
        var m = reg.exec(html);
        if (m) {
        	element.style.backgroundColor="";
      		element.style.color="";
            //m[1],m[2],m[3]分别为年月日
        	if(m[2]<10){
        		m[2]='0'+m[2];
        	}
        	if(m[3]<10){
        		m[3]='0'+m[3];
        	}
            var date = m[1] + '-' + m[2] + '-' + m[3]; //date 为outerhtml里的日期集合
            //此段可以作出判断，比如是节假日时候处理
            if(normalRecordDateArr!=null&&normalRecordDateArr.length>0&&$.inArray(date, normalRecordDateArr)>-1){
            	element.style.backgroundColor="#32cc67";
            	element.style.borderTop = "2px solid #ffffff";
            	element.style.borderBottom = "3px solid #ffffff";
            	element.style.borderLeft = "10px solid #ffffff";
            	element.style.borderRight = "10px solid #ffffff";
                element.onclick = function () {
                	$(element).parents('table').find('td').css({"text-decoration":"none","border-bottom":"3px solid #fff","font-weight":"normal","color":"","font-size":""});
                	$(element).css({"text-decoration": "underline","border-bottom":"2px solid purple","color":"#fff","font-weight":"bold","text-shadow": "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de"});
                	$('#timelineDiv').empty();
                    recordDate = date;
                    $('#nowDate').empty();
        			$('#nowDate').append('<span>'+date+'</span>');  //将日期添加至表格上的检测时间
//                    serverTable.refreshTb();
        			findDataByDateClick();
                    return;
                };
            }else if (errorRecordDateArr!=null&&errorRecordDateArr.length>0&&$.inArray(date, errorRecordDateArr)>-1) {
                element.style.backgroundColor="#f78484";
                element.style.borderTop = "2px solid #ffffff";
            	element.style.borderBottom = "3px solid #ffffff";
            	element.style.borderLeft = "10px solid #ffffff";
            	element.style.borderRight = "10px solid #ffffff";
                element.onclick = function () {
                	$(element).parents('table').find('td').css({"text-decoration":"none","border-bottom":"3px solid #fff","font-weight":"normal","color":"","font-size":""});
                	$(element).css({"text-decoration": "underline","border-bottom":"2px solid purple","color":"#fff","font-weight":"bold","text-shadow": "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de"});
                	$('#timelineDiv').empty();
                	recordDate = date;
                	$('#nowDate').empty();
        			$('#nowDate').append('<span>'+date+'</span>');  //将日期添加至表格上的检测时间
//                    serverTable.refreshTb();
        			findDataByDateClick();
                    return;
                };
            }else{
//            	element.innerHTML = "<span style='color:#eeeeee; font-weight:bold;'>" + m[3] + "</span>";
            	element.style.borderTop = "2px solid #ffffff";
            	element.style.borderBottom = "3px solid #ffffff";
            	element.style.borderLeft = "10px solid #ffffff";
            	element.style.borderRight = "10px solid #ffffff";
            	element.onclick = function () {
            		$(element).parents('table').find('td').css({"text-decoration":"none","border-bottom":"3px solid #fff","font-weight":"normal","color":"","font-size":""});
                	$(element).css({"text-decoration": "underline","border-bottom":"2px solid purple","color":"red","font-weight":"bold","text-shadow": "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de"});
            		$('#timelineDiv').empty();
            		recordDate = date;
            		$('#nowDate').empty();
        			$('#nowDate').append('<span>'+date+'</span>');  //将日期添加至表格上的检测时间
//                    serverTable.refreshTb();
        			findDataByDateClick();
            		return;
            	}
            }
        }
    });
}

function convertPxToTime(xs){
	var width=533;
	var day = 24*60*60;
	var needAddTime = Math.round(xs*(day/width)*1000);
	var newDate = new Date(new Date(recordDate.replace(/-/g, "/")).getTime()+needAddTime).format('yyyy-MM-dd hh:mm:ss');
	$('#tips').stop(true).text('点击时间轴回放   '+newDate);
}

function playRecordByTime(xs){
	var width=533;
	var day = 24*60*60;
	var needAddTime = Math.round(xs*(day/width)*1000);
	var startDate = new Date(new Date(recordDate.replace(/-/g, "/")).getTime()+needAddTime);
	var endDate = new Date(new Date(recordDate.replace(/-/g, "/")).getTime()+needAddTime+10*60*1000);
	replayWin.onStartPlayBack(startDate.format('yyyy-MM-dd hh:mm:ss'),endDate.format('yyyy-MM-dd hh:mm:ss'),600,GlobalReplayParam.dvsCode,GlobalReplayParam.chnnCode);
}

function locateBtn(){
	var width=533;
	var day = 24*60*60;
	var time = $('#locateTime').val();
	var startDate = recordDate.split(' ')[0]+' '+time;
	var endDate = new Date(new Date(startDate.replace(/-/g, "/")).getTime()+10*60*1000);
	replayWin.onStartPlayBack(startDate,endDate.format('yyyy-MM-dd hh:mm:ss'),600,GlobalReplayParam.dvsCode,GlobalReplayParam.chnnCode);
	$('#tips').stop(true).text('点击时间轴回放   '+startDate);
}

function renderMapArea(){
	for(var i=0;i<533;i++){
		$('#planetmap').append('<area shape="rect" coords="'+i+',0,'+(i+1)+',53" onclick="playRecordByTime('+(i+1)+')" alt="Sun" onmouseover="convertPxToTime('+(i+1)+')" />');
	}
}

function renderRecordTimeLine(value,row){
	  $('#timelineDiv').empty();
	  var width = 533;
	  var timeSpanStr = '';
	  if(value == null ){
	  	return timeSpanStr;
	  }
	  var selectDate = $('#startTime').val();
	  var nowDateStr = new Date().format('yyyy-MM-dd');
	  var daySeconds = 24*60*60;
	  var secondOfDay = 1;//不负值0以免溢出
	  if(selectDate == nowDateStr){
	  		var nowTime = new Date();
	  		secondOfDay = (nowTime.getTime() - new Date(row.recordDate).getTime())/1000;
	  		secondOfDay -= 60*60;//修正一个小时误差
	  		var dayPercent = secondOfDay*100/daySeconds;
	  		timeSpanStr += '<div style="position:relative;width:'+dayPercent+'%;height:10px;overflow:hidden;background:#51CA65;top:-10px;">';
	  }else if(selectDate>nowDateStr){
	  		return timeSpanStr;
	  }else{
	  	    timeSpanStr += '<div style="position:relative;width:100%;height:10px;overflow:hidden;top:-10px;">';
	  		var dateIntegrityInfo = row;
		  	if(dateIntegrityInfo.checkSpan.length>0){
		  		var checkSpanArr = eval(dateIntegrityInfo.checkSpan);
		  		for(var i=0;i<checkSpanArr.length;i++){		  			
					 timeSpanStr+=createSpanHtml(checkSpanArr[i],'定时录像模板','#51CA65');
	  			}
	  		}
		  if(value != null){
			  	if(dateIntegrityInfo.loseSpan.length>0){
		  		var loseSpanArr = eval(dateIntegrityInfo.loseSpan);
		  		for(var i=0;i<loseSpanArr.length;i++){
	 				timeSpanStr+=createSpanHtml(loseSpanArr[i],'定时录像丢失','#E0E0E0');
		  		}
		  	}
	  		if(dateIntegrityInfo.alarmLoseSpan.length>0){
		  		var alarmLoseSpanArr = eval(dateIntegrityInfo.alarmLoseSpan);
		  		for(var i=0;i<alarmLoseSpanArr.length;i++){
		  			timeSpanStr+=createSpanHtml(alarmLoseSpanArr[i],'报警录像','#ffb137');
		  		}
	  		}
		  }
	  }
	  timeSpanStr+='</div>';
	  $('#timelineDiv').append(timeSpanStr);
}

function realSaveDaysFormater(value,row,index){
	var saveDays = row.saveDays!=""?row.saveDays:"未配置";
	return value+'--(计划：'+saveDays+')';
}



