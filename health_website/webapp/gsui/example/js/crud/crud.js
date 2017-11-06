/**
 * 小中型规模模块入口,处理全局的事件逻辑,主要演示单模块单js与用户的增删改查组件,更多的组件使用参考Gsui demo
 */
Gsui.entry({
	autoCreateViewport : 'Demo.crud.CrudViewport',//指定对应的Viewport
	onLaunch : function(){
		
	},
	listeners : {
		launch : 'onLaunch'
	}
});

/**
 * 定义Viewport ,创建界面
 */
Gsui.define('Demo.crud.CrudViewport',{
	extend : 'Gsui.container.Viewport',
	viewModel : {//全局viewmodel
		type : 'crudviewmodel'
	},
	layout : 'border',//设置border布局
	items : [{
		region : 'center',
		layout : 'fit',
		items : {
			xtype : 'crud.crudgrid',
			id : 'crudGridPanel',
			reference: 'crudGridPanel'//设置在viewModel中的名称
		}
	}]
});
/**
 * 定义全局ViewModel ,与数据相关变量
 */
Gsui.define('Demo.crud.viewmodel.CrudViewModel',{
	extend : 'Gsui.app.ViewModel',
	alias : 'viewmodel.crudviewmodel',
	data : {//可以定义初始数据
		title : 'abe',
		title1 : 'abe1'
	}
});


/**
 * 定义增删改表格组件 
 */
Gsui.define('Demo.crud.CrudGridPanel',{
	extend : 'Gsui.ux.grid.CrudBasicGridPanel',//继承CrudBasicGridPanel组件
	xtype : 'crud.crudgrid',
	title : '人物信息',
	displayToolbar : true,//是否显示工具栏
	pageSize : 10,//设置分页条数
	primaryKey : 'id',// 主键属性
	
	totalProperty : 'totalElements',//返回数据总条数的属性
	rootProperty : 'content',//返回数据属性
	baseUrl : '../../../../gsuiuser/getAll.do',//查询数据url
	fields : ['id', 'name', 'age', 'memo'],// 给store配置fields,
	
	
	queryConfig:{//设置查询工具栏
		url : '../../../../gsuiuser/getPageList.do',
		align : 'left',
		queryTbar : [{
			xtype : 'tbtext',
			text : '姓名:',
			value:'aaa'
		},{
			xtype : 'textfield',
			name : 'filter_name',
			width:100
		},"&nbsp;&nbsp;",{
			xtype : 'tbtext',
			text : '年龄:'
		},{
			xtype : 'textfield',
			name : 'filter_age',
			width:100
		},"&nbsp;&nbsp;",{
			xtype : 'tbtext',
			text : '备注:'
		},{
			xtype : 'textfield',
			name : 'filter_memo',
			width:100
		}]
	},
	operateButtonsAlign : 'left',
	
	operateButtons : [{//设置操作按钮
				text : '增加',
				handler : 'this.addUser'
			}, {
				text : '修改',
				handler : 'this.updateUser'
			}, {
				text : '删除',
				handler : 'this.delUser'
			}],
	columns : [{//定义显示列
				header : '姓名',
				flex: 1,
				dataIndex : 'name'
			}, {
				header : '年龄',
				flex: 1,
				dataIndex : 'age'
			}, {
				header : '备注',
				flex: 1,
				dataIndex : 'memo'
			}],
	/**
	 * 
	 */
	initComponent : function() {
		this.callParent();
	},
	/**
	 * 创建用户表单 
	 */
	createForm : function() {
		return {
			xtype : 'form',
			labelWidth : 80,
			pading:10,
			defaultType : 'textfield',
			items : [{
						xtype : "hidden",
						name : "id"
					}, {
						fieldLabel : '姓名',
						name : "name",
						allowBlank : false,
						maxLength : 64
					}, {
						fieldLabel : '年龄',
						name : "age",
						allowBlank : false,
						maxLength : 64
					}, {
						fieldLabel : '备注',
						name : "memo",
						allowBlank : false,
						maxLength : 64
					}]
		};
	},
	/**
	 * 打开添加用户信息表单 
	 */
	addUser : function() {
		this.self.prototype.addEntity.call(this, {
					width : this.winWidth,
					height : this.winHeight,
					title : '添加人物信息'
				});
	},
	/**
	 * 打开修改用户信息表单 
	 */
	updateUser : function() {
		this.self.prototype.updateEntity.call(this, {
					width : this.winWidth,
					height : this.winHeight,
					title : '修改人物信息'
				});
	},
	/**
	 * 删除所选的用户 
	 */
	delUser : function() {
		this.self.prototype.doDelEntity.call(this, {
					url : "../../../../gsuiuser/delete.do"
				});
	},
	/**
	 * 保存用户信息到服务器 
	 */
	doAdd : function() {
		if (this.fp.getForm().isValid()) {
			var formData = this.fp.getForm().getValues();// 表单数据
			this.self.prototype.doAddEntity.call(this, {
						params : formData,
						url : "../../../../gsuiuser/add.do"
					});
		}
	},
	/**
	 *  保存用户信息到服务器
	 */
	doUpdate : function() {
		if (this.fp.getForm().isValid()) {
			var formData = this.fp.getForm().getValues();// 表单数据
			this.self.prototype.doAddEntity.call(this, {
						params : formData,
						url : "../../../../gsuiuser/update.do"
					});
		}
	}
});
