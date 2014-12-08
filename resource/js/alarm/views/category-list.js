define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'page-history',
    'alarm/collections/category',
    'alarm/views/item-list-page'
], function(_, $, deferred, Backbone, pageHistory, CategoryCollection, ItemListPageView) {
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
            'click .cat-item': 'navigateToItemListPage'
        },
        navigateToItemListPage: function(event) {
            var itemListPageView,
                id = $(event.target).closest('.list-item').data('id'),
                cacheId = 'ItemListPageView_' + id,
                caterogyModel = this.collection.get(id);

            // 从历史记录查找，或者new
            if (!(itemListPageView = pageHistory.get(cacheId))) {
                itemListPageView = new ItemListPageView({
                    caterogyModel: caterogyModel
                });
            }

            pageHistory.push(cacheId, itemListPageView);
        }
    });

    return CategoryListView;
});
