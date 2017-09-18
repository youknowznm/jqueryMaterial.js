import $ from './jquery.js'

$.fn.extend({
    /**
    生成 angular material 风格的text input元素 https://material.angularjs.org/latest/demo/input
    */
    initInput(options) {

        let inputEleCounter = 1

        this.each(function() {

            let label = options.label || `Input ${inputEleCounter}`
            let maxLength = options.maxLength || 20
            let errorMsg = options.errorMsg || 'Validation failed.'
            let theme = options.theme || 'light'

            let $input = $(this)

            let inputHTML = `
                <label class="placeholder" for="jm-input-${inputEleCounter}">${label}</label>
                <input id="jm-input-${inputEleCounter}" class="_input" maxlength="${maxLength}" />
                <p class="error">${errorMsg}</p>
                <h5 class="char-counter">
                    <span class="current"></span>/<span class="maximum"></span>
                </h5>
            `

            $input.html(inputHTML)

            ++inputEleCounter

            let $_input = $input.children('input')
            let val = $_input.val()
            // 若input子元素的value非空，则添加non-empty类
            $input.toggleClass('non-empty', /\S/.test(val))
            let currentCharCount = val.length
            let maxCharCount = $_input.attr('maxLength')
            $input.find('.current').text(currentCharCount)
            $input.find('.maximum').text(maxCharCount)
            // ‘未点击’状态的标识。在输入框产生初次blur后修改
            $input.data('edited', false)
            $_input.one('blur', function() {
                $input.data('edited', true)
            })

            $('.jm-input ._input')
                .on('focus', function() {
                    let $this = $(this)
                    let $wrap = $this.parents('.jm-input')
                    $wrap.addClass('focused')
                    $wrap.toggleClass('non-empty', $this.val() !== '')
                })
                .on('blur', function() {
                    let $this = $(this)
                    let $wrap = $this.parents('.jm-input')
                    $wrap.removeClass('focused')
                    $wrap.toggleClass('non-empty', $this.val() !== '')
                    validate(this)
                })
                .on('keyup', function() {
                    validate(this)
                })

            function validate(inputEle) {
                let $this = $(inputEle)
                let $wrap = $this.parents('.jm-input')
                // 若edited为true，进行正则验证
                if ($wrap.data('edited') === true) {
                    let regExpStr = $wrap.data('validator') || '.*'
                    let regExp = new RegExp(regExpStr)
                    $wrap.toggleClass('invalid', !regExp.test($this.val()))
                }
                // 字数验证
                let currentCount = $this.val().length
                let currentCharCounter = $wrap.find('.current')
                let maxCharCount = +$wrap.find('.maximum').text()
                currentCharCounter.text(currentCount)
            }

        })
    }
})