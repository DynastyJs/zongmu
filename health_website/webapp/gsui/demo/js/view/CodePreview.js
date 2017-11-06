Gsui.define('Demo.view.CodePreview', {
    extend: 'Gsui.tab.Panel',
    requires: [
        'Demo.view.CodeContent'
    ],

    xtype: 'codePreview',

    // The code must be read in LTR
    bodyPadding: 5,
    bodyStyle: 'direction: ltr;',

    tools: [{
        type: 'maximize',
        tooltip: '最大化'
    }],
    showTitle: true,

    initComponent: function() {
        if (this.showTitle) {
            this.title = '相关代码';
        }
        this.callParent(arguments);
    }
});