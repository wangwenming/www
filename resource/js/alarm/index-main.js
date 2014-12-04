require.config({
    baseUrl: '/resource/js',
    paths: {
        underscore: 'lib/underscore',
        zepto: 'lib/zepto',
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
        }
    }
});
require(['alarm/index']);