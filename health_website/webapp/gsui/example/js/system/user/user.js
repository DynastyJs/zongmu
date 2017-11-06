/**
 * 小中型规模模块入口,处理全局的事件逻辑,主要演示单模块单js,以及组件间通信两种方式 
 */
Gsui.entry({
	autoCreateViewport : 'Demo.system.user.view.UserViewport',//指定对应的Viewport
	paths : {//设置目录与命名空间对应关系
			'Demo' : '../../../js',//设置应用根目录
			'Gsui.ux' : '../../../lib/ux'//设置Gsui.ux根目录
	},
	onLaunch : function(){
		
	},
	listeners : {
		launch : 'onLaunch'
	}
});

/**
 * 定义Viewport ,创建界面
 */
Gsui.define('Demo.system.user.view.UserViewport',{
	extend : 'Gsui.container.Viewport',
	viewModel : {//全局viewmodel
		type : 'userviewmodel'
	},
	layout : 'border',
	items : [{
		region : 'west',
		width : 200,
		layout : 'fit',
		split : true,
		items : {
			xtype : 'user.orgtree',
			reference: 'orgTreePanel'//设置在viewModel中的名称
		}
	},{
		region : 'center',
		layout : 'fit',
		items : {
			xtype : 'user.usergrid',
			id : 'userGridPanel',
			reference: 'userGridPanel'//设置在viewModel中的名称
		}
	},{
		/**
		 * 演示即时重写 
		 */
		region : 'south',
		reference : 'southPanel',
		split : true,
		height : 150,
		bind :{
			title : '{userGridPanel.title}'
		},
		/**
		 * 重写initComponent 
		 */
		initComponent : function(){
			this.self.prototype.initComponent.apply(this,arguments);//即时重写不能用callParent
			Gsui.on('testevent',this.onTestEvent,this);
		},
		/**
		 *  响应TestEvent
		 */
		onTestEvent : function(cmp,args){
			this.setTitle(args[0].title);
		}
	}]
});
/**
 * 定义全局ViewModel ,与数据相关变量
 */
Gsui.define('Demo.system.user.viewmodel.UserViewModel',{
	extend : 'Gsui.app.ViewModel',
	alias : 'viewmodel.userviewmodel',
	data : {//可以定义初始数据
		title : 'abe',
		title1 : 'abe1'
	}
});


/**
 * 定义树 
 */
Gsui.define('Demo.system.user.OrgTreePanel',{
	extend : 'Gsui.tree.Panel',//扩展对应的组件,根据需要扩展的适合的类
	bind : {//设置绑定
		title : '{userGridPanel.title}'
	},
	xtype : 'user.orgtree',
	
	initComponent : function(){
		Gsui.apply(this,{//可以放到viewModel中
			store : Gsui.create('Demo.system.org.store.FileStore'),
		});
		
		this.callParent();
		Gsui.on('testevent',this.onTestEvent,this);//监听全局事件
		this.on('titlechange',this.onTitleChange,this);//监听组件内部事件
	},
	/**
	 *  响应TestEvent
	 */
	onTestEvent : function(cmp,args){
		//debugger;
		this.setTitle(args[0].title);
	},
	onTitleChange : function(){
		//debugger
	}
});
/**
 * 定义表格 
 */
Gsui.define('Demo.system.user.UserGridPanel',{
	xtype : 'user.usergrid',
	extend : 'Gsui.grid.Panel',
	requires : 'Demo.system.user.store.UserStore',
	defaultListenerScope: true,//设置button默认范围
	publishes : ['title'],
	
   // twoWayBindable: ['title','header'],
	bind : {//设置绑定
		title : '{title1}'
	},
	columns : [ {
		dataIndex : 'name',
		flex : 1,
		text : '名  字'
	}, {
		dataIndex : 'phoneNumber',
		flex : 1,
		text : 'Phone Number'
	}],
	tbar : [{
		text : '通过publishEvent实现组件间通信',
		handler : 'onTestPublishEvent',
	},{
		text : '通过viewModel实现组件间通信',
		handler : 'onTestPublishState'
	}],
	initComponent : function(){
		var users = [
			{
				id: 1,
				name: 'Ed Spencer',
				phoneNumber: '555 1234'
			},
			{
				id: 2,
				name: 'Abe Elias',
				phoneNumber: '666 1234'
			}
		];
		Gsui.apply(this,{
			store : Gsui.create('Demo.system.user.store.UserStore',{data : users})
		});
		this.callParent();
	},
	onTestPublishEvent : function(){
		this.setTitle('publishEvent组件间通信');
		this.publishEvent('testevent', {title : this.getTitle()});
		this.viewModel.set('userGridPanel.title','publishEvent组件间通信');//主要演示用
	},
	onTestPublishState : function(){
		this.setTitle('viewModel组件间通信');
		//需要设置publishes属性
		this.publishState();
	}
});
