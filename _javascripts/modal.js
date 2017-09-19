import $ from './jquery.js'

/**
生成 angular material 风格的模态对话框
https://material.angularjs.org/latest/demo/dialog
*/
$.showJmModal = function(options) {

    // 模态框标题文本
    let title = options.title || 'unnamed modal'
    // 模态框内容文本
    let content = options.content || 'default content'
    // 确认和取消按钮的文案
    let confirmButtonText = options.confirmButtonText || 'confirm'
    let cancelButtonText = options.cancelButtonText || 'cancel'
    // 确认和取消按钮的点击回调
    let onConfirm = (typeof options.onConfirm === 'function') ? options.onConfirm : function() {}
    let onCancel = (typeof options.onCancel === 'function') ? options.onCancel : function() {}
    // 是否显示取消按钮。true时为对话框，否则为提示框
    let showCancel = (typeof options.showCancel === 'boolean')
        ? options.showCancel
        : true

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
        $.jmDelay(function() {
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
    })

}
