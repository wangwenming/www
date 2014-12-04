require([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/home-page'
], function(_, $, deferred, Backbone, HomePageView) {
    var homePageView = new HomePageView();
});
