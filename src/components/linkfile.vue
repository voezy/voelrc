<template>
  <!-- 文件链接设置表单 -->
  <el-form :label-position="'right'" label-width="60px" :model="linkFileInfo">
    <el-form-item label="链接">
      <el-input v-model="linkFileInfo.link" size="small" placeholder="输入歌曲文件链接"></el-input>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="linkFileInfo.name" size="small" placeholder="输入歌曲名称"></el-input>
    </el-form-item>
    <el-form-item label="歌手">
      <el-input v-model="linkFileInfo.singer" size="small" placeholder="输入歌手名称"></el-input>
    </el-form-item>
    <el-form-item label="专辑">
      <el-input v-model="linkFileInfo.album" size="small" placeholder="输入歌曲所属专辑"></el-input>
    </el-form-item>
    <el-form-item label="编辑者">
      <el-input v-model="linkFileInfo.creator" size="small" placeholder="输入歌词编辑者昵称"></el-input>
    </el-form-item>
    <el-form-item>
      <div class="submit-btn-s-wrp">
        <el-button round @click="$emit('update-linkfile', newLinkFileInfo)">确定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      linkFileInfo: {
        link: '',
        name: '',
        singer: '',
        album: '',
        creator: ''
      }
    }
  },
  computed: {
    newLinkFileInfo () {
      return {
        link: this.linkFileInfo.link,
        name: this.linkFileInfo.name,
        singer: this.linkFileInfo.singer,
        album: this.linkFileInfo.album,
        creator: this.linkFileInfo.creator
      }
    }
  }
}
</script>

<style lang="less" scoped>
@elFormWidth: 350px;
@elFormHeight: 360px;
@elInputWidth: 270px;
@atPhoneElFormWidth: 280px;
@atPhoneElInputWidth: 190px;
.el-form {
  width: @elFormWidth;
  height: @elFormHeight;
}
.el-input {
  width: @elInputWidth;
}
// 确定按钮定位容器
.submit-btn-s-wrp {
  width: 80px;
  margin: 0 auto;
}
@media only screen and (max-width: 767px) {
  .el-form {
    width: @atPhoneElFormWidth;
  }
  .el-input {
    width: @atPhoneElInputWidth;
  }
}
</style>
