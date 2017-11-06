/**
 * @class Demo.view.tree.BaseTree
 * 同步树及异步树的父类
 */
Gsui.define('Gsui.ux.tree.BaseTree', {
			extend : 'Gsui.tree.Panel',
			xtype : 'base-tree',
			
			/**
			 * 定义查询树结点数据url 
			 */
			url : undefined,
			
			initComponent : function() {
				var me = this;
				var store = new Gsui.data.TreeStore({
							proxy : {
								type : 'ajax',
								url : this.url,
								reader : {
									type : 'json'
								}
							},
							root : this.root,
							pageSize : this.pageSize,
							remoteSort : true,
							sorters : this.sorters,
							fields : this.storeMapping
							});
				Gsui.apply(this, {
							store : store,
							columns : this.columns
						});

				this.callParent();
			}
		});