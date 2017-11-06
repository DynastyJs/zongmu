$.ajaxSetup ({ 
    cache: false //关闭AJAX相应的缓存 
});


window.C = window.common = (function(){

    /**
     * 构建表格
     * @param id	选择器
     * @param url	请求URL
     * @param obj	{}
     * @returns
     */
   var _createTable =  function (id,url,obj){
        var settings = {
            url : url,
            classes:'table table-hover table-striped',
            method : 'get',
            undefinedText : '暂无',
            dataType : "json",
            pagination : true,
            sidePagination : 'server',
            cache : false,
	        formatLoadingMessage : function() {
	            return '加载中, 请稍等…';
	        },
	        formatShowingRows : function(pageFrom, pageTo, totalRows){
	            return ' 总共 <b class="total-row">' + totalRows + '</b> 条记录';
	        },
	        formatRecordsPerPage : function(pageNumber) {
	            return '每页显示 ' + pageNumber + ' 条';
	        },
        	paginationPreText : "<i class='glyphicon glyphicon-menu-left'></i>",
       	 	paginationNextText : "<i class='glyphicon glyphicon-menu-right'></i>",
	        queryParams : function(params) {
	            return params;
	        },
            responseHandler :  function(res) {
				if (res) {
					return {
						"rows" : res.content,
						"total" : res.totalElements
					};
				} else {
					return {
						"rows" : [],
						"total" : 0
					};
				}
			}
        };
        var result = $.extend({},settings,obj || {});

        return $(id).bootstrapTable(result);

    };
    
    /**
     * 构建输入时自动过滤下拉框
     * @param id	选择器
     * @param url	请求URL
     * @param obj	{}
     * @returns
     */
    var _createBootstrapSuggest = function(id,url,obj){
    	
    	var settings = {
    		indexId: 2, 
	        indexKey: 1, //data.value 的第几个数据，作为input输入框的内容
	        url : url,
	        idField: "id", //每组数据的哪个字段作为 data-id，优先级高于 indexId 设置（推荐）
			keyField: "name",  
	        effectiveFields: ['name'] ,
	        processData: function(json){     // url 获取数据时，对数据的处理，作为 getData 的回调函数
	            var i, len, data = {value: []};
	
	            if(!json  || json.length == 0) {
	                return false;
	            }
	
                len = json.length;

	            for (i = 0; i < len; i++) {
	                data.value.push({
	                    "id": json[i].id,
	                    "name": json[i].fieldName
	                });
	            }
	            return data;
	        }
	    }
	    
	    $.extend(settings,obj || {});

        return $(id).bsSuggest(settings);
    
    
    }


    return {
        createTable: _createTable,
        createBootstrapSuggest : _createBootstrapSuggest
    };

})();

function getDictionaryFieldsByCatalogCode(code){
	var data = null;
	$.ajax({
		 url : Constants.CONTEXT_PATH
				+ "/home/getDictionaryFieldsByCatalogCode.do?fresh="+Math.random(),
		data:{'appCode':'health_website','catalogCode':code},
		type : 'GET',
		async:false,
		dataType : 'json',
		success : function(json) {
//			var i, len, data = {value: []};
	            if(!json || !json.data || json.data.length == 0) {
	                return null;
	            }
				data = json.data;
//              len = json.data.length;
//				var options ='<option>--请选择--</option>';
//	            for (i = 0; i < len; i++) {
//	                options += '<option>'+json.data[i].fieldName+'</option>';
//	            }
//	           return options;
		}
	});	
	
	return data;
}

function createAutoRefreshSelectOptions(){
	var result = getDictionaryFieldsByCatalogCode('REFRESH_TIME');
	var options ='';
	if(result!=null){		
        for (i = 0; i < result.length; i++) {
            options += '<option value='+result[i].fieldDesc+'>'+result[i].fieldName+'</option>';
        }     
	}
	return options;
}

var maxMaskTime = '';
function getMaxMaskTime(){
	if(maxMaskTime==''){
		setMaxMaskTime();
	}
	return maxMaskTime;
}

function setMaxMaskTime(){
	var result = getDictionaryFieldsByCatalogCode('MASK_TIME');
	if(result!=null){		
        for (i = 0; i < result.length; i++) {
        	maxMaskTime = result[i].fieldValue;
        }     
	}
}

function createSearchSelectOptions(code){
	var result = getDictionaryFieldsByCatalogCode(code);
	var options ='<option value="">--全部--</option>';
	if(result!=null){		
        for (i = 0; i < result.length; i++) {
            options += '<option>'+result[i].fieldName+'</option>';
        }     
	}
	return options;
}
function createSelectOptions(code){
	var result = getDictionaryFieldsByCatalogCode(code);
	var options ='<option value="">--请选择--</option>';
	if(result!=null){		
        for (i = 0; i < result.length; i++) {
            options += '<option value="'+result[i].fieldName+'">'+result[i].fieldName+'</option>';
        }     
	}
	return options;
}

/**
 * 组织结构树设置
 */
//var orgZtree = {
//	/**
//	 * 参数设置
//	 */
//	setting : {
//		view : {
//			selectedMulti : true,
//			showIcon : true,
//			dblClickExpand: false,
//			showLine: true
//		},
//		data : {
//			simpleData : {
//				enable : true,
//				idKey : "id",
//				pIdKey : "parentId",
//				rootPId : -1
//			}
//		},
//		edit: {
//			enable: true,
//			showRenameBtn: true,
//			renameTitle: "旁路",
//			showRemoveBtn: true,
//			removeTitle: "取消旁路"
//
//		}
//
//	},
//
//
//	/**
//	 * 组织机构数据属性
//	 */
//	zNodes : function(){
//		var treeData;
//		$.ajax({
//			url : Constants.CONTEXT_PATH+'/home/getAllOrgTree.do',
//			dataType:'json',
//			async:false,
//			success:function(data){
//				treeData = data;
//			},
//			error:function(){
//				alert("error!");
//			}
//		});
//		return treeData;
//	}
//	/*[
//      {name:"test1", open:true,children:[{name:"test1_1"}, {name:"test1_2"}]},
//      {name:"test2", open:true, children:[{name:"test2_1"}, {name:"test2_2"}]}
//      ],*/
//}


	
	/**
 * 下拉树菜单
 */
// TODO 归到全局globalVariable
var G = {};
G.orgTree = {
	urls : {
		findOrgMgrTreeUrl : Constants.CONTEXT_PATH+'/home/getAllOrgTreeByOrgId.do?fresh='+Math.random()
	},
	treeSetting : {//树菜单设置项
		view : {
			selectedMulti: false,
			showIcon : true,
			dblClickExpand: false,
			showLine: true
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : 0
			}
		},
		edit: {
//			enable: true,
//			showRenameBtn: true,
//			renameTitle: "旁路设置",
//			showRemoveBtn: false

		}
	}
};



/**
 * 组织树
 * @author skz
 * @date 2016年3月23日
 * @time 下午4:39:24
 */

var orgTree = {};

/**
 * 参数设置
 */
orgTree.settings = $.extend(true,{oTree : null},G.orgTree);
/**
 * 地图实例对象
 */
orgTree.map = null;
/**
 * 驱动OT树
 */
orgTree.launch = function(){
	this.initOpts();
};
/**
 * 初始树操作
 */
orgTree.initOpts = function(){
	this.initTree();
}
/**
 * 加载树菜单
 */
orgTree.initTree = function(){
	var self = this,treeCallback = this.settings.treeSetting.callback;
//	treeCallback.onClick = this.OnClick;		//注册点击事件
	$.getJSON(this.settings.urls.findOrgMgrTreeUrl,{type:1},function(zNodes){
		var data = getDictionaryFieldsByCatalogCode('ORG_LEVEL');
		var reg = /#/g;
		for (var i=0, l=zNodes.length; i<l; i++) {
			if(data!=null){
				for(var j=0;j<data.length;j++){
					if(zNodes[i].path.match(reg).length-1==data[j].fieldValue){
						if (data[j].fieldName.indexOf('分行')>-1) {
							zNodes[i].iconSkin =  "zh";
						}else if (data[j].fieldName.indexOf('支行')>-1){
							zNodes[i].iconSkin = "fh" ;
						}else if (data[j].fieldName.indexOf('网点')>-1){
							zNodes[i].iconSkin = "bh" ;
						}else{
							zNodes[i].iconSkin =  "bh";
						}
					}
				}
			}
		}
		self.settings.oTree = $.fn.zTree.init($("#orgtree"), self.settings.treeSetting, zNodes);
		//默认选中第一个节点
		 var nodes = self.settings.oTree.getNodes();
		 if (nodes.length>0){
	        self.settings.oTree.selectNode(nodes[0]);
	        treeCallback.onClick(null, nodes[0].id, nodes[0]);//调用事件  
		 }

		self.autoComplete(zNodes, self.settings.oTree);
	})
}
/**
 * 将树节点信息转为AutoComplete的数据格式
 * @param treeNodes 树节点
 * @param list[]	转换后的数据
 */
orgTree.tree2AutoComplete = function(treeNodes, list){
	for ( var i in treeNodes) {
		(treeNodes[i].id != -1) && list.push({//获取非根节点数据项
			label : treeNodes[i].name,
			id : treeNodes[i].id,
			nodeType : treeNodes[i].nodeType
		});
		treeNodes[i].children.length > 0 && this.tree2AutoComplete(treeNodes[i].children, list);
	}
	return list;
}
/**
 * 搜索栏自动检索
 * @param treeNodes 树节点
 * @param zTree 	树实例对象
 */
orgTree.autoComplete = function(treeNodes, zTree){
	var data = this.tree2AutoComplete(treeNodes, new Array());
	$("#devSearch").autocompleter({
		source : data,
		limit : 5,
		highlightMatches : true, // 高亮匹配的值
		customValue : "label", // 显示在input上的value
		callback : function(label, index, selected) {
			zTree.getNodesByFilter(function(node) {
				(node.id == selected.id && node.nodeType == selected.nodeType) && zTree.selectNode(node);
			});
		}
	})
}


orgTree.OnClick = function(event, treeId, treeNode){
	
}

/**
	树操作工具方法
------------------------------------------------------------*/
/**
 * 获取树实例
 */
orgTree.getTreeInstance = function(){
	return this.settings.oTree ? this.settings.oTree : null;
};

/**
 * 获取选中树节点ID
 */
orgTree.getSelectedNodeId = function(){
	var treeIns = this.getTreeInstance(),node = treeIns.getSelectedNodes()[0],nodeId;
	nodeId = node ? node.id : "";
	return nodeId;
}


/**
 * 查找历史日志弹出框
 */
function searchHistoryLog(equipenmentId,propertyName){
	
  layer.open({
	  type: 2,
	  title: '历史日志查询',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['90%', '90%'],
	  content: Constants.CONTEXT_PATH+ "/uialarm/logindex?equId="+equipenmentId+"&type="+ propertyName//iframe的url
   }); 
}

/**
* 时间对象的格式化
*/
Date.prototype.format = function(format)
{
	/**
		format="yyyy-MM-dd hh:mm:ss";
	**/
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	};
	
	if (/(y+)/.test(format))
	{
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
		- RegExp.$1.length));
	}
	
	for (var k in o)
	{
		if (new RegExp("(" + k + ")").test(format))
		{
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
					? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

function toExceptPage(row,code){
	var alarmType = row.alarmType;
	if(alarmType=="\tA类网络设备异常"||alarmType=="\tB类网络设备异常" ||alarmType=="B类网络设备异常"||alarmType=="A类网络设备异常"){
		return "/netstatus/handlingWin?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
	}else if(alarmType=="服务器系统资源异常"||alarmType=="PC系统资源异常"){
		return "/sysdev/sysdevHandle?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
	}else if(alarmType=="硬盘录像机硬盘异常"){
		return "/sysdev/diskHandle?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
	}else if(alarmType=="UPS工作异常"){
		return "/sysdev/upsHandle?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
	}else if(alarmType=="电气火灾监测异常"){
		var codeKey = code.substr(7,2);
		if(codeKey==45){
			//电气火灾探测器
			return "/sysdev/fireHandle?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
		}
		if(codeKey==46){
			//多回路电气火灾探测器
			return "/sysdev/mulipathFireHandle?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
		}
		if(codeKey==47){
			//多回路监控器
			return "/sysdev/mulipathMonitorHandle?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
		}
		return null;
	}else if(alarmType=="市电异常"||alarmType=="DI输入报警"||alarmType=="温湿度异常"){
		return "/sysdev/upsHandle?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
//	}else if(alarmType=="温湿度异常"){
//		return "/sysdev/envirementHandle?propertyName="+row.propertyName+"&equipmentId="+row.equipmentId;
	}else if(alarmType=="录像存储异常"||alarmType=="录像存储时间异常"){
		var recordDate = null;
		url =  Constants.CONTEXT_PATH + '/record/getMaxRecordDate.do?fresh=' + Math.random()+"&dvsEquipmentId="+row.equipmentId;
		$.ajax({
			url: url,
			async:false,
			success :function(data){
				if(data.result != null){
					recordDate = data.result;
				}else{
					var nowDate = new Date();
			        recordDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-1).format('yyyy-MM-dd');
				}
			},
			error: function () {
				ShowLayerFailure("请求服务器失败！");
				return false;
			}
		});

		return "/record/handle?dvsEquipmentId="+row.equipmentId+'&equipmentId='+row.equipmentId+'&recordDate='+recordDate;	
	}else if(alarmType=="摄像机视频异常"){
		return "/diagnosis/diagnosisHandle?dvsEquipmentId="+row.equipmentId+'&equipmentId='+row.equipmentId;	
	}else{
		return null;
	}
}

/**
 * 关注或报修 操作
 * @param flag 标识关注还是报修
 * @param status 1 0
 * @param prestatus 失败之后回到之前状态
 * @constructor
 */
function FPEquipmentStatus(equipmentId,propertyName,type,flag,status,prestatus,needAlert){
	dcmId = "#"+flag;
	var data ={
		equipmentId:equipmentId,
		flag:flag,
		status:status,
		propertyName:propertyName,
		type :type
	};
	url =  Constants.CONTEXT_PATH + '/focuRepair/FPEquipmentStatus.do?fresh=' + Math.random();
	$.ajax({
		data :data,
		url: url,
		success :function(data){
			if(data.ret != 1){
				$(dcmId).prop("checked",prestatus);
			}
			if(needAlert!=false){
				if(flag=="focusFlag"){
					if(status==1){  
						ShowLayerSuccess("关注成功！");
					}else{
						ShowLayerSuccess("取消关注成功！");
					}
				}else{
					if(status==1){
						ShowLayerSuccess("报修成功！");
					}else{
						ShowLayerSuccess("取消报修成功！");
					}
				}
			}
			return true;
		},
		error: function () {
			$(dcmId).prop("checked",prestatus);
			ShowLayerFailure("请求服务器失败！");
			return false;
		}
	});
}


/**
 * 设置跳转中要带的参数，在处理页面窗口中需要使用到的参数
 * @param status ==  propertyName
 * @param equId == equipmentId
 * @param alarmType == 告警类型，用于跳转页面
 */
function setProperties(row,code) {
	var toUrl = toExceptPage(row,code);
	if(toUrl!=null){
		var pageUrl =  Constants.CONTEXT_PATH +toUrl;
		showDialog(pageUrl,row.alarmType);
	}
}
/**
 *  显示处理页面窗口
 * @param url 窗口地址，后台跳转
 */
function showDialog(url,alarmType){
	var title=alarmType+"处理";
//	if(url.indexOf('/netstatus/handlingWin?')>-1){
//		title="网络设备异常处理";
//	}else if(url.indexOf('/sysdev/sysdevHandle?')>-1){
//		title="系统资源异常处理";
//	}else if(url.indexOf('/sysdev/diskHandle?')>-1){
//		title="硬盘录像机硬盘异常处理";
//	}else if(url.indexOf('/record/handle?')>-1){
//		title="录像存储异常处理";
//	}else if(url.indexOf('/diagnosis/diagnosisHandle?')>-1){
//		title="视频诊断异常处理";
//	}else if(url.indexOf('/sysdev/upsHandle?')>-1){
//		title="UPS工作异常处理";
//	}else if(url.indexOf('/sysdev/envirementHandle?')>-1){
//		title="温湿度异常处理";
//	}
	var win = top.layer.open({
	  type: 2,
	  title: title,
      shadeClose: false,
	  area: ['90%', '90%'],
	  btn: ['关闭'],
	  content: url,
	  yes: function(index, layero){
	  	//询问框
//		top.layer.confirm('要确认报警信息么？', {
//		  btn: ['是','否'] //按钮
//		}, function(index){
//			top.layer.close(index);
//			var iframeNode = top.window[layero.find('iframe')[0]['name']];
//			if (iframeNode.validator.isPass()) {
//				iframeNode.postData.postAciton();
//				setTimeout(function(){top.layer.close(win)},1000);
//			} else {
//				return false;
//			}
//		}, function(){
//
//		});
	  	top.layer.closeAll();
//	  	if(typeof(alarmTable) != "undefined"){
//	  		alarmTable.refreshTb();  	
//	  	};
//	  	if(typeof(serverTable) != "undefined"){
//	  		serverTable.refreshTb();  	
//	  	};
//	    	
	  },
//	  cancel: function(index){ 
	  	
//	  },
//	  success: function(layero, index){
//	    	top.hasShowHandWin = true;
//	  },
	  end:function(){
		  	if(typeof(alarmTable) != "undefined"){
		  		alarmTable.refreshTb();  	
		  	};
		  	if(typeof(serverTable) != "undefined"){
		  		serverTable.refreshTb();  	
		  	};
	  }
   }); 
   
//	var d = dialog({
//		title: '处理',
//		url:url,
//		okValue: '确 定',
//		ok: function () {
//			var iframeNode = this.iframeNode.contentWindow;
//			if (iframeNode.validator.isPass()) {
//				iframeNode.postData.postAciton("chuli");
//				iframeNode.validator.verify1();
//			} else {
//				return false;
//			}
//		},
//		cancelValue: '取消',
//		cancel: function () {
//		}
//	});
//
//	d.showModal();
}

/**
 * 获取一个月最后一天
 * @param {} year
 * @param {} month
 * @return {}
 */
function getLastMonthDay( year, month){    
   var  day = new Date(year,month,0); 
   var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期  
   return lastdate;
}

function showMessageInfo(msg){
	layer.msg(msg,{area: ['auto', '40px'],offset: $(window).height(),closeBtn: 1 ,time: 500000}); 
}

function statusFormater(value,row,index){
	if(value == 1){
		return ['<i class="except"></i>'].join("");

	}else if(value==2){
		return ['<i class="equipmentError"></i>'].join("");
	}else{
		return ['<i class="equipmentNormal"></i>'].join("");
		//return '正常';
	}
}

function focusFormater(value,row,index){
	if(value==0){
//		return [
//			'<i class="focus"></i>'].join("");
	}else if(value==1){
//		return [
//			'<i class="hasfocus"></i>'].join("");
		return '已关注';
	}
	return "";
}

function maskFormater(value,row,index){
	if(value==1){
		return "已旁路";
	}else{
		return "";
	}
}
function repairFormater(value,row,index){
	if(value==1){
		return "已报修";
	}else{
		return "";
	}
}


//录像时间条列处理
function loseSpanFormater(value,row,index){	
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
	  		timeSpanStr += '<div style="position:relative;width:'+dayPercent+'%;height:20px;overflow:hidden;background:#51CA65;" onclick="enlargeImg(this)">';
	  }else if(selectDate>nowDateStr){
	  		return timeSpanStr;
	  }else{
	  	    timeSpanStr += '<div style="position:relative;width:100%;height:20px;overflow:hidden;background:#ffffff;" onclick="enlargeImg(this)">';
	  		var dateIntegrityInfo = row;
		  	if(dateIntegrityInfo.checkSpan.length>0){
		  		var checkSpanArr = eval(dateIntegrityInfo.checkSpan);
		  		for(var i=0;i<checkSpanArr.length;i++){		  			
					 timeSpanStr+=createSpanHtml(checkSpanArr[i],'定时录像模板','#51CA65');//绿色
	  			}
	  		}
		  if(value != null){
			  	if(dateIntegrityInfo.loseSpan.length>0){
		  		var loseSpanArr = eval(dateIntegrityInfo.loseSpan);
		  		for(var i=0;i<loseSpanArr.length;i++){
	 				timeSpanStr+=createSpanHtml(loseSpanArr[i],'定时录像丢失','#E0E0E0');//灰色
		  		}
		  	}
	  		if(dateIntegrityInfo.alarmLoseSpan.length>0){
		  		var alarmLoseSpanArr = eval(dateIntegrityInfo.alarmLoseSpan);
		  		for(var i=0;i<alarmLoseSpanArr.length;i++){
		  			timeSpanStr+=createSpanHtml(alarmLoseSpanArr[i],'报警录像','#ffb137');//暗黄色
		  		}
	  		}
		  }
	  }
	  timeSpanStr+='</div>';
	  return timeSpanStr;
//	return  '<div style="background: rgb(81, 202, 101); width: 100%; height: 20px; overflow: hidden; position: relative;">' +
//			'<div title="丢失时段&#10; 00:00:00至16:3:41" style="background: rgb(224, 224, 224); left: 0%; width: 66.92%; height: 20px; float: left; display: inline; position: absolute; cursor: pointer;">' +
//			'</div></div>';
}

function createSpanHtml(checkSpan,title,color){
	if(checkSpan.ST.length==0 || checkSpan.ET.length==0){
		return '';
	}
	var stSplitArr = checkSpan.ST.split(":");
	var etSplitArr = checkSpan.ET.split(":");
	var stSeconds = parseInt(stSplitArr[0],10)*3600+parseInt(stSplitArr[1],10)*60+parseInt(stSplitArr[2],10);
	var etSeconds = parseInt(etSplitArr[0],10)*3600+parseInt(etSplitArr[1],10)*60+parseInt(etSplitArr[2],10);
	if(etSeconds<stSeconds) return '';
	
	var timeInterval = etSeconds - stSeconds;
	if(color!='#51CA65'&&timeInterval<180){
		timeInterval = 180;
	}
	var left = 0;
	var checkPercent = 0;
	var daySeconds = 24*60*60;
//	if(selectDate == nowDateStr){
//		//今天的话按当前时间计算百分比
//		left = stSeconds*100/secondOfDay;
//		checkPercent = timeInterval*100/secondOfDay;
//	}else{
		left = stSeconds*100/daySeconds;
		checkPercent = timeInterval*100/daySeconds;
//	}
	//控制丢失时段太小显示不出来
//	if(color!='#51CA65'&&checkPercent<1){
//		checkPercent = 1;
//	}
	if(left>99){
		checkPercent=100-left;
	}
	//div修正百分比和宽度会自动舍弃第三位小数导致精度不准
	if((left+'').indexOf('.')>-1&&(checkPercent+'').indexOf('.')>-1&&(left+'').split('.')[1].length>3&&(checkPercent+'').split('.')[1].length>3){
		console.log((left+'').split('.')[1].substring(2,3)+(checkPercent+'').split('.')[1].substring(2,3));
		if((left+'').split('.')[1].substring(2,3)*1+(checkPercent+'').split('.')[1].substring(2,3)*1>=10){
			checkPercent=checkPercent+0.01;
		}
	}
	return '<div title="'+title+'时段&#10; '+checkSpan.ST+'至'+checkSpan.ET+'" style="position:absolute;float:left;height:20px;' +
			'left:'+left+'%;width:'+checkPercent+'%;cursor:pointer;background-color:'+color+';display:inline"></div>';
}

function alarmCountFormater(value, row, index) {
	return value+'<span style="color:green">('+row.alarmCount+')</span>';
}

//旁路列状态转换
function maskFormatter(value, row, index) {
	if(value=='1'){
		return '已旁路';
	}
	return '';
}

function alarmLevelFormatter(value){
	if(value=='紧急'){
		return '<span style="color:red">紧急</span>';
	}else if(value=='重要'){
		return '<span style="color:orange">重要</span>'; 
	}else if(value=='普通'){
		return '<span style="color:blue">普通</span>'; 
	}
}

//tip是提示信息，type:'success'是成功信息，'danger'是失败信息,'info'是普通信息
function ShowTip(tip, type) {
    var $tip = $('#tip');
    if ($tip.length == 0) {
        $tip = $('<span id="tip" style="font-weight:bold;position:fixed;bottom:-18px;padding:5px;left: 50%;z-index:9999"></span>');
        $('body').append($tip);
    }
    $tip.stop(true).attr('class', 'alert alert-' + type).text(tip).css('margin-left', -$tip.outerWidth() / 2).fadeIn(500).delay(5000).fadeOut(500);
}

function ShowMsg(msg) {
    ShowTip(msg, 'info');
}

function ShowSuccess(msg) {
    ShowTip(msg, 'success');
}

function ShowFailure(msg) {
    ShowTip(msg, 'danger');
}

function ShowWarn(msg, $focus, clear) {
    ShowTip(msg, 'warning');
    if ($focus) $focus.focus();
    if (clear) $focus.val('');
    return false;
}

function ShowLayerMsg(msg) {
   layer.alert(msg, {icon : 3});
}

function ShowLayerSuccess(msg) {
   layer.alert(msg, {icon : 1});
}

function ShowLayerFailure(msg) {
    layer.alert(msg, {icon : 2});
}

function ShowLayerWarn(msg) {
	layer.alert(msg, {icon : 0});
}

//序号
function numberFormatter(value, row, index) {
   var page = $("#bootstrapTable").bootstrapTable("getPage");  
   return page.pageSize * (page.pageNumber - 1) + index + 1;  
}

// 图片放大
function enlargeImg(thisDiv){
	winWidth = top.window.document.documentElement.clientWidth-40+'px';
	var layerContent = '<div style="height:37px;"><div style="position:relative;top:17px;width:'+winWidth+'">'+thisDiv.innerHTML+'</div><img src="../content/images/timeline3.png" style="width:100%;height:17px;position:relative;top:-4px;"/></div>';
	 top.layer.open({
		  type: 1,
		  shadeClose: true,
		  shade: 0.3,
		  title:false,
		  area: [winWidth, '37px'],
		  content:layerContent
	   }); 
}

//function enlargeImg(thisDiv){
//	console.log(thisDiv);
//	var layerContent = '<div style="height:37px;position:relative"><div style="position:absolute;top:18px;height:19px;width:100%">'+thisDiv.innerHTML+'</div><img src="../content/images/timeline4.png" style="width:100%;height:37px;"/></div>';
//	 winWidth = top.window.document.documentElement.clientWidth-40+'px';
//	 top.layer.open({
//		  type: 1,
//		  shadeClose: true,
//		  shade: 0.3,
//		  title:false,
//		  area: [winWidth, '38px'],
//		  content:layerContent
//	   }); 
//}





