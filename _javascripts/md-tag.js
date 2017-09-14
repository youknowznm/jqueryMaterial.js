import $ from './jquery'

export default function initmdTag() {

    function initTag($mdTag) {
        let tagsData = $mdTag.data('md-tags')
        // 若有一个以上的tag子元素，则添加non-empty类
        if ($mdTag.find('.tag').length > 0) {
            $mdTag.addClass('non-empty')
        }
        let $input = $mdTag.find('._input')
        let currentCharCount = 0
        let maxCharCount = $input.attr('maxlength')
        $mdTag.find('.current').text(currentCharCount)
        $mdTag.find('.maximum').text(maxCharCount)
        // ‘未点击’状态的标识。在输入框产生初次blur后修改
        $mdTag.data('edited', false)
        $input.one('blur', function() {
            $mdTag.data('edited', true)
        })
    }

    $('.md-tag').each(function() {
        initTag($(this))
    })

    $('.md-tag ._input')
        .on('focus', function() {
            let $this = $(this)
            let $mdTag = $this.parents('.md-tag')
            if ($this.val() === '') {
                $mdTag.addClass('focused')
            }
        })
        .on('blur', function() {
            let $this = $(this)
            let $mdTag = $this.parents('.md-tag')
            if ($this.val() === '') {
                $mdTag.removeClass('focused')
            }
            if ($mdTag.find('.tag').length > 0) {
                $mdTag.addClass('non-empty')
            }
        })
        .on('keyup', function(evt) {
            let $this = $(this)
            let $mdTag = $this.parents('.md-tag')
            let maxTags = +$mdTag.attr('data-max-tags')
            let $error = $mdTag.find('.error')
            let tags = $mdTag.find('.tag')
            let tagCount = tags.length
            if (evt.keyCode === 13) {
                let val = $this.val().trim()
                $this.val('')
                if (/\S/.test(val)) {
                    if (tagCount === maxTags) {
                        showError($error, 'Maximum tags reached.')
                        return
                    }
                    // 同名标签限制
                    for (let c of tags) {
                        if (c.innerText === val) {
                            showError($error, 'Tag already exists.')
                            return
                        }
                    }
                    $this.before(
                        $(`<span class="tag"><span class="tag-content">${val}</span><i class="btn-remove"></i></span>`)
                    )
                }
            }
            // 字数验证
            let currentCount = $this.val().length
            let currentCharCounter = $mdTag.find('.current')
            let maxCharCount = +$mdTag.find('.maximum').text()
            currentCharCounter.text(currentCount)
        })

    $('.md-tag').on('click', function() {
        let $tar = $(this).find('._input')
        if (!$tar.is(':focus')) {
            $tar.focus()
        }
    })

    $('.md-tag').on('click', '.btn-remove', function(evt) {
        $(evt.target).parent('.tag').remove()
    })

    function showError($ele, str) {
        $ele.closest('.md-tag').addClass('invalid')
        $ele.text(str).addClass('show')
        setTimeout(function() {
            $ele.removeClass('show')
            $ele.closest('.md-tag').removeClass('invalid')
        }, 3000)
    }

}
