import $ from './jquery'
import initMdButton from './md-button'

/**
@param options {object}
    - isDialog {Boolean} 为true时显示为dialog，否则为prompt
    - title {String} 标题字符串
    - content {String} 内容字符串
    - onConfirm {Function?} 可选的确认按钮回调
    - onCancel {Function?} 可选的取消按钮回调
*/
export default function showMdModal(options) {

    let mdModalHTML

    if (options.isDialog === true) {
        mdModalHTML =
            `<div class="md-modal-wrap">
                <div class="md-modal">
                    <h1 class="modal-title">${options.title}</h1>
                    <p class="modal-content">${options.content}</p>
                    <div class="buttons">
                        <button data-button-type="confirm" class="md-button _flat _primary">
                            <span class="content">confirm</span>
                            <div class="ripple-container"><span class="ripple"></span></div>
                        </button>
                        <button data-button-type="cancel" class="md-button _flat _primary">
                            <span class="content">cancel</span>
                            <div class="ripple-container"><span class="ripple"></span></div>
                        </button>
                     </div>
                </div>
            </div>`
    } else {
        mdModalHTML =
            `<div class="md-modal-wrap">
                <div class="md-modal">
                    <h1 class="modal-title">${options.title}</h1>
                    <p class="modal-content">${options.content}</p>
                    <div class="buttons">
                        <button data-button-type="cancel" class="md-button _flat _primary full-width">
                            <span class="content">OK</span>
                            <div class="ripple-container"><span class="ripple"></span></div>
                        </button>
                     </div>
                </div>
            </div>`
    }

    $('body').append($(mdModalHTML))
    initMdButton()

    let $body = $('body')
    let $modal = $('.md-modal')
    let $wrap = $('.md-modal-wrap')

    $body.addClass('no-scroll')
    $modal.css('transform-origin', '0 0')
    setTimeout(function() {
        $wrap.addClass('show')
    }, 250)

    $modal.on('click', function(evt) {
        rhaegoUtil.mdDelay(function() {
            let type = $(evt.target).closest('.md-button').data('buttonType')
            // 未点击二按钮之一时无操作
            switch (type) {
                case 'confirm':
                    if (typeof options.onConfirm === 'function') {
                        options.onConfirm()
                    }
                    break
                case 'cancel':
                    if (typeof options.onCancel === 'function') {
                        options.onCancel()
                    }
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