/**
 * @class  Demo.system.org.view.OrgGridPanel
 * 组织机构表格组件,如果是管理的增删改查可以用CrudBasicPanel组件作为基类
 */
Gsui.define('Demo.system.org.view.OrgGridPanel',{
	extend : 'Gsui.grid.Panel',
	requires : ['Demo.system.org.viewmodel.OrgViewModel'],
	title : 'OrgGridPanel',
	bind : '{orgs}',
	xtype : 'orggridpanel',
	viewModel : {
		type : 'orgviewmodel'
	},
	controller : {
		xclass : 'Demo.system.org.controller.OrgGridPanelController'
	},
	columns: [
           { text: '编号',  dataIndex: 'id' },
           { text: '名字', dataIndex: 'name', flex: 1 },
           { text: '父机构', dataIndex: 'parentId' }
   ],
   tbar : [{
	   text : '添加',
	   handler : 'onAdd'
   },{
	   text : '修改'
   },{
	   text : '删除'
   },{
	   text : '查询'
   }]
});