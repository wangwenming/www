require.config({
    baseUrl: 'resource/js',
    paths: {
        underscore: 'lib/underscore',
        zepto: 'lib/zepto',
        zeptoHistory: 'lib/zepto.history',
        deferred: 'lib/deferred',
        callbacks: 'lib/callbacks',
        backbone: 'lib/backbone'
    },
    shim: {
        zepto: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        deferred: {
            deps: ['callbacks']
        },
        callbacks: {
            deps: ['zepto']
        },
        backbone: {
            deps: ['underscore', 'deferred']
        },
        zeptoHistory: {
            deps: ['zepto']
        }
    }
});

require(['alarm/index']);
