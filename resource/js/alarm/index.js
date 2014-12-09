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

    var sync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
        if (method === 'read') {
            var cacheData,
                cacheKey = model.cacheKey,
                cacheTTL = model.cacheTTL || 0,
                now = +new Date,
                success = options.success;

            // 从 localStorage 获取数据
            if (cacheKey) {
                cacheData = localStorage.getItem(cacheKey);
                // 包含 time ttl data 三个数据
                if (cacheData) {
                    cacheData = JSON.parse(cacheData);

                    // 过期数据，清除之
                    if (cacheTTL && (now - (cacheData.time || 0) > cacheTTL * 1000)) {
                        localStorage.removeItem(cacheKey);
                    // hit cache
                    } else {
                        success(cacheData.data);
                        return;
                    }
                }

                // miss cache
                options.success = function(resp) {
                    success(resp);

                    localStorage.setItem(cacheKey, JSON.stringify({
                        time: +new Date,
                        ttl: cacheTTL,
                        data: resp
                    }));
                };
            }
        }

        // Backbone.sync 必须 return xhr
        return sync(method, model, options);
    };

    /*
    var subscriptionCollection = new SubscriptionCollection(),
        myPageView, homePageView;
    $.when(subscriptionCollection.fetch()).done(function() {
        if (subscriptionCollection.length > 0) {
            myPageView = MyPageView.getInstance({
                subscriptionCollection: subscriptionCollection
            });
            myPageView.render();
        } else {
            homePageView = HomePageView.getInstance();
            // 显示
            homePageView.render();
        }
    });
    */

    var myPageView = MyPageView.getInstance();
    $.when(myPageView.bootstrap()).done(function(hasMyData) {
        if (hasMyData) {
            myPageView.render();
            return;
        }

        var homePageView = HomePageView.getInstance();
        homePageView.bootstrap();
        homePageView.render();
    });

    window.back = function() {
        pageHistory.back();
    };
});
