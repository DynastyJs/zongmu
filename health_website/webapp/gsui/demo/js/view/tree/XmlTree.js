/**
 * This example is the same as the basic tree sample, however it loads from an XML data
 * source.
 */
Gsui.define('Demo.view.tree.XmlTree', {
    extend: 'Gsui.tree.Panel',
    
    requires: [
        'Gsui.tree.*',
        'Gsui.data.*'
    ],
    xtype: 'tree-xml',
    
    //<example>
    exampleTitle: 'XML tree',
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
                    url: '/xml-tree/get-nodes.php',
                    reader: {
                        type: 'xml',
                        rootProperty: 'nodes',
                        record: 'node'
                    }
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
            }
        });
        this.callParent();
    }
});
