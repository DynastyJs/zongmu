/**
 * @class  Demo.system.org.view.OrgTreePanel
 * 机构树
 */
Gsui.define('Demo.system.org.view.OrgTreePanel',{
	extend : 'Gsui.tree.Panel',
	requires : ['Demo.system.org.viewmodel.OrgViewModel','Demo.system.org.store.FileStore'],//注入依赖
	title : 'OrgTreePanel',
	xtype : 'orgtreepanel',
	rootVisible: true,//设置是否显示根节点
	viewModel : {//设置机构ViewModel
		type : 'orgviewmodel'
	},
	controller : {//设置控制器,这里演示了xclass方式动态注入,建议用requires方式
		xclass : 'Demo.system.org.controller.OrgTreePanelController'
	},
	
	bind : '{treeorgs}',
	/**
	 * 扩展initComponent方法 
	 */
	initComponent : function(){
		this.callParent();
	}
});