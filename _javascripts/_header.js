/**
生成 design.google.com 旧站风格的header
https://web.archive.org/web/20170516175305/https://design.google.com
@param options {Object}
    - siteNameWords {Array.<String>} 站名的单词组成的数组，以'·'和'¬'分隔
    - navContents {Array.<String>} 导航按钮的名称数组
    - activeNavIndex {?Number} 当前活动的导航按钮索引。不提供时为0
*/

const COLOR_PALLETE = [
    'gray',
    'silver',
    'blue',
    'yellow',
    'red',
    'green',
]

$.fn.extend({
    initHeader(options) {
        this.each(function() {
            let { siteNameWords, navContents, activeNavIndex = 0 } = options
            /*
            参数检查
            */
            if (typeof siteNameWords[0] !== 'string') {
                throw new TypeError('Expecting parameter "siteNameWords" as {Array.<String>}')
            }
            if (typeof navContents[0] !== 'string') {
                throw new TypeError('Expecting parameter "navContents" as {Array.<String>}')
            }
            /*
            初始化
            */
            let jmHeaderHTML = `
                <div class="jm-header-content jm-responsive-wrap">
                    <nav class="jm-nav">
                        <a class="site-title" href="/">
                            ${siteNameWords.map((item) => `<span class="jm-single-word">${item}</span>`).join('')}
                        </a>
                        <ul class="nav-buttons">
                            ${navContents.map((item, index) => {
                                let activeStatus = index === activeNavIndex ? 'active' : ''
                                return `<li class="nav-button ${activeStatus}">${item}</li>`
                            }).join('')}
                            <li class="nav-indicator"></li>
                        </ul>
                    </nav>
                    <div class="banner">
                        <h1 class="page-title">
                            <span class="jm-single-word">${navContents[activeNavIndex]}</span>
                        </h1>
                    </div>
                </div>
                <div class="ripple"></div>`

            let $window = $(window).scrollTop(0)
            let $body = $('body')

            // header 元素主体
            let $fullHeader = $(this).hide().attr('data-theme', COLOR_PALLETE[activeNavIndex])
                              .html(jmHeaderHTML)

            let $header = $fullHeader.find('.jm-header-content')

            let $ripple = $fullHeader.find('.ripple')
            // 导航按钮容器
            let $buttonsWrap = $header.find('.nav-buttons')
            // 所有导航按钮
            let $buttons = $buttonsWrap.find('.nav-button')
            // 按钮底部提示条
            let $buttonIndicator = $header.find('.nav-indicator')
            // 波纹元素容器
            let $banner = $header.find('.banner')
            // 页面大标题
            let $pageTitle = $banner.find('.jm-single-word')

            // 主内容容器
            let $mainWrap = $('.jm-main-wrap')

            // .nav-buttons显示多于一行时，隐藏掉按钮底部提示条，并调整.jm-main-wrap的上外边距
            let isMobile = $('html').is('#mobile')

            setTimeout(function() {
                let navLineHeight = isMobile ? 50 : 64
                let navHeight = +$buttonsWrap.height()
                if (navHeight > navLineHeight) {
                    $buttonIndicator.addClass('hidden')
                }
                if (isMobile) {
                    $mainWrap.css('marginTop', navLineHeight + navHeight)
                }
            }, 0)

            $window.on('scroll', function(evt) {
                // 桌面端
                if (!isMobile) {
                    let scTp = document.documentElement.scrollTop
                    // 主体的滚动距离大于一定值时渐隐标题
                    $banner.find('.jm-single-word').toggleClass('hidden', scTp > 30)
                    $banner.css(
                        'height',
                        (192 - scTp) < 0 ? 0 : (192 - scTp)
                    )
                }
            })

            /*
            波纹动画
            */
            let rippling = false
            let $buttonClicked = null
            let headerHeight = $('.jm-header').height()
            $body
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
                                // IDEA 是documentElement不是body！！！所以$.animate()也坏掉了
                                top: evt.pageY - 50 - document.documentElement.scrollTop,
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
                        $('.jm-main-wrap').jmScrollInto(
                            function() {
                                $ripple
                                    .removeClass('noneToCircle')
                                    .addClass('toFullscreen')
                                setTimeout(function() {
                                    // 移除波纹元素的动画类
                                    $ripple.removeClass('noneToCircle toFullscreen')
                                    rippling = false
                                }, 670)
                            },
                            headerHeight
                        )
                        // 主题配色
                        changeColorTheme($buttonClicked)
                        // 改变标题文字
                        $pageTitle.text($buttonClicked.text())
                        // 按钮提示条动画
                        indicate($buttonClicked)
                    }
                })

            $fullHeader.show()

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
                let colorIndex = $buttons.index($ele) % colorCount
                $fullHeader.attr('data-theme', COLOR_PALLETE[colorIndex])
            }

        })
    }
})