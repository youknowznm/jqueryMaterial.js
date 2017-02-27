### 仿写 Google Design 头部的过程

很早之前就觉得[Google Design](https://design.google.com/)的头部超级漂亮，最近抽时间试着模仿一下，照葫芦画瓢，放自己博客上。

好好研究了下，在我眼里它的美具体表现在（按从重到轻排序）：
1. 按钮上 mousedown 时出现渐变的波纹效果，mouseup 时该波纹渐变至全屏后消失
2. 切换标签页时，目标按钮和当前按钮的 border-bottom 被连接起来，渐变至目标页位置
3. google 选择的几种配色很舒服，随着背景深/浅色系的切换，字体和边框颜色也有切换
4. 位于页面顶部时，展示有一定高度的 layer，随着垂直方向的滚动，高度逐渐变为0
5. 使用了 google 自家漂亮的 Roboto Mono 字体，标题的各词之间用`·`和`¬`点缀

逐条实现：
1. 给波纹元素一个固定宽高，相对于 header 绝对定位，初始时隐藏。按钮上触发 mousedown 时，取得事件相对于整个 header 的坐标，分别减掉波纹元素的宽高，设为波纹的位置。此时如果按住鼠标，则波纹扩散至给定的尺寸后不动，这里使用 keyframes 定义 from scale(0) to scale(1) 即可；这个过程中如果放开鼠标，则设置神奇的 animation-play-state 属性为 paused，再定义 keyframes 为 to scale(20) 后恢复 animation-play-state: running 就好了。因为未定义起始帧，该动画会自动从前一个动画结尾的 scale 程度计算。  

这里有个小坑，就是 mouseup 事件的目标必然会是波纹元素，不可能是任何别的。这导致我 debug 了半天，还怀疑 mouseup 事件是不是不冒泡，蠢死了。

这样一搞，mousedown -> mouseup -> click 这个过程有种明显的段落感，很舒服。Google Design 这里的处理似乎更复杂，是在新标签页渲染完毕之后触发 mouseup 的动画。

<!-- $('#header').on('mousedown', '.nav-anchor', function(){}) -->
