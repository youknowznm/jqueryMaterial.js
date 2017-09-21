import $ from './jquery.js'

$.fn.extend({
    /**
    生成 angular material 风格的标签
    https://material.angularjs.org/latest/demo/chips

    @param options {Object}
        - tagGroupName {?String} 标签组名称。不提供时为'tags'
        - tagsArr {?Array.<String>} 已有的标签内容文字组成的数组。不提供时为空数组
        - maxLengthEachTag {?Number} 单个标签的最大字符数。不提供时为15
        - maxTagCount {?Number} 最大标签总数。不提供时为3
    */
    initTag(options) {

        let tagEleCounter = 1

        this.each(function() {

            let $tagsContainer = $(this)

            let tagGroupName = options.tagGroupName || 'tags'
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
                    <label class="placeholder" for="jm-tag-${tagEleCounter}">${tagGroupName}</label>
                    <p class="error"></p>
                    <h5 class="char-counter">
                        <span class="current">0</span>/<span class="maximum">${maxLengthEachTag}</span>
                    </h5>
                </div>`

            $tagsContainer
                // ‘未点击’状态的标识。在输入框产生初次blur后修改
                .data('edited', false)
                // 初始化主容器的tagsData数组
                .data('tagsData', tagsArr)
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
                })
                .on('keyup', function(evt) {
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
                                $(`<span class="tag"><span class="tag-text">${val}</span><i class="btn-remove"></i></span>`)
                            )
                            switchErrorDisplay(false, '')
                            $_input.val('')
                            $currentCharCount.text('0')
                            // 将该项推入主容器的tagsData数组
                            $tagsContainer.data('tagsData').push(val)
                        }
                    }
                })

            $tagsContainer.on('click', '.btn-remove', function(evt) {
                let $targetTag = $(this).parents('.tag')
                // 删除该标签元素
                let targetTagText = $targetTag.children('.tag-text').text()
                $targetTag.remove()
                // 将该项移出主容器的tagsData数组
                let tagsData = $tagsContainer.data('tagsData')
                tagsData.splice(tagsData.indexOf(targetTagText), 1)
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