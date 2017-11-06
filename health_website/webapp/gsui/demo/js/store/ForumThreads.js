Gsui.define('Demo.store.ForumThreads', {
    extend: 'Gsui.data.Store',

    alias: 'store.forumthreads',
    model: 'Demo.model.grid.ForumThread',

    pageSize: 50,
    remoteSort: true,
    sorters: [{
        property: 'lastpost',
        direction: 'DESC'
    }]
});
