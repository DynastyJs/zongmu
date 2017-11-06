Gsui.define('Demo.Application', {
    extend: 'Gsui.app.Application',
    namespace: 'Demo',

    requires: [
        'Gsui.app.*',
        'Gsui.state.CookieProvider',
        'Gsui.window.MessageBox',
        'Gsui.tip.QuickTipManager',
        'Gsui.chart.*',
        'Demo.store.Navigation'
    ],

    controllers: [
        'Global'//,
       // 'Direct'
    ],
	constructor : function(){
		this.callParent(arguments);
	},
    init: function() {
        if ('nocss3' in Gsui.Object.fromQueryString(location.search)) {
            Gsui.supports.CSS3BorderRadius = false;
            Gsui.getBody().addCls('x-nbr x-nlg');
        }

        Gsui.create('Demo.store.Navigation', {
            storeId: 'navigation'
        });

        // Set the default route to start the application.
        this.setDefaultToken('all');

        Gsui.setGlyphFontFamily('Pictos');
        Gsui.tip.QuickTipManager.init();
        Gsui.state.Manager.setProvider(Gsui.create('Gsui.state.CookieProvider'));
        /**if (!Gsui.microloaderTags.test) {
            Gsui.state.Manager.setProvider(Gsui.create('Gsui.state.CookieProvider'));
        }**/
    }
});
