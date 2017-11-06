Gsui.define('Demo.store.RemoteStates', {
    extend: 'Gsui.data.Store',

    alias: 'store.remote-states',

    model: 'Demo.model.State',
    
    storeId: 'remote-states',

    proxy: {
        type: 'ajax',
        url: 'resources/data/form/states_remote.php',
        reader: {
            type: 'array',
            rootProperty: 'data'
        }
    }
});