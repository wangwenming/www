define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/config',
    'alarm/models/item'
], function(_, $, deferred, Backbone, config, ItemModel) {
    var ItemCollection = Backbone.Collection.extend({
        model: ItemModel,
        url: function() {
            return config.url('/remind/getTypeDatalist', {
                typeId: this.caterogyModel.get('id'),
                start: 0,
                count: 10
            });
        },
        initialize: function(options) {
            this.caterogyModel = options.caterogyModel;
        },
        parse: function(response) {
            if (response.error != 0) {
                return [];
            }

            return response.data;
        }
    });

    return ItemCollection;
});