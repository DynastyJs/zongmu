
/**
 * @class  Demo.view.tree.SyncTree
 * 同步树,适合小数据的场景，支持本地查询,过滤与三态勾选
 */
Gsui.define('Demo.view.tree.SyncTree', {
	extend : 'Gsui.ux.tree.SyncBaseTree',
	xtype : 'sync-tree',
	
	frame : true,
	height : 400,
	width : 500,
	title : '同步树',
	
	displaySearch : true,//设置是否显示搜索栏
	
	url:'../../tree/getSyncTreeData.do',
	
	root : {
		text : 'Gsui',
		id : '-1', // 该id会以参数的形式传到后台(syncTree.jsp):node=-1
		expanded : true
	},
	 columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'text',
        flex: 2,
        sortable: true,
        dataIndex: 'text'
    },{
        text: 'text',
        flex: 1,
        dataIndex: 'text',
        sortable: true
    }]
});