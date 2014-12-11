define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/config',
    'alarm/models/item',
], function(_, $, deferred, Backbone, config, ItemModel) {
    var ItemCollection = Backbone.Collection.extend({
        model: ItemModel,
        cacheTTL: 1800,
        initialize: function() {
            this.on('change', function() {
                var self = this,
                    obj = localStorage.getItem(this.cacheKey);
                if (obj) {
                    obj = JSON.parse(obj);
                    obj.time = +new Date;
                    obj.data.data = self.toJSON();
                    localStorage.setItem(this.cacheKey, JSON.stringify(obj));
                }
            });
        },
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
