define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/subscription-list',
    'alarm/views/subscribed-list',
], function(_, $, deferred, Backbone, SubscriptionListView, SubscribedListView) {
    var MyPageView = Backbone.View.extend({
        el: $('#my-page'),
        elSubscribed: $('#subscribed-list'),
        elSubsription: $('#subscription-list'),
        initialize: function(options) {
            this.prevPageView = options.prevPageView;
            this.subscriptionListView = new SubscriptionListView({
                pageView: this
            });
            this.SubscribedListView = new SubscribedListView({
                pageView: this
            });
            // 初始化数据
            this.subscriptionListView.bootstrap();
           /* this.SubscribedListView.bootstrap();*/
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
            this.prevPageView.$el.show();
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

    return MyPageView;
});
