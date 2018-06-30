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
@wrpWidth: 500px;
@wrpHeight: 450px;
@ElInputWidth: 400px;
@atPhoneWrpWidth: 99vw;
@atPhoneHeight: 75vh;
@atPhoneElInputWidth: 70vw;
// 歌曲设置组件容器
.setting-wrp {
  position: relative;
  width: @wrpWidth;
  height: @wrpHeight;
}
// 歌曲设置选项卡
.setting-tabs {
  width: 99%;
  height: 100%;
}
// 网易云链接设置面板和id设置面板
.linkfile, .ncm {
  width: @ElInputWidth;
  margin: 50px auto;
}
// For mobile phone.
@media only screen and (max-width: 767px) {
  // 歌曲设置组件容器
  .setting-wrp {
    width: @atPhoneWrpWidth;
    height: @atPhoneHeight;
    margin: 0 auto;
  }
  // 网易云链接设置面板和id设置面板
  .linkfile, .ncm {
    width: @atPhoneElInputWidth;
  }
  // 文件链接设置组件
  .linkfile {
    margin: 5px auto;
  }
}
</style>
