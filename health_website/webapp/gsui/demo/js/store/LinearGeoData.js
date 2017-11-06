Gsui.define('Demo.store.LinearGeoData', {
    extend: 'Gsui.data.TreeStore',

    requires: [
        'Demo.model.tree.Country',
        'Demo.model.tree.City'
    ],

    model: 'Demo.model.tree.Territory',

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            typeProperty: 'mtype'
        },
        url: '/Demo/LinearGeoData'
    },

    parentIdProperty: 'parentId'
});
