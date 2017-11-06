/**
 * This example shows navigation tabs docked to the side.
 */
Gsui.define('Demo.view.tab.SideNavigationTabs', {
    extend: 'Gsui.tab.Panel',
    xtype: 'side-navigation-tabs',

    //<example>
    exampleTitle: 'Side Navigation Tabs',
    otherContent: [{
        type: 'Styles',
        path: 'sass/src/view/tab/NavigationTabs.scss'
    }],
    //</example>

    height: 400,
    width: 600,

    ui: 'navigation',
    tabPosition: 'left',
    tabRotation: 0,
    tabBar: {
        // turn off borders for classic theme.  neptune and crisp don't need this
        // because they are borderless by default
        border: false
    },

    defaults: {
        textAlign: 'left',
        bodyPadding: 15
    },

    items: [{
        title: 'Home',
        glyph: 72,
        html: Demo.DummyText.longText
    }, {
        title: 'Users',
        glyph: 117,
        html: Demo.DummyText.extraLongText
    }, {
        title: 'Groups',
        glyph: 85,
        html: Demo.DummyText.longText
    }, {
        title: 'Settings',
        glyph: 42,
        html: Demo.DummyText.extraLongText
    }]
});