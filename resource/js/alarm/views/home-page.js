define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/category-list',
    'alarm/views/my-page'
], function(_, $, deferred, Backbone, CategoryListView, MyPageView) {
    var HomePageView = Backbone.View.extend({
        el: $('#page-home'),
        initialize: function() {
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
            var myPageView = new MyPageView({prevPageView: this});
            this.$el.hide();
        }
    });

    return HomePageView;
});
