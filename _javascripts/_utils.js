// 判断是否移动端
$(function() {
    let deviceType = 'pc'
    if (/Android|iPhone|Windows Phone|iPad/i.test(window.navigator.userAgent)) {
        deviceType = 'mobile'
    }
    document.documentElement.setAttribute('id', deviceType)
})

/**
强制一个函数在某个连续时间段内只执行一次，哪怕它本来会被调用多次。
类似于 vue 1 中的 debounce 过滤器： https://v1.vuejs.org/api/#debounce
@param fn {Function} 要控制执行次数的函数
@param delay {?Number} 延迟的毫秒数。不提供时为500
@return {Function} 返回经过处理的该函数
*/
$.jmDebounce = function(fn, delay = 500) {
    // 定时器，用来 setTimeout
    let timer
    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function() {
        // 保存函数调用时的上下文和参数，传递给 fn
        let that = this
        let args = arguments
        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(timer)
        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(function() {
            fn.apply(that, Array.prototype.slice.call(args, 0, 1))
        }, delay)
    }
}

/**
延迟调用指定函数。一般用于在按钮等元素产生的动画结束后
@param fn {Function} 延迟结束后执行的函数
@param timeout {?Number} 延迟的毫秒数。不提供时为400
*/
$.jmDelay = function(fn, timeout = 400) {
    setTimeout(fn, timeout)
}

$.fn.extend({
    /**
    【在使用了本套组件的header的页面中】动画滚动页面至目标元素位置
    @param cb {?Function} 滚动完成的回调。不提供时为一个空函数
    @param amendment {?Number} 滚动高度的修正像素数。不提供时为.jm-header元素的实际高度
    */
    jmScrollInto(cb, amendment) {
        let $target = $(this)
        let _body = document.documentElement
        let jmHeaderHeight = $('.jm-header').height()

        let _cb = (typeof cb === 'function') ? cb : function() {}
        let _amendment = (typeof amendment === 'number') ? amendment : jmHeaderHeight

        _amendment = $target.is('body') ? jmHeaderHeight : _amendment

        let targetBodyScrollTop = $target.offset().top - _amendment
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