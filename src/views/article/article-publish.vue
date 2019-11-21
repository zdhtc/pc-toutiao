<template>
  <el-card>
    <div slot="header">
      <span>{{ $route.params.articleId ? '编辑文章' : '发布文章' }}</span>
    </div>
    <el-form ref="form" :model="article" label-width="80px" :rules="rules" status-icon>
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor
          v-model="article.content"
          ref="myQuillEditor"
          :options="editorOption"
        >

        </quill-editor>
      </el-form-item>
      <el-form-item label="频道">
        <channel-list v-model="article.channel_id"></channel-list>
      </el-form-item>
      <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type" @change="onChange">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="article.cover.type > 0">
            <avater-upload ref="avatarUpload" v-for="item in article.cover.type" :key="item" v-model="article.cover.images[item - 1]"></avater-upload>
          </div>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(false)">{{ $route.params.articleId ? '编辑' : '发布' }}</el-button>
        <el-button type="" @click="onSubmit(true)">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// import quillEditor styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import core component
import { quillEditor } from 'vue-quill-editor'
// import channel component
import channelList from '@/views/article/article-channel'
// import avater upload
import avaterUpload from './component/upload-avatar'

export default {
  name: 'publish',
  data () {
    return {
      article: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片，无图就是空数组即可
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { pattern: /^.{5,10}$/, message: '请输入5-10个字符', trigger: 'blur' }
        ]
      },
      editorOption: {}
    }
  },

  methods: {
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.updateArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },

    addArticle (draft) {
      this.$axios({
        method: 'post',
        url: '/articles',
        // query参数
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        // console.log(res)
        if (res.data.message === 'OK') {
          this.$router.push('/index/article')
        }
      }).catch(err => {
        console.log(err + '发表文章失败')
      })
    },

    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        if (res.data.message === 'OK') {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.$router.push('/index/article')
        }
      }).catch(() => {
        this.$message.error('更新失败')
      })
    },

    loadArticle (articleId) {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      }).catch(err => {
        console.log(err, '获取文章失败')
      })
    },

    onChange () {
      // this.article.cover.images.length = 0
      this.article.cover.images = []
    }
  },

  components: {
    quillEditor,
    channelList,
    avaterUpload
  },

  created () {
    this.$route.params.articleId && this.loadArticle()
  }
}
</script>

<style  lang='less'>
.quill-editor{
  .ql-container{
    height: 300px;
  }
}

</style>
