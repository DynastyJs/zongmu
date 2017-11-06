/**
 * @class Gsui.ux.tree.AsyncBaseTree
 * 异步树支持按需展开,适合大数据量的场景,异步树组件支持远程查询并把查询结果同步到树的节点
 */
Gsui.define('Gsui.ux.tree.AsyncBaseTree', {
			extend : 'Gsui.ux.tree.BaseTree',
			xtype : 'async-base-tree',
			requires : ['Gsui.ux.form.combo.ComboGrid'],

			/**
			 * 否显示查询工具栏
			 */
			displaySearch : true,
			/**
			 * 远程查询url
			 */
			queryUrl : undefined,
			/**
			 * 总条数属性
			 */
			totalProperty : 'totalCount',
			/**
			 * 根属性设置
			 */
			rootProperty : 'root',
			
			queryFields : [],
			
			queryPageSize : 10,
			/**
			 * 设置下拉参数
			 */
			listConfig : undefined,
			/**
			 * 
			 */
			initComponent : function() {
				var me = this;
				if (me.displaySearch) {//设置查询工具栏
					var arrTbar = [];
					var store = new Gsui.data.Store({
								proxy : {
									type : 'ajax',
									url : me.queryUrl,
									reader : {
										type : 'json',
										totalProperty :me.totalProperty,
										rootProperty :me.rootProperty
									}
								},
								fields : me.queryFields,
								pageSize : me.queryPageSize
							});
							
				 var combogrid = {
						xtype : 'Gsui.ux.form.combo.ComboGrid',
						itemId : 'queryCombo',
						fieldLabel : '查询',
						triggerCls : 'x-form-clear-trigger',
						onTriggerClick : function() {
							this.reset();
						},
						store:store,
						listConfig:me.listConfig,
						typeAhead : true,
						matchFieldWidth : false,
						queryMode : 'remote',
						minChars : 1,
						listeners : {
							select : me.onSelect.bind(me),
							beforeQuery : me.onBeforeQuery.bind(me)
						}
					};
					arrTbar.push(combogrid);
					Gsui.apply(this, {
						tbar : arrTbar
					});
				}
				this.callParent();
			},
			
			/**
			 * 同步查询结果到树结点
			 * @param record
			 */
			onSelect : function(record) {
				var me = this;
				var path = record.get('path');
				this.expandPath(path, null, null, function(bSuccess, node) {
							if (!bSuccess)
								return;
							me.selModel.select(node);
				});
			},
			/**
			 * 设置store的查询参数
			 */
			onBeforeQuery : function() {
				var me = this;
				var combox = me.queryById('queryCombo');
				var queryValue = combox.getValue();
				Gsui.apply(combox.store.proxy.extraParams, {
							query : queryValue
				});
			}

		});