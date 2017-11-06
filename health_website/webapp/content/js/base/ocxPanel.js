var ocxPanel = function(params){  // param :{ocxID:xxx,ocxType:xxx,defaultScreen:4}
	
	var config = {
		ocxID :'defaultOcxID',
		targetDom : null,
		ocxType : 1, //默认实时控件 1实时、2录像、3摘要、4画区域
		defaultScreen:4
	}
	if(typeof params =="object"){
		for(p in params){
			config[p] =params[p];		
		}
	}
	function init(){
		config.ocxObj = config.targetDom.object;
		initWin();
	}
	
	function initWin(){
		var jsonParam = {
			"action" : "InitMonitorWnd",
			"arguments" : {
				strOcxID : config.ocxID,
				eDispSplit : config.defaultScreen,
				eOcxType : config.ocxType
			}
		};
		return playerFunc(jsonParam);
	}
	function changeViewSplit(split){
		var jsonParam = {
			"action" : "ChangeViewSplit",
			"arguments" : {
				nDispSplit : split
			}
		};
		return playerFunc(jsonParam);
	}
	
	function delView(){
		var jsonParam = {
			"action" : "DeleteView",
			"arguments" : {
			}
		};
		return playerFunc(jsonParam);
	}
	
	function playerFunc(jsonParam) {
		if (!config.ocxObj) {
			return;
		}
		return decodeOcxRet(config.ocxObj.GS_SAPlayVideoFunc(generateOcxParamJson(jsonParam)));
	}
	
	function sysFunc(jsonParam) {
		if (!config.ocxObj) {
			return;
		}
		return decodeOcxRet(config.ocxObj.GS_SASysFunc(generateOcxParamJson(jsonParam)));
	}
	
	function generateOcxParamJson(jsonParam){
		return JSON.stringify(jsonParam);
	}
	
	function decodeOcxRet(ret){
		return eval("("+ret+")");
	}
	
	
	function showToolBar(show){
		if (!config.ocxObj) {
			return;
		}
		var params = {};
		params.bShow = parseInt(show);
		var jsonParam = {
			"action" : "ShowTaskToolbar",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	function playSummaryVideo(nWndNo,sFileID,szJsonInfo){
		if (!config.ocxObj) {
			return;
		}
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.szAbstractFileID = sFileID;
		params.szJsonInfo = szJsonInfo;
		var jsonParam = {
			"action" : "PlaySummaryFile",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/*
	 * 播放结构化上传的录像文件
	 */
	function playSAVideoFile(nWndNo,sFileID,sStartTime,sEndTime,sOffsetTime,nChnAbility){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.sFileID = sFileID;
		params.sStartTime = sStartTime;
		params.sEndTime = sEndTime;
		params.sOffsetTime = sOffsetTime;
		params.nChnAbility = nChnAbility;
		var jsonParam = {
			"action" : "SAPlayRecord",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/**
	 * 播放结构化的平台录像
	 */
	function playRecord(nWndNo,nPlatformIndex,nDevID,nChnNo,szFileID,nStorageType,nPlatID
											,szStartTime,szEndTime,szCurrentTime,nRecordType,ability){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.nPlatformIndex = parseInt(nPlatformIndex);
		params.nDevID = parseInt(nDevID);
		params.nChnNo = parseInt(nChnNo);
		params.szFileID = szFileID;
		params.nStorageType = parseInt(nStorageType);
		params.nPlatID = parseInt(nPlatID);
		params.szStartTime = szStartTime;
		params.szEndTime = szEndTime;
		params.szCurrentTime = szCurrentTime;
		params.nRecordType = parseInt(nRecordType);
		params.ability = (ability != "" ? ability : null);
		
		var jsonParam = {
			"action" : "PlayRecord",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/**
	 * 关闭视频
	 */
	function closeVideo(nWndNo){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		var jsonParam = {
			"action" : "CloseVideo",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/**
	 * 打开实时视频
	 */
	function playRealVideo(nWndNo,nPlatformIndex,nDevID,nChnNo,nStreamType,nReqType,nPlatID,ability){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.nPlatformIndex = parseInt(nPlatformIndex);
		params.nDevID = parseInt(nDevID);
		params.nChnNo = parseInt(nChnNo);
		params.nStreamType = parseInt(nStreamType);
		params.nReqType = parseInt(nReqType);
		params.nPlatID = parseInt(nPlatID);
		params.ability = (ability != "" ? ability : null);
		var jsonParam = {
			"action" : "PlayRealVideo",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/**
	 * 播放实时分析流
	 */
	function playSARealVideo(nWndNo,nPlatformID,nDevID,nChnNo,nStreamType,nReqType,szTaskID,nX,nY,nWidth,nHeight,nTaskType){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.nPlatformID = parseInt(nPlatformID);
		params.nDevID = parseInt(nDevID);
		params.nChnNo = parseInt(nChnNo);
		params.nStreamType = parseInt(nStreamType);
		params.szTaskID = szTaskID;
		params.nReqType = parseInt(nReqType);
		params.nX = nX;   //SA_RTS_TASK_MAP_DEV表记录的id，(中间表)
		params.nY = nY;   //SA_RTS_TASK_MAP_DEV表记录的id，(中间表)
		params.nWidth = nWidth;   //SA_RTS_TASK_MAP_DEV表记录的id，(中间表)
		params.nHeight = nHeight;   //SA_RTS_TASK_MAP_DEV表记录的id，(中间表)
		params.nTaskType = nTaskType;
		var jsonParam = {
			"action" : "PlaySARealVideo",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	return {
		playSummaryVideo : playSummaryVideo,
		playSAVideoFile : playSAVideoFile,
		playRealVideo :playRealVideo,
		playSARealVideo :playSARealVideo,
		closeVideo :closeVideo,
		showToolBar :showToolBar,
		init :init,
		changeViewSplit : changeViewSplit,
		delView : delView
	}
}