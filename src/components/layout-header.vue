<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 100%">
    <el-col :span="8">
      <i class="el-icon-s-fold"></i>
      <span>李蕤教育科技股份有限公司</span>
    </el-col>
    <el-col :span="8">
      <el-row type="flex" justify="space-around" align="middle">
        <el-input
          placeholder="请输入搜索的文章内容"
          prefix-icon="el-icon-search"
          style="width: 50%;"
          size="small"
        ></el-input>
        <el-badge>消息</el-badge>
        <el-avatar src="../../assets/imgs/avatar.jpg" style="cursor:pointer"></el-avatar>
        <el-dropdown trigger="click" placement="bottom">
          <span style="cursor: pointer;">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'layout-header'
}
</script>

<style lang='less' scoped>
</style>
