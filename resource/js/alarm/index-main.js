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

if (wid) {
    require(['alarm/index']);
} else {
    window.setWid = function(v) {
        window.wid = v;
        require(['alarm/index']);
    }
}
// 调试，3秒后测试的wid
setTimeout(function() {
    alert('no wid');
    setWid('test');
}, 3000);
