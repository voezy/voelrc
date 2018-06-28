<template>
  <!-- 主体外层容器 -->
  <div class="main-wrp">
    <!-- 主体定位容器 -->
    <div class="main">
      <transition name="slide">
        <!-- 歌曲设置组件容器 -->
        <div class="main-setting" v-if="isSetting">
          <!-- 关闭歌曲设置面板按钮，仅在移动端显示 -->
          <el-button v-if="isSetting" class="close-setting" circle @click="isSetting=false">
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
        <editor @setting="isSetting = !isSetting" :songSetting="songSetting"/>
      </div>
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
      isSetting: true,
      songSetting: undefined
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
    this.isSetting = !utils.isMobile()
  }
}
</script>

<style lang="less" scoped>
@mainWidth: 1020px;
@mainFSWidth: 1360px;
@atPhoneMainWidth: 300px;
@mainHeight: 450px;
@blockWidth: 500px;
@atPhoneSettWidth: 99vw; // 同setting组件宽高
@atPhoneSettHeight: 75vh;
// 主体外层容器
.main-wrp {
  position: relative;
  margin: 0 auto;
}
// 主体定位容器
.main {
  width: @mainWidth;
  height: @mainHeight;
  padding: 10px;
}
// 歌曲设置组件容器
.main-setting {
  position: relative;
  width: @blockWidth;
  height: 100%;
  margin-right: @mainWidth - 2 * @blockWidth; // pc下，设定块和编辑块间留有一定空隙
  float: left;
}
// 关闭歌曲设置面板按钮
.close-setting {
  display: none;
}
// 歌词编辑块容器
.main-maker {
  width: @blockWidth;
  height: 100%;
  float: left;
}
// For pc full screen.
@media only screen and (min-width: 1200px) {
  // 主体外层容器
  .main-wrp {
    width: @mainFSWidth;
  }
  // 主体定位容器
  .main {
    margin: 100px auto;
  }
}
// For pc window.
@media only screen and (max-width: 1200px) {
  // 主体外层容器
  .main-wrp {
    width: @mainWidth;
  }
  // 主体定位容器
  .main {
    margin: 20px auto;
  }
}

// For mobile phone.
@media only screen and (max-width: 767px) {
  // 主体外层容器
  .main-wrp {
    width: @atPhoneMainWidth;
  }
  // 主体定位容器
  .main {
    width: @atPhoneMainWidth;
    height: @mainHeight;
    margin: 10px auto;
    padding: 5px 2px;
    box-shadow: 0 0 2px grey;
    border-radius: 10px;
  }
  // 歌曲设置组件容器
  .main-setting {
    position: fixed;
    width: @atPhoneSettWidth;
    height: @atPhoneSettHeight;
    bottom: 0;
    left: 0;
    z-index: 100;
    float: none;
    margin-right: 0;
  }
  // 关闭歌曲设置面板按钮
  .close-setting {
    position: absolute;
    top: -30px;
    right: 10px;
    z-index: 10;
    display: block;
  }
  // 歌词编辑块容器
  .main-maker {
    width: @atPhoneMainWidth;
    height: 100%;
  }
}
// 动画过渡初始状态
.slide-enter {
  bottom: -@atPhoneSettHeight;
}
// 动画过渡时状态
.slide-enter-active,
.slide-leave-active {
  transition: bottom 0.5s;
}
// 进入动画过渡完成后，后者离开动画开始时的状态、
.slide-enter-to,
.slide-leave {
  bottom: 0;
}
// 离开动画完成后状态
.slide-leave-to {
  bottom: -@atPhoneSettHeight;
}
</style>
