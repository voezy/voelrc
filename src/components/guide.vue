<template>
  <article class="guide" v-html="guide">
  </article>
</template>

<script>
import guide from '../page/guide.md'

export default {
  data () {
    return {
      guide: guide
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';
// 对于PC
@media only screen and (min-width: @small-screen-width) {
  @guide-wrp-width: 55rem;
  @guide-wrp-margin-ud: 3rem;
  .guide {
    width: @guide-wrp-width;
    margin: @guide-wrp-margin-ud auto;
  }
  // 因为指南是由 markdown-loader 渲染的，所以要用这种形式对它进行影响
  article /deep/ h1,
  article /deep/ h2,
  article /deep/ h3,
  article /deep/ h4 {
    font-weight: 400;
  }
  article /deep/ p {
    font-weight: light;
    font-family: 'PingFang SC', 'Helvetica Neue', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Helvetica, Arial, Verdana, sans-serif;
  }
}
// 对于移动设备
@media only screen and (max-width: @small-screen-width) {
  @guide-wrp-width: 23rem;
  @guide-wrp-margin-ud: 1.5rem;
  .guide {
    width: @guide-wrp-width;
    margin: @guide-wrp-margin-ud auto;
  }
  // 因为指南是由 markdown-loader 渲染的，所以要用这种形式对它进行影响
  article /deep/ h1,
  article /deep/ h2,
  article /deep/ h3,
  article /deep/ h4 {
    font-weight: 400;
  }
  article /deep/ p {
    font-weight: light;
    font-family: 'PingFang SC', 'Helvetica Neue', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Helvetica, Arial, Verdana, sans-serif;
    word-break: break-all;
  }
}
// 对于超小屏
@media only screen and(max-width: @xs-screen-width - 10em) {
  @guide-wrp-width: 18rem;
  @guide-wrp-margin-ud: 1rem;
  .guide {
    width: @guide-wrp-width;
    margin: @guide-wrp-margin-ud auto;
  }
}
</style>
