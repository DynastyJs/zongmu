/**
 * 此文件是一个公共的文件，各个模块都需要引入，主要目的是通过重写gsui库相关的组件或者类以达到
 * 扩展增强gsui,满足应用的需求，一般不与具体的业务绑定 
 */



/**
 * Gsui模块定义，以方便全局管理
 * @param {Object} config
 */
Gsui.entry = function(config) {
	Gsui.Boot.config.disableCaching = false;//去掉Loader中的_dc
	
	config = Gsui.apply({
    	extend: 'Gsui.BaseModule',
    	name : 'Demo',//设置应用名称
		paths : {//设置目录与命名空间对应关系
			'Demo' : '../../js',//设置应用根目录
			'Gsui.ux' : '../../lib/ux'//设置Gsui.ux根目录
		},
    }, config);
    var paths = config.paths, ns;
    Gsui.Loader.setPath(config.name, config.appFolder || 'js');

    if (paths) {
        for (ns in paths) {
            if (paths.hasOwnProperty(ns)) {
                Gsui.Loader.setPath(ns, paths[ns]);
            }
        }
    }
   Gsui.entry.$config = config;//保存设置
   Gsui.onReady(function() {//当js与dom准备好后运行
	 	Gsui.define(config.name + ".$app", config,
        	function () {
            	Gsui.app.Application.instance = new this();//this就是config.name + ".$app"
        });
   });
};
/**
 * Gsui模块定义，以方便全局管理 
 */
Gsui.define('Gsui.BaseModule',{
	extend : 'Gsui.app.Application',
	statics: {//全局属性
        globalViewModel: undefined//全局viewModel变量
    },
    
	onLaunch : function(){
		
	},
	
	listeners : {
		launch : 'onLaunch'
	},
	
	constructor : function(){
		this.callParent(arguments);
	},
	/**
	 * 监听模块组件的事件 
	 */
    listen: {
        global: {
            '*': {
            	addeduser : '_onEvent'
            }
        },
        component: {
            '*': {
            	addeduser : '_onEvent'
            }
        },
        store: {
            '*': {
            	addeduser : '_onEvent'
            }
        },
        controller: {
            '*': {
            	addeduser : '_onEvent'
            }
        }
    },
    /**
     *  监听模块所有组件事件
     */
    _onEvent : function(){
    	//debugger;
    }
});
/**
 * 重写Component,以使每个组件通过this.viewModel得到globalViewModel实例
 */
Gsui.define('Gsui.override.Component',{
	override : 'Gsui.Component',
	initComponent : function(){
		var appName = Gsui.entry.$config.name;
		if(eval('typeof '+appName+ '!= "undefined"') && typeof eval(appName+'.$app') != 'undefined'){//判断viewmodel是否初始化好
			Gsui.apply(this,{
				viewModel : this.viewModel ? this.viewModel : eval(appName+'.$app.globalViewModel')
			});
		}
		this.callParent(arguments);
	},
	/**
	 *  把事件广播到global domain中
	 */
	publishEvent : function(ev){
		var args = Array.prototype.slice.call(arguments);
		Gsui.GlobalEvents.fireEvent(ev,this,args.slice(1,args.length))
	}
});
/**
 * 重写Viewport,得到全局ViewModel
 */
Gsui.define('Gsui.override.view.UserViewport',{
	override : 'Gsui.container.Viewport',
	initComponent : function(){
		var appName = Gsui.entry.$config.name;
		if(eval('typeof '+appName+ '!= "undefined"') && typeof eval(appName+'.$app') != 'undefined'){
			eval(appName+'.$app.globalViewModel = this.getViewModel();')//保存到全局globalViewModel变量
		}
		this.callParent(arguments);
	}
});