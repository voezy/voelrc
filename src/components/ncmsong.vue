<template>
  <!-- 网易歌曲设置表单 -->
  <el-form
    :label-position="'left'"
    label-width="45px"
    :model="ncm"
    @submit.native.prevent
  >
    <el-form-item label="信息">
      <el-input
      v-model="ncm.info"
      size="small"
      placeholder="可输入歌曲链接、ID或分享文字"
      @keyup.enter.native="$emit('update-ncmsong', newInfo)"
    ></el-input>
    </el-form-item>

    <el-form-item>
      <div class="submit-btn-s-wrp">
        <el-button round @click="$emit('update-ncmsong', newInfo)">确定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ncm: {
        info: ''
      }
    }
  },
  computed: {
    newInfo () {
      return this.ncm.info
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
