define([
    'underscore',
    'zepto',
    'deferred',
    'backbone'
// deferred is undefined
], function(_, $, deferred, Backbone) {
    // console.log(_.first([5, 4, 3, 2, 1]));
    // console.log(deferred, Backbone);

    var CategoryModel = Backbone.Model.extend({
        //urlRoot: 'http://z.i.so.com/remind',
        defaults: {
            id: 0,
            name: '',
            title: '更新时提醒',
            icon: ''
        }
    });

    return CategoryModel;
});
