/**
 * This example shows how to create a tab panel with reorderable tabs.
 * Simply drag any tab to change the order.
 */
Gsui.define('Demo.view.tab.ReorderableTabs', {
    extend: 'Gsui.tab.Panel',
    requires: [
        'Gsui.ux.tab.TabReorderer','Demo.view.tab.ReorderableTabsController'
    ],
    xtype: 'reorderable-tabs',
    controller: 'reorderable-tabs',

    //<example>
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/tab/ReorderableTabsController.js'
    }],
    exampleTitle: 'Reorderable Tabs',
    //</example>
    width: 600,
    height: 400,

    plugins: 'tabreorderer',

    defaults: {
        bodyPadding: 10,
        scrollable: true,
        closable: true
    },

    items: [{
        title: 'Tab 1',
        html: 'The tabs in this example are reorderable. Drag any tab to change the order.'
    }, {
        title: 'Tab 2',
        html: Demo.DummyText.extraLongText
    }, {
        title: 'Tab 3',
        html: Demo.DummyText.longText
    }, {
        title: 'Non Reorderable',
        html: "I can't be moved",
        reorderable: false

    },{
        title: 'Tab 4',
        html: Demo.DummyText.extraLongText
    }],

    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        items: [{
            text: 'Add a Tab',
            glyph: 43,
            listeners: {
                click: 'onAddTabClick'
            }
        }]
    }
});