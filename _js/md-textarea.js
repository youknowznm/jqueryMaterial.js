import $ from './jquery'

export default function initMdTextarea() {

    function initTextarea($mdTextarea) {
        let $textarea = $mdTextarea.children('textarea')
        let val = $textarea.val()
        // 若textarea内容非空，则添加non-empty类
        $mdTextarea.toggleClass('non-empty', /\S/.test(val))
        let currentCharCount = val.length
        let maxCharCount = $textarea.attr('maxlength')
        $mdTextarea.find('.current').text(currentCharCount)
        $mdTextarea.find('.maximum').text(maxCharCount)
        // ‘未点击’状态的标识。在输入框产生初次blur后修改
        $mdTextarea.data('edited', false)
        $textarea.one('blur', function() {
            $mdTextarea.data('edited', true)
        })
    }

    $('.md-textarea').each(function() {
        initTextarea($(this))
    })

    $('.md-textarea ._input')
        .on('focus', function() {
            let $this = $(this)
            let $wrap = $this.parent()
            $wrap.addClass('focused')
            $wrap.toggleClass('non-empty', $this.val() !== '')
        })
        .on('blur', function() {
            let $this = $(this)
            let $wrap = $this.parent()
            $wrap.removeClass('focused')
            $wrap.toggleClass('non-empty', $this.val() !== '')
            validate(this)
        })
        .on('keyup', function() {
            validate(this)
        })

    function validate(inputEle) {
        let $this = $(inputEle)
        let $wrap = $this.parent()
        // 字数验证
        let currentCount = $this.val().length
        let currentCharCounter = $wrap.find('.current')
        let maxCharCount = +$wrap.find('.maximum').text()
        currentCharCounter.text(currentCount)
        // $wrap.toggleClass('invalid', currentCount === maxCharCount);
    }

    setTimeout(function() {
        let $flexibleInput = $('.md-textarea.responsive-height ._input')
        if ($flexibleInput.length > 0) {
            let response = function() {
                $flexibleInput
                    .height(1)
                    .height($flexibleInput[0].scrollHeight)
            }
            response()
            $flexibleInput.on('input', function() {
                response()
            })
        }
    }, 0)

}
