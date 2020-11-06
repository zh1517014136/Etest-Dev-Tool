# 项目结构

```
|-- public                     存放项目静态资源文件和html入口文件

    |-- electron-icon          存放windows环境下配置的打包后的项目图标
    |-- index.html             项目的html文件入口

|-- resources  

    |-- icon                   存放设置linux环境的打包图标和mac环境的打包图标

|-- src                        存放项目代码

    |-- data                   数据转换工具
        |
        |-- components
        |-- language
        |-- plugins
        |-- router
        |-- store
        |-- views
        |-- App.vue
        |-- main.js

    |-- icon                   图标库
    |-- index                  主页
    |-- lan                    网络调试助手
    |-- serialport             串口调试助手
    |-- state                  状态机生成器
    |-- background.js          后台数据库代码

|-- package.json               依赖包
|-- vue.config.js              webpack配置文件
