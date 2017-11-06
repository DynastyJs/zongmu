/**
 * @class  Demo.view.grid.CrudGridPanel
 * 对用户实体的增删改查组件
 */
Gsui.define('Demo.view.grid.CrudGridPanel', {
	extend : 'Gsui.ux.grid.CrudBasicGridPanel',//继承CrudBasicGridPanel组件
	xtype : 'crud-grid',
	title : '人物信息',
	frame : true,
	winWidth : 300,
	winHeight : 400,
	width:750,
	height:400,
	displayToolbar : true,//是否显示工具栏
	primaryKey : 'id',// 主键属性
	
	totalProperty : 'totalElements',//返回数据总条数的属性
	rootProperty : 'content',//返回数据属性
	baseUrl : '../../gsuiuser/getAll.do',//查询数据url
	fields : ['id', 'name', 'age', 'memo'],// 给store配置fields,
	
	queryConfig:{//设置查询工具栏
		url : '../../gsuiuser/getPageList.do',
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
	 * 添加用户 
	 */
	addUser : function() {
		Demo.view.grid.CrudGridPanel.superclass.addEntity.call(this, {
					width : this.winWidth,
					height : this.winHeight,
					title : '添加人物信息'
				});
	},
	/**
	 * 修改用户 
	 */
	updateUser : function() {
		Demo.view.grid.CrudGridPanel.superclass.updateEntity.call(this, {
					width : this.winWidth,
					height : this.winHeight,
					title : '修改人物信息'
				});
	},
	/**
	 * 删除用户 
	 */
	delUser : function() {
		Demo.view.grid.CrudGridPanel.superclass.doDelEntity.call(this, {
					url : "../../gsuiuser/delete.do"
				});
	},
	/**
	 * 保存用户信息到后台 
	 */
	doAdd : function() {
		if (this.fp.getForm().isValid()) {
			var formData = this.fp.getForm().getValues();// 表单数据
			Demo.view.grid.CrudGridPanel.superclass.doAddEntity.call(this, {
						params : formData,
						url : "../../gsuiuser/add.do"
					});
		}
	},
	/**
	 * 保存用户信息到后台 
	 */
	doUpdate : function() {
		if (this.fp.getForm().isValid()) {
			var formData = this.fp.getForm().getValues();// 表单数据
			Demo.view.grid.CrudGridPanel.superclass.doAddEntity.call(this, {
						params : formData,
						url : "../../gsuiuser/update.do"
					});
		}
	}
});
