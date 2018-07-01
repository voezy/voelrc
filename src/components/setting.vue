<template>
  <!-- 歌曲设置组件容器 -->
  <div class="setting-wrp">
    <!-- 歌曲设置选项卡 -->
    <el-tabs
      class="setting-tabs"
      :tab-position="'top'"
      type="border-card"
      v-model="source"
      @tab-click="switchSource"
    >
      <!-- 文件链接设置面板 -->
      <el-tab-pane label="文件链接" name="linkfile">
        <!-- 文件链接设置组件 -->
        <linkfile class="linkfile" @update-linkfile="updateLinkFile"/>
      </el-tab-pane>

      <!-- 本地歌曲设置面板 -->
      <el-tab-pane label="本地歌曲" name="localfile">
        <localfile class="localfile" @update-localfile="updateLocalFile"/>
      </el-tab-pane>

      <el-tab-pane label="网易云" name="ncm">
        <ncmsong class="ncm" @update-ncmsong="updateNcmSong"></ncmsong>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import linkfile from './linkfile.vue'
import localfile from './localfile.vue'
import ncmsong from './ncmsong.vue'

export default {
  components: {
    linkfile,
    localfile,
    ncmsong
  },
  data () {
    return {
      source: 'linkfile',
      ncm: '',
      linkFileInfo: '',
      localFileInfo: ''
    }
  },
  computed: {
    // 每次都应把新数据传给父组件
    newInfo () {
      switch (this.source) {
        case 'ncm':
          return {
            source: this.source,
            ncm: this.ncm
          }
        case 'linkfile':
          return {
            source: this.source,
            linkFileInfo: this.linkFileInfo
          }
        case 'localfile':
          return {
            source: this.source,
            localFileInfo: this.localFileInfo
          }
        default: return {}
      }
    }
  },
  methods: {
    // 切换歌曲源
    switchSource (tab) {
      this.source = tab.name
    },
    updateLinkFile (newLinkFileInfo) {
      this.linkFileInfo = newLinkFileInfo
      this.$emit('update-info', this.newInfo)
    },
    updateLocalFile (newLocalFileInfo) {
      this.localFileInfo = newLocalFileInfo
      this.$emit('update-info', this.newInfo)
    },
    updateNcmSong (newNcmInfo) {
      this.ncm = newNcmInfo
      this.$emit('update-info', this.newInfo)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';

// 对于pc等设备
@media only screen and (min-width: @small-screen-width) {
  @setting-wrp-width: 100%;  // 设置组件容器宽度
  @setting-wrp-height: 100%;  // 设置组件容器高度
  .setting-wrp, .setting-tabs {
    width: @setting-wrp-width;
    height: @setting-wrp-height;
    //outline: 1px solid blue;
  }
  .linkfile, .ncm, .localfile {
    width: 100%;
    height: 100%;
    //outline: 1px solid red;
  }
}

// 对于移动设备
@media screen and (max-width: @small-screen-width) {
  @setting-wrp-width: 100%;  // 设置组件容器宽度
  @setting-wrp-height: 100%;  // 设置组件容器高度
  .setting-wrp, .setting-tabs {
    width: @setting-wrp-width;
    height: @setting-wrp-height;
    //outline: 1px solid blue;
  }
  .linkfile, .ncm, .localfile {
    width: 100%;
    height: 100%;
    //outline: 1px solid red;
  }
}
</style>
