<template>
  <div style="height:100%;">
    <div
      style="height:64px; min-width:800px; width:100%;display:flex; flex-wrap: nowrap; position:sticky;top:32px;z-index:888;">
      <v-card width="100%">
        <v-row no-gutters>
          <v-col cols="4">
            <v-row no-gutters>
              <v-col cols="8" style="height:64px;display:flex;flex-wrap:nowrap;">
                <div
                  style="height:64px;width:95%;display:flex;justify-content:center;align-items:center;margin:0px auto;">
                  <v-text-field v-model="search" @input="input" clearable flat solo-inverted
                    prepend-inner-icon="mdi-search" hide-details label="搜索">
                  </v-text-field>
                </div>
              </v-col>
              <v-col cols="4" style="height:64px;display:flex;flex-wrap:nowrap;">
                <div class="ml-2" style="height:64px;display:flex;align-items:center;">
                  <v-btn-toggle v-model="sortDesc" mandatory>
                    <v-btn small depressed>
                      <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn small depressed>
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </div>
              </v-col>

            </v-row>
          </v-col>
          <v-col cols="4" style="height:64px">

            <v-row no-gutters>
              <v-col cols="12" style="height:64px;display:flex;flex-wrap:nowrap;">
                <div style="display:flex;align-items:center;margin:0px auto;">

                  <v-icon style="cursor:pointer" :color="color" class="mx-2" medium>{{'mdi-' + icon}}</v-icon>

                  <v-icon style="cursor:pointer" :color="color" class="mx-2" large>{{'mdi-' + icon}}</v-icon>

                  <v-icon style="cursor:pointer" :color="color" class="mx-2" x-large>{{'mdi-' + icon}}</v-icon>

                </div>
              </v-col>

            </v-row>


          </v-col>
          <v-col cols="4" style="height:64px;display:flex;flex-wrap:nowrap;">
            <div style="display:flex;justify-content:center;align-items:center;margin:0px auto;">
              <v-btn class="mx-2" dark small @click="editcolor('blue')" color="blue">
                蓝色

              </v-btn>
              <v-btn class="mx-2" dark small @click="editcolor('red')" color="red">
                红色

              </v-btn>
              <v-btn class="mx-2" dark small @click="editcolor('orange')" color="orange">
                橙色

              </v-btn>
              <v-btn class="mx-2" small @click="editcolor(undefined)" color="white">
                <span style="color:black">白色</span>

              </v-btn>
            </div>
          </v-col>
        </v-row>

      </v-card>
    </div>

    <div style="display:flex; flex-wrap: wrap;">
      <div class="pa-4" v-for="item in icons" :key="item.name" style="width:350px;">
        <div @click="click(item)">
          <v-icon style="cursor:pointer">{{'mdi-' + item.name}}</v-icon>
          <span :class="item.name" :data-clipboard-text='item.name' style="cursor:pointer"> {{item.name}} </span>
        </div>

      </div>
    </div>

    <v-pagination style=" position:sticky;buttom:0px;z-index:888;" class="pt-4" v-model="page" :length="page_count">
    </v-pagination>

  </div>
</template>

<script>
  const per_count = 200;
  import Icons from '../helper/icons'
  import Clipboard from 'clipboard';
  export default {
    mounted: function () {
      this.page = 1;
      this.page_count = Math.floor(Icons.length / per_count);
    },
    computed: {
      icons: function () {
        let size = Icons.length;
        let begin = (this.page - 1) * per_count;
        let end = this.page * per_count - 1;
        let res = [];
        for (let i = begin; i <= end && i < size; i++) {
          res.push(Icons[i]);
        }
        return res;
      }
    },
    data: () => {
      return {
        page: 1,
        page_count: 0,
        search: '',
        sortDesc: false,
        icon: '',
        color: undefined,
        copy: '',
      }
    },
    methods: {
      click: function (data) {
        this.icon = data.name
        const copy = new Clipboard('.'+data.name)
        copy.on('success',function(e){
         e.clearSelection();
        })
        copy.on('error', () => {
        })
      },
      input: function (value) {
        console.log(value)
      },
      editcolor: function (data) {
        this.color = data
      }
    },
  }
</script>