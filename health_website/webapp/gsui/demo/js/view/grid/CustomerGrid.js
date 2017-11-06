/**
 * This example uses the `Gsui.grid.plugin.SubTable` plugin to display associated records
 * in tabular form below grid rows. The plugin is configured with an `association` property
 * which specifies which associated record collection to display and a `columns` property
 * specifying which fields from the associated records should be displayed.
 */
Gsui.define('Demo.view.grid.CustomerGrid', {
    extend: 'Gsui.grid.Panel',
    alias: 'widget.customer-grid',

    requires: [
        'Gsui.ux.grid.SubTable',
        'Demo.model.Order',
        'Demo.model.Customer'
    ],

    title: 'Customers',
    width: 700,
    height: 400,

    //<example>
    otherContent: [{
        type: 'Model',
        path: 'js/model/Order.js'
    },{
        type: 'Model',
        path: 'js/model/Customer.js'
    }],
    themes: {
        classic: {
            headerWidth: 24
        },
        neptune: {
            headerWidth: 24
        },
        "neptune-touch": {
            headerWidth: 30
        }
    },
    //</example>

    constructor: function(config) {
        config = Gsui.apply({
            plugins: {
                ptype: "subtable",
                association: 'orders',
                headerWidth: this.themeInfo.headerWidth,
                columns: [{
                    text: 'Order Id',
                    dataIndex: 'id',
                    width: 100
                },{
                    xtype: 'datecolumn',
                    format: 'Y-m-d',
                    width: 120,
                    text: 'Date',
                    dataIndex: 'date'
                }]
            }
        }, config);
        this.callParent([config]);
    },

    initComponent: function() {
        Gsui.apply(this, {
            store: {
                autoLoad: true,
                proxy: {
                    type: 'memory',
                    data: [{
                        "id": 1,
                        "name": "Bread Barn",
                        "phone": "8436-365-256",
                        "orders": [{
                            "id": 1,
                            "date": "2010-08-13",
                            "customerId": 1
                        }, {
                            "id": 2,
                            "date": "2010-07-14",
                            "customerId": 1
                        }]
                    }, {
                        "id": 2,
                        "name": "Icecream Island",
                        "phone": "8452-389-719",
                        "orders": [{
                            "id": 3,
                            "date": "2010-01-22",
                            "customerId": 2
                        }, {
                            "id": 4,
                            "date": "2010-11-06",
                            "customerId": 2
                        }]
                    }, {
                        "id": 3,
                        "name": "Pizza Palace",
                        "phone": "9378-255-743",
                        "orders": [{
                            "id": 5,
                            "date": "2010-12-29",
                            "customerId": 3
                        }, {
                            "id": 6,
                            "date": "2010-03-03",
                            "customerId": 3
                        }]
                    }]
                },
                model: 'Demo.model.Customer'
            },
            columns: [{
                text: 'Id',
                dataIndex: 'id'
            },{
                text: 'Name',
                dataIndex: 'name',
                flex: 1,
                hideable: false
            }, {
                width: 140,
                text: 'Phone',
                dataIndex: 'phone'
            }]
        });
        this.callParent();
    }
});
