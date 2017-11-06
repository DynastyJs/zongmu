/**
 * Demonstrates a tab panel with no background on the tab strip.
 */
Gsui.define('Demo.view.tab.PlainTabs', {
    extend: 'Gsui.tab.Panel',
    xtype: 'plain-tabs',
    controller: 'tab-view',
    
    //<example>
    requires: [
        'Demo.view.tab.TabController'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/tab/TabController.js'
    }],
    exampleTitle: 'Plain Tabs',
    //</example>
    
    width: 400,
    height: 300,
    plain: true,
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