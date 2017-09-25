import $ from './jquery.js'

/**
生成 angular material 风格的模态对话框/提示框
https://material.angularjs.org/latest/demo/dialog
@param options {Object}
    - title {?String} 对话框/提示框标题文字。不提供时为'unnamed modal'
    - content {?String} 对话框/提示框内容文字。不提供时为'default content'
    - confirmButtonText {?String} 确认按钮的内容文字。不提供时为'confirm'
    - cancelButtonText {?String} 取消按钮的内容文字。不提供时为'cancel'
    - onConfirm {?Function} 确认按钮的点击回调。不提供时为一个空方法
    - onCancel {?Function} 取消按钮的点击回调。不提供时为一个空方法
    - showCancel {?boolean} 是否显示取消按钮。true时为对话框，false时为提示框。不提供时为true
*/
$.showJmModal = function(options) {

    let title = options.title || 'unnamed modal'
    let content = options.content || 'default content'
    let confirmButtonText = options.confirmButtonText || 'confirm'
    let cancelButtonText = options.cancelButtonText || 'cancel'
    let onConfirm = (typeof options.onConfirm === 'function') ? options.onConfirm : function() {}
    let onCancel = (typeof options.onCancel === 'function') ? options.onCancel : function() {}
    let showCancel = (typeof options.showCancel === 'boolean') ? options.showCancel : true

    let jmModalHTML

    if (showCancel) {
        jmModalHTML =`
            <div class="jm-modal-wrap">
                <div class="jm-modal">
                    <h1 class="modal-title">${title}</h1>
                    <p class="modal-content">${content}</p>
                    <div class="buttons">
                        <button data-animating="false" data-button-type="cancel" class="jm-button _flat">
                            <span class="content">${cancelButtonText}</span>
                            <div class="ripple-container"><span class="ripple"></span></div>
                        </button>
                        <button data-animating="false" data-button-type="confirm" class="jm-button _flat _primary">
                            <span class="content">${confirmButtonText}</span>
                            <div class="ripple-container"><span class="ripple"></span></div>
                        </button>
                     </div>
                </div>
            </div>`
    } else {
        jmModalHTML =`
            <div class="jm-modal-wrap">
                <div class="jm-modal">
                    <h1 class="modal-title">${title}</h1>
                    <p class="modal-content">${content}</p>
                    <div class="buttons">
                        <button data-animating="false" data-button-type="confirm" class="jm-button _flat _primary full-width">
                            <span class="content">${confirmButtonText}</span>
                            <div class="ripple-container"><span class="ripple"></span></div>
                        </button>
                     </div>
                </div>
            </div>`
    }

    let $body = $('body').append($(jmModalHTML))
    let $wrap = $('.jm-modal-wrap')
    let $modal = $wrap.children('.jm-modal')

    $body.addClass('no-scroll')
    $modal.css('transform-origin', '0 0')
    setTimeout(function() {
        $wrap.addClass('show')
    }, 250)

    $modal.on('click', function(evt) {
        let type = $(evt.target).closest('.jm-button').data('buttonType')
        // 未点击二按钮之一时无操作
        switch (type) {
            case 'confirm':
                onConfirm()
                break
            case 'cancel':
                onCancel()
                break
            default:
                return
        }
        $wrap.removeClass('show')
        setTimeout(function() {
            $body.removeClass('no-scroll')
            $wrap.remove()
        }, 250)
    })

    // esc热键处理。在有取消按钮时点击之；否则点击确认按钮
    $(window).on('keyup', function(evt) {
        if ($modal.length !== 0 && evt.keyCode === 27) {
            if (showCancel === true) {
                $('[data-button-type=cancel]').click()
            } else {
                $('[data-button-type=confirm]').click()
            }
        }
    })
    
}
