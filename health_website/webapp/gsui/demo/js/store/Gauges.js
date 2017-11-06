Gsui.define('Demo.store.Gauges', {
    extend: 'Gsui.data.Store',
    alias: 'store.gauges',

    fields: ['mph', 'fuel', 'temp', 'rpm' ],

    generateData: function () {
        var r = Math.random;
        return [{ mph: r() * 100, fuel: r() * 100, temp: r() * 250, rpm: r() * 8000 }];
    },

    refreshData: function () {
        this.setData(this.generateData());
    },

    constructor: function (config) {
        config = Gsui.apply({
            data: this.generateData()
        }, config);
        this.callParent([config]);
    }

});