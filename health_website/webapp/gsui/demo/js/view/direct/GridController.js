Gsui.define('Demo.view.direct.GridController', {
    extend: 'Demo.view.direct.DirectVC',
    alias: 'controller.directgrid',
    
    finishInit: function() {
        var store = this.getView().getStore();
        
        store.load();
    },
    
    onTableChange: function(combo, newValue) {
        var store = this.getView().getStore();
        
        store.getProxy().setMetadata({
            table: newValue
        });
        
        store.load();
    }
});
