<template>
  <el-container style="padding-left: 220px">
    <layout-aside></layout-aside>
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
