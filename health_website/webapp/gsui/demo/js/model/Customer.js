Gsui.define('Demo.model.Customer', {
    extend: 'Demo.model.Base',
    requires: [
        "Demo.model.field.PhoneNumber"
    ],
    
    fields: [
        'name',
        { name: 'phone', type: 'phonenumber' }
    ],

    proxy: {
        type: 'rest',
        url: '/Demo/Customer'
    },

    validators: {
        name: 'presence'
    }
});
