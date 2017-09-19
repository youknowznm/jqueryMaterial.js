import $ from './jquery.js'
import '../_styles/jqueryMaterial.scss'

import './header.js'
import './button.js'
import './input.js'

// 判断是否移动端
let $body = $('body')
if (/Android|iPhone|Windows Phone|iPad/i.test(window.navigator.userAgent)) {
    $body.data('device', 'mobile')
} else {
    $body.data('device', 'desktop')
}

$(function() {

    $('.jm-header').initHeader({
        siteNameWords: ['Previous', 'Google', 'design'],
        navContents: ['articles', 'resources', 'events', 'jobs', 'news', 'about'],
        activeNavIndex: 0,
    })

    $('.jm-button').initButton()

    $('.jm-input').initInput()

})