# jQuery Material

一套 Material Design 风格的 jQuery 组件库，适用于桌面端和移动端的快速建站。  
已用于我的另一个项目 [Rhaego](https://github.com/youknowznm/rhaego)，文档会于近期部署上线。

交互行为和样式参考了 [Google Design 旧站](https://web.archive.org/web/20170516175305/https://design.google.com)、[AngularJS Material](https://material.angularjs.org/latest/) 和 [Material Components](https://material.io/components/web/catalog/) 等 Google 的设计相关站点。

目前包括：
- 页面头部
    - [Google Design 旧站](https://web.archive.org/web/20170516175305/https://design.google.com) 的渐变波纹效果样式
    - 渐变的深/浅色系主题
    - 随页面滚动渐变样式的 banner
    - 可配置的站点名和当前活动的导航按钮索引
- 背景生成器
    - 从给定调色板色值组内随机选取颜色，生成若干不同的 Material Design 风格背景
- 按钮
    - [AngularJS Material](https://material.angularjs.org/latest/demo/button) 的按钮波纹效果样式
    - 多种形状和颜色主题
    - 可选的按钮说明浮动提示条
- 文字输入
    - [AngularJS Material](https://material.angularjs.org/latest/demo/input) 的动画输入框下边框样式
    - 可配置的 `input` 标签类型、占位符、字数限制和用于验证的正则表达式
- 模态对话框
    - [AngularJS Material](https://material.angularjs.org/latest/demo/dialog) 的动画对话框样式
    - 多种可选的对话框类型（`alert`、`confirm` 或 `prompt`）
    - 可配置的对话框标题、内容、确认/取消按钮的文案及点击回调
- 单选输入
    - [AngularJS Material](https://material.angularjs.org/latest/demo/radio) 的单选按钮组样式
- 富文本编辑器
    - [Material Components](https://material.io/components/web/catalog/typography/) 的富文本元素样式
    - 压缩尺寸过大的图片，并存储其 `base64` 编码而不是`URL`
    - 自动保存编辑器内容至 `localStorage`
    - 编辑器内容高度自适应
    - 字数统计
- 标签组
    - [AngularJS Material](https://material.angularjs.org/latest/demo/chips) 的标签组元素样式
    - 可配置的标签数量范围限制和单个标签最大字符数
- toast 提示
    - [AngularJS Material](https://material.angularjs.org/latest/demo/toast) 的 toast 提示样式
    - 可配置的提示内容和持续时间
- 页面尾部
    - [Google Design 旧站](https://web.archive.org/web/20170516175305/https://design.google.com) 的尾部样式
    - 可配置的站点信息和个人社交资料展示