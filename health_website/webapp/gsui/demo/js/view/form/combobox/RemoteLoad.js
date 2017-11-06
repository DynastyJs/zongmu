/**
 * This example illustrates a combo box which loads the data source from a server
 * but queries the local result set. It uses a custom item template for the dropdown list.
 */
Gsui.define('Demo.view.form.combobox.RemoteLoad', {
    extend: 'Gsui.form.Panel',
    xtype: 'remote-loaded-combo',

    //<example>
    requires: [
        'Demo.model.State',
        'Demo.store.RemoteStates'
    ],
    
    exampleTitle: 'Remote loaded ComboBox',
    otherContent: [{
        type: 'Model',
        path: 'js/model/State.js'
    }, {
        type: 'Store',
        path: 'js/store/RemoteStates.js'
    }],
    //</example>
    
    title: 'Remote loaded ComboBox',
    width: 500,
    layout: 'form',
    viewModel: {},
    
    items: [{
        xtype: 'fieldset',
        layout: 'anchor',
        items: [{
            xtype: 'component',
            anchor: '100%',
            html: [
                '<h3>Remote loaded, local query mode</h3>',
                '<p>This ComboBox uses remotely loaded data, to perform querying ',
                'client side.</p>',
                '<p>This is suitable when the dataset is not too big or dynamic ',
                'to be manipulated locally.</p>',
                '<p>This example uses a custom template for the dropdown list ',
                'to illustrate grouping.</p>'
            ]
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Selected State',
            bind: '{states.value}'
        }, {
            xtype: 'combobox',
            reference: 'states',
            publishes: 'value',
            fieldLabel: 'Select State',
            displayField: 'state',
            anchor: '-15',
            store: {
                type: 'remote-states',
                autoLoad: true
            },
            minChars: 0,
            queryMode: 'local',
            tpl: [
                '<ul class="x-list-plain">',
                    '<tpl for=".">',
                        '<li class="',
                            Gsui.baseCSSPrefix, 'grid-group-hd ',
                            Gsui.baseCSSPrefix, 'grid-group-title">{abbr}</li>',
                        '<li class="x-boundlist-item">',
                            '{state}, {description}',
                        '</li>',
                    '</tpl>',
                '</ul>'
            ]
        }]
    }]
});
