Gsui.define('Demo.view.ContentPanel', {
	requires : ['Demo.view.navigation.Breadcrumb'],
    extend: 'Gsui.panel.Panel',
    xtype: 'contentPanel',
    id: 'content-panel',
    scrollable: true,

    header: {
        hidden: true
    }
});
