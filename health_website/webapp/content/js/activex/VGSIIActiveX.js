
jQuery.support.cors=true;


//���ؼ��ӿڵķ���ֵ,����ɹ�����josn����
function checkResultValue(value){
	var result = eval('('+value+')');
	return (result.ErrorState==0);
}
function getResultInfo(value){
	var result = eval('('+value+')');
	if (result.ErrorState != 0){
		showErrorDescription(result.ErrorMessage);
		return null;
	}
	return result.ResultInfo;
}
//��ȡָ�����ȵ�����ִ�
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function getRandomString(width){
	var result = "";
	for (var i=0; i < width; i++){
		result += chars[Math.floor(Math.random()*34)];
	}
	return result;
}


var webAPIOptResult = true;

//����Wep API����
function sendHttpWebRequest(type, url, callback, param){
	$.ajax({
		async: false,
		type: type,
		dataType: "json",
		url: url,
		cache: false,
		beforeSend: function (obj) {
		
		},
		success: function (data) {
			if (callback != null){
				callback(data, param)
			}
		},
		error: function (e) {
			alert(e.statusText);
			webAPIOptResult = false;
		}
	});
}

////////////////////////////////////////////////
var dvsGUID = 100000, channelGUID = 10000000;
var webApiSessionId = "", orgArrayObj = new Array();
var lcoalLogin, userid, treeDvsNode, isreadcfg = false;

dtreeObj = null;//new dTree('dtreeObj');

function USERINFO(usrname,password,sessionid,ipaddr){
	this.username = usrname;
	this.password = password;
	this.ipaddr = ipaddr;
	this.usersessionid = sessionid;
}

function onclickTreeNode(nodeid){
	treeDvsNode = dtreeObj.openNodeFromId(nodeid);
	dtreeObj.s(dtreeObj.getIndexForIdent(nodeid));
	//alert(treeDvsNode.centerid + "_"+treeDvsNode.dvsid + "_" + treeDvsNode.cameraid);
}


function ParseURLParameter(usrParamString){
	if (usrParamString != ""){
		userid = usrParamString.substring(usrParamString.indexOf("usersessionid=")+14, usrParamString.indexOf("&username"));
		var VGSIIGatewayIp = usrParamString.substring(usrParamString.lastIndexOf("ipaddr=")+7, usrParamString.length);
		var loginUserName = usrParamString.substring(usrParamString.indexOf("username=")+9, usrParamString.indexOf("&password"));
		var loginUsrPassword = usrParamString.substring(usrParamString.indexOf("password=")+9,usrParamString.indexOf("&ipaddr"));
		return new USERINFO(loginUserName,loginUsrPassword,userid,VGSIIGatewayIp);
	}
	return null;
}

//Web Api ��¼
function WebApiLoginIn(data, context){
	if (data.Success){
		webApiSessionId = data.Result;
	}else{
		alert(data.ErrorMessage);
	}
	webAPIOptResult = data.Success;
}

//�ݹ�������֯�ṹ
function addOrgNodeToTreeList(node, parentid){
	if (node != null ){
		orgArrayObj.push(node.id);
		dtreeObj.add(node.id, parentid, node.text, -1, node.attributes.centercode, -1, "", "", "", "../../content/images/scan/base.png", "../../content/images/scan/base.png");
		for (var index in node.children){
			addOrgNodeToTreeList(node.children[index],node.id);
		}
	}
}
//Wed Api ��ȡ��֯����
function WebApiGetOrgnaziation(data, context){
	if (data.Success){
		var orglist = JSON.parse(data.Result);
		for (var index in orglist){
			orgArrayObj.push(orglist[index].id);
			dtreeObj.add(orglist[index].id, -1, orglist[index].text, -1, orglist[index].attributes.centercode, -1, "", "", "", "../../content/images/scan/base.png", "../../content/images/scan/base.png");
			for (var num in orglist[index].children){						
				addOrgNodeToTreeList(orglist[index].children[num], orglist[index].id);
			}
		}
	}else{
		alert(data.ErrorMessage);
	}
	webAPIOptResult = data.Success;
}
//������ʱ����������֯�豸�б���
function DvsContextInfo(devGuid, dvsid, dvsCID){
	this.dvsGuid = devGuid;
	this.dvsId = dvsid;
	this.dvsCid = dvsCID;
}
//Web Api ��ȡ�豸ͨ��
function WebApiGetDeviceChannelInfo(data, context){
	if (data.Success){
		var cameras = data.Result;
		cameras.sort(function(a,b){return a.Index > b.Index ? 1 : -1;});
		for (var index in cameras){
		    dtreeObj.add(channelGUID, context.dvsGuid, cameras[index].Name, context.dvsId, context.dvsCid, cameras[index].Index, "javascript:onclickTreeNode(" + channelGUID + ")", "", "", "../../content/images/scan/camera-normal.png", "../../content/images/scan/camera-normal.png");
			channelGUID += 1;
		}
	}else{
		alert(data.ErrorMessage);
	}
	webAPIOptResult = data.Success;
}
//Web Api��ȡ�豸��Ϣ
function WebApiGetDeiveInfo(data, context){
	if (data.Success == true){
		var dvsinfos = data.Result;
		for (var index in dvsinfos){
			for (var num in context){
				if (dvsinfos[index].OrgId == context[num])
				{
				    dtreeObj.add(dvsGUID, context[num], dvsinfos[index].Name, dvsinfos[index].Code, dvsinfos[index].CenterId, -1, 'javascript:onclickTreeNode(' + dvsGUID + ')', "", "", "../../content/images/scan/folder.png", "../../content/images/scan/folder.png");

					var url = "http://" + lcoalLogin.ipaddr + "/api/camera/Infos/" +  dvsinfos[index].Code + "?sessionid=" + webApiSessionId;

					var dvsContext = new DvsContextInfo(dvsGUID, dvsinfos[index].Code, dvsinfos[index].CenterId);
					sendHttpWebRequest("get", url, WebApiGetDeviceChannelInfo, dvsContext);
					dvsGUID += 1;
				}
			}
		}
	}else{
		alert(data.ErrorMessage);
	}
	dvsGUID = 100000, channelGUID = 10000000;  //�ó�ֵ
}


//Web Api �ӿڹ���
function WebApiGetDeviceList(loginInfo){
	userid = loginInfo.usersessionid;
	lcoalLogin  = loginInfo;
	var blogin = false;
	if (webAPIOptResult){
		var logUrl = "http://" + loginInfo.ipaddr + "/api/Authentication/getlogin?username=" + loginInfo.username + "&password=" + loginInfo.password;
		sendHttpWebRequest("get", logUrl, WebApiLoginIn, null);	
		blogin = true;
	}
	if (webAPIOptResult){
		var orgUrl = "http://" + loginInfo.ipaddr + "/api/org/treedata?sessionid=" + webApiSessionId;
		sendHttpWebRequest("get", orgUrl, WebApiGetOrgnaziation, null);
	}
	if (webAPIOptResult){
		var dvsUrl = "http://" + loginInfo.ipaddr + "/api/dvs/Infos?sessionid=" + webApiSessionId;
		sendHttpWebRequest("get", dvsUrl, WebApiGetDeiveInfo, orgArrayObj);
	}
	if (blogin)
	{
		var logoutUrl = "http://" + loginInfo.ipaddr + "/api/Authentication/Logout/" + webApiSessionId;
		sendHttpWebRequest("post", logoutUrl, null, null);
	}
	
	for (var index = 0; index < orgArrayObj.length; index++){
		orgArrayObj.pop();
	}
	
	return  webAPIOptResult? dtreeObj : "";
}

function loadDvsTreeFromConfig(loginInfo){
	userid = loginInfo.usersessionid;
	var ret = dtreeObj.loadConfig();
	if (!ret){
		isreadcfg = false;
		document.cookie = "";
		
		var localinfo = "{\"loginfo\":" + JSON.stringify(loginInfo) +"}{\"isreadcfg\":false}";
		document.cookie = localinfo;
	}
	return ret?dtreeObj:WebApiGetDeviceList(loginInfo);
}

/**************************************************************************************************************************************/
//�ؼ��Ƿ����
function isLoadOfActvieXControl(name){
	try{
	   var comActiveX = new ActiveXObject(name);   
	}catch(e){
	   return false;   
	}
	return true;
}

//ɾ���ؼ�
function deleteActiveXControl(ctrlId){
	 var ctrlObj=document.getElementById(ctrlId);
	 if (ctrlObj != undefined)
	 {
		ctrlObj.removeNode(true);
	 }
}

//����Ŀ¼
function chackCreateFolder(path){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (!fso.FolderExists(path)){
		fso.CreateFolder(path);
	}
}


//����������
function createProgressSlider(maxvalue, targetId, slidercss, barcss, initvalue, onstartfunc, onchangefunc, onendfunc){
	
	try{
		var slider = new neverModules.modules.slider(
								{targetId: targetId,
								 sliderCss: slidercss,
								 barCss: barcss,
								 min: 0,
								 max: maxvalue,
								 hints: "move the slider"
								});
		slider.onstart  = onstartfunc;
		slider.onchange = onchangefunc;
		slider.onend = onendfunc;
		slider.create();
		slider.setValue(initvalue);
		return slider;
	}catch(e){
		alert(e);
		return null;
	}
}
