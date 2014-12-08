define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'page-history',
    'alarm/collections/item',
    'alarm/views/detail-page'
], function(_, $, deferred, Backbone, pageHistory, ItemCollection, DetailPageView) {
    var itemListTpl = _.template($('#tpl-item-item').html());

    var ItemListView = Backbone.View.extend({
        el: $('#item-list'),
        initialize: function(options) {
            var self = this;

            this.collection = new ItemCollection({
                caterogyModel: options.caterogyModel
            });
            this.pageView = options.pageView;

            // 函数的this是collection
            // this.collection.on('change:isRemind', this.render);
            this.collection.on('change:isRemind', function() {
                self.render();
            });
        },
        bootstrap: function() {
            var self = this;

            $.when(this.collection.fetch()).done(function() {
                self.render();
            });
        },
        render: function() {
            var html = itemListTpl({
                    itemCollection: this.collection
                });
            this.$el.html(html);
        },
        // 有先后顺序
        events: {
            'click .item-action': 'toggleSubscription',
            'click .item-item': 'navigateToDetail'
        },
        toggleSubscription: function(event) {
            var id = $(event.target).closest('.list-item').data('id'),
                model = this.collection.get(id);

            model.save({isRemind: model.get('isRemind') ? 0 : 1});
        },
        navigateToDetail: function(event) {
            // Backbone事件无法阻止冒泡
            if ($(event.target).is('.list-action')) {
                return;
            }

            var detailPageView,
                id = $(event.target).closest('.list-item').data('id'),
                cacheId = 'DetailPageView_' + id,
                itemModel = this.collection.get(id);

            // 从历史记录查找，或者new
            if (!(detailPageView = pageHistory.get(cacheId))) {
                detailPageView = new DetailPageView({
                    itemModel: itemModel
                });
            }

            pageHistory.push(cacheId, detailPageView);
        }
    });

    return ItemListView;
});
