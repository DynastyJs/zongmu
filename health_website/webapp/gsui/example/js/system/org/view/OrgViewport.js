/**
 * @class Demo.system.org.view.OrgViewport
 *  
 * 机构管理Viewport,管理模块界面与组件布局
 */
Gsui.define('Demo.system.org.view.OrgViewport',{
	extend : 'Gsui.container.Viewport',
	requires : ['Demo.system.org.view.OrgGridPanel','Demo.system.org.view.OrgTreePanel'],//加入依赖的组件
	layout : 'border',//设置布局
	
	initComponent : function(){
		this.callParent();
	},
	
	items : [{
		region : 'west',
		title : 'West',
		width : 200,
		split : true,
		layout : 'fit',
		xtype : 'orgtreepanel'//机构树
	},{
		region : 'center',
		title : 'Center',
		layout : 'fit',
		xtype : 'orggridpanel'//机构列表
	}]
});