<template>
  <!-- 主体外层容器 -->
  <div class="main-wrp clearfix">
    <!-- slide动画用于移动端 -->
    <transition name="slide">
      <!-- 歌曲设置组件容器 -->
      <div class="main-setting" v-if="showSetting">
        <!-- 关闭歌曲设置面板按钮，仅在移动端显示 -->
        <el-button v-if="showSetting" class="close-setting" circle @click="showSetting=false">
          <i class="el-icon-close"></i>
        </el-button>

        <!-- 歌曲设置组件 -->
        <keep-alive>
          <setting @update-info="songSetting = $event" />
        </keep-alive>
      </div>
    </transition>

    <!-- 歌词编辑块容器 -->
    <div class="main-maker">
      <editor @popup-setting="showSetting = !showSetting" :songSetting="songSetting" />
    </div>
  </div>
</template>

<script>
import setting from './setting.vue'
import editor from './editor.vue'
import utils from '../js/util/utils.js'

export default {
  data () {
    return {
      showSetting: true,
      songSetting: {}
    }
  },
  components: {
    setting,
    editor
  },
  methods: {
  },
  mounted () {
    // 移动端载入默认不显示歌曲设置块
    this.showSetting = !utils.isMobile()
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';
// 对于PC
@media only screen and (min-width: @small-screen-width) {
  @main-wrp-width: 62rem; // main容器宽度, 1040px
  @main-wrp-height: 28rem; // main容器高度，448px
  @main-wrp-ud-margin: 2rem; // 容器上下外边距，80px
  @setting-width: @main-wrp-width / 2 - 1rem; // 设置面板组件容器宽度, 留出1rem作为它与编辑组件的间距
  @setting-height: @main-wrp-height; // 设置组件高度
  @maker-width: @main-wrp-width / 2; // 歌词编辑组件容器宽度
  @maker-height: @main-wrp-height; // 歌词编辑组件容器高度
  // 主体外层容器
  .main-wrp {
    width: @main-wrp-width;
    height: @main-wrp-height;
    margin: @main-wrp-ud-margin auto 0;
  }
  // 设置组件容器
  .main-setting {
    position: relative;
    width: @setting-width;
    height: @setting-height;
    margin-right: 1rem;
    float: left;
  }
  .main-maker {
    width: @maker-width;
    height: @maker-height;
    float: left;
  }
  // 关闭歌曲设置面板按钮
  .close-setting {
    display: none;
  }
}
// 宽屏下，增大主容器margin-top
@media only screen and (min-width: @wide-screen-width) {
  @main-wrp-width: 62rem; // main容器宽度, 1040px
  @main-wrp-height: 28rem; // main容器高度，448px
  @main-wrp-ud-margin: 5rem; // 容器上下外边距，80px
  // 主体外层容器
  .main-wrp {
    width: @main-wrp-width;
    height: @main-wrp-height;
    margin: @main-wrp-ud-margin auto 0;
  }
}

// 对于移动设备
@media only screen and (max-width: @small-screen-width) {
  @main-wrp-width: 24rem; // main容器宽度, 1040px
  @main-wrp-height: 36rem; // main容器高度，448px
  @main-wrp-ud-margin: 2rem; // 容器上下外边距，80px
  @setting-width: 24rem; // 设置面板组件容器宽度
  @setting-height: 26rem; // 设置组件高度
  @setting-margin-bottom: 0.5rem;
  @maker-width: @main-wrp-width; // 歌词编辑组件容器宽度
  @maker-height: @main-wrp-height; // 歌词编辑组件容器高度
  // 主体外层容器
  .main-wrp {
    position: relative;
    min-width: @main-wrp-width;
    min-height: @main-wrp-height;
    margin: 0.8rem auto;
  }
  // 设置组件容器
  .main-setting {
    position: absolute;
    bottom: @setting-margin-bottom;
    left: 50%;
    z-index: 10;
    width: @setting-width;
    height: @setting-height;
    margin-left: -12rem;
  }
  // 关闭歌曲设置面板按钮
  .close-setting {
    position: absolute;
    top: -30px;
    right: 0.5rem;
    z-index: 10;
    display: block;
  }
  .main-maker {
    width: @maker-width;
    height: @maker-height;
    margin: 0 auto;
  }
  // 动画过渡初始状态
  .slide-enter {
    bottom: -@setting-height;
  }
  // 动画过渡时状态
  .slide-enter-active,
  .slide-leave-active {
    transition: bottom 0.5s;
  }
  // 进入动画过渡完成后，后者离开动画开始时的状态、
  .slide-enter-to,
  .slide-leave {
    bottom: @setting-margin-bottom;
  }
  // 离开动画完成后状态
  .slide-leave-to {
    bottom: -@setting-height;
  }
}

// 对于超小屏
@media only screen and(max-width: @xs-screen-width - 10em) {
  @main-wrp-width: 19rem; // main容器宽度, 1040px
  @main-wrp-height: 28rem; // main容器高度，448px
  @main-wrp-ud-margin: 2rem; // 容器上下外边距，80px
  @setting-width: 19.5rem; // 设置面板组件容器宽度
  @setting-height: 22rem; // 设置组件高度
  @setting-margin-bottom: 0.5rem; // 设置组件底部外边距
  @maker-width: @main-wrp-width; // 歌词编辑组件容器宽度
  @maker-height: @main-wrp-height; // 歌词编辑组件容器高度
  // 主体外层容器
  .main-wrp {
    position: relative;
    min-width: @main-wrp-width;
    min-height: @main-wrp-height;
    margin: 0.3rem auto;
  }
  // 设置组件容器
  .main-setting {
    position: absolute;
    bottom: @setting-margin-bottom;
    left: 50%;
    z-index: 10;
    width: @setting-width;
    height: @setting-height;
    margin-left: -@setting-width/2;
  }
  .main-maker {
    width: @maker-width;
    height: @maker-height;
    margin: 0 auto;
  }
  // 动画过渡初始状态
  .slide-enter {
    bottom: -@setting-height;
  }
  // 动画过渡时状态
  .slide-enter-active,
  .slide-leave-active {
    transition: bottom 0.5s;
  }
  // 进入动画过渡完成后，后者离开动画开始时的状态、
  .slide-enter-to,
  .slide-leave {
    bottom: @setting-margin-bottom;
  }
  // 离开动画完成后状态
  .slide-leave-to {
    bottom: -@setting-height;
  }
}
</style>
