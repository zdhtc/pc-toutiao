<template>
  <el-card>
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="title"
        label="标题"
      ></el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
      ></el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数"
      ></el-table-column>
      <el-table-column
        label="评论状态"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" round @click="$router.push(`comment/${scope.row.id}`)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin: 20px;text-align: center"
      background
      layout="prev, pager, next"
      :total="total_count"
      @current-change='changePage'
      :disabled="loading"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'commentList',
  data () {
    return {
      tableData: [],
      page: 1,
      per_page: 10,
      total_count: 0,
      loading: false
    }
  },
  methods: {
    loadComments () {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page,
          per_page: this.per_page,
          response_type: 'comment'
        }
      }).then(res => {
        this.tableData = res.data.data.results
        this.total_count = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取评论列表失败')
      }).finally(() => {
        this.loading = false
      })
    },

    changePage (page) {
      this.page = page
      this.loadComments()
    },

    onChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      }).catch(() => {
        this.$message.error('操作失败')
      })
    }
  },
  created () {
    this.loadComments()
  }
}
</script>

<style>

</style>
