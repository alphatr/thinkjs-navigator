/**
 * [Navigator 生成翻页标签]
 * @param  {[type]} opt [参数]
 * @return {[type]}     [生成的 HTML]
 */
var Navigator = function (pageInfo, baseUrl) {
    this._count = parseInt(pageInfo.count, 10);
    this._total = parseInt(pageInfo.total, 10);
    this._page = parseInt(pageInfo.page, 10);
    this._num = parseInt(pageInfo.num, 10);
    this._baseUrl = baseUrl;
    this._ready = false;

    this._anchor = '';

    if (this._page <= this._total && this._page > 0 && this._total > 1) {
        this._ready = true;
    }
};

/* 设置锚点 */
Navigator.prototype.anchor = function (anchor) {
    this._anchor = '#' + anchor;
};

/* 返回HTML */
Navigator.prototype.render = function (prev, next, split, splitText, config) {
    var self = this;
    if (!self._ready) {
        return '';
    }

    prev = prev || 'PREV';
    next = next || 'NEXT';
    split = split || 3;
    splitText = splitText || '...';

    config = extend({
        itemTag: 'li',
        textTag: 'span',
        currentClass: 'current',
        prevClass: 'prev',
        nextClass: 'next'
    }, config);

    // 定义item
    var itemBegin = '<' + config.itemTag + '>',
        itemCurrentBegin = '<' + config.itemTag + ' class="' + config.currentClass + '">',
        itemPrevBegin = '<' + config.itemTag + ' class="' + config.prevClass + '">',
        itemNextBegin = '<' + config.itemTag + ' class="' + config.nextClass + '">',
        itemEnd = '</' + config.itemTag + '>',

        textBegin = '<' + config.textTag + '>',
        textEnd = '</' + config.textTag + '>',

        linkBegin = '<a href="%s">',
        linkCurrentBegin = '<a href="%s"' + ' class="' + config.currentClass + '">',
        linkPrevBegin = '<a href="%s"' + ' class="' + config.prevClass + '">',
        linkNextBegin = '<a href="%s"' + ' class="' + config.nextClass + '">',
        linkEnd = '</a>',

        from = Math.max(1, self._page - split),
        to = Math.min(self._total, self._page + split),

        html = [], i,

        urlRouter = function (tpl, page) {
            var url = self._baseUrl;
            if (page !== 1) {
                url += /\?/.test(url) ? '&' : '?';
                url += 'page=' + page;
            }
            return tpl.replace(/\%s/ig, url);
        };

    // 上一页
    if (self._page > 1) {
        html.push(itemPrevBegin + urlRouter(linkPrevBegin, self._page - 1) + self._anchor + prev + linkEnd + itemEnd);
    }

    // 第一页
    if (from > 1) {
        html.push(itemBegin + urlRouter(linkBegin, 1) + self._anchor + '1' + linkEnd + itemEnd);

        if (from > 2) {
            // 省略号
            html.push(itemBegin + textBegin + splitText + textEnd + itemEnd);
        }
    }

    // 中间页
    for (i = from; i <= to; i++) {
        if (i === self._page) {
            html.push(itemCurrentBegin + urlRouter(linkCurrentBegin, i) + self._anchor + i + linkEnd + itemEnd);
        } else {
            html.push(itemBegin + urlRouter(linkBegin, i) + self._anchor + i + linkEnd + itemEnd);
        }
    }

    // 输出最后页
    if (to < self._total) {
        if (to < self._total - 1) {
            html.push(itemBegin + textBegin + splitText + textEnd + itemEnd);
        }

        html.push(itemBegin + urlRouter(linkBegin, self._total) + self._anchor + self._total + linkEnd + itemEnd);
    }

    // 输出下一页
    if (self._page < self._total) {
        html.push(itemNextBegin + urlRouter(linkNextBegin, self._page + 1) + self._anchor + next + linkEnd + itemEnd);
    }

    return html.join('');
};

module.exports = Navigator;
