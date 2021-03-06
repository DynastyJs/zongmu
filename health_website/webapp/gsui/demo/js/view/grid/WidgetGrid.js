/**
 * This example shows how to create Widgets in grid columns. Widgets are lightweight
 * components with a simpler lifecycle.
 */
Gsui.define('Demo.view.grid.WidgetGrid', {
    extend: 'Gsui.grid.Panel',
    requires: [
        'Gsui.grid.column.Action',
        'Gsui.ProgressBarWidget',
        'Gsui.slider.Widget',
        'Gsui.sparkline.*'
    ],
    xtype: 'widget-grid',
    store: 'Widgets',
    collapsible: true,
    height: 350,
    width: 1050,
    title: 'Widget Grid',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: false,
        markDirty: false
    },
    trackMouseOver: false,
    disableSelection: true,
    //<example>
    otherContent: [{
        type: 'Store',
        path: 'js/store/Widgets.js'
    },{
        type: 'Model',
        path: 'js/model/Widget.js'
    }],
    //</example>

    initComponent: function () {
        var me = this;

        me.columns = [{
            text: 'Button',
            width: 105,
            xtype: 'widgetcolumn',
            dataIndex: 'progress',
            widget: {
                width: 90,
                xtype: 'splitbutton',
                icon: '../shared/icons/fam/feed_add.png',
                handler: function(btn) {
                    var rec = btn.getWidgetRecord();
                    Gsui.Msg.alert("Button clicked", "Hey! " + rec.get('name'));
                }
            }
        }, {
            text     : 'Progress',
            xtype    : 'widgetcolumn',
            width    : 120,
            dataIndex: 'progress',
            widget: {
                xtype: 'progressbarwidget',
                textTpl: [
                    '{percent:number("0")}% done'
                ]
            }
        }, 
        {
            text: 'Run Mode',
            width: 150,
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'combo',
                store: [
                    'Local',
                    'Remote'
                ],
                listeners: {
                    select: function(combo){
                        console.log(combo.getValue() + ' selected');
                    }
                }
            }
        },
        {
            text     : 'Slider',
            xtype    : 'widgetcolumn',
            width    : 120,
            dataIndex: 'progress',
            widget: {
                xtype: 'sliderwidget',
                minValue: 0,
                maxValue: 1,
                decimalPrecision: 2,
                listeners: {
                    change: function(slider, value) {

                        // If the widget has been decorated by the WidgetColumn with context-returning methods
                        // then extract data and update its context record.
                        if (slider.getWidgetRecord) {
                            var rec = slider.getWidgetRecord();
                            if (rec) {
                                rec.set('progress', value);
                            }
                        }
                    }
                }
            }
        }];

        me.tbar = [];
        for (var i = 0; i < me.columns.length; i++) {
            me.tbar.push({
                text: me.columns[i].text,
                enableToggle: true,
                pressed: true,
                scope: me,
                toggleHandler: me.onButtonToggle
            });
        }

        me.callParent();
        me.on({
            columnshow: me.onColumnToggle,
            columnhide: me.onColumnToggle
        })
    },

    onButtonToggle: function(btn, pressed) {
        if (this.processing) {
            return;
        }

        this.processing = true;
        var header = this.headerCt.child('[text=' + btn.text + ']');
        header.setVisible(pressed);
        this.processing = false;
    },

    onColumnToggle: function(headerCt, header) {
        if (this.processing) {
            return;
        }
        this.processing = true;
        var btn = this.down('toolbar').child('[text=' + header.text + ']');
        btn.setPressed(header.isVisible());
        this.processing = false;
    }
});