let $window = $(window),
    $body = $('body'),
    $header = $('#gds-header'),
    $ripple = $header.children('#ripple'),
    $navButtons = $header.find('.nav-anchor'),
    $navIndicator = $header.find('#nav-indicator'),
    $rippleLayer = $header.find('.ripple-layer');

let $navButtonClicked = null;

$header
    .on('mousedown', '.nav-anchor', function(evt) {
        $ripple
            .css({
                left: evt.pageX - 50,
                // top 值要减掉窗口的垂直滚动偏移
                top: evt.pageY - 50 - document.body.scrollTop,
            })
            .addClass('noneToCircle');
        $navButtonClicked = $(this).addClass('hovering');
    })
    .on('click', '.nav-anchor', function(evt) {
        let $this = $(this);
        if (!$this.hasClass('active')) {

            /*
            按钮下划线动画
            */
            let startX,
                endX,
                $activeBtn = $navButtons.filter('.active');
            // 判断被点击的按钮在当前按钮的右侧还是左侧
            let targetIsAtRight =
                ($navButtons.index($activeBtn) > $navButtons.index($this))
                ? false
                : true;
                console.log('st',$activeBtn.parents('.nav-item').index());
                console.log('ed',$this.parents('.nav-item').index());
                // 计算下划线的起止位置
            if (targetIsAtRight) {
                startX = $activeBtn.parents('.nav-item')[0].offsetLeft;
                endX = $this.parents('.nav-item')[0].offsetLeft;
            } else {
                startX = $this.parents('.nav-item')[0].offsetLeft;
                endX = $activeBtn.parents('.nav-item')[0].offsetLeft;
            }
            $navIndicator.css({
                left: startX,
                right: endX,
                width: endX - startX,
            });
            // 判断缩短动画的方向
            targetIsAtRight
                ? $navIndicator.addClass('slideToRight')
                : $navIndicator.addClass('slideToLeft');

            $navButtons.removeClass('active hovering');
            $this.addClass('active');


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
                    //  如果 $navButtonClicked 不为 null，则在它上面触发 click 事件
                    if ($navButtonClicked !== null) {
                        $navButtonClicked.click();
                    }
                }, 300);
            });

        }
    });

$window
    .on('scroll', function(evt) {
        let layerHeight = 192 - document.body.scrollTop;
        (layerHeight < 0) && (layerHeight = 0);
        $rippleLayer.height(layerHeight);
    });
