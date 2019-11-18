<template>
  <div>
    <el-card>
      <div slot="header">
        <span>全部图文</span>
      </div>
      <el-form ref='filterForm' :model="filterForm" >
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio-button :label="null">全部</el-radio-button>
            <el-radio-button label="0">草稿</el-radio-button>
            <el-radio-button label="1">待审核</el-radio-button>
            <el-radio-button label="2">审核通过</el-radio-button>
            <el-radio-button label="3">审核失败</el-radio-button>
            <el-radio-button label="4">已删除</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表" >
          <channel-list v-model="filterForm.channel_id"></channel-list>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            unlink-panels
            range-seperator="----"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='filterArticles'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <span>共找到{{ total_count }}条符合条件的内容</span>
      </div>
      <!--
        el-table 表格组件
        data 表格的数组，要求是数组
        表格组件会使用 data 数据，在内部自己进行遍历，我们不需要自己写什么 v-for
        你只需要告诉这个表格组件：
          data 是啥
          表头名是什么
          列值是什么
        el-table-column 表格列组件
          prop 用来指定渲染哪个数据字段
          label 表头名称
          width 列宽

        表格列默认只能渲染普通文本，如果想要渲染点儿别的东西，需要自定义表格列。
       -->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="avatar"
          label="封面"
        >
        <!--
          自定义表格列
          在 template 上声明 slot-scope="scope" ，然后就可以通过 scope.row 获取遍历项
          scope.row 就相当于我们自己 v-for 的 item
          注意：只有当你需要在自定义表格列模板中访问遍历项的时候才这么做
          -->
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0] || ''" alt="" width='50'>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >
              {{ articleStatus[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
        ></el-table-column>
        <el-table-column
          prop=""
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="text-align: center;margin: 50px"
        background
        layout="prev, pager, next"
        :total="total_count"
        :current-page="filterForm.page"
        @current-change="pageChange"
        :disabled="loading"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import channel component
import channelList from '@/views/article/article-channel'

export default {
  name: 'article-list',
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      rangeDate: '',
      tableData: [],
      articleStatus: [
        { type: 'primary', label: '草稿' },
        { type: 'warning', label: '待审核' },
        { type: 'success', label: '审核通过' },
        { type: 'danger', label: '审核失败' },
        { type: 'info', label: '已删除' }
      ],
      total_count: 0,
      loading: true
    }
  },
  methods: {
    loadArticles () {
      // 显示 加载中
      this.loading = true
      this.$axios({
        method: 'get',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('toutiao-token')}`
        // },
        params: this.filterForm
      }).then(res => {
        this.total_count = res.data.data.total_count
        this.tableData = res.data.data.results
      }).catch(err => {
        console.log(err, '请求出错了')
      }).finally(() => {
        // 隐藏加载中
        this.loading = false
      })
    },

    pageChange (currentPage) {
      this.filterForm.page = currentPage
      this.loadArticles()
    },

    // 过滤文章
    filterArticles () {
      // 把filterForm中的page初始化为 1，这样筛选结果默认显示第一页
      this.filterForm.page = 1
      this.loadArticles()
    },

    // 删除文章
    onDelete (articleId) {
      this.$confirm('你确认要删除这篇文章吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${articleId}`
        }).then(res => {
          this.loadArticles()
        }).catch(err => {
          console.log(err, '删除文章失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },

  watch: {
    // 监听日期的改变，然后改变过滤对象中的开始与结束日期
    rangeDate () {
      this.filterForm.begin_pubdate = this.rangeDate && this.rangeDate[0]
      this.filterForm.end_pubdate = this.rangeDate && this.rangeDate[1]
    }
  },

  components: {
    channelList
  },

  created () {
    this.loadArticles()
  }
}
</script>

<style>

</style>
