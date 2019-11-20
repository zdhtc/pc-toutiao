<template>
  <el-card>
    <div slot="header">
      <span>评论详情</span>
      <el-button style="float: right;padding: 3px 0" type="text">按钮</el-button>
    </div>
    <el-table :data="comments" style="width: 100%">
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.aut_photo" alt="" width="50">
        </template>
      </el-table-column>
      <el-table-column prop="content" label="评论内容"></el-table-column>
      <el-table-column prop="name" label="点赞">
        <template slot-scope="scope">
          {{ scope.row.is_liking === 1 ? '已赞' : '未赞' }}
        </template>
      </el-table-column>
      <el-table-column prop="like_count" label="点赞数量"></el-table-column>
      <el-table-column prop="pubdate" label="评论日期">
        <template slot-scope="scope">
          {{ scope.row.pubdate | dateFormat('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="是否推荐">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_top"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onRecommend(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="reply_count" label="回复数量"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'CommentDetail',
  data () {
    return {
      comments: []
    }
  },
  // 除了可以通过 this.$route.params 获取路由参数
  // 还有一种更方便的方式：通过 props 解耦，说白了就是自动把路由参数映射到 props 中
  // 然后就可以像访问 data 数据一样来访问路由参数了
  props: {
    commentId: {
      type: String,
      required: true
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    loadComments () {
      this.$axios({
        method: 'GET',
        url: 'comments',
        params: {
          type: 'a',
          source: this.commentId
        },
        data: {
          allow_comment: true
        }
      }).then(res => {
        this.comments = res.data.data.results
      }).catch(() => {
        this.$message.error('获取评论详情失败')
      })
    },

    onRecommend (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`,
        data: {
          sticky: comment.is_top
        }
      }).then(res => {
        this.$message('操作成功')
      }).catch(() => {
        this.$message.error('操作失败')
      })
    }
  }
}
</script>

<style>

</style>
