/**
 * 过程列表详情
 */

//////////////////////////////////////////常量////////////////////////////////////////////////////
var initFireParaDetailGridUrl="";
var getDataUrl=Constants.CONTEXT_PATH + '/fsuinfo/getDeviceSignalOperationPageList?fresh=' + Math.random();

$(function() {
	// 初始化表格
	serverTable.setTable();
	serverTable.searchTb();
	serverTable.exportTb();
})

/**
 * 初始化表格
 */
var serverTable = {
		/**
		 * 设置表格
		 */
		setTable : function() {
			var settings = {
				classes : 'table table-hover',
				queryParams : function(params) {
					var pageNumber = 1;
					if(params.limit != 0){
						pageNumber = params.offset /params.limit+1;
					}
					params.pageSize=params.limit;
					params.pageNumber=pageNumber;
					params['sortType'] = 'DESC_operationTime';
					params['search_GE_operationTime']=$("input[name='settingFireParamBeginDT']").val();
					params['search_LE_operationTime']=$("input[name='settingFireParamEndDT']").val();
					params['search_EQ_deviceId']=deviceId;
					return params;
				}
			}
			C.createTable("#fireParamsDetailTB", getDataUrl, settings);
		},
		/**
		 * 更新表格
		 */
		refreshTb : function() {
			$("#fireParamsDetailTB").bootstrapTable('refresh', {
				url : getDataUrl
			});
		},
		/**
		 * 查询数据
		 */
		searchTb:function(){
			$("#fireParamDetailQueryBtn").click(function(){
				serverTable.refreshTb();
			});
		},
		/**
		 * 导出清单
		 */
		exportTb:function(){
			$("#exportFieParamDetail").click(function(){
				var params = {};
				var pageNumber = 1;
				params.pageSize=100000;
				params.pageNumber=pageNumber;
				params['search_EQ_deviceId']=deviceId;
				var url=Constants.CONTEXT_PATH + '/fsuinfo/getDeviceSignalOperationExcel.do?'+Util.param(params);
	        	download_file(url);   
			})
		}
	}



function switchSetUpValFormat(value,row,index){ //bootstrap表格开关转换函数
	var str = row.signalName;
	if(str.indexOf('开关')!=-1 || str.indexOf('清除报警')!=-1){
		return value==1?"开":"关";
	}
	if(str.indexOf('日期时间')!=-1){
		return getTimeDetail(parseFloat(value*1000));
	}
	return value;
}

/**
 * 设置时间列数据处理显示
 * @param value
 * @param row
 * @param index
 * @returns {String}
 */
function dateFormat(value,row,index){
	return getTimeDetail(value.time);
}


/**
 * 根据时间搓格式化时间
 * @param obj
 * @returns {String}
 */
function getTimeDetail(obj){
    var TIME = new Date(obj);
    var iYear = TIME.getFullYear();
    var iMonth = TIME.getMonth() + 1;
    var iDate = TIME.getDate();
    var iDay = TIME.getDay();
    var iHours = TIME.getHours();
    var iMinutes = TIME.getMinutes();
    var iSeconds = TIME.getSeconds();
    if(iMinutes < 10) {
        iMinutes = "0" + iMinutes
    };
    if(iHours < 10) {
        iHours = "0" + iHours
    };
    if(iSeconds < 10) {
      iSeconds = "0" + iSeconds
    };
    var res=iYear+'-'+iMonth+'-'+iDate+' '+iHours+':'+iMinutes+':'+iSeconds;
  return res;
}

/**
 * 下载文件
 * @param url
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