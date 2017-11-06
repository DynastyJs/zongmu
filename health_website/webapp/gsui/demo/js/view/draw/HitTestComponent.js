Gsui.define('Demo.view.draw.HitTestComponent', {
    extend: 'Gsui.draw.Component',
    xtype: 'hit-test-component',

    // Loading PathUtil is required to be able to hit test
    // and test for path intersections in sprites.
    requires: ['Gsui.draw.PathUtil'],

    listeners: {
        element: 'element',
        scope: 'this',
        mouseDown: 'onMouseEvent',
        mouseMove: 'onMouseEvent'
    },

    onMouseEvent: function (e) {
        var me = this,
            surface = me.getSurface(),
            hitResult = surface.hitTestEvent(e),
            oldSprite = me.oldSprite;

        if (oldSprite) {
            oldSprite.setAttributes({
                strokeStyle: 'black',
                debug: null
            });
        }
        if (hitResult && hitResult.sprite) {
            hitResult.sprite.setAttributes({
                strokeStyle: 'red',
                debug: {
                    xray: true
                }
            });
            me.oldSprite = hitResult.sprite;
        }

        surface.renderFrame();
    }

});