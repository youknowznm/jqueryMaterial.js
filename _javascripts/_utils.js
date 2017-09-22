import $ from './jquery.js'

// TODO
$.jmDelay = function(fn, timeout = 400) {
    setTimeout(fn, timeout)
}

$.fn.extend({
    /**
    动画滚动页面至目标元素位置。请注意该元素并未滚动至offest为0的位置，此时页面顶部的.jm-header元素是无高度的
    @param cb {function?} 滚动完成的回调
    */
    jmScrollInto(cb) {
        let $ele = $(this)
        let _body = document.documentElement
        let targetBodyScrollTop = $ele.offset().top - 64
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
                    clearIntervalAndCallback(tId, cb)
            }
            _body.scrollTop = currentBodyScrollTop
            // 如果页面滚动到了底部，也停止interval
            if (_body.scrollHeight - _body.scrollTop === _body.clientHeight) {
                clearIntervalAndCallback(tId, cb)
            }
        }, 10)
        function clearIntervalAndCallback(n, f) {
            clearInterval(n)
            if (typeof f === 'function') {
                f()
            }
        }
    },
})