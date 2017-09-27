$.fn.extend({
    /**
    生成 angular material 风格的单选按钮组
    https://material.angularjs.org/latest/demo/radioButton
    @param options {Object}
        - labels {?Array.<Object>} 可选对象的数组。不提供时使用一个默认的示例数组
          请注意这里未做类型检查，数组内checked值为true的对象应不多于一个
            - name {String} 按钮元素的标题文字
            - checked {?Boolean} 是否为已选中状态
            - warn {?Boolean} 是否为'warn'的红色配色
            - disabled {?Boolean} 是否为禁用状态
    */
    initRadio(options) {

        let $radioWrap = $(this)

        let labels = options.labels || [
            {
                name: 'label 1',
            },
            {
                name: 'label 2',
                checked: true,
            },
            {
                name: 'label 3',
                warn: true,
            },
            {
                name: 'label 4',
                disabled: true,
            },
        ]

        let radiosHTML = `
            ${labels.map(function(item, index) {
                let isChecked = (item.checked === true) ? 'true' : ''
                let warnClass = (item.warn === true) ? '_warn' : '_primary'
                let disableClass = (item.disabled === true) ? '_disabled' : ''
                return `<label class="jm-radio ${warnClass} ${disableClass}" data-checked="${isChecked}">
                    <span class="shadow"></span>
                    <span class="_outer">
                        <span class="_inner"></span>
                    </span>
                    <span class="text">${item.name}</span>
                </label>`
            }).join('')}`

        $radioWrap
            .html(radiosHTML)
            .on('click', '.jm-radio:not(._disabled)', function() {
                let $this = $(this)
                if ($this.data('animating') !== true) {
                    $this.data('animating', true)
                    let $shadow = $this.find('.shadow')
                    $this.siblings().attr('data-checked', 'false')
                        .end().attr('data-checked', 'true')
                    $shadow.addClass('clicked')
                    setTimeout(function() {
                        $shadow.removeClass('clicked')
                        $this.data('animating', false)
                    }, 300)
                }
            })

    }
})

