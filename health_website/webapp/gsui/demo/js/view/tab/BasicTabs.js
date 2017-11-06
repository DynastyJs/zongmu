/**
 * Demonstrates a default configuration of a tab panel.
 */
Gsui.define('Demo.view.tab.BasicTabs', {
    extend: 'Gsui.tab.Panel',
    xtype: 'basic-tabs',
    controller: 'tab-view',
    
    //<example>
    requires: [
        'Demo.view.tab.TabController'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/tab/TabController.js'
    }],
    exampleTitle: 'Basic Tabs',
    //</example>
    width: 400,
    height: 300,
    defaults: {
        bodyPadding: 10,
        scrollable: true
    },
    items: [{
        title: 'Active Tab',
        html: Demo.DummyText.longText
    }, {
        title: 'Inactive Tab',
        html: Demo.DummyText.extraLongText
    }, {
        title: 'Disabled Tab',
        disabled: true
    }, {
        title: 'Closable Tab',
        closable: true,
        html: Demo.DummyText.longText
    }, {
        title: 'Another inactive Tab',
        html: Demo.DummyText.extraLongText
    }]
});
