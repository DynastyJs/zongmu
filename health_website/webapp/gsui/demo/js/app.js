Gsui.application = function(config) {
	Gsui.Boot.config.disableCaching = false;
    var createApp = function(App) {
            
            Gsui.onReady(function() {
                Gsui.app.Application.instance = new App();
            });
        },
        paths = config.paths,
        ns;
    if (typeof config === "string") {
        Gsui.require(config, function() {
            createApp(Gsui.ClassManager.get(config));
        });
    } else {
        config = Gsui.apply({
            extend: 'Gsui.app.Application'
        }, 
        config);
        
        
        Gsui.Loader.setPath(config.name, config.appFolder || 'app');
        if (paths) {
            for (ns in paths) {
                if (paths.hasOwnProperty(ns)) {
                    Gsui.Loader.setPath(ns, paths[ns]);
                }
            }
        }
        config['paths processed'] = true;
        
        Gsui.define(config.name + ".$application", config, function() {
            createApp(this);
        });
    }
};
/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Gsui.application({
    extend: 'Demo.Application',

    name: 'Demo',
	
	paths : {
		Demo : 'js/',
		'Gsui.ux' : 'lib/ux', 
	},
	appFolder : 'js',
    autoCreateViewport: 'Demo.view.main.Main',
    constructor : function(){
    	this.callParent(arguments);
    },
    init : function(){
    	this.callParent(arguments);
    }
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to Demo.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

});
