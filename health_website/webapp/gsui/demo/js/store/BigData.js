Gsui.define('Demo.store.BigData', {
    extend: 'Gsui.data.Store',
    alias: 'store.big-data',
	requires : 'Demo.data.BigData',
    model: 'Demo.model.grid.Employee',

    groupField: 'department',

    proxy: {
        type: 'ajax',
        limitParam: null,
        url: '/Demo/BigData',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
