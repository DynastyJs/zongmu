Gsui.define('Demo.data.Employees', {
    requires: [
        'Demo.data.Init'
    ]
}, function() {
    var firstNames = ['Ben', 'Don', 'Evan', 'Kevin', 'Nige', 'Phil', 'Ross', 'Ryan'],
        lastNames = ['Toll', 'Griffin', 'Trimboli', 'Krohe', 'White', 'Guerrant', 'Gerbasi', 'Smith'],
        data = [],
        rand = 37,
        map, i, j, k, s;

    for (i = 0; i < lastNames.length; ++i) {
        map = {};
        data.push({
            forename: (s = firstNames[i]),
            surname: lastNames[i]
        });
        map[s] = 1;

        for (j = 0; j < 3; ++j) {
            do {
                k = rand % firstNames.length;
                rand = rand * 1664525 + 1013904223; // basic LCG but repeatable
                rand &= 0x7FFFFFFF;
            } while (map[s = firstNames[k]]);

            map[s] = 1;
            data.push({
                forename: s,
                surname: lastNames[i]
            });
        }
    }

    Gsui.ux.ajax.SimManager.register({
        '/Demo/Employees': {
			type: 'json',
			data: data
        }
    });
});
