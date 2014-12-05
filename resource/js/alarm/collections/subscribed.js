define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/config',
    'alarm/models/subscribed'
], function(_, $, deferred, Backbone, config, SubscribedModel) {
    var SubscribedCollection = Backbone.Collection.extend({
        model: SubscribedModel,
        url: function () {
            return config.url('/remind/getHistory');
        },
        parse: function(response) {
            if (response.error !== 0) {
                return [];
            }
            return response.data;
        }
    });

    return SubscribedCollection;
});
