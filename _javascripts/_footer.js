$.fn.extend({
    /**
    生成 design.google.com 旧站风格的footer
    https://web.archive.org/web/20170516175305/https://design.google.com
    @param options {Object}
        - siteInfo {Object} 站点信息相关
            - siteNameWords {Array.<String>} 站名的单词组成的数组，以'·'和'¬'分隔
            - siteAuthorName {String} 站点作者的名字
            - siteAuthorHomepage {String} 站点作者个人主页的链接
            - siteSourceLink {String} 站点源码仓库的链接
        - socialInfo {?Object} 社交信息相关，按如下顺序展示。不提供任一项则不显示其
            - wechatQrLink {String} 微信二维码url
            - email {String} 邮箱地址
            - zhihuLink {String} 知乎链接
            - githubLink {String} GitHub链接
    */
    initFooter(options) {

        let {siteInfo = {}, socialInfo = null} = options

        /*
        参数检查
        */
        if (!Array.isArray(siteInfo.siteNameWords)) {
            throw new TypeError('Expecting parameter "siteInfo.siteNameWords" as {Array.<String>}')
        }
        if (typeof siteInfo.siteAuthorName !== 'string') {
            throw new TypeError('Expecting parameter "siteInfo.siteAuthorName" as {String}')
        }
        if (typeof siteInfo.siteAuthorHomepage !== 'string') {
            throw new TypeError('Expecting parameter "siteInfo.siteAuthorHomepage" as {String}')
        }
        if (typeof siteInfo.siteSourceLink !== 'string') {
            throw new TypeError('Expecting parameter "siteInfo.siteSourceLink" as {String}')
        }

        let $footer = $(this).hide()

        // 根据socialInfo对象的完整程度拼接footer上半部的HTML
        let footerHTML = `
            <div class="_top-wrap">
                <div class="_top jm-responsive-wrap">
                    <div class="social">
                        <ul class="link-container">`
        if (typeof socialInfo.wechatQrLink === 'string') {
            footerHTML += `
                <li class="link wechat">
                    <img class="hover-content" src="${socialInfo.wechatQrLink}" />
                </li>`
        }
        if (typeof socialInfo.email === 'string') {
            footerHTML += `
                <li class="link mail">
                    <a href="mailto:${socialInfo.email}"></a>
                    <div class="hover-content">Email me!</div>
                </li>`
        }
        if (typeof socialInfo.zhihuLink === 'string') {
            footerHTML += `
                <li class="link zhihu">
                    <a href="${socialInfo.zhihuLink}" target="_blank"></a>
                </li>`
        }
        if (typeof socialInfo.githubLink === 'string') {
            footerHTML += `
                <li class="link github">
                    <a href="${socialInfo.githubLink}" target="_blank"></a>
                </li>`
        }

        // 根据siteInfo对象拼接footer下半部的HTML
        footerHTML += `
                    </ul>
                </div>
            </div>
            </div>
            <div class="_bottom-wrap">
            <div class="_bottom jm-responsive-wrap">
                <span class="logo">
                    ${siteInfo.siteNameWords.map((item) => `<span class="jm-single-word">${item}</span>`).join('')}
                </span>
                <p class="info">
                    Made with
                    <span class="heart-wrap">
                        <svg class="heart" width="14px" height="14px" viewBox="0 0 24 24">
                            <path fill="#ff5252" d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"></path>
                        </svg>
                    </span>
                    by <a href="${siteInfo.siteAuthorHomepage}" target="_blank" class="info-link">${siteInfo.siteAuthorName}</a>.
                </p>
                <a href="${siteInfo.siteSourceLink}" target="_blank">
                    <button class="jm-button source _warn _flat" data-text="view source"></button>
                </a>
            </div>
            </div>`

        $footer.html(footerHTML).show()

    }
})