<template>
  <!-- 歌词编辑组件容器 -->
  <div class="maker-wrp">
    <!-- 播放器容器 -->
    <div class="player-wrp">
      <aplayer  v-if="showPlayer" :music="music" :showLrc="true">
      </aplayer>
    </div>

    <!-- 编辑框和控制按钮组容器 -->
    <div class="main-wrp">
      <!-- 歌词编辑框 -->
      <el-input class="lrc-editor" type="textarea" v-model="lyric" :rows="13" resize="none" placeholder="在这里输入歌词 ^_^">
      </el-input>

      <!-- 歌词控制按钮外层容器 -->
      <div class="ctrlbtn-wrp">
        <!-- 歌词控制按钮组定位容器 -->
        <div class="ctrlbtn-pos-wrp">
          <!-- 调出设置面板按钮 -->
          <div class="ctrl-btn setting-btn">
            <el-tooltip class="item" :disabled="isMobile()" effect="light" content="设置歌曲" placement="right">
              <el-button type="success" icon="el-icon-setting" circle @click="$emit('setting')"></el-button>
            </el-tooltip>
          </div>

          <div class="ctrl-btn">
            <el-tooltip class="item" :disabled="isMobile()" effect="light" content="替换此行时间戳" placement="right">
              <el-button type="info" icon="el-icon-sort" circle></el-button>
            </el-tooltip>
          </div>

          <div class="ctrl-btn">
            <el-tooltip class="item" :disabled="isMobile()" effect="light" content="添加时间戳并切换下一句" placement="right">
              <el-button type="primary" icon="el-icon-arrow-down" circle></el-button>
            </el-tooltip>
          </div>

          <div class="ctrl-btn">
            <el-tooltip class="item" :disabled="isMobile()" effect="light" content="删除此行时间戳" placement="right">
              <el-button type="danger" icon="el-icon-close" circle></el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能按钮容器 -->
    <div class="function-btn-container">
      <div class="function-btn-wrp">
        <el-tooltip class="item" :disabled="isMobile()" effect="light" content="删除所有时间戳" placement="top">
          <el-button class="function-btn" round>重置</el-button>
        </el-tooltip>
      </div>
      <div class="function-btn-wrp">
        <el-tooltip class="item" :disabled="isMobile()" effect="light" content="留意上方播放器的歌词哦" placement="top">
          <el-button class="function-btn" round>预览</el-button>
        </el-tooltip>
      </div>
      <div class="function-btn-wrp">
        <el-tooltip class="item" :disabled="isMobile()" effect="light" content="将编辑好的歌词下载保存为lrc文件" placement="top">
          <el-button class="function-btn" round>保存</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Aplayer from 'vue-aplayer'
import utils from '../js/util/utils.js'
import conf from '../../config/conf.js'
Aplayer.disableVersionBadge = true // Do not print version info to console.

export default {
  // songSetting包含了设置歌曲的tab名、设置的具体信息
  props: ['songSetting'],
  data () {
    return {
      lyric: '',
      showPlayer: true
    }
  },
  computed: {
    // 注意aplayer会对misic对象各个参数进行非空验证
    music: function () {
      return this.getMusic(this.songSetting)
    }
  },
  components: {
    Aplayer
  },
  methods: {
    // 移动端将不显示按钮功能提示文字
    isMobile: utils.isMobile,
    getMusic (songSetting) {
      let APIServer = conf.APIServer
      let music = {
        title: '没有歌曲',
        artist: '歌手',
        src: 'null',
        pic: 'null'
      }

      // 修改showPlayer销毁播放器以便利用新数据重新创建
      this.showPlayer = false
      // console.log('正在获取来自 ' + songSetting.source + ' 的歌曲信息')

      // 从歌曲网易云链接中提取歌曲id
      // testurl: 网页、macOS客户端：http://music.163.com/#/song?id=28739330, http://music.163.com/#/m/song?id=68350
      const getID = () => {

      }
      // 获取歌曲源url
      const getSrc = () => {
        return axios.get(APIServer + '/music/url?id=' + songSetting.ncmid)
          .then(res => {
            // console.log('获取到歌曲的src url：' + res.data.data[0].url)
            music.src = res.data.data[0].url
          })
          .catch(err => {
            console.log(err)
          })
      }

      // 获取歌曲信息(名称、歌手和专辑图片)
      const getInfo = () => {
        return axios.get(APIServer + '/song/detail?ids=' + songSetting.ncmid)
          .then(res => {
            const mergeAr = (former, after) => former.name + ', ' + after.name
            let song = res.data.songs[0]
            // console.log('获取到歌曲的名称：' + res.data.songs[0].name)
            // console.log('获取到专辑的图片：' + res.data.songs[0].al.picUrl)
            // console.log('获取到歌手的名称：' + res.data.songs[0].ar.reduce(mergeAr))

            music.title = song.name
            music.artist = song.ar.length === 1 ? song.ar[0].name : song.ar.reduce(mergeAr)
            music.pic = song.al.picUrl
          })
          .catch(err => {
            console.log(err)
          })
      }

      if (songSetting && songSetting.source) {
        switch (songSetting.source) {
          case 'ncmlink': {
            return music
          }
          case 'ncmid': {
            let that = this

            axios.all([getSrc(), getInfo()])
              .then(axios.spread(function (acct, perms) {
                // 两个请求现在都执行完成
                that.showPlayer = true
              }))
            return music
          }
          case 'linkfile': {
            return music
          }
          default: {
            return music
          }
        }
      } else {
        this.showPlayer = true
        return music
      }
    }
  }
}
</script>

<style lang="less" scoped>
@makerHeight: 450px;
@makerWidth: 500px;
@mainWidth: 500px;
@playerWidth: 450px;
@playerHeight: 100px;
@editorHeight: 300px;
@editorWidth: 450px;
@atPhoneEditorWidth: 255px;
@funcBtnHeight: 50px;
@ctrlBtnGroupHeight: 200px;
@atPhoneMainWidth: 305px;
// 歌词编辑组件容器
.maker-wrp {
  width: @makerWidth;
  height: @makerHeight;
  margin: 0 auto;
}
// 播放器容器
.player-wrp {
  width: 100%;
  height: @playerHeight;
}
// 播放器
.aplayer {
  width: @playerWidth;
  margin-left: 0;
}
// 编辑器和控制按钮主体容器
.main-wrp {
  width: @mainWidth;
  height: @makerHeight - @playerHeight - @funcBtnHeight;
}
// 歌词编辑器
.lrc-editor {
  width: @editorWidth;
  height: @editorHeight;
  float: left;
}
// 保存等的功能按钮组外层容器
.function-btn-container {
  width: @makerWidth;
  height: @funcBtnHeight;
  clear: both;
}
// 保存等的功能按钮组尺寸和定位容器
.function-btn-wrp {
  width: 30%;
  height: @funcBtnHeight;
  box-sizing: border-box;
  padding: 7px 35px;
  float: left;
}
// 控制歌词按钮外层容器
.ctrlbtn-wrp {
  position: relative;
  width: 50px;
  height: @makerHeight - @playerHeight - @funcBtnHeight;
  float: left;
}
// 歌词控制按钮组定位容器
.ctrlbtn-pos-wrp {
  position: absolute;
  top: 50%;
  width: 100%;
  height: @ctrlBtnGroupHeight;
  margin-top: -@ctrlBtnGroupHeight / 2;
}
// 控制按钮内层容器
.ctrl-btn {
  width: 100%;
  height: 33%;
  box-sizing: border-box;
  padding: 12px 5px;
}
// 调出设置面板按钮
.setting-btn {
  display: none;
}
// For mobile phone.
@media only screen and (max-width: 768px) {
  // 歌词编辑组件容器
  .maker-wrp {
    width: @atPhoneMainWidth;
    height: @makerHeight;
    margin: 0 auto;
  } // 播放器容器
  .player-wrp {
    width: 100%;
    height: @playerHeight;
  }
  // 播放器
  .aplayer {
    width: @playerWidth - 150px;
    margin-left: 0;
  }
  // 编辑器和播放器主题
  .main-wrp {
    width: @atPhoneMainWidth;
  }
  // 歌词编辑器
  .lrc-editor {
    width: @atPhoneEditorWidth;
    height: @editorHeight;
  }
  // 歌词控制按钮外层容器
  .ctrlbtn-wrp {
    height: @makerHeight - @playerHeight - @funcBtnHeight;
  }
  // 控制按钮内层容器
  .ctrl-btn {
    height: 25%;
  }
  // 调出设置面板按钮
  .setting-btn {
    display: block;
  } // 保存等的功能按钮组外层容器
  .function-btn-container {
    width: @atPhoneMainWidth;
  }
  // 保存等的功能按钮组尺寸和定位容器
  .function-btn-wrp {
    padding: 7px 25px;
  }
}
</style>
