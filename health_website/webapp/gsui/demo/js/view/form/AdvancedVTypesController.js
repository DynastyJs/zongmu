Gsui.define('Demo.view.form.AdvancedVTypesController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.form-advtypes',
    
    validateField: function(field) {
        field.next().validate();
    }
});
