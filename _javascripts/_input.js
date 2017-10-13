$.fn.extend({
    /**
    生成 angular material 风格的text input元素
    https://material.angularjs.org/latest/demo/input
    目标元素可配置的属性：
        - data-type 输入框类型。可为text、password等，不提供时为'text'
        - data-label 输入框标题。不提供时从'Input 1'开始计数
        - data-value 实际内容文字。不提供时为''
        - data-maxLength 最大字符数。不提供时为20
        - data-validator 验证内容的正则。不提供时为'.*'
        - data-errorMsg 内容未通过正则验证时的提示。不提供时为'Validation failed.'
        - data-theme 主题配色。可为'dark'或'light'，不提供时为'light'
        - data-status 是否禁用输入框。值为'disabled'时禁用，否则为可用
    */
    initInput(options) {

        let inputEleCounter = 1

        this.each(function() {

            let $input = $(this)

            let type = $input.data('type') || `text`
            let label = $input.data('label') || `Input ${inputEleCounter}`
            let value = $input.data('value') || ''
            let maxLength = $input.data('maxLength') || 20
            let regExpStr = $input.data('validator') || '.*'
            let errorMsg = $input.data('errorMsg') || 'Validation failed.'
            let theme = $input.data('theme') || 'light'
            let disabled = $input.data('status') === 'disabled' ? 'disabled' : ''

            let inputHTML = `
                <div class="jm-input-content">
                    <label class="placeholder" for="jm-input-${inputEleCounter}">${label}</label>
                    <input id="jm-input-${inputEleCounter}" class="_input" type="${type}" maxlength="${maxLength}" value="${value}" ${disabled} spellcheck="false" />
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

            $_input
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
                .on('input', function() {
                    validate(this)
                })

            function validate(inputEle) {
                let $this = $(inputEle)
                let $wrap = $this.parents('.jm-input')
                let regExp = new RegExp(regExpStr)
                $wrap.toggleClass('invalid', !regExp.test($this.val()))
                // 字数验证
                let currentCount = $this.val().length
                let currentCharCounter = $wrap.find('.current')
                currentCharCounter.text(currentCount)
            }

            ++inputEleCounter

        })
    }
})