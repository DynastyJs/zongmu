/**
 * This example shows how to create a line chart with a renderer function that changes the
 * stroke and fill colors when the line goes down.
 *
 * Line charts allow to visualize the evolution of a value over time, or the ratio between
 * any two values.
 */
Gsui.define('Demo.view.charts.line.Renderer', {
    extend: 'Gsui.panel.Panel',
    xtype: 'line-renderer',

    requires: [
        'Gsui.chart.CartesianChart',
        'Gsui.chart.series.Line',
        'Gsui.chart.axis.Numeric',
        'Gsui.draw.modifier.Highlight',
        'Gsui.chart.axis.Time',
        'Gsui.chart.interactions.ItemHighlight'
    ],

    layout: 'fit',

    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: function () {
                var chart = this.up('panel').down('cartesian'),
                    store = chart.getStore();
                store.refreshData();
            }
        }
    ],

    items: [{
        xtype: 'cartesian',
        width: '100%',
        height: 500,
        store: {
            type: 'pie'
        },
        id: 'line-chart-renderer',
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        series: [
            {
                type: 'line',
                xField: 'name',
                yField: 'g1',
                fill: true,
                smooth: true,
                style: {
                    lineWidth: 4
                },
                marker: {
                    type: 'circle',
                    radius: 10,
                    lineWidth: 2
                },
                renderer: function (sprite, config, rendererData, index) {
                    var store = rendererData.store,
                        storeItems = store.getData().items,
                        currentRecord = storeItems[index],
                        previousRecord = (index > 0 ? storeItems[index-1] : currentRecord),
                        current = currentRecord && currentRecord.data['g1'],
                        previous = previousRecord && previousRecord.data['g1'],
                        isUp = current >= previous,
                        changes = {};
                    switch (config.type) {
                        case 'marker':
                            changes.strokeStyle = (isUp ? 'cornflowerblue' : 'tomato');
                            changes.fillStyle = (isUp ? 'aliceblue' : 'lightpink');
                            break;
                        case 'line':
                            changes.strokeStyle = (isUp ? 'cornflowerblue' : 'tomato');
                            changes.fillStyle = (isUp ? 'rgba(100, 149, 237, 0.4)' : 'rgba(255, 99, 71, 0.4)');
                            break;
                    }
                    return changes;
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['g1'],
                minimum: 0,
                listeners: {
                    rangechange: function (axis, range) {
                        if (!range) {
                            return;
                        }
                        // expand the range slightly to make sure markers aren't clipped
                        var max = range[1];
                        if (max >= 1000) {
                            range[1] = max - max % 100 + 100;
                        } else if (max >= 500) {
                            range[1] = max - max % 50 + 50;
                        } else {
                            range[1] = max - max % 20 + 20;
                        }
                    }
                }
            },
            {
                type: 'category',
                position: 'bottom',
                fields: 'name'
            }
        ]
    }]

});
