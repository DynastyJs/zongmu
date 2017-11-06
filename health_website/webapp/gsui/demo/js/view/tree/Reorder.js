/**
 * This example shows basic drag and drop node moving in a tree. In this implementation
 * there are no restrictions and anything can be dropped anywhere except appending to nodes
 * marked "leaf" (the files).
 *
 * In order to demonstrate drag and drop insertion points, sorting is not enabled.
 *
 * The data for this tree is asynchronously loaded through a TreeStore and AjaxProxy.
 */
Gsui.define('Demo.view.tree.Reorder', {
    extend: 'Gsui.tree.Panel',

    requires: [
        'Gsui.tree.*',
        'Gsui.data.*'
    ],
    xtype: 'tree-reorder',

    //<example>
    exampleTitle: 'Drag and Drop ordering in a TreePanel',
    //</example>

    height: 400,
    width: 350,
    title: 'Files',
    useArrows: true,

    initComponent: function() {
        Gsui.apply(this, {
            store: new Gsui.data.TreeStore({
                proxy: {
                    type: 'ajax',
                    url: '/tree/get-nodes.php'
                },
                root: {
                    text: 'Gsui',
                    id: 'src',
                    expanded: true
                },
                folderSort: true,
                sorters: [{
                    property: 'text',
                    direction: 'ASC'
                }]
            }),
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                }
            },
            tbar: [{
                text: 'Expand All',
                scope: this,
                handler: this.onExpandAllClick
            }, {
                text: 'Collapse All',
                scope: this,
                handler: this.onCollapseAllClick
            }]
        });
        this.callParent();
    },

    onExpandAllClick: function(){
        var me = this,
            toolbar = me.down('toolbar');

        me.getEl().mask('Expanding tree...');
        toolbar.disable();

        this.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
        });
    },

    onCollapseAllClick: function(){
        var toolbar = this.down('toolbar');

        toolbar.disable();
        this.collapseAll(function() {
            toolbar.enable();
        });
    }
});
