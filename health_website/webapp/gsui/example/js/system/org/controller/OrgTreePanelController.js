/**
 * @class  Demo.system.org.controller.OrgTreePanelController
 * 定义机构树的ViewController，处理ui方面的逻辑与响应
 */
Gsui.define('Demo.system.org.controller.OrgTreePanelController',{
	extend : 'Gsui.app.ViewController',
	config: {
        listen: {
            controller: {//监听orgadded事件
                '*': {
                   orgadded: 'onOrgAdded'
                }
            }
        }
    },
    onOrgAdded : function(){
    	//debugger
    }
});