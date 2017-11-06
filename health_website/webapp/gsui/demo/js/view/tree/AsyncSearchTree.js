/**
 *  @class Demo.view.tree.AsyncSearchTree
 *  异步树支持按需展开,适合大数据量的场景,
 *  异步树组件支持远程查询并把查询结果同步到树的节点
 */
Gsui.define('Demo.view.tree.AsyncSearchTree', {
	extend : 'Gsui.ux.tree.AsyncBaseTree',
	xtype : 'async-search-tree',
	height : 400,
	width : 500,
	title : '异步查询树',
	url : '../../department/getChildsByParent.do',//设置树结点数据的url
	queryUrl : '../../department/queryByName.do',//设置搜索查询url
	listConfig : {    //下拉表格的配置
		width : 380,
		columns : [{//查询结果显示字段
					text : 'id',
					dataIndex : 'id'
				}, {
					text : 'text',
					dataIndex : 'text'
				}, {
					text : 'path',
					dataIndex : 'path'
				}]
	},
	//设置根结点
	root : {
		text : '中国',
		id : '0',
		expanded : false
	},
	//总条数属性
	totalProperty : 'totalElements',
	//根属性设置
	rootProperty : 'content',
	//设置查询store字段
	queryFields : ['id', 'text', 'parent', 'path'],
	//查询结果条数
	queryPageSize : 10			
});