define([
    'exports',
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/subscription-list',
    'alarm/views/subscribed-list',
    'alarm/views/home-page'
], function(exports, _, $, deferred, Backbone, SubscriptionListView, SubscribedListView, HomePageView) {
    var MyPageView = Backbone.View.extend({
        el: $('#my-page'),
        elSubscribed: $('#subscribed-list'),
        elSubsription: $('#subscription-list'),
        $loading: $('.loading'),
        initialize: function() {
            this.subscriptionListView = new SubscriptionListView.getInstance();
            this.subscriptionListView.setPageView(this);
            this.subscribedListView = new SubscribedListView({
                pageView: this
            });
        },
        bootstrap: function() {
            return this.subscriptionListView.bootstrap();
        },
        render: function() {
            // 初始化数据
            this.$el.addClass('active');
            this.$loading.hide();
        },
        events: {
            'click .back': 'navigateToHomePage',
            'click .subscription': 'changeToSubscription',
            'click .subscribed': 'changeToSubscribed'
        },
        navigateToHomePage: function(event) {
            var homePageView = HomePageView.getInstance();
            homePageView.bootstrap();
            homePageView.render();

            this.$el.removeClass('active');
        },
        changeToSubscription: function(event) {
            $('.active').removeClass('active');
            $(event.target).closest('li').addClass('active');
            this.subscriptionListView.bootstrap();
            this.elSubsription.show();
            this.elSubscribed.hide();
        },
        changeToSubscribed: function(event) {
            $('.active').removeClass('active');
            $(event.target).closest('li').addClass('active');
            this.subscribedListView.bootstrap();
            this.elSubsription.hide();
            this.elSubscribed.show();
        }
    });

    var instance;
    exports.getInstance = function() {
        if (!instance) {
            instance = new MyPageView();
        }

        return instance;
    };
});
