/**
 * 历史过车数据查询
 */
 var timerRef = null;
 var equipName=null;
 var statusHashTable = null;
$(function () {

//	hisRecord.initOpts();
	initLayout();
	$(window).resize(function(){
		initLayout();
	});
    $("#alarmId").val('')
    initAlarmTable = false;
    hasDeal = 'none';
    hasFocus = 'none';
    getRingFsuNetStatus();
    getHasDataEquType();
    $("#refreshTime").append(createAutoRefreshSelectOptions());
	$('#refreshTime').change(function(){ 
	//var p1=$(this).children('option:selected').val();//这就是selected的值 
		mySetInterVal();
	});
	$("#refreshBtn").click(function(){
		getHasDataEquType();
	});
	mySetInterVal();
//    listener();
});

function mySetInterVal(){
	if(timerRef!=null){
		clearInterval(timerRef);
		timerRef = null;
	}
	setTimeout(function(){
		timerRef = setInterval(function(){
			if($("#autoFlag").is(":checked")){
				getHasDataEquType();
			}
	  	},$("#refreshTime").children('option:selected').val()*1000); //指定10秒刷新一次	
	},1000);
}

function initLayout() {
	$(".his-record").height($(window).outerHeight());
}

function getRingFsuNetStatus(){
	if(statusHashTable==null){
		statusHashTable = new HashTable();
	}
	statusHashTable.clear();
	 $.ajax({
         url: Constants.CONTEXT_PATH + '/fsuinfo/getPageList.do?pageSize=400',
         async:false,
         dataType: 'json',
         success: function (data) {
        	 if(data&&data.totalElements>0){
        		 $.each(data.content, function (i, item) {
        			 statusHashTable.add(item.fsuId,item.netStatus);
        		 });
        	 }
         },
         error: function () {
             layer.alert('请求服务器出错！', {icon: 2});
         }
     });
}

function initEvent() {
    $('#maskBtn').click(function () {
        if (validator.isPass1()) {
            $.ajax({
                url: Constants.CONTEXT_PATH + "/mask/saveEqu.do",
                type:'POST',
                data: {
                    orgId: $('#orgId').val(),
                    equipmentId: $('#equipmentId').val(),
                    equipmentPropertyName: -1,
                    isMask: 1,
                    aliasName: $("#aliasName").val()
                },
                dataType: 'json',
                success: function (data) {
                    layer.alert(data.msg, {icon: 1});
                    $('#maskId').val(data.maskId);
                    $('#maskBtn').hide();
                    $('#unmaskBtn').show();
                },
                error: function () {
                    layer.alert('请求服务器出错！', {icon: 2});
                }
            });
        }
    });
    $('#unmaskBtn').click(function () {
        $.ajax({
            url: Constants.CONTEXT_PATH + '/mask/deleteByEquAndProperty.do',
			type:'POST',
            data: {
                ids: $('#maskId').val(),
                propertyName: '网络状态'
            },
            dataType: 'json',
            success: function (data) {
                layer.alert(data.msg, {icon: 1});
                $("#aliasName").val('');
                $('#maskBtn').show();
                $('#unmaskBtn').hide();
            },
            error: function () {
                layer.alert('请求服务器出错！', {icon: 2});
            }
        });
    });
}

/**
 * 获取设备信息表的设备类型用于分类使用
 */
function getHasDataEquType() {
    //清空原来的数据
    $("#temp-container").empty();
//    $.ajax({
//        url: Constants.CONTEXT_PATH + "/home/getHasDataEquType.do",
//        data: {'orgId': treeSelectOrgId},
//        type: 'GET',
//        async: false,
//        dataType: 'json',
//        success: function (json) {
//            if (!json || !json.data || json.data.length == 0) {
//                return false;
//            }
//            var i, len = json.data.length;
//            for (i = 0; i < len; i++) {
////           		pagination.clickEvent(json.data[i][0]);
//            }
//        }
//    });
//     searchList.initDom(1, '服务器/PC资源状态');
   var dataLen1 = searchList.getListByType('1,2,3,4,6,8,9,10,11,14,15,20',1);
//     searchList.initDom(2, '硬盘录像机硬盘状态');
   var dataLen2 =  searchList.getListByType('5',2);
//     searchList.initDom(3, '动环状态');
   var dataLen3 =  searchList.getListByType('-2',3);
  
   if(dataLen1==0&&dataLen2==0&&dataLen3==0){
   		$(" .no-data1").css('display', '');
        $("#timeDiv").css('display', 'none');
   }
   $("[data-rightcode]").each(function () {
       var $em = $(this);
       var rightCode = $em.data("rightcode");
       if (top.checkRight(rightCode)) {
           if (rightCode.indexOf('SYSDEV_MODIFY_NAME') > -1) {
               $em.css('display', 'block');
           }
       }
   });
}

/**
 * 查询列表
 */
var searchList = {
    /**
     * 获取列表数据
     */
    getListByType: function (typeId,id) {
        $.ajaxSettings.async = false;
        $.ajaxSettings.method = "post";
//		$.getJSON(Constants.CONTEXT_PATH+"/netstatus/getPageList.do",searchList.params(),searchList.findCarListByCondition);
        var dataLen = 0;
        maAjax.getJson(Constants.CONTEXT_PATH + "/sysdev/getPageList.do", searchList.params(typeId,id), function (res) {
            dataLen = searchList.findCarListByCondition(res, id);
        }, function (res) {
//            $(" .no-data1").css('display', '');
//            $("#error-msg").html("服务出错了");
        });
        return dataLen;
    },
    /**
     * 获取列表数据
     */
    updateListByType: function (typeId,id) {
        $.ajaxSettings.async = false;
        $.ajaxSettings.method = "post";
//		$.getJSON(Constants.CONTEXT_PATH+"/netstatus/getPageList.do",searchList.params(),searchList.findCarListByCondition);
        var dataLen = 0;
        maAjax.getJson(Constants.CONTEXT_PATH + "/sysdev/getPageList.do", searchList.params(typeId,id), function (res) {
            dataLen = searchList.updateListByCondition(res, id);
        }, function (res) {
            $(" .no-data1").css('display', '');
//          $("#error-msg").html("服务出错了");
        });
        $("[data-rightcode]").each(function () {
            var $em = $(this);
            var rightCode = $em.data("rightcode");
            if (top.checkRight(rightCode)) {
                if (rightCode.indexOf('SYSDEV_MODIFY_NAME') > -1) {
                    $em.css('display', 'block');
                }
            }
        });
        return dataLen;
    },
    /**
     * 获取查询条件
     */
    params: function (typeIds,id) {
    	var params = null;
    	if(id>=3){
    		  params = {
	            pageNumber: $("#currentPage_" + id).val(),
	            pageSize: 12,
	            sortType:'name',
	            search_IN_moduleName: 'UPS设备,机房/基站环境,智能电表（交流）,电气火灾探测器,多回路电气火灾探测器,多回路监控器,普通空调',
	//			beginDate:$("#startDate").val(),
	//			endDate:$("#endDate").val(),
	            search_ORGLIKE_path: treeSelectOrgId
	        };
    	}else{
	       	params = {
	            pageNumber: $("#currentPage_" + id).val(),
	            pageSize: 12,
	            sortType:'name',
	            search_IN_equipmentTypeId: typeIds,
	//			beginDate:$("#startDate").val(),
	//			endDate:$("#endDate").val(),
	            search_ORGLIKE_path: treeSelectOrgId
	        };
    	}
        return params;
    },

    /**
     * 列表数据处理
     */
    findCarListByCondition: function (res, id) {
        var data = null;
        if (res) {
            data = {
                "rows": res.content,
                "total": res.totalElements,
                "pageCount": res.totalPages
            };
        } else {
            data = {
                "rows": [],
                "total": 0,
                "pageCount": res.totalPages
            };
        }
        if(data.total>0){
        	 var title='';
        	 if(id==1){
        	 	title='服务器/PC资源状态';
        	 }else if(id==2){
        	 	title='硬盘录像机硬盘状态';
        	 }else if(id==3){
        	 	title='动环状态';
        	 }
        	 searchList.initDom(id, title);
             pagination.clickEvent(id);
        }else{
             return data.total;            
        }
        var that = this;
        //设置page
		$("#currentPage_"+id).val(res.number+1);
        $("#pageCount_" + id).val(data.pageCount);
        //将图片集合设置为""
        $("#urls").val("");
        //设置总记录,还有每页显示多少条
        $("div#myfieldset_" + id + " .total-row").html(data.total);
//		$("div#myfieldset_"+id+" .page-size").html($("#pageSize").val());
        var url = "";
        $("#mydatalist_" + id).empty();
        if (data.rows.length != 0) {
            $("div#myfieldset_" + id + " .no-data").css('display', 'none');
            $.each(data.rows, function (i, item) {
                $("#mydatalist_" + id).append(searchList.getByTpl(item).join(""));
            });
        } else {
            $("div#myfieldset_" + id + " .no-data").css('display', '');
        }
       
		if(data.total == 0 || data.pageCount == 1){
			$("#right-pagination_"+id).css('display',"none");
			
		}else{
			$("#right-pagination_"+id).css('display',"");
		}

		if(data.total == 0){
			$("div#myfieldset_"+id+" .pagination-detail").css('display',"none");
		}else{
			$("div#myfieldset_"+id+" .pagination-detail").css('display',"");
		}
        //初始化分页
		pagination.showPage(id,pageNum.getCurrentPage(id),pageNum.getPageCount(id),pageNum.getMaxPage());
		
		return data.total;  
    },
    
    /**
     * 列表数据处理
     */
    updateListByCondition: function (res, id) {
        var data = null;
        if (res) {
            data = {
                "rows": res.content,
                "total": res.totalElements,
                "pageCount": res.totalPages
            };
        } else {
            data = {
                "rows": [],
                "total": 0,
                "pageCount": res.totalPages
            };
        }
        //设置page
		$("#currentPage_"+id).val(res.number+1);
        $("#pageCount_" + id).val(data.pageCount);
        //将图片集合设置为""
        $("#urls").val("");
        //设置总记录,还有每页显示多少条
        $("div#myfieldset_" + id + " .total-row").html(data.total);
//		$("div#myfieldset_"+id+" .page-size").html($("#pageSize").val());
        var url = "";
        $("#mydatalist_" + id).empty();
        if (data.rows.length != 0) {
            $("div#myfieldset_" + id + " .no-data").css('display', 'none');
            $.each(data.rows, function (i, item) {
                $("#mydatalist_" + id).append(searchList.getByTpl(item).join(""));
            });
        } else {
            $("div#myfieldset_" + id + " .no-data").css('display', '');
        }
       
		if(data.total == 0 || data.pageCount == 1){
			$("#right-pagination_"+id).css('display',"none");
			
		}else{
			$("#right-pagination_"+id).css('display',"");
		}

		if(data.total == 0){
			$("div#myfieldset_"+id+" .pagination-detail").css('display',"none");
		}else{
			$("div#myfieldset_"+id+" .pagination-detail").css('display',"");
		}
        //初始化分页
		pagination.showPage(id,pageNum.getCurrentPage(id),pageNum.getPageCount(id),pageNum.getMaxPage());
    },
    /**
     * 重置查询条件
     */
    resetCondition: function () {
        $("#startDate").val("");
        $("#endDate").val("");
    },
    initDom: function (id, name) {
        if ($(".main_content").find("#myfieldset_" + id)) {
            $(".main_content").find("#myfieldset_" + id).remove();
        }
        $("#temp-container").append(searchList.getMyTempTpl(id, name).join(""));
    },
    getMyTempTpl: function (id, name) {
        return [
            '<div id="myfieldset_' + id + '">'
            + '  <div class="myTitle">' + name + '(<span class="pagination-info"> 总共 <b class="total-row">0</b>条记录 </span>)</div>'
            + '  <div class="myBottom"></div>'
            + '		<div style="display: none" class="no-data">'
            + '			<div class="">'
            + '				<span id="error-msg">很抱歉   , 该组织机构下未添加有设备 !</span>'
            + '			</div>'
            + '		</div> '
            + '	    <div id="mydatalist_' + id + '">'
            + '	    </div>'
            + '		<input type="hidden" id="currentPage_' + id + '" name="currentPage" value="1">'
            + '		<input type="hidden" id="pageSize_' + id + '" name="pageSize" value="12">'
            + '		<input type="hidden" id="pageCount_' + id + '" name="pageCount" value="100">'
            + '		<div id="myPage_' + id + '" class="text-right bottom-pagination clearfix">'
            + '			<div class="pull-left pagination-detail">'
            + '				<span class="pagination-info"> 总共 <b class="total-row">0</b>条记录 </span>'
				+'				<span class="page-list">每页显示 '
				+'					<span><b>12</b>'
//				+'						<button data-toggle="dropdown" class="btn btn-default  dropdown-toggle" type="button">'
//				+'							<span class="page-size">12</span> '
//				+'							<span class="caret"></span>'
//				+'						</button>'
//				+'						<ul role="menu" class="dropdown-menu ">'
//				+'							<li class="active"><a href="javascript:void(0)" >12</a></li>'
//				+'							<li><a href="javascript:void(0)" >10</a></li>'
//				+'							<li><a href="javascript:void(0)" >25</a></li>'
//				+'							<li><a href="javascript:void(0)" >50</a></li>'
//				+'							<li><a href="javascript:void(0)" >100</a></li>'
//				+'						</ul>'
				+'				</span> 条 &nbsp;最多显示100页'
				+'				</span>'
            + '			</div>'
				+'			<div id="right-pagination_'+id+'" class="pull-right pagination"><li class="page-pre"><a href="javascript:void(0)"><i class="glyphicon glyphicon-menu-left"></i></a></li><li class="page-number active"><a href="javascript:void(0)">1</a></li><li class="page-number"><a href="javascript:void(0)">2</a></li><li class="page-number"><a href="javascript:void(0)">3</a></li><li class="page-number"><a href="javascript:void(0)">4</a></li><li class="page-number"><a href="javascript:void(0)">5</a></li><li class="page-number disabled"><a href="javascript:void(0)">...</a></li><li class="page-number"><a href="javascript:void(0)">100</a></li><li class="page-next"><a href="javascript:void(0)"><i class="glyphicon glyphicon-menu-right"></i></a></li></div>'
            + '		</div>'
            + '	</div>'
        ]
    },
    getByTpl: function (record) {
        var netstatus = '<span class="devNotLink">未绑定</span>', cpu = '', physical_memory = '',physical_memory_size = '', diskinfo = '', diskspace = '',
        dvrdiskspace='', diskstatus = '', electric = '正常', ups = '正常', temprature = '', humidy = '',type181='',type182='',type184='',type185='',
        upsTransStatus='',elecTransStatus='',fireTransStatus='',fire='正常',multiPath='正常',multiPathFireTranStatus='',multiPathMonitorTranStatus='',airStatus='',temperatureOne='',temperatureTwo='';
        $.ajax({
            async: false,
            url: Constants.CONTEXT_PATH + '/equstatus/getListByEquId.do?fresh=' + Math.random(),
            data: {
                id: record.equipmentId
            },
            dataType: 'json',
            success: function (json) {
                if (!json || !json.data || json.data.length == 0) {
                    return false;
                }
                var ret = '';
                for (var i = 0; i < json.data.length; i++) {
                	var showValue = createHtmlByValue(json.data[i],record.code);
                    if (json.data[i].propertyName == '网络状态') {
                        netstatus = showValue;
                        continue;
                    } else if (json.data[i].propertyName == 'CPU使用率') {                        
                        cpu = showValue;
                        continue;
                    } else if (json.data[i].propertyName == '物理内存使用率') {
                        physical_memory = showValue;
                        continue;
                    } else if (json.data[i].propertyName == '剩余存储空间') {
                        diskspace = showValue;
                        continue;
                    } else if (json.data[i].propertyName == '物理内存大小') {
                        physical_memory_size = showValue;
                        continue;
                    } else if (json.data[i].propertyName == '硬盘状态') {
                        diskstatus = createHtmlByValue(json.data[i],record.code);
                        continue;
                    } else if (json.data[i].propertyName == '交流电压过高告警'||json.data[i].propertyName == '交流电压过低告警'||json.data[i].propertyName == '智能电表通信中断告警'||json.data[i].propertyName == '交流输入停电告警') {   
                    	electric = showValue;
                    	if (json.data[i].propertyName == '智能电表通信中断告警') {                      	
                        	if(showValue.indexOf("中断")>-1){
                        		electric = "异常";
                        		elecTransStatus = showValue;
                        		break;
                        	}else{
                        		showValue = "正常";
                        		elecTransStatus = showValue;
                    		}
                        	
                            continue;
                        }
                     	if(electric.indexOf("有告警")>-1||electric.indexOf("异常")>-1){
                     		break;
                    	}else{
                    		electric = "正常";
                    	}
                    	
                        continue;
                    } else if(json.data[i].propertyName.indexOf('回路')>-1&&json.data[i].propertyName.indexOf('告警')>-1){
                        	if(json.data[i].propertyName.indexOf('多回路监控器通信中断告警')>-1){
                            	//多回路设备通信状态判断
                            	if(showValue.indexOf("中断")>-1){
                            		multiPathMonitorTranStatus = showValue;
                            		break;
                            	}
                        	}
                        	if(json.data[i].propertyName.indexOf('多回路电气火灾探测器通信中断告警')>-1){
                            	//多回路设备通信状态判断
                            	if(showValue.indexOf("中断")>-1){
                            		multiPathFireTranStatus = showValue;
                            		break;
                            	}
                        	}
                        	//多回路设备市电异常状态判断
                        	if(multiPath=='正常'){
                        		if(showValue.indexOf("有告警")>-1){
                        			multiPath=showValue;
                            	}
                        	}
                        	continue;
                    	}else if (json.data[i].propertyName == '火灾探测器通信告警'||json.data[i].propertyName == '电流过流告警'||json.data[i].propertyName == '电压过压告警'
                        	||json.data[i].propertyName == '电压欠压告警'||json.data[i].propertyName.indexOf('检测器告警状态')>-1||json.data[i].propertyName.indexOf('检测器断线告警')>-1
                        	||json.data[i].propertyName.indexOf('检测器短路告警')>-1) {
                    		fire = showValue;
                        	if (json.data[i].propertyName == '火灾探测器通信告警') {
                            	
                            	if(showValue.indexOf("中断")>-1){
                            		fire = "异常";
                            		fireTransStatus = showValue;
                            		break;
                            	}else{
                            		showValue = "正常";
                            		fireTransStatus = showValue;
                        		}
                                continue;
                            }
                         	if(fire.indexOf("有告警")>-1||fire.indexOf("异常")>-1){
                        		break;
                        	}else{
                        		fire = "正常";
                        	}
                            continue;
                        } else if (json.data[i].propertyName.indexOf('UPS')>-1) {
                    	if (json.data[i].propertyName == 'UPS通信中断告警') {
                        	upsTransStatus = showValue;
                        	if(showValue.indexOf("中断")>-1){
                        		 ups = "异常";
                        	}
                        	continue;
                    	}
                    	if(ups.indexOf("异常")>-1){
                    		continue;
                    	}
                        ups = showValue;
                        continue;
                    }else if (json.data[i].propertyName == '红外告警') {
                        type181 = showValue;
                        continue;
                    }else if (json.data[i].propertyName == '烟雾告警') {
                    	type182 = showValue;
                        continue;
                    }else if (json.data[i].propertyName == '水浸告警') {
                    	type184 = showValue;
                        continue;
                    }else if (json.data[i].propertyName == '门磁开关状态') {
                    	type185 = showValue;
                        continue;
                    } else if (json.data[i].propertyName == '环境温度') {
                        temprature = showValue;
                        continue;
                    } else if (json.data[i].propertyName == '环境湿度') {
                        humidy = showValue;
                        continue;
                    } else if (json.data[i].propertyName == '硬盘空间') {
//                    	var value = json.data[i].propertyValue;
//                    	if(typeof(value)=='object'){
//							var arr = eval(value);
//							value = '';
//							$.each(arr, function(i, item) {
//								value+=item.name+":总存储空间"+item.total+",剩余存储空间"+item.available+";<br/>"
//							})
//						}
//                        if (json.data[i].alarmEventViewID > 0) {
//                            dvrdiskspace = '<span><a style=\"color:red;\"  href=\"javascript:setProperties1(' + "'" + json.data[i].propertyName + "'" + "," + json.data[i].equipmentId +  ",'" + json.data[i].alarmType+"'"+');">' + value + '</a></span>';
//                        } else {
//                            dvrdiskspace = value;
//                        }
//                        continue;
                    }else if(json.data[i].propertyName=="出风温度"){
                		temperatureOne=(json.data[i].propertyValue*1).toFixed(2);
                		continue;
                	}
                	if(json.data[i].propertyName=="回风温度"){
                		temperatureTwo=(json.data[i].propertyValue*1).toFixed(2);
                		continue;
                	}
                	if(json.data[i].propertyName=="空调通信中断告警"){
                		airStatus=showValue;
                		continue;
                	}
	         
                                       
                    //		ret+=json.data[i].id.propertyName+":"+json.data[i].propertyValue+"<br />";
                }

                //	diskinfo = ret;

            },
            error: function () {
            }
        });
        var name = record.name;
        equipName=record.name;
        if(record.aliasName!=null&&record.aliasName!=""){
        	name = record.aliasName;
        }
        var name1=name;
        if(name1.length>12){
        	name1=name1.substr(0,10)+'...';
        }
        var nameId = 'nameAlias_'+record.equipmentId;
        var html = [];
 //				'<div >'
        html.push('	<div  id="' + record.equipmentId + '" class="panel panel-default car-list-item grid-col col-19">');
        html.push('	<div class="panel-heading" style="padding-right:0px;padding-left:0px">');
        html.push(' <span id="'+nameId+'" title="' + name + '">' + name1 + ' </span>');
        html.push('       <button title="修改设备名称" data-rightcode="SYSDEV_MODIFY_NAME" style="display:none" class="btn-danger btn-xs btn-link pull-right btnModify" onclick="modifyEquName('+record.equipmentId+');">');
        html.push('             <span class="glyphicon glyphicon-pencil"></span>');
        html.push('        </button>');
        html.push('	</div>')
        html.push('	<div class="panel-body" style="height:170px;padding:0;">');
        html.push('	<div class="grid">');
            //				+'				<div class="grid-col col-4">'
            //				+'					<a class="imgwrapper">'
            //				+'						<img alt="carimage" src="" class="lazy loading">'
            //				+'					</a>'
            //				+'				</div>'
        html.push('	<div class="grid-col col-12">');
        html.push('	<div class="caption">');
//				+'						<p class="name"></p>'
        if(record.equipmentTypeId != -2){  
        	html.push('<p><span class="leftAlign">网络状态：</span>' +'<span class="rightAlign">' +netstatus+'</span>' + '</p>');
        }else{
        	var status='';
        	if(elecTransStatus!='')
        		status = elecTransStatus;
        	else if(upsTransStatus!=''){
        		status = upsTransStatus;
        	}else if(fireTransStatus!=''){
        		status = fireTransStatus;
        	}else if(multiPathFireTranStatus!=''){
        		status = multiPathFireTranStatus;
        	}else if(multiPathMonitorTranStatus!=''){
        		status = multiPathMonitorTranStatus;
        	}else if(airStatus!=''){
        		status = airStatus;
        	}else{
        		status=statusHashTable.get(record.fsuId);
        	}
            html.push('<p><span class="leftAlign">通信状态：</span>' +'<span class="rightAlign">' +status+'</span>' + '</p>');
        }
        if(record.equipmentTypeId == 5){   
        	html.push('	<p><span class="leftAlign">硬盘状态：</span>' +'<span class="rightAlign">'+ diskstatus +'</span>'+ '</p>'); 
//        	html.push('	<p>硬盘空间：' + dvrdiskspace + '</p>');
        }else if(record.equipmentTypeId == -2){
        	
        	if(record.moduleName=="机房/基站环境"){
        		var type = record.code.substring(7,10);
        		if(type==181){
        			html.push('<p><span class="leftAlign">红外告警：</span>'+'<span class="rightAlign">' + type181 +'</span>'+ '</p>');
        		}else if(type==182){
        			html.push('<p><span class="leftAlign">烟雾告警：</span>'+'<span class="rightAlign">' + type182 +'</span>'+ '</p>');
        		}else if(type==184){
        			html.push('<p><span class="leftAlign">水浸告警：</span>'+'<span class="rightAlign">' + type184 +'</span>'+ '</p>');
        		}else if(type==188){
        			
        			html.push('<p><span class="leftAlign">门磁告警：</span>'+'<span class="rightAlign">' + type185 +'</span>'+ '</p>');
        		}else{
        			html.push('<p><span class="leftAlign">温度：</span>'+'<span class="rightAlign">' + temprature +'</span>'+ '℃</p>');
           			html.push('<p><span class="leftAlign">湿度：</span>' +'<span class="rightAlign">'+ humidy +'</span>'+ '%</p>');
        		}
        	}else if(record.moduleName=="智能电表（交流）"){
        	   html.push('<p><span class="leftAlign">市电:</span>' +'<span class="rightAlign">'+ electric+'</span>' + '</p>');
        	}else if(record.moduleName=="电气火灾探测器"){
        		html.push('<p><span class="leftAlign">电气火灾监测:</span>' +'<span class="rightAlign">'+ fire+'</span>' + '</p>');
        	}
        	else if(record.moduleName=="UPS设备"){       	
            	html.push('<p><span class="leftAlign">UPS：</span>'+'<span class="rightAlign">' + ups+'</span>' + '</p>');
        	}
        	else if(record.moduleName=="多回路电气火灾探测器"){       	
        		html.push('<p><span class="leftAlign">市电监测状态：</span>'+'<span class="rightAlign">' + multiPath+'</span>' + '</p>');
        	}
        	else if(record.moduleName=="多回路监控器"){       	
        		html.push('<p><span class="leftAlign">市电监测状态：</span>'+'<span class="rightAlign">' + multiPath+'</span>' + '</p>');
        	}
        	else if(record.moduleName=="普通空调"){       	
        		html.push('<p><span class="leftAlign">探头1温度：</span>'+'<span class="rightAlign">' + temperatureOne+'</span>' + '</p>');
        		html.push('<p><span class="leftAlign">探头2温度：</span>'+'<span class="rightAlign">' + temperatureTwo+'</span>' + '</p>');
        	}
        }else if(record.equipmentTypeId != 24){
			html.push('<p><span class="leftAlign">CPU使用率：</span>'+'<span class="rightAlign">' + cpu + '%</span></p>');
			html.push('<p><span class="leftAlign">物理内存使用率：</span>'+'<span class="rightAlign">' + physical_memory + '%</span></p>');			
			html.push('<p><span class="leftAlign">物理内存大小：</span>'+'<span class="rightAlign">'+ physical_memory_size + 'G</span></p>');
			html.push('<p><span class="leftAlign">剩余存储空间：</span>'+'<span class="rightAlign">'+ diskspace + 'G</span></p>');
        }//onclick="showDetailWin('+record.equipmentId+')"
        html.push('<p style="text-align:right;padding-right:10px;"><a href="javascript:void(0)" data-eid="'+record.equipmentId+'" onclick="showDetailWin('+record.equipmentId+',\''+record.code+'\');">详细</a></p>');
        html.push('</div>');
        html.push('</div>');
        html.push('</div>');
        html.push('<p style="text-align:right;">');
//  		html.push('<button class="btn btn-royalblue" type="button"  onclick="popUpWindow.handleEvent(\''+record.equipmentId+'\')">详情</button>');	  	
        html.push('</p>');
        html.push('</div>');
        html.push('</div>');
//				+'</div>'
		return html;
       
    }
}



function listener(){
	/*$('#mydatalist_1').on('click','a',function(){
		var eid = $(this).data('eid');
		showDetailWin(eid);
	})*/
}

function showDetailWin(id,code){
//	getHasDataEquType();
	var codeKey = code.substr(7,2);
	if(codeKey==45){
		//火灾探测器
		var win = top.layer.open({
			type: 2,
			title: '设备详细信息',
			shadeClose: false,
			area:['1000px','580px'],
			content: Constants.CONTEXT_PATH + '/sysdev/detailElectricalFire?equipmentId='+id+'&timestamp='+new Date(),
			yes: function(index, layero){
				top.layer.close(win);
			}
		});
	}else if(codeKey == 15){
		//普通空调
		var win = top.layer.open({
			type: 2,
			title: '设备详细信息',
			shadeClose: false,
			area:['540px','380px'],
			btn: ['关闭'],
			content: Constants.CONTEXT_PATH + '/sysdev/detailAirCondition?equipmentId='+id+'&timestamp='+new Date(),
			yes: function(index, layero){
				top.layer.close(win);
			}
		});
	}else if(codeKey==46){
		//多回路电气火灾探测器
		var win = top.layer.open({
			type: 2,
			title: '设备详细信息',
			shadeClose: false,
			area:['1100px','580px'],
			content: Constants.CONTEXT_PATH + '/sysdev/detailMultipathFire?equipmentId='+id+'&timestamp='+new Date(),
			yes: function(index, layero){
				top.layer.close(win);
			}
		});
	}else if(codeKey==47){
		//多回路监控器
		var win = top.layer.open({
			type: 2,
			title: '设备详细信息',
			shadeClose: false,
			area:['1100px','580px'],
			content: Constants.CONTEXT_PATH + '/sysdev/detailMultipathMonitor?equipmentId='+id+'&timestamp='+new Date(),
			yes: function(index, layero){
				top.layer.close(win);
			}
		});
	}else{
		var win = top.layer.open({
			type: 2,
			title: '设备详细信息',
			shadeClose: false,
			area:['540px','350px'],
			btn: ['关闭'],
			content: Constants.CONTEXT_PATH + '/sysdev/detail?equipmentId='+id+'&timestamp='+new Date(),
			yes: function(index, layero){
				top.layer.close(win);
			}
		});
	}
}

function createHtmlByValue(data,code){
	if(!isNaN(data.propertyValue)){
		data.propertyValue = Number(data.propertyValue).toFixed(2);
	}
	if (data.propertyName == '网络状态') {
		data.propertyValue = data.propertyValue!="正常"?data.propertyValue:"<span class='devOnline'>设备在线</span>";
	}
	
    if(data.alarmEventViewID > 0){
    	if(data.propertyName == '火灾探测器通信告警'){
			data.propertyValue = '中断';
		}else if(data.propertyName == '通信中断告警'){
			data.propertyValue = '中断';
		}else if((data.propertyName == '硬盘状态')){
			data.propertyValue = "异常";
    	}else if(data.propertyName.indexOf('通信中断')>-1){
			data.propertyValue = "中断";
    	}else if(data.propertyName.indexOf('UPS')>-1){
			data.propertyValue = "异常";
		}else if (data.propertyName.indexOf('告警')>-1||data.propertyName.indexOf('门磁开关状态')>-1) {
			data.propertyValue = "有告警";
		}
		return '<a class="errorStatus" href=\"javascript:setProperties1(' + "'" + data.propertyName + "'" + "," + data.equipmentId +  ",'" + data.alarmType+"'" + ",'" + code +"'"+');">'+data.propertyValue+'</a>';
	}else{
		if(data.propertyName == '火灾探测器通信告警'){
			data.propertyValue = '正常';
		}else if(data.propertyName.indexOf('通信中断告警')>-1){
			data.propertyValue = '正常';
		}else if((data.propertyName == '硬盘状态')){
			data.propertyValue = "正常";
		}else if(data.propertyName.indexOf('UPS')>-1){
			data.propertyValue = "正常";
		}else if (data.propertyName.indexOf('告警')>-1||data.propertyName.indexOf('门磁开关状态')>-1) {
			data.propertyValue = "无告警";
		}
		return "<span>"+data.propertyValue+"</span>";
	}
	
}

/**
 *  @description AJAX 公共操作类
 *  @class
 */
var maAjax = {
    /**
     * @description ajax请求的全局设置
     * @param {Object} setting    自定义设置对象
     */
    globalSetting: function (setting) {
        $.ajaxSetting(setting);
    },
    /**
     * @description ajax请求不缓存页面url
     */
    globalSettingNoCache: function () {
        $.ajaxSetting({cache: false});
    },
    /**
     * @description 设置ajax请求全局数据类型为json类型
     */
    globalSettingJsonDataType: function () {
        $.ajaxSetting({dataType: "json"});
    },
    /**
     * @description 同步从服务器获取数据
     * @param {String} url    请求url
     * @param {Object} data    请求参数
     * @param {String} methodType 请求方法类型 "GET"(默认) "POST" "PUT"..
     * @returns {Object} JSON格式数据
     */
    fetchSyncData: function (url, data, methodType) {
        var value = "";
        if (!url) throw "url should not be empty!";
        data = !data ? {} : ($.type(data) === "object" ? data : {});
        $.ajax({
            async: false, // 同步请求
            type: methodType || "GET",
            data: data,
            url: url,
            success: function (data) {
                try {
                    value = data.indexOf('{') !== -1 ? JSON.parse(data) : data;
                } catch (e) {
                    throw "fetch data failed!";
                }
            }
        });
        return value;
    },
    /**
     *
     * @param url
     * @param data
     * @param successCallback
     * @param errCallback
     */
    getJson: function (url, data, successCallback, errCallback) {
        $.ajax({
            type: "GET",
            dataType: 'json',
            data: data,
            url: url,
            success: function (data, textStatus, jqXHR) {
                successCallback && successCallback(data, textStatus, jqXHR);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errCallback && errCallback(XMLHttpRequest, textStatus, errorThrown);
            }
        });
    }
};

var alarmTable = {
    /**
     * 设置表格
     */
    setTable: function () {
        var height = 150;
        var settings = {
            classes: 'table table-hover',
            height: height,
            queryParams: function (params) {
                var pageNumber = 1;
                if (params.limit != 0) {
                    pageNumber = params.offset / params.limit + 1;
                }
                params.pageSize = params.limit;
                params.pageNumber = pageNumber;
                params['search_EQ_equipmentId'] = $("#equipmentId").val() || "-1";
                params['search_IN_propertyName'] = "CPU使用率,物理内存使用率,硬盘剩余空间,硬盘状态";
                return params;
            },
            // 全部勾选
            onCheckAll: function (rows) {
                $("#alarmId").val('');
                $.each(this.data, function (i, item) {
                    var delIds = $("#alarmId").val();
                    $("#alarmId").val(delIds + item.alarmId + ',');
                })
            },
            // 取消全部
            onUncheckAll: function (rows) {
                $("#alarmId").val('');
            },
            // 单次勾选
            onCheck: function (row, $element) {
                var alarmId = $("#alarmId").val();
                $("#alarmId").val(alarmId + row.alarmId + ',');
            },
            // 取消单次勾选
            onUncheck: function (row, $element) {
                var alarmId = $("#alarmId").val();
                var replaceStr = row.alarmId + ',';
                var reg = new RegExp(replaceStr, "g");
                var newStr = alarmId.replace(reg, "");
                $("#alarmId").val(newStr);
            },
            // 翻页时清空勾选信息
            onPageChange: function (number, size) {
                $("#alarmId").val('');
            }
        }
        C.createTable("#bootstrapTable_alarm", Constants.CONTEXT_PATH + '/uialarm/getUnDoPageList.do?fresh=' + Math.random(), settings);
    },
    /**
     * 更新表格
     */
    refreshTb: function () {
        $("#bootstrapTable_alarm").bootstrapTable('refresh', {
            url: Constants.CONTEXT_PATH + '/uialarm/getUnDoPageList.do?fresh=' + Math.random()
        });
    }
}

function showHistoryLog() {
    searchHistoryLog($('#equipmentId').val(), '');
}

/**
 * 设置跳转中要带的参数，在处理页面窗口中需要使用到的参数
 * @param status ==  propertyName
 * @param equId == equipmentId
 * @param alarmType == 告警类型，用于跳转页面
 */
function setProperties1(status, equId,alarmType,code) {
	var row = {
		alarmType : alarmType,
		equipmentId:equId,
		propertyName:status		
	};
	setProperties(row,code);
}

function modifyEquName(Id){
	// 弹窗编辑
	var d = dialog({
				title : '修改设备名称',
				content : document.getElementById('maskwin'),
				okValue : '保存',
				ok : function() {
					
					if($("#aliasName").val().trim().length<=0){
						layer.alert("名称不能为空", {icon : 2});
						return false;
					}
					
					 if (validator.isPass()) {
						postData.postAciton(Id);
						validator.verify1();
					 }else{
					 	return false;
					 }

				},
				cancelValue : '取消',
				cancel : function() {
					validator.verify1();
				}
			});

	d.showModal();
}

/**
 * 提交信息
 */
var postData = {
	aliasName : function() {
		return $("#aliasName").val();
	},
	/**
	 * 提交操作
	 * 
	 * @param type
	 */
	postAciton : function(equId) {
		var data = null;
		$.ajax({
			async : false,
			url : Constants.CONTEXT_PATH+ "/sysdev/modify.do",
			type:'POST',
			data:{
				equipmentId:equId,
				aliasName:postData.aliasName(),
			},
			dataType : 'json',
			success : function(data) {
				if (data.ret == 1) {
					layer.alert(data.msg, {icon : 1});
					$('#nameAlias_'+equId).text(postData.aliasName());
					$('#nameAlias_'+equId).attr('title',postData.aliasName());
					return true;
				} else {
					layer.alert(data.msg, {icon : 1});
					return false;
				}
			},
			error : function() {
				layer.alert("请求服务器出错！", {icon : 0});
				return false;
			}
		});
	}
}

/**
 * 验证规则
 */
var validator = {
	/**f
	 * 验证填写1
	 */
	verify1 : function() {
		$("#maskwin").validator({
					fields : {
						'aliasName' : 'required;'
					}
				});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass : function() {
		var mark = false;
		$('#maskwin').isValid(function(v){    
		    if(v){
		    	mark = true;
		    }
		});
		return mark;
	}

};

//HashTable类
function HashTable() {
    this._content = {};
}

HashTable.prototype =
{
    initialize: function () {
        this._content = {};
    },
    Count: function () {
        var count = 0;
        for (var i in this._content) count++;
        return count;
    },
    get: function (key) {
        if (this.Contains(key)) {
            return this._content[key];
        }
    },
    add: function (key, value) {
        if (this._content.hasOwnProperty(key)) {
            return false;
        }
        else {
            this._content[key] = value;
            return true;
        }
    },
    ForEach: function (fn) {
        for (var key in this._content) {
            if (this._content.hasOwnProperty(key)) fn(key, this._content[key]);
        }
    },
    clear: function () {
        this._content = {};
    },
    Contains: function (key) {
        return this._content.hasOwnProperty(key);
    },
    Remove: function (key) {
        delete this._content[key];
    },
    Set: function (key, value) {
        //if (!this.Contains(key)) {
        //    return false;
        //}
        this._content[key] = value;
        return true;
    }
}










