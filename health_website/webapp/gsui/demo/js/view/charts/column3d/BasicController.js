Gsui.define('Demo.view.charts.column3d.BasicController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.column-basic-3d',

    onDownload: function () {
        var chart = this.lookupReference('chart');

        if (Gsui.os.is.Desktop) {
            chart.download({
                filename: 'Industry size in major economies for 2011'
            });
        } else {
            chart.preview();
        }
    }

})