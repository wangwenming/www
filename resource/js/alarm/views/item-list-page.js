define([
    'exports',
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/home-page',
    'alarm/views/item-list'
], function(exports, _, $, deferred, Backbone, HomePageView, ItemListView) {
    var ItemListPageView = Backbone.View.extend({
        el: $('#page-item-list'),
        initialize: function() {
            this.itemListView = ItemListView.getInstance();
            this.itemListView.setPageView(this);
        },
        setCategoryModel: function(categoryModel) {
            this.categoryModel = categoryModel;
            this.itemListView.setCategoryModel(categoryModel);
        },
        bootstrap: function() {
            return this.itemListView.bootstrap();
        },
        render: function() {
            this.$el.addClass('active');
            this.$el.find('.hd h2').text(this.categoryModel.get('name'));
        },
        events: {
            'click .back': 'back'
        },
        back: function() {
            var homePageView = HomePageView.getInstance();
            homePageView.bootstrap();
            homePageView.render();

            this.$el.removeClass('active');
        }
    });

    var instance;
    exports.getInstance = function() {
        if (!instance) {
            instance = new ItemListPageView();
        }

        return instance;
    };
});
