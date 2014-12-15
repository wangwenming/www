define([
], function() {
    function padding(d) {
        return d < 10 ? '0' + d : d;
    }

    function timeFormat(ts, now) {
        now = now || Math.round(((+new Date()) / 1000));

        // 如果时间差 <= 0秒，则修正为1秒钟前
        var delta = Math.max(1, now - ts);

        // 规则1: 小于1分钟的，显示xx秒钟前
        if (delta < 60) {
            return delta + '秒钟前';
        }

        // 规则2: 小于1小时的，显示xx分钟前
        if (delta < 3660) {
            return Math.floor(delta / 60) + '分钟前';
        }

        // 规则2.1: 大于1小时小于24小时，显示xx小时前
        if (delta < 3600 * 24) {
            return Math.floor(delta / 3600) + '小时前';
        }

        // 规则3： 比昨天还早，3天内，显示xx天前
        if (delta < 3600 * 24 * 3) {
            return Math.floor(delta / (3600 * 24)) + '天前';
        }

        // 规则4: 比昨天还早的，显示Y-m-d H:i
        var d = new Date(ts * 1000), p = padding,
            year = d.getFullYear(),
            rt = [p(d.getMonth() + 1), p(d.getDate())];
        // 如果是今年的就不显示了
        if(year != (new Date()).getFullYear()){
           rt.unshift(year);
        }
        return rt.join('-') + ' ' + [p(d.getHours()), p(d.getMinutes())].join(':');
    }

    // 点击高亮效果添加
    function setTouchStyle(selector, highlight) {
        highlight = highlight || 'highlight';
        var doc = $(document);
        doc.on('touchstart', selector, function (e) {
            $(this).addClass(highlight);
        });
        doc.on('touchmove touchend', selector, function (e) {
            $(this).removeClass(highlight);
        });
    }

    return {
        timeFormat: timeFormat,
        setTouchStyle: setTouchStyle
    };
});