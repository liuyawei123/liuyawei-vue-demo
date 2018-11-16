
<template>
  <!--:model 的值对应data数据对象-->
  <!--
  model表单数据对象
  rules表单验证规则
  label-position表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
  label-width表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值
  -->
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">登陆</h3>
      <el-form-item prop="ename">
        <el-input type="text" v-model="ename" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining" >登录</el-button>
      </el-form-item>
    </el-form>
  </template>

<script>



export default {

}

</script>

  <style>
    body{
      background: #DFE9FB;
    }
    .login-container{
      width:350px;
      margin-left:35%;
    }
  </style>
