<template>
<!--
  组件中的v-model可以分为两部分
  1、:value="num"
  2、@input="num = $event"  $event为子组件触发input事件时传给父组件的参数
 -->
  <el-select
    :value="value"
    @input="$emit('input', $event)"
    placeholder="请选择类别"
  >
    <el-option v-if="$route.path === '/index/article'" :value="null" >所有频道</el-option>
    <el-option
      v-for="channel in channels"
      :key="channel.id"
      :label="channel.name"
      :value="channel.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'channel',
  data () {
    return {
      channels: []
    }
  },
  props: {
    value: {
      type: [String, Number]
    }
  },

  methods: {
    loadChannels () {
      this.$axios({
        method: 'get',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '频道列表请求出错了')
      })
    }
  },

  created () {
    this.loadChannels()
  }
}
</script>

<style>

</style>
