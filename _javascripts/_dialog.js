function noop() {}

/**
生成 angular material 风格的模态对话框
https://material.angularjs.org/latest/demo/dialog
@param options {Object}
    - dialogType {?String} 对话框类型，可为'alert'、'confirm'或'prompt'。不提供时为'alert'
    - title {?String} 对话框标题文字。不提供时为'unnamed dialog'
    - content {?String} 对话框内容文字。不提供时为'default content'
    - confirmButtonText {?String} 确认按钮的内容文字。不提供时为'confirm'
    - cancelButtonText {?String} 取消按钮的内容文字。不提供时为'cancel'
    - onConfirm {?Function} 确认按钮的点击回调。不提供时为一个空方法
    - onCancel {?Function} 取消按钮的点击回调。不提供时为一个空方法
    - promptDataArr {?Array.<Object>} prompt框的数据对象数组。当dialogType为prompt时必须提供
    - onDialogReady (?Function) 对话框DOM就绪时的回调，可在内部进行样式、监听等的处理。不提供时为一个空方法
*/
$.showJmDialog = function(options) {

        let dialogType = options.dialogType ? options.dialogType : 'alert'

        let title = options.title || 'unnamed dialog'
        let content = options.content || 'default content'
        let confirmButtonText = options.confirmButtonText || 'confirm'
        let cancelButtonText = options.cancelButtonText || 'cancel'
        let onConfirm = (typeof options.onConfirm === 'function') ? options.onConfirm : noop
        let onCancel = (typeof options.onCancel === 'function') ? options.onCancel : noop
        let onDialogReady = (typeof options.onDialogReady === 'function') ? options.onDialogReady : noop
        let promptDataArr = options.promptDataArr

        // IDEA: 根据初始的html是否有垂直溢出内容，判断是否需隐藏滚动条
        let hasOverflownContent = document.documentElement.scrollHeight > document.documentElement.clientHeight

        let jmDialogHTML

        switch (dialogType) {
            case 'alert':
                jmDialogHTML = `
                <div class="jm-dialog-wrap" id="jm-dialog-removable">
                    <div class="jm-dialog">
                        <h1 class="dialog-title">${title}</h1>
                        <p class="dialog-content">${content}</p>
                        <div class="buttons">
                            <button id="jm-dialog-confirm" class="jm-button _flat _primary full-width" data-text="${confirmButtonText}"></button>
                         </div>
                    </div>
                </div>`
                break;
            case 'confirm':
                jmDialogHTML = `
                <div class="jm-dialog-wrap" id="jm-dialog-removable">
                    <div class="jm-dialog">
                        <h1 class="dialog-title">${title}</h1>
                        <p class="dialog-content">${content}</p>
                        <div class="buttons">
                            <button id="jm-dialog-cancel" class="jm-button _flat _primary" data-text="${cancelButtonText}"></button>
                            <button id="jm-dialog-confirm" class="jm-button _flat _primary" data-text="${confirmButtonText}"></button>
                         </div>
                    </div>
                </div>`
                break;
            case 'prompt':
                // 选择了prompt类型但未提供promptDataArr数组时抛出
                if (!Array.isArray(promptDataArr)) {
                    throw new TypeError('Expecting parameter "options.promptDataArr" as {Array.<Object>}')
                }
                jmDialogHTML = `
                <div class="jm-dialog-wrap" id="jm-dialog-removable">
                    <div class="jm-dialog">
                        <h1 class="dialog-title">${title}</h1>
                        <p class="dialog-content">${content}</p>
                        ${promptDataArr.map((item, index) => {
                            return `<input id="jm-prompt-input-${index + 1}"
                                           class="prompt-input"
                                           placeholder="${item.name}"
                                           value="${item.value}"
                                           spellcheck="false" />`
                        }).join('')}
                        <div class="buttons">
                            <button id="jm-dialog-cancel" class="jm-button _flat _primary" data-text="${cancelButtonText}"></button>
                            <button id="jm-dialog-confirm" class="jm-button _flat _primary" data-text="${confirmButtonText}"></button>
                         </div>
                    </div>
                </div>`
    }

    let $html = $('html')
    let $body = $('body').append($(jmDialogHTML))
    let $wrap = $('#jm-dialog-removable')
    let $dialog = $wrap.children('.jm-dialog')
    let $cancelButton = $dialog.find('#jm-dialog-cancel')
    let $confirmButton = $dialog.find('#jm-dialog-confirm')

    $html.addClass('no-scroll')
    if (hasOverflownContent) {
        $html.addClass('hide-scroll-bar')
    }
    $dialog.css('transform-origin', '0 0')

    function clickingTargetButton($button) {
        if (!$button.hasClass('_disabled')) {
            if ($button.is('#jm-dialog-cancel')) {
                onCancel()
            } else {
                onConfirm()
            }
            $wrap.removeClass('show')
            $wrap.on('animationend', function() {
                $html.removeClass('no-scroll hide-scroll-bar')
                $wrap.remove()
            })
        }
    }

    $cancelButton.initButton(function() {
        clickingTargetButton($cancelButton)
    })
    $confirmButton.initButton(function() {
        clickingTargetButton($confirmButton)
    })

    // 为propmt框时，只在所有.prompt-input框内容有效时允许点击confirm按钮
    if (dialogType === 'prompt') {
        let $confirmButton = $('#jm-dialog-confirm').addClass('_disabled')
        let $dialogInputs = $('.prompt-input')
        $dialogInputs.on('input', function() {
            let allValid = true
            $dialogInputs.each(function() {
                if (!/\S/.test($(this).val())) {
                    allValid = false
                    return
                }
                $confirmButton.toggleClass('_disabled', !allValid)
            })
        })
    }

    onDialogReady()

    setTimeout(function() {
        $wrap.addClass('show')
    }, 100)

}