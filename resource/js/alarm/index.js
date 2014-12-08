require([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'page-history',
    'alarm/views/home-page',
    'alarm/views/my-page',
    'alarm/collections/subscription'
], function(_, $, deferred, Backbone, pageHistory, HomePageView, MyPageView, SubscriptionCollection) {
    var subscriptionCollection = new SubscriptionCollection(),
        myPageView, homePageView;
    $.when(subscriptionCollection.fetch()).done(function() {
        if (subscriptionCollection.length > 0) {
            myPageView = new MyPageView.constructor({
                subscriptionCollection: subscriptionCollection
            });
            pageHistory.push('MyPageView', myPageView);
        } else {
            homePageView = new HomePageView.constructor();
            pageHistory.push('HomePageView', homePageView);
        }
    });
});
