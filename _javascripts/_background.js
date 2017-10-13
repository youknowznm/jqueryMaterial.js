$.fn.extend({
    /**
    生成 material design 风格的背景样式
    http://thezinx.com/wallpapers/25-material-design-wallpapers/
    @param colorPalette {?Array.<Array.<String, String>>}
           用于搭配浅色字体的背景色若干组，每组各含深色和浅色，均为颜色的色值字符串。
           例如： [ ['#F44336', '#D32F2F'], ['#E91E63', '#C2185B'] ]
    */
    initBackground(colorPalette) {

        let _colorPalette

        if (!Array.isArray(colorPalette)) {
            // 未提供有效的色值数组时，使用从material design的调色板内选取的默认数组
            // https://material.io/guidelines/style/color.html#color-color-palette
            _colorPalette = [
                ['#F44336', '#D32F2F'], // red
                ['#E91E63', '#C2185B'], // pink
                ['#673AB7', '#512DA8'], // purple
                ['#3F51B5', '#303F9F'], // indigo

                ['#2196F3', '#1976D2'], // blue
                ['#0097A7', '#006064'], // cyan
                ['#009688', '#00796B'], // teal
                ['#43A047', '#2E7D32'], // green

                ['#AFB42B', '#827717'], // lime
                ['#FF5722', '#E64A19'], // orange
                ['#795548', '#5D4037'], // brown
                ['#757575', '#424242'], // gray

                ['#607D8B', '#455A64'], // blue gray
            ]
        } else {
            _colorPalette = colorPalette
        }

        // 打乱数组顺序
        _colorPalette.sort(() => 0.5 - Math.random())

        let paletteLength = _colorPalette.length

        // 获取一个随机的索引偏移量
        let randomOffset = Math.floor(Math.random() * 5)

        let $targetBackgroundContainers = this

        this.each(function() {

            let $backgroundContainer = $(this)
            let elementIndex = $targetBackgroundContainers.index(this)
            // 取得当前元素在同级元素中的索引，加上上面的偏移量，得到目标调色板项的索引
            let paletteIndex =  (elementIndex + randomOffset) % paletteLength

            // 生成背景色块的容器元素，设置其背景颜色为指定配色，旋转 0 | 180 度
            let wrapRotateAngle = Math.floor(Math.random() * 2) * 180
            let wrapHTML = `<div class="jm-bg-wrap"
                                 style="transform: rotate(${wrapRotateAngle}deg);
                                        background-color: ${_colorPalette[paletteIndex][0]};">
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
                                           background-color: ${_colorPalette[paletteIndex][1]}">
                               </div>`
            }

            // append色块容器后，使其显示
            $mdBgWrap.html(blocksHTML)
            $backgroundContainer.append($mdBgWrap)
            $mdBgWrap.show()

        })
    }
})