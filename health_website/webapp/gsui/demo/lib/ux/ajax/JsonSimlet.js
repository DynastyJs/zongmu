/**
 * JSON Simlet.
 */
Gsui.define('Gsui.ux.ajax.JsonSimlet', {
    extend: 'Gsui.ux.ajax.DataSimlet',
    alias: 'simlet.json',

    doGet: function (ctx) {
        var me = this,
            data = me.getData(ctx),
            page = me.getPage(ctx, data),
            reader = ctx.xhr.options.proxy && ctx.xhr.options.proxy.getReader(),
            root = reader && reader.getRootProperty(),
            ret = me.callParent(arguments), // pick up status/statusText
            response = {};

        if (root && Gsui.isArray(page)) {
            response[root] = page;
            response[reader.getTotalProperty()] = data.length;
        } else {
            response = page;
        }

        if (ctx.groupSpec) {
            response.summaryData = me.getSummary(ctx, data, page);
        }

        ret.responseText = Gsui.encode(response);
        return ret;
    }
});
