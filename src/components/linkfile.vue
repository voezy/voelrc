<template>
  <!-- 文件链接设置表单 -->
  <el-form :label-position="'right'" label-width="60px" :model="linkFileInfo">
    <el-form-item label="链接">
      <el-input v-model="linkFileInfo.link" size="small" placeholder="输入歌曲文件链接" @keyup.enter.native="$emit ('update-linkfile', newLinkFileInfo)"></el-input>
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
        link: ''
      }
    }
  },
  computed: {
    newLinkFileInfo () {
      return this.linkFileInfo.link
    }
  }
}
</script>

<style lang="less" scoped>
@elFormWidth: 350px;
@elFormHeight: 360px;
@elInputWidth: 290px;
@atPhoneElFormWidth: 280px;
@atPhoneElInputWidth: 60vw;
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
