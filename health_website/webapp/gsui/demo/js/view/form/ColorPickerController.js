Gsui.define('Demo.view.form.ColorPickerController', {
    extend: 'Gsui.app.ViewController',

    alias: 'controller.form-color-picker',

    onChange: function(picker) {
        console.log(picker.getId() + '.color: ' + picker.getValue());
    },

    onShowMoreLess: function (button) {
        this.getViewModel().set('full', button.value);
    }
});
