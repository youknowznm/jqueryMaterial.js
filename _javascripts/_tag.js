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
    initTag(options) {

        let tagEleCounter = 1

        this.each(function() {

            let $tagsContainer = $(this)

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
                    <p class="error"></p>
                    <h5 class="char-counter">
                        <span class="current">0</span>/<span class="maximum">${maxLengthEachTag}</span>
                    </h5>
                </div>`

            $tagsContainer
                // 若有一个以上的tag子元素，则添加non-empty类
                .toggleClass('non-empty', tagsArr[0] !== undefined)
                // ‘未点击’状态的标识。在输入框产生初次blur后修改
                .data('edited', false)
                .html(tagHTML)

            let $_input = $tagsContainer.find('._input')
            let $error = $tagsContainer.find('.error')
            let $currentCharCount = $tagsContainer.find('.current')

            $_input
                .on('focus', function() {
                    $tagsContainer.addClass('focused')
                })
                .one('blur', function() {
                    $tagsContainer.data('edited', true)
                })
                .on('blur', function() {
                    $tagsContainer.removeClass('focused')

                    if ($tagsContainer.find('.tag').length > 0) {
                        $tagsContainer.addClass('non-empty')
                    }
                })
                .on('keyup', function(evt) {
                    console.log(2,evt);
                    let tags = $tagsContainer.find('.tag')
                    let tagCount = tags.length
                    let originVal = $_input.val()
                    // 字数统计
                    $currentCharCount.text(originVal.length)
                    // 回车键
                    if (evt.keyCode === 13) {
                        let val = originVal.trim()
                        if (val !== '') {
                            // 标签数量验证
                            if (tagCount === maxTagCount) {
                                switchErrorDisplay(true, 'Maximum tags reached.')
                                return
                            }
                            // 同名标签验证
                            for (let c of tags) {
                                if (c.innerText === val) {
                                    switchErrorDisplay(true, 'Tag already exists.')
                                    return
                                }
                            }
                            // 验证通过，添加标签，初始化输入框相关
                            $_input.before(
                                $(`<span class="tag"><span class="tag-content">${val}</span><i class="btn-remove"></i></span>`)
                            )
                            switchErrorDisplay(false, '')
                            $_input.val('')
                            $currentCharCount.text('0')
                        }
                    }
                    // 按下退格键且无内容时，删除前一个tag元素
                    if (originVal === '' && evt.keyCode === 8) {
                        // 按下退格键且无内容时，删除前一个tag元素
                        $_input.prev('.tag').remove()
                        switchErrorDisplay(false, '')
                    }
                })

            $tagsContainer.on('click', '.btn-remove', function(evt) {
                $(this).parents('.tag').remove()
            })

            function switchErrorDisplay(bool, str) {
                if (bool === true) {
                    $error.closest('.tag').addClass('invalid')
                    $error.text(str).addClass('show')
                } else {
                    $error.removeClass('show')
                    $error.closest('.tag').removeClass('invalid')
                }
            }

            ++tagEleCounter

        })
    }
})