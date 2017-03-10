$(function() {

    let $window = $(window).scrollTop(0),
        $body = $('body'),
        $header = $('#gds-header'),
        $ripple = $header.children('#ripple'),
        $navButtons = $header.find('.nav-item'),
        $navIndicator = $header.find('#nav-indicator'),
        $rippleLayer = $header.find('.ripple-layer'),
        $currentTitle = $rippleLayer.children('.current-title');

    let $navButtonClicked = null;

    $header
        .on('mousedown', '.nav-item', function(evt) {
            let $targetBtn = $(this);
            if (!$targetBtn.hasClass('active')) {
                $ripple
                    .css({
                        left: evt.pageX - 50,
                        // top 值要减掉窗口的垂直滚动偏移
                        top: evt.pageY - 50 - document.body.scrollTop,
                    })
                    .addClass('noneToCircle');
                $navButtonClicked = $targetBtn.addClass('clicking');
            }
        })
        .on('click', '.nav-item', function(evt) {
            let $targetBtn = $(this);
            if (!$targetBtn.hasClass('active')) {

                /*
                按钮下划线动画
                */
                let $currentBtn = $navButtons.filter('.active').removeClass('active clicking');
                let targetIsAtRight =
                    $navButtons.index($targetBtn) > $navButtons.index($currentBtn)
                    ? true
                    : false;

                let startX, endX;

                // 根据目标按钮和当前活动按钮的相对位置，求得提示条的目标起始点坐标
                if (targetIsAtRight) {
                    startX = $currentBtn.position().left;
                    endX = $targetBtn.position().left + $targetBtn.innerWidth();
                } else {
                    startX = $targetBtn.position().left;
                    endX = $currentBtn.position().left + $currentBtn.innerWidth();
                }

                $navIndicator.css({
                    left: startX,
                    right: endX,
                    width: endX - startX,
                });

                $targetBtn.removeClass('clicking').addClass('active');

                // 动画结束时如果目标按钮在右侧，则left为终点坐标，反之为起点坐标
                $navIndicator.animate(
                    {
                        width: 0,
                        left: [targetIsAtRight ? endX : startX],
                    },
                    function() {
                        $navIndicator.css({
                            left: 0,
                            width: 0,
                            right: 'auto'
                        });
                    }
                );

                // 主题配色
                changeColorTheme($targetBtn);

                // 改变标题文字
                $currentTitle.text($targetBtn.text());
            }
        });

    $body
        .on('mouseup', function(evt) {
            // 根据事件目标的话，智能判断 mousedown，无法判断 mouseup，因为后者的目标永远是波纹元素。
            // 所以以波纹元素是否已有动画类为标准，决定如何处理
            if ($ripple.hasClass('noneToCircle')) {
                /*
                波纹元素的扩大
                */
                $body.animate({scrollTop: 0}, 200, function() {
                    $ripple
                        .css({
                            'animation-play-state': 'paused',
                        })
                        .removeClass('noneToCircle')
                        .addClass('circleToFullscreen')
                        .css({
                            'animation-play-state': 'running',
                        });
                    setTimeout(function() {
                        // 移除波纹元素的动画类
                        $ripple.removeClass('noneToCircle circleToFullscreen');

                    }, 350);
                });
                //  如果 $navButtonClicked 不为 null，则在它上面触发 click 事件
                if ($navButtonClicked !== null) {
                    $navButtonClicked.click();
                }
            }
        });

    $window
        .on('scroll', function(evt) {
            var scTp = document.body.scrollTop;
            let layerHeight = 192 - scTp;
            (layerHeight < 0) && (layerHeight = 0);
            $rippleLayer.height(layerHeight);
            // 大于一定值时渐隐标题
            if (scTp > 30) {
                $currentTitle.addClass('hidden');
            } else {
                $currentTitle.removeClass('hidden');
            }
        });

    function changeColorTheme($ele) {
        let colorIndex = $navButtons.index($ele) % 5;
        let pallete = [
            'red',
            'yellow',
            'blue',
            'green',
            'gray',
            'silver',
        ];
        // 搜索按钮为特殊配色，其它按以上值循环配色
        $ele.hasClass('search')
            ? $header.attr('data-theme', pallete[5])
            : $header.attr('data-theme', pallete[colorIndex]);

    }

})
