define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/config',
    'alarm/models/subscription'
], function(_, $, deferred, Backbone, config, SubscriptionModel) {
    var SubscriptionCollection = Backbone.Collection.extend({
        model: SubscriptionModel,
        url: function () {
            return config.url('/remind/getMyRemind');
        },
        parse: function(response) {
            if (response.error !== 0) {
                return [];
            }
            return response.data;
        }
    });

    return SubscriptionCollection;
});
