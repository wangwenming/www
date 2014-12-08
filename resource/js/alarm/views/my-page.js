define([
    'exports',
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'page-history',
    'alarm/views/subscription-list',
    'alarm/views/subscribed-list',
    'alarm/views/home-page'
], function(exports, _, $, deferred, Backbone, pageHistory, SubscriptionListView, SubscribedListView, HomePageView) {
    var MyPageView = Backbone.View.extend({
        el: $('#my-page'),
        elSubscribed: $('#subscribed-list'),
        elSubsription: $('#subscription-list'),
        initialize: function(options) {
            options = options || {};

            this.subscriptionListView = new SubscriptionListView({
                pageView: this,
                collection: options.subscriptionCollection
            });
            this.SubscribedListView = new SubscribedListView({
                pageView: this
            });
            // 初始化数据
            if (!options.subscriptionCollection) {
                this.subscriptionListView.bootstrap();
            }

            this.render();
        },
        render: function() {
            this.$el.show();
        },
        events: {
            'click .back': 'navigateToHomePage',
            'click .subscription': 'changeToSubscription',
            'click .subscribed': 'changeToSubscribed'
        },
        navigateToHomePage: function(event) {
            if (!pageHistory.back()) {
                pageHistory.push('HomePageView', pageHistory.get('HomePageView') || new HomePageView.constructor());
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
        }
    });

    exports.constructor = MyPageView;

    //return MyPageView;
});
