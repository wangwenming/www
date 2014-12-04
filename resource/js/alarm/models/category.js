define([
    'underscore',
    'zepto',
    'deferred',
    'backbone'
// deferred is undefined
], function(_, $, deferred, Backbone) {
    var CategoryModel = Backbone.Model.extend({
        defaults: {
            id: 0,
            name: '',
            title: '更新时提醒',
            icon: ''
        }
    });

    return CategoryModel;
});
