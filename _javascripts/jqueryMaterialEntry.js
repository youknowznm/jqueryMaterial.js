import $ from './jquery.js'
import '../_styles/jqueryMaterial.scss'

import './header.js'
import './button.js'
import './input.js'
import './modal.js'

// 判断是否移动端
let $body = $('body')
if (/Android|iPhone|Windows Phone|iPad/i.test(window.navigator.userAgent)) {
    $body.data('device', 'mobile')
} else {
    $body.data('device', 'desktop')
}

$.jmDelay = function(fn, timeout = 400) {
    setTimeout(fn, timeout)
}

$(function() {

    $('.jm-header').initHeader({
        siteNameWords: ['Previous', 'Google', 'design'],
        navContents: ['articles', 'resources', 'events', 'jobs', 'news', 'about'],
        activeNavIndex: 0,
    })

    $('.jm-button').initButton()

    $('.jm-input').initInput()

    $('.show-dialog').on('click', function() {
        $.showJmModal({
            title: 'Would you like to delete your debt?',
            content: 'All of the banks have agreed to forgive you your debts.',
            cancelButtonText: 'sounds like a scam',
            confirmButtonText: 'please do it!',
        })
    })
    $('.show-alert').on('click', function() {
        $.showJmModal({
            title: 'This is an alert title',
            content: 'You can specify some description text in here.',
            confirmButtonText: 'got it!',
            showCancel: false,
        })
    })

})