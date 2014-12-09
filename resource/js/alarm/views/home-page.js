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
        $loading: $('.loading'),
        initialize: function() {
            this.categoryListView = new CategoryListView.getInstance();
            this.categoryListView.setPageView(this);
        },
        bootstrap: function() {
            return this.categoryListView.bootstrap();
        },
        render: function() {
            this.$el.show();
        },
        events: {
            'click .home': 'navigateToMyPage'
        },
        navigateToMyPage: function(event) {
            var myPageView = MyPageView.getInstance();
            myPageView.bootstrap();
            myPageView.render();

            this.$el.hide();
        }
    });

    var instance;
    exports.getInstance = function() {
        if (!instance) {
            instance = new HomePageView();
        }

        return instance;
    };
});
