<template>
  <!-- 文件链接设置表单 -->
  <el-form :label-position="'left'" label-width="45px" :model="linkFileInfo" @submit.native.prevent>
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
@import '../styles/common.less';

// 对于pc等设备
@media only screen and (min-width: @small-screen-width) {
  @linkfile-wrp-width: 25rem;  // 表单项宽度
  @linkfile-wrp-height: 3rem;  // 表单项高度
  @btn-wrp-width: 5rem;  // 按钮定位容器宽度
  .el-form {
    margin: 7rem auto;
  }
  .el-form-item {
    width: @linkfile-wrp-width;
    height: @linkfile-wrp-height;
    margin: 1rem auto;
  }
  .submit-btn-s-wrp {
    width: @btn-wrp-width;
    margin: 0 auto;
  }
}
// 对于移动设备
@media screen and (max-width: @small-screen-width) {
  @linkfile-wrp-width: 22rem;
  @linkfile-wrp-height: 3rem;
  @btn-wrp-width: 5rem;
  .el-form {
    margin: 5rem auto 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .el-form-item {
    width: @linkfile-wrp-width;
    height: @linkfile-wrp-height;
    margin: 0.5rem auto;
  }
  .submit-btn-s-wrp {
    width: @btn-wrp-width;
    margin: 0 auto;
  }
}
// 对于超小屏
@media only screen and(max-width: @xs-screen-width - 10em) {
  @linkfile-wrp-width: 17.5rem;
  .el-form {
    margin: 3rem auto 0;
  }
  .el-form-item {
    width: @linkfile-wrp-width;
  }
}
</style>
