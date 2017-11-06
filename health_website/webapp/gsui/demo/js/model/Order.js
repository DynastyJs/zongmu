Gsui.define('Demo.model.Order', {
    extend: 'Demo.model.Base',

    fields: [
        { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
        'shipped',
        { 
            name: 'customerId',
            reference: {
                parent: 'Customer'
            }
        }
    ],

    proxy: {
        type: 'rest',
        url: '/Demo/Order'
    }
});
