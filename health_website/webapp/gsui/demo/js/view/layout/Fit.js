/**
 * Demonstrates usage of a fit layout.
 */
Gsui.define('Demo.view.layout.Fit', {
    extend: 'Gsui.panel.Panel',
    requires: [
        'Gsui.layout.container.Fit'
    ],
    //<example>
    exampleTitle: 'Fit Layout',
    //</example>

    xtype: 'layout-fit',
    
    layout: 'fit',
    width: 500,
    height: 400,
    
    bodyPadding: 25,
    
    items: {
        title: 'Inner Panel',
        html: '<p>This panel is fit within its container.</p>',
        bodyPadding: 15,
        ui: Gsui.themeName == 'neptune' ? 'light' : 'default',
        border: true
    }

});