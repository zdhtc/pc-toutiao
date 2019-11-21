<template>
  <div>
    <el-form :model="user" label-width="100px">
      <el-form-item label="用户头像">
        <el-upload
          ref="avatar"
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :http-request="avatarUpload"
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
        <el-input v-model="user.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import eventBus from '@/utils/event-bus.js'

export default {
  name: 'account',
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
      const { name, intro, email } = this.user
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          intro,
          email
        }
      }).then(res => {
        // 同步更新header中的用户数据
        eventBus.$emit('userUpdate', this.user)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        this.$message.error('修改失败')
      }).finally(() => {
        this.loadUserProfile()
      })
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

    avatarUpload (file) {
      // // 取消组件的默认上传
      // this.$refs.avatar.abort()
      const avatar = new FormData()
      avatar.append('photo', file.file)
      // 手动上传图片
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: avatar
      }).then(res => {
        this.user.photo = res.data.data.photo
        // 同步更新header中的用户数据
        eventBus.$emit('userUpdate', this.user)
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
