# jQuery Material

一套 Material Design 风格的 jQuery 组件库，适用于桌面端和移动端的快速建站，demo 请见[此处](https://youknowznm.github.io/demos/jquery-material/)。  

交互行为和样式参考了 [Google Design 旧站](https://web.archive.org/web/20170516175305/https://design.google.com)、[AngularJS Material](https://material.angularjs.org/latest/) 和 [Material Components](https://material.io/components/web/catalog/) 等 Google 的设计相关站点。

使用 Webpack 模块化图片、样式和脚本，实现 ALL-IN-JS。

已用于我的另一个项目 [Rhaego](https://github.com/youknowznm/rhaego)。

#### 提供三种打包方式：
- `npm run regular` 常规（不分离样式，不压缩，监听改动，用于开发调试）
- `npm run compressed` 仅压缩（不分离样式，压缩打包的js，命名为min.js，不监听改动）
- `npm run styleSeparated` 压缩并分离样式（分离样式，压缩打包的js，命名为min.js，不监听改动）

#### 简单的文档：
- 页面头部
    - [Google Design 旧站](https://web.archive.org/web/20170516175305/https://design.google.com) 的渐变波纹效果样式
    - 渐变的深/浅色系主题
    - 随页面滚动渐变样式的 banner
    - 可配置的站点名和当前活动的导航按钮索引
    ```javascript
    $(SELECTOR).initHeader(options)
    /**
    生成 design.google.com 旧站风格的header
    https://web.archive.org/web/20170516175305/https://design.google.com
    @param options {Object}
        - siteNameWords {Array.<String>} 站名的单词组成的数组，以'·'和'¬'分隔
        - navContents {Array.<String>} 导航按钮的名称数组
        - activeNavIndex {?Number} 当前活动的导航按钮索引。不提供时为0
    */
    ```
- 背景生成器
    - 从给定调色板色值组内随机选取颜色，生成若干不同的 Material Design 风格背景
    ```javascript
    $(SELECTOR).initBackground(colorPalette)
    /**
    生成 material design 风格的背景样式
    http://thezinx.com/wallpapers/25-material-design-wallpapers/
    @param colorPalette {?Array.<Array.<String, String>>}
           用于搭配浅色字体的背景色若干组，每组各含深色和浅色，均为颜色的色值字符串。
           例如： [ ['#F44336', '#D32F2F'], ['#E91E63', '#C2185B'] ]
    */
    ```
- 按钮
    - [AngularJS Material](https://material.angularjs.org/latest/demo/button) 的按钮波纹效果样式
    - 多种形状和颜色主题
    - 可选的按钮说明浮动提示条
    ```javascript
    $(SELECTOR).initButton(options)
    /**
    生成 angular material 风格的按钮
    https://material.angularjs.org/latest/demo/button
    @param options {Object}
        - text 按钮内容文字。不提供时，按钮内容为一个.icon元素，需在样式表内自行设置背景url
        - tooltipContent 浮动提示条的内容文字。不提供时，不显示浮动提示条
        - tooltipPosition 浮动提示条的位置。不提供时默认为'top'
        - clickCallback 点击动作的回调，在mouseup时触发，传入$button参数。不提供时为空方法
    */
    ```
- 文字输入
    - [AngularJS Material](https://material.angularjs.org/latest/demo/input) 的动画输入框下边框样式
    - 可配置的 `input` 标签类型、占位符、字数限制和用于验证的正则表达式
    ```javascript
    $(SELECTOR).initInput()
    /**
    生成 angular material 风格的text input元素
    https://material.angularjs.org/latest/demo/input
    目标元素可配置的属性：
        - data-type 输入框类型。可为text、password等，不提供时为'text'
        - data-label 输入框标题。不提供时从'Input 1'开始计数
        - data-value 实际内容文字。不提供时为''
        - data-maxLength 最大字符数。不提供时为20
        - data-validator 验证内容的正则。不提供时为'.*'
        - data-errorMsg 内容未通过正则验证时的提示。不提供时为'Validation failed.'
        - data-theme 主题配色。可为'dark'或'light'，不提供时为'light'
        - data-status 是否禁用输入框。值为'disabled'时禁用，否则为可用
    */
    ```
- 模态对话框
    - [AngularJS Material](https://material.angularjs.org/latest/demo/dialog) 的动画对话框样式
    - 多种可选的对话框类型（`alert`、`confirm` 或 `prompt`）
    - 可配置的对话框标题、内容、确认/取消按钮的文案及点击回调
    ```javascript
    $.showJmDialog(options)
    /**
    生成 angular material 风格的模态对话框
    https://material.angularjs.org/latest/demo/dialog
    @param options {Object}
        - dialogType {?String} 对话框类型，可为'alert'、'confirm'或'prompt'。不提供时为'alert'
        - title {?String} 对话框标题文字。不提供时为'unnamed dialog'
        - content {?String} 对话框内容文字。不提供时为'default content'
        - confirmButtonText {?String} 确认按钮的内容文字。不提供时为'confirm'
        - cancelButtonText {?String} 取消按钮的内容文字。不提供时为'cancel'
        - onConfirm {?Function} 确认按钮的点击回调。不提供时为一个空方法
        - onCancel {?Function} 取消按钮的点击回调。不提供时为一个空方法
        - promptDataArr {?Array.<Object>} prompt框的数据对象数组。当dialogType为prompt时必须提供
        - onDialogReady (?Function) 对话框DOM就绪时的回调，可在内部进行样式、监听等的处理。不提供时为一个空方法
    */
    ```
- 单选输入
    - [AngularJS Material](https://material.angularjs.org/latest/demo/radio) 的单选按钮组样式
    ```javascript
    $(SELECTOR).initRadio(options)
    /**
    生成 angular material 风格的单选按钮组
    https://material.angularjs.org/latest/demo/radioButton
    @param options {Object}
        - labels {?Array.<Object>} 可选对象的数组。不提供时使用一个默认的示例数组
            - name {String} 按钮元素的标题文字
            - checked {?Boolean} 是否为已选中状态
            - warn {?Boolean} 是否为'warn'的红色配色
            - disabled {?Boolean} 是否为禁用状态
    */
    ```
- 富文本编辑器
    - [Material Components](https://material.io/components/web/catalog/typography/) 的富文本元素样式
    - 压缩尺寸过大的图片，并存储其 `base64` 编码而不是`URL`
    - 自动保存编辑器内容至 `localStorage`
    - 编辑器内容高度自适应
    - 字数统计
    ```javascript
    $(SELECTOR).initRte(options)
    /**
    生成 angular material 风格的富文本编辑器
    https://material.angularjs.org/latest/demo/input
    @param options {Object}
        - id {String} 当前编辑内容的唯一标识，用于在localStorage内存取
                      注意在内容提交成功后，需使用localStorage.removeItem(`jmRteDraft-${id}`)手动删除草稿
        - contentToEdit {?String} 编辑区域的内容。不提供时用空字符串占位
        - maxLength {?Number} 编辑区域的最大字符数。不提供时为500
        - useRichText {?Boolean} 是否使用富文本、而不使用markdown，在移动端强制为false。为false时隐藏编辑工具栏。不提供时为true
    */
    ```
- 标签组
    - [AngularJS Material](https://material.angularjs.org/latest/demo/chips) 的标签组元素样式
    - 可配置的标签数量范围限制和单个标签最大字符数
    ```javascript
    $(SELECTOR).initTag(options)
    /**
    生成 angular material 风格的标签
    https://material.angularjs.org/latest/demo/chips
    @param options {Object}
        - tagGroupName {?String} 标签组名称。不提供时为'tags'
        - tagsArr {?Array.<String>} 已有的标签内容文字组成的数组。不提供时为空数组
        - maxLengthEachTag {?Number} 单个标签的最大字符数。不提供时为15
        - maxTagCount {?Number} 最大标签总数。不提供时为3
        - tagInputPlaceholder {?String} 标签输入框的占位字符串，不宜过长。不提供时为'Enter a tag...'
    */
    ```
- toast 提示
    - [AngularJS Material](https://material.angularjs.org/latest/demo/toast) 的 toast 提示样式
    - 可配置的提示内容和持续时间
    ```javascript
    $.showJmToast(options)
    /**
    生成 angular material 风格的toast提示
    https://material.angularjs.org/latest/demo/toast
    @param options {Object}
        - content {?String} 内容文字。不提供时为'default toast'
        - duration {?Number} 持续时间。不提供时为3000
    */
    ```
- 页面尾部
    - [Google Design 旧站](https://web.archive.org/web/20170516175305/https://design.google.com) 的尾部样式
    - 可配置的站点信息和个人社交资料展示
    ```javascript
    $(SELECTOR).initFooter(options)
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
            - wechatQrLink {String} 微信二维码链接
            - email {String} 邮箱地址
            - zhihuLink {String} 知乎链接
            - githubLink {String} GitHub链接
    */
    ```