Gsui.define('Demo.view.Header', {
    extend: 'Gsui.Container',
    xtype: 'appHeader',
    id: 'app-header',
    title: 'Gsui演示系统',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },

    initComponent: function() {
        document.title = this.title;

        this.items = [{
            xtype: 'component',
            id: 'app-header-logo'
        },{
            xtype: 'component',
            id: 'app-header-title',
            html: this.title,
            flex: 1
        }];

       /** if (!Gsui.getCmp('options-toolbar')) {
            this.items.push({
                xtype: 'themeSwitcher'
            });
        }**/

        this.callParent();
    }
});
