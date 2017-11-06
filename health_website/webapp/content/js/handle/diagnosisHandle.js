var winIndex = parent.layer.getFrameIndex(window.name); // 获取窗口索引
$(function() {
			$("#delIds").val('');
			initData();
			initEvent();
			validator.verify1();
			alarmTable.setTable();
			$("[data-rightcode]").each(function() {
						var $em = $(this);
						var rightCode = $em.data("rightcode");
						if (top.checkRight(rightCode)) {
							$em.css('display', 'inline-block');
						}
					});
		});

function initEvent() {
	$('#processResult').append(createSelectOptions('DEAL_RESULT'));
	$('#focusFlag').change(function() {
				var checked = $(this).is(":checked");
				if (checked) { // 关注
					FPEquipmentStatus(equipmentId, '', "1", "focusFlag", 1,
							false);
				} else { // 取消关注
					FPEquipmentStatus(equipmentId, "", "1", "focusFlag", 0,
							true);
				}
			});

	// var checked = $('#repairFlag').is(":checked");
	// if(checked) { //已报修
	// $('#maskBtn').removeAttr('disabled');
	// }else{
	// $('#maskBtn').prop('disabled','disabled');
	// }

	$('#repairFlag').change(function() {
				var checked = $(this).is(":checked");
				if (checked) { // 已报修
				// $('#maskBtn').removeAttr('disabled');

					FPEquipmentStatus(equipmentId, '', "1", "repairFlag", 1,
							false);
				} else { // 取消已报修
				// $('#maskBtn').prop('disabled','disabled');
					// 取消旁路
					$('#unmaskBtn').click();
					FPEquipmentStatus(equipmentId, '', "1", "repairFlag", 0,
							true);
				}
			});
	$('#maskBtn').click(function() {
		var checked = $('#repairFlag').is(":checked");
		if (!checked) { // 已报修
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
					url : Constants.CONTEXT_PATH
							+ "/mask/saveEquByProperty.do",
					type:'POST',
					data : {
						orgId : $('#orgId').val(),
						equipmentId : equipmentId,
						isMask : 1,
						maskTime : $("#maskTime").val()
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
		
	});
	$('#unmaskBtn').click(function() {
		if ($("#maskTime").val() == '') {
			$('#maskBtn').show();
			$('#unmaskBtn').hide();
			$("#maskTime").val('');
			return;
		}
		$.ajax({
					url : Constants.CONTEXT_PATH
							+ '/mask/deleteByEquAndProperty.do',
					type:'POST',
					data : {
						ids : $('#maskId').val()
					},
					dataType : 'json',
					success : function(data) {
						ShowLayerSuccess('取消旁路设备成功!');
						$('#maskBtn').show();
						$('#unmaskBtn').hide();
						$("#maskTime").val('');
					},
					error : function() {
						ShowLayerFailure('请求服务器出错！');
					}
				});
	});
	$('#confirmBtn').click(function() {
		var Ids = $("#delIds").val();
		if(typeof(Ids) == 'undefined' || Ids ==''){
			ShowLayerWarn('请至少选择一条记录!');
			return;
		}
		if (validator.isPass()) {
			layer.confirm('要确认报警信息么？（建议故障修复后再确认报警）', {
				icon : 3,
				btn : ['是', '否']
					// 按钮
				}, function(index1) {
				layer.close(index1);
				postData.postAciton();
			}, function() {

			});

		}
	});
}

function initImg(chnnEquipmentId){
	var imgUrl = "../content/images/base/noImgUrl.png";
	$.ajax({
			async : false,
			url : Constants.CONTEXT_PATH
					+ '/diagnosis/getImgUrlByEquipmentId.do?fresh=' + Math.random(),
			data : {
				equipmentId : chnnEquipmentId
			},
			dataType : 'text',
			success : function(data) {
				if(data.length>0){
					imgUrl = data;
				}
				$('#imgId').attr('src', imgUrl);			
			},
			error : function() {

			}
		});
}

function initData() {
	$('#unmaskBtn').hide();
	$.ajax({
				async : false,
				url : Constants.CONTEXT_PATH + '/sysdev/findById.do?fresh=' + Math.random(),
				data : {
					id : dvsEquipmentId
				},
				dataType : 'json',
				success : function(data) {
					if (!data) {
						return;
					}
					$("#orgId").val(data.orgId);
					$("#orgName").text(data.orgName);
					$("#equipmentName").text(data.name);
					$("#equipmentTypeName").text(data.equipmentTypeName);
					$("#netAddress").text(data.netAddress);
					$("#netStatus").text(data.netStatus);
					$("#equipmentId").val(data.equipmentId);
					$('#propertyName').val(data.propertyName);
					dvsCode = data.code;

					// 设置关注报修初始状态
					$.ajax({
								async : false,
								url : Constants.CONTEXT_PATH
										+ '/focuRepair/getFPStatus',
								data : {
									equipmentId : equipmentId,
									type : '1'
								},
								dataType : 'json',
								success : function(data) {
									switch (data.focusFlag) {
										case "0" : {
											$('#focusFlag').prop("checked",
													false);
											break;
										}
										case "1" : {
											$('#focusFlag').prop("checked",
													true);
											break;
										}
										default : {
											$('#focusFlag').prop("checked",
													false);
											break;
										}
									}
									switch (data.repairFlag) {
										case "0" : {
											$('#repairFlag').prop("checked",
													false);
											break;
										}
										case "1" : {
											$('#repairFlag').prop("checked",
													true);
											break;
										}
										default : {
											$('#repairFlag').prop("checked",
													false);
											break;
										}
									}
								}
							});
					// 赋值
					$.ajax({
								async : false,
								url : Constants.CONTEXT_PATH
										+ '/mask/findByEquId.do?fresh=' + Math.random(),
								data : {
									equipmentId : equipmentId
								},
								dataType : 'json',
								success : function(data) {
									if (data.data && data.data.length > 0) {
										$("#maskTime")
												.val(data.data[0].maskTime);
										$("#maskId").val(data.data[0].maskId);
										$('#maskBtn').hide();
										$('#unmaskBtn').show();
									} else {
										$('#unmaskBtn').hide();
									}
								},
								error : function() {

								}
							});
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
	postAciton : function(index) {
		var data = null;
		var url = null;

//		if (postData.processResult() == "恢复正常") {
//			// 设置已报修为 "0"
//			FPEquipmentStatus(equipmentId, "", "1", "repairFlag", 0, '', false);
//		}
		// 把这个设备的这个类型（“网络状态”）的告警全部设为 processResult

		data = {
			'ids' : $("#delIds").val(),
			'equipmentId' : equipmentId,
			'propertyName' : -1,
			'processResult' : postData.processResult(),
			'processDesc' : postData.processDesc(),
			'processFlag' : 1,
			'alarmType':'摄像机视频异常'
		}
		url = Constants.CONTEXT_PATH + '/alarmexd/setEqmAlarmDone.do';

		$.ajax({
					async : false,
					data : data,
					dataType : 'json',
					type:'post',
					url : url,
					success : function(data) {
						if (data.ret == 1) {
//							if (chnnCode.length == 0) {
							top.layer.closeAll();//关闭处理窗口
								if(parent.serverTable){
									parent.serverTable.refreshTb();
								}else if(parent.alarmTable){
									parent.alarmTable.refreshTb();
								}
								ShowLayerSuccess('处理成功!');
//							} 
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
	verify1 : function() {
		$("#diagnonsiswin").validator({
					rules: {
						chinese: [/^[\w\u0391-\uFFE5，；。！]+$/, '只能输入中文、字母、数字和[，；。！]!']
					},
					fields : {
						'processResult' : 'required',
						'processDesc' : 'required;length[0~255];chinese;'
					}
				});
//		$("#maskwin").validator({
//					fields : {
//						'maskTime' : 'required;range[0~10000]'
//					}
//				});
	},
	/**
	 * 判断验证是否通过
	 */
	isPass : function() {
		var mark = false;
		$('#diagnonsiswin').isValid(function(v) {
					if (v) {
						mark = true;
					}
				});
		return mark;
	},
	/**
	 * 判断验证是否通过
	 */
	isPass1 : function() {
		var mark = false;
		$('#maskwin').isValid(function(v) {
					if (v) {
						mark = true;
					}
				});
		return mark;
	}

};

var alarmTable = {
	/**
	 * 设置表格
	 */
	setTable : function() {		
		var settings = {
			pagination : false,
			classes : 'table table-hover table-condensed ',
			// height : height,
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
//				if (params.limit != 0) {
//					pageNumber = params.offset / params.limit + 1;
//				}
				params.pageSize = 10000;
				params.pageNumber = pageNumber;
				params['search_EQ_chnnCode'] = chnnCode || '';
				params['search_EQ_dvsCode'] = dvsCode || '';
				if (chnnCode.length == 0) {
					params['search_EQ_dvsEquipmentId'] = dvsEquipmentId;
				}
				params['search_NOTEQ_nosignal']=2;
				return params;
			},
			rowStyle : function(row, index) {
				return {
					classes : 'handIcon'
				};
			},
			onClickRow : function(row, $element) {
				// 改变行颜色
				$("tr").removeClass("danger");
				$element.addClass("danger");
				var win = document.getElementById('diagnosisIframe').contentWindow;
				win.GlobalParam.dvsCode = row.dvsCode;
				win.GlobalParam.chnnCode = row.chnnCode;
				initImg(row.chnnEquipmentId);
				// win.getDataByMonth(win.GlobalParam.Year,win.GlobalParam.Month);

			},
			onDblClickRow : function(row) {
				var win = document.getElementById('diagnosisIframe').contentWindow;
				top.GlobalParam.dvsCode = row.dvsCode;
				top.GlobalParam.chnnCode = row.chnnCode;
				initImg(row.chnnEquipmentId);
				win.onStartRealPlay();
			},
			onLoadSuccess : function(result) {
				var data = null;
				if(result){
					data=result.rows;
				}
				// ids=null;
				$("#delIds").val('');
				if (data && data.length > 0) {
					if (chnnCode.length > 0) {
						$("#diagnosisTable").bootstrapTable('hideColumn',
								'dataId');
					}
					$("#diagnosisTable").bootstrapTable('check', 0);
					$("tr").removeClass("danger");
					$(".diagnosisTable tr:eq(1)").addClass("danger");
					var win = document.getElementById('diagnosisIframe').contentWindow;
					if(win!=null){
						win.GlobalParam.dvsCode = data[0].dvsCode;
						win.GlobalParam.chnnCode = data[0].chnnCode;
					}
					$("#delIds").val(data[0].chnnEquipmentId + ',');
					initImg(data[0].chnnEquipmentId);
				}
				// if(ids==null){
				// ids = [];
				// }
				// $.each(data, function(i, item) {
				// ids.push(item.chnnEquipmentId);
				// })
			}
		}
		// 通过这个创建的table
		C.createTable("#diagnosisTable", Constants.CONTEXT_PATH
						+ '/diagnosis/getPageList.do?fresh=' + Math.random(), settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb : function() {
		$("#diagnosisTable").bootstrapTable('refresh', {
					url : Constants.CONTEXT_PATH + '/diagnosis/getPageList.do?fresh=' + Math.random()
				});
	}

}

//序号
function numberFormatter(value, row, index) {
   var page = $("#diagnosisTable").bootstrapTable("getPage");  
   return page.pageSize * (page.pageNumber - 1) + index + 1;  
}

/**
 * 放大图片
 */
function enlargeImage(elem){
  var $img = $('#imgPreview');
//  var viewWidth = 800;
//  var viewHeight = 800;
//  if(getDeviceType()==2){
//    viewWidth=400;
//    viewHeight=300;
//    $img.find("img").attr("style",$(elem).attr("style"));
//  }else{
    viewWidth = screen.width - 20 || $(window).width-20,
    viewHeight = screen.width/2 + 10 || $(window).width/2+10;
//  }
  $img.find("img").prop("src",$(elem).prop("src"));  
  $img.css({'width':viewWidth*1.5,'height':viewHeight*1.5});
//  layerElem  = $(elem);
  layerIndex = layer.open({
      type: 1,
      title: '查看放大图片',
//      closeBtn: true,
      scrollbar: false,
      shade: [0.6, '#000'],
      area: ['95%','95%'],
      skin: 'layui-layer-nobg', //没有背景色
      shadeClose: true,
      content: $img
  }); 
}