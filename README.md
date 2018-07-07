# voeLrc
这是一个用于制作lrc歌词的网页工具，可以通过网络文件、本地文件、网易云歌曲链接或id等方式来选择音乐来源，给歌词加上时间标签。    
欢迎使用：[voeLrc, 简洁易用的lrc编辑工具](http://lrc.voezy.com)

## 安装
1 安装nodejs。    

2 安装网易云音乐nodejs版API，详情请戳 [网易云音乐 Node.js API](https://github.com/Binaryify/NeteaseCloudMusicApi)。没有安装这个的话，就只能通过本地歌曲或者歌曲下载链接来设置音乐来源。     

3 安装yarn，详情请戳[yarnpkg/yarn: 📦🐈 Fast, reliable, and secure dependency management.](https://github.com/yarnpkg/yarn)。    

4 克隆项目到本地，然后安装依赖，    
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
[APlayer](https://github.com/MoePlayer/APlayer),    

[网易云音乐 Node.js API](https://github.com/Binaryify/NeteaseCloudMusicApi)，    

[vue-APlayer](https://github.com/SevenOutman/vue-aplayer)    

棒👍