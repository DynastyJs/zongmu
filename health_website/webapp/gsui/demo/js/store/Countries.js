Gsui.define('Demo.store.Countries', {
    extend: 'Gsui.data.Store',

    alias: 'store.countries',

    model: 'Demo.model.tree.Country',

    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/Demo/Country'
    }
});
