/**
 * This example shows how to use basic data binding to bind the state of one component to
 * the state of another.
 */
Gsui.define('Demo.view.binding.ComponentState', {
    extend: 'Gsui.panel.Panel',
    xtype: 'binding-component-state',
    width: 350,
    layout: 'anchor',
    viewModel: true,
    title: 'Sign Up Form',
    bodyPadding: 10,

    items: [{
        xtype: 'checkbox',
        boxLabel: 'Is Admin',
        reference: 'isAdmin'
    },{
        xtype: 'textfield',
        fieldLabel: 'Admin Key',
        anchor: '0',
        bind: {
            disabled: '{!isAdmin.checked}'
        }
    }]
});
