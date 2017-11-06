var GlobalParam = {
	
    IntegrationLogin: false,//是否集成登录模式(集成登录无须配置下列登录参数)
    LoginModel: {
        VGSHost: "127.0.0.1",//VGS IP
        VGSPort: 80,//VGS 端口
        SecurityKey: "d23944c7-8dbc-4209-9c8f-777b7fb3b45b",// AX 登录授权码
        UserName:"1",
        Password:"1",
        AppKey:"VGSIISDKDemo",
        AXSessionId: "",
        SessionId: ""
    },
    LogEnable: false,//是否用日志功能
    ActiveXPath: '',
    ActiveXVersion: '1.0',
    CurrentActiveXVersion: '',
    LoadAXSuccess: isLoadAxSucc,
    BasicPanel: null,
    CameraTree: null,
    OrgTreeObj: null,
    Timer: null,
    RootCenterCode: "",
    gInitFlag:false,
    CenterId :0,
    XMLocalStorage: new XunmeiLocalStorage(),

    UrlList: {
        Login: '/api/Authentication/getlogin',
        GetAxVersion: '/api/system/getaxversion',
        GetRootOrg: "/api/org/treedata",
        GetSubVGS: "/api/org/subparentdata",
        GetSubOrg: "/api/org/subchirlddata",
        GetDvs: "/api/dvs/PagingInfos",
        GetSubDvs: "/api/dvs/PagingSubInfos"

    }
};


function Request(url)
{
	var jsondata = null;
	$.ajax({
		async: false,
		method: 'GET',
		dataType:"json",
		url : Constants.CONTEXT_PATH + '/home/getXMRequest.do?fresh=' + Math.random(),
		data : {'reqUrl':url},
		beforeSend: function (obj) {
		},
		success: function (json) {
			jsondata = json.data;
		},
		error: function(e, textStatus, errorThrown){
			ShowFailure("error:"+e.statusText);
		}
	});	
	return jsondata;
}


function Init(successCallBack) {
	getVGSIP();
    var checkAxVersionAndInit = function () {
        var flag = GetVersion();
        if (!flag)
            return;
    	
        if (!GlobalParam.LoadAXSuccess) {
            var result = confirm("ActiveX控件未安装或者被禁用，是否现在安装？")
            if (result) {
                top.window.location="http://" + GlobalParam.LoginModel.VGSHost + ":" + GlobalParam.LoginModel.VGSPort+GlobalParam.ActiveXPath;
            }
            return ;
        }
        
    	if (!GlobalParam.gInitFlag){
			var ret = document.getElementById("basicPanel").VGSII_ActiveX_Init();
			var initResult = eval('('+ret +')');
			if (initResult.ErrorState != 0)
			{
				showErrorDescription(initResult.ErrorMessage);
				return ;
			}
			GlobalParam.gInitFlag = true;
		}

	
		flag = CheckVersion();
        if (!flag){
            return;
    	}

    	var result = document.getElementById("basicPanel").VGSII_ActiveX_Login(GlobalParam.LoginModel.VGSHost, GlobalParam.LoginModel.VGSPort, GlobalParam.LoginModel.UserName, GlobalParam.LoginModel.Password, "zhongwu", " ",GlobalParam.LoginModel.AppKey,GlobalParam.LoginModel.SecurityKey, 20);
		var data =  eval('(' + result + ')');
		if (data.ErrorState != 0){					
			ShowFailure("OCX登录失败！" + data.ErrorMessage);
			return ;
		}
		GlobalParam.LoginModel.AXSessionId = data.ResultInfo.usersessionid;
		if (successCallBack != null && typeof successCallBack == "function") {
            successCallBack();
        }
    }
        var url = GlobalParam.UrlList.Login+"?username="+GlobalParam.LoginModel.UserName+"&password="+GlobalParam.LoginModel.Password;
        //webapi授权码登录
		var jsondata = Request(url);
		if (jsondata&&jsondata.Success) {
            GlobalParam.LoginModel.SessionId = jsondata.Result;
			checkAxVersionAndInit();
            console.log("webapi登录成功!");
        } else {
			ShowFailure("webapi登录失败！请检查配置的IP和端口是否正确！");
        }      
     	
}


function GetVersion() {
    var flag = false;
    var url = GlobalParam.UrlList.GetAxVersion + "?sessionid=" + GlobalParam.LoginModel.SessionId+"&_time="+new Date().getTime();
	var jsondata = Request(url);
	if (jsondata&&jsondata.Success) {
		var ret = jsondata.Result;
		var result = eval("(" + ret.substr(1,(jsondata.Result.length-2)) + ")");
		GlobalParam.ActiveXPath = "/DownloadSDK/" + result.SDKCode;
        GlobalParam.ActiveXVersion = result.Version;
        flag = true
    } else {
        ShowFailure("版本检测失败！");
    }
    return flag;
}

function getCenterid(){
	var url = "http://" + GlobalParam.LoginModel.VGSHost + ":" + GlobalParam.LoginModel.VGSPort +"/api/general/getgeneral";
	var jsondata = Request(url);
	if (jsondata&&jsondata.Success){
		GlobalParam.CenterId = jsondata.Result.CenterId;
		console.log("getCenterid成功!"+GlobalParam.CenterId);
	}else{
		console.log("getCenterid失败!");
	}
}


function CheckVersion() {
    try {

        var result = document.getElementById("basicPanel").VGSII_ActiveX_Version();

        var data = eval("(" + result + ")");
        if (data.ErrorState != 0) {
            ShowFailure("ActiveX版本获取失败！" + data.ErrorMessage);
            return false;
        } else {
            var version = data.ResultInfo.Version;

            GlobalParam.CurrentActiveXVersion = version;


        }
    } catch (e) {
        GlobalParam.CurrentActiveXVersion = "1.0";
    }

    if (GlobalParam.ActiveXVersion > GlobalParam.CurrentActiveXVersion) {
        var result = confirm("视频播放控件有更新(" + GlobalParam.CurrentActiveXVersion + " > " + GlobalParam.ActiveXVersion + ")，是否现在升级？")
        if (result) {
            window.location.href = "http://" + GlobalParam.LoginModel.VGSHost + ":" + GlobalParam.LoginModel.VGSPort +GlobalParam.ActiveXPath;
            //window.open(GlobalParam.ActiveXPath);
            return false;
        }
    }
    return true;
}

function Log(content) {
    if (GlobalParam == null || GlobalParam.LogEnable != true)
        return;
    // union of Chrome, FF, IE, and Safari console methods
    if (!window.console) {
        window.console = {};
        var m = [
     "log", "info", "warn", "error", "debug", "trace", "dir", "group",
     "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
     "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
        ];
        // define undefined methods as noops to prevent errors
        for (var i = 0; i < m.length; i++) {
            if (!window.console[m[i]]) {
                window.console[m[i]] = function () { };
            }
        }
    }
    console.log(content);
    return;

}

function GetBrowser() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = parseFloat(s[1]) :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = parseFloat(s[1]) :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = parseFloat(s[1]) :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = parseFloat(s[1]) :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = parseFloat(s[1]) :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = parseFloat(s[1]) : 0;

    //if (Sys.ie) $('span').text('IE: ' + Sys.ie);
    //if (Sys.firefox) $('span').text('Firefox: ' + Sys.firefox);
    //if (Sys.chrome) $('span').text('Chrome: ' + Sys.chrome);
    //if (Sys.opera) $('span').text('Opera: ' + Sys.opera);
    //if (Sys.safari) $('span').text('Safari: ' + Sys.safari);
    return Sys;
};

//本地存储操作类
function XunmeiLocalStorage() {

    //设置本地存储(property不为空时以json模式存储)
    this.Set = Set;
    //获取本地存储
    this.Get = Get;
    // 删除本地存储
    this.Remove = function (key, property) {
        if (!window.localStorage) {
            var value = document.cookie;
            if (value == "") {
                return "";
            }

            var jsonval = JSON.parse(value);
            if (jsonval.hasOwnProperty(key)) {
                delete jsonval.key;
            }

            document.cookie = JSON.stringify(jsonval);

            return;
        }
        else {
            localStorage.removeItem(key);
        }
    };

    //绑定存储对象变化事件
    this.WatchData = function (model, key, property, setBindModel) {
        if (model && model.$watch && key) {
            model.$watch("$all", function () {
                //需要手动处理存储对象时直接调用
                if (typeof setBindModel == 'function') {
                    setBindModel();
                }

                Set(key, model.$model, property);
            });
        }
    };

    //绑定页面的存储
    this.Load = function () {
        if (1 == arguments.length)
            LoadCustom(arguments[0]);
        else
            LoadDefault(arguments[0], arguments[1], arguments[2]);
    };

    //绑定页面的存储默认
    function LoadDefault(model, key, property) {
        try {
            if (model && model.BindModel) {
                var value = Get(key, property);
                if (value) {
                    model.BindModel = value;
                }
            }
        } catch (e) {
        }
    }

    //绑定页面的存储(自定义)
    function LoadCustom(customBindFun) {
        if (typeof customBindFun == 'function') {
            customBindFun();
        }
    }

    function Set(key, value, property) {
        if (!window.localStorage) {
            var jsvalue = document.cookie;
            var jsonval = {};
            if (jsvalue == "") {
                jsonval[key] = JSON.stringify(value);
            }
            else {
                jsonval = JSON.parse(value);
                jsonval[key] = JSON.stringify(value);
            }

            document.cookie = JSON.stringify(jsonval);

            return;
        }
        if (property) {
            var data = localStorage.getItem(key);
            var json = {};
            if (data)
                json = JSON.parse(data);

            json[property] = value;
            localStorage.setItem(key, JSON.stringify(json));
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    //获取
    function Get(key, property) {
        if (!window.localStorage) {
            var value = document.cookie;
            if (value == "") {
                return "";
            }
            jsonval = JSON.parse(value);
            if (!jsonval.hasOwnProperty(key)) {
                return "";
            }

            return JSON.parse(jsonval[key]);
        }
        var value = localStorage.getItem(key);
        if (property) {
            try {
                var json = JSON.parse(value);
                var thisValue = json[property];
                try {
                    if (thisValue) {
                        return JSON.parse(thisValue);
                    } else {
                        return "";
                    }
                } catch (e) {
                    Log(e);
                    return thisValue;
                }
            } catch (e) {
                Log(e);
                return "";
            }
        } else {
            try {
                return JSON.parse(value);
            } catch (e) {
                Log(e);
                return value;
            }
        }
    }
}



//HashTable类
function HashTable() {
    this._content = {};
}

HashTable.prototype =
{
    initialize: function () {
        this._content = {};
    },
    Count: function () {
        var count = 0;
        for (var i in this._content) count++;
        return count;
    },
    Items: function (key) {
        if (this.Contains(key)) {
            return this._content[key];
        }
    },
    Add: function (key, value) {
        if (this._content.hasOwnProperty(key)) {
            return false;
        }
        else {
            this._content[key] = value;
            return true;
        }
    },
    ForEach: function (fn) {
        for (var key in this._content) {
            if (this._content.hasOwnProperty(key)) fn(key, this._content[key]);
        }
    },
    Clear: function () {
        this._content = {};
    },
    Contains: function (key) {
        return this._content.hasOwnProperty(key);
    },
    Remove: function (key) {
        delete this._content[key];
    },
    Set: function (key, value) {
        //if (!this.Contains(key)) {
        //    return false;
        //}
        this._content[key] = value;
        return true;
    }
}

String.prototype.ToUrl = function () {
    return "http://" + GlobalParam.LoginModel.VGSHost + ":" + GlobalParam.LoginModel.VGSPort + this;
}

function getVGSIP(){
	$.ajax({
		url : Constants.CONTEXT_PATH + '/home/getVGSinfo.do?fresh=' + Math.random(),
		method: 'GET',
		async: false,
		dataType : 'json',
		success : function(json) {
			GlobalParam.LoginModel.VGSHost = json.data.ip;
			GlobalParam.LoginModel.SecurityKey = json.data.securitykey;
			GlobalParam.LoginModel.UserName = json.data.username;
			GlobalParam.LoginModel.Password = json.data.password;
			GlobalParam.LoginModel.AppKey = json.data.key;
			GlobalParam.CenterId = json.data.centerId;
		},
		error : function() {
			ShowFailure('获取VGSIP失败！');
		}
	});
}

