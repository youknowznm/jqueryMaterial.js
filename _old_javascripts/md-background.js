import $ from './jquery.js'

// 从MD的调色板内选取搭配浅色字体的背景色若干组，每组含深色和浅色
// https://material.io/guidelines/style/color.html#color-color-palette
const MD_COLOR_PALETTE = [
    ['#F44336', '#F44336'], // red
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

let generateMaterialBackground = function(selector) {

    let usedPaletteIndexes = []

    $(selector).each(function(i) {

        // 在以上色板内随机选取一组配色。小于16个目标元素时，禁止产生相同的配色
        let paletteIndex
        paletteIndex = Math.floor(Math.random() * 15)
        if (usedPaletteIndexes.length < 16) {
            while (true) {
                if (usedPaletteIndexes.indexOf(paletteIndex) === -1) {
                    usedPaletteIndexes.push(paletteIndex)
                    break
                } else {
                    paletteIndex = Math.floor(Math.random() * 15)
                }
            }
        }

        // 生成背景色块的容器元素，设置其背景颜色为指定配色，旋转 0 | 90 | 180 | 270 度
        let wrapRotateAngle = Math.floor(Math.random() * 4) * 90
        let wrapHTML = `<div class="md-bg-wrap"
                             style="transform: rotate(${wrapRotateAngle}deg);
                                    background-color: ${MD_COLOR_PALETTE[paletteIndex][0]};">
                        </div>`
        let $mdBgWrap = $(wrapHTML)

        // 生成一定数量范围内的背景色块元素，设置一定范围内的宽度，设置2种盒阴影之一，设置其背景颜色为指定配色，旋转 1 - 360 度
        let blocksHTML = ''
        let blocksCount = Math.floor(Math.random() * 2 + 2)
        for (let i = 0; i < blocksCount; i++) {
            let shadowStrength = (Math.random() < .5) ? 'light' : 'strong'
            let width = Math.floor(Math.random() * 300 + 100)
            let rotateAngle = Math.floor(Math.random() * 180 + 1)
            blocksHTML += `<div class="md-bg-block md-shadow-${shadowStrength}"
                                style="width: ${width}px;
                                       transform: rotate(${rotateAngle}deg);
                                       background-color: ${MD_COLOR_PALETTE[paletteIndex][1]}">
                           </div>`
        }

        // append色块容器后，使其显示
        $mdBgWrap.html(blocksHTML)
        $(this).append($mdBgWrap)
        $mdBgWrap.show()
    })

}

export default generateMaterialBackground