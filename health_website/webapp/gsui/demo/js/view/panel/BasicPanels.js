/**
 * 这个例子显示了如何创建基本的面板,面板通常有标题头和正文,
 * 标题头是可选的,它可以包含一个标题,图标和一个或多个工具按钮。
 */
Gsui.define('Demo.view.panel.BasicPanels', {
    extend: 'Gsui.Container',
    xtype: 'basic-panels',
    width: 660,
    requires: [
        'Gsui.layout.container.Table'
    ],

    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 10px; vertical-align: top;' }
    },

    defaults: {
        xtype: 'panel',
        width: 200,
        height: 280,
        bodyPadding: 10
    },
    //<example>
    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    //</example>

    initComponent: function () {
        this.items = [
            {
                html: Demo.DummyText.mediumText
            },
            {
                title: '标题',//设置标题
                html: Demo.DummyText.mediumText
            },
            {
                title: '可收缩的',
                collapsible: true,//设置面板为可收缩
                html: Demo.DummyText.mediumText
            },
            {
                title: '工具按钮',
                collapsed: true,
                collapsible: true,
                width: 640,
                html: Demo.DummyText.mediumText,
                tools: [//设置工具按钮
                    { type:'pin' },
                    { type:'refresh' },
                    { type:'search' },
                    { type:'save' }
                ],
                colspan: 3
            }
        ];

        this.callParent();
    }
});
