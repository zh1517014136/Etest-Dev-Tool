<template>
    <div>
        <div style="height:80px; width:100%;display:flex; flex-wrap: nowrap;">
            <div style="width:20%">
                <v-text-field label="搜索" @input="input"></v-text-field>
            </div>

        </div>

        <div style="display:flex; flex-wrap: wrap;">
            <div class="pa-2" v-for="item in icons" :key="item.name" style="width:350px;">
                <v-icon style="cursor:pointer">{{'mdi-' + item.name}}</v-icon>
                <span style="cursor:pointer"> {{item.name}} </span>
            </div>
        </div>



        <!-- <v-pagination style="position: absolute; bottom: 8px; left: 0px;" class="pt-4" v-model="page" :length="page_count"></v-pagination> -->

    </div>
</template>

<script>
    import Icons from '../helper/icons'

    export default {
        mounted: function () {
            // this.page = 1;
            // this.page_count = Math.floor(Icons.length/per_count);
        },
        computed: {
            icons: function () {
                let size = Icons.length;
                let res = [];
                for (let i = 0; i < size; i++) {
                    res.push(Icons[i]);
                }
                return res;
            }
        },
        data: () => {
            return {
                page: 1,
                page_count: 0
            }
        },
        methods: {
            click: function (data) {
                console.log(data)
            },
            input: function (value) {
                console.log(value)
            }
        }

    }
</script>