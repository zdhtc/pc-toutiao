<template>
  <el-card>
    <div slot="header">
      <span>发布文章</span>
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
      <!-- <el-form-item label="封面">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit(false)">发表</el-button>
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
    }
  },

  components: {
    quillEditor,
    channelList
  }
  // mounted () {
  //   // console.log(this.channels)
  //   console.log(this.aside)
  // }
}
</script>

<style  lang='less'>
.quill-editor{
  .ql-container{
    height: 300px;
  }
}

</style>
