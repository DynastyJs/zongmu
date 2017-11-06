/**
 * This example demonstrates using a custom paging display.
 */
Gsui.define('Demo.view.grid.ProgressBarPager', {
    extend: 'Gsui.grid.Panel',
    
    requires: [
        'Gsui.data.*',
        'Gsui.grid.*',
        'Gsui.util.*',
        'Gsui.toolbar.Paging',
        'Gsui.ux.ProgressBarPager',
        'Demo.model.Company'
    ],
    xtype: 'progress-bar-pager',
    //<example>
    exampleTitle: 'Progress Bar Pager Extension',
    otherContent: [{
        type: 'Model',
        path: 'js/model/Company.js'
    }],
    themes: {
        classic: {
            width: 600,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85
        },
        neptune: {
            width: 650,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115
        }
    },
    //</example>
    height: 320,
    frame: true,
    title: 'Progress Bar Pager',
    
    initComponent: function() {
        this.width = this.themeInfo.width;
        
        var store = new Gsui.data.Store({
            model: Demo.model.Company,
            remoteSort: true,
            pageSize: 10,
            proxy: {
                type: 'memory',
                enablePaging: true,
                data: Demo.data.DataSets.company,
                reader: {
                    type: 'array'
                }
            }
        });
        
        Gsui.apply(this, {
            store: store,
            columns: [{ 
                text: 'Company',
                sortable: true,
                dataIndex: 'name',
                flex: 1
            },{
                text: 'Price',
                sortable: true,
                formatter: 'usMoney',
                dataIndex: 'price',
                width: 75
            },{
                text: 'Change',
                sortable: true,
                renderer: this.changeRenderer,
                dataIndex: 'change',
                width: 80
            },{
                text: '% Change',
                sortable: true,
                renderer: this.pctChangeRenderer,
                dataIndex: 'pctChange',
                width: this.themeInfo.percentChangeColumnWidth
            },{
                text: 'Last Updated',
                sortable: true,
                dataIndex: 'lastChange',
                width: this.themeInfo.lastUpdatedColumnWidth,
                formatter: 'date("m/d/Y")'
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: store,
                displayInfo: true,
                plugins: new Gsui.ux.ProgressBarPager()
            }
        });
        this.callParent();
    },
    
    afterRender: function(){
        this.callParent(arguments);
        this.getStore().load();
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
