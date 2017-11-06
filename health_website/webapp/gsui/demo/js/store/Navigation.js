Gsui.define('Demo.store.Navigation', {
    extend: 'Gsui.data.TreeStore',
    alias: 'store.navigation',

    constructor: function(config) {
        var me = this,
            queryParams = Gsui.Object.fromQueryString(location.search),
            charts = ('charts' in queryParams) && !/0|false|no/i.test(queryParams.charts);

        me.callParent([Gsui.apply({
            root: {
                text: 'All',
                id: 'all',
                expanded: false,
                children: charts ? me.getChartNavItems() : me.getNavItems()
            }
        }, config)]);
    },

    addIconClasses: function (items) {
        for (var item, i = items.length; i-- > 0; ) {
            item = items[i];

            if (!('iconCls' in item)) {
                item.iconCls = 'icon-' + item.id;
            }

            if (!('glyph' in item)) {
                // sets the font-family
                item.glyph = '32@Sencha-Examples';
            }

            if (item.children) {
                this.addIconClasses(item.children);
            }
        }

        return items;
    },

    getChartNavItems: function() {
        var combinationExamples,
            items = this.addIconClasses([
            {
                text: 'Column Charts',
                id: 'column-charts',
                expanded: false,
                description: 'Column charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display vertical bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'column-basic', text: 'Basic', leaf: true },
                    { id: 'column-stacked', text: 'Stacked', leaf: true },
                    { id: 'column-stacked-100', text: '100% Stacked', leaf: true },
                    { id: 'column-renderer', text: 'With Renderer', leaf: true },
                    { id: 'column-multi-axis', text: 'Multiaxis', leaf: true }
                ]
            },
            {
                text: '3D Column Charts',
                id: 'column-charts-3d',
                expanded: false,
                description: '3D Column charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display vertical bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'column-basic-3d', text: 'Basic', leaf: true },
                    { id: 'column-grouped-3d', text: 'Grouped', leaf: true },
                    { id: 'column-stacked-3d', text: 'Stacked', leaf: true },
                    { id: 'column-stacked-100-3d', text: '100% Stacked', leaf: true },
                    { id: 'column-negative-3d', text: 'Negative values', leaf: true },
                    { id: 'column-renderer-3d', text: 'With Renderer', leaf: true }
                ]
            },
            {
                text: 'Bar Charts',
                id: 'bar-charts',
                expanded: false,
                description: 'Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'bar-basic', text: 'Basic', leaf: true },
                    { id: 'bar-stacked', text: 'Stacked', leaf: true },
                    { id: 'bar-stacked-100', text: '100% Stacked', leaf: true }
                ]
            },
            {
                text: '3D Bar Charts',
                id: 'bar-charts-3d',
                expanded: false,
                description: '3D Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
                             'that allows for quick generalizations regarding your data.',
                children: [
                    { id: 'bar-basic-3d', text: 'Basic', leaf: true },
                    { id: 'bar-stacked-3d', text: 'Stacked', leaf: true },
                    { id: 'bar-stacked-100-3d', text: '100% Stacked', leaf: true },
                    { id: 'bar-negative-3d', text: 'Negative values', leaf: true }
                ]
            },
            {
                text: 'Line Charts',
                id: 'line-charts',
                expanded: false,
                description: 'Line charts display information as a series of markers that are connected by lines.' +
                             'These charts are excellent for showing underlying patterns between data points.',
                children: [
                    { id: 'line-basic', text: 'Basic', leaf: true },
                    { id: 'line-marked', text: 'Basic + Markers', leaf: true },
                    { id: 'line-spline', text: 'Spline', leaf: true },
                    { id: 'line-marked-spline', text: 'Spline + Markers', leaf: true },
                    { id: 'line-plot', text: 'Plot', leaf: true },
                    { id: 'line-markers', text: 'With Image Markers', leaf: true },
                    { id: 'line-crosszoom', text: 'With Zoom', leaf: true },
                    { id: 'line-renderer', text: 'With Renderer', leaf: true }
                ]
            },
            {
                text: 'Area Charts',
                id: 'area-charts',
                expanded: false,
                description: 'Area charts display data by differentiating the area between lines. They are often ' +
                             'used to measure trends by representing totals over time.',
                children: [
                    { id: 'area-basic', text: 'Basic', leaf: true },
                    { id: 'area-stacked', text: 'Stacked', leaf: true },
                    { id: 'area-stacked-100', text: '100% Stacked', leaf: true },
                    { id: 'area-negative', text: 'Negative Values', leaf: true }
                ]
            },
            {
                text: 'Scatter Charts',
                id: 'scatter-charts',
                expanded: false,
                description: 'Scatter charts are diagrams that are used to display data as a collection of points.' +
                             'They are perfect for showing multiple measurements to aid in finding correlation ' +
                             'between variables.',
                children: [
                    { id: 'scatter-basic', text: 'Basic', leaf: true },
                    { id: 'scatter-custom-icons', text: 'Custom Icons', leaf: true },
                    { id: 'scatter-bubble', text: 'Bubble', leaf: true }
                ]
            },
            {
                text: 'Financial Charts',
                id: 'financial-charts',
                expanded: false,
                description : 'Financial charts provide a simple method for showing the change in price over time. ' +
                              'A quick look at these charts provides information regarding financial highs, lows, ' +
                              'opens, and closes.',
                children: [
                    { id: 'financial-candlestick', text: 'Candlestick', leaf: true },
                    { id: 'financial-ohlc', text: 'OHLC', leaf: true }
                ]
            },
            {
                text: 'Pie Charts',
                id: 'pie-charts',
                expanded: false,
                description: 'Pie charts show sectors of data proportional to the whole. They are excellent for ' +
                             'providing a quick and simple comparison of a category to the whole.',
                children: [
                    { id: 'pie-basic', text: 'Basic', leaf: true },
                    { id: 'pie-custom', text: 'Spie', leaf: true },
                    { id: 'pie-donut', text: 'Donut', leaf: true },
                    { id: 'pie-3d', text: '3D Pie', leaf: true }
                ]
            },
            {
                text: 'Radial Charts',
                id: 'radial-charts',
                expanded: false,
                description: 'Radial charts offer a flat view of data involving multiple variable quantities. They are ' +
                             'generally used to show performance metrics because they easily emphasize strengths and ' +
                             'weaknesses from a simple two-dimensional perspective.',
                children: [
                    { id: 'radial-basic', text: 'Basic', leaf: true },
                    { id: 'radial-filled', text: 'Filled', leaf: true },
                    { id: 'radial-marked', text: 'Marked', leaf: true },
                    { id: 'radial-multi-axis', text: 'Multiaxis', leaf: true }
                ]
            },
            {
                text: 'Gauge Charts',
                id: 'guage-charts',
                expanded: false,
                description: 'Gauge charts contain a single value axis that provides simple visualization for dashboards.' +
                             'They are generally used to show the current status or heartbeat with a single point of data.',
                children: [
                    { id: 'gauge-basic', text: 'Basic', leaf: true }
                ]
            },
            {
                text: 'Combination Charts',
                id: 'combination-charts',
                expanded: false,
                description: 'Sencha Charts gives you the ability to easily join several chart types into one chart. ' +
                             'This gives developers the ability to show multiple series in a single view.',
                children: combinationExamples = [
                    { id: 'combination-pareto', text: 'Pareto', leaf: true },
                    { id: 'combination-dashboard', text: 'Interactive Dashboard', leaf: true },
                    { id: 'unemployment', text: 'Infographic', leaf: true },
                    { id: 'combination-theme', text: 'Custom Theme', leaf: true },
                    { id: 'combination-bindingtabs', text: 'Binding & Tabs', leaf: true}
                ]
            },
            {
                text: 'Drawing',
                id: 'drawing',
                expanded: false,
                description: 'The Sencha Draw package allows developers to create cross-browser compatible and mobile ' +
                             'friendly graphics, text, and shapes. You can even create a standalone drawing tool!',
                children: [
                    { id: 'free-paint', text: 'Free Paint', leaf: true },
                    { id: 'hit-test', text: 'Hit Testing', leaf: true },
                    { id: 'intersections', text: 'Path Intersections', leaf: true },
                    { id: 'draw-composite', text: 'Composite', leaf: true }
                ]
            }
        ]);
        if (Gsui.isiOS || Gsui.isIE8) {
            combinationExamples.splice(2, 1);
        }
        return items;
    },

    getNavItems: function() {
        return this.addIconClasses([
            {
                text: '面板Panel',
                id: 'panels',
                expanded: true,
                children: [
                    { id: 'basic-panels', text: '基本面板',classPath:'panel.BasicPanels', leaf: true },
                    { id: 'framed-panels', text: '圆角面板',classPath:'panel.FramedPanels', leaf: true },
                    { id: 'panel-header-position', text: '面板头位置',classPath:'panel.HeaderPosition', leaf: true }
                ]
            },{
                text: '表格GridPanel',
                id: 'grids',
                expanded: false,
                children: [
                    { id: 'array-grid', text: '数组表格',classPath:'grid.ArrayGrid', leaf: true },
                    { id: 'grouped-grid', text: '分组表格',classPath:'grid.GroupedGrid', leaf: true },
                    { id: 'locking-grid', text: '锁定表格',classPath:'grid.LockingGrid', leaf: true },
                    { id: 'grouped-header-grid', text: '分组头表格',classPath:'grid.GroupedHeaderGrid', leaf: true },
                    { id: 'multi-sort-grid', text: '多列排序表格',classPath:'grid.MultipleSorting', leaf: true },
                    { id: 'spreadsheet', text: '锁定电子表格',classPath:'grid.Spreadsheet', leaf: true},
                    { id: 'spreadsheet-checked', text: '勾选电子表格',classPath:'grid.SpreadsheetChecked', leaf: true },
                  //  { id: 'progress-bar-pager', text: 'Progress Bar Pager',classPath:'grid.ProgressBarPager', leaf: true },
                  //  { id: 'sliding-pager', text: 'Sliding Pager',classPath:'grid.SlidingPager', leaf: true },
                    { id: 'paging-grid', text: '分页表格',classPath:'grid.Paging', leaf: true },
                    {id: 'checkbox-selection', text: '多选表格',classPath:'grid.CheckboxSelection', leaf: true },
                    {id: 'row-numberer', text: '行号表格',classPath:'grid.RowNumberer', leaf: true },
                     {id: 'framing-buttons', text: '工具栏表格',classPath:'grid.FramingButtons', leaf: true },
                  /*  {
                        id: 'grid-plugins',
                        expanded: false,
                        text: 'Grid Plugins',
                        leaf: false,
                        description: 'Grid panels can extend their functionality with the use of our Grid Plugins. ' +
                                     'Our plugins offer various accoutrements to basic Grid functionality, such as ' +
                                     'row numbering, row expanding, and checkbox selection models.',
                        children: [
                            {id: 'expander-lockable', text: 'Row Expander, lockable columns', leaf: true },
                            //{id: 'checkbox-selection', text: 'Checkbox Selection Model', leaf: true },
                            //{id: 'row-numberer', text: 'Row Numberer', leaf: true },
                          //  {id: 'framing-buttons', text: 'Framed with docked toolbars', leaf: true }
                        ]
                    },
                    { id: 'grid-filtering', text: 'Grid Filtering', leaf: true },
                    { id: 'reconfigure-grid', text: 'Reconfigure Grid', leaf: true },
                    { id: 'property-grid', text: 'Property Grid', leaf: true },
                    { id: 'cell-editing', text: 'Cell Editing', leaf: true },*/
                    { id: 'row-expander-grid', text: '行展开表格',classPath:'grid.RowExpander', leaf: true },
                    { id: 'big-data-grid', text: '大数据表格',classPath:'grid.BigData', leaf: true },
                    { id: 'widget-grid', text: '小组件列表格',classPath:'grid.WidgetGrid', leaf: true },
                    { id: 'crud-grid', text: '增删改查表格',classPath:'grid.CrudGridPanel', leaf: true }
                   // { id: 'customer-grid', text: 'Customer/Order grid', leaf: true }
                ]
            },{
                text: '树组件TreePanel',
                id: 'trees',
                expanded: false,
                children: [
                    { id: 'basic-trees', text: '基本树',classPath:'tree.BasicTrees', leaf: true },
                   // { id: 'tree-reorder', text: 'Tree Reorder', leaf: true },
                    { id: 'tree-grid', text: '表格树',classPath:'tree.TreeGrid', leaf: true },
                   // { id: 'tree-two', text: 'Two Trees', leaf: true },
                    { id: 'check-tree', text: '勾选树',classPath:'tree.CheckTree', leaf: true },
                  //  { id: 'tree-xml', text: 'XML Tree', leaf: true },
                    { id: 'filtered-tree', text: '过滤树',classPath:'tree.FilteredTree', leaf: true },
                    { id: 'heterogeneous-tree', text: '异构数据树',classPath:'tree.HeterogeneousTree', leaf: true },
                    { id: 'sync-tree', text: '同步树',classPath:'tree.SyncTree', leaf: true },
                    { id: 'tristate-checkbox-tree', text: '三态勾选树',classPath:'tree.TristateTree', leaf: true },
                    { id: 'async-search-tree', text: '异步查询树',classPath:'tree.AsyncSearchTree', leaf: true },
                  //  { id: 'lineardata-tree', text: 'Linear Data Geographical Tree',classPath:'LinearDataTree', leaf: true }
                ]
            } ,{
                text: '标签页组件TabPanel',
                id: 'tabs',
                expanded: false,
                children: [
                    { id: 'basic-tabs', text: '基本标签页',classPath:'tab.BasicTabs', leaf: true },
                    { id: 'plain-tabs', text: '简单风标签页',classPath:'tab.PlainTabs', leaf: true },
                    { id: 'framed-tabs', text: '基本标签页',classPath:'tab.FramedTabs', leaf: true },
                    { id: 'icon-tabs', text: '图标标签页',classPath:'tab.IconTabs', leaf: true },
                    { id: 'ajax-tabs', text: 'Ajax标签页',classPath:'tab.AjaxTabs', leaf: true },
                    { id: 'advanced-tabs', text: '增强标签页',classPath:'tab.AdvancedTabs', leaf: true },
                    { id: 'navigation-tabs', text: '导航标签页',classPath:'tab.NavigationTabs', leaf: true },
                    { id: 'side-navigation-tabs', text: '侧导航栏标签页',classPath:'tab.SideNavigationTabs', leaf: true },
                    { id: 'header-tabs', text: '标签位置设置',classPath:'tab.HeaderTabs', leaf: true },
                    { id: 'reorderable-tabs', text: '可拖拉标签页',classPath:'tab.ReorderableTabs', leaf: true }
                ]
            },{
            	text: 'MVVM模式',
              //  id: 'tabs',
                expanded: false
            },{
            	text: '类的机制',
              //  id: 'tabs',
                expanded: false
            },{
                text: '窗体Windows',
                id: 'windows',
                expanded: false,
                description: 'Windows are specialized panels, intended to be used as application windows. ' +
                             'Windows are floating, resizable, and draggable by default and can add an OS flair' +
                             'to your application.',
                children: [
                    { id: 'basic-window',classPath:'window.BasicWindow',text: '基础窗体', leaf: true },
                    { id: 'message-box', classPath:'window.MessageBox',text: '消息窗体', leaf: true }
                ]
            },
            {
                text: '按钮Buttons',
                id: 'buttons',
                expanded: false,
                description: 'Buttons are a utilitarian component of Gsui. From forms to grid row widgets, ' +
                             'they can be used in nearly any application for user interaction and directing usability.',
                children: [
                    { id: 'basic-buttons', text: '基本按钮', classPath:'button.BasicButtons', leaf: true },
                    { id: 'toggle-buttons', text: '切换按钮',classPath:'button.ToggleButtons', leaf: true },
                    { id: 'menu-buttons', text: '菜单按钮',classPath:'button.MenuButtons', leaf: true },
                    { id: 'menu-bottom-buttons', text: '底部菜单按钮',classPath:'button.MenuBottomButtons', leaf: true },
                    { id: 'split-buttons', text: '分离按钮', classPath:'button.SplitButtons',leaf: true },
                    { id: 'split-bottom-buttons', text: '底部分离按钮',classPath:'button.SplitBottomButtons', leaf: true },
                    { id: 'left-text-buttons', text: '左侧文本按钮',classPath:'button.LeftTextButtons', leaf: true },
                    { id: 'right-text-buttons', text: '右侧文本按钮',classPath:'button.RightTextButtons', leaf: true },
                    { id: 'link-buttons', text: '链接按钮',classPath:'button.LinkButtons', leaf: true },
                    { id: 'segmented-buttons', text: '分段按钮',classPath:'button.SegmentedButtons', leaf: true },
                    { id: 'vertical-segmented-buttons', text: '垂直分段按钮',classPath:'button.VerticalSegmentedButtons', leaf: true }
                ]
            },
            {
                text: '表单Forms',
                id: 'forms',
                expanded: false,
                description: 'Form Panel extends panel to offer developers the ability to manage data collection in a ' +
                             'simple and straightforward manner. Field display and handling can be configured in almost ' +
                             'any conceivable fashion and offers default objects to minimize repetitive code.',
                children: [
                    { id: 'form-login', text: '登录表单',classPath:'form.LoginForm', leaf: true },
                    { id: 'form-contact', text: '联系表单',classPath:'form.ContactForm', leaf: true },
                    { id: 'form-register', text: '注册表单',classPath:'form.RegisterForm', leaf: true  },
                    { id: 'form-checkout', text: '检验表单',classPath:'form.Checkout', leaf: true },
                   /* { id: 'form-color-picker', text: 'Color Picker',classPath:'form.ColorPicker', leaf: true},
                    { id: 'form-rating', text: 'Rating Form',classPath:'form.RatingForm', leaf: true},*/
                    { id: 'form-vboxlayout', text: '垂直布局',classPath:'form.VBoxLayoutForm', leaf: true },
                    { id: 'form-hboxlayout', text: '水平布局',classPath:'form.HBoxLayoutForm', leaf: true },
                    { id: 'form-multicolumn', text: '多列表单',classPath:'form.MultiColumn', leaf: true },
                   // { id: 'form-xml', text: 'XML Form',classPath:'form.XmlForm', leaf: true },
                    { id: 'form-advtypes', text: '自定义VTypes验证',classPath:'form.AdvancedVTypes', leaf: true },
                   // { id: 'form-customfields', text: 'Custom fields',classPath:'form.CustomFields', leaf: true },
                    { id: 'form-forumsearch', text: '第三方论坛搜索字段',classPath:'form.ForumSearch', leaf: true },
                    { id: 'form-customerrors', text: '自定义错误处理',classPath:'form.CustomErrorHandling', leaf: true }
                ]
            },
            {
                text: '布局Layouts',
                id: 'layouts',
                expanded: false,
                description: 'Layouts can be considered the heart and soul of Gsui. They manage the DOM flow and ' +
                             'display of your content. There are multiple layout options that should satisfy almost' +
                             'any application wireframe.',
                children: [
                    { id: 'layout-absolute', text: '绝对布局',classPath:'layout.Absolute', leaf: true },
                    { id: 'layout-accordion', text: '手风琴布局',classPath:'layout.Accordion', leaf: true },
                    { id: 'layout-border', text: '边界布局',classPath:'layout.Border', leaf: true },
                    { id: 'layout-card', text: '卡片布局',classPath:'layout.Card', leaf: true },
                    { id: 'layout-cardtabs', text: '卡片（选项卡）布局',classPath:'layout.CardTabs', leaf: true },
                    { id: 'layout-center', text: '中心布局',classPath:'layout.Center', leaf: true },
                    { id: 'layout-column', text: '列布局',classPath:'layout.Column', leaf: true },
                    { id: 'layout-fit', text: '自适应布局',classPath:'layout.Fit', leaf: true },
                    { id: 'layout-horizontal-box', text: '水平布局',classPath:'layout.HorizontalBox', leaf: true },
                    { id: 'layout-table', text: '表格布局',classPath:'layout.Table', leaf: true },
                    { id: 'layout-vertical-box', text: '垂直布局',classPath:'layout.VerticalBox', leaf: true }
                ]
            }, {
                text: '报表Charts',
                id: 'charts',
                expanded: false,
                children: [
                   {
		                text: '柱状图',
		                id: 'column-charts',
		                expanded: false,
		                children: [
		                    { id: 'column-basic', text: '基本柱状图',classPath : 'charts.column.Basic', leaf: true },
		                    { id: 'column-stacked', text: '堆叠柱状图',classPath : 'charts.column.Stacked', leaf: true },
		                    { id: 'column-stacked-100', text: '100%堆叠柱状图',classPath : 'charts.column.Stacked100', leaf: true },
		                    { id: 'column-renderer', text: 'With Renderer',classPath : 'charts.column.Renderer', leaf: true },
		                    { id: 'column-multi-axis', text: 'Multiaxis',classPath : 'charts.column.MultiAxis', leaf: true }
		                ]
		            },
		            {
		                text: '3D柱状图',
		                id: 'column-charts-3d',
		                expanded: false,
		                children: [
		                    { id: 'column-basic-3d', text: '基本3D柱状图',classPath : 'charts.column3d.Basic', leaf: true },
		                    { id: 'column-grouped-3d', text: '分组3D柱状图',classPath : 'charts.column3d.Grouped', leaf: true },
		                    { id: 'column-stacked-3d', text: '3D堆叠柱状图',classPath : 'charts.column3d.Stacked', leaf: true },
		                    { id: 'column-stacked-100-3d', text: '100%堆叠柱状图',classPath : 'charts.column3d.Stacked100', leaf: true },
		                    { id: 'column-negative-3d', text: 'Negative values',classPath : 'charts.column3d.Negative', leaf: true },
		                    { id: 'column-renderer-3d', text: 'With Renderer',classPath : 'charts.column3d.Renderer', leaf: true }
		                ]
		            },
		            {
		                text: '条状图',
		                id: 'bar-charts',
		                expanded: false,
		                description: 'Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
		                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
		                             'that allows for quick generalizations regarding your data.',
		                children: [
		                    { id: 'bar-basic', text: '基本条状图',classPath : 'charts.bar.Basic', leaf: true },
		                    { id: 'bar-stacked', text: '堆叠条状图',classPath : 'charts.bar.Stacked', leaf: true },
		                    { id: 'bar-stacked-100', text: '100%堆叠条状图',classPath : 'charts.bar.Stacked100', leaf: true }
		                ]
		            },
		            {
		                text: '3D条状图',
		                id: 'bar-charts-3d',
		                expanded: false,
		                description: '3D Bar charts provide a visual comparison of numbers or frequency against different discrete ' +
		                             'categories or groups. These charts display horizontal bars to represent information in a way + ' +
		                             'that allows for quick generalizations regarding your data.',
		                children: [
		                    { id: 'bar-basic-3d', text: '基本3D条状图',classPath : 'charts.bar3d.Basic', leaf: true },
		                    { id: 'bar-stacked-3d', text: '堆叠3D条状图',classPath : 'charts.bar3d.Stacked', leaf: true },
		                    { id: 'bar-stacked-100-3d', text: '100%堆叠3D条状图',classPath : 'charts.bar3d.Stacked100', leaf: true },
		                    { id: 'bar-negative-3d', text: '负值3D条状图',classPath : 'charts.bar3d.Negative', leaf: true }
		                ]
		            },
		            {
		                text: '线状图',
		                id: 'line-charts',
		                expanded: false,
		                description: 'Line charts display information as a series of markers that are connected by lines.' +
		                             'These charts are excellent for showing underlying patterns between data points.',
		                children: [
		                    { id: 'line-basic', text: '基础线状图',classPath : 'charts.line.Basic', leaf: true },
		                    { id: 'line-marked', text: '线状图 + 标记',classPath : 'charts.line.Marked', leaf: true },
		                    { id: 'line-spline', text: '曲线图',classPath : 'charts.line.Spline', leaf: true },
		                    { id: 'line-marked-spline', text: '曲线图 + 标记',classPath : 'charts.line.MarkedSpline', leaf: true },
		                    { id: 'line-plot', text: 'Plot',classPath : 'charts.line.Plot', leaf: true },
		                    { id: 'line-crosszoom', text: '最放大的线状图',classPath : 'charts.line.CrossZoom', leaf: true },
		                    { id: 'line-renderer', text: '自定义渲染线状图',classPath : 'charts.line.Renderer', leaf: true }
		                ]
		            },
		            {
		                text: '区域图',
		                id: 'area-charts',
		                expanded: false,
		                children: [
		                    { id: 'area-basic', text: '基础区域图',classPath : 'charts.area.Basic', leaf: true },
		                    { id: 'area-stacked', text: '堆叠区域图',classPath : 'charts.area.Stacked', leaf: true },
		                    { id: 'area-stacked-100', text: '100%堆叠区域图',classPath : 'charts.area.Stacked100', leaf: true },
		                    { id: 'area-negative', text: '负值区域图',classPath : 'charts.area.Negative', leaf: true }
		                ]
		            },
		            {
		                text: '散点图',
		                id: 'scatter-charts',
		                expanded: false,
		                children: [
		                    { id: 'scatter-basic', text: '基础散点图',classPath : 'charts.scatter.Basic', leaf: true },
		                    { id: 'scatter-custom-icons', text: '自定义图标散点图',classPath : 'charts.scatter.CustomIcons', leaf: true },
		                    { id: 'scatter-bubble', text: '泡泡图标散点图',classPath : 'charts.scatter.Bubble', leaf: true }
		                ]
		            },
		            {
		                text: '饼图',
		                id: 'pie-charts',
		                expanded: false,
		                children: [
		                    { id: 'pie-basic', text: '基础饼图',classPath : 'charts.pie.Basic', leaf: true },
		                    { id: 'pie-custom', text: 'Spie图',classPath : 'charts.pie.Custom', leaf: true },
		                    { id: 'pie-donut', text: '环状图',classPath : 'charts.pie.Donut', leaf: true },
		                    { id: 'pie-3d', text: '3D饼图',classPath : 'charts.pie.Pie3D', leaf: true }
		                ]
		            },
		            {
		                text: '径向图',
		                id: 'radial-charts',
		                expanded: false,
		                children: [
		                    { id: 'radial-basic', text: '基础径向图',classPath : 'charts.radial.Basic', leaf: true },
		                    { id: 'radial-filled', text: '填充径向图',classPath : 'charts.radial.Filled', leaf: true },
		                    { id: 'radial-marked', text: '标记径向图',classPath : 'charts.radial.Marked', leaf: true },
		                    { id: 'radial-multi-axis', text: '多轴径向图',classPath : 'charts.radial.MultiAxis', leaf: true }
		                ]
		            },
		            {
		                text: '仪表图',
		                id: 'guage-charts',
		                expanded: false,
		                children: [
		                    { id: 'gauge-basic', text: '基础仪表图',classPath : 'charts.gauge.Basic', leaf: true }
		                ]
		            },
		            {
		                text: '组合图',
		                id: 'combination-charts',
		                expanded: false,
		                children: combinationExamples = [
		                    { id: 'combination-pareto', text: 'Pareto',classPath : 'charts.combination.Pareto',leaf: true },
		                    { id: 'combination-dashboard', text: 'Interactive Dashboard',classPath : 'charts.combination.Dashboard', leaf: true },
		                    { id: 'unemployment', text: 'Infographic',classPath : 'charts.combination.Unemployment', leaf: true },
		                    { id: 'combination-theme', text: 'Custom Theme',classPath : 'charts.combination.CustomTheme', leaf: true },
		                    { id: 'combination-bindingtabs', text: 'Binding & Tabs',classPath : 'charts.combination.BindingTabs', leaf: true}
		                ]
		            },
		            {
		                text: '画图',
		                id: 'drawing',
		                expanded: false,
		                children: [
		                    { id: 'free-paint', text: '自由画图',classPath : 'draw.FreeDraw', leaf: true },
		                    { id: 'hit-test', text: '点击测试',classPath : 'draw.HitTest', leaf: true },
		                    { id: 'intersections', text: '路径交点',classPath : 'draw.Intersections', leaf: true },
		                    { id: 'draw-composite', text: '组合',classPath : 'draw.Composite', leaf: true }
		                ]
		            }
                ]
            }
         /*   {
                text: 'Grids',
                id: 'grids',
                expanded: false,
                description: 'Grids are one of the centerpieces of Gsui. They are incredibly versatile components ' +
                             'that provide an easy path to display, sort, group, and edit data. These examples show a ' +
                             'number of the most often used grids in Gsui.',
                children: [
                    { id: 'array-grid', text: 'Array Grid',classPath:'grid.ArrayGrid', leaf: true },
                    { id: 'grouped-grid', text: 'Grouped Grid', leaf: true },
                    { id: 'locking-grid', text: 'Locking Grid', leaf: true },
                    { id: 'grouped-header-grid', text: 'Grouped Header Grid', leaf: true },
                    { id: 'multi-sort-grid', text: 'Multiple Sort Grid', leaf: true },
                    { id: 'spreadsheet', text: 'Spreadsheet with locking', leaf: true},
                    { id: 'spreadsheet-checked', text: 'Spreadsheet with Checked Rows', leaf: true },
                    { id: 'progress-bar-pager', text: 'Progress Bar Pager', leaf: true },
                    { id: 'sliding-pager', text: 'Sliding Pager', leaf: true },
                    { id: 'xml-grid', text: 'XML Grid', leaf: true },
                    { id: 'paging-grid', text: 'Paging', leaf: true },
                    {
                        id: 'grid-plugins',
                        expanded: false,
                        text: 'Grid Plugins',
                        leaf: false,
                        description: 'Grid panels can extend their functionality with the use of our Grid Plugins. ' +
                                     'Our plugins offer various accoutrements to basic Grid functionality, such as ' +
                                     'row numbering, row expanding, and checkbox selection models.',
                        children: [
                            {id: 'expander-lockable', text: 'Row Expander, lockable columns', leaf: true },
                            {id: 'checkbox-selection', text: 'Checkbox Selection Model', leaf: true },
                            {id: 'row-numberer', text: 'Row Numberer', leaf: true },
                            {id: 'framing-buttons', text: 'Framed with docked toolbars', leaf: true }
                        ]
                    },
                    { id: 'grid-filtering', text: 'Grid Filtering', leaf: true },
                    { id: 'reconfigure-grid', text: 'Reconfigure Grid', leaf: true },
                    { id: 'property-grid', text: 'Property Grid', leaf: true },
                    { id: 'cell-editing', text: 'Cell Editing', leaf: true },
                    { id: 'row-expander-grid', text: 'Row Expander', leaf: true },
                    { id: 'big-data-grid', text: 'Big Data', leaf: true },
                    { id: 'widget-grid', text: 'Widget grid', leaf: true },
                    { id: 'customer-grid', text: 'Customer/Order grid', leaf: true }
                ]
            },
            {
                text: 'Data Binding',
                id: 'data-binding',
                expanded: false,
                description: 'Data binding, and the ViewModel that powers it, are powerful pieces of Gsui 5. ' +
                             'Together, they enable you to create a seamless connection between your application UI ' +
                             'and your business logic.',
                children: [
                    { id: 'binding-hello-world', text: 'Hello World', leaf: true },
                    { id: 'binding-dynamic', text: 'Dynamic', leaf: true },
                    { id: 'binding-two-way', text: 'Two Way', leaf: true },
                    { id: 'binding-formulas', text: 'Formulas', leaf: true },
                    { id: 'binding-associations', text: 'Associations', leaf: true },
                    { id: 'binding-component-state', text: 'Component State', leaf: true },
                    { id: 'binding-chained-stores', text: 'Chaining Stores', leaf: true},
                    { id: 'binding-combo-chaining', text: 'Chained ComboBoxes', leaf: true },
                    { id: 'binding-selection', text: 'Chaining Selection', leaf: true },
//                    { id: 'binding-gridform', text: 'Grid + Form', leaf: true },
                    { id: 'binding-model-validation', text: 'Model Validation', leaf: true },
                    { id: 'binding-field-validation', text: 'Field Validation', leaf: true },
                    { id: 'binding-two-way-formulas', text: 'Two-Way Formulas', leaf: true },
                    { id: 'binding-slider-form', text: 'Slider and Form Fields', leaf: true },
                    { id: 'binding-child-session', text: 'Isolated Child Sessions', leaf: true }
                ]
            },
            {
                text: 'Trees',
                id: 'trees',
                expanded: false,
                description: 'Tree Panels provide a tree-structured UI representation of tree-structured data.' +
                             'Tree Panel\'s built-in expand/collapse nodes offer a whole new set of opportunities' +
                             'for user interface and data display.',
                children: [
                    { id: 'basic-trees', text: 'Basic Trees', leaf: true },
                    { id: 'tree-reorder', text: 'Tree Reorder', leaf: true },
                    { id: 'tree-grid', text: 'Tree Grid', leaf: true },
                    { id: 'tree-two', text: 'Two Trees', leaf: true },
                    { id: 'check-tree', text: 'Check Tree', leaf: true },
                    { id: 'tree-xml', text: 'XML Tree', leaf: true },
                    { id: 'filtered-tree', text: 'Filtered Tree', leaf: true },
                    { id: 'heterogeneous-tree', text: 'Heterogeneous Tree', leaf: true },
                    { id: 'lineardata-tree', text: 'Linear Data Geographical Tree', leaf: true }
                ]
            },
            {
                text: 'Tabs',
                id: 'tabs',
                expanded: false,
                description: 'Tab Panels are panels that have extended support for containing and displaying children ' +
                             'items. These children are managed using a Card Layout and are shown as tabulated content.',
                children: [
                    { id: 'basic-tabs', text: 'Basic Tabs', leaf: true },
                    { id: 'plain-tabs', text: 'Plain Tabs', leaf: true },
                    { id: 'framed-tabs', text: 'Framed Tabs', leaf: true },
                    { id: 'icon-tabs', text: 'Icon Tabs', leaf: true },
                    { id: 'ajax-tabs', text: 'Ajax Tabs', leaf: true },
                    { id: 'advanced-tabs', text: 'Advanced Tabs', leaf: true },
                    { id: 'navigation-tabs', text: 'Navigation Tabs', leaf: true },
                    { id: 'side-navigation-tabs', text: 'Side Navigation Tabs', leaf: true },
                    { id: 'header-tabs', text: 'Header Tabs', leaf: true },
                    { id: 'reorderable-tabs', text: 'Reorderable Tabs', leaf: true }
                ]
            },
            {
                text: 'Windows',
                id: 'windows',
                expanded: false,
                description: 'Windows are specialized panels, intended to be used as application windows. ' +
                             'Windows are floating, resizable, and draggable by default and can add an OS flair' +
                             'to your application.',
                children: [
                    { id: 'basic-window', text: 'Basic Window', leaf: true },
                    { id: 'message-box', text: 'Message Box', leaf: true }
                ]
            },
            {
                text: 'Buttons',
                id: 'buttons',
                expanded: false,
                description: 'Buttons are a utilitarian component of Gsui. From forms to grid row widgets, ' +
                             'they can be used in nearly any application for user interaction and directing usability.',
                children: [
                    { id: 'basic-buttons', text: 'Basic Buttons', leaf: true },
                    { id: 'toggle-buttons', text: 'Toggle Buttons', leaf: true },
                    { id: 'menu-buttons', text: 'Menu Buttons', leaf: true },
                    { id: 'menu-bottom-buttons', text: 'Menu Bottom Buttons', leaf: true },
                    { id: 'split-buttons', text: 'Split Buttons', leaf: true },
                    { id: 'split-bottom-buttons', text: 'Split Bottom Buttons', leaf: true },
                    { id: 'left-text-buttons', text: 'Left Text Buttons', leaf: true },
                    { id: 'right-text-buttons', text: 'Right Text Buttons', leaf: true },
                    { id: 'link-buttons', text: 'Link Buttons', leaf: true },
                    { id: 'segmented-buttons', text: 'Segmented Buttons', leaf: true },
                    { id: 'vertical-segmented-buttons', text: 'Vertical Segmented Buttons', leaf: true }
                ]
            },
            {
                text: 'DataView',
                id: 'data-view',
                expanded: false,
                description: 'Dataviews are an XTemplate based mechanism for displaying data using custom layout' +
                             'templates and formatting. They can connect to any store and display data in any way' +
                             'you see fit.',
                children: [
                    { id: 'dataview-multisort', text: 'Multisort DataView', leaf: true }
                ]
            },
            {
                text: 'Form Fields',
                id: 'form-fields',
                expanded: false,
                description: 'Form Fields offer developers standard HTML form fields with built-in event handling, ' +
                             'rendering, and other common functionality you may require. Variations of fields include: ' +
                             'textfields, textareas, htmleditors, radio groups, checkboxes, and more!',
                children: [
                    { id: 'form-number', text: 'Number Field', leaf: true },
                    { id: 'form-date', text: 'Date/Month Picker', leaf: true },
                    {
                        id: 'combo-boxes',
                        expanded: false,
                        text: 'ComboBoxes',
                        leaf: false,
                        description: 'These examples demonstrate that ComboBoxes can use any type of ' +
                                'Gsui.data.Store as a data souce. This means your data can be XML, JSON, '+
                                'arrays or any other supported format. It can be loaded using Ajax, JSONP or locally.',
                        children: [
                            {id: 'simple-combo', text: 'Simple ComboBox', leaf: true },
                            {id: 'remote-combo', text: 'Remote Query ComboBox', leaf: true },
                            {id: 'remote-loaded-combo', text: 'Remote loaded ComboBox', leaf: true },
                            {id: 'custom-template-combo', text: 'Custom Template ComboBox', leaf: true }
                        ]
                    },
                    { id: 'form-fileuploads', text: 'File Uploads', leaf: true },
                    { id: 'form-fieldreplicator', text: 'Field Replicator', leaf: true },
                    { id: 'form-grid', text: 'Form with Grid', leaf: true },
                    { id: 'form-tag', text: 'Tag Field', leaf: true },
                    { id: 'multi-selector', text: 'Multi-Selector Grid', leaf: true },
                    { id: 'form-fieldtypes', text: 'Field Types', leaf: true},
                    { id: 'form-fieldcontainer', text: 'Field Container', leaf: true},
                    { id: 'form-checkboxgroup', text: 'Checkbox Groups', leaf: true },
                    { id: 'form-radiogroup', text: 'Radio Groups', leaf: true },
                    { id: 'slider-field', text: 'Slider Field', leaf: true }
                ]
            },
            {
                text: 'Forms',
                id: 'forms',
                expanded: false,
                description: 'Form Panel extends panel to offer developers the ability to manage data collection in a ' +
                             'simple and straightforward manner. Field display and handling can be configured in almost ' +
                             'any conceivable fashion and offers default objects to minimize repetitive code.',
                children: [
                    { id: 'form-login', text: 'Login Form', leaf: true },
                    { id: 'form-contact', text: 'Contact Form', leaf: true },
                    { id: 'form-register', text: 'Register Form', leaf: true  },
                    { id: 'form-checkout', text: 'Checkout Form', leaf: true },
                    { id: 'form-color-picker', text: 'Color Picker', leaf: true},
                    { id: 'form-rating', text: 'Rating Form', leaf: true},
                    { id: 'form-vboxlayout', text: 'VBox Layout', leaf: true },
                    { id: 'form-hboxlayout', text: 'HBox Layout', leaf: true },
                    { id: 'form-multicolumn', text: 'Multi Column Form', leaf: true },
                    { id: 'form-xml', text: 'XML Form', leaf: true },
                    { id: 'form-advtypes', text: 'Custom VTypes', leaf: true },
                    { id: 'form-customfields', text: 'Custom fields', leaf: true },
                    { id: 'form-forumsearch', text: 'Forum Search', leaf: true },
                    { id: 'form-customerrors', text: 'Custom Error Handling', leaf: true }
                ]
            },
            {
                text: 'Toolbars',
                id: 'toolbars',
                expanded: false,
                description: 'Toolbars are easily customizable components that give developers a simple way to display ' +
                             'a variety of user interfaces.',
                children: [
                    { id: 'basic-toolbar', text: 'Basic Toolbar', leaf: true },
                    { id: 'docked-toolbars', text: 'Docked Toolbar', leaf: true },
                    { id: 'breadcrumb-toolbar', text: 'Breadcrumb Toolbar', leaf: true }
                ]
            },
            {
                text: 'Layouts',
                id: 'layouts',
                expanded: false,
                description: 'Layouts can be considered the heart and soul of Gsui. They manage the DOM flow and ' +
                             'display of your content. There are multiple layout options that should satisfy almost' +
                             'any application wireframe.',
                children: [
                    { id: 'layout-absolute', text: 'Absolute Layout', leaf: true },
                    { id: 'layout-accordion', text: 'Accordion Layout', leaf: true },
                    { id: 'layout-border', text: 'Border Layout', leaf: true },
                    { id: 'layout-card', text: 'Card Layout', leaf: true },
                    { id: 'layout-cardtabs', text: 'Card (Tabs)', leaf: true },
                    { id: 'layout-center', text: 'Center Layout', leaf: true },
                    { id: 'layout-column', text: 'Column Layout', leaf: true },
                    { id: 'layout-fit', text: 'Fit Layout', leaf: true },
                    { id: 'layout-horizontal-box', text: 'HBox Layout', leaf: true },
                    { id: 'layout-table', text: 'Table Layout', leaf: true },
                    { id: 'layout-vertical-box', text: 'VBox Layout', leaf: true }
                ]
            },
            {
                text: 'Drag & Drop',
                id: 'drag-drop',
                expanded: false,
                description: 'Drag and Drop functionality gives developers the ability to create interesting ' +
                             'and useful interfaces for their users.',
                children: [
                    { id: 'dd-field-to-grid', text: 'Field to Grid', leaf: true },
                    { id: 'dd-grid-to-form', text: 'Grid to Form', leaf: true },
                    { id: 'dd-grid-to-grid', text: 'Grid to Grid', leaf: true }
                ]
            },
            {
                text: 'Ext Direct',
                id: 'direct',
                expanded: false,
                description: 'Ext Direct streamlines communication between the client and server by providing a single ' +
                             'interface that reduces much of the common code required to validate and handle data.',
                children: [
                    { id: 'direct-grid', text: 'Grid with Direct store', leaf: true },
                    { id: 'direct-tree', text: 'Tree with dynamic nodes', leaf: true },
                    { id: 'direct-form', text: 'Form load and submit actions', leaf: true },
                    { id: 'direct-generic', text: 'Generic remoting and polling', leaf: true },
                    { id: 'direct-named', text: 'Custom form processing', leaf: true }
                ]
            },
            {
                text: 'Enterprise',
                id: 'enterprise',
                description: 'Our Enterprise tools offer developers the ability to easily utilize data interfaces such' +
                             'as SOAP and AMF. These enterprise tools are available via our Sencha Complete package.',
                expanded: false,
                children: [
                    { id: 'amf-grid', text: 'AMF Grid', leaf: true },
                    { id: 'soap-grid', text: 'Soap Grid', leaf: true }
                ]
            }*/
        ]);
    }
});
