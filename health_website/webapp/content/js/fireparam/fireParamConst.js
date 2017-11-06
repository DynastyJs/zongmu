/**
 * 电气火灾常量
 */
// ////////////////////////////////////////////////常量设置/////////////////////////////////////////////////////////////
// 存储最后一个节点idStr
var selectNodeId = "";
// 选中的探测器
var selectNode = [];
//设置按钮请求后台url
var settingUrl=Constants.CONTEXT_PATH + '/fire_param/setFireParam.do';
//取消设置后台url
var cancelUrl = Constants.CONTEXT_PATH + '/fire_param/cancel.do'
//获取参数设置进度url
var processUrl = Constants.CONTEXT_PATH + '/fire_param/tips'
//初始化树的url
var initTreeUrl=Constants.CONTEXT_PATH + '/fire_param/fireParamTree.do';
//标记是否继续设置
var continueToSet=true;
//总设置参数个数
var totalParamsLen=0;
//已设置参数个数
var finishParamsLen=0;
//标记第一次遍历
var isFirstTime=true;
//获取某一个节点配置信息
var getOneNodeSettingUrl=Constants.CONTEXT_PATH + '/fire_param/initOneFireParams';
//input对象,存储各个input值，判定回显后是否改变
var inputObject={};


/*
* 多回路电气火灾探测器接口
*/
var initMultilTreeUrl=Constants.CONTEXT_PATH + '/fire_param/multilFireParamTree.do';