import $ from './jquery'

$.fn.extend({
    /**
    生成 angular material 风格的富文本编辑器
    https://material.angularjs.org/latest/demo/input

    @param contentHTML {?String} 编辑区域的HTML字符串。不提供时用空字符串占位
    */
    initRte(contentHTML) {

        let _contentHTML = (typeof contentHTML === 'string') ? contentHTML : ''

        let $rte = $(this)

        function execute(commandName, value = null) {
            document.execCommand(commandName, false, value)
        }

        const ACTIONS = [
            {
                abbr: 'undo',
                fullName: 'undo',
                action: () => execute('undo'),
            },
            {
                abbr: 'redo',
                fullName: 'redo',
                action: () => execute('redo'),
                followedBySeparator: true,
            },
            {
                abbr: 'b',
                fullName: 'bold',
                action: () => execute('bold')
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
                followedBySeparator: true,
            },
            {
                abbr: 'h',
                fullName: 'header',
                action: () => execute('formatBlock', '<H1>'),
                textContentHTML: 'H<sub>1</sub>',
            },
            {
                abbr: 'p',
                fullName: 'paragraph',
                action: () => execute('formatBlock', '<P>'),
                textContentHTML: '&#182;',
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
                abbr: 'ol',
                fullName: 'ordered list',
                action: () => execute('insertOrderedList'),
            },
            {
                abbr: 'ul',
                fullName: 'unordered list',
                action: () => execute('insertUnorderedList'),
                followedBySeparator: true,
            },
            {
                abbr: 'link',
                fullName: 'link',
                action: () => null,
            },
            {
                abbr: 'image',
                fullName: 'image',
                action: () => null,
            },
            {
                abbr: 'hr',
                fullName: 'horizontal line',
                action: () => execute('insertHorizontalRule'),
                followedBySeparator: true,
            },
            {
                abbr: 'clear',
                fullName: 'clear format',
                action: () => execute('removeFormat'),
            },
        ]

        let rteHTML = '<ul class="actions">'

        ACTIONS.forEach(function(action) {
            // 已有该行为的对应图标时，使用图标；否则用字符串标识之
            rteHTML += `
                <li data-action-abbr="${action.abbr}" class="action show-tooltip">
                    ${action.textContentHTML || '<span class="icon-wrap"><i class="icon"></i></span>'}
                    <p class="jm-tooltip to-show-at-top">${action.fullName}</p>
                </li>
                ${action.followedBySeparator === true ? '<div class="separator"></div>' : ''}`
        })

        rteHTML += `</ul>
            <div class="edit-area jm-article" contenteditable="true" spellcheck="false">${_contentHTML}</div>`

        $rte
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

        let $editArea = $('.edit-area')

        // 编辑区首次获得焦点时，检查localStorage中是否有草稿
        $editArea.one('focus', function() {
            let draft = localStorage.getItem('jmRteDraft')
            if (draft !== null && draft !== '') {
                $.showJmModal({
                    title: 'A draft was found in local storage.',
                    content: 'Would you like to restore it?',
                    confirmButtonText: 'restore',
                    onConfirm() {
                        $editArea.html(draft)
                    }
                })
            }
        })

        // TODO
        $editArea.on(
            'input',
            $.jmDebounce(function() {
                console.log($editArea.html());
            }, 500)
        )

    }
})
