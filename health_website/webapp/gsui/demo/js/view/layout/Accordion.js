/**
 * Demonstrates usage of an accordion layout.
 */
Gsui.define('Demo.view.layout.Accordion', {
    extend: 'Gsui.panel.Panel',
    
    requires: [
        'Gsui.layout.container.Accordion',
        'Gsui.grid.*',
        'Demo.model.Company',
        'Demo.data.DataSets'
    ],
    xtype: 'layout-accordion',
    //<example>
    exampleTitle: 'Accordion Layout',
    otherContent: [{
        type: 'Store',
        path: 'js/data/DataSets.js'
    },{
        type: 'Model',
        path: 'js/model/Company.js'
    }],
    themes: {
        classic: {
            colWidth: 75
        },
        
        neptune: {
            colWidth: 90
        }
    },
    //</example>
    layout: 'accordion',
    width: 500,
    height: 400,
    defaults: {
        bodyPadding: 10
    },
    
    initComponent: function() {
        Gsui.apply(this, {
            items: [{
                bodyPadding: 0,
                xtype: 'grid',
                title: 'Array Grid (Click or tap header to collapse)',
                hideCollapseTool: true,
                columnLines: true,
                store: new Gsui.data.Store({
                    model: Demo.model.Company,
                    data: Demo.data.DataSets.company
                }),
                columns: [{
                    text     : 'Company',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'name'
                }, {
                    text     : 'Price',
                    width    : 75,
                    sortable : true,
                    formatter: 'usMoney',
                    dataIndex: 'price'
                }, {
                    text     : 'Change',
                    width    : 75,
                    sortable : true,
                    renderer : this.changeRenderer,
                    dataIndex: 'change'
                }, {
                    text     : '% Change',
                    width    : 90,
                    sortable : true,
                    renderer : this.pctChangeRenderer,
                    dataIndex: 'pctChange'
                }]
            }, {
                title: 'Accordion Item 2',
                html: 'Empty'
            }, {
                title: 'Accordion Item 3',
                html: 'Empty'
            }, {
                title: 'Accordion Item 4',
                html: 'Empty'
            }, {
                title: 'Accordion Item 5',
                html: 'Empty'
            }]
        });
        this.callParent();
    },
    
    changeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },
    
    pctChangeRenderer: function(val){
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }
});
