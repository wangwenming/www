define([
    'underscore'
], function(_) {
    var CACHE_SIZE = 32,
        stack = [],
        cache = {};

    function enable(view) {
        view.$el.show();
        view.delegateEvents();
    }

    function disable(view) {
        view.$el.hide();
        view.undelegateEvents();
    }

    function push(id, page) {
        enable(page);
        if (stack.length > 0) {
            disable(_.last(stack).page);
        }

        stack.push({id: id, page: page});

        console.log('after push: ', stack);
    }

    function back() {

        console.log('before back: ', stack);

        if (stack.length <= 1) {
            return false;
        }

        var poped = stack.pop(),
            last = _.last(stack);

        refreshCache(poped);

        disable(poped.page);
        enable(last.page);

        return last;
    }

    function refreshCache(stackItem) {
        var id = stackItem.id,
            page = stackItem.page,
            ids = _.keys(cache),
            len = ids.length;

        cache[id] = page;
        console.log('set cache', id, page, cache);
        if (len > CACHE_SIZE) {
            delete cache[ids[0]];
        }
    }

    function get(id) {
        return false;
        console.log('get cache: ', id, !!cache[id], cache);
        return cache[id];
    }

    return {
        back: back,
        push: push,
        get: get
    };
});
