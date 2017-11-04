// 命令相关
const ACTIONS = [
    {
        abbr: 'undo',
        fullName: 'undo',
        action: () => execute('bold'),
        followingSeparator: true,
    },
    {
        abbr: 'redo',
        fullName: 'redo',
        action: () => execute('redo'),
    },
    {
        abbr: 'b',
        fullName: 'bold',
        action: () => execute('bold'),
        followingSeparator: true,
    },
    {
        abbr: 'i',
        fullName: 'italic',
        action: () => execute('italic'),
    },
    {
        abbr: 'u',
        fullName: 'underline',
        action: () => execute('underline'),
    },
    {
        abbr: 's',
        fullName: 'strikethrough',
        action: () => execute('strikeThrough'),
    },
    {
        // IDEA
        abbr: 'hl',
        fullName: 'highlight',
        action: () => highlightSpan(),
        followingSeparator: true,
    },
    {
        abbr: 'h',
        fullName: 'header',
        action: () => execute('formatBlock', '<H1>'),
        textContentHTML: 'H<sub>1</sub>',
        followingSeparator: true,
    },
    {
        abbr: 'p',
        fullName: 'paragraph',
        action: () => execute('formatBlock', '<P>'),
        textContentHTML: '&#182',
    },
    {
        abbr: 'q',
        fullName: 'quote',
        action: () => execute('formatBlock', '<BLOCKQUOTE>'),
    },
    {
        abbr: 'code',
        fullName: 'code',
        action: () => execute('formatBlock', '<PRE>'),
    },
    {
        abbr: 'ul',
        fullName: 'unordered list',
        action: () => execute('insertUnorderedList'),
    },
    {
        abbr: 'ol',
        fullName: 'ordered list',
        action: () => execute('insertOrderedList'),
    },
    {
        abbr: 'link',
        fullName: 'link',
        action: () => addLink(),
        followingSeparator: true,
    },
    {
        abbr: 'image',
        fullName: 'image',
        action: () => addImage(),
    },
    {
        abbr: 'hr',
        fullName: 'horizontal line',
        action: () => execute('insertHorizontalRule'),
    },

    {
        abbr: 'clear',
        fullName: 'clear format',
        action: () => execute('removeFormat'),
        followingSeparator: true,
    },
]

// 执行document.execCommand的相应命令
function execute(commandName, value = null) {
    document.execCommand(commandName, false, value)
}

// 使编辑区适应其内容的高度
// IDEA
// editAreaEle.style['height'] = editAreaEle.scrollHeight

// 移动光标至编辑区的末尾
// IDEA
// https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
function moveCursorToEditAreaEnd() {
    let editAreaEle = document.querySelector('.jm-edit-area')
    if (!document.createRange) {
        throw new Error('Get a proper browser please.')
    }
    let range = document.createRange()
    range.selectNodeContents(editAreaEle)
    range.collapse(false)
    let selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
}

// 将当前选中内容包装在<code>标签内。无选择内容时不操作
function highlightSpan() {
    let selectedText = document.getSelection().toString()
    if (/\S/.test(selectedText)) {
        execute('insertHTML', `<code>${selectedText}</code>`)
    }
}

// 在编辑区末尾插入链接
function addLink() {
    $.showJmDialog({
        dialogType: 'prompt',
        title: 'Set link attributes.',
        content: 'Enter the text and URL for target <a> tag.',
        promptDataArr: [
            {
                name: 'Text',
                value: '',
            },
            {
                name: 'URL',
                value: 'https://',
            },
        ],
        onConfirm() {
            let anchorText = $('#jm-prompt-input-1').val()
            let anchorURL = $('#jm-prompt-input-2').val()
            moveCursorToEditAreaEnd()
            execute('insertHTML', `<a href="${anchorURL}" target="_blank">${anchorText}</a>`)
        },
    })
}

// 在编辑区末尾插入图片
function addImage() {
    $.showJmDialog({
        dialogType: 'prompt',
        title: 'Set image attributes.',
        content: 'Enter the source and alternative text for target <img> tag.',
        promptDataArr: [
            {
                name: 'src',
                value: '',
            },
            {
                name: 'alt',
                value: '',
            },
        ],
        onConfirm() {
            let imageSrc = $('#jm-prompt-input-1').val()
            let imageAlt = $('#jm-prompt-input-2').val()
            moveCursorToEditAreaEnd()
            execute('insertHTML', `<img src="${imageSrc}" alt="${imageAlt}"/>`)
        },
    })
    // // 用base64存储图片，暂时弃用
    // getOriginBase64URL(function(originBase64URL) {
    //     getCompressedBase64URL(originBase64URL, function(compressedBase64URL) {
    //         $.showJmDialog({
    //             dialogType: 'prompt',
    //             title: 'Set image attribute.',
    //             content: 'Enter the alternative text for target <img> tag.',
    //             promptDataArr: [
    //                 {
    //                     name: 'Alternative Text',
    //                     value: '',
    //                 },
    //             ],
    //             onConfirm() {
    //                 let alt = $('#jm-prompt-input-1').val()
    //                 moveCursorToEditAreaEnd()
    //                 execute('insertHTML', `<img src="${compressedBase64URL}" alt="${alt}" />`)
    //             },
    //         })
    //     })
    // })
    // // 触发file input交互，取得目标图片的base64 URL
    // function getOriginBase64URL(cb) {
    //     let $jmRteFileInput = $('<input class="jm-rte-file-input" type="file" accept="image/*" />')
    //     $('body').append($jmRteFileInput)
    //     $jmRteFileInput.on('change', function() {
    //         let selectedImage = $jmRteFileInput[0].files[0]
    //         let reader = new FileReader()
    //         reader.onload = function(e) {
    //             $jmRteFileInput.remove()
    //             cb(e.target.result)
    //         }
    //         reader.readAsDataURL(selectedImage)
    //     })
    //     $jmRteFileInput.click()
    // }
    // // 目标图片宽度大于800时，压缩其base64 URL
    // function getCompressedBase64URL(originBase64URL, cb) {
    //     let agentImage = new Image()
    //     agentImage.src = originBase64URL
    //     agentImage.onload = function() {
    //         let originWidth = this.width
    //         if (originWidth > 800) {
    //             let originHeight = this.height
    //             let scale = originWidth / originHeight
    //             let agentCanvas = document.createElement('canvas')
    //             agentCanvas.setAttribute('width',  800)
    //             let scaledHeight = 800 / scale
    //             agentCanvas.setAttribute('height', scaledHeight)
    //             let ctx = agentCanvas.getContext('2d')
    //             ctx.drawImage(this, 0, 0, 800, scaledHeight)
    //             let compressedBase64URL = agentCanvas.toDataURL('image/jpeg')
    //             cb(compressedBase64URL)
    //         } else {
    //             cb(originBase64URL)
    //         }
    //     }
    // }
}

$.fn.extend({
    /**
    生成 angular material 风格的富文本编辑器
    https://material.angularjs.org/latest/demo/input
    @param options {Object}
        - id {String} 当前编辑内容的唯一标识，用于在localStorage内存取
                      注意在内容提交成功后，需使用localStorage.removeItem(`jmRteDraft-${id}`)手动删除草稿
        - contentToEdit {?String} 编辑区域的内容。不提供时用空字符串占位
        - maxLength {?Number} 编辑区域的最大字符数。不提供时为500
        - useRichText {?Boolean} 是否使用富文本、而不使用markdown，在移动端强制为false。为false时隐藏编辑工具栏。不提供时为true
    */
    initRte(options) {

        // 参数检查
        if (typeof options.id !== 'string' || !/\S/.test(options.id)) {
            throw new TypeError('Expecting parameter "options.id" as non-empty {String}')
        }

        let id = options.id
        let contentToEdit = (typeof options.contentToEdit === 'string') ? options.contentToEdit : ''
        let maxLength = (typeof options.maxLength === 'number') ? options.maxLength : 500
        let useRichText = (typeof options.useRichText === 'boolean') ? options.useRichText : true

        // 移动端强制使用markdown
        if ($('html').is('#mobile')) {
            useRichText = false
        }

        let $rte = $(this)

        // 使用富文本而不是Markdown时，显示编辑工具栏
        if (useRichText === false) {
            $rte.addClass('is-mark-down')
        }

        let rteHTML = '<ul class="actions">'

        ACTIONS.forEach(function(action) {
            // 已有该行为的对应图标时，使用图标；否则用字符串标识之
            rteHTML += `${action.followingSeparator === true ? '<div class="separator"></div>' : ''}
                <li data-action-abbr="${action.abbr}" class="action show-tooltip">
                    ${action.textContentHTML || '<span class="icon-wrap"><i class="icon"></i></span>'}
                    <p class="jm-tooltip to-show-at-top">${action.fullName}</p>
                </li>`
        })

        rteHTML += '</ul>'

        // 富文本时使用contenteditable的div，否则使用textarea
        if (useRichText === true) {
            rteHTML += `<article class="jm-edit-area jm-article" contenteditable="true" spellcheck="false">${contentToEdit}</article>`
        } else {
            rteHTML += `<textarea class="jm-edit-area jm-article" resize="false" placeholder="Markdown Content" spellcheck="false">${contentToEdit}</textarea>`
        }

        rteHTML += `<p class="char-counter"><span class="current">0</span>/<span class="maximum">${maxLength}</span></p>`

        $rte
            .attr('data-id', id)
            .html(rteHTML)
            // IDEA 在可编辑区域获得焦点时，execCommand才起作用。否则返回false；而li元素上的mousedown事件会夺取焦点
            // https://stackoverflow.com/questions/12525087/why-doesnt-the-document-execcommand-work-when-i-click-on-a-div
            .on('mousedown', '.action', function(evt) {
                evt.preventDefault()
            })
            .on('click', '.action', function(evt) {
                let $this = $(this)
                let targetActionAbbr = $this.data('actionAbbr')
                let actionObj = ACTIONS.find(function(item) {
                    return item.abbr === targetActionAbbr
                })
                actionObj.action()
            })

        let $editArea = $('.jm-edit-area')

        // 取得相应草稿在localStorage中的键名
        let targetDraftName = `jmRteDraft-${id}`

        $editArea
            // 编辑区首次获得焦点时，检查localStorage中是否有草稿
            .one('focus', function() {
                let currentDraft = localStorage.getItem(targetDraftName)
                if (currentDraft !== null) {
                    $.showJmDialog({
                        dialogType: 'confirm',
                        title: 'A draft was found in local storage.',
                        content: 'Would you like to restore it?',
                        confirmButtonText: 'restore',
                        onConfirm() {
                            $editArea.html(currentDraft)
                            moveCursorToEditAreaEnd()
                        }
                    })
                }
            })
            .on('focus', function() {
                $rte.addClass('focused')
            })
            .on('blur', function() {
                $rte.removeClass('focused')
            })
            // 监听输入事件，若编辑器的实际内容非空，则debounce后保存至localStorage
            .on(
                'input',
                $.jmDebounce(function() {
                    if (/\S/.test($editArea.text())) {
                        localStorage.setItem(targetDraftName, $editArea.html())
                    }
                }, 500)
            )

        if (useRichText === true) {
            let $currentLength = $rte.find('.current').text($editArea.text().length)
            $editArea
                // 监听输入事件，立即根据输入内容改变元素高度、检查是否超出字数限制
                .on('input', function() {
                    if (useRichText === true) {
                        currentLength = $editArea.text().length
                        $currentLength.html(currentLength)
                        $rte.toggleClass('exceeded', currentLength > maxLength)
                    }
                })
                // IDEA tab的效果在down时产生
                // tab和shift+tab监听
                .on('keydown', function(e) {
                    if (e.keyCode === 9) {
                        e.preventDefault()
                        if (e.shiftKey !== true) {
                            execute('indent')
                        } else {
                            execute('outdent')
                        }
                    }
                })
        }
    }
})