/**
 * 组织管理模块入口,主要演示MVVM模式(单模块多js支撑),代码结构(可参照js/system/org目录)等 
 */
Gsui.entry({
	
	autoCreateViewport : 'Demo.system.org.view.OrgViewport',
	paths : {//设置目录与命名空间对应关系
			'Demo' : '../../../js',//设置应用根目录
			'Gsui.ux' : '../../../lib/ux'//设置Gsui.ux根目录
	},
	launch : function(){
		
	},
	config: {//设置全局监听器
        listen: {
            controller: {//监听controller广播下orgadded的事件
                '*': {
                   orgadded: 'onOrgAdded'
                }
            }
        }
    },
    onOrgAdded : function(){
    	
    }
});