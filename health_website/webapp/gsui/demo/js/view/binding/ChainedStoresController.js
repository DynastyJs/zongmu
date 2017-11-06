Gsui.define('Demo.view.binding.ChainedStoresController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.binding.chainedstores',

    onRemoveClick: function(btn) {
        var rec = btn.getWidgetRecord();
        this.getStore('everyone').remove(rec);
    },

    renderColor: function(v) {
        return Gsui.String.format('<span style="color: {0};">{1}</span>', v.toLowerCase(), v);
    },

    onEditComplete: function(editor, context) {
        var rec = contGsui.record,
            store = this.getStore('adults');

        if (store.contains(rec)) {
            this.lookupReference('adultsGrid').getView().focusRow(rec);
        }
    }
});
