define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/config',
    'alarm/models/item'
], function(_, $, deferred, Backbone, config, ItemModel) {
    var SubscriptionCollection = Backbone.Collection.extend({
        model: ItemModel,
        cacheKey: 'collections/subscription',
        cacheTTL: 10,
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
