/**
 * This example shows how to draw doodles of different sizes and colors.
 */
Gsui.define('Demo.view.draw.FreeDraw', {
    extend: 'Gsui.panel.Panel',
    xtype: 'free-paint',

    requires: [
        'Gsui.draw.Component',
        'Demo.view.draw.FreeDrawComponent'
    ],

    layout: 'fit',
    width: 650,

    lastEvent: 0,

    tbar: ['->', {
        text: 'Clear',
        handler: function(event, toolEl, panelHeader) {
            // Remove all the sprites and redraw
            var draw = Gsui.getCmp('free-paint');
            draw.getSurface().removeAll(true);
            draw.renderFrame();
        }
    }],

    items: [
        {
            xtype: 'free-paint-component',
            id: 'free-paint',
            width: '100%',
            height: 500
        }
    ],

    constructor: function(config) {
        var contentPanel = Gsui.getCmp('content-panel');
        this.callParent(arguments);
        contentPanel.setScrollable(false);
    },

    destroy: function() {
        var contentPanel = Gsui.getCmp('content-panel');
        contentPanel.setScrollable(true);
        this.callParent(arguments);
    }

});
