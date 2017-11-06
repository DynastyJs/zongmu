/**
 * This example shows simple dynamic data binding. When the data in the underlying view
 * model is modified, the change is relayed back to the panel and the markup is updated.
 */
Gsui.define('Demo.view.binding.Dynamic', {
    extend: 'Gsui.panel.Panel',
    alias: 'widget.binding-dynamic',
    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'js/view/binding/DynamicController.js'
    }],
    //</example>
    
    width: 300,
    bodyPadding: 10,
    controller: 'binding-dynamic',

    viewModel: {
        data: {
            title: 'Some Title',
            content: 'Some Content'
        }
    },
    
    bind: {
        title: 'Info - {title}',
        html: 'Stuff: {content}'
    },
    
    tbar: [{
        text: 'Change title',
        listeners: {
            click: 'onChangeTitleClick'
        }
    }, {
        text: 'Change content',
        listeners: {
            click: 'onChangeContentClick'
        }
    }]
});
