Gsui.define('Demo.view.direct.NamedFormController', {
    extend: 'Demo.view.direct.DirectVC',
    alias: 'controller.directnamed',
    
    requires: [
        'Gsui.window.Toast'
    ],
    
    onFormSubmit: function() {
        var values = this.getView().getForm().getValues();
        
        TestAction.showDetails(values, this.onShowDetails, this);
    },
    
    onShowDetails: function(result, event, success) {
        if (success) {
            Gsui.toast(result, 'Server response', 't');
        }
        else {
            Gsui.toast('An error occured: ' + event.error);
        }
    }
});
