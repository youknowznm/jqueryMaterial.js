import $ from './jquery.js'

$.fn.extend({
    /**
    生成 angular material 风格的标签
    https://material.angularjs.org/latest/demo/chips

    目标元素可配置的属性：
        - data-text 按钮内容文字。不提供时，按钮内容为一个.icon元素，需在样式表内自行设置背景url
        - data-tooltip-content 浮动提示条的内容文字。不提供时，不显示浮动提示条
        - data-tooltip-position 浮动提示条的位置。不提供时默认为'top'
    */
    initTag() {

        let tagEleCounter = 1

        this.each(function() {

            let $tagsContainer = $(this)

            let options = {
                tagsArr: ['fuck', 'shit', 'pus'],
                maxLengthEachTag: 10,
                maxTagCount: 3,
            }

            let tagsArr = options.tagsArr || []
            let maxLengthEachTag = options.maxLengthEachTag || 15
            let maxTagCount = options.maxTagCount || 3

            let tagHTML = `
                <div class="jm-tag-content">
                    ${tagsArr.map(function(item) {
                        return `<span class="tag">
                                    <span class="tag-text">${item}</span>
                                    <i class="btn-remove"></i>
                                </span>`
                    }).join('')}
                    <input id="jm-tag-${tagEleCounter}" class="_input" maxlength="${maxLengthEachTag}" placeholder="Type tags and press Enter."/>
                    <label class="placeholder" for="jm-tag-${tagEleCounter}">Tags</label>
                </div>
                <p class="error"></p>
                <h5 class="char-counter">
                    <span class="current">0</span>/<span class="maximum">${maxLengthEachTag}</span>
                </h5>`

            $tagsContainer
                // 若有一个以上的tag子元素，则添加non-empty类
                .toggleClass('non-empty', tagsArr[0] === undefined)
                // ‘未点击’状态的标识。在输入框产生初次blur后修改
                .data('edited', false)
                .html(tagHTML)

            let $_input = $tagsContainer.find('._input')
            let $error = $tagsContainer.find('.error')

            $_input
                .one('blur', function() {
                    $tagsContainer.data('edited', true)
                })
                .on('focus', function() {
                    $tagsContainer.toggleClass('focused', $(this).val() === '')
                })
                .on('blur', function() {
                    let $this = $(this)
                    let $tag = $this.parents('.jm-tag')
                    if ($this.val() === '') {
                        $tag.removeClass('focused')
                    }
                    if ($tag.find('.tag').length > 0) {
                        $tag.addClass('non-empty')
                    }
                })
                .on('keyup', function(evt) {
                    let $this = $(this)
                    let tags = $tagsContainer.find('.tag')
                    let tagCount = tags.length
                    if (evt.keyCode === 13) {
                        let val = $this.val().trim()
                        $this.val('')
                        if (/\S/.test(val)) {
                            if (tagCount === maxTagCount) {
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
                    let currentCharCounter = $tag.find('.current')
                    let maxCharCount = +$tag.find('.maximum').text()
                    currentCharCounter.text(currentCount)
                })

            $tagsContainer
                .on('click', '.tag', function() {
                    let $tar = $(this).find('._input')
                    if (!$tar.is(':focus')) {
                        $tar.focus()
                    }
                })
                .on('click', '.btn-remove', function(evt) {
                    $(this).parents('.tag').remove()
                })

            function showError($ele, str) {
                $ele.closest('.tag').addClass('invalid')
                $ele.text(str).addClass('show')
                setTimeout(function() {
                    $ele.removeClass('show')
                    $ele.closest('.tag').removeClass('invalid')
                }, 3000)
            }

            ++tagEleCounter

        })
    }
})