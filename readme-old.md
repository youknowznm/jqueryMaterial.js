## 已过期，等待重写

很早之前就觉得[Google Design](https://design.google.com/)的头部超级漂亮，最近抽时间试着模仿一下，照葫芦画瓢，放自己博客上。

好好研究了下，在我眼里它的美具体表现在（按从重到轻排序）：

1. 按钮上 mousedown 时出现渐变的波纹效果，mouseup 时该波纹渐变至全屏后消失
2. 切换标签页时，目标按钮和当前按钮的 border-bottom 被连接起来，渐变至目标页位置
3. google 选择的几种配色很舒服，随着背景深/浅色系的切换，字体和边框颜色也有切换
4. 位于页面顶部时，展示有一定高度的 layer，随着垂直方向的滚动，高度逐渐变为0
5. 使用了 google 自家漂亮的 Roboto Mono 字体，标题的各词之间用`·`和`¬`点缀
6. 当前页面的标题在页面顶部滚动大于一定值时渐隐

逐条实现：
1. 给波纹元素一个固定宽高，相对于 header 绝对定位，初始时隐藏。按钮上触发 mousedown 时，取得事件相对于整个 header 的坐标，分别减掉波纹元素的宽高，设为波纹的位置。此时如果按住鼠标，则波纹扩散至给定的尺寸后不动，这里使用 keyframes 定义 from scale(0) to scale(1) 即可；这个过程中如果放开鼠标，则设置神奇的 animation-play-state 属性为 paused，再定义 keyframes 为 to scale(18) 后恢复 animation-play-state: running 就好了。因为未定义起始帧，该动画会自动从前一个动画结尾的 scale 程度计算。  
注意这里 mouseup 事件的目标必然会是波纹元素，不可能是任何别的。我 debug 了半天，还怀疑 mouseup 事件是不是不冒泡，蠢死了。解决办法是声明一个空元素，在 mousedown 发生之后让它指向事件的目标，再在 mouseup 中手动触发该目标的 click 事件。  
这样一搞，mousedown -> mouseup -> click 这个过程有种明显的段落感，很舒服。Google Design 这里的处理似乎更复杂，是在新标签页渲染完毕之后触发 mouseup 的动画。

2. 在导航 ul 元素的底部绝对定位一个提示条元素，初始宽度为0。然后在每次发生标签页的切换时，根据目标按钮和当前活动按钮的相对位置，求得提示条的目标起始点坐标，再在提示条上添加一个 jQ 动画：动画的结果是它的宽度变为0，根据期望的左/右方向，将 left 值设为开始或结束的坐标即可。

3. 这个就简单些了，按 google 提供的五种色调置样式即可，注意子元素的字体、按钮边框、提示条的颜色都要进行相应的变化。用 SASS 预处理器省事点。

4. header 的底部有个阴影。 google 的做法是在 header 元素后面添加一个 fake-shadow 元素，该元素的背景是横向重复的一张阴影 png。但这样做的话，header 元素必须被放进另一个 fixed 定位的容器元素内。不太明白为什么要这样？我用 box-shadow 实现了类似的，这个属性的兼容性还是不错的。阴影颜色选用了 element 提供的 light-silver(#99A9BF)。  
然后给 window 的 scroll 事件添加一个监听，同时修改 layer 的高度即可。注意，前面的波纹元素需要修改一下，mouseup 时需要先渐变窗口的 scrollTop 至 0。
后来还是用非伪元素实现了。原因是 header 需要隐藏溢出内容，与其相对定位为 top: 100% 的伪元素是永远不会显示的。

5. 把标题的块元素拆成几个 span，分别在结尾添加'·'和'¬'伪元素即可。

6. 在 scrollTop 符合条件时给标题元素一个透明度和 transformY 渐变的动画类即可。

成品效果大概如下，demo [在这里](http://youknowznm.github.io/demos/google_design_header/)。最近准备重构一下博客，到时候会用这个头部。

![gds-header](https://github.com/youknowznm/google-design-site-header/blob/master/gds-header.gif)
