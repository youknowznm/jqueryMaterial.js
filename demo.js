$(function() {

    $('.jm-header').initHeader({
        siteNameWords: ['jQuery', 'Material'],
        navContents: ['posts', 'products', 'messages', 'about'],
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
        tagsArr: ['targaryen', 'stark', 'lannister'],
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

})