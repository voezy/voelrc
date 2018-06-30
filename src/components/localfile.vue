<template>
  <div class="setinfo-form">
    <el-form :label-position="'right'" label-width="60px">
      <el-form-item class="upload-wrp">
        <el-upload action="" :auto-upload="false" drag multiple :limit="1" :accept="'audio/*'" :on-change="updateFileInfo">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
          <div class="el-upload__tip" slot="tip">一次只能选择一个，且只能是音频文件哦</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <div class="ensure-btn-wrp">
          <el-button round @click="$emit('update-localfile', fileList[0] ? fileList[0].url : null)">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
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
.setinfo-form {
  margin: 10px auto;
}
.upload-wrp {
  margin: 0 auto;
}
.ensure-btn-wrp {
  width: 80px;
  margin: 0 auto;
}
</style>
