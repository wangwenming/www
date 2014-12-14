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
            /*var hash = location.hash;
            if (!/#item/g.test(hash)) {
                location.hash = '#item?id=' + this.categoryModel.id;
            }*/
            this.$el.addClass('active');
            this.$el.find('.hd h2').text(this.categoryModel.get('name'));
            // 点back按钮的时候不再触发状态变化
            if (localStorage.getItem('historyBool')) {
                localStorage.setItem('historyBool',  '');
                return;
            }
            History.pushState({name: 'item'}, '');
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
