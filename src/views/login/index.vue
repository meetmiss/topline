<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group style="padding: 0 10px">
      <van-field
        v-model="user.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errors.first('mobile')"
        name="mobile"
        v-validate="'required'"
      />
      <van-field
        v-model="user.code"
        center
        required
        clearable
        label="验证码"
        placeholder="请输入验证码"
        :error-message="errors.first('code')"
        name="code"
        v-validate="'required|length:6'"
      >
        <van-button slot="button" round plain size="small" type="info">获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button type="info" @click="onLogin" :loading="isLoginLoading">登录</van-button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import request from '@/utils/request'
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      isLoginLoading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onLogin () {
      try {
        /* 方式二：不便于封装，故放弃
        const { data } = await axios.post(
          'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          this.user
        ) */
        /* 方法一
        const { data } = await request({
          method: 'post',
          url: '/app/v1_0/authorizations',
          data: this.user
        }) */
        // this.$validator.validate().then(async valid => { })   //有这种.then的均可以写为async-await形式
        const valid = await this.$validator.validate()
        if (!valid) return // 语法糖
        this.isLoginLoading = true
        const { data: { data } } = await login(this.user)
        this.setUser(data)
        // console.log(data)
        // 跳转至首页
        // this.$router.push('/home')
        this.isLoginLoading = false
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误！！！')
        }
        this.isLoginLoading = false
      }
    },
    customValidateMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          }
        }
      }
      this.$validator.localize('zh-CN', dict)
    }
  },
  created () {
    this.customValidateMessages()
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  // padding: 76px 32px 0;
  padding: 20px 10px;
  .van-button {
    // height: 88px;
    width: 100%;
    // font-size: 28px;
  }
}
</style>
