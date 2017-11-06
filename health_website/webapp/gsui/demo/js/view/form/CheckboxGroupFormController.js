Gsui.define('Demo.view.form.CheckboxGroupController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.form-checkboxgroup',
    
    onSaveFormClick: function() {
        var form = this.getView().getForm();
        
        if (form.isValid()) {
            Gsui.Msg.alert({
                title: 'Submitted Values',
                message: 'The following will be sent to the server: <br />' +
                         form.getValues(true).replace(/&/g,', '),
                height: 200
            });
        }
        else {
            Gsui.Msg.alert(
                'Form incomplete',
                'You must fill out the form with valid values, <br/ >' +
                'including the (initially collapsed) Checkbox group.'
            );
        }
    },
    
    onResetFormClick: function() {
        this.getView().getForm().reset();
    }
});
