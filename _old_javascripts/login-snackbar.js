import $ from './jquery.js'
import initMdButton from './md-button'
import initMdInput from './md-input'

export default function showLoginSnackbar() {

    let $loginSnackbar = $('.login-snackbar')
    let $contents = $loginSnackbar.children('._content')

    let $loginInputs = $contents.filter('._login').children('.md-input')
    let $loginInputEmail = $loginInputs.filter('.email')
    let $loginInputPassword = $loginInputs.filter('.password')

    let $registerInputs = $contents.filter('._register').children('.md-input')
    let $registerInputEmail = $registerInputs.filter('.email')
    let $registerInputNickname = $registerInputs.filter('.nickname')
    let $registerInputPassword = $registerInputs.filter('.password')
    let $registerInputConfirmPassword = $registerInputs.filter('.confirm-password')

    // 根据body的authLeval控制登录控件的显隐
    setTimeout(function() {
        if ($('body').data('authLevel') === 0) {
            $loginSnackbar.addClass('show-partial')
        }
    }, 500)

    // 登录控件整体的显隐切换
    $('body').on('click', function(e) {
        let $this = $(e.target)
        $loginSnackbar.toggleClass('show-full', $this.closest('.login-snackbar').length !== 0)
    })

    // 根据不同输入框，以不同的正则判断内容的有效性，切换invalid类
    function validateMdInput($mdInput) {
        let emailRegExp = /^([a-zA-Z\d]+)\w*@(\w+)(\.[a-zA-Z]{1,4}){1,2}$/
        let passwordRegExp = /^.{6,}$/
        let val = $mdInput.find('._input').val()
        switch (true) {
            case $mdInput.is('.email'):
                // 邮件
                $mdInput.toggleClass('invalid', !emailRegExp.test(val))
                break
            case $mdInput.is('.password') || $mdInput.is('.confirm-password'):
                // 密码
                $mdInput.toggleClass('invalid', !passwordRegExp.test(val))
                break
            default:
                // 普通
                $mdInput.toggleClass('invalid', /^\s*$/.test(val))
        }
    }

    $loginSnackbar
        // 登录注册的元素显隐切换
        .on('click', '._to-register', function() {
            $contents.removeClass('show').filter('._register').addClass('show')
        })
        .on('click', '._to-login', function() {
            $contents.removeClass('show').filter('._login').addClass('show')
        })
        // 点击登录按钮
        .on('click', '.login', function() {
            /*
            *
            * 登录输入验证
            *
            */
            // 先去掉invalid类再给予，闪烁一下
            $loginInputs.removeClass('invalid')
            setTimeout(function() {
                for (let ele of $loginInputs) {
                    validateMdInput($(ele))
                }
                if ($loginInputs.filter('.invalid').length === 0) {
                    /*
                    *
                    * 发送登录请求
                    *
                    */
                    let data = JSON.stringify({
                        email: $loginInputEmail.children('._input').val(),
                        password: $loginInputPassword.children('._input').val(),
                    })
                    $.ajax({
                        contentType: 'application/json',
                        url: '/login',
                        type: 'Post',
                        data,
                        success: function(result) {
                            console.log('--- login result --- \n', result);
                            let code = result.loginResultCode
                            if (code === 1) {
                                location.reload()
                            } else {
                                const NOTIFICATIONS = {
                                    0: 'You inputed an unregistered email address.',
                                    2: 'You inputed a wrong password.',
                                    3: 'Check the verification mail sent to that mailbox.',
                                    4: 'An internal server error occurred. Please try later.'
                                }
                                rhaegoUtil.showMdModal({
                                    isDialog: false,
                                    title: 'Login failed.',
                                    content: NOTIFICATIONS[code],
                                    onCancel() {
                                        $loginSnackbar.addClass('show-full')
                                    },
                                })
                            }
                        },
                        fail: function(result) {
                            console.log('--- login fail --- \n', result);
                        },
                    })
                }
            }, 400)
        })
        // 点击注册按钮
        .on('click', '.register', function() {
            /*
            *
            * 注册输入验证
            *
            */
            // 先去掉invalid类再给予，闪烁一下
            $registerInputs.removeClass('invalid')
            setTimeout(function() {
                for (let ele of $registerInputs) {
                    validateMdInput($(ele))
                }
                let pwd1 = $registerInputPassword.children('._input').val()
                let pwd2 = $registerInputConfirmPassword.children('._input').val()
                // 两个密码框均为非空时，进行一致性判断。
                if (pwd1 !== '' && pwd2 !== '') {
                    if (pwd1 !== pwd2) {
                        $registerInputConfirmPassword.find('.error').text('Password typo.')
                            .end().addClass('invalid')
                    } else {
                        $registerInputConfirmPassword.find('.error').text('Required.')
                            .end().removeClass('invalid')
                    }
                }
                if ($registerInputs.filter('.invalid').length === 0) {
                    /*
                    *
                    * 发送注册请求
                    *
                    */
                    let data = JSON.stringify({
                        email: $registerInputEmail.children('._input').val(),
                        nickname: $registerInputNickname.children('._input').val().trim(),
                        password: $registerInputConfirmPassword.children('._input').val(),
                    })
                    $.ajax({
                        contentType: 'application/json',
                        url: '/register',
                        type: 'Post',
                        data,
                        success: function(result) {
                            switch (result.registerResultCode) {
                                case 0:
                                    // 邮箱、密码等参数校验错误
                                    rhaegoUtil.showMdModal({
                                        isDialog: false,
                                        title: 'Parameter validation failed.',
                                        content: 'Please check all input elements.',
                                    })
                                    break
                                case 1:
                                    // 若注册成功，则显示查看邮件的提示
                                    $contents.removeClass('show').filter('._notification')
                                        .children('.highlighted').text(data.email)
                                        .end().addClass('show')
                                    break
                                case 2:
                                    // 若该邮箱已注册则提示，稍后移除提示
                                    $registerInputEmail.children('.error').text('Email registered.')
                                        .end().addClass('invalid')
                                    setTimeout(function() {
                                        $registerInputEmail.removeClass('invalid')
                                            .children('.error').text('Invalid email.')
                                    }, 3000)
                                    break;
                            }
                        },
                        fail: function(result) {
                            console.log('failed', result)
                        },
                    })
                }
            }, 400)
        })
        // 输入时的判断
        .on('input', '._input', function() {
            let $this = $(this)
            let $parent = $this.closest('.md-input')
            $parent.toggleClass('invalid', /^\s*$/.test($this.val()))
        })

}