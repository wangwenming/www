require([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/home-page',
    'alarm/views/my-page',
    'alarm/collections/subscription'
], function(_, $, deferred, Backbone, HomePageView, MyPageView, SubscriptionCollection) {
    var subscriptionCollection = new SubscriptionCollection(),
        myPageView, homePageView;
    $.when(subscriptionCollection.fetch()).done(function() {
        if (subscriptionCollection.length > 0) {
            myPageView = new MyPageView();
        } else {
            homePageView = new HomePageView();
        }
    });
});
