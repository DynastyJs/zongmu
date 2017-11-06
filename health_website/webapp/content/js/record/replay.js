
var AXSessionId = null;
//全局变量信息
var playBackPanel = null;
var playBackSlider = createProgressSlider(100, "progressSilder", "imageSlider1", "imageBar1", 0, function () { }, onPlayBackSeek, onStopPlayBack);
var sliderImage1 = null;/*, playBackState = 3*/ //未开始播放状态
var sumPlayTime = 0.0, nSpeed = 1;
var playBackState = 3;//0：暂停,1:播放,3:停止
var pageCount = 1;
var allPage = 1;
var isNormalSpeed = true;
var gInitFlag = false;
var WdateIframe = null;

var isPlayBackFullScreen = false;
    var audioSlider = createProgressSlider(100, "audioSlider", "imageSlider1", "imageBar1", 100, function () { }, function () {
            onControlPlayBackAudio();
    }, function () { });

$(function() {
	PageInit();
});



    function PageInit() {
//    	GlobalParam.dvsCode = dvsCode;
//    	GlobalParam.chnnCode = chnnCode;
        var nowDate = new Date();
        axvideo_home_video.TimeRange.StartTime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
        axvideo_home_video.TimeRange.EndTime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 23, 59, 59);
 


        playBackTimer = setInterval(function () {
                onPlayBackTimer();
        }, 500);
        //当前ax版本
        axvideo_home_video.AxVersion = "当前视频播放控件版本：" + top.GlobalParam.CurrentActiveXVersion;
    }

    window.onbeforeunload = function () {
        StopAllVideo();
    }
    
      //关闭播放的视频
    function StopAllVideo() {
		if(playBackState==1){
	        var playBackOcx = document.getElementById("playBackPanel_1");
	        if (playBackOcx != null) {
	            playBackOcx.VGSII_ActiveX_StopFilePlayBack();
	            playBackOcx.VGSII_ActiveX_SetPlayBackAudio(0);
	        }
		}
    }
    
    //获取当前的选择的ax控件
    function GetCurrentOcx() {
        var ele = null;
        ele = document.getElementById("playBackPanel_" + axvideo_home_video.SelectedWindowIndex);
        return ele;
    }



//设置功能按钮选中的状态
function setStateOfButton(id) {
    //todo 设置按钮选中状态

    // eval("$('#" + id + "')[0].className = 'btn btn-success btn-sm'");
}

//匹配索引号
function GetPlayBackArrayIndexForOcxObject(object) {

    for (var i = 0; i < 1 ; i++) {
        var objid = "playBackPanel_" + (i + 1);
        if (object.id == objid) {
            return i;
        }
    }
    return 0;
}

var fileData = null;

//录像查询
function onRecordFileQuery(date) {
  //VDR://44011201/dvsid/7/Storages/ALL?Camera=36&starttime=2016-07-16%2000%3A00%3A00%20%2B08%3A00&stoptime=2016-07-16%2023%3A59%3A59%20%2B08%3A00&TriggerType=255&LimitCount=50
    var start = null;
    var end = null;
    if(date){
    	start = date+" 00:00:00";
    	end = date+" 23:59:59";
    }else{
	    start = axvideo_home_video.TimeRange.StartTime.format('yyyy-MM-dd hh:mm:ss');
	    end = axvideo_home_video.TimeRange.EndTime.format('yyyy-MM-dd hh:mm:ss');
    }
    if (start > end) {
        ShowFailure("录像开始时间不能大于结束时间!");
        return;
    }
//    parent.recordDate = date;
//    parent.serverTable.refreshTb();
    axvideo_home_video.VideoList.clear();
    $("#videoList tr.repeat").remove();//ie6下dom不更新
    var recsource = 0;
    var rectype = 255;
    var node = {
    	centerid : GlobalParam.CenterId,
    	dvsid : GlobalParam.dvsCode,
    	cameraid:GlobalParam.chnnCode
    }

    var basic = top.document.getElementById("basicPanel");
    var searchURL = basic.VGSII_ActiveX_BuildQueryRecFileURL(node.centerid, node.dvsid, node.cameraid, start, end, rectype, recsource);


    Log("ax回放查询，生成URL：" + JSON.stringify(searchURL));

    if (searchURL == "") {
        ShowFailure("暂不支持服务器输出！");
        return;
    }


    var result = basic.VGSII_ActiveX_QueryRecordFile(top.GlobalParam.LoginModel.AXSessionId, searchURL);

    Log("ax回放查询结果：" + JSON.stringify(result));
    fileData = getResultInfo(result);
    if (fileData&&fileData.filecount > 0) {
        axvideo_home_video.CurrentCamId = node.id;

        //for (var i = 0; i < fileData.recfilelist.length; i++) {
        //    fileData.recfilelist[i].starttime = fileData.recfilelist[i].starttime.split('+')[0].trim();
        //    //fileData.recfilelist[i].endtime = fileData.recfilelist[i].endtime.split('+')[0].trim();
        //}

        axvideo_home_video.VideoList = fileData.recfilelist;
    }
    else
        axvideo_home_video.VideoList.clear();
    axvideo_home_video.CurrentPlayBackVideo = null;
}

//打开回放音量
function onOpenPlayBackAudio() {
    if (playBackState != 3) {
        var result = GetCurrentOcx().VGSII_ActiveX_SetPlayBackAudio(1);
        if (checkResultValue(result)) {
            audioSlider.setValue(100);
        }
    }
}

//关闭回放音量
function onClosePlayBackAudio() {
    var result = GetCurrentOcx().VGSII_ActiveX_SetPlayBackAudio(0);
    if (checkResultValue(result)) {

        var ocxindex = axvideo_home_video.SelectedWindowIndex - 1;
        if (enableAudioObjectInfo[ocxindex] != null) {
            enableAudioObjectInfo[ocxindex] = null;
        }
    }
}
//开始回放 
//"VDR://44011201/dvsid/8/Cameras/34/Storages/1?extParam=et%3D1476029570%3Bfz%3D1064910728%3Bst%3D1476027928%3B&filename=ch34_ch02_02010000008000000"
function onStartPlayBack(startTime,endTime,diffTime,dvsCode,chnnCode) {
    try {
        onStopPlayBack();

        var totalTime = 0;
        var playBackStreamURL = "";
//		var startTime = "2016-10-12 01:15:56 +08:00";
//		var endTime = "2016-10-12 02:00:00 +08:00";
//      playBackStreamURL = "VDR://44011201/dvsid/8/Cameras/34/Storages/ALL?"
        playBackStreamURL = "VDR://"+top.GlobalParam.CenterId+"/dvsid/"+dvsCode+"/Cameras/"+chnnCode+"/Storages/ALL?";
        playBackStreamURL += "starttime=" + encodeURIComponent(startTime+' +08:00')+"&stoptime="+encodeURIComponent(endTime+' +08:00');
//      alert(playBackStreamURL);
        var result = GetCurrentOcx().VGSII_ActiveX_StartFilePlayBack(top.GlobalParam.LoginModel.AXSessionId, playBackStreamURL);

        Log("ax开始回放：" + JSON.stringify(result));
        var ret = checkResultValue(result);
        if (ret) {
            playBackSlider.max = diffTime;
            playBackState = 1;

            onOpenPlayBackAudio();
        }
        else {
            var errmsg = eval('(' + result + ')');
            ShowFailure("播放失败：" + errmsg.ErrorMessage);

            return;
        }
        return ret;
    } catch (e) {

    }
}

//停止回放
function onStopPlayBack() {

    if (playBackState == 3) {
        return;
    }

    var result = GetCurrentOcx().VGSII_ActiveX_StopFilePlayBack();

    Log("ax停止回放：" + JSON.stringify(result));
    playBackState = 3;
    onCleanupPlayBackTimer();

    setStateOfButton("stop");
    nSpeed = 1;
//    setTimeout(ClearCurrentOcxBorder, 100);
}


//回放控制
function onFilePlayBackCtrl(cmd, param) {
    var result = GetCurrentOcx().VGSII_ActiveX_FilePlayBackControl(cmd, param);
    return checkResultValue(result);
}

//清除回放定时器
function onCleanupPlayBackTimer() {
    sumPlayTime = 0;
    playBackSlider.setValue(0);
    //clearInterval(playBackTimer);
    // playBackTimer = null;
}

//录像回放定时器
function onPlayBackTimer() {
    var currentState = playBackState;

    axvideo_home_video.PlayState = currentState;

    if (playBackSlider == null || currentState == 3) {
        onCleanupPlayBackTimer();
        return;
    }

    var playBackOcx = GetCurrentOcx();

    if (currentState == 1) {
        var playedResult = playBackOcx.VGSII_ActiveX_FilePlayBackControl(0x0d, 0);
        var totalResult = playBackOcx.VGSII_ActiveX_FilePlayBackControl(0x06, 0);
        var playedTime = eval('(' + playedResult + ')');
        var totalTime = eval('(' + totalResult + ')');
        if (playedTime.ErrorState == 0 && totalTime.ErrorState == 0) {
            if (playedTime.ResultInfo.outparam > 0) {
                playBackSlider.max = totalTime.ResultInfo.outparam;
            }
            if (totalTime.ResultInfo.outparam > 0) {
                playBackSlider.setValue(playedTime.ResultInfo.outparam);
            }
        }
    }
}

//点击播放按钮播放或恢复常速播放
function playByPlayButton() {
    if (!isNormalSpeed) {
        onNormalPlay();
        isNormalSpeed = true;
        return;
    }
    if (isNormalSpeed) {
        onPlayBackPlay();
    }
}

//播放
function onPlayBackPlay() {
    //var result = false;
    if (playBackState == 0) {
        if (onFilePlayBackCtrl(0x01, 0)) {
            playBackState = 1;
            //result = true;
        }
    } else if (playBackState == 3) {
//        if (onStartPlayBack()) {
//            //result = true;
//            playBackState = 1;
//
//        }
    }
    setStateOfButton("play");
}

//暂停
function onPlayBackPause() {
    if (playBackState == 1) {
        playBackState = 0;
        onFilePlayBackCtrl(0x03, 0);
    }

    setStateOfButton("playBackPause");
}

//慢播
function onSlowPlay() {
    onFilePlayBackCtrl(0x0B, 0);

    if (nSpeed > 1) {
        nSpeed /= 2;
    } else if (nSpeed == 1) {
        nSpeed = -2;
    } else {
        if (nSpeed > -16) {
            nSpeed = nSpeed * 2;
        }
    }

    isNormalSpeed = false;

    setStateOfButton("slowPlay");

}

//快播
function onFastPlay() {
    onFilePlayBackCtrl(0x0A, 0);
    if (nSpeed == -2) {
        nSpeed = 1;
    } else if (nSpeed < -2) {
        nSpeed /= 2;
    } else {
        if (nSpeed >= 1 && nSpeed < 16) {
            nSpeed *= 2;
        }
    }

    isNormalSpeed = false;

    setStateOfButton("fastPlay");
}

//常速
function onNormalPlay() {

    onFilePlayBackCtrl(0x0C, 0);
    nSpeed = 1;

    playBackState = 1;
    setStateOfButton("play");
}

//拖动
function onPlayBackSeek() {
    var seek = playBackSlider.getValue();
    if (playBackState != 3) {
        onFilePlayBackCtrl(0x05, seek);
        sumPlayTime = seek;
    }
}

//帧进播放
function onStepPlay() {
    onFilePlayBackCtrl(0x07, 0);

    isNormalSpeed = false;

    setStateOfButton("stepPlay");
}

//暂时没有提供此功能
////倒放
//function onStepBackPlay() {
//    onFilePlayBackCtrl(0x09, 0);

//    isNormalSpeed = false;

//    initStateOfButton();
//    setStateOfButton("stepBack");
//}

//调节回放音量
function onControlPlayBackAudio() {

    if (playBackState != 3) {

        var result = GetCurrentOcx().VGSII_ActiveX_SetVolume(audioSlider.getValue());

        Log("ax调节回放音量：" + JSON.stringify(result));
    }
}

function GetPlayBackObjectForIndex(index) {
    var object = null;
    if (index == i) {
        eval("object = playBackPanel_1");
    }
    return object;
}

//突出选中状态
function SelectedPlayBackWindow(object) {
    return;
    for (var i = 0; i < axvideo_home_video.WindowMode; i++) {
        var id = "playBackPanel_" + (i + 1);
        if (object.id == id) {
            object.VGSII_ActiveX_DrawWindowBorder(1);
        }
        else {
            var gettedObject = GetPlayBackObjectForIndex(i);
            gettedObject.VGSII_ActiveX_DrawWindowBorder(0);
        }
    }
}



//音视频流状态通知
function VGSII_ActiveX_PlayBack_StreamStatusNotify(object, statusinfo) {
    var windowsindex = -1;

    for (var i = 0; i < axvideo_home_video.WindowMode; i++) {
        if (("playBackPanel_" + (i + 1)) == object.id) {
            windowsindex = i;
            break;
        }
    }
    if (windowsindex == -1)
    { return; }

//    ClearCurrentOcxBorder();
    var objectSelectNum = object.attributes.objindex.value;
    axvideo_home_video.SelectWindow(objectSelectNum);

    var statusParam = getResultInfo(statusinfo);
    if (statusParam.status == 0) {
        //视频流状态未知
    } else if (statusParam.status == 1) {
        //正在建立连接
    } else if (statusParam.status == 2) {
        //已经断开连接
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 画面连接失败!");
    } else if (statusParam.status == 3) {
        //正在传输视频数据
    } else if (statusParam.status == 4) {
        //VGS拒绝并重新连接
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") VGS 拒绝视频请求!");
    } else if (statusParam.status == 5) {
        //10秒未收到数据并重新连接
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 10秒内未收到视频数据!");
    } else if (statusParam.status == 6) {
        //视频连接路数限制并重新连接
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 视频链路被限制!");
    } else if (statusParam.status == 7) {
        //网络贷款受限并重新连接
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 网络带宽受限!");
    } else if (statusParam.status == 8) {
        //10秒之内未收到数据
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 10秒内未收到视频数据!");
    } else if (statusParam.status == 9) {
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 视频链路被限制!");
        //视频连接路数限制
    } else if (statusParam.status == 10) {
        //网络带宽限制
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 网络带宽受限!");
    } else if (statusParam.status == 11) {
        //VGS 拒绝
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") VGS 拒绝视频请求!");
    } else if (statusParam.status == 12) {
        //视频流数据传输完毕
    } else if (statusParam.status == 13) {
        //用户抢断并重新连接
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 视频被抢断!");
    } else if (statusParam.status == 15) {
        //用户抢断
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 视频被抢断!");
    } else if (statusParam.status == 16) {
        //没有找到相应的解码器
        onStopPlayBack();
        ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 未找到相应的解码器!");
    }
}

function VGSII_ActiveX_OnMouseEvent(eventInfo){

    VGSII_ActiveX_EventCallBackProcess(realPlayPanel_1, eventInfo);

}

//双击回放播放界面，控件返回的事件
function VGSII_ActiveX_PlayBackEvent(object, eventInfo) {
    var evtParam = getResultInfo(eventInfo);

    var objectSelectNum = object.attributes.objindex.value;
    axvideo_home_video.SelectWindow(objectSelectNum);
    //选中
    if (evtParam.evttype == 0x100) {

    }
        //双击进入全屏
    else if (evtParam.evttype == 0x102 && axvideo_home_video.WindowState.PlayBack == 1) {
        var result = object.VGSII_ActiveX_EnterFullScreen();
        Log("ax回放进入全屏：" + JSON.stringify(result));
        if (checkResultValue(result)) {
            axvideo_home_video.WindowState.PlayBack = 2;
        }
    }
        //双击进入浏览器全屏
    else if (evtParam.evttype == 0x102 && axvideo_home_video.WindowState.PlayBack == 1) {
        var result = object.VGSII_ActiveX_ExitFullScreen();
        Log("ax回放进入浏览器全屏：" + JSON.stringify(result));
        if (checkResultValue(result)) {
            axvideo_home_video.WindowState.PlayBack = 2;

            ///隐藏所有的显示播放块
//            $("#playBackContainer>div:lt(" + axvideo_home_video.WindowMode + ")").hide();
//            $("#playBackContainer>div:eq(" + (objectSelectNum - 1) + ")").addClass("fullScreen").show();

	setTimeout(function() {
		object.VGSII_ActiveX_SetWindowPos(1, 1);
	    },100);
        }
    }
        //双击进入常规模式
    else if (axvideo_home_video.WindowState.PlayBack == 2 && (evtParam.evttype == 0x102 || (evtParam.evttype == 0x200 && evtParam.presskey == "ESC"))) {
        var result = object.VGSII_ActiveX_ExitFullScreen();
        Log("ax回放退出全屏：" + JSON.stringify(result));
        if (checkResultValue(result)) {
            axvideo_home_video.WindowState.PlayBack = 1;
        }

        $("#playBackContainer>div:lt(" + axvideo_home_video.WindowMode + ")").show();
        var target = $("#playBackContainer>div:eq(" + (objectSelectNum - 1) + ")").removeClass("fullScreen");
        target.width("width", target.width() - 2);
        setTimeout(function () {
            target.removeAttr("style");
        });

    setTimeout(function() {
	object.VGSII_ActiveX_SetWindowPos(1, 1);
        },100);
    }
}




