import $ from 'jquery'

/**
@param
*/
$.fn.extend({
    initRte(options) {
        let $jmRte = $('.jm-rte')
        let execute = function(commandName, value = null) {
            console.log(document.execCommand(commandName, false, value))
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
                ${action.followedBySeparator === true ? '<div class="separator"></div>' : ''}
            `
        })
        rteHTML += '</ul><div class="content jm-article" contenteditable="true" spellcheck="false"></div>'
        $jmRte
            .html(rteHTML)
            // IDEA 在可编辑区域获得焦点时，execCommand才起作用。否则返回false；而mousedown事件会夺取焦点
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
    }
})
