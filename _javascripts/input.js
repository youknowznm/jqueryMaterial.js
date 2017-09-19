import $ from './jquery.js'

$.fn.extend({
    /**
    生成 angular material 风格的text input元素 https://material.angularjs.org/latest/demo/input
    */
    initInput(options) {

        let inputEleCounter = 1

        this.each(function() {

            let $input = $(this)

            let label = $input.data('label') || `Input ${inputEleCounter}`
            let maxLength = $input.data('maxLength') || 20
            let errorMsg = $input.data('errorMsg') || 'Validation failed.'
            let theme = $input.data('theme') || 'light'
            let regExpStr = $input.data('validator') || '.*'
            let value = $input.data('value') || ''

            // $input.data

            let inputHTML = `
                <div class="jm-input-content">
                    <label class="placeholder" for="jm-input-${inputEleCounter}">${label}</label>
                    <input id="jm-input-${inputEleCounter}" class="_input" maxlength="${maxLength}" value="${value}"/>
                    <p class="error">${errorMsg}</p>
                    <p class="char-counter">
                        <span class="current"></span>/<span class="maximum"></span>
                    </p>
                </div>`

            $input
                .toggleClass('_dark', theme === 'dark')
                .html(inputHTML)

            let $_input = $input.find('._input')
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
                    let regExp = new RegExp(regExpStr)
                    $wrap.toggleClass('invalid', !regExp.test($this.val()))
                }
                // 字数验证
                let currentCount = $this.val().length
                let currentCharCounter = $wrap.find('.current')
                let maxCharCount = +$wrap.find('.maximum').text()
                currentCharCounter.text(currentCount)
            }

            ++inputEleCounter

        })
    }
})