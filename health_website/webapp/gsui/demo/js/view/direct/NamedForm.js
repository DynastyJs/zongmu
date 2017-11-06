/**
 * This example shows how to submit form values via Gsui.Direct method
 * that accepts named arguments.
 */
Gsui.define('Demo.view.direct.NamedForm', {
    extend: 'Gsui.form.Panel',
    xtype: 'direct-named',
    controller: 'directnamed',
    
    requires: [
        'Gsui.form.field.Text'
    ],
    
    //<example>
    exampleTitle: 'Form submission via Gsui.Direct method',
    exampleDescription: [
        '<p>This example demonstrates how to use a generic Gsui.Direct method ',
        'that accepts named arguments to submit form values to the server side.</p>'
    ].join(''),
    
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/direct/NamedFormController.js'
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
    
    title: 'Personal information',
    width: 360,
    bodyPadding: 5,
    
    items: [{
        xtype: 'textfield',
        fieldLabel: 'First Name',
        name: 'firstName',
        value: 'Evan',
        allowBlank: false,
        maxLength: 30,
        enforceMaxLength: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Last Name',
        name: 'lastName',
        value: 'Trimboli',
        allowBlank: false,
        maxLength: 30,
        enforceMaxLength: true
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Age',
        name: 'age',
        value: 25,
        allowBlank: false
    }],
    
    buttons: [{
        text: 'Send',
        formBind: true,
        listeners: {
            click: 'onFormSubmit'
        }
    }]
});
