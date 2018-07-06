# voeLrc
这是一个用于制作lrc歌词的网页工具，可以通过网络文件、本地文件或者网易云链接来选择音乐来源，给歌词加上时间标签。    
欢迎使用：[voeLrc](http://lrc.voezy.com)

## 安装
安装nodejs。    

安装网易云音乐nodejs版API，详情请戳 [网易云音乐 Node.js API](https://github.com/Binaryify/NeteaseCloudMusicApi)。    

安装yarn，详情请戳[yarnpkg/yarn: 📦🐈 Fast, reliable, and secure dependency management.](https://github.com/yarnpkg/yarn)。    

克隆项目到本地，然后安装依赖，
```
git clone https://github.com/voezy/voelrc.git
cd voelrc
yarn install
```

## 运行
先启动网易云音乐API，没有修改配置的话，默认API服务端口应该是3000。    

然后在本项目的根目录下，运行
```
yarn run dev
```
将自动打开浏览器跳转到项目的页面，如果没有，可以尝试访问 `localhost:8080`。

## 参与
欢迎提bug，提建议。

## 致谢
[网易云音乐 Node.js API](https://github.com/Binaryify/NeteaseCloudMusicApi)，👍