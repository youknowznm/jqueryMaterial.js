import $ from './jquery.js'

/**
延迟调用指定函数。一般用于在按钮等元素产生的动画结束后
@param fn {Function} 延迟结束后的回调
@param timeout {?Number} 延迟长度。不提供时为400
*/
$.jmDelay = function(fn, timeout = 400) {
    setTimeout(fn, timeout)
}

$.fn.extend({
    /**
    动画滚动页面至目标元素位置
    @param cb {?Function} 滚动完成的回调。不提供时为一个空函数
    @param amendment {?Number} 滚动高度的修正像素数。不提供时为64
    */
    jmScrollInto(cb, amendment) {
        let _cb = (typeof cb === 'function') ? cb : function() {}
        let _amendment = (typeof amendment === 'number') ? amendment : 64

        let $ele = $(this)
        let _body = document.documentElement
        let targetBodyScrollTop = $ele.offset().top - _amendment
        let tId = setInterval(function() {
            let currentBodyScrollTop = _body.scrollTop
            let diff = targetBodyScrollTop - currentBodyScrollTop
            switch (true) {
                case diff > 0:
                    currentBodyScrollTop += Math.ceil(diff / 5)
                    break
                case diff < 0:
                    currentBodyScrollTop -= Math.ceil(diff / -5)
                    break
                default:
                    clearIntervalAndCallback(tId)
            }
            _body.scrollTop = currentBodyScrollTop
            // 如果页面滚动到了底部，也停止interval
            if (_body.scrollHeight - _body.scrollTop === _body.clientHeight) {
                clearIntervalAndCallback(tId)
            }
        }, 10)
        function clearIntervalAndCallback(n) {
            clearInterval(n)
            _cb()
        }
    },
})