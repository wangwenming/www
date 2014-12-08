define([
    'exports',
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'page-history',
    'alarm/views/category-list',
    'alarm/views/my-page'
], function(exports, _, $, deferred, Backbone, pageHistory, CategoryListView, MyPageView) {
    var HomePageView = Backbone.View.extend({
        el: $('#page-home'),
        initialize: function(options) {
            options = options || {};
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
            'click .home': 'navigateToMyPage'
        },
        navigateToMyPage: function(event) {
            if (!pageHistory.back()) {
                pageHistory.push('MyPageView', pageHistory.get('MyPageView') || new MyPageView.constructor());
            }
        }
    });

    exports.constructor = HomePageView;
});
