<template>
    <div class="login-container">
        <!-- 登陆界面头部区域 -->
        <van-nav-bar class="login_head" title="登录" >
            <van-icon slot="left" name="cross" @click="$router.back()"/>
        </van-nav-bar >
        <!-- 登陆界面表单验证区域 -->
        <van-form @submit="onSubmit" ref="loginFormRef">
            <van-field v-model="user.mobile" name="mobile"  placeholder="请输入手机号"
             :rules="userFormRules.mobile" type="number" maxlength="11">
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field  v-model="user.code" name="code"  placeholder="请输入验证码"
             :rules="userFormRules.code" maxlength="6" >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <van-count-down v-if="isCountDownShow"  :time="1000 * 60"  format="ss s" @finish="isCountDownShow = false"/>
                    <van-button v-else class="send-sms-btn" round size="small" type="default" @click="onSendSms" native-type="button">获取验证码</van-button>
                </template>
            </van-field>
   <div class="login-btn-wrap">
    <van-button class="login-btn" block type="primary">登录</van-button>
   </div>
        </van-form>
        <!-- 登陆界面底部区域 -->
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [{ required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '输入的手机号格式错误' }],
        code: [{ required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '输入的验证码格式错误' }]
      },
      isCountDownShow: false
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  created() {

  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登入成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或验证码错误！')
          this.$toast.fail('手机号或验证码错误！')
        } else {
          // console.log('登录失败',err)
          this.$toast.fail('登录失败')
        }
      }
    },
    async onSendSms() {
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return this.$toast('手机号格式错误')
      }

      this.isCountDownShow = true

      try {
        await sendSms(this.user.mobile)
      } catch (err) {
        if (err.response.status === 429) {
          return this.$toast('发送过于频繁，请稍后再试亲')
        } else {
          return this.$toast('发送失败')
        }
      }

      this.isCountDownShow = false
      console.log('发送成功')
    }
  }
}
</script>

<style lang="less" scoped>
.toutiao{
    font-size: 37px;
}

.send-sms-btn{
    background-color: #ededed;
    .van-button__text{
        font-size: 22px;
        color: #666666;
    }
}

.login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
        background-color: #6db4fb;
        border: none;
    }
}
</style>
