<template>
  <!-- 歌曲设置组件容器 -->
  <div class="setting-wrp">
    <!-- 歌曲设置选项卡 -->
    <el-tabs class="setting-tabs" :tab-position="'top'" type="border-card" v-model="source" @tab-click="switchSource">
      <!-- 文件链接设置面板 -->
      <el-tab-pane label="文件链接" name="linkfile">
        <!-- 文件链接设置组件 -->
        <linkfile class="linkfile" @update-linkfile="updateLinkFile"/>
      </el-tab-pane>

      <!-- 本地歌曲设置面板 -->
      <el-tab-pane label="本地歌曲" name="localfile">
        <localfile class="localfile" @update-localfile="updateLocalFile"/>
      </el-tab-pane>

      <!-- 网易云设置面板 -->
      <el-tab-pane class="ncm" label="网易云" name="ncm">
        <el-form :label-position="'left'" label-width="45px" :model="ncm" @submit.native.prevent>
          <el-form-item label="信息">
            <el-input v-model="ncm.info" size="small" placeholder="可输入歌曲链接、ID或分享文字" @keyup.enter.native="$emit ('update-info', newInfo)"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="ncm-btn-s-wrp">
              <el-button round @click="$emit ('update-info', newInfo)">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import linkfile from './linkfile.vue'
import localfile from './localfile.vue'

export default {
  components: {
    linkfile,
    localfile
  },
  data () {
    return {
      source: 'linkfile',
      ncm: {
        info: ''
      },
      linkFileInfo: '',
      localFileInfo: ''
    }
  },
  computed: {
    // 每次都应把新数据传给父组件
    newInfo () {
      switch (this.source) {
        case 'ncm': {
          return {
            source: this.source,
            ncm: this.ncm.info
          }
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
.ncm {
  width: @ElInputWidth;
  margin: 50px auto;
}
// 网易云链接设置按钮定位容器
.ncm-btn-s-wrp {
  width: 80px;
  margin: 0 auto;
}
// 文件链接设置组件
.linkfile {
  margin: 10px auto;
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
  .ncm {
    width: @atPhoneElInputWidth;
  }
  // 文件链接设置组件
  .linkfile {
    margin: 5px auto;
  }
}
</style>
