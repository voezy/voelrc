<template>
  <div id="app">
    <appHeader></appHeader>
    <section class="routes-wrp" v-show="!startMaking">
      <div class="intro">
        <h2>voeLrc</h2>
        <p>简洁易用的lrc歌词编辑器</p>
      </div>

      <div class="routes-btn-wrp">
        <router-link class="guide-route" to='/guide'>
          <el-button class="function-btn" round @click="startMaking = !startMaking">
            指南
          </el-button>
        </router-link>

        <router-link class="main-route" to='/main'>
          <el-button class="function-btn" round @click="startMaking = !startMaking">
            开始
          </el-button>
        </router-link>
      </div>
    </section>
    <router-view></router-view>
    <!--<appMain></appMain>-->
  </div>
</template>

<script>
import appHeader from './components/header.vue'
import appMain from './components/main.vue'
import guide from './components/guide.vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/guide', component: guide
  },
  {
    path: '/main', component: appMain
  }
]

const router = new VueRouter({
  routes
})

export default {
  data () {
    return {
      startMaking: false // 控制路由按钮组的显示
    }
  },
  components: {
    appHeader,
    appMain
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/') {
        this.startMaking = false
      } else {
        // 当路由发生改变，隐藏指引按钮
        this.startMaking = true
      }
    }
  },
  mounted () {
    if (this.$route.path !== '/') {
      // 如果着陆页面不是首页, 隐藏指引按钮
      this.startMaking = true
    }
  },
  router
}
</script>

<style lang="less" scoped>
@import './styles/common.less';
// 对于PC
@media only screen and (min-width: @small-screen-width) {
  @routes-wrp-width: 30rem;
  @routes-wrp-height: 15rem;
  @routes-btn-wrp-width: 100%;
  @routes-btn-wrp-height: 50%;
  .routes-wrp {
    position: relative;
    width: @routes-wrp-width;
    height: @routes-wrp-height;
    margin: 9rem auto;
  }
  .intro {
    text-align: center;
    h2, p {
      font-weight: 200;
      font-family: 'PingFang SC', 'Helvetica Neue', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Helvetica, Arial, Verdana, sans-serif;
    }
  }
  .routes-btn-wrp {
    position: absolute;
    bottom: 0;
    width: @routes-btn-wrp-width;
    height: @routes-btn-wrp-height;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .guide-route, .main-route {
    display: block;
    padding: 1rem;
  }
}

// 对于移动设备
@media only screen and (max-width: @small-screen-width) {
  @routes-wrp-width: 15rem;
  @routes-wrp-height: 15rem;
  @routes-btn-wrp-width: 100%;
  @routes-btn-wrp-height: 50%;
  .routes-wrp {
    position: relative;
    width: @routes-wrp-width;
    height: @routes-wrp-height;
    margin: 9rem auto;
  }
  .intro {
    text-align: center;
    h2, p {
      font-weight: 200;
      font-family: 'PingFang SC', 'Helvetica Neue', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Helvetica, Arial, Verdana, sans-serif;
    }
  }
  .routes-btn-wrp {
    position: absolute;
    bottom: 0;
    width: @routes-btn-wrp-width;
    height: @routes-btn-wrp-height;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .guide-route, .main-route {
    display: block;
    padding: 1rem;
  }
}
</style>
