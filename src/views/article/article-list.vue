<template>
  <div>
    <el-card>
      <div slot="header">
        <span>全部图文</span>
      </div>
      <el-form ref='filterForm' :model="filterForm" >
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio-button value='全部' label="全部"></el-radio-button>
            <el-radio-button value='草稿' label="草稿"></el-radio-button>
            <el-radio-button value='待审核' label="待审核"></el-radio-button>
            <el-radio-button value='审核通过' label="审核通过"></el-radio-button>
            <el-radio-button value='审核失败' label="审核失败"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表" >
          <el-select placeholder="请选择" v-model="filterForm.channel_id">
            <el-option value='0' label="区域一"></el-option>
            <el-option value='1' label="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            unlink-panels
            range-seperator="----"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <span>共找到0条符合条件的内容</span>
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
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      tableData: [],
      articleStatus: [
        { type: 'primary', label: '草稿' },
        { type: 'warning', label: '待审核' },
        { type: 'success', label: '审核通过' },
        { type: 'danger', label: '审核失败' },
        { type: 'info', label: '已删除' }
      ]
    }
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'get',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('toutiao-token')}`
        }
      }).then(res => {
        this.tableData = res.data.data.results
      }).catch(err => {
        console.log(err, '请求出错了')
      })
    }
  },
  created () {
    this.loadArticles()
  }
}
</script>

<style>

</style>
