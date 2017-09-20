import $ from './jquery'

$.fn.extend({
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

