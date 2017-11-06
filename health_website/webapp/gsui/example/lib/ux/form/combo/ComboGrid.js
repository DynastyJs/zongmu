/**
 * @class Gsui.ux.form.combo.ComboGrid
 * 扩展combo使下拉时出现gridpanel
 */
Gsui.define('Gsui.ux.form.combo.ComboGrid', {
	extend : 'Gsui.form.field.ComboBox',
	requires : ['Gsui.grid.Panel'],
	alias : ['widget.Gsui.ux.form.combo.ComboGrid'],
	xtype : 'combogrid',
	
	/**
	 * 重写createPicker方法
	 * @returns {___picker0}
	 */
	createPicker : function() {
		var me = this, picker, menuCls = Gsui.baseCSSPrefix + 'menu', opts = Gsui.apply({
							selModel : {
								mode : me.multiSelect ? 'SIMPLE' : 'SINGLE'
							},
							floating : true,
							hidden : true,
							ownerCt : me.ownerCt,
							cls : me.el.up('.' + menuCls) ? menuCls : '',
							store : me.store,
							displayField : me.displayField,
							focusOnToFront : false,
							bbar : {
								xtype : 'pagingtoolbar',
								store : me.store
							}
						}, me.listConfig, me.defaultListConfig);

		/*Gsui.apply(opts.store, {
					pageSize : me.pageSize
				});*/

		// NOTE: we simply use a grid panel
		// picker = me.picker = Gsui.create('Gsui.view.BoundList', opts);

		picker = me.picker = Gsui.create('Gsui.grid.Panel', opts);

		// hack: pass getNode() to the view
		picker.getNode = function() {
			picker.getView().getNode(arguments);
		};
		me.mon(picker, {
					itemclick : function(m, record, item, index, e, eOpts) {
						me.fireEvent('select', record);
					},
					// refresh : me.onListRefresh,
					scope : me
				});
		/*
		 * me.mon(picker.getSelectionModel(), { selectionChange :
		 * me.onListSelectionChange, scope : me });
		 */
		return picker;
	}
});