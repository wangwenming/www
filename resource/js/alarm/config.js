define([
    'underscore',
    'zepto'
], function(_, $) {
    var HOST = 'http://10.16.29.96',
        USRE_ID = window.MyContent ? MyContent.getWid() : '6e07b8ae636071e379a29f297b6d47d1';
    var config = {
        url: function(path, params) {
            return HOST + path + '?' + $.param(_.extend({userId: USRE_ID}, params));
        }
    };

    return config;
});
