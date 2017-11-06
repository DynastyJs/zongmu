Gsui.define('Demo.store.Posts', {
    extend: 'Gsui.data.TreeStore',
    requires : 'Demo.data.Posts',
    model: 'Demo.model.tree.Post',

    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/Demo/Posts'
    },

    lazyFill: false
});
