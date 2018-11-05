<template>
  <div class="home">
    <div class="info-container" v-for="item in homelist">
      <info :info="item" class="info"></info>
    </div>
		<switch-button></switch-button>
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/axios/api.js'
import gd from '@/axios/globalData.js'
import Info from 'components/info/Info.vue'
import SwitchButton from 'components/switchbutton/SwitchButton.vue'

const ERR_OK = 0

export default {
  data () {
    return {
      homelist: []
    }
  },
  created() {
    api.axios_http(gd.attachmentList).then((res) => {
      // console.log("== return data =="+res.returnParm.list[5].fileName)
      this.homelist = res.returnParm.list
    }).catch((error) => {
      console.warn(error)
    })
  },
  components: {
    "info": Info,
    "switch-button": SwitchButton
  }
}
</script>

<style lang="less">
  .home {
    .info{
      margin: 20px 0;
    }
  }
</style>
