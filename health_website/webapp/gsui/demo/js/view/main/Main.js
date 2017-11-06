Gsui.define('Demo.view.main.Main', {
    extend: 'Gsui.container.Viewport',
    requires:[
        'Gsui.tab.Panel',
        'Gsui.layout.container.Border',
        'Demo.view.main.MainController',
        'Demo.view.main.MainModel',
        'Demo.view.Header','Demo.view.ThemeSwitcher',"Demo.view.CodeContent",
        "Demo.view.CodePreview","Demo.view.ContentPanel",
        "Demo.view.navigation.Tree","Demo.view.thumbnails.Thumbnails",
    ],

    controller: 'main',
    viewModel: 'main',

    layout: 'border',
    stateful: true,
    stateId: 'Demo-viewport',

    items: [{
        region: 'north',
        xtype: 'appHeader'
    }, {
        region: 'center',
        xtype: 'contentPanel',
        reference: 'contentPanel',
        dockedItems: [{
            xtype: 'navigation-breadcrumb',
            reference: 'breadcrumb>'
        }]
    }, {
        xtype: 'codePreview',
        region: 'east',
        id: 'east-region',
        itemId: 'codePreview',
        stateful: true,
        stateId: 'mainnav.east',
        split: true,
        collapsible: true,
       // collapsed: true,
        width: 350,
        minWidth: 100
    }],

    applyState: function(state) {
        this.getController().applyState(state);

    },

    getState: function() {
        return this.getController().getState();
    }
});
