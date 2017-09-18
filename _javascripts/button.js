import $ from './jquery.js'

$.fn.extend({
    /**
    生成 angular material 风格的按钮 https://material.angularjs.org/latest/demo/button
    @param
    */
    initButton() {
        this.each(function() {

            let $button = $(this).data('animating', false)

            let textContent = $button.data('text')
            let buttonContentHTML = ''
            if (typeof textContent === 'string' && /\S/.test(textContent)) {
                // 如有有效的data-text属性则按钮内容为字符
                buttonContentHTML = `<span class="content">${textContent}</span>`
            } else {
                // 否则内容为一个icon，在样式表内自行定义。这时给按钮元素添加_round类
                buttonContentHTML = `<span class="icon-wrap"><i class="icon"></i></span>`
                $button.addClass('_round')
            }

            let buttonHTML = `
                ${buttonContentHTML}
                <div class="ripple-container"><span class="ripple"></span></div>
            `

            $button.html(buttonHTML)

            $('body')
                .on('mousedown', '.jm-button:not(._disabled)', function(evt) {
                    let $this = $(this)
                    if ($this.data('animating') === false) {
                        $this.data('clicked', true)
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
                .on('mouseup mouseout', '.jm-button:not(._disabled)', function() {
                    let $this = $(this)
                    if ($this.data('animating') === false && $this.data('clicked') === true) {

                        // 设置timeout，避免mousedown事件持续时间过短导致的闪烁
                        setTimeout(function() {

                            $this.data({
                                animating: true,
                                clicked: false
                            })
                            $this.removeClass('mousedown').addClass('mouseup')
                            setTimeout(function() {
                                $this.removeClass('mouseup')
                                $this.data('animating', false)
                            }, 550)

                        }, 250)

                    }
                })

            $('body')
                .on('mousedown', '.jm-button.jm-icon-button:not(._disabled)', function(evt) {
                    let $this = $(this)
                    if ($this.data('animating') === false) {
                        $this.data('animating', true)
                        let $ripple = $this.find('.ripple')
                        $ripple.css({
                            width: '40px',
                            height: '40px',
                            left: '20px',
                            top: '20px',
                        })
                        $this.addClass('mousedown')
                        setTimeout(function() {
                            $this.removeClass('mousedown').addClass('mouseup')
                            setTimeout(function() {
                                $this.removeClass('mouseup')
                                $this.data('animating', false)
                            }, 300)
                        }, 300)
                    }
                })

            // 浮动提示条
            $('body')
                .on('mouseenter', '.show-tooltip', function(evt) {
                    $(this).children('.jm-tooltip').addClass('show')
                })
                .on('mouseleave', '.show-tooltip', function(evt) {
                    $(this).children('.jm-tooltip').removeClass('show')
                })

        })
    }
})