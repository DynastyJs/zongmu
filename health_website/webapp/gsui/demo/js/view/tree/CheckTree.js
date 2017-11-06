/**
 * This example shows simple checkbox selection in a tree. It is enabled on leaf nodes by
 * simply setting `checked: true/false` at the node level.
 *
 * This example also shows loading an entire tree structure statically in one load call,
 * rather than loading each node asynchronously.
 */
Gsui.define('Demo.view.tree.CheckTree', {
    extend: 'Gsui.tree.Panel',
    
    requires: [
        'Gsui.data.TreeStore'
    ],
    xtype: 'check-tree',
    
    //<example>
    exampleTitle: 'Checkbox Selection in a TreePanel',
    otherContent: [{
        type: 'Data',
        path: 'resources/data/tree/check-nodes.json'
    }],
    //</example>
    
    rootVisible: false,
    useArrows: true,
    frame: true,
    title: 'Check Tree',
    width: 280,
    height: 300,
    bufferedRenderer: false,
    animate: true,
    
    initComponent: function(){

        Gsui.apply(this, {
            store: new Gsui.data.TreeStore({
                proxy: {
                    type: 'ajax',
                    url: 'resources/data/tree/check-nodes.json'
                },
                sorters: [{
                    property: 'leaf',
                    direction: 'ASC'
                }, {
                    property: 'text',
                    direction: 'ASC'
                }]
            }),
            tbar: [{
                text: 'Get checked nodes',
                scope: this,
                handler: this.onCheckedNodesClick
            }]
        });
        this.callParent();
    },
    
    onCheckedNodesClick: function(){
        var records = this.getView().getChecked(),
            names = [];
                   
        Gsui.Array.each(records, function(rec){
            names.push(rec.get('text'));
        });
                    
        Gsui.MessageBox.show({
            title: 'Selected Nodes',
            msg: names.join('<br />'),
            icon: Gsui.MessageBox.INFO
        });
    }
});
