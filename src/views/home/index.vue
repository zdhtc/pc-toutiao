<template>
  <el-container style="padding-left: 220px">
    <layout-aside ref="as" ></layout-aside>
    <el-container class="container">
      <el-header class="header">
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <!--
          不同的路由跳转但是复用同一个组件时，vue内部不会重新加载，会复用这个组件，此时可以类比v-for
          给每个组件加一个 key
        -->
        <router-view :key="$route.path"></router-view>
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
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.path !== vm.$refs.as.active) {
        vm.$refs.as.active = to.path
      }
    })
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
