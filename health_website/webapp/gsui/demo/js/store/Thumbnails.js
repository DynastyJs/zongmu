Gsui.define('Demo.store.Thumbnails', {
    extend: 'Gsui.data.Store',
    // even though this is not a tree store, it uses a TreeModel because it contains
    // records from the navigation tree.
    model: 'Gsui.data.TreeModel',
    proxy: 'memory'
});
