/**
 * This example shows how to use basic data binding. The panel title, the content and the
 * button text are all pulled from the view model.
 */
Gsui.define('Demo.view.binding.HelloWorld', {
    extend: 'Gsui.panel.Panel',
    alias: 'widget.binding-hello-world',
    width: 500,
    bodyPadding: 10,
    
    viewModel: {
        data: {
            title: 'Hello World',
            html: 'The html content',
            buttonText: 'A button'
        }
    },
    
    bind: {
        title: '{title}',
        html: '{html}'
    },
    
    tbar: [{
        bind: '{buttonText}'
    }]
});
