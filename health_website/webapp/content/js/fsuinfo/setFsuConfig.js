/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	var layerIndex;
	validator.verify1();
	validator.verify2();
	$("#delIds").val('');
	initEvent();
	initData();
	eqTable.setTable();
	$("[data-rightcode]").each(function(){
		var $em = $(this);
		var rightCode = $em.data("rightcode");
		if(top.checkRight(rightCode)){
    		$em.css('display','block');
    		
		}else{
			
		}
  	});
	var checked = $('#bindFlag').is(":checked");
	if(checked){
		$('#bindBtn').attr("disabled", false);
		$('#unbindBtn').attr("disabled", true);
	}else{
		$('#bindBtn').attr("disabled", true);
		$('#unbindBtn').attr("disabled", false);
	}
});
function initEvent(){
	$("#eq-refreshBtn").click(function(){
		eqTable.refreshTb();
	});
	$('#bindFlag').click(function(){
		var checked = $('#bindFlag').is(":checked");
		if(checked){
			$('#bindBtn').attr("disabled", false);
			$('#unbindBtn').attr("disabled", true);
		}else{
			$('#bindBtn').attr("disabled", true);
			$('#unbindBtn').attr("disabled", false);
		}
		$("#delIds").val('');
		eqTable.refreshTb();
	});
	
	$('#searchBtn').click(function(){
		eqTable.refreshTb();
	});
	
	$('#bindBtn').click(function() {
		if (validator.isPass()) {
			if(parseInt($('#nTimePeriod').val())<=parseInt($('#nFrequ').val())){
				top.layer.alert('ping包时长必须大于ping包频率!',{icon: 0});
				return false;
			}
			var Ids = $("#delIds").val();
			Ids = Ids.substring(0,Ids.length-1);
			if(typeof(Ids) == 'undefined' || Ids ==''){
				top.layer.alert('请至少选择一条记录!',{icon: 0});
				return false;
			}
			var data = {
				fsuId : postData.fsuId(),
				equipmentIds : postData.delIds(),
				nFrequ : $("#nFrequ").val(),
				fMaxRoundTripAvg : $("#fMaxRoundTripAvg").val(),
				nMaxPacketLoss : $("#nMaxPacketLoss").val(),
				nTimePeriod : $("#nTimePeriod").val()
			}
			postLinkInfo.link(data);// 绑定			
		}
	});
	$('#unbindBtn').click(function(){
		if (validator.isPass()) {
			if(parseInt($('#nTimePeriod').val())<=parseInt($('#nFrequ').val())){
				top.layer.alert('ping包时长必须大于ping包频率!',{icon: 0});
				return false;
			}
			var Ids = $("#delIds").val();
			Ids = Ids.substring(0,Ids.length-1);
			if(typeof(Ids) == 'undefined' || Ids ==''){
				top.layer.alert('请至少选择一条记录!',{icon: 0});
				return false;
			}
			var data={
				fsuId : postData.fsuId(),
				equipmentIds :postData.delIds(),
				nFrequ : $("#nFrequ").val(),
				fMaxRoundTripAvg : $("#fMaxRoundTripAvg").val(),
				nMaxPacketLoss : $("#nMaxPacketLoss").val(),
				nTimePeriod : $("#nTimePeriod").val()
			}
			postLinkInfo.unlink(data);//解绑
		}
	});
	
	$('#saveParamBtn').click(function(){
		setFsuConfig.setConfig();
	});
}


var eqTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {
		var height = 360;
		var settings = {
			classes : 'table table-hover',
			height : height,
			onCheckAll : function(rows) {
				$("#delIds").val('');
				$.each(this.data, function(i, item) {
					var delIds = $("#delIds").val();
					$("#delIds").val(delIds + item.equipmentId + ',');
				});
			},
			// 取消全部
			onUncheckAll : function(rows) {
				$("#delIds").val('');
			},
			// 单次勾选
			onCheck : function(row, $element) {
				var delIds = $("#delIds").val();
				$("#delIds").val(delIds + row.equipmentId + ',');
			},
			// 取消单次勾选
			onUncheck : function(row, $element) {
				var delIds = $("#delIds").val();
				var replaceStr = row.equipmentId + ',';
				var reg = new RegExp(replaceStr, "g");
				var newStr = delIds.replace(reg, "");
				$("#delIds").val(newStr);
			},
			// 翻页时清空勾选信息
			onPageChange : function(number, size) {
				$("#delIds").val('');
			},
			queryParams : function(params) {
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;
				var checked = $('#bindFlag').is(":checked");
				if(checked){
					params['search_ISNULL_fsuId'] = fsuId || "-1";
				}else{
					params['search_EQ_fsuId'] = fsuId || "-1";
				}
				params['search_ISNOTNULL_netAddress'] = '1';
				params['search_LIKE_name'] = $('#equ_name').val()||"";
//				params['search_ORGLIKE_path'] = treeSelectOrgId;
				params['search_NOTEQ_equipmentTypeId'] =  -2;
				return params;
			}
		}
		C.createTable("#bootstrapTable_eq", Constants.CONTEXT_PATH+ '/sysdev/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#bootstrapTable_eq").bootstrapTable('refresh', {
			url : Constants.CONTEXT_PATH + '/sysdev/getPageList.do?fresh=' + Math.random()
		});
	},
	
	/**
	 * 更新行数据
	 */
	updateRow : function(index, row){
		$("#bootstrapTable_eq").bootstrapTable("updateRow", {index  :index, row : row});
	}
}
//序号
function numberFormatter(value, row, index) {
	return index + 1;
}

//状态格式化
function bindStatusFormater(value, row, index) {
	if(value.length>0){
		return '已绑定';
	}
	return '未绑定';
}

/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
}

/**
 * 弹出窗
 */
function initData(){
	$('#fsuIdText').text(name);
	// 赋值
	$.ajax({
				async : true,
				url : Constants.CONTEXT_PATH + '/fsuinfo/getConfigById.do?fresh=' + Math.random(),
				data : {
					id : fsuId
				},
				dataType : 'json',
				success : function(data) {
					if(!data || !data.result){
						return ;
					}
					$("#nFrequ").val(data.config.nFrequ);
					$("#fMaxRoundTripAvg").val(data.config.fMaxRoundTripAvg);
					$("#nMaxPacketLoss").val(data.config.nMaxPacketLoss);
					$("#nTimePeriod").val(data.config.nTimePeriod);
				},
				error : function() {
					
				}
			});
		
}

/**
 * 提交信息
 */
var postData = {
	delIds : function(){
		return  $('#delIds').val();
	},
	fsuId : function() {
		return fsuId;
	},
	nFrequ : function(){
		return $("#nFrequ").val();
	},
	fMaxRoundTripAvg : function(){
		return $("#fMaxRoundTripAvg").val();
	},
	nMaxPacketLoss : function(){
		return $("#nMaxPacketLoss").val();
	},
	nTimePeriod : function(){
		$("#nTimePeriod").val();
	}
}

var setFsuConfig = {
		setConfig : function(){
			var params = {
					fsuId : fsuId,
					nFrequ : $("#nFrequ").val(),
					fMaxRoundTripAvg : $("#fMaxRoundTripAvg").val(),
					nMaxPacketLoss : $("#nMaxPacketLoss").val(),
					nTimePeriod : $("#nTimePeriod").val()
			}
			url = Constants.CONTEXT_PATH + '/fsuinfo/setFsuConfig.do';
			$.ajax({
				async : false,
				data : params,
				dataType : 'json',
				url : url,
				type:'post',
				beforeSend:function(XMLHttpRequest){
					layerIndex=layer.load();
				},
				success : function(data){
					layer.close(layerIndex);
					if(data.ret == '1'){
						layer.alert(data.ret+' : '+data.msg, {icon : 1});
						return true;
					}else {
						layer.alert(data.msg, {icon : 0});
						return false;
					}					
				},
				error : function() {
					layer.close(layerIndex);
					layer.alert("请求服务器失败！", {icon : 0});
					return false;
				}
			})
		}
}
/**
 * 绑定与解绑
 */
var postLinkInfo = 
	{
		/**
		 * 解绑
		 * @param data
		 * @returns {Boolean}
		 */
		unlink : function(data)
		{
			var bol = false;
			url = Constants.CONTEXT_PATH + '/sysdev/unlinkFsu.do?fresh=' + Math.random()
			$.ajax({
				async : false,
				data : data,
				dataType : 'json',
				url : url,
				beforeSend:function(XMLHttpRequest){
					layerIndex=layer.load();
				},
				success : function(data) {
					$("#delIds").val('');
					layer.close(layerIndex);
					if (data.ret == 1) {
//						setFsuConfig.setConfig();
						eqTable.refreshTb();
						bol = true;
						//return true;
					} else {
						layer.alert(data.msg, {icon : 1});
						//return false;
					}
				},
				error : function() {
					layer.close(layerIndex);
					layer.alert("请求服务器失败！", {icon : 0});
					//return false;
				}
			});
			return bol;
		},
		/**
		 * 绑定
		 * @param data
		 * @returns {Boolean}
		 */
		link : function(data)
		{
			var bol = false;
			url = Constants.CONTEXT_PATH + '/sysdev/linkFsu.do?fresh=' + Math.random()

			var ajaxTimeoutTest = $.ajax({
				async : false,
				data : data,
				dataType : 'json',
				url : url,
				beforeSend:function(XMLHttpRequest){
					layerIndex=layer.load();
				},
				success : function(data) {
					$("#delIds").val('');
					layer.close(layerIndex);
					if (data.ret == 1) {
//						setFsuConfig.setConfig();
						eqTable.refreshTb();
						bol = true;
					} else {
						layer.alert(data.msg, {
									icon : 1
								});
						//return false;
					}
				},
				error : function() {
					layer.close(layerIndex);
					layer.alert("请求服务器失败！", {
								icon : 1
							});
					//return false;
				}
			});
			return bol;
		}
	}
/**
 * 验证规则
 */
var validator = {
	/**
	 * 验证填写1
	 */
	verify1 : function() {
		$("#eqwin").validator({
					fields : {
						'processResult' : 'required'
					}
				});
	},
	
	verify2:function(){
	    $('#fsuConfigForm').validator({
	        fields: {
	            'nFrequ': 'required;number;range[1~]',
	            'fMaxRoundTripAvg': 'required;number;range[1~]',
	            'nMaxPacketLoss': 'required;number;range[1~]',
	            'nTimePeriod': 'required;number;range[1~]'
	        }
	    })
	},
	/**
	 * 判断验证是否通过
	 */
	isPass : function() {
		var mark = false;
		$('#fsuConfigForm').isValid(function(v){    
		    if(v){
		    	mark = true;
		    }
		});
		return mark;
	}
};
