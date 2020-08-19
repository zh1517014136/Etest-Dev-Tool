<template>
    <v-navigation-drawer fixed permanent expand-on-hover  app style="z-index:9999">
        <v-list nav dense>
            <v-list-item :to="{name: 'EToolDataFormat'}">
                <v-list-item-icon>
                    <v-icon>mdi-database</v-icon>
                </v-list-item-icon>
                <v-list-item-title>数据转换工具</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolIcons'}">
                <v-list-item-icon>
                    <v-icon>mdi-simple-icons</v-icon>
                </v-list-item-icon>
                <v-list-item-title>图标库</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolStateCode'}">
                <v-list-item-icon>
                    <v-icon>mdi-state-machine</v-icon>
                </v-list-item-icon>
                <v-list-item-title>状态机生成器</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolPairing'}">
                <v-list-item-icon>
                    <v-icon>mdi-rhombus-split-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>组合配对工具</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolSerialport'}">
                <v-list-item-icon>
                    <v-icon>mdi-serial-port</v-icon>
                </v-list-item-icon>
                <v-list-item-title>串口助手</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolNetwork'}">
                <v-list-item-icon>
                    <v-icon>mdi-lan</v-icon>
                </v-list-item-icon>
                <v-list-item-title>网络助手</v-list-item-title>
            </v-list-item>
             <v-list-item :to="{name: 'lrMoveMindows'}">
                <v-list-item-icon>
                    <v-icon>mdi-dock-window</v-icon>
                </v-list-item-icon>
                <v-list-item-title>左右移动窗口</v-list-item-title>
            </v-list-item>
             <v-list-item :to="{name: 'tbMoveMindows'}">
                <v-list-item-icon>
                    <v-icon>mdi-dock-window</v-icon>
                </v-list-item-icon>
                <v-list-item-title>上下移动窗口</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolCloseCard'}">
                <v-list-item-icon>
                    <v-icon>mdi-dock-window</v-icon>
                </v-list-item-icon>
                <v-list-item-title>可关闭卡片</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
     
    }
</script>