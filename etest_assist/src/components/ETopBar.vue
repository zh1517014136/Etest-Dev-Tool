<template>
    <v-navigation-drawer fixed permanent expand-on-hover  app>
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
                <v-list-item-title>转态机生成器</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolPairing'}">
                <v-list-item-icon>
                    <v-icon>mdi-rhombus-split-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>组合配对工具</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolEngineering'}">
                <v-list-item-icon>
                    <v-icon>mdi-tools</v-icon>
                </v-list-item-icon>
                <v-list-item-title>陆工大工具</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'EToolPractice'}">
                <v-list-item-icon>
                    <v-icon>mdi-alpha-p</v-icon>
                </v-list-item-icon>
                <v-list-item-title>练习工具</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
     
    }
</script>