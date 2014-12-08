define([
    'exports',
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/category-list',
    'alarm/views/my-page'
], function(exports, _, $, deferred, Backbone, CategoryListView, MyPageView) {
    var HomePageView = Backbone.View.extend({
        el: $('#page-home'),
        initialize: function(options) {
            options = options || {};

            this.prevPageView = options.prevPageView;

            this.categoryListView = new CategoryListView({
                pageView: this
            });
            // 初始化数据
            this.categoryListView.bootstrap();
            this.render();
        },
        render: function() {
            this.$el.show();
        },
        events: {
            'click .home': 'goHome'
        },
        goHome: function(event) {
            this.$el.hide();

            if (!this.prevPageView) {
                this.prevPageView = new MyPageView.constructor({
                    prevPageView: this
                });
            }
            this.prevPageView.$el.show();
        }
    });

    exports.constructor = HomePageView;
});
