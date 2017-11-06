var baseOcx = function(ocxParam){
	
	if(typeof ocxParam == "string"){
		ocxObj = $(ocxParam)[0].object;
	}if(typeof ocxParam == "object"){
		ocxObj = ocxParam;
	}
	
	function generateOcxParamJson(jsonParam){
		return JSON.stringify(jsonParam);
	}
	
	function decodeOcxRet(ret){
		return eval("("+ret+")");
	}
	
	/**
	 * 主方法
	 */
	function sysFunc(jsonParam) {
		if (!ocxObj) {
			return;
		}
		return decodeOcxRet(ocxObj.GS_SASysFunc(generateOcxParamJson(jsonParam)));
	}
	
	/**
	 * 初始化
	 */
	function init(){
		var jsonParam = {
			"action" : "Init",
			"arguments" : {
			}
		};
		return sysFunc(jsonParam);
	}
	
	/**
	 * 退出登录
	 */
	function logout(){
		var jsonParam = {
			"action" : "LogoutSAP",
			"arguments" : {
			}
		};
		return sysFunc(jsonParam);
	}
	
	
	
	/**
	 * 反初始化
	 */
	function UnInit(){
		var jsonParam = {
			"action" : "UnInit",
			"arguments" : {
			}
		};
		return sysFunc(jsonParam);
	}
	
	
	/**
	 * 注册回调消息
	 */
	function registCallback(callbackFun){
		if (!ocxObj) {
			return;
		}
		ocxObj.GS_SARegJsFunctionCallback(callbackFun);
	}
	
	/**
	 * 登录CMS服务
	 */
	function loginSAP(szServerIP,nPort,szUser,szPassword,szServName){
		var params = {};
		params.szServerIP = szServerIP;
		params.nPort = parseInt(nPort);
		params.szUser = szUser;
		params.szPassword = szPassword;
		params.szServName = szServName;
		var jsonParam = {
			"action" : "LoginSAP",
			"arguments" : params
		};
		return sysFunc(jsonParam);
	}
	
	/**
	 * 设置平台信息
	 */
	function setVSPInfo(szServerIP,nPort,szUser,szPassword,nPlatformIndex,ePlatformType,nPlatformID){
		var params = {};
		params.szServerIP = szServerIP;
		params.nPort = parseInt(nPort);
		params.szUser = szUser;
		params.szPassword = szPassword;
		params.nPlatformIndex = parseInt(nPlatformIndex);
		params.ePlatformType = parseInt(ePlatformType);
		params.nPlatformID = parseInt(nPlatformID);
		var jsonParam = {
			"action" : "SetVSPInfo",
			"arguments" : params
		};
		return sysFunc(jsonParam);
	}
	
	/**
	 * 摘要方法
	 */
	function snapshotFunc(jsonParam) {
		if (!ocxObj) {
			return;
		}
		return decodeOcxRet(ocxObj.GS_SASnapshotFunc(generateOcxParamJson(jsonParam)));
	}
	
	function setInterestedZone(szFileID){
		var params = {};
		params.szFileID = szFileID;
		var jsonParam = {
			"action" : "SetInterestedZone",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	function clearInterestedZone(){
		var params = {};
		var jsonParam = {
			"action" : "ClearInterestedZone",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	function queryARLabel(szFileID){
		var params = {};
		params.szFileID = szFileID;
		var jsonParam = {
			"action" : "QueryARLabel",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	function searchSnapshot(param){
		var params = {};
		params= param;
		var jsonParam = {
			"action" : "SnapshotSearch",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	function getSnapshotResult(nIndex,nOffset){
		var params = {};
		params.nIndex = nIndex;
		params.nOffset = nOffset;
		var jsonParam = {
			"action" : "GetSnapshotResult",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	
	/*****************文件管理**************************/
	function fileManageFunc(jsonParam){
		if (!ocxObj) {
			return;
		}
		return decodeOcxRet(ocxObj.GS_SAFileManageFunc(generateOcxParamJson(jsonParam)));
	}
	
	function saveAsImage(szDefaultFileName,szInputPath){
		var params = {};
		params.szDefaultFileName = szDefaultFileName;
		params.szInputPath = szInputPath;
			var jsonParam = {
			"action" : "SaveAsImage",
			"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	function getFolderPath(){
		var jsonParam = {
			"action" : "BrowseMenu",
			"arguments" : {
			}
		};
		return fileManageFunc(jsonParam);
	}
	
	function getFilePath(param){
		var jsonParam = {
			"action" : "BrowseFolder",
			"arguments" : {
				'folder' : param
			}
		};
		return fileManageFunc(jsonParam);
	}
	
	//单文件上传
	function uploadFile(szFileName,szFolderID,szBegintime,szEndtime,szExtraInfo,szpFilePath,eUploadType,szAccountName){
		//argus:1)szFileName//文件别名                  2)szFolderID //文件夹ID     3)szBegintime//起始时间戳 格式: "2015-04-16 15:30:30" 
	//4）szEndtime结束时间戳 格式: "2015-04-16 15:30:30"  5）szExtraInfo//上传给服务器，服务器用这条数据写数据库，Json字符串      6)szpFilePath //文件路径
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.szFileName = szFileName;
		params.szFolderID = szFolderID;
		params.szBegintime = szBegintime;
		params.szEndtime = szEndtime;
		params.szExtraInfo = szExtraInfo;
		params.szpFilePath = szpFilePath;
		params.eUploadType = eUploadType;
		params.szAccountName = szAccountName;
		var jsonParam = {
			"action" : "StartUpLoadFile",
			"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	function stopUpLoadFile(uploadId){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.nUpLoadFileID = parseInt(uploadId,10);
		var jsonParam = {
			"action" : "StopUpLoadFile",
			"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//上传图片文件夹
	function uploadPictureFolder(szFilePath,szFolderID,szAccountName){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.szFilePath = szFilePath;
		params.szFolderID = szFolderID;
		params.szAccountName = szAccountName;
		var jsonParam = {
				"action" : "StartUpLoadFolder",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	function stopUpLoadFolder(){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		var jsonParam = {
				"action" : "StopUpLoadFolder",
				"arguments" : {}
		};
		return fileManageFunc(jsonParam);
	}
	
	//获取文件进度
	function getUploadFileUploadProgress(uploadId){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.nUpLoadFileID = parseInt(uploadId);
		var jsonParam = {
				"action" : "GetUploadFileInfo",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//获取文件夹进度
	function getPictureFolderUploadProgress(uploadId){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		var jsonParam = {
				"action" : "GetUploadFolderInfo",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//开始转码
	function startConvertFile(szSrcFileName,szDstFileName,szBeginTime){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.szSrcFileName = szSrcFileName;
		params.szDstFileName = szDstFileName;
		params.szBeginTime = szBeginTime;
		var jsonParam = {
				"action" : "StartConvertFile",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//停止转码
	function stopConvertFile(lPort){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.lPort = lPort;
		var jsonParam = {
				"action" : "StopConvertFile",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//获取转码进度
	function getConvertFileProgress(lPort){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.lPort = lPort;
		var jsonParam = {
				"action" : "GetConvertFileProgress",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	return {
		init : init,
		logout : logout,
		uninit : UnInit,
		registCallback :registCallback,
		loginSAP : loginSAP,
		setVSPInfo :setVSPInfo,
		/**摘要接口*/
		searchSnapshot :searchSnapshot,
		getSnapshotResult: getSnapshotResult,
		queryARLabel :queryARLabel,
		clearInterestedZone:clearInterestedZone,
		setInterestedZone:setInterestedZone,
		
		/**文件接口*/
		saveAsImage : saveAsImage,
		getFilePath : getFilePath,
		getFolderPath : getFolderPath,
		uploadFile :uploadFile,
		stopUpLoadFile : stopUpLoadFile,
		getUploadFileUploadProgress :getUploadFileUploadProgress,
		uploadPictureFolder : uploadPictureFolder,
		stopUpLoadFolder :stopUpLoadFolder,
		getPictureFolderUploadProgress : getPictureFolderUploadProgress,
		startConvertFile :startConvertFile,
		stopConvertFile :stopConvertFile,
		getConvertFileProgress : getConvertFileProgress
		
		
	}
}