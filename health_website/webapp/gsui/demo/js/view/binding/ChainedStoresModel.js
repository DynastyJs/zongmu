//<example>
Gsui.require('Demo.model.Person', function() {
//</example>
Gsui.define('Demo.view.binding.ChainedStoresModel', {
    extend: 'Gsui.app.ViewModel',
    alias: 'viewmodel.binding.chainedstores',

    data: {
        minimumAge: 18
    },
    stores: {
        everyone: {
            model: 'Person',
            data: Demo.model.Person.generateData(15, 10)
        },
        adults: {
            source: '{everyone}',
            filters: [{
                property: 'age',
                value: '{minimumAge}',
                operator: '>='
            }],
            sorters: [{
                property: 'age',
                direction: 'ASC'
            }]
        }
    }
});
//<example>
});
//</example>