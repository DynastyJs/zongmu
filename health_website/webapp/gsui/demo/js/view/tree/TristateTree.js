/**
 * @class Demo.view.tree.TristateTree
 * 三态勾选树
 */
Gsui.define('Demo.view.tree.TristateTree', {
	extend : 'Gsui.ux.tree.SyncBaseTree',
	xtype : 'tristate-checkbox-tree',
	frame : true,
	title : 'TristateTree',
	height : 400,
	width : 500,
	root : {
		text : 'Gsui',
		expanded : true,
		checked : false,
		id:'-1'
	},
	url : '../../tree/getTristateTreeData.do'
});