$.fn.extend({
    /**
    生成 angular material 风格的按钮
    https://material.angularjs.org/latest/demo/button
    目标元素可配置的属性：
        - data-text 按钮内容文字。不提供时，按钮内容为一个.icon元素，需在样式表内自行设置背景url
        - data-tooltip-content 浮动提示条的内容文字。不提供时，不显示浮动提示条
        - data-tooltip-position 浮动提示条的位置。不提供时默认为'top'
    */
    initButton() {
        this.each(function() {
            let $button = $(this).data('animating', false)

            /*
            拼接按钮内容HTML
            - 如有有效的data-text属性则按钮内容为字符
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
            拼接浮动提示条HTML
            - 如有有效的data-tooltip-content属性则追加一个浮动提示条元素
            - 如有data-tooltip-position属性则按其设置提示条位置，默认为top
            */
            let tooltipHTML = ''
            let tooltipContent = $button.data('tooltipContent')
            if (typeof tooltipContent === 'string') {
                let tooltipPosition = $button.data('tooltipPosition') || 'top'
                tooltipHTML = `
                    <p class="jm-tooltip to-show-at-${tooltipPosition}">
                        ${tooltipContent}
                    </p>`
                $button.addClass('show-tooltip')
            }

            let buttonHTML = `
                ${buttonContentHTML}
                <div class="ripple-container"><span class="ripple"></span></div>
                ${tooltipHTML}`

            $button.html(buttonHTML)

            $button
                .on('animationstart', function(e) {
                    let $this = $(this)
                    let $animatingTarget = $(e.target)
                    if ($animatingTarget.hasClass('ripple')) {
                        $this.data('animating', true)
                    }
                })
                .on('mousedown', function(evt) {
                    let $this = $(this)
                    if ($this.data('animating') === false) {
                        let $ripple = $this.find('.ripple')
                        let _x = evt.offsetX
                        let _y = evt.offsetY
                        let _width = $this.innerWidth()
                        let _height = $this.innerHeight()
                        // 根据事件坐标和按钮水平中点的距离，获取波纹的直径
                        let offsetToHorizontalCenter = _width / 2 - _x
                        let offsetToVerticalCenter = _height / 2 - _y
                        let sideLength = _width + Math.abs(offsetToHorizontalCenter) * 2 + (_width / 10)
                        $ripple.css({
                            width: sideLength,
                            height: sideLength,
                            left: (_width - sideLength) / 2 - offsetToHorizontalCenter,
                            top: (_height - sideLength) / 2 - offsetToVerticalCenter,
                        })
                        $this.addClass('mousedown')
                    }

                })
                .on('mouseup mouseleave', function(e) {
                    let $this = $(this)
                    if ($this.data('animating') === true) {
                        $this.removeClass('mousedown').addClass('mouseup')
                    }
                })
                .on('animationend', function(e) {
                    let $this = $(this)
                    let $animatingTarget = $(e.target)
                    if ($animatingTarget.hasClass('ripple-container')) {
                        $this.removeClass('mouseup')
                        $this.data('animating', false)
                    }
                })

            // 浮动提示条
            $('html:not(#mobile)')
                .on('mouseenter', '.show-tooltip', function(evt) {
                    $(this).children('.jm-tooltip').addClass('show')
                })
                .on('mouseleave', '.show-tooltip', function(evt) {
                    $(this).children('.jm-tooltip').removeClass('show')
                })
        })
    }
})