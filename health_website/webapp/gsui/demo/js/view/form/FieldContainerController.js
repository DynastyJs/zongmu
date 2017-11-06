Gsui.define('Demo.view.form.FieldContainerController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.form-fieldcontainer',
    
    requires: [
        'Demo.model.PartTimeEmployee'
    ],

    onLoadClick: function() {
        this.getView().loadRecord(Gsui.create('Demo.model.PartTimeEmployee', {
            'email'    : 'abe@sencha.com',
            'title'    : 'mr',
            'firstName': 'Abraham',
            'lastName' : 'Elias',
            'startDate': '01/10/2003',
            'endDate'  : '12/11/2009',
            'phone-1'  : '555',
            'phone-2'  : '123',
            'phone-3'  : '4567',
            'hours'    : 7,
            'minutes'  : 15
        }));
    },

    onSaveClick: function() {
        var form   = this.getView(),
            encode = Gsui.String.htmlEncode,
            s      = '';

        if (form.isValid()) {
            Gsui.iterate(form.getValues(), function(key, value) {
                value = encode(value);
                
                s += Gsui.util.Format.format("{0} = {1}<br />", key, value);
            }, this);

            Gsui.Msg.alert('Form Values', s);
        }
    },

    onResetClick: function() {
        this.getView().reset();
    }
});