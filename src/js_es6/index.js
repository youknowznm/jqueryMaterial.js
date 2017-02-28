let $window = $(window),
    $body = $('body'),
    $header = $('#gds-header'),
    $ripple = $header.children('#ripple'),
    $navButtons = $header.find('.nav-anchor'),
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
        $navButtonClicked = $(this);
    })
    .on('click', '.nav-anchor', function(evt) {
        $navButtons.removeClass('active');
        $(this).addClass('active');
    });

$body
    .on('mouseup', function(evt) {
        // 根据事件目标的话，智能判断 mousedown，无法判断 mouseup，因为后者的目标永远是波纹元素。
        // 所以以波纹元素是否已有动画类为标准，决定如何处理
        if ($ripple.hasClass('noneToCircle')) {
            // 先将窗口的 scrollTop 渐变至 0
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
