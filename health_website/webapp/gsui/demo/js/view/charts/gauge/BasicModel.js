Gsui.define('Demo.view.charts.gauge.BasicModel', {
    extend: 'Gsui.app.ViewModel',
    alias: 'viewmodel.gauge-basic',
    stores: {
        vehicle: {
            type: 'gauges'
        }
    }
});