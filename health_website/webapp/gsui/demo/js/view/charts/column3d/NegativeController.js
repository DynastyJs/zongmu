Gsui.define('Demo.view.charts.column3d.NegativeController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.column-negative-3d',

    onDownload: function () {
        var chart = this.lookupReference('chart');

        if (Gsui.os.is.Desktop) {
            chart.download({
                filename: '3D Column Chart with Negative Values'
            });
        } else {
            chart.preview();
        }
    }

})