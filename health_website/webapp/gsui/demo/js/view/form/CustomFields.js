/**
 * Gsui provides many types of form fields to build interactive and rich forms. However,
 * it also provides a complete framework for building new types of fields 'quickly. The
 * search field below is an example.
 */
Gsui.define('Demo.view.form.CustomFields', {
    extend: 'Gsui.form.Panel',
    xtype: 'form-customfields',
    
    //<example>
    requires: [
        'Gsui.ux.form.SearchField',
        'Demo.model.form.ForumPost',
        'Demo.store.form.ForumPosts'
    ],
    
    exampleTitle: 'Custom Form Fields',
    otherContent: [{
        type: 'SearchField',
        path: '../ux/form/SearchField.js'
    }],
    //</example>
    
    store: {
        type: 'form-forum-posts'
    },
    
    title: 'Forum Search',
    height: 600,
    width: 600,
    layout: 'fit',
    items: [{
        scrollable: 'y',
        xtype: 'dataview',
        tpl: [
            '<tpl for=".">',
            '<div class="search-item">',
                '<h3><span>{lastPost:this.formatDate}<br>by {author}</span>',
                '<a href="http://sencha.com/forum/showthread.php?t={topicId}&p={postId}" target="_blank">{title}</a></h3>',
                '<p>{excerpt}</p>',
            '</div></tpl>',
        {
            formatDate: function(value) {
                return Gsui.Date.format(value, 'M j, Y');
            }
        }],
        itemSelector: 'div.search-item',
        emptyText: '<div class="x-grid-empty">No Matching Threads</div>',
        store: 'form-forum-posts'
    }],
    
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: {
            width: 400,
            fieldLabel: 'Search',
            labelWidth: 50,
            xtype: 'searchfield',
            store: 'form-forum-posts'
        }
    }, {
        dock: 'bottom',
        xtype: 'pagingtoolbar',
        store: 'form-forum-posts',
        pageSize: 25,
        displayInfo: true,
        displayMsg: 'Topics {0} - {1} of {2}',
        emptyMsg: 'No topics to display'
    }],
    
    initComponent: function() {
        var me = this,
            store = me.store;
        
        if (!store.isStore) {
            store = me.store = Gsui.data.StoreManager.lookup(store);
        }
        
        // Seed the store with the first page
        store.loadPage(1);
        
        me.callParent();
    }
});
