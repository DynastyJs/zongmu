Gsui.define('Demo.model.grid.Plant', {
    extend: 'Demo.model.Base',
    fields: [
        // the 'name' below matches the tag name to read, except 'availDate'
        // which is mapped to the tag 'availability'
        {name: 'common', type: 'string'},
        {name: 'botanical', type: 'string'},
        {name: 'light'},
        {name: 'price', type: 'float'},
        // dates can be automatically converted by specifying dateFormat
        {name: 'availDate', mapping: 'availability', type: 'date', dateFormat: 'm/d/Y'},
        {name: 'indoor', type: 'bool'}
    ]
});