<template>
  <!-- 歌词编辑组件容器 -->
  <div class="maker-wrp">
    <!-- 播放器容器 -->
    <div class="player-wrp">
      <aplayer v-if="showPlayer" :music="music" :showLrc="true" :volume="0.5" ref="aplayer">
      </aplayer>
    </div>

    <!-- 编辑框和控制按钮组容器 -->
    <div class="main-wrp">
      <!-- 歌词编辑框 -->
      <el-input class="lrc-editor" v-model="editorLrc" type="textarea" :rows="13" :disabled="previewing" resize="none" placeholder="在这里输入歌词 ^_^" @click.native="clickLrcEditor">
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
              <el-button type="info" icon="el-icon-sort" circle @click="replaceTimestamp(false)"></el-button>
            </el-tooltip>
          </div>

          <div class="ctrl-btn">
            <el-tooltip class="item" :disabled="isMobile()" effect="light" content="添加时间戳并切换下一句" placement="right">
              <el-button type="primary" icon="el-icon-arrow-down" circle @click="addTimestamp"></el-button>
            </el-tooltip>
          </div>

          <div class="ctrl-btn">
            <el-tooltip class="item" :disabled="isMobile()" effect="light" content="删除此行时间戳" placement="right">
              <el-button type="danger" icon="el-icon-close" circle @click="replaceTimestamp(true)"></el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能按钮容器 -->
    <div class="function-btn-container">
      <div class="function-btn-wrp">
        <el-tooltip class="item" :disabled="isMobile()" effect="light" content="删除所有时间戳" placement="top">
          <el-button class="function-btn" round @click="deleteAllTimestamp">重置</el-button>
        </el-tooltip>
      </div>
      <div class="function-btn-wrp">
        <el-tooltip class="item" :disabled="isMobile()" effect="light" content="留意上方播放器的歌词哦" placement="top">
          <el-button class="function-btn" round @click="previewing = !previewing">预览/编辑</el-button>
        </el-tooltip>
      </div>
      <div class="function-btn-wrp">
        <el-tooltip class="item" :disabled="isMobile()" effect="light" content="将编辑好的歌词下载保存为lrc文件" placement="top">
          <el-button class="function-btn" round @click="downloadLrc">保存</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Aplayer from 'vue-aplayer'
import utils from '../js/util/utils.js'
import conf from '../../config/conf.dev.js'
Aplayer.disableVersionBadge = true // Do not print version info to console.

export default {
  // songSetting包含了设置歌曲的tab名、设置的具体信息
  props: ['songSetting'],
  data () {
    return {
      showPlayer: true,
      editingRowNum: 1, // 光标当前所在行
      editorLrc: '',
      previewing: false
    }
  },
  computed: {
    // 注意aplayer会对misic对象各个参数进行非空验证
    music: function () {
      return this.getMusic(this.songSetting, this.previewing)
    },
    timestamp: function () {
      let sec = this.$refs.aplayer.playStat.playedTime

      return utils.genTimestamp(sec)
    }
  },
  components: {
    Aplayer
  },
  methods: {
    // 移动端将不显示按钮功能提示文字
    isMobile: utils.isMobile,
    /**
     * 点击编辑框，重新确定光标所在行
     */
    clickLrcEditor () {
      const ctlInput = utils.ctlInput
      let lrcArea = document.querySelector('.lrc-editor textarea')
      this.editingRowNum = ctlInput.getCurrRow(lrcArea)
    },
    /**
     * 在编辑框光标所在行开头增加时间戳
     */
    addTimestamp () {
      const ctlInput = utils.ctlInput
      let lrcArea = document.querySelector('.lrc-editor textarea')
      lrcArea.value = ctlInput.insertToRowStart(lrcArea.value, this.editingRowNum, this.timestamp)
      // 因为点击按钮后输入框光标消失，所以要重新聚焦到输入框方便确认歌词在哪行。
      // 但是要注意聚焦后光标将自动移至内容末尾, 所以这个方法传了一个行数以便确定聚焦到哪行开头。还有编辑框将滚动到最底下。
      ctlInput.focusInRowStart(lrcArea, this.editingRowNum)
      this.editingRowNum += this.editingRowNum === ctlInput.getTotalRowNum(lrcArea) - 1 ? 0 : 1

      // 滚动编辑框
      // 因为聚焦后编辑框滚动到了最底下，所以将它滚动到当前编辑行附近。
      // 尽量使当前编辑行所在处往上不超过编辑框一半高度(7行左右)，使得编辑时不会因为光标所在行超出编辑框视野范围而影响编辑。每一行大约21像素
      this.scrollEditor()
    },
    /**
     * 替换(isDeleting === false)或者删除(isDeleting === true)光标所在行时间标签。
     */
    replaceTimestamp (isDeleting) {
      const ctlInput = utils.ctlInput
      let lrcArea = document.querySelector('.lrc-editor textarea')
      let originValue = lrcArea.value
      let newValue = ''
      let rowArr = originValue.split('\n')

      // 获取当前行开头处所有时间标签字符串，并进行替换
      if (isDeleting) {
        rowArr[this.editingRowNum] = rowArr[this.editingRowNum].replace(/\[[0-9]{1,2}\:[0-9]{1,2}\.[0-9]{1,2}\]{1,}/g, '')
      } else {
        rowArr[this.editingRowNum] = rowArr[this.editingRowNum].replace(/\[[0-9]{1,2}\:[0-9]{1,2}\.[0-9]{1,2}\]{1,}/, this.timestamp)
      }

      for (let i = 0; i < rowArr.length; i++) {
        // 最后一行不加换行符
        newValue += i === rowArr.length - 1 ? rowArr[i] : rowArr[i] + '\n'
      }

      lrcArea.value = newValue

      // 编辑框光标移至下一行开头
      // lrcArea.setSelectionRange(formerPartLength + 1, formerPartLength + 1)
      ctlInput.focusInRowStart(lrcArea, this.editingRowNum)
      this.scrollEditor()

      // 因为光标已经移至下一行，所以光标所在当前行加1。（如果没到最后一行的话）
      this.editingRowNum += this.editingRowNum === ctlInput.getTotalRowNum(lrcArea) - 1 ? 0 : 1
    },
    /**
     * 删除所有时间标签
     */
    deleteAllTimestamp () {
      let lrcArea = document.querySelector('.lrc-editor textarea')

      lrcArea.value = lrcArea.value.replace(/\[[0-9]{1,2}\:[0-9]{1,2}\.[0-9]{1,2}\]{1,}/g, '')
      lrcArea.setSelectionRange(0, 0)

      this.editingRowNum = 0
    },
    scrollEditor () {
      let lrcArea = document.querySelector('.lrc-editor textarea')
      // 当编辑到第八行，开始自动向上滚动当前行数-6个单位的行高(大概21)
      if (this.editingRowNum > 6) {
        lrcArea.scrollTop = (this.editingRowNum - 6) * 21
      } else {
        lrcArea.scrollTop = 0
      }
    },
    downloadLrc () {
      utils.genDownLoad('网络文件歌曲.lrc', this.editorLrc)
    },
    /**
     * 根据父组件传递的歌曲设置信息设置 aPlayer 组件。previewing用于判定是否为预览模式。
     */
    getMusic (songSetting, previewing) {
      let APIServer = conf.APIServer
      let that = this
      let music = {
        title: '未加载歌曲',
        artist: '未加载歌手',
        src: 'https://freepd.com/music/City%20Sunshine.mp3',
        pic: 'pics/default-cover.jpg',
        lrc: previewing ? that.editorLrc : ''
      }

      // 修改showPlayer销毁播放器以便利用新数据重新创建
      this.showPlayer = false
      // console.log('正在获取来自 ' + songSetting.source + ' 的歌曲信息')

      // 从歌曲网易云链接中提取歌曲id
      const getID = (link) => {
        const urlREG = /((http|https):\/\/?[A-Za-z0-9\._-]*[\/A-Za-z0-9\?\%\#\=]*){1}/ig // 匹配出整个url(或者说包含歌曲id的部分，因为只考虑了#, ? 和 = 三种特殊字符)
        const idREG = /\/song\?id\=([0-9]*)|\/song\/([0-9]*)\//i // 从两种不同的url中匹配出歌曲id
        let url

        // 如果参数link存在
        if (link) {
          url = link.match(urlREG)
        }
        // 如果提取歌曲页链接成功。url[0]是匹配出来的链接
        if (url && url[0]) {
          url = url[0]
          // idMatchRs 是匹配出来的id结果
          const idMatchRs = url.match(idREG)
          if (idMatchRs) {
            if (idMatchRs[1]) {
              return idMatchRs[1]
            } else {
              return idMatchRs[2]
            }
          } else {
            return null
          }
        }
      }

      // 获取歌曲源url
      const getSrc = (id) => {
        return axios.get(APIServer + '/music/url?id=' + id)
          .then(res => {
            try {
              console.log('获取到歌曲的src url：' + res.data.data[0].url)
              music.src = res.data.data[0].url
            } catch (err) {
              // console.log('未能获取歌曲链接')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

      const getLrc = (id) => {
        // music.lrc = that.lrc
      }

      // 获取歌曲信息(名称、歌手和专辑图片)
      const getInfo = (id) => {
        return axios.get(APIServer + '/song/detail?ids=' + id)
          .then(res => {
            const mergeAr = (former, after) => former.name + ', ' + after.name
            try {
              let song = res.data.songs[0]
              // console.log('获取到歌曲的名称：' + res.data.songs[0].name)
              // console.log('获取到专辑的图片：' + res.data.songs[0].al.picUrl)
              // console.log('获取到歌手的名称：' + res.data.songs[0].ar.reduce(mergeAr))

              music.title = song.name
              music.artist = song.ar.length === 1 ? song.ar[0].name : song.ar.reduce(mergeAr)
              music.pic = song.al.picUrl
            } catch (err) {
              // console.log('未能获取歌曲信息')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

      if (songSetting && songSetting.source) {
        switch (songSetting.source) {
          case 'ncmlink': {
            const id = getID(this.songSetting.ncmlink)

            if (id !== null) {
              axios.all([getSrc(id), getInfo(id), getLrc(id)])
                .then(axios.spread(function (acct, perms) {
                // 请求现在都执行完成
                  that.showPlayer = true
                }))
            } else {
              // 无法获取id，返回默认歌曲数据以创建播放器
              this.showPlayer = true
            }

            return music
          }
          case 'ncmid': {
            axios.all([getSrc(this.songSetting.ncmid), getInfo(this.songSetting.ncmid)])
              .then(axios.spread(function (acct, perms) {
                // 两个请求现在都执行完成
                that.showPlayer = true
              }))
            return music
          }
          case 'linkfile': {
            let linkFileInfo = songSetting.linkFileInfo
            if (linkFileInfo && linkFileInfo.link) {
              music.title = '网络文件'
              music.artist = '加载网络文件成功'
              music.src = linkFileInfo.link
              music.pic = 'pics/linkfile-cover.png'
            }
            that.showPlayer = true
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
