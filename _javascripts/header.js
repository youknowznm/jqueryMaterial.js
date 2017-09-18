import $ from './jquery.js'

$.fn.extend({
    initHeader(options) {
        this.each(function() {

            let {siteNameWords, navContents, activeNavIndex} = options

            const COLOR_PALLETE = [
                'silver',
                'gray',
                'yellow',
                'red',
                'blue',
                'green',
            ]

            /*
            初始化
            */
            let jmHeaderHTML = `
                <div class="jm-header-content">
                    <nav>
                        <a class="site-title">
                            ${siteNameWords.map(function(item, index) {
                                return `<span class="jm-single-word">${item}</span>`
                            })}
                        </a>
                        <ul class="nav-buttons">
                            ${navContents.map(function(item, index) {
                                let activeStatus = index === activeNavIndex ? 'active' : ''
                                return `<li class="nav-button ${activeStatus}">${item}</li>`
                            })}
                        </ul>
                    </nav>
                    <div class="banner">
                        <h1 class="page-title">
                            <span class="jm-single-word">${navContents[activeNavIndex]}</span>
                        </h1>
                    </div>
                </div>
                <div class="ripple"></div>`

            // header 元素主体
            let $header = $(this)
                .hide()
                .attr('data-theme', COLOR_PALLETE[activeNavIndex])
                .html(jmHeaderHTML)
                .append($('<div class="jm-header-shadow"></div>'))

            let $window = $(window).scrollTop(0)
            let $body = $('body')
            // 波纹元素
            let $ripple = $header.children('.ripple')
             // 所有导航按钮
            let $buttons = $header.find('.nav-button')
            // 按钮底部提示条
            let $buttonIndicator = $header.find('.nav-indicator')
            // 波纹元素容器
            let $banner = $header.find('.banner')
            // 页面大标题
            let $pageTitle = $banner.find('.jm-single-word')
            // header 阴影
            let $shadow = $('.jm-header-shadow')

            /*
            波纹动画
            */
            let rippling = false
            let $buttonClicked = null
            $header
                .on('mousedown', '.nav-button:not(.active)', function(evt) {
                    if (rippling === false) {
                        rippling = true
                        let $targetBtn = $(this)
                        $buttonClicked = $targetBtn.addClass('clicking')
                        $ripple
                            .css({
                                // 直接从鼠标系事件中取得相对于页面的坐标
                                left: evt.pageX - 50,
                                // top 值要减掉窗口的垂直滚动偏移
                                top: evt.pageY - 50 - document.body.scrollTop,
                            })
                            .addClass('noneToCircle')
                    }
                })
                .on('mouseup', function(evt) {
                    // IDEA 根据事件目标的话，只能判断 mousedown，无法判断 mouseup，因为后者的目标永远是波纹元素。
                    // 所以以波纹元素是否已有动画类为标准，决定如何处理
                    if ($ripple.hasClass('noneToCircle')) {
                        /*
                        波纹元素的扩大
                        */
                        $body.animate(
                            {
                                scrollTop: 0
                            },
                            200,
                            function() {
                                $ripple
                                    .removeClass('noneToCircle')
                                    .addClass('toFullscreen')
                                setTimeout(function() {
                                    // 移除波纹元素的动画类
                                    $ripple.removeClass('noneToCircle toFullscreen')
                                    rippling = false
                                }, 670)
                            }
                        )
                        // 主题配色
                        changeColorTheme($buttonClicked)
                        // 改变标题文字
                        $pageTitle.text($buttonClicked.text())
                        // 按钮提示条动画
                        indicate($buttonClicked)
                    }
                })

            /*
            按钮提示条动画
            */
            function indicate($targetBtn) {
                let startX
                let endX
                let $currentBtn = $buttons.filter('.active').removeClass('active clicking')
                let targetIsAtRight = $buttons.index($targetBtn) > $buttons.index($currentBtn)
                                      ? true
                                      : false
                // 根据目标按钮和当前活动按钮的相对位置，求得提示条的目标起始点坐标
                if (targetIsAtRight) {
                    startX = $currentBtn.position().left
                    endX = $targetBtn.position().left + $targetBtn.innerWidth()
                } else {
                    startX = $targetBtn.position().left
                    endX = $currentBtn.position().left + $currentBtn.innerWidth()
                }

                $buttonIndicator.css({
                    left: startX,
                    right: endX,
                    width: endX - startX,
                })

                $buttons.removeClass('clicking')
                $targetBtn.addClass('active')

                // 动画结束时如果目标按钮在右侧，则left为终点坐标，反之为起点坐标
                $buttonIndicator.animate({
                        width: 0,
                        left: [targetIsAtRight ? endX : startX],
                    },
                    function() {
                        $buttonIndicator.css({
                            left: 0,
                            width: 0,
                            right: 'auto',
                        })
                    }
                )
            }

            function changeColorTheme($ele) {
                let colorCount = COLOR_PALLETE.length
                let colorIndex = $buttons.index($ele) % (colorCount - 1)
                $header.attr('data-theme', COLOR_PALLETE[colorIndex])
            }

            $window.on('scroll', function(evt) {
                let scTp = document.body.scrollTop
                // 大于一定值时渐隐标题
                if (scTp > 30) {
                    $pageTitle.addClass('hidden')
                } else {
                    $pageTitle.removeClass('hidden')
                }
                // 根据scrollTop调整banner高度和阴影top
                $shadow.css(
                    'top',
                    (256 - scTp) < 64 ? 64 : (256 - scTp)
                )
                $banner.css(
                    'height',
                    (192 - scTp) < 0 ? 0 : (192 - scTp)
                )
            })

            $header.fadeIn(100)
        })
    }
})