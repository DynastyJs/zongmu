/**
 * This example shows data binding using formulas (calculated properties). This example
 * also demonstrates automatic dependency resolution between formulas that depend on each
 * other's values.
 */
Gsui.define('Demo.view.binding.Formulas', {
    extend: 'Gsui.panel.Panel',
    alias: 'widget.binding-formulas',
    //<example>
    otherContent: [{
        type: 'ViewModel',
        path: 'js/view/binding/FormulasModel.js'
    }],
    //</example>

    title: 'View Model Formulas',

    width: 370,
    bodyPadding: 10,
    
    viewModel: {
        // Formulas are defined by the ViewModel:
        type: 'binding-formulas',
        data: {
            x: 10
        }
    },

    items: [{
        xtype: 'numberfield',
        fieldLabel: 'Number',
        bind: '{x}'
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Calculated',
        bind: '{x} * 2 = {twice} / {x} * 4 = {quad}'
    }]
});
