  var axvideo_home_video = avalon.define("AxVideoHomeVideo", function (vm) {
        vm.AxVersion = "";
        vm.Mode = 2;//当前模式，1:预览，2:回放
        vm.IsDownload = false;//是否显示下载
        vm.DownloadList = [],//Name,FileName,StreamUrl,DownloadUrl,Path,Handle,Progress,Status[0等待,1正在下载,2错误,3下载完成],Message,StartTime,TotalTime
        vm.DownloadingCount = 0;//下载中数量
        vm.RefreshDownloadFlag = true;//刷新下载状态标识，处理并发
        vm.BeginDownloadFlag = true;//开始下载状态标识，处理并发
        vm.WindowMode = 1;//窗口模式 1,4,9,16宫格
        vm.IsCalm = false;//静音
        vm.WindowState = { RealPlay: 1, PlayBack: 1 };
        vm.PlayState = 3;//播放状态 0：暂停,1:播放,3:停止
        vm.SelectedWindowIndex = 1;//当前选中窗格索引
        vm.CurrentCamId = '';//记录当前回放列表的camid
        vm.SelectWindow = function (index) {
            if (index == null || index < 1)
                return;
            if (vm.SelectedWindowIndex == index) {

            }
            else {
                if (vm.Mode == 1) {
                    onCloseRealPlayAudio();
                    vm.SelectedWindowIndex = index;
                    onOpenRealPlayAudio();
                } else {

                    onClosePlayBackAudio();
                    vm.SelectedWindowIndex = index;
                    onOpenPlayBackAudio();
                }
            }
        }
        vm.ChangeDownload = function () {
            vm.IsDownload = true;
        }
        vm.ChangeMode = function (mode) {//切换显示模式
            vm.IsDownload = false;
            if (vm.Mode == mode)
                return;
            setTimeout(function () {
                StopAllVideo();//停止正在播放的视频
                vm.SelectedWindowIndex = 1;
                vm.Mode = mode;
                SetTreeHeight();//设置左侧树高度
            });

        };
        vm.TimeRange = { StartTime: new Date(), EndTime: new Date() };
        vm.VideoList = [];
        vm.CurrentPlayBackVideo = null;
        vm.ChangeWindowMode = function (mode) {//切换宫格
            if (vm.WindowMode == mode)
                return;
            vm.WindowMode = mode;
            vm.SelectedWindowIndex = 1;
        };
        vm.SetVolumeCalm = function () {//设置音量
            vm.IsCalm = !vm.IsCalm;
            if (!vm.IsCalm)
                audioSlider.setValue(100);
            else
                audioSlider.setValue(0);

            if (vm.Mode == 1)
                onControlRealPlayAudio();
            else
                onControlPlayBackAudio();

        }
        vm.VideoClick = function (el) {
//            if (el == null)
//                return;
//            vm.CurrentPlayBackVideo = el;
//            onStartPlayBack();
        }
        vm.Play = function () {
            if (vm.Mode == 1) {
                setTimeout(onStartRealPlay(), 5)
            } else if (vm.Mode == 2) {
                playByPlayButton();
            }
        }
        vm.Stop = function () {
            if (vm.Mode == 1) {
                onStopRealPlay();
            } else if (vm.Mode == 2) {
                onStopPlayBack();
            }
        }
        vm.Download = function (el) {
            try {
                if (vm.CurrentCamId == '') {
                    ShowFailure("创建下载任务失败！所属中心获取失败！");
                    return;
                }
                var nodes = GlobalParam.OrgTreeObj.getNodesByParam("id", vm.CurrentCamId);
                if (nodes == null || nodes.length == 0 || nodes[0].data.centerid == null) {
                    ShowFailure("创建下载任务失败！所属中心获取失败！");
                    return;
                }
                var centerId = nodes[0].data.centerid;

                if (el == null || el.streamurl == null || el.streamurl == '')
                    return;
                var inTask = vm.DownloadList.some(function (download) {
                    return download.StreamUrl == el.streamurl;
                });
                if (inTask) {
                    var flag = confirm("已存在下载列表中，仍然下载？");
                    if (!flag)
                        return;
                }

                var downloadUrl = el.streamurl.replace(/local/i, centerId) + "&filename=" + el.name;

                var name = '';
                var parentNode = nodes[0].getParentNode()
                while (parentNode != null) {
                    name = parentNode.name + "/" + name;
                    parentNode = parentNode.getParentNode()
                }

                name += nodes[0].name;

                vm.DownloadList.unshift({
                    Name: name,
                    FileName: "",
                    Size: (el.filesize / (1024 * 1024.0)).toFixed(2) + 'M',
                    StreamUrl: el.streamurl,
                    DownloadUrl: downloadUrl,
                    Path: "",
                    Handle: "",
                    Progress: 0,
                    Status: 0,
                    Message: '等待下载',
                    StartTime: new Date(),
                    TotalTime: Math.floor(el.difftime / 60) + ':' + ((el.difftime % 60) > 9 ? (el.difftime % 60) : ("0" + (el.difftime % 60)))
                });
                ShowSuccess("创建下载任务成功！");
            } catch (e) {
                ShowFailure("创建下载任务失败！" + e);
            }
        }
        vm.ReDownload = function (el) {
            if (el == null || el.StreamUrl == null || el.StreamUrl == '')
                return;
            var result = GlobalParam.BasicPanel.VGSII_ActiveX_StartDownload(GlobalParam.LoginModel.AXSessionId, el.DownloadUrl, 0, el.Path);
            var data = eval('(' + result + ')');
            if (data.ErrorState != 0) {
                alert("创建下载任务失败！" + data.ErrorMessage);
            }
            else {
                var downloadInfo = data.ResultInfo;
                el.Handle = downloadInfo.DownloadHandle;
                el.Progress = 0;
                el.Status = 0;
                el.Message = '';
                el.StartTime = new Date();
            }
        }
        vm.BeginDownload = function () {
            if (!vm.BeginDownloadFlag) {
                Log("上次开始下载状态未完成，停止本次！");
                return;
            }

            vm.BeginDownloadFlag = false;
            var downloadings = vm.DownloadList.filter(function (el) {
                return el.Status == 1;
            });
            var count = 3 - downloadings.length;
            if (count < 1) {
                vm.BeginDownloadFlag = true;
                return;
            }
            var waitings = vm.DownloadList.filter(function (el) {
                return el.Status == 0;
            });
            if (waitings.length < 1) {
                vm.BeginDownloadFlag = true;
                return;
            }
            for (var i = 0; i < count && i < waitings.length; i++) {
                try {
                    var file = waitings[i];
                    var result = GlobalParam.BasicPanel.VGSII_ActiveX_StartDownload(GlobalParam.LoginModel.AXSessionId, file.DownloadUrl, 2, "");
                    var data = eval('(' + result + ')');
                    if (data.ErrorState != 0) {
                        var errorMsg = data.ErrorMessage;
                        if (data.ErrorState == -301) {
                            errorMsg = "用户取消";
                            vm.DownloadList.remove(file);
                        } else if (data.ErrorState == -302) {
                            file.Status = 2;
                            file.Message = "目录没有写入权限";
                            errorMsg = file.Message;
                            window.open("/Content/ActiveX/daoxiang.html");
                        }
                        ShowFailure("创建下载任务失败！" + errorMsg);
                    } else {
                        var fileInfo = data.ResultInfo;
                        file.FileName = fileInfo.FileName.replace(fileInfo.SavePath + "\\", "");
                        file.Path = fileInfo.SavePath;
                        file.Handle = fileInfo.DownloadHandle;
                        file.Status = 1;
                    }
                } catch (e) {
                    ShowFailure("下载任务失败！" + e);
                }
            }
            vm.BeginDownloadFlag = true;
        }

        vm.StopDownload = function (el, errorMsg) {
            if (el == null || el.Handle == null || el.Handle == '')
                return;
            var result = GlobalParam.BasicPanel.VGSII_ActiveX_StopDownload(GlobalParam.LoginModel.AXSessionId, el.Handle);
            var data = eval('(' + result + ')');
            if (data.ErrorState != 0) {
                alert("停止任务失败！" + data.ErrorMessage);
            }
            else {
                el.Status = 3;
                el.Progress = 100;
                if (errorMsg == null || errorMsg == '') {
                    el.Message = "下载成功"
                }
                else {
                    el.Status = 2;
                    el.Progress = 0;
                    el.Message = errorMsg;
                }
            }
        }
        vm.OpenDownload = function (el) {

            if (el.Path.lastIndexOf('\\') == (el.Path.length - 1))
                el.Path = el.Path.substring(0, el.Path.length - 1);

            var dir = el.Path + "\\" + el.FileName;

            var result = GlobalParam.BasicPanel.VGSII_ActiveX_OpenDirenctoryWindow(dir);
            var data = eval('(' + result + ')');
            if (data.ErrorState != 0) {
                alert("" + data.ErrorMessage);
            }
        }
        vm.RefreshDownload = function () {
            if (!vm.RefreshDownloadFlag) {
                Log("上次下载状态刷新未完成，停止本次刷新！");
                return;
            }
            var downloadingList = vm.DownloadList.filter(function (el) {
                return el.Status == 1;
            });

            var waitingList = vm.DownloadList.filter(function (el) {
                return el.Status == 0;
            });
            vm.DownloadingCount = downloadingList.length + waitingList.length;

            if (downloadingList.length == 0) {
                Log("列表中没有正在下载的任务，停止本次刷新！");
                return;
            }
            vm.RefreshDownloadFlag = false;
            downloadingList.forEach(function (el, index) {
                try {
                    var result = GlobalParam.BasicPanel.VGSII_ActiveX_GetDownloadProgress(GlobalParam.LoginModel.AXSessionId, el.Handle);
                    var data = eval('(' + result + ')');
                    if (data.ErrorState != 0) {
                        Log("任务出错：" + el.FileName + "," + data.ErrorMessage);
                        el.Progress = 0;
                        el.Status = 2;
                        el.Message = data.ErrorMessage;

                        vm.DownloadingCount--;
                    } else {
                        Log("任务进度：" + el.FileName + ":" + data.ResultInfo.Progress);
                        el.Progress = data.ResultInfo.Progress;
                        if (el.Progress == 100) {
                            el.Status = 3;
                            vm.DownloadingCount--;
                            vm.StopDownload(el);
                        }
                    }
                } catch (e) {

                }
                if (index == (downloadingList.length - 1))
                    vm.RefreshDownloadFlag = true;
            });
        }
        vm.DownloadStateNotify = function (stateInfo) {
            if (stateInfo == null || stateInfo.Handle == null) {
                Log("视频下载视频状态通知对象为null");
                return;
            }

            if (stateInfo.Type != 'download') {
                Log("视频下载视频状态通知不是下载类型，忽略");
                return;
            }
            var handle = stateInfo.Handle;
            var State = stateInfo.State;
            var files = vm.DownloadList.filter(function (el) {
                return el.Handle == handle;
            });
            if (files == null || files.length == 0) {
                Log("视频下载视频状态通知,下载列表中不存在对应handle:" + handle);
                return;
            }
            var file = files[0];
            var hasError = false;
            var msg = '';
            switch (State) {
                case 0: hasError = true; msg = "未知错误"; break;
                case 1: hasError = false; msg = "连接中"; break;
                case 2: hasError = true; msg = "断开连接"; break;
                case 3: hasError = false; msg = "传输中"; break;
                case 4: hasError = true; msg = "VGS拒绝视频请求"; break;
                case 5: hasError = true; msg = "10秒内未收到视频数据"; break;
                case 6: hasError = true; msg = "视频链路被限制"; break;
                case 7: hasError = true; msg = "网络带宽受限"; break;
                case 8: hasError = true; msg = "秒内未收到视频数据"; break;
                case 9: hasError = true; msg = "视频链路被限制"; break;
                case 10: hasError = true; msg = "网络带宽受限"; break;
                case 11: hasError = true; msg = "VGS拒绝视频请求"; break;
                case 12: hasError = false; msg = "下载完成"; break;
                case 13: hasError = true; msg = "视频被抢断"; break;
                case 15: hasError = true; msg = "视频被抢断"; break;
                case 16: hasError = true; msg = "未找到相应的解码器"; break;
                default:
            }
            Log("视频下载视频状态通知:" + msg);
            if (hasError == true) {
                vm.StopDownload(file, msg);
            }

        }
    });
    avalon.scan();
