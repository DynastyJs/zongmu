/**
 * This example shows how to chain two combo boxes together.
 */
Gsui.define('Demo.view.binding.ComboChaining', {
    extend: 'Gsui.panel.Panel',
    xtype: 'binding-combo-chaining',
    //<example>
    otherContent: [{
        type: 'Store',
        path: 'js/store/Countries.js'
    },{
        type: 'Store',
        path: 'js/store/CountryStates.js'
    },{
        type: 'Model',
        path: 'js/model/tree/Country.js'
    },{
        type: 'Model',
        path: 'js/model/State.js'
    }],
    bodyPadding: 10,
    //</example>

    width: 350,
    layout: 'anchor',
    defaults: { anchor: '-30' },

    referenceHolder: true,
    viewModel: true,

    title: 'Location',

    items: [{
        xtype: 'combo',
        fieldLabel: 'Country',
        reference: 'country',
        displayField: 'name',
        valueField: 'name',
        publishes: 'value',
        store: {
            type: 'countries'
        }
    },{
        xtype: 'combo',
        fieldLabel: 'State',
        displayField: 'state',
        valueField: 'abbrev',
        queryMode: 'remote',
        bind: {
            visible: '{country.value}',
            filters: {
                property: 'country',
                value: '{country.value}'
            }
        },
        store: {
            type: 'country-states'
        }
    }]
});
