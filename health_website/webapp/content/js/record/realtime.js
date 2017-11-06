    axvideo_home_video.Mode = 1;
    var realPlayState = new Array(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);
    var audioSlider = createProgressSlider(100, "audioSlider", "imageSlider1", "imageBar1", 100, function () { }, function () {
        if (axvideo_home_video.Mode == 1)
            onControlRealPlayAudio();
        else
            onControlPlayBackAudio();
    }, function () { });

    var playingObject = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    var realOcxObject = null, streamIndex = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var dvsInfo = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    var enableAudioObjectInfo = new Array(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    var presetArray = new Array();



    function SelectedInfo(object, index, volume) {
        this._object = object;
        this._index = index;
        this._volume = volume;
    }
    
      //获取当前的选择的ax控件
    function GetCurrentOcx() {
        var ele = null;
        ele = document.getElementById("realPlayPanel_" + axvideo_home_video.SelectedWindowIndex);

        return ele;
    }


    //匹配索引号
    function GetRealPlayArrayIndexForOcxObject(object) {
        for (var i = 0; i < 16; i++) {
            var objid = "realPlayPanel_" + (i + 1);
            if (object.id == objid) {
                return i;
            }
        }
        return 0;
    }

    function GetRealPlayObjectForIndex(index) {
        var object = null;
        for (var i = 0; i < 16; i++) {
            if (index == i) {
                eval("object = realPlayPanel_" + (i + 1));
            }
        }
        return object;
    }

    //切换窗格时关闭其他窗格已经打开的音频
    function SelectedAndCloseOtherAudio(object) {
        var result = object.VGSII_ActiveX_OpenPlayerAudioEnable(0);
        if (checkResultValue(result)) {
            var obj = document.getElementById("disableaudio");
            if (obj) {
                obj.id = "enableaudio";
                obj.onclick = onOpenRealPlayAudio;
                obj.title = "扬声器：静音";
                obj.className = "btn btn-danger btn-sm dropdown-toggle ";
                obj.innerHTML = "<span class='glyphicon glyphicon-volume-off' style='font-size:17px'></span>";
                $("#menu").hide();
            }
        }
        //  document.getElementById("audioSlider").style.display = "none";

    }

    function CloseRealPlayAudio() {
        for (var i = 0 ; i < 16; i++) {
            if (enableAudioObjectInfo[i] != null) {
                SelectedAndCloseOtherAudio(GetRealPlayObjectForIndex(i));
            }
        }

        var objIndex = axvideo_home_video.SelectedWindowIndex - 1;
        if (enableAudioObjectInfo[objIndex] != null) {               //是否切回到以前已经打开音频的窗格中
            var volume = enableAudioObjectInfo[objIndex]._volume;
            onOpenRealPlayAudio();
            audioSlider.setValue(volume);
            onControlRealPlayAudio();
        }
    }


    function StartRealPlay(dvsNode, streamid) {
    

        var stremUrl = "VDR://" + dvsNode.centerid + "/dvsid/" + dvsNode.dvsid + "/Cameras/" + dvsNode.cameraid + "/Streams/" + dvsNode.streamid;

        var result = GetCurrentOcx().VGSII_ActiveX_StartRealPlay(top.GlobalParam.LoginModel.AXSessionId, stremUrl);
        Log("ax开始播放预览：" + JSON.stringify(result));


        playingObject[axvideo_home_video.SelectedWindowIndex - 1] = GetCurrentOcx();


        var retval = checkResultValue(result);
        if (retval) {
            realPlayState[axvideo_home_video.SelectedWindowIndex - 1] = true;
            onOpenRealPlayAudio();
        }
        else {
            var errmsg = eval('(' + result + ')');
            // ShowFailure("播放失败：" + errmsg.ErrorMessage);
            alert("播放失败：" + errmsg.ErrorMessage);

            return;
        }
        return retval;
    }
    
    window.onbeforeunload = function () {
        onStopRealPlay();
    }

    //开始实时预览
    function onStartRealPlay() {
        try {
//            var node = GlobalParam.CameraTree.GetSelectedNode();
            onStopRealPlay();
//
//            if (node.data.type != NodeType_CAM)
//            { return; }
//
//
//            if (node.statusobj.online != true) {
//                ShowFailure("通道离线，不能预览！");
//                return;
//            }
	    	 var dvsNode = {
		    	centerid : top.GlobalParam.CenterId,
		    	dvsid : top.GlobalParam.dvsCode,
		    	cameraid:top. GlobalParam.chnnCode,
		    	streamid:0
		    }
            StartRealPlay(dvsNode);
            dvsInfo[axvideo_home_video.SelectedWindowIndex - 1] = dvsNode;
        } catch (e) {

        }
    }

   //停止实时预览
    function onStopRealPlay() {
        var result = GetCurrentOcx().VGSII_ActiveX_StopRealPlay();    //停止预览接口会主动高亮窗口边框
        Log("ax停止实时预览：" + JSON.stringify(result));
        streamIndex[axvideo_home_video.SelectedWindowIndex - 1] = 0;
        //   document.getElementById("audioSlider").style.display = "none";
        realPlayState[axvideo_home_video.SelectedWindowIndex - 1] = true;

        var ocxindex = axvideo_home_video.SelectedWindowIndex - 1;
        if (enableAudioObjectInfo[ocxindex] != null) {
            enableAudioObjectInfo[ocxindex] = null;
        }
        playingObject[axvideo_home_video.SelectedWindowIndex - 1] = null;//
    }

    //打开实时预览音频
    function onOpenRealPlayAudio() {
        var index = axvideo_home_video.SelectedWindowIndex - 1;
        if (realPlayState[index]) {
            var result = GetCurrentOcx().VGSII_ActiveX_OpenPlayerAudioEnable(1);
            Log("ax打开实时预览音频：" + JSON.stringify(result));
            if (result) {

                audioSlider.setValue(100);

                enableAudioObjectInfo[index] = new SelectedInfo(GetCurrentOcx(), index, 100);  //记录当前已经打开音频的窗格信息
            }

        }
    }

    //关闭实时预览音频
    function onCloseRealPlayAudio() {
        var result = GetCurrentOcx().VGSII_ActiveX_OpenPlayerAudioEnable(0);
        Log("ax关闭实时预览音频：" + JSON.stringify(result));
        if (checkResultValue(result)) {
            var ocxindex = axvideo_home_video.SelectedWindowIndex - 1;
            if (enableAudioObjectInfo[ocxindex] != null) {
                enableAudioObjectInfo[ocxindex] = null;
            }
        }
    }

    //调节预览音量
    function onControlRealPlayAudio() {
        var ocxindex = axvideo_home_video.SelectedWindowIndex - 1;
        if (realPlayState[ocxindex]) {
            var result = GetCurrentOcx().VGSII_ActiveX_SetVolume(audioSlider.getValue());
            Log("ax调节预览音量：" + audioSlider.getValue() + "," + JSON.stringify(result));
            if (enableAudioObjectInfo[ocxindex] != null) {  //修改记录信息
                enableAudioObjectInfo[ocxindex]._volume = audioSlider.getValue();
            }
            if (audioSlider.getValue() > 0)
                axvideo_home_video.IsCalm = false;
            else
                axvideo_home_video.IsCalm = true;
        }
    }

    //开始控制PTZ云台
    var ptzUrl = "";
    function onStartPtzControl(cmd) {
        var index = axvideo_home_video.SelectedWindowIndex - 1;
        //var node = newtree.tree.getSelectedNode();

        if (realPlayState[index]) {
            ptzUrl = "VDR://" + dvsInfo[index].data.centerid + "/dvsid/" + dvsInfo[index].data.dvsid + "/Cameras/" + dvsInfo[index].data.cameraid;
            //ptzUrl = "VDR://" + dvstree.aNodes[dvstree._sai].centerid + "/dvsid/" + dvstree.aNodes[dvstree._sai].dvsid + "/Cameras/" + dvstree.aNodes[dvstree._sai].cameraid;
            var result = basicPanel.VGSII_ActiveX_PtzControl(top.GlobalParam.LoginModel.AXSessionId, ptzUrl, parseInt(cmd), 0, 100);
            //var result = basicPanel.VGSII_ActiveX_PtzControl(userid, ptzUrl, parseInt(cmd), 0, 100);
        }
    }

    //停止控制PTZ云台
    function onStopPtzControl(cmd) {
        if (ptzUrl != "") {
            var result = basicPanel.VGSII_ActiveX_PtzControl(GlobalParam.LoginModel.AXSessionId, ptzUrl, parseInt(cmd), 1, 100);

            ptzUrl = "";
        }
    }

    function onRecordPlayBack() {
        closeStreamSession();
    }

    var isFullScreen = false;

    //突出选中状态
    function SelectedRealPlayWindow(object) {
        return;
        for (var i = 0; i < axvideo_home_video.WindowMode; i++) {

            var id = "realPlayPanel_" + (i + 1);

            if (object.id == id) {
                object.VGSII_ActiveX_DrawWindowBorder(1);
            }
            else {
                var gettedObject = GetRealPlayObjectForIndex(i);
                gettedObject.VGSII_ActiveX_DrawWindowBorder(0);
            }
        }
    }

    //预览控件返回的事件
    function VGSII_ActiveX_EventCallBackProcess(object, eventInfo) {

        var evtParam = getResultInfo(eventInfo);
//        setTimeout(ClearCurrentOcxBorder, 100);
        var objectSelectNum = object.attributes.objindex.value;
        axvideo_home_video.SelectWindow(objectSelectNum);
        //SelectedRealPlayWindow(object);
        // realOcxObject = object;
        //console.log(realPlayState);

        if (realPlayState[axvideo_home_video.SelectedWindowIndex - 1] != true)
            return;

        if (evtParam.evttype == 0x100) {
            CloseRealPlayAudio();
        }
        else if (evtParam.evttype == 0x102 && axvideo_home_video.WindowState.RealPlay == 1) {
            var result = object.VGSII_ActiveX_EnterFullScreen();
            Log("ax实时预览进入全屏：" + JSON.stringify(result));
            if (checkResultValue(result)) {
                axvideo_home_video.WindowState.RealPlay = 2;
            }
        }
        else if (evtParam.evttype == 0x102 && axvideo_home_video.WindowState.RealPlay == 1) {

            var result = object.VGSII_ActiveX_ExitFullScreen();
            Log("ax实时预览进入浏览器全屏：" + JSON.stringify(result));
            if (checkResultValue(result)) {
                axvideo_home_video.WindowState.RealPlay = 1;

                ///隐藏所有的显示播放块
                $("#realPlayContainer>div:lt(" + axvideo_home_video.WindowMode + ")").hide();
                $("#realPlayContainer>div:eq(" + (objectSelectNum - 1) + ")").addClass("fullScreen").show();

            }
        }
        else if (axvideo_home_video.WindowState.RealPlay == 2 && (evtParam.evttype == 0x102 || (evtParam.evttype == 0x200 && evtParam.presskey == "ESC"))) {
            var result = object.VGSII_ActiveX_ExitFullScreen();

            Log("ax实时预览退出全屏：" + JSON.stringify(result));
            if (checkResultValue(result)) {
                axvideo_home_video.WindowState.RealPlay = 1;
            }

            $("#realPlayContainer>div:lt(" + axvideo_home_video.WindowMode + ")").show();
            var target = $("#realPlayContainer>div:eq(" + (objectSelectNum - 1) + ")").removeClass("fullScreen");
            target.width("width", target.width() - 2);
            setTimeout(function () {
                target.removeAttr("style");
            });
        }
    }


    //定时器
    function onRealPlayTimer() {

        var playing = playingObject[axvideo_home_video.SelectedWindowIndex - 1] != null;

        axvideo_home_video.PlayState = playing ? 1 : 3;
    }

    //主子码流切换
    function onMainSubStreamsSwitch() {
        var index = axvideo_home_video.SelectedWindowIndex - 1;
        if (streamIndex[index] == 1) {
            streamIndex[index] = 0;
        } else {
            streamIndex[index] = 1;
        }

        var node = GlobalParam.CameraTree.GetSelectedNode();
        if (streamIndex[index] == 1 && node.data.substreamid == -1) {
            ShowFailure("该设备不支持子码流预览!");
            return;
        }

        if (StartRealPlay(dvsInfo[index], streamIndex[index] == 1 ? dvsInfo[index].data.substreamid : dvsInfo[index].data.mainstreamid)) {
            var volume = audioSlider.getValue();
            var condition = null;
            condition = document.getElementById("disableaudio");
            if (condition != null) {
                onOpenRealPlayAudio();
                audioSlider.setValue(volume);
                onControlRealPlayAudio();
            }
        }
    }

    //音视频流状态通知
    function VGSII_ActiveX_StreamStatusNotify(object, statusinfo) {
        var windowsindex = -1;

        for (var i = 0; i < axvideo_home_video.WindowMode; i++) {
            if (("realPlayPanel_" + (i + 1)) == object.id) {
                windowsindex = i;
                break;
            }
        }
        if (windowsindex == -1)
        { return; }

        var objectSelectNum = object.attributes.objindex.value;
        axvideo_home_video.SelectWindow(objectSelectNum);

        var statusParam = getResultInfo(statusinfo);
        if (statusParam.status == 0) {
            //视频流状态未知
        } else if (statusParam.status == 1) {
            //正在建立连接
        } else if (statusParam.status == 2) {
            //已经断开连接
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 画面连接失败!");
        } else if (statusParam.status == 3) {
            //正在传输视频数据
        } else if (statusParam.status == 4) {
            //VGS拒绝并重新连接
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") VGS 拒绝视频请求!");
        } else if (statusParam.status == 5) {
            //10秒未收到数据并重新连接
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 10秒内未收到视频数据!");
        } else if (statusParam.status == 6) {
            //视频连接路数限制并重新连接
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 视频链路被限制!");
        } else if (statusParam.status == 7) {
            //网络贷款受限并重新连接
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 网络带宽受限!");
        } else if (statusParam.status == 8) {
            //10秒之内未收到数据
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 10秒内未收到视频数据!");
        } else if (statusParam.status == 9) {
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 视频链路被限制!");
            //视频连接路数限制
        } else if (statusParam.status == 10) {
            //网络带宽限制
            onstoprealplay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 网络带宽受限!");
        } else if (statusParam.status == 11) {
            //VGS 拒绝
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") VGS 拒绝视频请求!");
        } else if (statusParam.status == 12) {
            //视频流数据传输完毕
        } else if (statusParam.status == 13) {
            //用户抢断并重新连接
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 视频被抢断!");
        } else if (statusParam.status == 15) {
            //用户抢断
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 视频被抢断!");
        } else if (statusParam.status == 16) {
            //没有找到相应的解码器
            onStopRealPlay();
            ShowFailure("流状态通知:窗口(" + (windowsindex + 1) + ") 未找到相应的解码器!");
        }
    }



 function PageInit() {
    	top.GlobalParam.dvsCode = dvsCode;
    	top.GlobalParam.chnnCode = chnnCode;

        playBackTimer = setInterval(function () {
                onRealPlayTimer();
        }, 500);
    }

$(function() {//onRecordFileQuery()
//	Init(PageInit);
	PageInit();
});

