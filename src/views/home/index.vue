<template>
  <el-container style="padding-left: 220px">
    <layout-aside ref="as" ></layout-aside>
    <el-container class="container">
      <el-header class="header">
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '@/components/aside.vue'
import layoutHeader from '@/components/layout-header.vue'

export default {
  components: {
    layoutHeader,
    layoutAside
  },
  beforeRouteUpdate (to, from, next) {
    // console.log(this.$refs.as.$el.querySelector('#menu'))
    if (from.path === to.path) {
      return next(new Error())
    }
    if (this.$refs.as.active !== to.path) {
      this.$refs.as.active = to.path
    }
    next()
  }
}
</script>

<style scoped lang='less'>
.container{
  background-color: #f2f3f5;
  .header {
    background: #fff;
  }
}
</style>
