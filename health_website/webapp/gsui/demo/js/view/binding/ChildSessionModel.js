/**
 * This ViewModel provides data for the ChildSession view.
 */
Gsui.define('Demo.view.binding.ChildSessionModel', {
    extend: 'Gsui.app.ViewModel',
    alias: 'viewmodel.binding.childsession',

    stores: {
        // Define a store of Customer records that links to the Session.
        customers: {
            model: 'Customer',
            autoLoad: true,
            session: true
        }
    }
});
