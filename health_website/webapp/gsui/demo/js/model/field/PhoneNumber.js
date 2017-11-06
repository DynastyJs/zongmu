Gsui.define('Demo.model.field.PhoneNumber', {
    extend: 'Gsui.data.field.String',

    alias: 'data.field.phonenumber',

    validators: [
        { 
            type: 'format', 
            matcher: /^\d{3}-?\d{3}-?\d{4}$/,
            message: 'Must be in the format xxx-xxx-xxxx'
        }
    ]
});
