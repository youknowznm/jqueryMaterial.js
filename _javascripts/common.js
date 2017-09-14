import $ from "./jquery"
import initMDHeader from './md-header'
import initMdButton from './md-button'
import initMdInput from './md-input'
import initMdTag from './md-tag'
import initMdTextarea from './md-textarea'
import initMdRadio from './md-radio'
import globalMethods from './_initializeGlobalMethods'
import initLoginSnackbar from './login-snackbar'
import initMdRte from './md-rte'

// 每页的公用逻辑
$(function() {

    initMDHeader()
    initMdInput()
    initMdTag()
    initMdTextarea()
    initMdButton()
    initMdRadio()
    initLoginSnackbar()
    initMdRte()

    /*
    控制面板
    */
    let $main = $('.main')
    let $controllPanel = $('.controll-panel')
    $controllPanel
        // left值初始化
        .css('left',  $main.width() + $main.offset().left - 75)
        // 新建文章
        .on('click', '._create-new', function() {
            rhaegoUtil.mdDelay(function() {
                location.pathname = '/create'
            })
        })
        // 编辑文章
        .on('click', '._edit', function() {
            rhaegoUtil.mdDelay(function() {
                location.assign(location.href + '?editing=true')
            })
        })
        // 注销登录
        .on('click', '._logout', function() {
            rhaegoUtil.showMdModal({
                isDialog: true,
                title: 'Log out?',
                content: 'Only logged-in users are able to comment or like posts.',
                onConfirm() {
                    $.ajax({
                        url: '/logout',
                        type: 'Get',
                        data: '',
                        success() {
                            location.reload()
                        }
                    })
                }
            })
        })
    // 位置随窗口响应变化
    $(window).on('resize', function() {
        $controllPanel.css('left',  $main.width() + $main.offset().left - 75)
    })
    // 推迟显示
    setTimeout(function() {
        $controllPanel.show()
    }, 600)

    /*
    主导航按钮
    */
    $('.md-header').on('click', '.nav-item', function() {
        let targetPath = $(this).data('href')
        // 不同url的切换产生动画
        if (location.pathname !== targetPath) {
            setTimeout(function() {
                if (location.pathname !== targetPath) {
                    location.assign(targetPath)
                }
            }, 800)
        // 相同url下的切换直接跳转
        } else {
            location.assign(targetPath)
        }
    })

    /*
    footer的view source按钮
    */
    $('footer').on('click', '.source', function() {
        rhaegoUtil.mdDelay(function() {
            window.open('https://github.com/youknowznm/rhaego')
        })
    })

})