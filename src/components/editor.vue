<template>
  <!-- 歌词编辑组件容器 -->
  <div class="maker-wrp">
    <!-- 播放器容器 -->
    <div class="player-wrp">
      <aplayer
         v-if="showPlayer"
        :music="music"
        :showLrc="true"
        :volume="0.5"
        ref="aplayer"
      >
      </aplayer>
    </div>

    <!-- 编辑框和控制按钮组容器 -->
    <div class="main-wrp clearfix" @keyup.120="addTimestamp();">
      <!-- 歌词编辑框 -->
      <el-input
        class="lrc-editor"
        v-model="lrc"
        type="textarea"
        :rows="13"
        :disabled="previewing"
        resize="none"
        placeholder="在这里输入歌词 ^_^"
        @click.native="clickLrcEditor"
        >
      </el-input>

      <!-- 歌词控制按钮外层容器 -->
      <div class="ctrlbtn-wrp">
        <!-- 歌词控制按钮组定位容器 -->
        <div class="ctrlbtn-pos-wrp">
          <!-- 调出设置面板按钮 -->
          <div class="ctrl-btn setting-btn">
            <el-tooltip class="item"
              :disabled="isMobile()"
              effect="light"
              content="设置歌曲"
              placement="right"
            >
              <el-button
                type="success"
                icon="el-icon-setting"
                circle
                @click="$emit('popup-setting')"
               ></el-button>
            </el-tooltip>
          </div>

          <div class="ctrl-btn">
            <el-tooltip class="item"
              :disabled="isMobile()"
              effect="light"
              content="替换此行时间戳"
              placement="right"
            >
              <el-button
                type="info"
                icon="el-icon-sort"
                circle
                @click="replaceTimestamp(false)"
              ></el-button>

            </el-tooltip>
          </div>

          <div class="ctrl-btn">
            <el-tooltip
              class="item"
              :disabled="isMobile()"
              effect="light"
              content="添加时间戳并切换下一句(或f9键)"
              placement="right"
            >
              <el-button
                type="primary"
                icon="el-icon-arrow-down"
                circle
                @click="addTimestamp();"
              ></el-button>
            </el-tooltip>
          </div>

          <div class="ctrl-btn">
            <el-tooltip
              class="item"
              :disabled="isMobile()"
              effect="light"
              content="删除此行时间戳"
              placement="right"
            >
              <el-button
                type="danger"
                icon="el-icon-close"
                circle
                @click="replaceTimestamp(true)"
              ></el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能按钮容器 -->
    <div class="function-btn-container">
      <div class="function-btn-wrp">
        <el-tooltip
          class="item"
          :disabled="isMobile()"
          effect="light"
          content="删除所有时间戳"
          placement="top"
        >
          <el-button
            class="function-btn"
            round
            @click="deleteAllTimestamp"
          >重置</el-button>
        </el-tooltip>
      </div>
      <div class="function-btn-wrp">
        <el-tooltip
          class="item"
          :disabled="isMobile()"
          effect="light"
          content="留意上方播放器的歌词哦"
          placement="top"
        >
          <el-button
            class="function-btn"
            round
            @click="switchPrewiew"
          >
            {{previewing ? '编辑' : '预览'}}
          </el-button>

        </el-tooltip>
      </div>
      <div class="function-btn-wrp">
        <el-tooltip
          class="item"
          :disabled="isMobile()"
          effect="light"
          content="将编辑好的歌词下载保存为lrc文件"
          placement="top"
        >
          <el-button
            class="function-btn"
            round
            @click="downloadLrc();cancelAutoSave()"
          >
            保存
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Aplayer from 'vue-aplayer'
import utils from '../js/util/utils.js'
Aplayer.disableVersionBadge = true // 不输出aplayer版本信息到控制台

export default {
  // songSetting包含了设置歌曲的tab名、设置的具体信息
  props: ['songSetting'],
  data () {
    return {
      showPlayer: true,
      editingRowNum: 0, // 光标当前所在行。默认值其实没有影响，因为对编辑框的点击事件进行了监听，会自动计算光标所在行
      lrc: '',
      previewing: false,
      savingLrcTimer: {} // 定期保存歌词信息到本地存储
    }
  },
  computed: {
    // 注意aplayer会对misic对象各个参数进行非空验证
    music () {
      return this.getMusic()
    },
    timestamp () {
      let sec = this.$refs.aplayer.playStat.playedTime

      return utils.genTimestamp(sec)
    }
  },
  components: {
    Aplayer
  },
  mounted () {
    let that = this
    // 尝试读取用户未保存的歌词信息
    this.lrc = localStorage.editinglrc ? localStorage.editinglrc : ''
    // 每隔3000毫秒保存用户正在编辑的歌词到本地存储
    this.savingLrcTimer = setInterval(() => {
      localStorage.editinglrc = that.lrc
    }, 3000)
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
    switchPrewiew () {
      this.previewing = !this.previewing
      if (this.previewing) {
        this.$message({
          type: 'success',
          message: '请点击播放器左侧按钮，留意中间歌词部分'
        })
      }
    },
    /**
     * 在编辑框光标所在行开头增加时间戳
     */
    addTimestamp () {
      const ctlInput = utils.ctlInput
      let lrcArea = document.querySelector('.lrc-editor textarea')
      this.lrc = ctlInput.insertToRowStart(this.lrc, this.editingRowNum, this.timestamp)
      /**
       * 因为点击按钮后输入框光标消失，所以要重新聚焦到输入框方便确认歌词在哪行。
       * 但是要注意聚焦后光标将自动移至内容末尾, 所以这个方法传了一个行数以便确定聚焦到哪行开头。还有编辑框将滚动到最底下。
       *
       */
      // ctlInput.focusInRowStart(lrcArea, this.editingRowNum)

      // 滚动编辑框
      // 因为聚焦后编辑框滚动到了最底下，所以将它滚动到当前编辑行附近。
      // 尽量使当前编辑行所在处往上不超过编辑框一半高度(7行左右)，使得编辑时不会因为光标所在行超出编辑框视野范围而影响编辑。每一行大约21像素
      this.scrollEditor()
      this.editingRowNum += this.editingRowNum === ctlInput.getTotalRowNum(lrcArea) - 1 ? 0 : 1
    },
    /**
     * 替换(当isDeleting === false)或者删除(当isDeleting === true)光标所在行时间标签。
     */
    replaceTimestamp (isDeleting) {
      const ctlInput = utils.ctlInput
      let lrcArea = document.querySelector('.lrc-editor textarea')
      let originValue = this.lrc
      let newValue = ''
      let rowArr = originValue.split('\n')

      // 获取当前行开头处所有时间标签字符串，并进行替换
      rowArr[this.editingRowNum] = rowArr[this.editingRowNum].replace(/\[[0-9]{1,2}\:[0-9]{1,2}\.[0-9]{1,2}\]{1,}/, isDeleting ? '' : this.timestamp)

      for (let i = 0; i < rowArr.length; i++) {
        // 最后一行不加换行符
        newValue += i === rowArr.length - 1 ? rowArr[i] : rowArr[i] + '\n'
      }

      this.lrc = newValue

      // 编辑框光标移至下一行开头
      // ctlInput.focusInRowStart(lrcArea, this.editingRowNum)
      this.scrollEditor()

      // 因为光标已经移至下一行，所以光标所在当前行加1。（如果没到最后一行的话）
      this.editingRowNum += this.editingRowNum === ctlInput.getTotalRowNum(lrcArea) - 1 ? 0 : 1
    },
    /**
     * 删除所有时间标签
     */
    deleteAllTimestamp () {
      let that = this
      this.$confirm('确定删除所有时间标签?', '重置提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let lrcArea = document.querySelector('.lrc-editor textarea')

        that.lrc = lrcArea.value.replace(/\[[0-9]{1,2}\:[0-9]{1,2}\.[0-9]{1,2}\]{1,}/g, '')
        lrcArea.setSelectionRange(0, 0)

        that.editingRowNum = 0
        this.$message({
          type: 'success',
          message: '已重置'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消重置'
        })
      })
    },
    scrollEditor () {
      let lrcArea = document.querySelector('.lrc-editor textarea')
      // 当编辑到第八行，开始自动向上滚动当前行数减6个单位的行高(大概21)
      if (this.editingRowNum > 6) {
        lrcArea.scrollTop = (this.editingRowNum - 6) * 21
      } else {
        lrcArea.scrollTop = 0
      }
    },
    downloadLrc () {
      let filename
      if (this.songSetting && this.songSetting.source) {
        let source = this.songSetting.source
        switch (source) {
          case 'ncmlink':
            filename = this.music.artist + ' - ' + this.music.title + '.lrc'
            break
          case 'ncmid':
            filename = this.music.artist + ' - ' + this.music.title + '.lrc'
            break
          case 'linkfile':
            filename = '网络音频歌词.lrc'
            break
          case 'localfile':
            filename = '本地音频歌词'
            break
          default:
            filename = '歌词.lrc'
        }
        utils.genDownLoad(filename, this.lrc, 'text/plain')
      } else {
        this.$message({
          type: 'info',
          message: '请先设置歌曲信息'
        })
      }
    },
    cancelAutoSave () {
      // 用户点击保存按钮后，结束自动保存，清空存储内容和定时器。
      // 在未点击保存时，有自动保存的功能。所以目前仅供特殊情况下的救急
      localStorage.removeItem('editinglrc')
      clearInterval(this.savingLrcTimer)
      this.savingLrcTimer = {}
    },
    /**
     * 根据父组件传递的歌曲设置信息设置 aPlayer 组件。
     */
    getMusic () {
      let APIServer = '/api'
      let that = this
      let music = {
        title: '默认歌曲',
        artist: '默认歌手',
        src: 'https://freepd.com/music/City%20Sunshine.mp3',
        pic: 'pics/default-cover.jpg',
        lrc: this.previewing ? this.lrc : ''
      }

      // 修改showPlayer销毁播放器以便利用新数据重新创建
      this.showPlayer = false

      // 从歌曲网易云链接中提取歌曲id
      const getID = (link) => {
        const urlREG = /((http|https):\/\/?[A-Za-z0-9\._-]*[\/A-Za-z0-9\?\%\#\=]*){1}/ig // 匹配出整个url(或者说包含歌曲id的部分，因为只考虑了#, ? 和 = 三种特殊字符)
        const idREG = /\/song\?id\=([0-9]*)|\/song\/([0-9]*)(\/|\?)/i // 从几种不同的url中匹配出歌曲id
        let url

        // 如果参数link存在
        if (link) {
          url = link.match(urlREG)
          // 如果提取歌曲页链接成功。url[0]是匹配出来的链接
          if (url && url[0]) {
            url = url[0]
            // idMatchRs 是匹配出来的id结果
            const idMatchRs = url.match(idREG)
            if (idMatchRs) {
              if (idMatchRs[1]) {
              // macos 客户端、网页、ios
                return idMatchRs[1]
              } else {
              // 安卓匹配结果
                return idMatchRs[2]
              }
            } else {
              // id无法识别
              return null
            }
          } else {
            // 链接无法识别
            return null
          }
        } else {
          // 链接参数不存在
          return null
        }
      }

      // 获取歌曲源url
      const getSrc = (id) => {
        return axios.get(APIServer + '/music/url?id=' + id)
          .then(res => {
            try {
              // console.log('获取到歌曲的src url：' + res.data.data[0].url)
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
            // 歌手是一个数组，每个数组内有一个对象，name属性是这个歌手的名字
            const mergeAr = (former, after) => former.name + ', ' + after.name
            try {
              let song = res.data.songs[0]
              // console.log('获取到歌曲的名称：' + res.data.songs[0].name)
              // console.log('获取到专辑的图片：' + res.data.songs[0].al.picUrl)
              // console.log('获取到歌手的名称：' + res.data.songs[0].ar.reduce(mergeAr))

              music.title = song.name
              music.artist = song.ar.length === 1 ? song.ar[0].name : song.ar.reduce(mergeAr)
              music.pic = song.al.picUrl

              // console.log('专辑图片' + res.data.songs[0].al.picUrl)
            } catch (err) {
              // console.log('未能获取歌曲信息')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

      if (this.songSetting && this.songSetting.source) {
        switch (this.songSetting.source) {
          case 'ncm': {
            // 如果是纯数字那么就认为是网易云id。否则认为是链接或者分享文字，先提取id，再设置音乐
            if (/^[0-9]*$/.test(this.songSetting.ncm)) {
              axios.all([getSrc(this.songSetting.ncm), getInfo(this.songSetting.ncm)])
                .then(axios.spread(function (acct, perms) {
                // 两个请求现在都执行完成
                  that.showPlayer = true
                }))
              return music
            } else {
              // 链接或分享文字。提取ID
              const id = getID(this.songSetting.ncm)

              if (id) {
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
          }
          case 'linkfile': {
            let linkFileInfo = this.songSetting.linkFileInfo
            if (linkFileInfo) {
              music.title = '网络文件'
              music.artist = '未知歌手'
              music.src = linkFileInfo
              music.pic = 'pics/linkfile-cover.png'
            }
            this.showPlayer = true
            return music
          }
          case 'localfile': {
            let localFileInfo = this.songSetting.localFileInfo

            if (localFileInfo) {
              music.src = localFileInfo
              music.title = '本地歌曲'
              music.artist = '未知歌手'
              console.log('得到本地文件链接：' + music.src)
            }
            this.showPlayer = true

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
@import '../styles/common.less';

@media only screen and (min-width: @small-screen-width) {
  @maker-wrp-height: 100%;  // 组件高度
  @player-wrp-height: 21%;  // 播放器容器高度
  @main-wrp-height: 69%;  // 中部容器高度
  @funcbtn-container-height: 10%;  // 功能按钮外层容器
  @lrc-editor-width: 89%;  // 编辑框宽度
  @ctrlbtn-wrp-width: 11%;  // 歌词控制按钮容器宽度
  // 最外层容器
  .maker-wrp {
    height: @maker-wrp-height;
  }
  // 播放器容器
  .player-wrp {
    height: @player-wrp-height;
  }
  // 中部容器(编辑框及歌词控制按钮)
  .main-wrp {
    height: @main-wrp-height;
    padding-left: 1rem;  // 为了减少编辑框位置的突兀
  }
  // 功能按钮外层容器
  .function-btn-container {
    height: @funcbtn-container-height;
  }
  // 编辑框
  .lrc-editor {
    height: 100%;
    width: @lrc-editor-width;
    float: left;
  }
  // 歌词控制按钮容器
  .ctrlbtn-wrp {
    height: 100%;
    width: @ctrlbtn-wrp-width;
    float: left;
    display: flex;
    align-items: center;
  }
  // 功能按钮定位容器
  .function-btn-wrp {
    width: 33%;
    float: left;
    display: flex;
    justify-content: space-around;
  }
  // 歌词控制按钮定位容器
  .ctrlbtn-pos-wrp {
    width: 100%;
    height: 70%;
    align-content: space-around;
  }
  // 歌词控制按钮
  .ctrl-btn {
    height: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 设置面板弹出按钮
  .setting-btn {
    display: none;
  }
}

// 对于移动设备
@media only screen and (max-width: @small-screen-width) {
  @maker-wrp-height: 90%;  // 组件高度
  @player-wrp-height: 20%;  // 播放器容器高度
  @main-wrp-height: 60%;  // 中部容器高度
  @funcbtn-container-height: (100% - @player-wrp-height - @main-wrp-height);  // 功能按钮外层容器
  @lrc-editor-width: 84%;  // 编辑框宽度
  @ctrlbtn-wrp-width: 16%;  // 歌词控制按钮容器宽度
  // 最外层容器
  .maker-wrp {
    height: @maker-wrp-height;
  }
  // 播放器容器
  .player-wrp {
    height: @player-wrp-height;
  }
  // 中部容器(编辑框及歌词控制按钮)
  .main-wrp {
    height: @main-wrp-height;
  }
  // 编辑框
  .lrc-editor {
    height: 100%;
    width: @lrc-editor-width;
    float: left;
  }
  // 歌词控制按钮容器
  .ctrlbtn-wrp {
    height: 100%;
    width: @ctrlbtn-wrp-width;
    float: left;
  }
  // 歌词控制按钮组定位容器
  .ctrlbtn-pos-wrp {
    width: 100%;
    height: 75%;
    margin-top: 2rem;
  }
  // 歌词控制按钮
  .ctrl-btn {
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 功能按钮外层容器
  .function-btn-container {
    height: @funcbtn-container-height;
  }
  // 功能按钮定位容器
  .function-btn-wrp {
    width: 33%;
    float: left;
    display: flex;
    justify-content: space-around;
  }
}

// 对于超小屏
@media only screen and(max-width: @xs-screen-width - 10em) {
  @maker-wrp-height: 100%;  // 组件高度
  @player-wrp-height: 22%;  // 播放器容器高度
  @main-wrp-height: 68%;  // 中部容器高度
  @funcbtn-container-height: (100% - @player-wrp-height - @main-wrp-height);  // 功能按钮外层容器
  @lrc-editor-width: 84%;  // 编辑框宽度
  @ctrlbtn-wrp-width: 16%;  // 歌词控制按钮容器宽度
  // 最外层容器
  .maker-wrp {
    height: @maker-wrp-height;
  }
  // 中部容器(编辑框及歌词控制按钮)
  .main-wrp {
    height: @main-wrp-height;
  }
  // 播放器容器
  .player-wrp {
    height: @player-wrp-height;
  }
    // 歌词控制按钮容器
  .ctrlbtn-wrp {
    height: 100%;
    width: @ctrlbtn-wrp-width;
    float: left;
    display: flex;
    align-items: center;
  }
  // 歌词控制按钮组定位容器
  .ctrlbtn-pos-wrp {
    width: 100%;
    height: 70%;
    margin-top: 0;
  }
  // 歌词控制按钮
  .ctrl-btn {
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 功能按钮外层容器
  .function-btn-container {
    height: @funcbtn-container-height;
  }
}
</style>
