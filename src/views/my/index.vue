<template>
    <div class="layout-my-contanier">

         <div v-if="user" class="header user-info">
           <div class="base-info">
               <div class="left">
                   <van-image class="login-avatar" round fit='cover'
                    :src="userInfo.photo"
                    />
                    <span class="nickname">{{userInfo.name}}</span>
               </div>
               <div class="right">
                   <van-button round size="mini">编辑资料</van-button>
               </div>
           </div>
           <div class="date-states">
               <div class="date-item">
                   <div class="count">{{userInfo.art_count}}</div>
                   <div class="text">头条</div>
               </div>
                <div class="date-item">
                   <div class="count">{{userInfo.follow_count}}</div>
                   <div class="text">关注</div>
               </div>
                <div class="date-item">
                   <div class="count">{{userInfo.fans_count}}</div>
                   <div class="text">粉丝</div>
               </div>
                <div class="date-item">
                   <div class="count">{{userInfo.like_count}}</div>
                   <div class="text">获赞</div>
               </div>
           </div>

       </div>

       <div v-else class="header not-login">
           <div class="login-btn" @click="$router.push('/login')">
                <img class="login-mobile" src="~@/assets/mobile.png" alt="登入/注册">
                <span class="login-text">登录 / 注册</span>
           </div>
       </div>

        <van-grid class="grid-nav" :column-num="2" clickable>
                <van-grid-item class="grid-nav-item">
                    <i slot="icon" class="toutiao toutiao-shoucang"></i>
                    <span slot="text" class="text">收藏</span>
                </van-grid-item>
                 <van-grid-item class="grid-nav-item">
                     <i slot="icon" class="toutiao toutiao-lishi"></i>
                     <span slot="text" class="text">历史</span>
                </van-grid-item>
        </van-grid>

        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="退出登录"
            class="logout-cell"
            v-if="user"
            @click="onLogout"
            clickable
        />

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted() {
  },
  methods: {
    onLogout() {
      this.$dialog.confirm({
        title: '是否确认退出？'
      })
        .then(() => {
          this.$store.commit('setUser', null)
          console.log('退出登录')
        })
        .catch(() => {
          console.log('已取消退出登录')
        })
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-my-contanier{
    .header{
        height: 361px;
        background: url('~@/assets/banner.png');
        background-size:cover;
    }
    .not-login{
        display: flex;
        justify-content: center;
        align-items: center;
        .login-btn{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .login-mobile{
                height: 132px;
                margin-bottom: 15px;
            }
            .login-text{
                font-size: 28px;
                color: #fff;
            }
        }
    }

    .user-info{
        .base-info{
            height: 231px;
            padding: 76px 32px 23px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            .left{
                 display: flex;
                 justify-content: center;
                 align-items: center;
                .login-avatar{
                    width: 134px;
                    height: 134px;
                    margin-right: 25px;
                    border: 2px solid #fff;
                }
                .nickname{
                    font-size: 30px;
                    color: #fff;
                }
            }
        }
        .date-states{
            display: flex;
            .date-item{
                height: 130px;
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: #fff;
                .count{
                    font-size: 36px;
                }
                .text{
                    font-size: 23px;
                }
            }
        }
    }

    .grid-nav{
           .grid-nav-item{
                height: 141px;
                margin-bottom: 10px;
               i.toutiao{
                   font-size: 55px;
               }
               i.toutiao-shoucang{
                   color: #ff6666;
               }
               i.toutiao-lishi{
                   color: #ff9933;
               }
               span.text{
                   font-size: 36px;
               }
           }
        }

    .van-cell{
        height: 100px;
        font-size: 30px;
        font-weight: bold;
    }
    .logout-cell{
        margin-top: 10px;
        text-align: center;
        line-height: 60px;
        color: #cc6666;
    }
}
</style>
