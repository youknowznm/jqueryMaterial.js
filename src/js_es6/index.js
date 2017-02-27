let $header = $('#gds-header'),
    $ripple = $header.children('#ripple');


$('#gds-header')
    .on('mousedown', '.nav-anchor', function(evt) {
        $ripple
            .css({
                left: evt.pageX - 50,
                top: evt.pageY - 50,
            })
            .addClass('noneToCircle');
    })
    .on('mouseup', function(evt) {
        // 根据事件目标的话，智能判断 mousedown，无法判断 mouseup，因为后者的目标永远是波纹元素。
        // 所以以波纹元素是否已有动画类为标准，决定如何处理
        if ($ripple.hasClass('noneToCircle')) {
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
                $ripple.removeClass('noneToCircle circleToFullscreen');
            }, 400)
        }
   });
