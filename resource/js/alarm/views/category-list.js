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
        $loading: $('.loading'),
        initialize: function(options) {
            this.collection = new CategoryCollection();
        },
        setPageView: function(pageView) {
            this.pageView = pageView;
        },
        bootstrap: function() {
            var self = this,
                deferred = $.Deferred();

            $.when(this.collection.fetch()).done(function() {
                deferred.resolve();
                self.render();
            });

            return deferred;
        },
        render: function() {
            var compiled = _.template(categoryListTpl),
                html = compiled({
                    categoryCollection: this.collection
                });
            this.$el.html(html);
            this.$loading.hide();
        },
        events: {
            'click .cat-item': 'navigateToItemListPage'
        },
        navigateToItemListPage: function(event) {
            var id = $(event.target).closest('.list-item').data('id'),
                itemListPageView = new ItemListPageView.getInstance();

            this.$loading.show();
            itemListPageView.setCategoryModel(this.collection.get(id));
            itemListPageView.bootstrap();
            itemListPageView.render();

            this.pageView.$el.removeClass('active');
        }
    });

    var instance;
    function getInstance() {
        if (!instance) {
            instance = new CategoryListView();
        }

        return instance;
    };

    return {
        getInstance: getInstance
    };
});
