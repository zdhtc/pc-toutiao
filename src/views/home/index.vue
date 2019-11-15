<template>
  <el-container >
    <el-aside style="background-color: #353b4e;height: 100vh;width: 220px;overflow: hidden">
      <div class="logo">
        <img src="../../assets/imgs/logo_admin.png" alt />
      </div>
      <el-menu
        background-color="#323745"
        text-color="#adafb5"
        active-text-color="#ffd04b"
        style="width: 221px"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">内容管理</template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="2-2">内容列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">粉丝管理</template>
          <el-menu-item index="4-1">图文数据</el-menu-item>
          <el-menu-item index="4-2">粉丝概况</el-menu-item>
          <el-menu-item index="4-3">粉丝画像</el-menu-item>
          <el-menu-item index="4-4">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">账户信息</el-menu-item>
      </el-menu>
    </el-aside>
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
import layoutHeader from '@/components/layout-header.vue'

export default {
  components: {
    layoutHeader
  }
}
</script>

<style scoped lang='less'>
.logo {
  padding: 20px 0;
  text-align: center;
  background-color: #2e2f32;
  img {
    height: 30px;
  }
}
.container{
  background-color: #f2f3f5;
  .header {
    background: #fff;
  }
}
</style>
