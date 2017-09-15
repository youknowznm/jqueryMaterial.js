import $ from './jquery.js'

$.fn.extend({
    initHeader() {
        this.each(function() {
            let $window = $(window).scrollTop(0)
            let $body = $('body')
            let $header = $(this) // header 元素主体
            let $ripple = $header.children('.ripple') // 波纹元素
            let $buttonsContainer = $header.find('.nav-buttons') // 导航按钮容器
            let $buttons = $header.find('.nav-button') // 所有导航按钮
            let $navbuttonIndicator = $header.find('.nav-indicator') // 按钮底部提示条
            let $banner = $header.find('.banner') // 波纹元素容器
            let $pageTitle = $banner.children('.page-title') // 页面大标题
            let $shadow = $('.jm-header-shadow') // header 阴影

            /*
            波纹动画
            */
            let rippling = false
            let $navButtonClicked = null
            $body
                .on('mousedown', '.nav-button:not(.active)', function(evt) {
                    if (rippling === false) {
                        rippling = true
                        let $targetBtn = $(this)
                        $navButtonClicked = $targetBtn
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
                // .on('click', '.nav-button', function(evt) {
                //     let $targetBtn = $(this)
                //     if (!$targetBtn.hasClass('active') && !rippling) {
                //         rippling = true
                        // // 主题配色
                        // changeColorTheme($targetBtn)
                        // // 改变标题文字
                        // $pageTitle.text($targetBtn.text())
                //     }
                // })
                .on('mouseup', function(evt) {
                    if (rippling === true && $navButtonClicked !== null) {
                        /*
                        滚动至顶部后扩大波纹元素
                        */
                        $body.animate(
                            {
                                scrollTop: 0
                            },
                            200,
                            function() {
                                $ripple
                                    .css({
                                        'animation-play-state': 'paused',
                                    })
                                    .removeClass('noneToCircle')
                                    .addClass('toFullscreen')
                                    .css({
                                        'animation-play-state': 'running',
                                    })
                                // 动画时间结束后，移除波纹元素的动画类，修改rippling旗标
                                setTimeout(function() {
                                    $ripple.removeClass(
                                        'noneToCircle toFullscreen'
                                    )
                                    rippling = false
                                    $navButtonClicked = null
                                }, 650)
                            }
                        )
                        // 主题配色
                        changeColorTheme($navButtonClicked)
                        // 改变标题文字
                        $pageTitle.text($navButtonClicked.text())
                    }
                })

            /*
            按钮下划线动画
            */
            // $header
            //     .on('mousedown', '.nav-button', function(evt) {
            //         let $targetBtn = $(this)
            //         $navButtonClicked = $targetBtn.addClass('clicking')
            //     })
            //     .on('mouseup', '.nav-button', function(evt) {
            //         let $targetBtn = $(this)
            //         let $currentBtn = $buttons.filter('.active').removeClass(
            //             'active clicking')
            //         let targetIsAtRight =
            //             $buttons.index($targetBtn) > $buttons.index(
            //                 $currentBtn) ? true : false
            //
            //         let startX, endX
            //
            //         // 根据目标按钮和当前活动按钮的相对位置，求得提示条的目标起始点坐标
            //         if (targetIsAtRight) {
            //             startX = $currentBtn.position().left
            //             endX = $targetBtn.position().left + $targetBtn.innerWidth()
            //         } else {
            //             startX = $targetBtn.position().left
            //             endX = $currentBtn.position().left + $currentBtn.innerWidth()
            //         }
            //
            //         $navbuttonIndicator.css({
            //             left: startX,
            //             right: endX,
            //             width: endX - startX,
            //         })
            //
            //         $buttons.removeClass('clicking')
            //         $targetBtn.addClass('active')
            //
            //         // 动画结束时如果目标按钮在右侧，则left为终点坐标，反之为起点坐标
            //         $navbuttonIndicator.animate({
            //                 width: 0,
            //                 left: [targetIsAtRight ? endX : startX],
            //             },
            //             function() {
            //                 $navbuttonIndicator.css({
            //                     left: 0,
            //                     width: 0,
            //                     right: 'auto',
            //                 })
            //             }
            //         )
            //     })
            //     .on('click', '.nav-button', function(evt) {
            //         //  如果 $navButtonClicked 不为 null，则在它上面触发 click 事件
            //         if ($navButtonClicked !== null) {
            //             $navButtonClicked.click()
            //         }
            //     })

            $window
                .on('scroll', function(evt) {
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

            function changeColorTheme($ele) {
                let colorIndex = $buttons.index($ele) % 5
                let pallete = [
                    'silver',
                    'gray',
                    'yellow',
                    'red',
                    'blue',
                    'green',
                ]
                // 搜索按钮为特殊配色，其它按以上值循环配色
                $ele.hasClass('search') ? $header.attr('data-theme', pallete[5]) :
                    $header.attr('data-theme', pallete[colorIndex])
            }
        })
    }
})