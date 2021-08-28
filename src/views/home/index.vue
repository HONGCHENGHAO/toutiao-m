<template>
    <div class="layout-home-contanier">
        <!-- 头部搜索区域 -->
        <van-nav-bar class="login_head">
           <van-button class="home-search" slot="title" size="small" type="info" icon="search" round>搜索</van-button>
        </van-nav-bar >
        <!-- 标签页 -->
        <van-tabs class="channel-tabs" v-model="active" animated swipeable>
            <van-tab v-for="item in channelInfo" :title="item.name" :key="item.id">
                <article-list :channel="item"></article-list>
            </van-tab>
             <div slot="nav-right" class="placeholder"/>
            <div slot="nav-right" class="hamburger-btn">
                <i class="toutiao toutiao-gengduo"></i>
            </div>
        </van-tabs>
    </div>
</template>

<script>
import { channelInfo } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'
export default {
  components: { ArticleList },
  data() {
    return {
      active: 0,
      channelInfo: []
    }
  },
  created() {
    this.getChannelInfo()
  },
  mounted() {

  },
  methods: {
    async getChannelInfo() {
      try {
        const { data } = await channelInfo()
        this.channelInfo = data.data.channels
        console.log(this.channelInfo)
      } catch (err) {
        this.$toast('获取用户列表信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-home-contanier{
    padding-bottom: 100px;
    .login_head{
        .home-search{
            width: 560px;
            height: 64px;
            font-size: 32px;
            background-color: #6699ff;
            border: none;
        }
    }
    /deep/.channel-tabs{
        .van-tab--active{
            color: #333333;
        }
        .van-tabs__wrap{
            height: 82px;
        }
        .van-tab{
            min-width: 200px;
            border-right: 2px solid #edeff3;
            font-size: 30px;
            color: #777777;
        }
        .van-tabs__nav{
            padding-bottom: 0;
        }
        .van-tabs__line{
            width: 31px !important;
            height: 6px;
            bottom: 8px;
            background-color: #3296fa;
        }

        .hamburger-btn{
            position: fixed;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 66px;
            height: 82px;
            background-color: #fff;
            opacity: 0.89;
            i.toutiao{
                font-size: 32px;
            }
            &::before{
                content: "";
                position: absolute;
                left: 0;
                width: 2px;
                height: 70px;
                background: url('~@/assets/gradient-gray-line.png');
                background-size: contain;
            }
        }

        .placeholder{
            width: 66px;
            height: 82px;
            flex-shrink: 0;
        }

    }
}
</style>
