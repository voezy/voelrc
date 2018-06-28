<template>
  <div class="setinfo-form">
    <el-form :label-position="'right'" label-width="60px" :model="setting">
      <el-upload action="" :on-preview="handlePreview" :file-list="fileList" :on-remove="handleRemove" multiple :limit="1" :on-change="handleChange">
        <el-button size="small" type="primary">点击选择</el-button>
        <div slot="tip" class="el-upload__tip">只能选择音频文件</div>
      </el-upload>
      <el-form-item label="名称">
        <el-input v-model="setting.name" size="small" placeholder="输入歌曲名称"></el-input>
      </el-form-item>
      <el-form-item label="歌手">
        <el-input v-model="setting.singer" size="small" placeholder="输入歌手名称"></el-input>
      </el-form-item>
      <el-form-item label="专辑">
        <el-input v-model="setting.album" size="small" placeholder="输入歌曲所属专辑"></el-input>
      </el-form-item>
      <el-form-item label="编辑者">
        <el-input v-model="setting.creator" size="small" placeholder="输入歌词编辑者昵称"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      setting: {
        localfile: '',
        name: '',
        singer: '',
        album: '',
        creator: ''
      },
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file, flieList) {
      console.log(file, flieList)
    },
    handleChange (file, flieList) {
      console.log(file, flieList)
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 270px;
}
</style>
