<template>
  <el-form :label-position="'right'" label-width="60px">
    <el-form-item class="upload-wrp">
      <el-upload class="upload" action="" :auto-upload="false" drag multiple :limit="1" :accept="'audio/*'" :on-change="updateFileInfo">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击选择</em>
        </div>
        <div class="el-upload__tip" slot="tip">一次只能选择一个，且只能是音频文件哦</div>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <div class="submit-btn-s-wrp">
        <el-button round @click="$emit('update-localfile', fileList[0] ? fileList[0].url : null)">确定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    updateFileInfo (file, fileList) {
      this.fileList = fileList
      console.log('选择本地文件: ' + fileList[0].url)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';

@media only screen and (min-width: @small-screen-width) {
  @btn-wrp-width: 5rem;
  .submit-btn-s-wrp {
    width: @btn-wrp-width;
    margin: 0 auto;
  }
}
// 对于移动设备
@media screen and (max-width: @xs-screen-width) {
  @btn-wrp-width: 5rem;
  // element-ui的上传组件定位问题
  .upload {
    margin-left: -3.9rem;
  }
  .submit-btn-s-wrp {
    width: @btn-wrp-width;
    margin: 0 0 0 5rem;
  }
}
// 对于超小屏
@media only screen and(max-width: @xs-screen-width - 10em) {
  @btn-wrp-width: 5rem;
  // element-ui的上传组件定位问题
  .upload {
    margin-left: -4.75rem;
  }
  .submit-btn-s-wrp {
    width: @btn-wrp-width;
    margin: 0 0 0 3rem;
  }
}
</style>
