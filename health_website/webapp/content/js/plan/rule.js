/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	validator.verify1();
	initLeftData();
	initEvent();
	initEditPlanEvent();
});
function initLeftData(){
	$('.rule').remove();
	$.ajax({
		url:Constants.CONTEXT_PATH+'/plan/getPageList.do?fresh=' + Math.random(),
		async:false,
		data:{
			pageSize:10000,
			search_EQ_isAlarmRule:0
		},
		dataType:'json',
		success:function(res){
			if(res){
				var data = res.content;
				for(var i=0;i<data.length;i++){
					$('.list-group').append(createHtml(data[i].name,i+1,data[i].id));
				}
				if(data.length>0){
				    //切换规则
				    $(".rule").click(function () {
				        $(".rule").css("background-color", "").removeClass("list-active");
				        $(this).addClass("list-active").css("background-color", "rgb(238,238,238)");
				        $("input[name='ruleCode']").val($(this).attr("ext"));
				        LoadControl();
				    })
				      //编辑规则
				    $(".btnModify").off().on("click", function (event) {
				        event.preventDefault();
				        var code = $(this).attr("ext");
				        if (!code || parseInt(eval(code.toString())) <= 0) {
				            layer.msg("请选择需要编辑的规则.", 1, 0);
				            return;
				        }
				        
				       popUpWindow.editServer(parseInt(code));
				    });
				    //删除规则
				    $(".btnDelete").off().on("click", function (event) {
				        event.preventDefault();
				        var code = $(this).attr("ext");
				        layer.confirm("您确定要删除选中规则信息吗?", function (index) {
				            $.post(Constants.CONTEXT_PATH+'/plan/delete.do?ids='+code, {}, function (data) {
				                if (data.ret==1) {
				                    layer.msg("删除成功", 2, 1);
				                    initLeftData();
				                }
				                else {
				                    layer.msg(data.ErrorMessage, 1, 2);
				                }
				            }, "json")
	
				            layer.close(index);
				        });
				    })
				}
			}
		}
	});
}

function createHtml(name,index,id){
	var activeClass = (index==1?"list-active":"");
	if(index==1){
		$("input[name='ruleCode']").val(id);
	}
	var styl = (index==1?"background-color: rgb(238, 238, 238)":"");
	var html =   '<li class="list-group-item rule '+activeClass+'" style="'+styl+'" ext="'+id+'">';
		   html +=' <a href="javascript:void(0)">';
		   html +=  name;
		   html +='             <span style="right: 0px; position: absolute;">';
		   html +='                 <button title="删除" class="btn-danger btn-xs btn-link pull-right btnDelete" ext="'+id+'">';
		   html +='                     <span class="glyphicon glyphicon-remove"></span>';
		   html +='                 </button>';
		   html +='                 <button title="修改" class="btn-danger btn-xs btn-link pull-right btnModify" ext="'+id+'">';
		   html +='                     <span class="glyphicon glyphicon-pencil"></span>';
		   html +='                 </button>';
		   html +='             </span>';
		   html +='         </a>';
		  html +='      </li>';
	return html;
}


/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
	$(window).resize(function() {
		$('.main-container').height($(window).height() - 100);
	});
}

function initEvent(){
	//添加按钮
	$("#addBtn").click(function(){
		popUpWindow.addServer();
	});
	

    setTimeout(function () {
        LoadControl();
    }, 100)

  
}

  //加载控件
    function LoadControl() {
        $('#planContent').html("");
        $.post(Constants.CONTEXT_PATH+'/plan/getHighChartData.do?templateId='+$("input[name='ruleCode']").val(), {}, function (data) {

            $('#planContent').highcharts({
                chart: {
                    type: 'columnrange',
                    inverted: true
                },
                title: {
                    text: null
                },
                xAxis: {
                    gridLineWidth: 1,
                    categories: ['星期一', '星期二', '星期三', '星期四', '星期五', "星期六", "星期日"],
                },

                yAxis: {
                    labels: {
                        x: -0.5,
                        enabled: true
                       // rotation: -45,
                    },
                    title: {
                        text: '单位(时)'
                    },
                    gridLineWidth: 1,
                    
                    tickPositions: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                },
                credits: { text: "", href: "", enabled: false },//设置右下角的链接
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    },
                    columnrange: {
                        dataLabels: {
                          
                            enabled: true,
                            formatter: function (o, o1, o2ss) {
                            }
                        }
                    }
                },
                tooltip: {
                    headerFormat: "<span style=\"font-size: 10px\">{point.key}</span><br/>",
                    pointFormat: "<span style=\"color:{point.color}\">●</span> {series.name}: <b>{point.RealStartTime}-{point.RealEndTime}</b><br/>"
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0,
                    useHTML: true,
                    enabled: false,
                    reversed: true,
                    lableFormatter: function () {
                     
                    }
                },
                series: data.Result
            });
        }, "json")
    }

/**
 * 弹出窗
 */
var popUpWindow = {
	/**
	 * 新增
	 */
	addServer:function(){
		popUpWindow.initWin();
		$("input[name='ruleCode']").val('');
		var d = dialog({
			title: '添加计划',
			content:document.getElementById('planwin'),
			okValue: '确 定',
			ok: function () {
				if(validator.isPass()){//全部验证通过
					return postData.postAciton("addServer");
				}else{
					return false;
				}
			},
			cancelValue: '取消',
			cancel: function () {
				validator.verify1();
			}
		});

		d.showModal();
	},
	/**
	 * 编辑
	 */
	editServer:function(Id){
		if(typeof(Id) == 'undefined' || Id == ''){
			layer.alert('请选择需要修改的记录!',{icon: 0});
		}else if(isNaN(Id)){
			layer.alert('只能选择一条记录!',{icon: 0});
		}else{
			popUpWindow.initWin();

			//赋值
			$.ajax({
				async:false,
				url:Constants.CONTEXT_PATH+'/plan/findById.do?fresh=' + Math.random(),
				data:{id:Id},
				dataType:'json',
				success:function(data){
					$("input[name='RuleName']").val(data.name);
					$("input[name='saveDays']").val(data.saveDays);
					$("input[name='Enable']").prop('checked',data.isPublic==1?true:false);
					var param = data.timeTemplateParamList;
					for(var i=0;i<param.length;i++){
						var weekValue = param[i].weekDate==7?0:param[i].weekDate;
						for (var j = 0; j < param[i].listTimeTemplateParamSpan.length; j++) {
							var startDate = param[i].listTimeTemplateParamSpan[j].startDate;
							var endDate = param[i].listTimeTemplateParamSpan[j].endDate;
							var startTime = (startDate.hours<10?('0'+startDate.hours):startDate.hours)+":"+(startDate.minutes<10?('0'+startDate.minutes):startDate.minutes)+":"+(startDate.seconds<10?('0'+startDate.seconds):startDate.seconds);
							var endTime = (endDate.hours<10?('0'+endDate.hours):endDate.hours)+":"+(endDate.minutes<10?('0'+endDate.minutes):endDate.minutes)+":"+(endDate.seconds<10?('0'+endDate.seconds):endDate.seconds);
        					$("input[name='StartTime" + weekValue + "_" + j + "']").val(startTime);
        					$("input[name='EndTime" + weekValue + "_" + j + "']").val(endTime);
//        					$("select[name='SelType" + weekValue + "_" + j + "']").val(param[i].listTimeTemplateParamSpan[j].type);
						}
					}
				},
				error:function(){
					layer.alert('请求服务器出错！',{icon: 2});
				}
			});
			//弹窗编辑
			var d = dialog({
				title: '修改计划',
				content:document.getElementById('planwin'),
				okValue: '确 定',
				ok: function () {
					if(validator.isPass()){
				    	return postData.postAciton("editServer");
					}else{
						return false;
					}
					
				},
				cancelValue: '取消',
				cancel: function () {
				}
			});

			d.showModal();
		}
	},
	/**
	 * 删除
	 */
	deleteServer:function(Ids){
		if(typeof(Ids) == 'undefined' || Ids ==''){
			layer.alert('请至少选择一条记录!',{icon: 0});
		}else{
			var d = dialog({
				title: '删除参数',
				content:'确定要删除参数？',
				okValue: '确 定',
				ok: function () {
					$.ajax({
						data:{ids:Ids},
						type:'POST',
						dataType:'json',
						url:Constants.CONTEXT_PATH+'/alarmcon/delete.do',
						success:function(data){
							if(data.ret == 1){
								layer.alert(data.msg,{icon: 1});
								serverTable.refreshTb();
							}else{
								layer.alert(data.msg,{icon: 1});
								return false;
							}
						},
						error:function(){
							layer.alert("请求服务器出错！",{icon: 2});
						}
					});
				},
				cancelValue: '取消',
				cancel: function () {
					
				}
			});

			d.showModal();
		}
	},
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
		for(var i=0;i<7;i++){
			var weekValue = i;
			for (var j = 0; j < ruleNumber; j++) {
				$("input[name='StartTime" + weekValue + "_" + j + "']").val(defaultTime);
				$("input[name='EndTime" + weekValue + "_" + j + "']").val(defaultTime);
//				$("select[name='SelType" + weekValue + "_" + j + "']").val(0);
			}
		}
		$("input[name='RuleName']").val('');
		$("input[name='saveDays']").val('');
		$("input[name='Enable']").prop('checked',true);
	}	
}

/**
 * 提交信息
 */
var postData = {
	/**
	 * 提交操作
	 * @param type
	 */
	postAciton:function(type){
		var data = null;
		var url = null;
		if(type == "addServer"){//添加组织结构
			return submitForm('save');
		}else if(type == "editServer"){//编辑组织结构
			return submitForm('update');
		}
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
		$("#planwin").validator({
		    fields: {
		        'RuleName': 'required',
		        'saveDays': 'required'
		    }
		});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass:function(){
//		var isValid = false;
//		$('#planwin').isValid(function(v){    
//		    if(v){
//		    	isValid = true;
//		    }
//		});
	    var ruleName = $("input[name='RuleName']").val()||"";
	    if (!ruleName || ruleName.length > 36) {
	        layer.alert("规则名称不允许为空,且长度不能超过36位.");
	        return false;
	    }
	    var saveDays = $("input[name='saveDays']").val()||"";
	    var reg=/^\+?[1-9][0-9]*$/;
	    if (!reg.test(saveDays)) {
	        layer.alert("存储天数不能为空且必须是数字.");
	        return false;
	    }
		return true;
	}
	
};

//提交数据
function submitForm(type) {
    var flag = false;
    var ruleName = $("input[name='RuleName']").val()||"";
//    if (!ruleName || ruleName.length > 36) {
//        layer.msg("规则名称不允许为空,且长度不能超过36位.", 1, 0);
//        return flag;
//    }

    //允许规则为空
    var times = [];
    for (var i = 1; i <= 7; i++) {
        var week = GetWeek(i);
        var n = i == 7 ? 0 : i;
        if (!GetTime(week, n, times)) {
            return flag;
        }
    }
//    if (times.length == 0) {
//        layer.msg("请设置时间段时间(时间段不允许为空).",  1, 0);
//        return flag;
//    }
    var data = { "id":$("input[name='ruleCode']").val()||-1,"name": ruleName,"saveDays":$("input[name='saveDays']").val()||"", "isPublic": $("input[name='Enable']").is(":checked")?1:0, "plans": JSON.stringify(times),"isAlarmRule":0 };
	$.ajax({
		url:Constants.CONTEXT_PATH+'/plan/'+type+'.do',
		data:data,
		type:'POST',
		dataType:'json',
		success:function(data){
			if(data.ret == 1){
				layer.alert(data.msg,{icon: 1});
				if(type=='save'){
					initLeftData();
				}
				LoadControl();
				return true;
			}else{
				layer.alert(data.msg,{icon: 2});
				return false;
			}
		}
	});
	return false;
}

var ruleNumber = 8;
var defaultTime = "00:00:00";
function initEditPlanEvent() {
    setTimeout(function () {
        //tab点击事件
        
        $("#tabRule li").click(function (event) {
            event.preventDefault(); 
            var prevWeek = $("#tabRule").find(".active:last a").attr("ext");
            var currentWeek = $(this).find("a").attr("ext");
            
            if (prevWeek == currentWeek) {
                return;
            }
            $("#tblRule" + prevWeek).hide();
            $("#tblRule" + currentWeek).show();

            $("input[name='chkRule" + prevWeek + "']").removeAttr("disabled");
            $("input[name='chkRule" + currentWeek + "']").attr("disabled", "disabled");
            for (var i = 0; i < 7; i++) {
                $("input[name='chkRuleAll']").prop("checked", false);
                $("input[name='chkRule" + i + "']").prop("checked", false);
            }
        });

        //点击全部
        $("input[name='chkRuleAll']").click(function (event) {
            event.preventDefault(); 
            for (var i = 0; i < 7; i++) {
                if (i == parseInt($("#tabRule").find(".active a").attr("ext"))) {
                    continue;
                }
                $("input[name='chkRule" + i + "']").prop("checked", $(this).is(":checked"));
            }
        });

        //复制到
        $("#btnCopyTo").click(function (event) {
            event.preventDefault();
            $("#leftTime").removeClass("col-xs-12").addClass("col-xs-9");
            $("#rightTime").show();
            for (var i = 0; i < 7; i++) {
                $("input[name='chkRule" + i + "']").prop("checked", false);
            }
            $("input[name='chkRuleAll']").prop("checked", false);
        });

        //复制
        $("#btnCopy").click(function (event) {
            event.preventDefault();
            var chkEle = $("#rightTime :checked");
            if (chkEle.length == 0) {
                layer.msg("请选择需要复制到的日期.", 1, 0);
                return;
            }
            var currentWeek = parseInt($("#tabRule").find(".active a").attr("ext"));
            var week = GetWeek(currentWeek == 0 ? 7 : currentWeek);
            var times = [];
            if (!GetTime(week, currentWeek, times, true)) {
                return;
            }
            if (times.length == 0) {
                layer.msg("请设置时间段时间.", 1, 0);
                return;
            }
            currentWeek = currentWeek == 0 ? 7 : currentWeek;
            var weeks = [0, 1, 2, 3, 4, 5, 6];
            var arrs = [];
            var layerIndex = layer.load(999999, 2, true, "开始复制数据.....");
            for (var i = 0; i < chkEle.length; i++) {
                var weekValue = $(chkEle[i]).attr("value");
              //  arrs.push(""+weekValue+"");
              //  for (var k = 0; k < weeks.length; k++) {
                    for (var j = 0; j < ruleNumber; j++) {
                        var time = times[j];
                        if (time) {
                          
                            $("input[name='StartTime" + weekValue + "_" + j + "']").val(time.StartTime);
                            $("input[name='EndTime" + weekValue + "_" + j + "']").val(time.Stoptime);
//                            $("select[name='SelType" + weekValue + "_" + j + "']").val(time.Label);
                        } else {
                          //  if (weeks[k] != currentWeek && $.inArray("" + weeks[k] + "", arrs) < 0) {
                                $("input[name='StartTime" + weekValue + "_" + j + "']").val(defaultTime);
                                $("input[name='EndTime" + weekValue + "_" + j + "']").val(defaultTime);
//                                $("select[name='SelType" + weekValue + "_" + j + "']").val(0);
                          //  }
                        }
                    }
               // }
            }
            layer.close(layerIndex);
            layer.msg("复制结束", 1, 1, function () {

            })
            $("#leftTime").removeClass("col-xs-9").addClass("col-xs-12");
            $("#rightTime").hide();
        });

        //清除
        $(".btnClear").click(function (event) {
            event.preventDefault();
            var index = $(this).attr("ext");
            var week = $(this).attr("week");
            $("input[name='StartTime" + week + "_" + index + "']").val(defaultTime);
            $("input[name='EndTime" + week + "_" + index + "']").val(defaultTime);
//            $("select[name='SelType" + week + "_" + index + "']").val(0);
        })
    },100)

}

/*
    获取时间
    week:中文日期(如:星期一、星期二等)
    weekValue:值(如:星期一对应1、星期天对应0),整数
    times:保存的数据集合
    isCopy:是否是复制
*/
function GetTime(week, weekValue, times, isCopy) {
    isCopy = isCopy || false;
    times = times || [];
    var tempTimes = [];
    for (var j = 0; j < ruleNumber; j++) {
        var startTime = $("input[name='StartTime" + weekValue + "_" + j + "']").val();
        var endTime = $("input[name='EndTime" + weekValue + "_" + j + "']").val();
//        var ruleType = $("select[name='SelType" + weekValue + "_" + j + "']").val();
        if (startTime && endTime && ((startTime != defaultTime || endTime != defaultTime)))//开始时间和结束时间不等于默认时间,切类型存在
        {
            var startTimes = startTime.split(":");
            var endTimes = endTime.split(":");
            var start = 0, end = 0;
            if (parseInt(eval(startTimes[0].toString())) == 0) {
                start = parseInt(eval(startTimes[1].toString()))*60*60 + parseInt(eval(startTimes[2].toString()));
            }
            else {
                start = parseInt(eval(startTimes[0].toString())) * 60*60  + parseInt(eval(startTimes[1].toString()))*60+ parseInt(eval(startTimes[2].toString()));
            }

            if (parseInt(eval(endTimes[0].toString())) == 0) {
                end = parseInt(eval(endTimes[1].toString()))*60+parseInt(eval(endTimes[2].toString()));
            }
            else {
                end = parseInt(eval(endTimes[0].toString())) * 60*60 + parseInt(eval(endTimes[1].toString()))*60+parseInt(eval(endTimes[2].toString()));
            }

            if (start == end) {
                layer.msg("【" + week + "】下的时间段为【" + (j + 1) + "】对应的开始时间不能等于结束时间.", 1, 0);
                return false;
            }
            else if (start > end) {
                layer.msg("【" + week + "】下的时间段为【" + (j + 1) + "】对应的开始时间不能大于结束时间.", 1, 0);
                return false;
            }
            if ($.inArray((start +""+ end), tempTimes)>-1) {
                layer.msg("【" + week + "】下的时间段重复.", 1, 0);
                return false;
            }
            tempTimes.push((start +""+ end));

            if (isCopy) {
                times.push({ "RowIndex": j, "Week": weekValue, "StartTime": startTime, "Stoptime": endTime });
            }
            else {
                times.push({ "Week": weekValue, "StartTime": start, "Stoptime": end });
            }
        }
    }
    return true;
}
//获取中文星期
function GetWeek(i) {
    var week = "";
    switch (i) {
        case 7:
            week = "星期天";
            break;
        case 1:
            week = "星期一";
            break;
        case 2:
            week = "星期二";
            break;
        case 3:
            week = "星期三";
            break;
        case 4:
            week = "星期四";
            break;
        case 5:
            week = "星期五";
            break;
        case 6:
            week = "星期六";
            break;
    }
    return week;
}


