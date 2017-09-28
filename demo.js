let siteNameWords = ['jQuery', 'Material']

$(function() {

    $('.jm-header').initHeader({
        siteNameWords,
        navContents: ['posts', 'products', 'messages', 'about'],
    })

    $('.jm-footer').initFooter({
        siteInfo: {
            siteNameWords,
            siteAuthorName: 'youknowznm',
            siteAuthorHomepage: 'https://github.com/youknowznm',
            siteSourceLink: 'https://github.com/youknowznm/jqueryMaterial.js',
        },
        socialInfo: {
            wechatQrLink: './_images/footer/wechat-qr.png',
            email: 'znm92@icloud.com',
            zhihuLink: 'https://www.zhihu.com/people/youkonwznm',
            githubLink: 'https://github.com/youknowznm',
        },
    })

    $('.jm-button').initButton()

    $('.jm-input').initInput()

    $('.show-alert').on('click', function() {
        $.showJmDialog({
            dialogType: 'alert',
            title: 'This is an alert title',
            content: 'You can specify some description text in here.',
            confirmButtonText: 'got it!',
        })
    })

    $('.show-confirm').on('click', function() {
        $.showJmDialog({
            dialogType: 'confirm',
            title: 'Would you like to delete your debt?',
            content: 'All of the banks have agreed to forgive you your debts.',
            cancelButtonText: 'sounds like a scam',
            confirmButtonText: 'please do it!',
        })
    })

    $('.show-prompt').on('click', function() {
        $.showJmDialog({
            dialogType: 'prompt',
            title: 'How would you like to name your dogs?',
            content: 'Bowser is a common name.',
            cancelButtonText: 'I\'m a cat person',
            confirmButtonText: 'OK!',
            promptDataArr: [
                {
                    name: 'Dog 1',
                    value: 'Buddy',
                },
                {
                    name: 'Dog 2',
                    value: '',
                },
            ],
            onDialogReady() {
                // TODO
            }
        })
    })

    $('.jm-radio-group').initRadio({
        labels: [
            {
                name: 'apple',
            },
            {
                name: 'banana',
                warn: true,
            },
            {
                name: 'grape',
                checked: true,
            },
            {
                name: 'orange',
                disabled: true,
            },
        ],
    })

    $('.jm-tag').initTag({
        tagGroupName: 'Houses',
        tagsArr: ['targaryen', 'stark'],
        maxLengthEachTag: 10,
        maxTagCount: 3,
    })

    $('.jm-bg').initBackground()

    $('.to-top').click(function() {
        $('body').jmScrollInto()
    })

    $('.to-input').click(function() {
        $('._email-input-label').jmScrollInto()
    })

    $('.jm-rte').initRte({
        id: '133',
        maxLength: 200
    })

    $('.show-toast').on('click', function() {
        $.showJmToast({
            content: 'This is a sample toast.'
        })
    })


})