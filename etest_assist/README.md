# 项目结构

```

    |-- public                                        存放项目静态资源文件和html入口文件
    |   |-- dataformat.html       
    |   |-- favicon.ico
    |   |-- favicon.png
    |   |-- icon.html
    |   |-- index.html
    |   |-- lan.html
    |   |-- serialport.html
    |   |-- state.html
    |   |-- electron-icon                             存放windows环境下配置的打包后的项目图标
    |   |   |-- icon.ico
    |   |   |-- icon.png
    |   |   |-- icon1.ico
    |   |-- icon
    |       |-- icon.icns
    |       |-- icon.ico
    |       |-- w28.ico
    |-- resources                                     存放设置linux环境的打包图标和mac环境的打包图标
    |   |-- ico
    |       |-- icon.icns
    |       |-- icon.ico
    |       |-- icon.png
    |-- src                                            存放项目代码
        |-- background.js                              后台数据库代码
        |-- data                                       数据转换工具
        |   |-- App.vue                                根页面
        |   |-- main.js                                js入口文件
        |   |-- components                             公共组件
        |   |   |-- ECard.vue
        |   |   |-- EEmpty.vue
        |   |   |-- ESysBar.vue
        |   |   |-- ETopBar.vue
        |   |   |-- ETopTabs.vue
        |   |   |-- widgets                          
        |   |       |-- EDataFormatEditor.vue
        |   |-- language                               转码 
        |   |   |-- complition.js
        |   |   |-- script_bin.js
        |   |   |-- script_hex.js
        |   |   |-- script_lua.js
        |   |-- plugins                                vuetify.js ui样式库
        |   |   |-- vuetify.js
        |   |-- router                                 router路由
        |   |   |-- index.js
        |   |-- store                                  vuex状态管理
        |   |   |-- index.js                           
        |   |   |-- modules
        |   |       |-- data_format.js
        |   |       |-- net_tool.js
        |   |       |-- state_code.js
        |   |       |-- tool_icons.js
        |   |-- views                                  项目组件
        |       |-- EToolDataFormat.vue 
        |-- icon                                      图标库
        |   |-- App.vue
        |   |-- main.js
        |   |-- components
        |   |   |-- ECard.vue
        |   |   |-- EEmpty.vue
        |   |   |-- ESysBar.vue
        |   |   |-- ETopBar.vue
        |   |   |-- ETopTabs.vue
        |   |   |-- widgets
        |   |       |-- EDataFormatEditor.vue
        |   |-- helper
        |   |   |-- helper.js
        |   |   |-- icons.js
        |   |-- plugins
        |   |   |-- vuetify.js
        |   |-- public
        |   |   |-- index.html
        |   |-- router
        |   |   |-- index.js
        |   |-- store
        |   |   |-- index.js
        |   |   |-- modules
        |   |       |-- data_format.js
        |   |       |-- net_tool.js
        |   |       |-- state_code.js
        |   |       |-- tool_icons.js
        |   |-- views
        |       |-- EToolIcons.vue
        |-- index                                         主页静态页面     
        |   |-- App.vue
        |   |-- main.js
        |   |-- assets
        |   |   |-- icon_tray.png
        |   |   |-- logo.png
        |   |   |-- logo.svg
        |   |-- components
        |   |   |-- ECard.vue
        |   |   |-- EEmpty.vue
        |   |   |-- ESysBar.vue
        |   |   |-- ETopBar.vue
        |   |   |-- ETopTabs.vue
        |   |   |-- widgets
        |   |       |-- EDataFormatEditor.vue
        |   |-- plugins
        |   |   |-- vuetify.js
        |   |-- router
        |   |   |-- index.js
        |   |-- store
        |       |-- index.js
        |       |-- modules
        |           |-- data_format.js
        |           |-- net_tool.js
        |           |-- state_code.js
        |           |-- tool_icons.js
        |-- lan                                            网络调试助手
        |   |-- App.vue
        |   |-- main.js
        |   |-- components
        |   |   |-- ECard.vue
        |   |   |-- EEmpty.vue
        |   |   |-- ESysBar.vue
        |   |   |-- ETopBar.vue
        |   |   |-- ETopTabs.vue
        |   |   |-- widgets
        |   |       |-- EDataFormatEditor.vue
        |   |-- plugins
        |   |   |-- vuetify.js
        |   |-- public
        |   |   |-- index.html
        |   |-- router
        |   |   |-- index.js
        |   |-- store
        |   |   |-- index.js
        |   |   |-- modules
        |   |       |-- data_format.js
        |   |       |-- net_tool.js
        |   |       |-- state_code.js
        |   |       |-- tool_icons.js
        |   |-- views
        |       |-- EToolNetwork.vue
        |-- serialport                                     串口调试助手
        |   |-- App.vue
        |   |-- main.js
        |   |-- components
        |   |   |-- ECard.vue
        |   |   |-- EEmpty.vue
        |   |   |-- ESysBar.vue
        |   |   |-- ETopBar.vue
        |   |   |-- ETopTabs.vue
        |   |   |-- widgets
        |   |       |-- EDataFormatEditor.vue
        |   |-- plugins
        |   |   |-- vuetify.js
        |   |-- router
        |   |   |-- index.js
        |   |-- store
        |   |   |-- index.js
        |   |   |-- modules
        |   |       |-- data_format.js
        |   |       |-- net_tool.js
        |   |       |-- serialport.js
        |   |       |-- state_code.js
        |   |       |-- tool_icons.js
        |   |-- views
        |       |-- EToolSerialport.vue
        |-- state                                          状态机生成器
            |-- App.vue
            |-- main.js
            |-- components
            |   |-- ECard.vue
            |   |-- EEmpty.vue
            |   |-- ESysBar.vue
            |   |-- ETopBar.vue
            |   |-- ETopTabs.vue
            |   |-- widgets
            |       |-- EDataFormatEditor.vue
            |-- helper
            |   |-- helper.js
            |   |-- icons.js
            |-- language
            |   |-- complition.js
            |   |-- script_bin.js
            |   |-- script_hex.js
            |   |-- script_lua.js
            |-- plugins
            |   |-- vuetify.js
            |-- public
            |   |-- index.html
            |-- router
            |   |-- index.js
            |-- store
            |   |-- index.js
            |   |-- modules
            |       |-- data_format.js
            |       |-- net_tool.js
            |       |-- state_code.js
            |       |-- tool_icons.js
            |-- views

                |-- EToolStateCode.vue

    |-- package.json                                       依赖包
    |-- vue.config.js                                      webpack配置文件
