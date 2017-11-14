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

$.fn.extend({
    /**
    动画滚动页面至目标元素位置。pc端加上header的banner高度
    @param cb {?Function} 滚动完成的回调。不提供时为一个空函数
    */
    jmScrollInto(cb) {
        let $target = $(this)
        let headerBannerHeight = document.documentElement.getAttribute('id') === 'pc' ? 192 : 0
        $(document.scrollingElement).animate(
            {
                scrollTop: $target[0].offsetTop + headerBannerHeight
            },
            200,
            function() {
                if (typeof cb === 'function') {
                    cb($target)
                }
            }
        )
    },
})