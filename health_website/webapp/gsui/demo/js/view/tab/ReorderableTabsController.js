Gsui.define('Demo.view.tab.ReorderableTabsController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.reorderable-tabs',

    counter: 4,

    onAddTabClick: function() {
        var tabPanel = this.getView(),
            counter = ++this.counter,
            html = counter % 2 ? Demo.DummyText.longText :
                Demo.DummyText.extraLongText,
            tab = tabPanel.add({
                title: 'Tab ' + counter,
                html: html
            });

        tabPanel.setActiveTab(tab);
    }
});
