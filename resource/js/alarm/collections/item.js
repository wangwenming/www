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
        cacheTTL: 1800,
        url: function() {
            return config.url('/remind/getTypeDatalist', {
                typeId: this.categoryModel.get('id'),
                start: 0,
                count: 10
            });
        },
        setCategoryModel: function(categoryModel) {
            this.categoryModel = categoryModel;
            this.cacheKey = 'collections/item_' + this.categoryModel.get('id');
        },
        parse: function(response) {
            if (response.error !== 0) {
                return [];
            }

            return response.data;
        }
    });

    return ItemCollection;
});
