<template>
  <!-- 歌曲设置组件容器 -->
  <div class="setting-wrp">
    <!-- 歌曲设置选项卡 -->
    <el-tabs class="setting-tabs" :tab-position="'top'" type="border-card" v-model="source" @tab-click="switchSource">
      <!-- 网易云链接设置面板 -->
      <el-tab-pane class="ncmlink" label="网易云链接" name="ncmlink">
        <!-- 链接设置表单 -->
        <el-form :label-position="'left'" label-width="45px" :model="ncmlink" @submit.native.prevent>
          <el-form-item label="链接">
            <el-input v-model="ncmlink.link" size="small" placeholder="在这里输入网易云歌曲链接哦" @keyup.enter.native="$emit ('update-info', newInfo)"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="ncmlink-btn-s-wrp">
              <el-button round @click="$emit ('update-info', newInfo)">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- id设置面板 -->
      <el-tab-pane class="ncmid" label="网易云歌曲id" name="ncmid">
        <!-- id设置表单 -->
        <el-form :label-position="'left'" label-width="45px" :model="ncmid" @submit.native.prevent>
          <el-form-item label="id">
            <el-input v-model="ncmid.id" size="small" placeholder="在这里输入网易云歌曲id哦"  @keyup.enter.native="$emit ('update-info', newInfo)"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="ncmid-btn-s-wrp">
              <el-button round @click="$emit ('update-info', newInfo)">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 文件链接设置面板 -->
      <el-tab-pane label="文件链接" name="linkfile">
        <!-- 文件链接设置组件 -->
        <linkfile class="linkfile" @update-linkfile="updateLinkFile"/>
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
      source: 'ncmlink',
      ncmlink: {
        link: ''
      },
      ncmid: {
        id: ''
      },
      linkFileInfo: ''
    }
  },
  computed: {
    // 每次都应把新数据传给父组件
    newInfo () {
      switch (this.source) {
        case 'ncmlink':
          return {
            source: this.source,
            ncmlink: this.ncmlink.link
          }
        case 'ncmid':
          return {
            source: this.source,
            ncmid: this.ncmid.id
          }
        case 'linkfile':
          return {
            source: this.source,
            linkFileInfo: this.linkFileInfo
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
@atPhoneElInputWidth: 75vw;
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
.ncmlink,
.ncmid {
  width: @ElInputWidth;
  margin: 50px auto;
}
// 网易云链接设置按钮定位容器
.ncmlink-btn-s-wrp,
.ncmid-btn-s-wrp {
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
  .ncmlink,
  .ncmid {
    width: @atPhoneElInputWidth;
    margin: 50px auto;
  }
  // 文件链接设置组件
  .linkfile {
    margin: 5px auto;
  }
}
</style>
