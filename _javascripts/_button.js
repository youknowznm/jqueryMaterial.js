// 以目标按钮元素为参照，确定提示条元素的位置
function setTooltipPosition($tooltip, $button, direction) {
    let buttonPageLeft = $button.offset().left - document.documentElement.scrollLeft
    let buttonPageTop = $button.offset().top - document.documentElement.scrollTop
    let buttonWidth = $button.outerWidth()
    let buttonHeight = $button.outerHeight()
    let tooltipWidth = $tooltip.outerWidth()
    let tooltipHeight = $tooltip.outerHeight()
    let offsetLeft,
        offsetTop
    switch (direction) {
        case 'top':
            offsetLeft = (buttonWidth - tooltipWidth) / 2
            offsetTop = -(tooltipHeight + 10)
            break;
        case 'left':
            offsetLeft = -(tooltipWidth + 10)
            offsetTop = (buttonHeight - tooltipHeight) / 2
            break;
        case 'bottom':
            offsetLeft = (buttonWidth - tooltipWidth) / 2
            offsetTop = buttonHeight + 10
            break;
        case 'right':
            offsetLeft = buttonWidth + 10
            offsetTop = (buttonHeight - tooltipHeight) / 2
            break;
    }
    $tooltip.css({
        left: buttonPageLeft + offsetLeft,
        top: buttonPageTop + offsetTop,
    })
}

// 在mouseup时调用的click监听
function _bindClickListener($button, clickCallback) {
    clickCallback = (typeof clickCallback === 'function') ? clickCallback : function() {}
    $button.on('mouseup', function() {
        if (!$button.hasClass('_disabled') && $button.data('animating') === true) {
            $button.removeClass('mousedown').addClass('mouseup')
            clickCallback($button)
        }
    })
}

$.fn.extend({
    /**
    生成 angular material 风格的按钮
    https://material.angularjs.org/latest/demo/button
    @param clickCallback {Function?} 点击事件的回调，在mouseup时触发。不提供时传入空方法
    目标元素可配置的属性：
        - data-text 按钮内容文字。不提供时，按钮内容为一个.icon元素，需在样式表内自行设置背景url
        - data-tooltipContent 浮动提示条的内容文字。不提供时，不显示浮动提示条
        - data-tooltipPosition 浮动提示条的位置。不提供时默认为'top'
    */
    initButton(clickCallback) {
        this.each(function() {
            let $button = $(this)
            $button.data('animating', false)

            /*
            拼接按钮内容HTML
            - 如有有效的text属性则按钮内容为字符
            - 否则内容为一个icon，在样式表内自行定义。这时给按钮元素添加_round类
            */
            let textContent = $button.data('text')
            let buttonContentHTML = ''
            if (typeof textContent === 'string' && /\S/.test(textContent)) {
                buttonContentHTML = `<span class="content">${textContent}</span>`
            } else {
                buttonContentHTML = `<span class="icon-wrap"><i class="icon"></i></span>`
                $button.addClass('_round')
            }

            /*
            将浮动提示条相关数据写入data
            */
            let tooltipHTML = ''
            let tooltipContent = $button.data('tooltipContent')
            if (typeof tooltipContent === 'string') {
                $button.data({
                    tooltipContent,
                    tooltipPosition: $button.data('tooltipPosition') || 'top'
                })
                $button.addClass('show-tooltip')
            }

            let buttonHTML = `
                ${buttonContentHTML}
                <div class="ripple-container"><span class="ripple"></span></div>`

            clickCallback = (typeof clickCallback === 'function') ? clickCallback : function() {}

            $button.html(buttonHTML)

            $button
                .on('mousedown', function(evt) {
                    if (!$button.hasClass('_disabled') && $button.data('animating') === false) {
                        let $ripple = $button.find('.ripple')
                        let _x = evt.offsetX
                        let _y = evt.offsetY
                        let _width = $button.innerWidth()
                        let _height = $button.innerHeight()
                        // 根据事件坐标和按钮水平中点的距离，获取波纹的直径
                        let offsetToHorizontalCenter = _width / 2 - _x
                        let offsetToVerticalCenter = _height / 2 - _y
                        let sideLength = _width + Math.abs(offsetToHorizontalCenter) * 2
                        $ripple.css({
                            width: sideLength,
                            height: sideLength,
                            left: (_width - sideLength) / 2 - offsetToHorizontalCenter,
                            top: (_height - sideLength) / 2 - offsetToVerticalCenter,
                        })
                        $button.data('animating', true)
                        $button.addClass('mousedown')
                    }
                })
                .on('animationend', function(evt) {
                    if ($(evt.target).hasClass('ripple-container')) {
                        $button.removeClass('mouseup')
                        $button.data('animating', false)
                    }
                })
                .on('mouseenter', function(evt) {
                    if ($button.hasClass('show-tooltip')) {
                        let $tooltip = $(`<p id="jm-tooltip" class="to-show-at-${$button.data('tooltipPosition')}">
                                    ${$button.data('tooltipContent')}
                                </p>`)
                        $('body').append($tooltip)
                        setTooltipPosition($tooltip, $button, $button.data('tooltipPosition'))
                        $tooltip.addClass('show')
                    }
                })
                .on('mouseleave', function(evt) {
                    if ($button.data('animating') === true) {
                        $button.removeClass('mousedown').addClass('mouseup')
                    }
                    if ($button.hasClass('show-tooltip')) {
                        $('#jm-tooltip').removeClass('show').remove()
                    }
                })
                .on('click', function(evt) {
                    evt.preventDefault()
                })

            _bindClickListener($button, clickCallback)

        })
    },
    // 用于重写click监听
    bindClickListener(clickCallback) {
        this.each(function() {
            let $button = $(this)
            $button.off('mouseup')
            _bindClickListener($button, clickCallback)
        })
    },
})