/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
 var timerRef = null;
 
 var hasNetStatus=false;
 var hasDevice=false;
 var hasRing=false;
 
$(function() {
//	uiAlarmTable.setTable();
//	uiAlarmTable.searchTb();
	initData();
	initInterValEvent();
	$("#refreshBtn").click(function(){
		initData();
	});
	$('#autoFlag').change(function() {
		var checked = $(this).is(":checked");
		if (checked) { 
			mySetInterVal();
		} else {
			if(timerRef!=null){
				clearInterval(timerRef);
				timerRef = null;
			}
		}
	});
});

function initData(){
	$('#mainContainer').empty();
	initEvent('getHomeNetStatusData','netstatus_','/netstatus/index','网络状态');
	initEvent('getHomeEquStatusData','equstatus_','/device/index','资源状态');
	initEvent('getHomeRingStatusData','ringstatus_','/ring/index','动环监控');

	if(hasNetStatus==false&&hasDevice==false&&hasRing==false){
		$('#mainContainer').html("").append("<div style='' class='no-data1'><div class=''><span id='error-msg'>很抱歉   , 该组织机构下没有报警信息 !</span></div></div>");
	}
	
}

function mySetInterVal(){
	if(timerRef!=null){
		clearInterval(timerRef);
		timerRef = null;
	}
	setTimeout(function(){
		timerRef = setInterval(function(){
			if($("#autoFlag").is(":checked")){
				initData();
			}
	  	},$("#refreshTime").children('option:selected').val()*1000); //指定10秒刷新一次	
	},1000);
}

function initInterValEvent() {
	$("#refreshTime").append(createAutoRefreshSelectOptions());
	$('#refreshTime').change(function(){ 
	//	var p1=$(this).children('option:selected').val();//这就是selected的值 
		mySetInterVal();
	});
	mySetInterVal();
}
function initEvent(param,type,dataurl,title){
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/home/"+param+".do?fresh="+ Math.random(),
		data:{'orgId':treeSelectOrgId},
		type : 'GET',
		async : false,
		dataType : 'json',
//		success : function(json) {
//            if(!json || !json.data || json.data.length == 0) {
//                return false;
//            }
//            var i, len=json.data.length,offtotal=0,ontotal=0;
//        	var rowhtml = '<div class="row" style="width:50%;display:inline-block;" id="row'+type+'">';
//        		       
//
//		   	rowhtml+='<div class="myTitle">'+title+'</div>';
//			rowhtml+='<div id="'+type+'" style="min-width: 310px; height: 30%; margin: 0 auto"></div>';
//        	var myHtml = '';
//        	var name = [null,'异常','正常'];
//            for (i = 0; i < len; i++) {
//                if(type=='netstatus_'){
//                	 ontotal += json.data[i][1];
//                	 offtotal += json.data[i][2];
//                }
//            }
//            if(type=='netstatus_'){
//            	name = [null,'离线','在线'];
//            	json.data.unshift(['网络状态',offtotal,ontotal]);    	 
//            }
//            if(name.length>0){
//            	json.data.unshift(name);
//            }
//            rowhtml+='</div>';
//            $('#mainContainer .row:eq(0)').css({"display":"block","width":"100%","border-bottom":"1px solid #dedede","margin-bottom":"10px"});
//            $('#mainContainer .row:eq(1)').css("margin-top","10px");
//            columnHighChart(type,json.data)
//		}
		success : function(json) {
            if(!json || !json.data || json.data.length == 0) {
                return false;
            }
            
        	if(title=="网络状态"){
        		hasNetStatus=true;
        	}else if(title=="资源状态"){
        		hasDevice=true;
        	}else{
        		hasRing=true;
        	}
            
            var i, len=json.data.length,offtotal=0,ontotal=0;
        	var rowhtml = '<div class="row" style="width:100%" id="row'+type+'">';
        		       
//		   	 if(type=='netstatus_'){
//	    		rowhtml+='<div class="myTitle">'+title+'<span style="float:right;font-weight:normal;"><input id="autoFlag" type="checkbox" checked="checked"></input>自动刷新：<select id="refreshTime"></select><button id="refreshBtn" class="btn btn-dodgerblue flat-btn" type="button" style="margin-top:0px;">刷新</button></span></div>';
//		   	 }else{
		   	 	rowhtml+='<div class="myTitle">'+title+'</div>';
//		   	 }
			rowhtml+='<div class="myBottom"></div>';
        	var myHtml = '';
            for (i = 0; i < len; i++) {
                myHtml += createHtml(json.data[i][0],json.data[i][1],json.data[i][2],dataurl,type+i,type=='netstatus_'?0:1);
                if(type=='netstatus_'){
                	
                	 offtotal += parseInt(json.data[i][1]);
                	 ontotal += parseInt(json.data[i][2]);
                }
            }
            if(type=='netstatus_'){
            	  rowhtml += createHtml('网络状态',offtotal,ontotal,dataurl,type,0);          	 
            }
            rowhtml+=myHtml;
            rowhtml+='</div>';
            $('#mainContainer').append(rowhtml);
            for (i = 0; i < len; i++) {
            	highChart(type+i,json.data[i][0],json.data[i][1],json.data[i][2],type=='netstatus_'?0:1);
            }
            if(type=='netstatus_'){
            	 highChart(type,'网络状态',offtotal,ontotal,0);       	 
            }
		}
	});
}

var uiAlarmTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = $(window).height() - 90;
		var settings = {
			classes : 'table table-hover',
			height : height,
			queryParams : function(params) {
//				params['id'] = $("#curorgId").val() || "";
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				return params;
			}
		}
		C.createTable("#bootstrapTable_uialarm", Constants.CONTEXT_PATH
						+ '/uialarm/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable_uialarm").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/uialarm/getPageList.do?fresh=' + Math.random()
		});
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#refreshBtn_uialarm").click(function(){
			uiAlarmTable.refreshTb();
		});
	}
}

function createHtml(name,offnum,onnum,dataurl,id,type){
	var euipType ='';
	var unit="台";
	if(name.indexOf("网络状态")>-1){
		typeName = "B类网络设备异常";
		if(name.indexOf('健康度检查主机网络状态')>-1){
			euipType='动环设备';
		}else if(name.indexOf('硬盘录像机网络状态')>-1){
			euipType='视频设备';
		}else if(name.indexOf('报警主机网络状态')>-1){
			euipType='报警主机';
		}
	}else if(name.indexOf("录像存储")>-1){
		typeName = "录像存储异常";
		unit="个";
	}else if(name.indexOf("视频质量诊断")>-1){
		typeName = "摄像机视频异常";
		unit="个";
	}else if(name.indexOf("资源状态")>-1){
		typeName = "服务器系统资源异常";
	}else if(name.indexOf("存储设备硬盘状态")>-1){
		typeName = "硬盘录像机硬盘异常";
	}else if(name.indexOf("UPS")>-1){
		typeName = "UPS工作异常";
	}else if(name.indexOf("温湿度")>-1){
		typeName = "温湿度异常";
	}else if(name.indexOf("DI")>-1){
		typeName = "DI输入报警";
	}else if(name.indexOf("市电")>-1){
		typeName = "市电异常";
	}else if(name.indexOf("电气火灾")>-1){
		typeName = "电气火灾监测异常";
	}
	if(offnum>0){
		offnum = '<a href="javascript:void(0)"  onclick="window.parent.changeTab(\'/uiAlarmEvent/index\',\''+typeName+'\',\''+euipType+'\')">'+offnum+'</a>';
	}
	var A = type==0?"在线":"正常";
	var B = type==0?"离线":"异常";
	
	var html='<div class="panel panel-default col-md-1">';
	  	html+=	'<div class="panel-heading">';
	  	html+=		'<span>'+name+'</span>';
	  	html+=	'</div>';
		html+=	'<div class="panel-body">';
		html+=		'<div class="left">';
		html+=	 		'<div id="'+id+'" style="height:100%;"></div>';
		html+=		'</div>';
		html+=		'<div class="right">';
	  	html+=			'<div class="row">';
	  	html+=				'<div class="padding textRight" style="display:inline-block;width:14px"><div class="colorBox" style="background-color: #52b4ea !important;"></div></div>';
	  	html+=				'<div class="padding" style="display:inline;width:60px;text-align:center;">'+A+'</div>';
	  	html+=				'<div class="padding textRight" style="width:30px;display:inline-block;">'+onnum+'</div>'
		html+=				'<div class="padding" style="display:inline;text-align:left;padding-left:5px">'+unit+'</div>'
	  	html+=			'</div>';
	  	html+=			'<div class="row">';
	  	html+=				'<div class="padding textRight" style="display:inline-block;width:14px"><div class="colorBox" style="background-color: #ff634d !important;"></div></div>';
	  	html+=				'<div class="padding" style="display:inline;width:60px;text-align:center;">'+B+'</div>';
	  	html+=				'<div class="padding textRight" style="width:30px;display:inline-block;">'+offnum+'</div>'
		html+=				'<div class="padding" style="display:inline;text-align:left;padding-left:5px">'+unit+'</div>'
	  	html+=			'</div>';
//	  	html+=	 		'<div style="text-align:right;padding-top:10px;;padding-right:10px;"><a href="javascript:void(0)"  onclick="window.parent.changeTab(\''+dataurl+'\',\''+typeName+'\')">详情</a></div>';
	   	html+=      '</div>';
	  	html+= '</div>';
	    html+='</div>';
	    return html;
}

function highChart(id,name,offnum,onnum,type){
	var total = parseInt(onnum)+parseInt(offnum);
	
	$('#'+id).highcharts({
        chart: {
        	height:120,
        	width:120,
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: type==0?'离线率':'异常率',
            align: 'center',
            verticalAlign: 'middle',
            style:'fontSize:12px;color:#666666;',
            y:5
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                startAngle: 0,
                endAngle: 360,
                center: ['50%', '50%'],
                colors: [ '#ff634d','#52b4ea']            
            }
        },
        series: [{
            type: 'pie',
            name: name,
            innerSize: '70%',
            data: [
                [type==0?'离线':'异常',   Math.round(offnum/total*10000)*100],
                [type==0?'在线':'正常',   Math.round(onnum/total*10000)*100]
            ]
        }],
        credits: {
             enabled:false // 禁用版权信息
        },
        legend: {
            align: 'left',
            verticalAlign: 'bottom',
            x:55
        }
    });
}

function columnHighChart(id,data){
	 $('#'+id).highcharts({
        chart: {
        	height:250,
            type: 'column'
        },
        colors: [ '#ea6300','#9ad930'],
        title: {
            text: ''
        },
        yAxis: {
        	title: {
              text: '台数'
            },
			allowDecimals:false,
        	gridLineColor:'#e6e6e6',
            lineColor: '#008bcd',
            lineWidth: 3,
            labels: {
                style: {
                    color: '#999999',
                    fontSize:'12px'
                }
            }
        },
        xAxis: {
        	gridLineColor:'#e6e6e6',
            lineColor: '#008bcd',
            lineWidth: 3,
            labels: {
                style: {
                    color: '#666',
                    fontSize:'14px'
                }
            }           
        },
        legend: {
            align: 'left',
            verticalAlign: 'bottom',
            x:55
        },
//        subtitle: {
//            text: 'Source: WorldClimate.com'
//        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width:100px;height:50px;">',
            pointFormat: '<tr><td style="color:{series.color};padding:0;">{series.name}: </td>' +
                '<td style="padding:0;"><b>{point.y:.1f} 台</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            series: {
                pointPadding: 0.1,
                pointWidth: 30,
                groupPadding: 0.2,
                borderWidth: 0,
                shadow: false                 
            }
        },
        data: {
            rows: data
        },
        credits: {
             enabled:false // 禁用版权信息
        }
    });
}

