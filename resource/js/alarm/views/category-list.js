define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/category',
    'alarm/views/item-list-page'
], function(_, $, deferred, Backbone, CategoryCollection, ItemListPageView) {
    var categoryListTpl = $('#tpl-cat-item').html();
    var CategoryListView = Backbone.View.extend({
        el: $('#index-cat-list'),
        initialize: function(options) {
            this.collection = new CategoryCollection();
            this.pageView = options.pageView;
        },
        bootstrap: function() {
            var self = this;

            $.when(this.collection.fetch()).done(function() {
                self.render();
            });
        },
        render: function() {
            var compiled = _.template(categoryListTpl),
                html = compiled({
                    categoryCollection: this.collection
                });
            this.$el.html(html);
        },
        events: {
            'click .cat-item': 'navigateToItemList'
        },
        navigateToItemList: function(event) {
            var id = $(event.target).closest('.list-item').data('id'),
                caterogyModel = this.collection.get(id),
                itemListPageView = new ItemListPageView({
                    caterogyModel: caterogyModel,
                    prevPageView: this.pageView
                });

            this.pageView.$el.hide();
        }
    });

    return CategoryListView;
});
