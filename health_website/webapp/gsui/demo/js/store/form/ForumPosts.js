Gsui.define('Demo.store.form.ForumPosts', {
    extend: 'Gsui.data.Store',
    alias: 'store.form-forum-posts',
    storeId: 'form-forum-posts',
    
    model: 'Demo.model.form.ForumPost',
    
    proxy: {
        type: 'jsonp',
        url: 'http://sencha.com/forum/topics-remote.php',
        reader: {
            type: 'json',
            rootProperty: 'topics',
            totalProperty: 'totalCount'
        }
    },
    
    statics: {
        defaultForumId: 4
    },
    
    listeners: {
        beforeload: 'onBeforeLoad',
        scope: 'this'
    },

    privates: {
        onBeforeLoad: function() {
            var proxy, params;

            proxy = this.getProxy();
            params = proxy.getExtraParams();

            if (params.query) {
                proxy.setExtraParam('forumId', undefined);
            }
            else {
                proxy.setExtraParam('forumId', this.self.defaultForumId);
            }
        }
    }
});
