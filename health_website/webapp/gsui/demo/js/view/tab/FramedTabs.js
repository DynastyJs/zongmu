/**
 * Demonstrates a tab panel with framing.
 */
Gsui.define('Demo.view.tab.FramedTabs', {
    extend: 'Gsui.tab.Panel',
    xtype: 'framed-tabs',
    controller: 'tab-view',
    
    //<example>
    requires: [
        'Demo.view.tab.TabController'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/tab/TabController.js'
    }],
    exampleTitle: 'Framed Tabs',
    //</example>
    
    frame: true,
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
    }],

    listeners: {
        tabchange: 'onTabChange'
    }
});