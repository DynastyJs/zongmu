Gsui.define('Demo.view.charts.column3d.StackedController', {
    extend: 'Gsui.app.ViewController',
    alias: 'controller.column-stacked-3d',

    onThemeSwitch: function () {
        var chart = this.lookupReference('chart'),
            currentThemeClass = Gsui.getClassName(chart.getTheme()),
            themes = Gsui.chart.theme,
            themeNames = [],
            currentIndex = 0,
            name;

        for (name in themes) {
            if (Gsui.getClassName(themes[name]) === currentThemeClass) {
                currentIndex = themeNames.length;
            }
            if (name !== 'Base' && name.indexOf('Gradients') < 0) {
                themeNames.push(name);
            }
        }
        chart.setTheme(themes[themeNames[++currentIndex % themeNames.length]]);
        chart.redraw();
    },

    onStackedToggle: function (segmentedButton, button, pressed) {
        var chart = this.lookupReference('chart'),
            series = chart.getSeries()[0],
            value = segmentedButton.getValue();
        series.setStacked(value === 0);
        chart.redraw();
    }
})