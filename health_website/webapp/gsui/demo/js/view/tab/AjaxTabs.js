/**
 * This example shows how to use a Gsui.ComponentLoader to lazily load raw HTML
 * into an item of a tab panel when a tab is activated.
 */
Gsui.define('Demo.view.tab.AjaxTabs', {
    extend: 'Gsui.tab.Panel',
    requires : 'Demo.view.tab.AjaxTabsController',
    xtype: 'ajax-tabs',
    controller: 'ajax-tabs',

    //<example>
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/tab/AjaxTabsController.js'
    }],
    exampleTitle: 'Ajax Tabs',
    //</example>
    width: 600,
    height: 400,

    defaults: {
        bodyPadding: 10,
        scrollable: true
    },

    listeners: {
        tabchange: 'onTabChange'
    },

    items: [{
        title: 'Normal Tab',
        html: "My content was added during construction."
    }, {
        title: 'Ajax Tab 1',
        loader: {
            url: 'resources/data/tab/ajax1.htm',
            contentType: 'html',
            loadMask: true
        }
    }, {
        title: 'Ajax Tab 2',
        loader: {
            url: 'resources/data/tab/ajax2.htm',
            contentType: 'html',
            loadMask: true
        }
    }]
});