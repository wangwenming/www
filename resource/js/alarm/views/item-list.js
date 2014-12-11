define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/item',
    'alarm/views/detail-page'
], function(_, $, deferred, Backbone, ItemCollection, DetailPageView) {
    var itemListTpl = _.template($('#tpl-item-item').html());

    var ItemListView = Backbone.View.extend({
        el: $('#item-list'),
        id: null,
        $dialog: null,
        $loading: $('.loading'),
        initialize: function(options) {
            var self = this;

            this.collection = new ItemCollection();

            // 函数的this是collection
            // this.collection.on('change:isRemind', this.render);
            this.collection.on('change:isRemind', function() {
                self.render();
            });
        },
        setPageView: function(pageView) {
            this.pageView = pageView;
        },
        setCategoryModel: function(categoryModel) {
            this.categoryModel = categoryModel;
            this.collection.setCategoryModel(categoryModel);
        },
        bootstrap: function() {
            var self = this,
                deferred = $.Deferred();

            $.when(this.collection.fetch()).done(function() {
                deferred.resolve();
                self.render();
            });

            return deferred;
        },
        render: function() {
            var html = itemListTpl({
                    itemCollection: this.collection
                });
            this.$el.html(html);
            // 弹泡的根节点缓存
            this.$dialog = $('.dialog, .mask', this.$el);
            this.$loading.hide();
        },
        // 有先后顺序
        events: {
            'click .item-action-cancel': 'toggleSubscription',
            'click .item-action': 'toggleSubscriped',
            'click .item-item': 'navigateToDetail',
            'click .change-yes': 'toggleSubscriptionYes',
            'click .change-no': 'toggleSubscriptionNo'
        },
        toggleSubscription: function(event) {
            // 将id记下然后弹泡
            this.id = $(event.target).closest('.list-item').data('id');
            this.$dialog.show();
        },
        toggleSubscriptionYes: function() {
            model = this.collection.get(this.id);
            model.save({isRemind: model.get('isRemind') ? 0 : 1});
            this.$dialog.hide();
        },
        toggleSubscriptionNo: function() {
            this.$dialog.hide();
        },
        toggleSubscriped: function() {
            var id = $(event.target).closest('.list-item').data('id');
            model = this.collection.get(id);
            $.when(model.save({isRemind: model.get('isRemind') ? 0 : 1})).done(function() {
                // 订阅成功tips淡入淡出效果
                $('.subscribeSuccess').removeClass('tipsHide').addClass('tipsShow');
                setTimeout(function(){
                    $('.subscribeSuccess').removeClass('tipsShow').addClass('tipsHide');
                }, 1000);
            });
        },
        navigateToDetail: function(event) {
            // Backbone事件无法阻止冒泡
            if ($(event.target).is('.list-action')) {
                return;
            }

            var id = $(event.target).closest('.list-item').data('id'),
                itemModel = this.collection.get(id),
                detailPageView = DetailPageView.getInstance();

            detailPageView.setItemModel(itemModel);
            detailPageView.bootstrap();
            detailPageView.render();

            this.pageView.$el.hide();
        }
    });

    var instance;
    function getInstance() {
        if (!instance) {
            instance = new ItemListView();
        }

        return instance;
    }

    return {
        getInstance: getInstance
    };
});
