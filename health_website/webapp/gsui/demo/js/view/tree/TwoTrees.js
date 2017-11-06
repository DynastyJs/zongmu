/**
 * The TreePanels have a TreeSorter applied in "folderSort" mode. Both TreePanels are in
 * "appendOnly" drop mode since they are sorted.
 *
 * Target node is sorted upon drop to maintain initially configured sort order.
 *
 * Hover at top or bottom edge of the tree to trigger auto scrolling while performing a
 * drag and drop.
 *
 * The data for this tree is asynchronously loaded with a TreeStore and AjaxProxy.
 */
Gsui.define('Demo.view.tree.TwoTrees', {
    extend: 'Gsui.container.Container',
    
    requires: [
        'Gsui.tree.*',
        'Gsui.data.*',
        'Gsui.layout.container.HBox'
    ],
    xtype: 'tree-two',
    
    //<example>
    exampleTitle: 'Drag and Drop between 2 TreePanels',
    //</example>
    
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    height: 300,
    width: 550,
    
    initComponent: function(){
        var group = this.id + '-ddgroup';
        
        Gsui.apply(this, {
            items: [{
                title: 'Source',
                xtype: 'treepanel',
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
                margin: '0 15 0 0',
                flex: 1,
                viewConfig: {
                    plugins: {
                        ptype: 'treeviewdragdrop',
                        ddGroup: group,
                        appendOnly: true,
                        sortOnDrop: true,
                        containerScroll: true
                    }
                }
            }, {
                title: 'Custom Build',
                xtype: 'treepanel',
                store: new Gsui.data.TreeStore({
                    proxy: {
                        type: 'ajax',
                        url: '/tree/get-nodes.php'
                    },
                    root: {
                        text: 'Custom Gsui',
                        id: 'src',
                        expanded: true,
                        children: []
                    },
                    folderSort: true,
                    sorters: [{
                        property: 'text',
                        direction: 'ASC'
                    }]
                }),
                flex: 1,
                viewConfig: {
                    plugins: {
                        ptype: 'treeviewdragdrop',
                        ddGroup: group,
                        appendOnly: true,
                        sortOnDrop: true,
                        containerScroll: true,
                        allowContainerDrops: true
                    }
                }
            }]
        });
        this.callParent();
    }
});
