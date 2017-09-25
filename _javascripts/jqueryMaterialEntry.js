import '../_styles/jqueryMaterial.scss'

import './_utils.js'
import './_header.js'
import './_button.js'
import './_input.js'
import './_modal.js'
import './_radio.js'
import './_tag.js'
import './_background.js'
import './_rte.js'

// 判断是否移动端
let $body = $('body')
if (/Android|iPhone|Windows Phone|iPad/i.test(window.navigator.userAgent)) {
    $body.data('device', 'mobile')
} else {
    $body.data('device', 'desktop')
}