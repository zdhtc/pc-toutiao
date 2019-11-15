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
            <el-dropdown-item @click.native="clickHandle">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'layout-header',
  methods: {
    clickHandle () {
      // 退出提示
      this.$confirm('请确认是否退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 清除token
        window.localStorage.removeItem('toutiao-token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
