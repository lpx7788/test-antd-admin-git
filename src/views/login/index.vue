<template>
  <div class="login flex">
    <div class="login-content flex-center">
      <div class="login-form flex-center">
        <div class="login-form-main">
          <h4 class="login-title tac">用户登录</h4>
          <a-form @submit="onSubmit" :form="form">
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="请输入手机号码"
                v-decorator="[
                  'phone',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号码',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="请输入密码"
                autocomplete="autocomplete"
                type="password"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                :loading="loading"
                size="large"
                htmlType="submit"
                type="primary"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Workplace",
  components: {},
  data() {
    return {
       form: this.$form.createForm(this),
       loading: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          const phone = this.form.getFieldValue('phone')
          const password = this.form.getFieldValue('password')
            if (phone != (process.env.ENV_NAME=='prod'?'18126823343':'18126823343')) {
              this.$message.error('账号错误');
              this.loading = false;
              return;
          }
          if (password != 'a123456b') {
               this.$message.error('密码错误');
              this.loading = false;
              return;
          }
          this.loading = true
          // console.log(phone,password)
          this.afterLogin('res')
          // login(name, password).then(this.afterLogin)
        }
      })
    },
     afterLogin(res) {
      this.logging = false
      // const loginRes = res.data
      // if (loginRes.code >= 0) {
        // const {user, permissions, roles} = loginRes.data
        // this.setUser(user)
        // this.setPermissions(permissions)
        // this.setRoles(roles)
        // setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt)})
        // // 获取路由配置
        // getRoutesConfig().then(result => {
        //   const routesConfig = result.data.data
        //   console.log('routesConfig===',routesConfig)
        //   loadRoutes(routesConfig)
          localStorage.setItem('access_token','e9b68b96ef3648adb99c1a8a9a3b12c3_d8ccfdda064544e4888249dbed628bc1')
          this.$router.push('/home')
          // locationStorage.setItem
        //   this.$message.success(loginRes.message, 3)
        // })
      // } else {
        // this.error = loginRes.message
      // }
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  // background: url(../../assets/cloudBg.jpg) #049ec4 0 bottom repeat-x;
  // background: url('http://192.168.0.230:9090/static/img/login-bg03.f6c078f.png') repeat;
  background-size: 100%;

  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .login-content {
    width: 100%;
    height: 100vh;
  }
  .login-form {
    width: 500px;
    height: 500px;
    background: #fff;
    .login-form-main {
      margin: 0 auto;
      width: 65%;
    }
    ::v-deep.ant-btn{
      width: 100%; 
      font-size: 18px !important;
      letter-spacing: 2px;
      font-weight: 300;
      color: #4d65fd ;
      border-color:  #4d65fd ;
      background: #fff;
      cursor: pointer;
      margin-top: 30px;
      font-family: neo
    }
    .login-title {
      color: #333;
      margin-bottom: 40px;
      font-weight: 500;
      font-size: 22px;
      text-align: center;
      letter-spacing: 4px;
    }
  }
  
}
</style>