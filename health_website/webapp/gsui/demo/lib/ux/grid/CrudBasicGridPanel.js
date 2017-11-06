/**
 * @class  Gsui.ux.crud.CrudBasicGridPanel
 * 对实体的增删改查的封装组件
 */
Gsui.define('Gsui.ux.grid.CrudBasicGridPanel', {
	extend : 'Gsui.grid.Panel',
	xtype : 'crudbasicgrid',

	/**
	 * 是否显示自定义每页显示条数工具栏,默认不显示
	 * 
	 * @type {Boolean}
	 * @property displayCount
	 */
	displayCount : false,

	/**
	 * 是否显示分页栏
	 * 
	 * @type {Boolean}
	 * @property displayPagingToolbar
	 */
	displayPagingToolbar : true,
	/**
	 * 是否显示工具栏
	 * 
	 * @type {Boolean}
	 * @property displayToolbar
	 */
	displayToolbar : true,

	/**
	 * 是否显示多选列
	 * 
	 * @type {Boolean}
	 * @property checked
	 */
	checked : false,

	extraParams : null,
	/**
	 * 静态操作按钮数组,可以自定义每个模块的操作按钮
	 * 
	 * @type {Array}
	 * @property operateTbarArr
	 */
	operateButtons : null,
	/**
	 * 操作按钮位置,默认居右
	 * 
	 * @type {String}
	 * @property operateButtonsAlign
	 */
	operateButtonsAlign : 'left',
	/**
	 * 顶部工具栏
	 * 
	 * @type {Array}
	 * @property operateTbarArr
	 */
	operateTbarArr : null,
	
	defaultPageSize : 10,//默认10条每页
	/**
	 * 初始化
	 */
	initComponent : function() {
		var me = this;
		var store = new Gsui.data.JsonStore({
					proxy : {
						type : 'ajax',
						url : this.baseUrl,
						reader : {
							type : 'json',
							totalProperty : me.totalProperty?me.totalProperty:'totalCount',
							rootProperty : me.rootProperty?me.rootProperty:'data'
						}
					},
					pageSize : this.pageSize || this.defaultPageSize,
					remoteSort : true,
					sorters : this.sorters,
					fields : this.fields
				});
		//设置多选情况
		if (this.checked) {
			var rownumberer = Gsui.create('Gsui.grid.column.RowNumberer');
			var cols = [rownumberer].concat(this.columns);
			Gsui.apply(this,{
				columns : cols,
				selType: 'checkboxmodel'
			});
		}
		Gsui.apply(this, {
					store : store,
					columns : this.columns
				});

		if (this.displayToolbar) {
			var arrTbar = [];
			if (this.queryConfig && this.queryConfig.queryTbar) {// 添加查询工具栏
				this.queryConfig.align = this.queryConfig.align || 'right';// 查询按钮默认居右
				if (this.queryConfig.align && this.queryConfig.align == 'right') {
					this.queryConfig.queryTbar.push("->");
				} else
					this.queryConfig.queryTbar.push("&nbsp;&nbsp;&nbsp;");
				this.queryConfig.queryTbar.push({
							text : '查  询',
							handler : this.doQueryEntity.bind(this)
						});
				arrTbar.push({
							itemId : 'queryToolbar',
							items : this.queryConfig.queryTbar,
							cls : 'query-toolbar'
						});
			}

			if (this.operateTbarArr)
				arrTbar.push({
							items : this.operateTbarArr
						});// 添加顶部工具栏

			arrTbar.push({
						items : this.convertToOperateliteral()
					});// 添加操作工具栏
			if (this.store) {
				Gsui.apply(this.store, {
							pageSize : this.pageSize || this.defaultPageSize
						});
			}
			Gsui.apply(this, {
						tbar : {
							xtype : 'container',
							defaultType : 'toolbar',
							items : arrTbar
						}
					});

			if (this.store) {
				Gsui.apply(this.store.proxy.extraParams,this.extraParams);
			}
			if (this.displayPagingToolbar)
				Gsui.apply(this, {
							bbar : Gsui.create('Gsui.PagingToolbar', {
										store : this.store,
										pageSize : this.pageSize || this.defaultPageSize,
										displayInfo : true
									})
						});
		}
		me.callParent();
		store.load({params : {'start':0,'page' :1,'limit':this.pageSize  || this.defaultPageSize}});
	},// initCompontent

	// private
	convertToOperateliteral : function() {
		var arrBtn = [];
		if (this.operateButtonsAlign == 'right') {
			arrBtn.push('->');
		}
		if (typeof _result != 'undefined') {
			Gsui.each(_result.listAction, function(item) {
						arrBtn.push({
									id : 'btnOpernate_' + item.id,
									text : item.name,
									handler : item.methodName
											? eval("this." + item.methodName
													+ ".bind(this)")
											: null
								});
						arrBtn.push('&nbsp;&nbsp;');
					}, this);
		}
		if (this.operateButtons) {// 添加静态操作按钮数组
			Gsui.each(this.operateButtons, function(item) {
						arrBtn.push({
									id : item.id ? item.id : null,
									text : item.text,
									iconCls : item.iconCls,
									tooltip : item.tooltip,
									onlyIcon : item.onlyIcon,
									width : item.width || 80,
									height : item.height,
									handler : item.handler ? eval(item.handler
											+ ".bind(this)") : null
								});
						arrBtn.push('&nbsp;&nbsp;');
					}, this);
		}
		arrBtn.push({
					text : '刷  新',
					handler : this.onRefresh.bind(this)
				});
		return arrBtn;
	},
	onRefresh : function() {
		this.getStore().reload();
	},
	updateEntity : function(config) {
		this.action = "update";
		// var record = this.getSelectionModel().getSelected();
		var record = this.getSelection()[0];
		if (Gsui.isEmpty(record)) {
			Gsui.Msg.alert("提示", "请选择所修改的数据!");
			return false;
		}
		this.showWin(config);
		// debugger;
		/*
		 * var values = this.getSelectionModel().getSelected(); var arrKey =
		 * this.primaryKey.split('.');
		 * this.fp.getForm().setValues(Util.addPrefix(values.data,arrKey[0]));
		 */
		var values = this.getSelection()[0];
		this.fp.getForm().loadRecord(values);

	},
	addEntity : function(config) {
		this.action = "add";
		this.showWin(config);
		// this.fp.form.reset();
		// this.reset();
		// this.fp.form.isValid();
	},

	showWin : function(config) {
		this.fp = this.createForm();
		this.win = this.initWin(config);
		this.win.on("close", function() {
					// _global.cmpMgr.remove(this.win.getId());// 把窗体从全局引用删除
					delete this.win;
					delete this.fp;
				}, this);
		this.win.show();
		// _global.cmpMgr.add(this.win.getId());// 把窗体添加到全局引用
	},
	initWin : function(config) {
		return new Gsui.window.Window({
					owner : this,// GridPanel与窗口关联
					width : config.width,
					height : config.height,
					title : config.title,
					layout : 'fit',
					items : this.fp,
					modal : true,
					shadow : false,
					resizable : config.resizable || false,
					fbar : {
						xtype : 'toolbar',
						itemId : 'tool',
						buttonAlign : 'right',
						border : false,
						items : [{
									text : '确定',
									itemId : 'btnConfirm',
									iconCls : 'btn-confirm'
								}, '&nbsp;&nbsp;', {
									text : '取消',
									itemId : 'btnCancel',
									iconCls : 'btn-cancel'
								}, '&nbsp;&nbsp;', {
									text : '还原',
									itemId : 'btnReset',
									iconCls : 'btn-reset'
								}]
					},
					listeners : {
						afterRender : function() {
							// 绑定事件
							this.queryById('btnCancel').on('click',
									this.onClickCancel, this);
							this.queryById('btnConfirm').on('click',
									this.onClickConfirm, this);
							this.queryById('btnReset').on(
									'click',
									this.onClickReset.bind(this,
											[config.resetCallback]));
							this.owner.fp = this.items.items[0];
							this.fp = this.items.items[0];
							this.fp.owner = this.owner;

						}
					},
					/**
					 * 确认处理函数
					 */
					onClickConfirm : function() {

						// modify by lisa 可以手动输入主键
						// var primaryField =
						// this.fp.form.findField(this.primaryKey);
						if (this.owner.action == "update") {
							if (this.owner.doUpdate)
								this.owner.doUpdate
										.apply(this.owner, arguments);
							else
								this.owner.doUpdateEntity.apply(this.owner,
										arguments);
						} else {
							if (this.owner.doAdd)
								this.owner.doAdd.apply(this.owner, arguments);
							else
								// 在doAdd中调用doAddEntity
								this.owner.doAddEntity.apply(this.owner,
										arguments);
						}
					},
					/**
					 * 取消处理函数
					 */
					onClickCancel : function() {
						if (this.owner.cancel)
							this.owner.cancel.apply(this.owner, arguments);
						this.close();
					},
					/**
					 * 还原处理函数
					 */
					onClickReset : function(cb) {
						this.items.items[0].getForm().reset();
						if (cb) {
							cb.apply(this.owner);
						}
					}
				}).show();
	},
	doAddEntity : function(config) {
		if (Gsui.isEmpty(config) || Gsui.isEmpty(config.params))
			return;
		if (Gsui.isEmpty(config) || Gsui.isEmpty(config.url))
			return;

		Gsui.Ajax.request({
					url : config.url,
					params : config.params,
					success : function(response, options) {
						var result = Gsui.decode(response.responseText);
						Gsui.Msg.show({
									title : "",
									message : result.message,
									minWidth : 250,
									buttons : Gsui.MessageBox.OK,
									icon : result.code == -1
											? Gsui.MessageBox.ERROR
											: Gsui.MessageBox.INFO
								});
						this.store.reload();
						if (config.doCallback)
							config.doCallback(result.code, this);
						this.win.close();
					},
					scope : this

				});
	},
	doUpdateEntity : function(config) {
		if (Gsui.isEmpty(config) || Gsui.isEmpty(config.params))
			return;
		if (Gsui.isEmpty(config) || Gsui.isEmpty(config.url))
			return;
		Gsui.Ajax.request({
					url : config.url,
					params : config.params,
					success : function(response, options) {
						var result = Gsui.decode(response.responseText);
						top.Gsui.Msg.show({
									title : _msg.hintTitle,
									msg : result.message,
									minWidth : 250,
									buttons : Gsui.MessageBox.OK,
									icon : result.code == -1
											? Gsui.MessageBox.ERROR
											: Gsui.MessageBox.INFO
								});
						this.store.reload();
						if (config.doCallback)
							config.doCallback(result.code, this);
						this.win.close();
					},
					scope : this

				});
	},
	doDelEntity : function(config) {
		if (Gsui.isEmpty(config) || Gsui.isEmpty(config.url))
			return;
		var record = this.getSelection()[0];
		if (!record) {
			Gsui.Msg.alert("提示", "请选择所删除的数据!");
			return false;
		}
		Gsui.MessageBox.confirm("警告", "是否真的想删除？", function(ret) {
			if (ret == "yes") {
				var arrKey = this.primaryKey.split('.');
				Gsui.Ajax.request({
							method : 'post',
							url : config.url + "?" + this.primaryKey + "="
									+ record.get(arrKey[arrKey.length - 1]),
							params : config.params,
							success : function(response, options) {
								var result = Gsui.decode(response.responseText);
								Gsui.Msg.show({
											title : "",
											msg : result.message,
											minWidth : 250,
											buttons : Gsui.MessageBox.OK,
											icon : result.code == -1
													? Gsui.MessageBox.ERROR
													: Gsui.MessageBox.INFO
										});
								this.store.reload();
								if (config.doCallback)
									config.doCallback(result.code, this);
							},
							scope : this
						});
			}
		}, this);
	},
	doQueryEntity : function(config) {
		if (this.isQueryToolbarValid()) {
			var arrSearch = [];
			this.queryToolbar.items.each(function(item) {
						if (item.name && item.name.indexOf('filter_') >= 0) {
							var itemValue = item.getValue();
							if (item.name.indexOf('_DATE_') >= 0) {
								itemValue = Gsui.util.Format.date(itemValue,
										'Y-m-d H:i:s');
							}
							arrSearch.push({
										name : item.name,
										value : itemValue
									});
						}
					});
			// debugger;
			var params = "";
			Gsui.Array.forEach(arrSearch, function(obj) {
						params = params + obj.name + '=' + obj.value + "&";
					});
			this.store.proxy
					.setUrl(this.queryConfig.url + ("?" + params), true);
			this.store.load({
						params : {
							'page':1,
							'start' : 0,
							'limit' : this.pageSize
						}
					});
		}
	},
	/**
	 * 判断QueryToolbar是否合法
	 * 
	 * @returns {Boolean}
	 */
	isQueryToolbarValid : function() {
		var valid = true;
		this.queryToolbar = this.queryById('queryToolbar');
		this.queryToolbar.items.each(function(f) {
					if (f.validate && !f.validate()) {
						valid = false;
					}
				});
		return valid;
	}
});