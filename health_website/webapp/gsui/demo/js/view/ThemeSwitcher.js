Gsui.define('Demo.view.ThemeSwitcher', function() {
    var theme = location.href.match(/theme=([\w-]+)/),
        locale = location.href.match(/locale=([\w-]+)/);

    //theme = (theme && theme[1]) || (Gsui.microloaderTags.desktop ? 'crisp' : 'crisp-touch');
    theme = 'neptune';
    locale = locale && locale[1] || 'en';

    if (!Gsui.themeName && !!theme) {
        var m = theme.match(/^([\w-]+)-(?:he)$/);
        Gsui.themeName = m ? m[1] : theme;
    }

    return {
        extend: 'Gsui.Container',
        xtype: 'themeSwitcher',
        id: 'theme-switcher-btn',
        margin: '0 10 0 0',
        layout: 'hbox',

        initComponent: function() {
            function setQueryParam(name, value) {
                var query = Gsui.Object.fromQueryString(location.search);
                query[name] = value;
                location.search = Gsui.Object.toQueryString(query);
            }

            function makeItem(value, text, paramName) {
                paramName = paramName || "theme";

                var checked = value === (paramName == "theme" ? theme : locale);

                return {
                    text: text,
                    group: (paramName == 'theme' ? 'themegroup' : 'localegroup'),
                    checked: checked,
                    handler: function () {
                        if (!checked) {
                            if(paramName == 'theme') {
                                setQueryParam('theme', value);
                            } else {
                                setQueryParam('locale', value);
                            }
                        }
                    }
                };
            }

            var menu = new Gsui.menu.Menu({
                    items: [
                        makeItem('neptune',       'Neptune'),
                        makeItem('neptune-touch', 'Neptune Touch'),
                        makeItem('crisp',         'Crisp'),
                        makeItem('crisp-touch',   'Crisp Touch'),
                        makeItem('classic',       'Classic'),
                        makeItem('gray',          'Gray'),
                        '-',
                        makeItem('en',            'English',    'locale'),
                        makeItem('he',            'Hebrew',     'locale')
                    ]
                });

            this.items = [{
                    xtype: 'component',
                    id: 'theme-switcher',
                    cls: 'ks-theme-switcher',
                    margin: '0 5 0 0',
                    listeners: {
                        scope: this,
                        click: function (e) {
                            menu.showBy(this);
                        },
                        element: 'el'
                    }
                }];

            this.callParent();
        }
    };
});
