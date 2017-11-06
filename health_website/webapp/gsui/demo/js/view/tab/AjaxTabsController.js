Gsui.define('Demo.view.tab.AjaxTabsController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.ajax-tabs',

    onTabChange: function(tabPanel, newItem, oldItem) {
        if (!newItem.html && newItem.loader) {
            newItem.loader.load();
        }
    }
});
