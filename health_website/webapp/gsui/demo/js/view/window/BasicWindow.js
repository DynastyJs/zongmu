/**
 * Demonstrates a basic window control.
 */
Gsui.define('Demo.view.window.BasicWindow', {
    extend: 'Gsui.window.Window',
    xtype: 'basic-window',
    
    //<example>
    exampleTitle: 'Basic Window',
    //</example>
    
    height: 300,
    width: 400,
    title: 'Window',
    scrollable: true,
    bodyPadding: 10,
    html: Demo.DummyText.extraLongText,
    constrain: true,
    closable: false
});