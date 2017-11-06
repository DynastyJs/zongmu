/**
 * This is an example of using the grid with a RowExpander plugin that adds the ability
 * to have a column in a grid which enables a second row body which expands/contracts.
 *
 * The expand/contract behavior is configurable to react on clicking of the column, double
 * click of the row, and/or hitting enter while a row is selected.
 */
Gsui.define('Demo.view.grid.RowExpander', {
    extend: 'Gsui.grid.Panel',

    xtype: 'row-expander-grid',
    store: 'Companies',

    columns: [
        { text: "Company", flex: 1, dataIndex: 'name'},
        { text: "Price", formatter: 'usMoney', dataIndex: 'price'},
        { text: "Change", dataIndex: 'change'},
        { text: "% Change", dataIndex: 'pctChange'},
        { text: "Last Updated", formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
    ],
    width: 600,
    height: 300,

    //<example>
    otherContent: [{
        type: 'Store',
        path: 'js/store/Companies.js'
    },{
        type: 'Model',
        path: 'js/model/Company.js'
    }],
    //</example>

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Gsui.XTemplate(
            '<p><b>Company:</b> {name}</p>',
            '<p><b>Change:</b> {change:this.formatChange}</p>',
        {
            formatChange: function(v){
                var color = v >= 0 ? 'green' : 'red';
                return '<span style="color: ' + color + ';">' + Gsui.util.Format.usMoney(v) + '</span>';
            }
        })
    }],
    title: 'Expander Rows to show extra data',
    iconCls: 'icon-grid'
});
