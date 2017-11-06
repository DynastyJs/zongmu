/**
 * This example demonstrates a chained store, a store that is backed by the data of another
 * store. Sorting and filtering of the stores are independent. Removing a value in the source
 * store removes it from the chained store. Model instances are shared, so editing the data
 * in one store will be reflected in the other.
 */
Gsui.define('Demo.view.binding.ChainedStores', {
    extend: 'Gsui.container.Container',
    xtype: 'binding-chained-stores',
    //<example>
    requires: [
        'Gsui.layout.container.VBox',
        'Gsui.layout.container.HBox',
        'Gsui.grid.Panel',
        'Demo.model.Person',
        'Demo.view.binding.ChainedStoresModel',
        'Demo.view.binding.ChainedStoresController'
    ],
    otherContent: [{
        type: 'ViewModel',
        path: 'js/view/binding/ChainedStoresModel.js'
    }, {
        type: 'ViewController',
        path: 'js/view/binding/ChainedStoresController.js'
    }, {
        type: 'Model',
        path: 'js/model/Person.js'
    }],
    //</example>

    width: 680,
    height: 600,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: 'binding.chainedstores',
    controller: 'binding.chainedstores',

    items: [{
        xtype: 'grid',
        bind: '{everyone}',
        title: 'All People',
        flex: 1,
        columns: [{
            dataIndex: 'firstName',
            text: 'First Name',
            flex: 1,
            field: 'textfield'
        }, {
            dataIndex: 'lastName',
            text: 'Last Name',
            flex: 1,
            field: 'textfield'
        }, {
            dataIndex: 'age',
            text: 'Age',
            width: 120,
            field: 'numberfield',
            align: 'right'
        }, {
            dataIndex: 'favoriteColor',
            text: 'Fav. Color',
            flex: 1,
            renderer: 'renderColor',
            field: 'textfield'
        }, {
            xtype: 'widgetcolumn',
            width: 110,
            widget: {
                xtype: 'button',
                text: 'Remove',
                handler: 'onRemoveClick'
            }
        }],
        plugins: [{
            ptype: 'rowediting',
            listeners: {
                edit: 'onEditComplete'
            }
        }]
    }, {
        xtype: 'grid',
        bind: {
            store: '{adults}',
            title: 'People aged {minimumAge} or over'
        },
        flex: 1,
        reference: 'adultsGrid',
        margin: '10 0 0 0',
        tbar: [{
            xtype: 'slider',
            fieldLabel: 'Minimum Age',
            width: 300,
            bind: '{minimumAge}'
        }],
        columns: [{
            dataIndex: 'firstName',
            text: 'First Name',
            flex: 1
        }, {
            dataIndex: 'lastName',
            text: 'Last Name',
            flex: 1
        }, {
            dataIndex: 'age',
            text: 'Age',
            width: 120,
            align: 'right'
        }, {
            dataIndex: 'favoriteColor',
            text: 'Fav. Color',
            flex: 1,
            renderer: 'renderColor'
        }]
    }]
});