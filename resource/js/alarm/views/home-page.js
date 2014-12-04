define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/category-list'
], function(_, $, deferred, Backbone, CategoryListView) {
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
            alert('功能未实现');
        }
    });

    return HomePageView;
});
