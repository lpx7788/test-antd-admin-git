<template>
  <div class="login">
    <div class="login-content flex-center">
      <div class="login-form">
        <h4 class="login-title tac">用户登录</h4>
        <a-form  @submit="onSubmit" :form="form">
          <a-form-item>
            <a-input
              autocomplete="autocomplete"
              size="large"
              placeholder="admin"
              v-decorator="[
                'name',
                {
                  rules: [
                    { required: true, message: '请输入账户名', whitespace: true },
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
              placeholder="888888"
              autocomplete="autocomplete"
              type="password"
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: '请输入密码', whitespace: true },
                  ],
                },
              ]"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              :loading="logging"
              style="width: 100%; margin-top: 24px"
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Workplace",
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.login {
  .login-content{
    width: 100%;
    height: 100vh;
  }
  .login-form {
    width: 500px;
    height: 500px;
    background: #fff;
    .login-title{
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
