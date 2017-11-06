var hasShowHandWin = false;
var selectOrgId = '';
var selectPath = '';
var rightCodeList = null;
var flagVoice = true;
var VoiceObj = null;
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
	initEvent();
	validator.verify1();
	myZtree.showZtree();
	Init();
	if (VoiceObj == null) {
		VoiceObj = new ActiveXObject("Sapi.SpVoice");
		VoiceObj.Voice = VoiceObj.GetVoices().Item(0);
		VoiceObj.Speak("", 2);
	}
});
 window.onbeforeunload = function () {
     if (GlobalParam.LoginModel.AXSessionId!="")
     {
       document.getElementById('basicPanel').VGSII_ActiveX_Logout(GlobalParam.LoginModel.AXSessionId);
       document.getElementById("basicPanel").VGSII_ActiveX_Cleanup();
     }
 }

function initEvent(){

	$('.nav-tabs li').each(function(){
		var $li = $(this);
		var rightCode = $li.data("rightcode");
		if(checkRight(rightCode)){
			var url = $li.data("url");
			$li.css('display','block');
			$li.click(function(){
				 var src = $("#mainIframeId").attr("src"),typeName='';
		 		if(src&&src.indexOf(url)>-1){
		 			typeName = $("#mainIframeId").attr("src").split('typeName=')[1].split('&orgId')[0];
		 		}
				$("#mainIframeId").attr("src",Constants.CONTEXT_PATH+url+"?typeName="+typeName+"&orgId="+selectOrgId+"&path="+selectPath);
				$('.nav-tabs li.active').removeClass("active");
				$li.addClass("active");
			});
// setTimeout(function(){
// if(rightCode=="HOME"||rightCode=="ALARM_EVENT"||rightCode=="ALARM_HANDING"){
// setInterval(function(){
// if(($li.hasClass('active')&&top.hasShowHandWin==false)){
// $li.trigger("click");
// }
// },10000); //指定10秒刷新一次
// }
// },1000)
		}
	});
	$('.dropdown-menu li').each(function(){
		var $li = $(this);
		var rightCode = $li.data("rightcode");
		if(checkRight(rightCode)){
			var url = $li.data("url");
			$li.css('display','block');
		}
	});
}

/**
 * 右上角参数设置弹出框
 */
function fireParamSet(){
	layer.open({
	  type: 2,
	  title: '系统设置 — 电气火灾监控探测器',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['95%', '95%'],
	  content: Constants.CONTEXT_PATH+ "/fire_param/index" // iframe的url
   }); 
}

/**
 * 右上角参数设置弹出框
 */
function multilFireParamSet(){
	layer.open({
	  type: 2,
	  title: '系统设置 — 多回路电气火灾监控探测器',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['95%', '95%'],
	  content: Constants.CONTEXT_PATH+ "/fire_param/multilIndex" // iframe的url
   }); 
}

function paramSet(){
	layer.open({
	  type: 2,
	  title: '参数设置',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['95%', '95%'],
	  content: Constants.CONTEXT_PATH+ "/param/index" // iframe的url
   }); 
}

function plan(){
	layer.open({
	  type: 2,
	  title: '计划录像',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['95%', '95%'],
	  content: Constants.CONTEXT_PATH+ "/plan/index" // iframe的url
   }); 
}
function alarmForward(){
	layer.open({
		  type: 2,
		  title: '告警转发规则',
		  shadeClose: true,
		  shade: 0.8,
		  area: ['95%', '95%'],
		  content: Constants.CONTEXT_PATH+ "/alarmForward/index" // iframe的url
	   });
}

function diagnosis(){
	layer.open({
		type: 2,
		  title: '视频质量诊断任务',
		  shadeClose: true,
		  shade: 0.8,
		  area: ['95%', '95%'],
		  content: Constants.CONTEXT_PATH+ "/diagnosis_mission/index" // iframe的url
	})
}




/**
 * 组织结构树
 */
var myZtree = {
	/**
	 * 生成树结构
	 */
	showZtree : function() {
		orgTree.settings.treeSetting.callback = {
				beforeEditName: this.zTreeBeforeEditName,
				onClick : this.zTreeClickNode
			};
		orgTree.settings.treeSetting.edit.showRenameBtn=checkRight("MASKORG")?true:false,
		orgTree.launch();
	},
	
	zTreeBeforeEditName : function(treeId, treeNode) {	
		popUpWindow.handleEvent(treeNode.id);
		return false;
	},

 	zTreeClickNode : function(event, treeId, treeNode){
 		selectOrgId = treeNode.id;
 		selectPath = treeNode.path.replace(new RegExp("#","gm"),'_');//避免url错误
 		if(treeNode.iconSkin=='zh'){
 			$("[data-owner]").each(function(){
				var $em = $(this);
				var owner = $em.data("owner");
				if(owner=='bh'){
		    		$em.css('display','none');
				}
		  	});
 			var src1 = $("#mainIframeId").attr("src");
 			if(src1&&(src1.indexOf('/home/homeindex')>-1||src1.indexOf('/uiAlarmEvent/')>-1||src1.indexOf('/uialarm/')>-1||src1.indexOf('/sysdev/index')>-1)){
 				
 			}else{
 				if(checkRight("HOME")){
 					$("#mainIframeId").attr("src",Constants.CONTEXT_PATH+'/home/homeindex?orgId='+selectOrgId+'&path='+selectPath);
 				}
			  	$('.nav-tabs li.active').removeClass("active");
			  	$('.nav-tabs li:visible:first').addClass("active");
			  	return;
 			}
 		}else{
 			 $("[data-owner]").each(function(){
				var $em = $(this);
				if(checkRight($em.data("rightcode"))){
					$em.css('display','block');
				}
		  	});
 		}
 		
 		var src = $("#mainIframeId").attr("src");
 		if(src){
	 		if(src.indexOf('orgId=')>-1){
	 			src = $("#mainIframeId").attr("src").split('orgId=')[0];
	 		}
 		}else{
 			// 默认展开第一个
			$('.nav-tabs li:visible:first').click();
			return;
 		}
		$("#mainIframeId").attr("src",src+'orgId='+treeNode.id+'&path='+selectPath);
	}
}


/**
 * 初始化布局
 */
function initLayout() {
	$("#wrapper").height($(window).height() - $('.header').height());
	// monitor 额外添加margin padding不会造成容器撑破出现滚动条的的情况
	$("#sidebar,#mainContent").height($(window).height() - $('.header').height()-2);
	$("#mainIframeId").height($("#mainContent").height()-$('.viewport').height()-2);
	var treeWraperHeight = $("#sidebar").height() - $("#searchWraper").outerHeight(true) - 4;
	$("#treeWraper").height(treeWraperHeight);// 初始化侧边栏树结构布局
	$("#treeWraper > .panel-body").height(treeWraperHeight - 10).css("overflow-y","scroll");
// $(".viewport").height($("#mainContent").height());


}

function changeTab(paramUrl,typeName,euipType){
	if(typeName == "录像存储异常"){
		paramUrl = '/record/index';
	}else if(typeName =="摄像机视频异常"){
		paramUrl = '/diagnosis/index';
	}
	$('.nav-tabs li').each(function(){
		var $li = $(this);
		var url = $li.data("url");
		if(paramUrl.indexOf(url)>-1){
			$("#mainIframeId").attr("src",Constants.CONTEXT_PATH+url+'?alarmType='+typeName+'&euipType='+euipType+'&orgId='+selectOrgId);
			$('.nav-tabs li.active').removeClass("active");
			$li.addClass("active");
		}
	});
}



var popUpWindow = {
	/**
	 * 处理
	 */
	handleEvent : function(Id) {
		if (typeof(Id) == 'undefined' || Id == '') {
			layer.alert('请选择需要修改的记录!', {
						icon : 0
					});
		} else if (isNaN(Id)) {
			layer.alert('只能选择一条记录!', {
						icon : 0
					});
		} else {
			popUpWindow.initWin();
			
			// 赋值
			$.ajax({
						async : false,
						url : Constants.CONTEXT_PATH + '/mask/findById.do?fresh=' + Math.random(),
						data : {
							orgId : Id,
							equipmentId : -1
						},
						dataType : 'json',
						success : function(data) {
							if(data.data&&data.data.length>0){
								$("#maskTime").val(data.data[0].maskTime);
								$("#isMask").val(data.data[0].isMask);
								$("#maskId").val(data.data[0].maskId);
							}
						},
						error : function() {
							layer.alert('请求服务器出错！', {icon : 2});
						}
					});
			// 弹窗编辑
			var d = dialog({
						title : '旁路设置',
						content : document.getElementById('maskwin'),
						button:[{value: '取消旁路', callback: function () {
							$.ajax({
								url : Constants.CONTEXT_PATH + '/mask/deleteByOrg.do',
								type:'POST',
								data : {
									ids : $("#maskId").val()
								},
								dataType : 'json',
								success : function(data) {
									layer.alert(data.msg, {icon : 1});
								},
								error : function() {
									layer.alert('请求服务器出错！', {icon : 2});
								}
							});
						}}] ,
						okValue : '旁路',
						ok : function() {
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
			if($("#isMask").val()==1){
				$("[i-id=ok]").hide();
			}else{
				$("[i-id=取消旁路]").hide();
			}
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
		$("#maskTime").val('');
		$("#isMask").val('');
		$('#maskId').val('');
		$("[i-id=ok]").show();
		$("[i-id=取消旁路]").show();
	}
}

/**
 * 提交信息
 */
var postData = {
	maskTime : function() {
		return $("#maskTime").val();
	},
	maskId : function(){
		return $('#maskId').val();
	},
	/**
	 * 提交操作
	 * 
	 * @param type
	 */
	postAciton : function(orgId) {
		var data = null;
		$.ajax({
			async : false,
			url : Constants.CONTEXT_PATH+ "/mask/saveOrg.do?fresh=" + Math.random(),
			data:{
				orgId : orgId,
				equipmentId:-1,
				isMask:1,
				maskId:postData.maskId(),
				maskTime:postData.maskTime(),
				equipmentPropertyName : -1
			},
			dataType : 'json',
			success : function(data) {
				if (data.ret == 1) {
					layer.alert(data.msg, {icon : 1});
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
	/**
	 * 验证填写1
	 */
	verify1 : function() {
		$("#maskwin").validator({
					fields : {
						'maskTime' : 'required;range[0~10000]'
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

function getPrivilege(){
	if(rightCodeList == null){
		$.ajax({
			url : Constants.CONTEXT_PATH + '/home/getPrivilege.do?fresh=' + Math.random(),
			type: 'POST',
			async: false,
			dataType : 'json',
			success : function(json) {
				rightCodeList = json.data;
			},
			error : function() {
				layer.alert('请求服务器出错！', {icon : 2});
			}
		});
	}
};



function checkRight(rightCode){
	if(rightCodeList == null){
		getPrivilege();
	}
	for(var i = 0; i < rightCodeList.length; i++){
		if(rightCode == rightCodeList[i]){
			return true;
		}
	}
	return false;
}

function downloadOcx(){
	window.location.href="http://" + GlobalParam.LoginModel.VGSHost + ":" + GlobalParam.LoginModel.VGSPort+GlobalParam.ActiveXPath;
}

function loginout(){
	layer.confirm('是否退出系统？', {
		icon : 3,
		btn : ['是', '否']
			// 按钮
		}, function(index1) {
		window.parent.location.href='/security/login/sysCenterMain.html';
	}, function() {

	});
	
}


function showMessage(msg) {
	if (flagVoice) {
		if(VoiceObj!=null){
			VoiceObj.Speak(msg, 1);
		}
	}
}

function setAlarmVoice(e) {
	try {
		if (flagVoice) {
			//$(e).val("播放告警");
			$("#play").attr("title", "播放语音告警");
			$("#play")
					.attr("src",
							"../content/images/header/play_sound.png");
			//play
			flagVoice = false;
			VoiceObj.Speak("", 2);
		} else {
			//$(e).val("停止播放");
			$("#play").attr("title", "停止语音告警");
			$("#play")
					.attr("src",
							"../content/images/header/close_sound.png");
			flagVoice = true;
		}
	} catch (ex) {
		VoiceObj = null;
		layer.alert('语音播报启动失败，请检查配置！', {icon : 2});
	}
}


