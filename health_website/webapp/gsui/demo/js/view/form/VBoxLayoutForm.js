/**
 * This example shows how to use vbox layout with Gsui Forms.
 */
Gsui.define('Demo.view.form.VBoxLayoutForm', {
    extend: 'Gsui.window.Window',
    xtype: 'form-vboxlayout',
    
    //<example>
    requires: [
        'Gsui.form.field.Text',
        'Gsui.form.field.TextArea',
        'Gsui.layout.container.VBox'
    ],
    
    exampleTitle: 'VBox Layout Form',
    //</example>
    
    title: 'Resize Me',
    width: 500,
    height: 300,
    minWidth: 300,
    minHeight: 220,
    layout: 'fit',
    plain: true,
    
    items: [{
        xtype: 'form',

        defaultType: 'textfield',
        fieldDefaults: {
            labelWidth: 60
        },
        
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        
        bodyPadding: 5,
        border: false,

        items: [{
            fieldLabel: 'Send To',
            name: 'to'
        }, {
            fieldLabel: 'Subject',
            name: 'subject'
        }, {
            xtype: 'textarea',
            hideLabel: true,
            name: 'msg',
            
            // Setting flex to 1 for textarea when no other component has flex
            // is effectively tells the layout to strech the textarea vertically,
            // taking all the space left after the fields above have been laid out.
            flex: 1
        }]
    }],

    buttons: [{
        text: 'Send'
    },{
        text: 'Cancel'
    }]
});
