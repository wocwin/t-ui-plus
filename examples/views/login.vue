<template>
  <div class="login">
    <div class="content">
      <div class="input-format">
        <img src="../assets/images/logo.png" alt class="logon" />
        <h3 class="title">vue3子应用模板</h3>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" placeholder="账号">
              <template #prefix>
                <svg-icon icon-class="user" class="el-input__icon input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              @keyup.enter="handleLogin(loginFormRef)"
              show-password
            >
              <template #prefix>
                <svg-icon icon-class="password" class="el-input__icon input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click="handleLogin(loginFormRef)"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { defineComponent, reactive, ref } from 'vue'
import { LocationQueryValue, useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import store from '@/store'
export default defineComponent({
  name: 'login',
  setup() {
    const version = require('/package.json').version

    const loginForm = reactive({
      username: '',
      password: '',
      rememberMe: false
    })
    const loginRules = reactive({
      username: [
        { required: true, trigger: 'blur', message: '用户名不能为空' }
      ],
      password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
    })
    // 获取cookie中记录用户信息
    const username = Cookies.get('username')
    const password = Cookies.get('password')
    const rememberMe = Cookies.get('rememberMe')
    loginForm.username = username ? username : loginForm.username
    loginForm.password = password ? decrypt(password) : loginForm.password
    loginForm.rememberMe = rememberMe ? Boolean(rememberMe) : false

    // 点击登录
    const loading = ref(false)
    const redirect: string | LocationQueryValue[] | null =
      useRoute().query.redirect
    const router = useRouter()
    const loginFormRef = ref<FormInstance>()
    const handleLogin = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (!valid) return
        loading.value = true
        if (loginForm.rememberMe) {
          Cookies.set('username', loginForm.username, { expires: 30 })
          Cookies.set('password', encrypt(loginForm.password), {
            expires: 30
          })
          Cookies.set('rememberMe', String(loginForm.rememberMe), {
            expires: 30
          })
        } else {
          Cookies.remove('username')
          Cookies.remove('password')
          Cookies.remove('rememberMe')
        }
        store
          .dispatch('Login', loginForm)
          .then(() => {
            router.push({ path: '/' })
          })
          .finally(() => (loading.value = false))
      })
    }

    return {
      version,
      loginForm,
      loginRules,
      loading,
      loginFormRef,
      handleLogin
    }
  }
})
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/images/bg.png');
  height: 100vh;
  background-size: cover;
  padding: 50px 0;
  .content {
    width: 100%;
    height: 100%;
    background: url('../assets/images/content.png') no-repeat 0;
    background-size: 70%;
    display: flex;
    justify-content: flex-end;
    padding-right: 12%;
    align-items: center;
    .input-format {
      width: 340px;
      height: 440px;
      background: #fff;
      box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding: 40px 37px;
      text-align: left;
      .logon {
        width: 260px;
      }
      .title {
        font-size: 29px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #142969;
        margin-top: 8px;
        margin-bottom: 40px;
      }
      .login-form {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        font-feature-settings: 'tnum';
        .el-input {
          height: 38px;
          input {
            height: 38px;
          }
        }
        .input-icon {
          height: 39px;
          width: 14px;
          margin-left: 2px;
        }
      }
    }
  }
}
</style>
