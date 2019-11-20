<template>
  <div>
    <el-form :model="user" label-width="100px">
      <el-form-item label="用户头像">
        <el-upload
          ref="avatar"
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :on-progress="avatarUpload"
        >

          <img :src="user.photo" alt="" v-if="user.photo">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

        </el-upload>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input v-model="user.intro" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        photo: '',
        name: '',
        intro: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    onSubmit () {
      console.log('提交了')
    },

    loadUserProfile () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        this.user = res.data.data
      }).catch(() => {
        this.$message.error('获取用户数据失败')
      })
    },

    avatarUpload (event, file) {
      // 取消组件的默认上传
      this.$refs.avatar.abort()
      // 手动上传图片
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          photo: file.raw
        }
      }).then(res => {
        // this.$refs.avatar.$el.querySelector('img').src
        console.log(res)
      }).catch(err => {
        console.log('头像上传失败', err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader{
  width: 180px;
  height: 180px;
}
.avatar-uploader,.el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img{
    display: block;
    width: 180px;
    height: 180px;
  }
  .avatar-uploader-icon {
    color: #8c939d;
    width: 180px;
    height: 180px;
    text-align: center;
    line-height: 180px;
    font-size: 28px;
  }
}

</style>
