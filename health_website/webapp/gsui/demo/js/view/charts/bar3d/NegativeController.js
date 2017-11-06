Gsui.define('Demo.view.charts.bar3d.NegativeController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.bar-negative-3d',

    onDownload: function () {
        var chart = this.lookupReference('chart');

        if (Gsui.os.is.Desktop) {
            chart.download({
                filename: '3D Bar Chart with Negative Values'
            });
        } else {
            chart.preview();
        }
    }

})