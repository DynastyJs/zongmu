Gsui.define('Demo.view.form.FileUploadsController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.form-fileuploads',
    
    getFilePath: function() {
        var v = this.lookupReference('basicFile').getValue();
        
        Gsui.Msg.alert('Selected File', v && v !== '' ? v : 'None');
    },
    
    buttonOnlyChange: function(field, value) {
        Gsui.toast('<b>Selected:</b> ' + value);
    },
    
    firstFormSave: function() {
        var form = this.lookupReference('firstForm').getForm();
        
        if (form.isValid()) {
            form.submit({
                url: 'resources/data/form/file-upload.php',
                waitMsg: 'Uploading your photo...',
                success: function(fp, o) {
                    var tpl = new Gsui.XTemplate(
                        'File processed on the server.<br />',
                        'Name: {fileName}<br />',
                        'Size: {fileSize:fileSize}'
                    );
                    
                    Gsui.Msg.alert('Success', tpl.apply(o.result));
                }
            });
        }
    },
    
    firstFormReset: function() {
        this.lookupReference('firstForm').getForm().reset();
    },
    
    secondFormSubmit: function() {
        var form = this.lookupReference('secondForm').getForm();
        
        if (form.isValid()) {
            form.submit({
                url: 'resources/data/form/file-upload.php',
                waitMsg: 'Uploading your photo...',
                success: this.secondFormUploadSuccess,
                failure: this.secondFormUploadFailure
            });
        }
    },
    
    secondFormReset: function() {
        this.lookupReference('secondForm').getForm().reset();
    },
    
    secondFormUploadSuccess: function(form, action) {
        Gsui.Msg.alert('Success', 'Processed file "' + action.result.file + '" on the server');
    },
    
    secondFormUploadFailure: function(form, action) {
        Gsui.Msg.alert("Error", Gsui.JSON.decode(this.response.responseText).message);
    }
});
