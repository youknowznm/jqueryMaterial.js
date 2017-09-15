import $ from './jquery.js'

export default function initMdRadio() {

    let $mdRadioGroups = $('.md-radio-group')

    $mdRadioGroups.on('click', '.md-radio', function() {
        let $this = $(this)
        if ($this.data('animating') !== true) {
            let $shadow = $this.find('.shadow')
            $this.siblings().attr('data-selected', 'false')
                .end().attr('data-selected', 'true')
            $shadow.addClass('clicked')
            $this.data('animating', true)
            setTimeout(function() {
                $shadow.removeClass('clicked')
                $this.data('animating', false)
            }, 500)
        }
    })

}
