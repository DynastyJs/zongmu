/**
 * 多iframe主页面入口,处理全局逻辑地方,需要在base.js中设置name与paths的
 */
Gsui.entry({ //建议在base.js中设置name与paths
    
    name : 'Demo',//应用的名称
    
    paths : {//名称与js目录的对应关系
		Demo : '../js/' 
	},
	autoCreateViewport : 'Demo.Viewport'//设置viewport
    
});