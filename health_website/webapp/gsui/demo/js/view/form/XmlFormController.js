Gsui.define('Demo.view.form.XmlFormController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.form-xml',
    
    onLoadClick: function() {
        this.getView().getForm().load({
            url: 'resources/data/form/xml-form-data.xml',
            waitMsg: 'Loading...'
        });
    },
    
    onSubmitClick: function() {
        this.getView().getForm().submit({
            url: 'resources/data/form/xml-form-errors.xml',
            submitEmptyText: false,
            waitMsg: 'Saving Data...'
        });
    }
});