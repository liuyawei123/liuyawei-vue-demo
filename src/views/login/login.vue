<template>

  <div class="all">

    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">登陆</h3>
      <el-form-item prop="empName">
        <el-input type="text" v-model="account.empName" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="login"  >登录</el-button>
      </el-form-item>
    </el-form>

    <div class="register-wrap" v-show="showRegister">

      <h3>注册</h3>

      <p v-show="showTishi">{{tishi}}</p>

      <input type="text" placeholder="请输入用户名" v-model="newUsername">

      <input type="password" placeholder="请输入密码" v-model="newPassword">

      <button v-on:click="register">注册</button>

      <span v-on:click="ToLogin">已有账号？马上登录</span>

    </div>

  </div>

</template>

<script>

import {setCookie, getCookie} from '../../assets/js/cookie.js'

import UserApi from '@/api/user'
import axios from 'axios'
export default{

  mounted () {
    /* 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录 */

    if (getCookie('empName')) {
      this.$router.push('/home')
    }
  },

  methods: {

    ToRegister () {
      this.showRegister = true

      this.showLogin = false
    },

    ToLogin () {
      this.showRegister = false

      this.showLogin = true
    },

    login () {
      if (this.account.empName === '' || this.account.password === '') {
        alert('请输入用户名或密码')
      } else {
        let d = {'empName': this.account.empName, 'password': this.account.password}
        console.log('我用户名和密码' + d)
        /* 接口请求 */
        let res = UserApi.logining(d)

        // this.a.post('http://12285/api/users', data).then((res) => {
        console.log('我用户名和密码' + res)

        /* 接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值 */

        if (res.data === -1) {
          this.tishi = '该用户不存在'

          this.showTishi = true
        } else if (res.data === 0) {
          this.tishi = '密码输入错误'

          this.showTishi = true
        } else if (res.data === 'admin') {
          /* 路由跳转this.$router.push */

          this.$router.push('/main')
        } else {
          this.tishi = '登录成功'

          this.showTishi = true

          setCookie('username', this.empName, 1000 * 60)

          setTimeout(function () {
            this.$router.push('/user')
          }.bind(this), 1000)
        }
      }
    },
    register () {
      if (this.newUsername === '' || this.newPassword === '') {
        alert('请输入用户名或密码')
      } else {
        let data = {'username': this.newUsername, 'password': this.newPassword}

        this.$http.post('http://localhost/vueapi/index.php/Home/user/register', data).then((res) => {
          console.log(res)

          if (res.data === 'ok') {
            this.tishi = '注册成功'

            this.showTishi = true

            this.username = ''

            this.password = ''

            /* 注册成功之后再跳回登录页 */

            setTimeout(function () {
              this.showRegister = false

              this.showLogin = true

              this.showTishi = false
            }.bind(this), 1000)
          }
        })
      }
    }

  },

  data () {
    return {
      checked: true,
      rules: {
        empName: [
          {required: true, trigger: 'change', message: '请输入姓名!'}
        ],
        password: [
          {required: true, trigger: 'change', message: '请输入密码!'}
        ]

      },
      account: {
        empName: '',
        password: ''
      },

      showLogin: true,

      showRegister: false,

      showTishi: false,

      tishi: '',

      empName: '',

      password: '',

      newUsername: '',

      newPassword: ''

    }
  }

}
</script>

<style>

  .login-wrap{text-align:center;}

  input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}

  p{color:red;}

  button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}

  span{cursor:pointer;}

  span:hover{color:#41b883;}

</style>
