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
        initialize: function(options) {
            this.prevPageView = options ? options.prevPageView : '';
            this.subscriptionListView = new SubscriptionListView({
                pageView: this
            });
            this.SubscribedListView = new SubscribedListView({
                pageView: this
            });
            // 初始化数据
            this.subscriptionListView.bootstrap();
            this.render();
        },
        render: function() {
            this.$el.show();
        },
        events: {
            'click .back': 'back',
            'click .subscription': 'changeToSubscription',
            'click .subscribed': 'changeToSubscribed'
        },
        back: function(event) {

            this.$el.hide();
            if (this.prevPageView) {
                this.prevPageView.$el.show();
            } else {
                this.homePageView();
            }
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
            this.SubscribedListView.bootstrap();
            this.elSubsription.hide();
            this.elSubscribed.show();
        },
        homePageView: function() {
            var homePageView = new HomePageView.constructor();
        }
    });

    exports.constructor = MyPageView;

    //return MyPageView;
});
