Gsui.define('Demo.model.tree.Task', {
    extend: 'Demo.model.tree.Base',
    fields: [{
        name: 'task',
        type: 'string'
    }, {
        name: 'user',
        type: 'string'
    }, {
        name: 'duration',
        type: 'float'
    }, {
        name: 'done',
        type: 'boolean'
    }]
}); 