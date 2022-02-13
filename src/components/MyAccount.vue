<template>
  <div class="login-wrap">
    <!-- <div>
      <h3>{{vistorTipsTitle}}</h3>
      <p>{{vistorTipsText}}</p>
      <span>即刻跳转到登录界面</span>
    </div>-->
    <div class="login-area">
      <div class="login-area-title">
        <p>我的</p>
        <div class="bell-local" @click="userNotification">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bell" />
          </svg>
        </div>
      </div>
      <div class="login-area-display-state">
        <div class="display-img" @click="userClickAvator">
          <img :src="UserAvator" alt />
        </div>
        <div class="login-tip" @click="skipToLgionPage">
          <p>{{userName}}</p>
        </div>
      </div>
    </div>
    <div class="login-menu-list" @click="myOrderMethod">
      <div class="list-row">
        <div class="list-row-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-orderclick" />
          </svg>
        </div>
        <div class="class-list-row-desiprtion-text">我的订单</div>
        <div class="allow">
          <span>查看全部订单</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow" />
          </svg>
        </div>
      </div>
    </div>
    <div class="menu-list-column">
      <div class="menu-column-cell" @click="userUnpaidMethod">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-payout" />
        </svg>
        <p>待支付</p>
      </div>
      <div class="menu-column-cell" @click="waitActive">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shebeijihuo" />
        </svg>
        <p>待激活</p>
      </div>
      <div class="menu-column-cell" @click="remainToBeEvaluatedMethod">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-comment" />
        </svg>
        <p>未评价</p>
      </div>
      <div class="menu-column-cell" @click="mywishOrder">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon" />
        </svg>
        <p>心愿单</p>
      </div>
    </div>
    <div class="login-menu-list" @click="myTicketWalletMethod">
      <div class="list-row">
        <div class="list-row-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-payment" />
          </svg>
        </div>
        <div class="class-list-row-desiprtion-text">我的票夹</div>
        <div class="allow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow" />
          </svg>
        </div>
      </div>
    </div>
    <div class="login-menu-list" @click="myGiftCardMethod">
      <div class="list-row">
        <div class="list-row-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gift1" />
          </svg>
        </div>
        <div class="class-list-row-desiprtion-text">我的礼品卡</div>
        <div class="allow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow" />
          </svg>
        </div>
      </div>
    </div>
    <div class="login-menu-list set-height" @click="myWantsMethod">
      <div class="list-row">
        <div class="list-row-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangkan" />
          </svg>
        </div>
        <div class="class-list-row-desiprtion-text">
          我的想看
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hotpepper" />
          </svg>
        </div>
        <div class="allow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow" />
          </svg>
        </div>
      </div>
    </div>
    <div class="login-menu-list" @click="contactServiceMethod">
      <div class="list-row">
        <div class="list-row-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-server" />
          </svg>
        </div>
        <div class="class-list-row-desiprtion-text">联系客服</div>
        <div class="allow">
          <span>咨询时间 : 工作日 09:00 - 18:00</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow" />
          </svg>
        </div>
      </div>
    </div>
    <div class="login-menu-list" @click="feedBackMethod">
      <div class="list-row">
        <div class="list-row-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-7yijianfankui" />
          </svg>
        </div>
        <div class="class-list-row-desiprtion-text">意见反馈</div>
        <div class="allow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow" />
          </svg>
        </div>
      </div>
    </div>
    <div class="login-menu-list" @click="cusTomerCenter">
      <div class="list-row">
        <div class="list-row-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-clientservice" />
          </svg>
        </div>
        <div class="class-list-row-desiprtion-text">客户中心</div>
        <div class="allow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow" />
          </svg>
        </div>
      </div>
    </div>
    <div class="tips">
      <p>个人作品@tanplay.com</p>
    </div>
    <LightHint :conorlDisplay="showRemainContent" :reminContentUseHTML="reminContentUseHTML"></LightHint>
  </div>
</template>

<script>
import axios from "axios";
import URL from "@/serviceAPI.config";
import LightHint from "./component/LightHint";
import commonMethods from "./commonmethods/default";
export default {
  data() {
    return {
      vistorTipsTitle: "不同的人生,共同的电影人生",
      vistorTipsText:
        " 所有的电影构建于英雄联盟世界背景集合之中，所有故事这里是创作者的自由世界，优秀文字作品即会制作成电影。您笔下的文字不仅栩栩如生。这里是对电影动画的最好诠释。人类的宝贵精神文化以另一种世界观呈现。",
      showRemainContent: true, // 是否隐藏提示
      reminContentUseHTML: "", //  提示内容
      userName: "", // 用户ID
      UserAvator: "", // 用户头像. => 这里最初应该显示的用户头像

      checkUserLogin: undefined, // 用户是否登录
      saveDataAboutToken: undefined, // 接收到的数据
    };
  },
  components: {
    LightHint,
  },
  methods: {
    // 点击网名的方法
    skipToLgionPage() {
      // 跳转到注册页面
      if (this.checkUserLogin == undefined) {
        // 如果数据没有发生改变.就不做任何处理.
        return;
      }
      if (this.checkUserLogin) {
        // 如果用户已经登陆.
        commonMethods.ShowLoginTips(this, "<p>不支持修改用户资料</p>");
        return;
      }
      this.$router.push({ name: "login" });
    },
    // 点击头像的方法
    userClickAvator() {
      commonMethods.ShowLoginTips(this, "<p>暂未实现用户自定义修改逻辑</p>");
    },
    // 用户通知方法
    userNotification() {
      if (this.checkUserLogin == undefined) {
        return;
      }
      if (this.checkUserLogin) {
        commonMethods.ShowLoginTips(this, "<p>点击用户通知</p>");
        return;
      }
      commonMethods.ShowLoginTips(
        this,
        "<p>跳转到登陆界面</p>",
        function () {
          this.$router.push({ name: "Login" });
        }.bind(this)
      );
    },

    // 点击用户订单的方法
    myOrderMethod() {
      this.$router.push({
        name: "MyOrder",
        query: {
          ToswitchBarNum: 0,
        },
      });
      // commonMethods.ShowLoginTips(this, "<p>用户订单</p>");
    },
    // 用户待支付的方法
    userUnpaidMethod() {
      this.$router.push({
        name: "MyOrder",
        query: {
          ToswitchBarNum: 1,
        },
      });
      // commonMethods.ShowLoginTips(this, "<p>用户待支付</p>");
    },
    // 用户已经支付的方法
    waitActive() {
      this.$router.push({
        name: "MyOrder",
        query: {
          ToswitchBarNum: 2,
        },
      });
      // commonMethods.ShowLoginTips(this, "<p>用户已经支付订单</p>");
    },
    // 用户待评价的方法
    remainToBeEvaluatedMethod() {
      this.$router.push({
        name: "MyOrder",
        query: {
          ToswitchBarNum: 3,
        },
      });
      // commonMethods.ShowLoginTips(this, "<p>待评价</p>");
    },
    // 心愿单
    mywishOrder() {
      this.$router.push({
        name: "MyOrder",
        query: {
          ToswitchBarNum: 4,
        },
      });
      // commonMethods.ShowLoginTips(this, "<p>心愿单</p>");
    },
    // 我的票夹夹方法 => 跳转路由
    myTicketWalletMethod() {
      // commonMethods.ShowLoginTips(this, "<p>我的票价家</p>");
      console.log(this.userName);
      this.$router.push({ name: "MyWallet", query: { userid: this.userName } });
    },
    // 我的礼品卡方法
    myGiftCardMethod() {
      this.$router.push({ name: "MyCard" });
      commonMethods.ShowLoginTips(this, "<p>我的礼品卡</p>");
    },
    // 我的想看方法
    myWantsMethod() {
      this.$router.push({ name: "MyWants" });
    },

    // 联系客服
    contactServiceMethod() {
      commonMethods.ShowLoginTips(this, "<p>联系客服</p>");
    },
    feedBackMethod() {
      // 反馈
      commonMethods.ShowLoginTips(this, "<p>反馈</p>");
    },
    cusTomerCenter() {
      // 客户中心
      commonMethods.ShowLoginTips(this, "<p>客户中心</p>");
    },
  },
  watch: {
    // 监控数据的变化
    checkUserLogin: function (newVal, oldVal) {
      if (newVal) {
        // 如果为true.代表用户已经登录
        console.log("用户已经登录");
        console.log(this.saveDataAboutToken);
        this.userName = this.saveDataAboutToken.userNetName;
        this.UserAvator = this.saveDataAboutToken.userAvatar;
      } else {
        // 否则就是没有登录
        console.log("用户没有登录");
        this.UserAvator = "http://cdn.tanplay.com/user-notlogin.jpg";
        this.userName = "立即登录 / 注册";
      }
    },
  },
  created() {
    commonMethods.contratToken(
      function (state, data) {
        this.checkUserLogin = state;
        this.saveDataAboutToken = data;
      }.bind(this)
    );
  },
};
</script>

<style  scoped>

.login-area {
  padding: 0.4rem;
  position: relative;
  background: var(--secondary-bg-color);
}
.login-area .bell-local {
  position: absolute;
  right: 0.6rem;
  top: 0.4rem;
}
.login-area .bell-local .icon {
  color: var(--primary-embellish-color);
  width: 0.8rem;
  height: 0.8rem;
}
.login-area .login-area-title {
  text-align: center;
}
.login-area .login-area-title p {
  font-size: 0.8rem;
}
.login-area-display-state {
  /* height: 8rem; */
  padding: 3rem 0.4rem 0.4rem 0.4rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.6rem;
}
.login-area-display-state::after,
.login-area-display-state::before {
  content: "";
  display: block;
  height: 0px;
  visibility: hidden;
  clear: both;
}

.login-area-display-state .display-img {
  width: 3rem;
}
.login-area-display-state .display-img img {
  width: 100%;
  border-radius: 50%;
}
.login-wrap{
padding-bottom: 50px;
}
.login-wrap .login-menu-list {
  padding: 0.8rem 0.4rem 0.8rem 1.6rem;
  background: var(--secondary-bg-color);
  /* margin-bottom: 1px; */
  border-radius: 5px;
  /* border-bottom: 1px solid var(--secondady-embellish-color); */
}
.login-wrap .login-menu-list .list-row .list-row-icon .icon {
  width: 1rem;
  height: 1rem;
  color: var(--whitegray-color);
}
.login-wrap .login-menu-list .list-row .allow .icon {
  font-weight: bolder;
}
.login-wrap .login-menu-list .list-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  /* gap: 0.6rem; */
  font-size: 16px;
}
.login-wrap .login-menu-list .list-row .list-row-icon {
  flex-basis: 5%;
  margin-right: 10px;
}
.login-wrap .login-menu-list .list-row .class-list-row-desiprtion-text {
  flex-basis: 85%;
}
.login-wrap .login-menu-list .list-row .allow {
  flex-basis: 10%;
  white-space: nowrap;
  /* white-spaced的权重高于flex布局的分配比 */
  text-align: right;
}
.login-wrap .login-menu-list .list-row span {
  font-size: 12px;
  padding: 0 0.2rem;
}
.login-wrap .set-height {
  /* padding: 0.6rem 0 0.6rem 0 !important; */
}
.login-wrap .menu-list-column {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  background: var(--secondary-bg-color);
  padding: 0.6rem 0.4rem;
  border-bottom: 1px solid var(--line-color);
}
.login-wrap .menu-list-column .menu-column-cell {
  flex-basis: 5rem;
  height: 5rem;
  flex-grow: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  background: var(--primary-bg-color);
  border-radius: 10px;
  border: 1px solid var(--line-color);
}
.login-wrap .menu-list-column .menu-column-cell svg {
  font-size: 1.4rem;
}
.login-wrap .tips {
  margin: 0.4rem;
  text-align: center;
}
</style>