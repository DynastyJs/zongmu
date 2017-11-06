Gsui.define('Demo.view.tab.TabController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.tab-view',

    onTabChange: function(tabs, newTab, oldTab) {
        Gsui.suspendLayouts();
        newTab.setTitle('Active Tab');
        oldTab.setTitle('Inactive Tab');
        Gsui.resumeLayouts(true);
    }
});