Gsui.define('Demo.store.CountryStates', {
    extend: 'Gsui.data.Store',

    alias: 'store.country-states',

    model: 'Demo.model.State',

    pageSize: 0,

    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/Demo/CountryState'
    }
});
