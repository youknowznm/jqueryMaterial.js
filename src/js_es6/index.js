let $window = $(window),
    $body = $('body'),
    $header = $('#gds-header'),
    $ripple = $header.children('#ripple'),
    $navButtons = $header.find('.nav-item'),
    $navIndicator = $header.find('#nav-indicator'),
    $rippleLayer = $header.find('.ripple-layer');

let $navButtonClicked = null;

$header
    .on('mousedown', '.nav-item', function(evt) {
        $ripple
            .css({
                left: evt.pageX - 50,
                // top 值要减掉窗口的垂直滚动偏移
                top: evt.pageY - 50 - document.body.scrollTop,
            })
            .addClass('noneToCircle');
        $navButtonClicked = $(this).addClass('hovering');
    })
    .on('click', '.nav-item', function(evt) {
        let $this = $(this);
        if (!$this.hasClass('active')) {

            /*
            按钮下划线动画
            */
            let $activeBtn = $navButtons.filter('.active'),
                activeBtnOffsetParent = $activeBtn.closest('.nav-item')[0],
                $targetBtn = $(this),
                targetBtnOffsetParent = $targetBtn.closest('.nav-item')[0];

            let targetIsAtRight =
                $navButtons.indexOf($targetBtn) > $navButtons.indexOf($activeBtn)
                ? true
                : false;

                let startX, endX;

            // 取得目标按钮和当前按钮的起始、结束共四个坐标中的最大和最小值，分别作为下划线的起点和终点
            let coors = [
                activeBtnOffsetParent.offsetLeft,
                activeBtnOffsetParent.offsetLeft + $activeBtn.innerWidth(),
                targetBtnOffsetParent.offsetLeft,
                targetBtnOffsetParent.offsetLeft + $targetBtn.innerWidth(),
            ];

            if (targetIsAtRight) {
                startX = $activeBtn.closest
            }

            let startX = Math.min.apply(null, coors);
            let endX = Math.max.apply(null, coors);
            // console.log(startX-endX);
            $navIndicator.css({
                left: startX,
                right: endX,
                width: endX - startX,
            });

            $navIndicator.css('right','auto').animate({
                width: 0
            }, 1000, function() {
                $navButtons.removeClass('active hovering');
                $this.addClass('active');
                $navIndicator.css({
                    left: 0,
                    right: 'auto',
                    width: 0,
                })
            })

            // $navButtons.removeClass('active hovering');
            // $this.addClass('active');


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
