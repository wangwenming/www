define([
    'underscore',
    'zepto'
], function(_, $) {
    var HOST = 'http://10.16.29.96',
        USRE_ID = window.MyContent ? MyContent.getWid() : '';

    if (!USRE_ID) {
        USRE_ID = localStorage.getItem('uid');
    }
    if (!USRE_ID) {
        USRE_ID = +new Date;
        localStorage.setItem('uid', USRE_ID);
    }

    var config = {
        url: function(path, params) {
            return HOST + path + '?' + $.param(_.extend({userId: USRE_ID}, params));
        }
    };

    return config;
});
