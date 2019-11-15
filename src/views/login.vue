<template>
  <div class="login">
    <el-card class="card">
      <div slot="header" class="header">
        <img src="../assets/imgs/logo_index.png" alt />
      </div>
      <el-form :model="loginForm" autocomplete="off" :rules='rule' status-icon ref='loginForm'>
        <el-form-item prop="mobile">
          <el-input  v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input  placeholder="验证码" v-model="loginForm.code" style="width:65%;"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <!-- 注册点击事件 -->
          <el-button @click="login"  type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const validateMobile = (rule, value, cb) => {
      if (value.length === 0) {
        cb(new Error('请输入您的手机号'))
      }
      if (!(/^1[3456789]\d{9}$/).test(value)) {
        cb(new Error('请输入合法的手机号'))
      }
      cb()
    }
    const validateCode = (rule, value, cb) => {
      if (value.length === 0) {
        cb(new Error('请输入您的验证码'))
      }
      if (!(/^\d{6}$/).test(value)) {
        cb(new Error('验证码为6位数字'))
      }
      cb()
    }
    const validateCheck = (rule, value, cb) => {
      value ? cb() : cb(new Error('请阅读并同意条款'))
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },

      rule: {
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ],
        checked: [
          { validator: validateCheck }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'POST',
            url: '/authorizations',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('toutiao-token', res.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '手机号或者验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background: url("../assets/imgs/login_bg.jpg") no-repeat;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    width: 40%;
    height: 55%;
    .header{
      text-align: center;
      img {
        height: 25px;
      }
    }
  }
}
</style>
