define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'page-history',
    'alarm/views/item-list'
], function(_, $, deferred, Backbone, pageHistory, ItemListView) {
    var ItemListPageView = Backbone.View.extend({
        el: $('#page-item-list'),
        initialize: function(options) {
            this.caterogyModel = options.caterogyModel;

            var itemListView = new ItemListView({
                    caterogyModel: this.caterogyModel,
                    pageView: this
                });

            itemListView.bootstrap();

            this.$el.show().find('.hd h2').text(this.caterogyModel.get('name'));
        },
        events: {
            'click .back': 'back'
        },
        back: function() {
            pageHistory.back();
        }
    });

    return ItemListPageView;
});
