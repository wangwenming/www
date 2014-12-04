define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/models/alarm'
], function(_, $, deferred, Backbone, AlarmModel) {
    var AlarmCollection = Backbone.Collection.extend({
        model: AlarmModel
    });

    return AlarmCollection;
});
