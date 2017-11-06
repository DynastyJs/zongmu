/**
 * Demonstrates usage of a center layout.
 */
Gsui.define('Demo.view.layout.Center', {
    extend: 'Gsui.container.Container',
    requires: [
        'Gsui.layout.container.Center'
    ],
    xtype: 'layout-center',
    //<example>
    exampleTitle: 'Center Layout',
    //</example>

    width: 500,
    height: 400,

    layout: 'center',

    items: {
        title: 'Centered Panel: 75% of container width and 95% height',
        border: true,
        layout: 'center',
        scrollable: true,
        width: '75%',
        height: '95%',
        bodyPadding: '20 0',
        items: [
            {
                title: 'Inner Centered Panel',
                html: 'Fixed 300px wide and full height. The container panel will also autoscroll if narrower than 300px.',
                width: 300,
                height: '100%',
                frame: true,
                bodyPadding: '10 20'
            }
        ]
    }

});