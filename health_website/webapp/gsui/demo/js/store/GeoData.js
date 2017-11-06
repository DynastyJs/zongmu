Gsui.define('Demo.store.GeoData', {
    extend: 'Gsui.data.TreeStore',

    requires: [
        'Demo.model.tree.Country',
        'Demo.model.tree.City',
        'Demo.data.GeoData'
    ],

    model: 'Demo.model.tree.Territory',

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            typeProperty: 'mtype'
        },
        url: '/Demo/GeoData'
    },

    lazyFill: false
});
