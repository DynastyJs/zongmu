/**
 * This example shows how to use a Tree with nodes loaded dynamically from Gsui.Direct
 * back end.
 */
Gsui.define('Demo.view.direct.Tree', {
    extend: 'Gsui.tree.Panel',
    xtype: 'direct-tree',
    controller: 'directtree',
    
    requires: [
        'Demo.view.direct.TreeController'
    ],
    
    //<example>
    exampleTitle: 'Gsui.Direct Tree integration',
    exampleDescription: [
        '<p>This example shows how to load Tree nodes dynamically from a Direct proxy.</p>'
    ].join(''),
    
    otherContent: [{
        type: 'ViewController',
        path: 'js/view/direct/TreeController.js'
    }, {
        type: 'Base ViewController',
        path: 'js/view/direct/DirectVC.js'
    }, {
        type: 'Server TestAction class',
        path: 'resources/direct/source.php?file=testaction'
    }, {
        type: 'Server API configuration',
        path: 'resources/direct/source.php?file=config'
    }],
    //</example>
    
    title: 'Direct Tree',
    width: 600,
    height: 350,
    
    rootVisible: false,
    
    store: {
        store: 'tree',
        
        // By default, a tree with a hidden root will expand
        // the root node automatically when the tree is created.
        // We don't want that to happen since Direct API may not
        // be ready at that point, so we set autoLoad to false
        // which will disable auto-expanding.
        // We will later expand the root node manually in the
        // ViewController's finishInit() method.
        autoLoad: false,
        
        proxy: {
            type: 'direct',
            directFn: 'TestAction.getTree',
            paramOrder: ['node']
        }
    }
});
