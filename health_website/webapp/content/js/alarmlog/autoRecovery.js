var timerRef = null;
/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
			initLayout();
			$(window).resize(function(){
				initLayout();
				$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30} );
			});
			serverTable.setTable();
			serverTable.searchTb();
			initEvent();
			validator.verify1();
			isValid = false;// 验证标记
			$("#dealIds").val('');
			$("[data-rightcode]").each(function(){
				var $em = $(this);
				var rightCode = $em.data("rightcode");
				if(top.checkRight(rightCode)){
		    		$em.css('display','block');
				}
		  	});
		});

var serverTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30;
		var settings = {
			classes : 'table table-hover',
			height : height,
			queryParams : function(params) {
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				params['search_GE_beginTime'] = $("#startTime").val() || "";
				params['search_LE_beginTime'] = $("#endTime").val() || "";
				params['search_GE_endTime'] = $("#pstartTime").val() || "";
				params['search_LE_endTime'] = $("#pendTime").val() || "";
				params['search_LIKE_alarmType'] = $("#alarmType").val() || "";
				params['search_LIKE_equipmentName'] = $("#equType").val() || "";
				params['search_LIKE_propertyName'] = $("#propertyName").val() || "";
				params['search_LIKE_name'] = $("#name").val() || "";
//				params['search_LIKE_processResult'] = $("#processResultSearch").val() || "";
				params['search_ORGLIKE_path'] = treeSelectOrgId;
				params['search_EQ_equipmentId'] = equId || "";
				params['search_EQ_propertyName'] =  type || "";	
				if($("#focusFlag").val()=='0'){
					params['search_ISNULLOR_focusFlag'] =  $("#focusFlag").val() || "";	
				}else{
					params['search_EQ_focusFlag'] =  $("#focusFlag").val() || "";	
				}
				params['search_EQ_alarmLevel'] =  $("#alarmLevel").val() || "";
				params['search_ISNULL_processFlag'] =  "-1";
				
				if($("#isMask").val()=='0'){
					params['search_ISNULLOR_isMask'] = $("#isMask").val();
				}else{
					params['search_EQ_isMask'] = $("#isMask").val() || "";
				}
				return params;
			},
						// 全部勾选
			onCheckAll : function(rows) {
				$("#dealIds").val('');
				$.each(this.data, function(i, item) {
							var delIds = $("#dealIds").val();
							$("#dealIds").val(delIds + item.alarmId + ',');
						});
			},
			// 取消全部
			onUncheckAll : function(rows) {
				$("#dealIds").val('');
			},
			// 单次勾选
			onCheck : function(row, $element) {
				var dealIds = $("#dealIds").val();
				$("#dealIds").val(dealIds + row.alarmId + ',');
			},
			// 取消单次勾选
			onUncheck : function(row, $element) {
				var dealIds = $("#dealIds").val();
				var replaceStr = row.alarmId + ',';
				var reg = new RegExp(replaceStr, "g");
				var newStr = dealIds.replace(reg, "");
				$("#dealIds").val(newStr);
			},
						// 翻页时清空勾选信息
			onPageChange : function(number, size) {
				$("#dealIds").val('');
			}
		}
		C.createTable("#bootstrapTable", Constants.CONTEXT_PATH
						+ '/uialarm/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/uialarm/getPageList.do?fresh=' + Math.random()
		});
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#search").click(function(){
			serverTable.refreshTb();
		});
		$("#refreshBtn").click(function(){
			serverTable.refreshTb();
		});
	}
}
//序号
function numberFormatter(value, row, index) {
	return index + 1;
}
//名称转换
function maskFormatter(value, row, index) {
	if(value=='1'){
		return '已旁路';
	}
	return '';
}
//行处理
function operateFormater(value,row,index){
	    return [
	    	'<a  href="javascript:void(0)" title="处理">',
	        '<i class="glyphicon glyphicon glyphicon-cog"></i>',
	        '</a>'].join("");
}

//行处理 关注
function operateFormater1(value,row,index){
		if(value==0){
			 return [
		    	'<a class="attentionBtn" href="javascript:void(0)">',
		        '<i class="focus"></i>',
		        '</a>'].join("");
		}else if(value==1){
			 return [
		    	'<a class="attentionBtn" href="javascript:void(0)">',
		        '<i class="hasfocus"></i>',
		        '</a>'].join("");
		}
		return "";
}

function propertyValueFormater(value,row,index){
	if(typeof(value)=='object'){
		var arr = eval(value);
		var valu = '';
		if(row.propertyName=="硬盘空间"){
			$.each(arr, function(i, item) {	
				valu +="<span style='color:#333;'>(总存储空间"+diskarr[i].total+",剩余存储空间"+diskarr[i].available+")</span>"
			});
			
		}else if(row.propertyName=="硬盘状态"){
			$.each(arr, function(i, item) {	
				valu +="<span style='color:#333;'>"+item.name+":"+item.status+";</span>"
			});
		}
		return valu;
	}
	return value;
}

/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
}
 function keepLB (str) {
	if(/%0D%0A/.test(str))//ie8
		return str;
	var reg=new RegExp("(%0A)", "g");
	return str.replace(reg,"%0D$1");
}

/**
 * ajax下载文件 url: 文件url路径
 */
function download_file(url) {
	if (typeof (download_file.iframe) == "undefined") {
		var iframe = document.createElement("iframe");
		download_file.iframe = iframe;
		document.body.appendChild(download_file.iframe);
	}
	download_file.iframe.src = url;
	download_file.iframe.style.display = "none";
}
function mySetInterVal(){
	if(timerRef!=null){
		clearInterval(timerRef);
		timerRef = null;
	}
	setTimeout(function(){
		timerRef = setInterval(function(){
			if($("#autoFlag").is(":checked")){
				serverTable.refreshTb();
			}
	  	},$("#refreshTime").children('option:selected').val()*1000); //指定10秒刷新一次	
	},1000);
}

function initEvent() {
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
	$("#refreshTime").append(createAutoRefreshSelectOptions());
	$('#refreshTime').change(function(){ 

		mySetInterVal();
	});
	mySetInterVal();
	$("#dealBtn").click(function() {
		var Ids = $("#dealIds").val();
		Ids = Ids.substring(0, Ids.length - 1);
		popUpWindow.handleEvent(Ids);
	});
	$("#exportBtn").click(function(){
			var params = {};
			var pageNumber = 1;
			params.pageSize=100000;
			params.pageNumber=pageNumber;
			params.mark = 0;//自动恢复
			params['search_GE_beginTime'] = $("#startTime").val() || "";
			params['search_LE_beginTime'] = $("#endTime").val() || "";
			params['search_GE_processTime'] = $("#pstartTime").val() || "";
			params['search_LE_processTime'] = $("#pendTime").val() || "";
			params['search_LIKE_alarmType'] = $("#alarmType").val() || "";
			params['search_EQ_equipmentName'] = $("#equType").val() || "";
			params['search_LIKE_propertyName'] = $("#propertyName").val() || "";
			params['search_LIKE_name'] = $("#name").val() || "";
//			params['search_LIKE_processResult'] = $("#processResultSearch").val() || "";
			params['search_ORGLIKE_path'] = treeSelectOrgId;
			params['search_EQ_equipmentId'] = equId || "";
			params['search_EQ_propertyName'] =  type || "";	
			params['search_EQ_focusFlag'] =  $("#focusFlag").val() || "";	
			params['search_EQ_alarmLevel'] =  $("#alarmLevel").val() || "";
			params['search_ISNULL_processFlag'] =  "-1";
			
			if($("#isMask").val()=='0'){
				params['search_ISNULLOR_isMask'] = $("#isMask").val();
			}else{
				params['search_EQ_isMask'] = $("#isMask").val() || "";
			}
			var url=Constants.CONTEXT_PATH + '/uialarm/export.do?'+Util.param(params);
        	download_file(url);   

//			$.post(Constants.CONTEXT_PATH + '/uialarm/export.do',params,  function(data,status){
//	    		alert("Data: " + data + "\nStatus: " + status);
//	  		});
	});
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/netstatus/getAllEquipType.do?fresh=" + Math.random(),
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
	                options += '<option>'+json.data[i][2]+'</option>';
	            }
	            $('#equType').html(options);
		}
	});
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
	            $('#alarmType').html(options);
		}
	});
	
	/*
	 * 箭头点击事件
	 */
	$('.arrow_position').click(function() {
		$(this).css("display","none");
		$(this).siblings().css("display","block");
		setTimeout(function(){
			changeTableHeight();  //0.35秒延时后$('.search-content').height()重新生成，即关闭搜索框时变为14px，打开搜索框时为88px
		},350)
		
	}) 
	function changeTableHeight(){
		$('#bootstrapTable').bootstrapTable( 'resetView' , {height: $(window).height() - $('.search-content').height()-$('.orgmgr-tool').height()-30} );
	}
}

/**
 * 弹出窗
 */
var popUpWindow = {
	/**
	 * 处理
	 */
	handleEvent : function(Ids) {
		if (typeof(Ids) == 'undefined' || Ids == '') {
			layer.alert('请至少选择一条记录!', {icon : 0});
		} else {
			// 弹窗编辑
			var d = dialog({
						title : '处理',
						content : document.getElementById('alarmwin'),
						button:[{value: '旁路', callback: function () {}},{value: '取消旁路', callback: function () {}}] ,
						okValue : '确 定',
						ok : function() {
							validator.isPass();
							 if (isValid) {
								postData.postAciton("save");
								serverTable.refreshTb();
								validator.verify1();
							 }

						},
						cancelValue : '取消',
						cancel : function() {
							validator.verify1();
						}
					});

			d.showModal();
		}
	},
	/**
	 * 初始化弹出窗内容
	 */
	initWin : function() {
		this.emptyWin();
	},
	/**
	 * 清空弹出窗内容
	 */
	emptyWin : function() {
		$("#processResult").val('');
		$("#processDesc").val('');
	}
}

/**
 * 提交信息
 */
var postData = {
	ids:function(){
		return $("#dealIds").val();
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
	postAciton : function(type) {
		if(type=="save"){
			var data = {
				'ids' :postData.ids(),
				'processResult' : postData.processResult(),
				'processDesc':postData.processDesc(),
				'processFlag':1
			}
			$.ajax({
						async : false,
						data : data,
						dataType : 'json',
						url : Constants.CONTEXT_PATH + '/alarmexd/save.do?fresh=' + Math.random(),
						success : function(data) {
							if (data.ret == 1) {
								layer.alert(data.msg, {icon : 1});
								serverTable.refreshTb();
								return true;
							} else {
								layer.alert(data.msg, {icon : 1});
								return false;
							}
						},
						error : function() {
							layer.alert("请求服务器失败！", {icon : 0});
							return false;
						}
					});
		}
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
		$("#alarmwin").validator({
					fields : {
						'processResult' : 'required'
					}
				});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass : function() {
		$('#alarmwin').isValid(function(v){    
		    if(v){
		    	isValid = true;
		    }
		});
	}

};

function highChart(id,title){
	$('#'+id).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        colors:['red','green'],
        title: {
            text: title
        },
        tooltip: {
    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
//        plotOptions: {
//            pie: {
//                allowPointSelect: true,
//                cursor: 'pointer',
//                dataLabels: {
//                    enabled: true,
//                    color: '#000000',
//                    connectorColor: '#000000',
//                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//                }
//            }
//        },
        series: [{
            type: 'pie',
            name: name,
            data: data
        }],
        credits: {
             enabled:false // 禁用版权信息
         }
    });
}
