<template>
    <div class="layout-container">
        <router-view/>
        <div>213321</div>
        <van-tabbar  route>
            <van-tabbar-item replace to="/">
                <i slot="icon" class="toutiao toutiao-shouye"></i>
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/qaa">
                <i slot="icon" class="toutiao toutiao-wenda"></i>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/video">
                <i slot="icon" class="toutiao toutiao-shipin"></i>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/my">
                <i slot="icon" class="toutiao toutiao-wode"></i>
                <span class="text">{{$store.state.user ? '我的' : '未登录' }}</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.van-tabbar{
    .van-tabbar-item{
        .toutiao{
            font-size: 40px;
        }
        .text{
            font-size: 20px;
        }
    }
}
</style>
