import $ from './jquery'

export default function initMdButton() {

    function initButton($mdButton) {
        $mdButton.data('animating', false)
    }

    $('.md-button, .md-icon-button').each(function() {
        initButton($(this))
    })

    $('body')
        .on('mousedown', '.md-button:not(._disabled)', function(evt) {
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
        .on('mouseup mouseout', '.md-button:not(._disabled)', function() {
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
        .on('mousedown', '.md-icon-button:not(._disabled)', function(evt) {
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
            $(this).children('.md-tooltip').addClass('show')
        })
        .on('mouseleave', '.show-tooltip', function(evt) {
            $(this).children('.md-tooltip').removeClass('show')
        })

}
