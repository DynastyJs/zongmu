/**
 * Demonstrates a tab panel with icons in the tab buttons.
 */
Gsui.define('Demo.view.tab.IconTabs', {
    extend: 'Gsui.container.Container',
    xtype: 'icon-tabs',
    controller: 'tab-view',
    width: 400,
    
    //<example>
    requires: [
        'Demo.view.tab.TabController'
    ],
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/tab/TabController.js'
    }],
    exampleTitle: 'Icon Tabs',
    //</example>

    defaults: {
        xtype: 'tabpanel',
        width: 400,
        height: 200,
        defaults: {
            bodyPadding: 10,
            scrollable: true
        }
    },
    
    items: [{
        margin: '0 0 20 0',
        items: [{
            glyph: 72,
            html: Demo.DummyText.longText
        }, {
            glyph: 99,
            html: Demo.DummyText.extraLongText
        }, {
            glyph: 42,
            disabled: true
        }]
    }, {
        plain: true,
        items: [{
            title: 'Active Tab',
            glyph: 72,
            html: Demo.DummyText.longText
        }, {
            title: 'Inactive Tab',
            glyph: 99,
            html: Demo.DummyText.extraLongText
        }, {
            title: 'Disabled Tab',
            glyph: 42,
            disabled: true
        }],
        listeners: {
            tabchange: 'onTabChange'
        }
    }]
});
