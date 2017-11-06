/*
 * This example shows generic Gsui.Direct remoting and polling.
 */
Gsui.define('Demo.view.direct.Generic', {
    extend: 'Gsui.panel.Panel',
    xtype: 'direct-generic',
    controller: 'directgeneric',
    
    requires: [
        'Gsui.toolbar.TextItem',
        'Gsui.form.field.Text',
        'Demo.view.direct.GenericController'
    ],
    
    //<example>
    exampleTitle: 'Generic Gsui.Direct remoting and polling',
    exampleDescription: [
        '<p>This example demonstrates generic Gsui.Direct remoting and polling.</p>',
        '<p>To make the multiply request show a failure, enter a non-numeric value',
        ' into the field.</p>'
    ].join(''),
    
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/direct/GenericController.js'
    }, {
        type: 'Base ViewController',
        path: 'js/view/direct/DirectVC.js'
    }, {
        type: 'Server TestAction class',
        path: 'resources/direct/source.php?file=testaction'
    }, {
        type: 'Server API configuration',
        path: 'resources/direct/source.php?file=config'
    }],
    //</example>
    
    title: 'Remote Call Log',
    width: 600,
    height: 300,
    
    scrollable: true,
    bodyPadding: 5,

    tpl: '<p style="margin: 3px 0 0 0">{data}</p>',
    tplWriteMode: 'append',
    
    header: {
        items: [{
            xtype: 'textfield',
            reference: 'fieldInterval',
            hideLabel: true,
            width: 60,
            directAction: 'setInterval',
            emptyText: 's',
            listeners: {
                specialkey: 'onFieldSpecialKey'
            }
        }, {
            xtype: 'button',
            text: 'Set polling interval',
            fieldReference: 'fieldInterval',
            style: {
                'margin-left': '10px'
            },
            listeners: {
                click: 'onButtonClick'
            }
        }]
    },
    
    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        
        items: [{
            xtype: 'textfield',
            reference: 'fieldEcho',
            hideLabel: true,
            width: 300,
            directAction: 'doEcho',
            emptyText: 'Echo input',
            listeners: {
                specialkey: 'onFieldSpecialKey'
            }
        }, {
            xtype: 'button',
            text: 'Echo',
            fieldReference: 'fieldEcho',
            listeners: {
                click: 'onButtonClick'
            }
        }, '-', {
            xtype: 'textfield',
            reference: 'fieldMultiply',
            hideLabel: true,
            width: 90,
            directAction: 'doMultiply',
            emptyText: 'Multiply x 8',
            listeners: {
                specialkey: 'onFieldSpecialKey'
            }
        }, {
            xtype: 'button',
            text: 'Multiply',
            fieldReference: 'fieldMultiply',
            listeners: {
                click: 'onButtonClick'
            }
        }]
    }]
});
