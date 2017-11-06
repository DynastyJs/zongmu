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
	});
	serverTable.setTable();
	serverTable.searchTb();
	initEvent();
	$("#delIds").val('');
});

var serverTable = {
	/**
	 * 设置表格R
	 */
	setTable:function(){
		  var height = $(window).height()-$('.search-content').height()-80;
		  var settings = {
		  	classes : 'table table-hover',
		  	height:height,
		  		//全部勾选
				onCheckAll:function(rows){
					$("#delIds").val('');
					$.each(this.data,function(i,item){
						
						var delIds = $("#delIds").val();
						$("#delIds").val(delIds+item.conditionId+',');
					})
				},
				//取消全部
				onUncheckAll:function(rows){
					$("#delIds").val('');
				},
				//单次勾选
				onCheck:function(row, $element){
					var delIds = $("#delIds").val();
					$("#delIds").val(delIds+row.conditionId+',');
				},
				//取消单次勾选
				onUncheck:function(row, $element){
					var delIds = $("#delIds").val();
					var replaceStr = row.conditionId+',';
					var reg = new RegExp(replaceStr,"g"); 
					var newStr = delIds.replace(reg,"");
					$("#delIds").val(newStr);
				},
				//翻页时清空勾选信息
				onPageChange:function(number, size){
					$("#delIds").val('');
				},
				queryParams : function(params) {
					var pageNumber = 1;
					if(params.limit != 0){
						pageNumber = params.offset /params.limit+1;
					}
					params.pageSize=params.limit;
					params.pageNumber=pageNumber;					
					params['search_LIKE_propertyName'] = $("#condition").val() || "";
					params['search_LIKE_alarmResult'] = $("#alarmResult").val() || "";
					params['search_NOTEQ_alarmResult'] =  "摄像机视频异常";
					return params;
				}
		  }
		  C.createTable("#bootstrapTable",Constants.CONTEXT_PATH+ '/alarmcon/getPageList.do?fresh=' + Math.random(),settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb:function(){
		$("#bootstrapTable").bootstrapTable('refresh', {
			url:Constants.CONTEXT_PATH+'/alarmcon/getPageList.do?fresh=' + Math.random()
		});
		$("#delIds").val('');
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#search").click(function(){
			serverTable.refreshTb();
		});
	}
}

function typeFormatter(value, row, index) {
    if(value==-2){
    	return "动环设备";
    }else if(value==1){
    	return "核心服务器";
    }else if(value==2){
    	return "代理服务器";
    }else if(value==3){
    	return "视频网关";
    }else if(value==4){
    	return "时间服务器";
    }else if(value==5){
    	return "视频设备";
    }else if(value==6){
    	return "报警服务";
    }else if(value==7){
    	return "报警主机";
    }else if(value==8){
    	return "门禁服务";
    }else if(value==9){
    	return "电视墙服务";
    }else if(value==10){
    	return "电视墙解码器";
    }else if(value==11){
    	return "语音对讲服务";
    }else if(value==12){
    	return "语音对讲前端面板";
    }else if(value==13){
    	return "LED设备";
    }else if(value==14){
    	return "SMTP服务器";
    }else if(value==15){
    	return "视频质量诊断";
    }else if(value==16){
    	return "ATM智能视频设备";
    }else if(value==17){
    	return "ATM防护仓";
    }else if(value==18){
    	return "ATM防护仓设备";
    }else if(value==19){
    	return "网管服务";
    }else if(value==20){
    	return "地图引擎服务";
    }else if(value==21){
    	return "环境检测设备";
    }else if(value==22){
    	return "接警中心服务";
    }else if(value==23){
    	return "款车到达检测设备";
    }else if(value==24){
    	return "摄像机";
    }else{
    	return "全部";
    }
}



function operateFormatter(value, row, index) {
	if(value==0){
	   return ['<a class="enable" href="javascript:void(0)" title="启用">','<i class="glyphicon glyphicon-ok"></i>','</a>'].join("");
	}else{
	   return ['<a class="noenable" href="javascript:void(0)" title="禁用">','<i class="glyphicon glyphicon-remove"></i>','</a>'].join("");
	}
}

window.operateEvents = {
	'click .enable' : function(e, value, row, index) {
			$.ajax({
				url:Constants.CONTEXT_PATH+'/alarmcon/enablePlatform.do',
				data:{id:row.id,isEnable:1},
				dataType:'json',
				success:function(data){
					layer.alert(data.msg,{icon: 1});
					serverTable.refreshTb();
				}
			});
	},
	'click .noenable' : function(e, value, row, index) {
			$.ajax({
				url:Constants.CONTEXT_PATH+'/alarmcon/enablePlatform.do',
				data:{id:row.id,isEnable:0},
				dataType:'json',
				success:function(data){
					layer.alert(data.msg,{icon: 1});
					serverTable.refreshTb();
				}
			});
	}
	
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
//	$('#alarmResult').html(createSearchSelectOptions('ALARM_TYPE'));
	$.ajax({
		url:Constants.CONTEXT_PATH+'/home/getAllSysEquProperties.do',
		dataType:'json',
		success:function(result){
			if(result.data&&result.data.length>0){
				var options ='<option value="">--全部--</option>';
				 for (i = 0; i < result.data.length; i++) {
		            options += '<option>'+result.data[i]+'</option>';
		        }  
		        $("#condition").append(options);
			}
		},
		error:function(){
			layer.alert('请求服务器出错！',{icon: 2});
		}
	});
	//添加按钮
	$("#addBtn").click(function(){
		popUpWindow.editServer(null);
	});
	$("#editBtn").click(function(){
		var Ids = $("#delIds").val();
		Ids = Ids.substring(0,Ids.length-1);
		if(typeof(Ids) == 'undefined' || Ids == ''){
			layer.alert('请选择需要修改的记录!',{icon: 0});
			return;
		}else if(isNaN(Ids)){
			layer.alert('只能选择一条记录!',{icon: 0});
			return;
		}
		popUpWindow.editServer(Ids);
	});
	$("#delBtn").click(function(){
		var Ids = $("#delIds").val();
		Ids = Ids.substring(0,Ids.length-1);
		popUpWindow.deleteServer(Ids);
	});
}

/**
 * 弹出窗
 */
var popUpWindow = {
	/**
	 * 新增
	 */
	editServer:function(id){
		var d = top.layer.open({
			type: 2,
			area:['600px','400px'],
			title: '新增参数',
			content:Constants.CONTEXT_PATH+'/param/modify?paramId='+id,
			btn: ['确定', '取消'],
			yes: function (index, layero) {
				var iframeNode = top.window[layero.find('iframe')[0]['name']];
				if (iframeNode.validator.isPass()) {
					iframeNode.postData.postAciton();
					serverTable.refreshTb();
					return true;
				}else{
					return false;
				}
			},
			cancel: function () {
				
			}
		});
	},
	/**
	 * 删除
	 */
	deleteServer:function(Ids){
		if(typeof(Ids) == 'undefined' || Ids ==''){
			layer.alert('请至少选择一条记录!',{icon: 0});
		}else{
			layer.confirm('确定要删除参数？', function(index){
				  $.ajax({
							data:{ids:Ids},
							dataType:'json',
							type:'POST',
							url:Constants.CONTEXT_PATH+'/alarmcon/delete.do',
							success:function(data){
								if(data.ret == 1){
									layer.alert(data.msg,{icon: 1});
									serverTable.refreshTb();
									layer.close(index);
								}else{
									layer.alert(data.msg,{icon: 1});
								}
							},
							error:function(){
								layer.alert("请求服务器出错！",{icon: 2});
							}
				  });
			});  
		}
	}
}



