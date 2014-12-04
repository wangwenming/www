define([
    'underscore',
    'zepto'
], function(_, $) {
    var HOST = 'http://10.16.29.96',
        USRE_ID = window.wid;
    var config = {
        url: function(path, params) {
            return HOST + path + '?' + $.param(_.extend({userId: USRE_ID}, params));
        }
    };

    return config;
});
