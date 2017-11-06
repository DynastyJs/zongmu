Gsui.define('Demo.view.direct.TreeController', {
    extend: 'Demo.view.direct.DirectVC',
    alias: 'controller.directtree',
    
    finishInit: function() {
        var store = this.getView().getStore();
        
        store.getRoot().expand();
    }
});
