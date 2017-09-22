import $ from './jquery.js'

$.fn.extend({
    /**
    生成 material design 风格的背景样式
    http://thezinx.com/wallpapers/25-material-design-wallpapers/
    */
    initBackground() {

        // 从material design的调色板内选取搭配浅色字体的背景色若干组，每组含深色和浅色
        // https://material.io/guidelines/style/color.html#color-color-palette
        const MD_COLOR_PALETTE = [
            ['#F44336', '#D32F2F'], // red
            ['#E91E63', '#C2185B'], // pink
            ['#9C27B0', '#7B1FA2'], // purple

            ['#673AB7', '#512DA8'], // deep purple
            ['#3F51B5', '#303F9F'], // indigo
            ['#2196F3', '#1976D2'], // blue

            ['#039BE5', '#0277BD'], // light blue
            ['#0097A7', '#006064'], // cyan
            ['#009688', '#00796B'], // teal

            ['#43A047', '#2E7D32'], // green
            ['#689F38', '#33691E'], // light green
            ['#AFB42B', '#827717'], // lime

            ['#FF5722', '#E64A19'], // orange
            ['#795548', '#5D4037'], // brown
            ['#757575', '#424242'], // gray

            ['#607D8B', '#455A64'], // blue gray
        ]
        const PALETTE_LENGTH = MD_COLOR_PALETTE.length

        // 对已用配色的统计。当目标元素的个数小于调色板数组长度时，禁止产生相同的配色
        let usedPaletteIndexes = []

        this.each(function() {

            let $backgroundContainer = $(this)

            let paletteIndex = Math.floor(Math.random() * PALETTE_LENGTH)
            if (usedPaletteIndexes.length < (PALETTE_LENGTH + 1)) {
                while (true) {
                    if (usedPaletteIndexes.indexOf(paletteIndex) === -1) {
                        usedPaletteIndexes.push(paletteIndex)
                        break
                    } else {
                        paletteIndex = Math.floor(Math.random() * PALETTE_LENGTH)
                    }
                }
            }

            // 生成背景色块的容器元素，设置其背景颜色为指定配色，旋转 0 | 180 度
            let wrapRotateAngle = Math.floor(Math.random() * 2) * 180
            let wrapHTML = `<div class="jm-bg-wrap"
                                 style="transform: rotate(${wrapRotateAngle}deg);
                                        background-color: ${MD_COLOR_PALETTE[paletteIndex][0]};">
                            </div>`
            let $mdBgWrap = $(wrapHTML)

            // 生成一定数量范围内的背景色块元素，设置一定范围内的宽度，设置2种盒阴影之一，设置其背景颜色为指定配色，旋转 1 - 360 度
            let blocksHTML = ''
            let blocksCount = Math.floor(Math.random() * 2 + 2)
            for (let i = 0; i < blocksCount; i++) {
                let shadowStrength = (Math.random() < .5) ? 'light' : 'strong'
                let width = Math.floor(Math.random() * 200 + 100)
                let rotateAngle = Math.floor(Math.random() * 180 + 1)
                blocksHTML += `<div class="jm-bg-block jm-shadow-${shadowStrength}"
                                    style="width: ${width}px;
                                           transform: rotate(${rotateAngle}deg);
                                           background-color: ${MD_COLOR_PALETTE[paletteIndex][1]}">
                               </div>`
            }

            // append色块容器后，使其显示
            $mdBgWrap.html(blocksHTML)
            $backgroundContainer.append($mdBgWrap)
            $mdBgWrap.show()

        })
    }
})