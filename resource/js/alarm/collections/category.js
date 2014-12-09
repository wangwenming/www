define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/config',
    'alarm/models/category'
], function(_, $, deferred, Backbone, config, CategoryModel) {
    var CategoryCollection = Backbone.Collection.extend({
        model: CategoryModel,
        cacheKey: 'collections/category',
        cacheTTL: 86400,
        url: function() {
            return config.url('/remind/list', {
                start: 0,
                count: 10
            });
        },
        parse: function(response) {
            if (response.error != 0) {
                return [];
            }
            /*
            var data = [
                {
                    id: 1,
                    name: "动漫",
                    title: "更新时提醒",
                    icon: "/resource/img/alarm/cat-01-cartoon.png"
                },
                {
                    id: 2,
                    name: "小说",
                    title: "更新时提醒",
                    icon: "/resource/img/alarm/cat-02-novel.png"
                },
                {
                    id: 3,
                    name: "综艺",
                    title: "直播时、更新时提醒",
                    icon: "/resource/img/alarm/cat-03-variety.png"
                }
            ];
            return data;
            */
            return response.data.list;
        }
    });

    return CategoryCollection;
});
