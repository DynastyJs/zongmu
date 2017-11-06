Gsui.define('Demo.data.Init', {
    requires: [
        'Gsui.ux.ajax.JsonSimlet',
        'Gsui.ux.ajax.SimManager'
    ],

    singleton: true,

    constructor: function() {
        Gsui.ux.ajax.SimManager.init({
            defaultSimlet: null
        });
    }
});
