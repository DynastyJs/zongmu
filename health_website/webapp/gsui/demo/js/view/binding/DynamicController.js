Gsui.define('Demo.view.binding.DynamicController', {
    extend: 'Gsui.app.ViewController',

    alias: 'controller.binding-dynamic',

    contentCount: 0,
    titleCount: 0,

    onChangeTitleClick: function() {
        this.getViewModel().set('title', 'New Title ' + ++this.titleCount);
    },

    onChangeContentClick: function() {
        this.getViewModel().set('content', 'New Content ' + ++this.contentCount);
    }
});
