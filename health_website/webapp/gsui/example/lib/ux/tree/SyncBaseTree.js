/**
 * @class  Gsui.ux.tree.SyncBaseTree
 * 同步树,适合小数据的场景，支持本地查询,过滤与三态勾选
 */
Gsui.define('Gsui.ux.tree.SyncBaseTree', {
	extend : 'Gsui.ux.tree.BaseTree',
	xtype : 'sync-base-tree',

	/**
	 * 否显示查询工具栏
	 */
	displaySearch : true,
	
	initComponent : function() {
		var me = this;
		if (this.displaySearch) {
			var arrTbar = [];
			arrTbar.push({
						labelWidth : 50,
						xtype : 'triggerfield',
						fieldLabel : '搜索',
						triggerCls : 'x-form-clear-trigger',
						onTriggerClick : function() {
							this.reset();
						},
						listeners : {
							change : me.onSearchChange
						}
					});
			arrTbar.push({
						xtype : 'displayfield',
						itemId : 'matches',
						fieldLabel : '匹配数',
						labelWidth : 50
					});
		}
		Gsui.apply(me, {
					tbar : arrTbar
				});
		me.on('checkchange', me.onCheckChange);
		me.on('afterlayout', me.onAfterLayout);
		me.callParent();
	},

	onCheckChange : function(node, checked, eOpts) {
		this.setChildChecked(node, checked);
		this.setParentChecked(node, checked);
	},
	getCheckbox : function(node) {
		var tree = node.getOwnerTree();
		var view = tree.getView();
		var nodeElement = view.getNode(node);
		var td = nodeElement.firstChild.firstChild;
		var checkbox = nodeElement.getElementsByTagName('input')[0];
		return checkbox;
	},
	setNode : function(node, value) {
		var checkbox = this.getCheckbox(node);
		// 半选中状态
		if (node.isHalfSelected != null) {
			if (value == true) {
				checkbox.className = checkbox.className.replace('Diy-mask', '')
						+ ' Diy-mask';
			}
			// 取消半选中
			else {
				checkbox.className = checkbox.className.replace('Diy-mask', '');
			}
		}
	},
	setChildChecked : function(node, checked) {
		var me = this;
		node.isHalfSelected = false;
		node.eachChild(function(child) { // 循环下一级的所有子节点
					if (null != child.get('checked')) // 这里这么写是因为后台有些节点的checked没赋值，其在web上不显示复选框，这里就过滤掉对它们
					{
						child.set('checked', checked); // 选中
						me.setChildChecked(child, checked); // 递归选中子节点
					}
				});
	},
	setParentChecked : function(node, checked) {
		var me = this;
		var parent = node.parentNode; // 获取父节点
		var flag = false;
		var hasUnCheckedChild = false;
		var isHalfSelected = false;
		if (null != parent) { // 是否有父节点
			parent.eachChild(function(child) { // 循环下一级的所有子节点
						if (child.get('checked') == true) {
							flag = true;
							if (child.isHalfSelected) {
								isHalfSelected = true;
							}
						} else if (child.get('checked') == false) {
							hasUnCheckedChild = true;
						}
					});

			parent.set('checked', flag);
			if ((flag && hasUnCheckedChild) || isHalfSelected) {
				parent.isHalfSelected = true;
				me.setNode(parent, true);
			} else {
				parent.isHalfSelected = false;
				me.setNode(parent, false);
			}
			me.setParentChecked(parent, flag);

		}
	},

	/**
	 * 获取所有被选的节点ID
	 */
	getChickedNode : function() {
		var records = this.getView().getChecked(), ids = [];

		Gsui.Array.each(records, function(rec) {
					ids.push(rec.get('id'));
				});
		Gsui.MessageBox.show({
					title : '已选节点',
					msg : ids.join('<br />'),
					icon : Gsui.MessageBox.INFO
				});
		return ids;
	},
	/**
	 * 获取半选的节点
	 * @return {Array}
	 */
	getHalfSelectedNode : function() {
		var records = this.getView().getChecked(), ids = [];

		Gsui.Array.each(records, function(rec) {
					if (record.isHalfSelected)
						ids.push(rec.get('id'));
				});
		Gsui.MessageBox.show({
					title : '半选节点',
					msg : ids.join('<br />'),
					icon : Gsui.MessageBox.INFO
				});
		return ids;
	},
	onAfterLayout : function(tree, layout, eOpts) {
		var me = this;
		var node = tree.getRootNode();
		me.setNode(node, node.isHalfSelected);
		node.eachChild(function(child) { // 循环下一级的所有子节点
					me.setNode(child, child.isHalfSelected);
				});
	},
	/*
	 * 本地查询
	 */
	onSearchChange : function() {
		var tree = this.up('treepanel'), v, matches = 0;
		try {
			v = new RegExp(this.getValue(), 'i');
			Gsui.suspendLayouts();
			tree.store.filter({
						filterFn : function(node) {
							var children = node.childNodes, len = children
									&& children.length, visible = node.isLeaf()
									? v.test(node.get('text'))
									: false, i;
							for (i = 0; i < len
									&& !(visible = children[i].get('visible')); i++);

							if (visible && node.isLeaf()) {
								matches++;
							}
							return visible;
						},
						id : 'titleFilter'
					});
			tree.down('#matches').setValue(matches);
			Gsui.resumeLayouts(true);
		} catch (e) {
			this.markInvalid('Invalid regular expression');
		}
	}

});