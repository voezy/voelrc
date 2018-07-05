<template>
  <header>
    <div class="main">
      <div class="name">
        <router-link to="/">
          <h1>voeLrc</h1>
        </router-link>
      </div>

      <div class="menu">
        <div class="guide">
          <el-tooltip class="item"
            effect="light"
            content="指南"
            placement="bottom"
          >
            <router-link to="/guide">
              <i class="iconfont">&#xe6c5;</i>
            </router-link>
          </el-tooltip>
        </div>

        <div class="feedback">
          <el-tooltip class="item"
            effect="light"
            content="发送反馈到voezyy@gmail.com"
            placement="bottom"
          >
          <a href="mailto:voezyy@gmail.com">
            <i class="iconfont">&#xe662;</i>
          </a>
          </el-tooltip>
        </div>

        <div class="github-rep">
          <a href="https://github.com/voezy/voelrc" target="_blank">
            <i class="iconfont">&#xe8fd;</i>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      name: 'voeLrc'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';

// 阿里字体图标
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_734519_i7ddae1id6l.eot');
  src: url('//at.alicdn.com/t/font_734519_i7ddae1id6l.eot?#iefix')
      format('embedded-opentype'),
    url('//at.alicdn.com/t/font_734519_i7ddae1id6l.woff') format('woff'),
    url('//at.alicdn.com/t/font_734519_i7ddae1id6l.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_734519_i7ddae1id6l.svg#iconfont') format('svg');
}
.iconfont {
  font-family: 'iconfont';
  font-size: 2rem;
  font-style: normal;
}

// 对于PC
@media only screen and (min-width: @small-screen-width) {
  @header-width: 100%;  // 导航栏宽度
  @header-height: 5rem;  // 导航栏高度
  @main-width: 65rem;  // 导航栏内容部分宽度
  @main-height: @header-height;  // 导航栏内容部分高度
  @name-width: 7rem;  // logo部分宽度
  @name-height: @header-height;  // logo部分高度
  @menu-width: 15rem;  // 右侧菜单部分宽度
  @menu-height: @header-height;  // 右侧菜单部分高度
  @menubtn-width: 33%;  // 菜单图标容器宽度
  @menubtn-height: 100%; // 菜单容器高度
  @header-font-color: lighten(black, 50%);  // 导航栏字体颜色
  @header-font-hover-color: black;  // 导航栏(其实是右侧字体图标)的hover颜色
  header {
    width: @header-width;
    height: @header-height;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
  }
  .main {
    width: @main-width;
    height: @main-height;
    margin: 0 auto;
  }
  .name {
    width: @name-width;
    height: @name-height;
    float: left;
    line-height: @name-height;
    a {
      text-decoration: none;
    }
    h1 {
      margin: 0;
      color: @header-font-color;
      font-weight: 100;
      font-family: 'PingFang SC', 'Helvetica Neue', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Helvetica, Arial, Verdana, sans-serif;
    }
  }
  .menu {
    width: @menu-width;
    height: @menu-height;
    float: right;
  }
  // 右侧图标容器
  .guide,
  .feedback,
  .github-rep {
    width: @menubtn-width;
    height: @menubtn-height;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    a {
      position: absolute;
      display: block;
      color: @header-font-color;
      text-decoration: none;
      :hover {
        color: @header-font-hover-color;
      }
    }
  }
}
// 对于移动设备
@media only screen and (max-width: @small-screen-width) {
  @header-width: 100%;  // 导航栏宽度
  @header-height: 3rem;  // 导航栏高度
  @main-width: 95%;  // 导航栏内容部分宽度
  @main-height: @header-height;  // 导航栏内容部分高度
  @name-width: 7rem;  // logo部分宽度
  @name-height: @header-height;  // logo部分高度
  @menu-width: 10rem;  // 右侧菜单部分宽度
  @menu-height: @header-height;  // 右侧菜单部分高度
  @menubtn-width: 33%;  // 菜单图标容器宽度
  @menubtn-height: 100%; // 菜单容器高度
  @header-font-color: lighten(black, 50%);  // 导航栏字体颜色
  @header-font-hover-color: black;  // 导航栏(其实是右侧字体图标)的hover颜色
  header {
    width: @header-width;
    height: @header-height;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
  }
  .main {
    width: @main-width;
    height: @main-height;
    margin: 0 auto;
  }
  .name {
    width: @name-width;
    height: @name-height;
    float: left;
    line-height: @name-height;
    a {
      text-decoration: none;
    }
    h1 {
      margin: 0;
      color: @header-font-color;
      font-weight: 100;
      font-family: 'PingFang SC', 'Helvetica Neue', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Helvetica, Arial, Verdana, sans-serif;
    }
  }
  .menu {
    width: @menu-width;
    height: @menu-height;
    float: right;
  }
  // 右侧图标容器
  .guide,
  .feedback,
  .github-rep {
    width: @menubtn-width;
    height: @menubtn-height;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    a {
      position: absolute;
      display: block;
      color: @header-font-color;
      text-decoration: none;
      :hover {
        color: @header-font-hover-color;
      }
    }
  }
}
</style>
