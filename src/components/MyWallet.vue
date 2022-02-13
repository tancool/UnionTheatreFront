<template>
  <div class="wallet-wrap">
    <TopBar :title="title" v-on:clickarrow="skiptoPage"></TopBar>
    <div
      class="wallet-for-not-pay-wrap"
      @touchstart="getTouchStart($event)"
      @touchend="getTouchEnd($event)"
      @touchmove="checkScreenHeight($event)"
    >
      <div
        class="wallet-bar"
        v-for="(item, index) in reciveUserOutstandingOrderData"
        :key="index"
      >
        <div class="choose-btn">
          <span>
            <input
              type="checkbox"
              @click="userChooseProductSingle($event, item.orderCode)"
              ref="chooseproductbythebtn"
            />
          </span>
        </div>
        <div
          class="display-images"
          @click="goToMovieDatail(item.moviesInfo.movieCode)"
        >
          <img :src="item.moviesInfo.imgLinkOfMovie" alt />
          <div class="description-text">
            <p>
              <span>商品名称：</span>
              {{ item.moviesInfo.chinaNameOfMovie }}
            </p>
            <p>
              <span>商品单价：</span>
              {{ item.moviesInfo.moviePriceoNow }}
            </p>
          </div>
        </div>

        <div class="operate-btn">
          <span @click="clickAddBtn(item.orderCode)" class="add">+</span>
          <input type="text" v-model="item.buyCount" />
          <span @click="clickSubtract(item.orderCode)" class="subtraction"
            >-</span
          >
        </div>
      </div>
      <dataFinishedTips :finish="dataFindished"></dataFinishedTips>
      <dataLoadingTips :finish="dataFindished"></dataLoadingTips>
      <div class="recommand-limit">
        <p class="recommand-text">类似内容推荐</p>
      </div>
      <div class="recommand-area">
        <p>抱歉，暂时不能提供有效的智能算法。为您提供个性化的服务</p>
      </div>
      <div class="settelAccountsBar">
        <div class="choose-btn chooseAll">
          <label>
            <input type="checkbox" @click="userChooseProductAll($event)" />
            全选
          </label>
        </div>
        <div class="displayTotalPrice">
          总价:
          <span>{{ allTotal }}</span>
        </div>
        <div class="submitbtn">
          <button @click="carryOfDataTransmission">提交</button>
        </div>
      </div>
    </div>
    <LightHint
      :conorlDisplay="showRemainContent"
      :reminContentUseHTML="reminContentUseHTML"
    ></LightHint>
    <dataRefreshHint :finish="pullupRefresh"></dataRefreshHint>
  </div>
</template>

<script>
import TopBar from "@/components/component/TopBar";
import axios from "axios";
import URL from "@/serviceAPI.config";
import commonMethods from "./commonmethods/default"; // 此方法检查用户是否已经登录.
import LightHint from "./component/LightHint";
import dataFinishedTips from "@/components/component/dataFinishedTips";
import dataLoadingTips from "@/components/component/dataLoadingTips";
import dataRefreshHint from "@/components/component/dataRefreshHint";
export default {
  data() {
    return {
      title: "票夹夹", //标题头的显示数据
      showRemainContent: true, // 是否隐藏提示
      reminContentUseHTML: "", //  提示内容

      checkUserLogin: undefined, // 检查用户是否登录
      saveDataAboutToken: undefined, // 用于保存用户的token
      userid: 0, // 保存用户订单
      reciveUserOutstandingOrderData: [], // 用户未支付订单的数据
      saveUserChooseOrder: [], // 用数组去存储用户选中的数据
      settleAccountInfo: [], // 发送的服务端的数据
      pages: 1, // 请求分页效果的参数
      dataFindished: false, // 请求是否完成的参数

      touchOrgin: 0, //用户触摸的位置.
      pullupRefresh: false, //下拉刷新的加载条'
      timerout: null,
    };
  },
  watch: {
    checkUserLogin: function (newVal, oldVal) {
      if (newVal === true) {
        console.log("用户已经登录");
      } else {
        commonMethods.ShowLoginTips(this, "<p>请登录</p>");
      }
    },
  },
  computed: {
    // 显示用户总价.
    allTotal: function () {
      let returnVal = 0;
      this.saveUserChooseOrder.forEach((item, index) => {
        // 拿到订单信息.
        // 循环接受到的订单.进行对比.
        this.reciveUserOutstandingOrderData.forEach((item_, index) => {
          if (item_.orderCode == item) {
            if (
              !(
                Number(item_.moviesInfo.moviePriceoNow) &&
                Number(item_.buyCount)
              )
            ) {
              console.log("不是数值型数据.请检查");
            }
            let sum = item_.moviesInfo.moviePriceoNow * item_.buyCount;
            returnVal += sum;
          }
        });
      });
      return returnVal;
    },
  },
  /*
  关于用户选择的逻辑.
  用户选中 => 数据发生变化. 绑定事件. => 发送订单号给事件.

  点击选中全部 =>
    - 使用数据去绑定.需要根据不同的订单去维护不同的数据 => 生成一个数组.
    - 使用DOM去操作.
  */
  methods: {
    // 获得用户购物车的数据
    getInfoForUserShoppingCart() {
      if (!this.checkUserLogin) {
        return false;
      }
      axios
        .post(URL.userShoppingCart, {
          userid: this.userid,
          page: this.pages,
        })
        .then((data) => {
          let temporarySaveData = data.data;
          if (temporarySaveData.code == 200) {
            // 请求数据成功
            commonMethods.ShowLoginTips(this, "<p>请求成功</p>");
            this.reciveUserOutstandingOrderData = temporarySaveData.data;
            // console.log(this.reciveUserOutstandingOrderData);
            if (temporarySaveData.finished) {
              this.dataFindished = true;
            }
          } else if (temporarySaveData.code == 400) {
            // 没有输出合法的请求参数
          } else if (temporarySaveData.code == 300) {
            // 查询出现意外的错误
          } else if (temporarySaveData.code == 301) {
            // 没有查用到该用户的存在
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    // 用户选中单个商品触发的事件
    userChooseProductSingle(event, orderId) {
      //如果在维持的数组中找到了该值.那么就应该删除掉
      console.log(orderId);
      let userClickResult = event.currentTarget.checked; // 用户是点击还是取消
      // 如果是用户点击
      if (userClickResult) {
        if (this.saveUserChooseOrder.includes(orderId)) {
          // 如果已经包含了此订单.
          console.log("用户点击异常.可能是频繁点击");
        } else {
          this.saveUserChooseOrder.push(orderId);
        }
      } else {
        // 如果是取消选择
        let whereherTheOrderIdisInTheSaveArr = this.saveUserChooseOrder.findIndex(
          // 找出其下标
          function (item) {
            return item == orderId;
          }
        );
        if (whereherTheOrderIdisInTheSaveArr != -1) {
          this.saveUserChooseOrder.splice(whereherTheOrderIdisInTheSaveArr, 1);
        } else {
          console.log("删除异常,并未在数组中寻找到要删除的元素");
        }
      }
    },
    userChooseProductAll(ev) {
      // 点击多个商品的逻辑 : 循环让所有表单选中. 数据不能从单个选中上面触发.要自己循环添加上.
      if (ev.currentTarget.checked) {
        // 如果全选按钮没有被选中的话
        // 控制的样式
        this.$refs.chooseproductbythebtn.forEach((item, index) => {
          item.checked = true;
        });
        // 数据的选择.填充全部的数据.
        // 开始填充
        this.saveUserChooseOrder = this.reciveUserOutstandingOrderData.map(
          (item, index) => {
            return item.orderCode;
          }
        );
      } else {
        // 取消选中
        // 控制的样式
        this.$refs.chooseproductbythebtn.forEach((item, index) => {
          item.checked = false;
        });
        // 清空当前选择的所有数据.
        this.saveUserChooseOrder = [];
      }
    },
    clickAddBtn(userId) {
      this.reciveUserOutstandingOrderData.forEach((item) => {
        if (item.orderCode == userId) {
          item.buyCount = item.buyCount + 1;
        }
      });
    },
    clickSubtract(userId) {
      this.reciveUserOutstandingOrderData.forEach((item) => {
        if (item.orderCode == userId) {
          item.buyCount = item.buyCount - 1;
        }
      });
    },
    getSettleAccountInfo() {
      /*
       需要发送的数据包括 : - 用户下单的单号 / - 以及下单的金额
       */
      console.log(this.settleAccountInfo);
      console.log(this.saveUserChooseOrder);

      this.settleAccountInfo = this.saveUserChooseOrder.map((item, index) => {
        let temporaryVar = {};
        this.reciveUserOutstandingOrderData.forEach((item_, index) => {
          if (item_.orderCode == item) {
            temporaryVar = {
              productid: item,
              numberofpurchase: item_.buyCount,
            };
          }
        });
        return temporaryVar;
      });
      console.log(this.settleAccountInfo);
    },
    carryOfDataTransmission() {
      this.getSettleAccountInfo();
      if (this.settleAccountInfo.length == 0) {
        console.log("未发送任何数据");
        return false;
      }

      axios
        .post(URL.settleAccounts, {
          userid: this.userid,
          ordercontent: this.settleAccountInfo,
        })
        .then((data) => {
          let temporaryVar = data.data;
          if (temporaryVar.code == 200) {
            commonMethods.ShowLoginTips(
              this,
              "<p>您一共支付" +
                temporaryVar.data +
                "元成功!</p><p>正在跳转至我的待激活界面</p>",
              function () {
                this.$router.push({
                  name: "MyOrder",
                  query: { ToswitchBarNum: 2 },
                });
              }.bind(this)
            );
          } else if (temporaryVar.code == 300) {
            // 数据库查询发生意外错误.请售后重试
            commonMethods.ShowLoginTips(
              this,
              "<p>系统查询发生意外错误.请售后重试</p>"
            );
          } else if (temporaryVar.code == 301) {
            // 查询到异常订单
            commonMethods.ShowLoginTips(
              this,
              "<p>查询到异常订单.请刷新页面</p>"
            );
          } else if (temporaryVar.code == 302) {
            // 远程数据库更新失败

            commonMethods.ShowLoginTips(
              this,
              "<p>远程数据更新失败.请稍后重试</p>"
            );
          }

          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 得到触摸的原始位置.触摸事件
    getTouchStart(event) {
      this.touchOrgin = event.changedTouches[0].clientY;
    },

    // 检测屏幕.用于下拉刷新
    checkScreenHeight(event) {
      /*
      逻辑判断 : 
        - 首先获得屏幕的高度.
      */
      // 使用节流还是防抖

      /*
     使用节流 : 多少秒才可以触发一次 => 使用节流.
     防抖 : 多少次会执行一次时间 => 不滑动之后才会进行加载.

     */
      let touchLocalNow = event.changedTouches[0].clientY;
      commonMethods.detectScreenHeight(
        this.touchOrgin,
        touchLocalNow,
        function () {
          if (this.timerout !== null) {
            clearTimeout(this.timerout);
          }
          this.timerout = setTimeout(() => {
            this.pages += 1;
            this.getInfoForUserShoppingCart();
          }, 300);
        }.bind(this),
        function () {
          this.pullupRefresh = true;
        }.bind(this)
      );
    },
    // 屏幕结束事件
    getTouchEnd(event) {
      let touchLocalEnd = event.changedTouches[0].clientY;
      if (touchLocalEnd - this.touchOrgin > 40) {
        this.pages = 1;
        this.dataFindished = false;
        this.getInfoForUserShoppingCart();
      }
      this.pullupRefresh = false;
    },
    goToMovieDatail(movieId) {
      console.log(movieId);
      this.$router.push({
        name: "MovieDetailInfo",
        query: { moviecode: movieId },
      });
    },
    skiptoPage() {
      this.$router.go(-1);
    },
  },
  components: {
    TopBar,
    LightHint,
    dataFinishedTips,
    dataLoadingTips,
    dataRefreshHint,
  },
  created() {
    this.userid = this.$route.query.userid || localStorage.getItem("userID"); // 通过URL获得ID
    commonMethods.contratToken(
      function (state, data) {
        this.checkUserLogin = state;
        this.saveDataAboutToken = data;
        this.getInfoForUserShoppingCart(); // 验证完数据之后再请求ajax.
      }.bind(this)
    );
  },
};
</script>

<style scoped>
/* 提交价钱CSS样式开始 */
.settelAccountsBar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: fixed;
  bottom: 50px;
  left: 0px;
  right: 0px;
  background: var(--secondary-bg-color);
  height: 2.4rem;
  align-items: center;
  justify-content: center;
}
.settelAccountsBar .chooseAll {
  flex-basis: 55%;
  padding-left: 1.4rem;
}
.settelAccountsBar .displayTotalPrice {
  flex-basis: 15%;
}
.settelAccountsBar .displayTotalPrice {
  flex-basis: 15%;
  text-align: right;
  white-space: nowrap;
}
.settelAccountsBar .submitbtn {
  flex-basis: 30%;
}
.settelAccountsBar .submitbtn {
  text-align: center;
}
.settelAccountsBar .submitbtn button {
  width: 80%;
  height: 2.2rem;
  background: var(--primary-embellish-color);
  border: none;
  border-radius: 10px;
  color: white;
}
/* 提交价钱CSS样式结束 */

.wallet-for-not-pay-wrap {
  width: 100%;
  /* margin-top: 1rem; */
  padding: 48px 0.6rem 0.6rem 1rem;
}
.wallet-for-not-pay-wrap .wallet-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.4rem;
  position: relative;
  align-items: center;
  justify-content: start;
  border-bottom: 1px solid var(--line-color);
}
.wallet-for-not-pay-wrap .wallet-bar .display-images {
  flex-basis: 40%;
  flex-grow: 1;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}
.wallet-for-not-pay-wrap .wallet-bar .display-images img {
  width: 40%;
}
.wallet-for-not-pay-wrap .wallet-bar .description-text {
  padding-top: 0.4rem;
}
.wallet-for-not-pay-wrap .wallet-bar .description-text p {
  padding: 0.2rem;
}
.wallet-for-not-pay-wrap .choose-btn {
  padding-right: 0.4rem;
}

/* 自定义按钮样式开始 */
.choose-btn input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /*自己样式*/
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid var(--line-color);
  outline: none;
  /*去除外部点击的轮廓*/
  background: transparent;
  /*设置背景透明*/
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}
.choose-btn input:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: var(--primary-embellish-color);
  /*增加动画*/
  transition: all ease-in-out 300ms;
  -webkit-transition: all ease-in-out 300ms;
  -moz-transition: all ease-in-out 300ms;
  opacity: 0;
}
.choose-btn input:checked::after {
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  opacity: 0.9;
}
/* 自定义按钮样式结束 */
.wallet-for-not-pay-wrap .operate-btn {
  position: absolute;
  right: 0.6rem;
  bottom: 0rem;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.2rem;
  border: 1px solid var(--line-color);
  border-radius: 4px;
}
.wallet-for-not-pay-wrap .operate-btn span {
  display: inline-block;
  color: var(--white-color);
  overflow: hidden;
  width: 1rem;
  height: 1rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1rem;
}

.wallet-for-not-pay-wrap .operate-btn input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  height: 1rem;
  width: 1.2rem;
  margin: 0 0.1rem;
  line-height: 1rem;
  outline: none;
  text-align: center;
  background: var(--secondary-bg-color);
  color: var(--white-color);
  transition: all ease-in-out 300ms;
  -webkit-transition: all ease-in-out 300ms;
  -moz-transition: all ease-in-out 300ms;
}
.wallet-for-not-pay-wrap .operate-btn input:focus {
  width: 1.6rem;
  color: var(--white-color);
  background: var(--primary-embellish-color);
}
.recommand-limit {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 2rem 0.4rem 0.4rem 0.4rem;
}
.recommand-text {
  position: relative;
  height: 20px;
  flex-basis: auto;
  flex-grow: 0;
  padding: 0 0.4rem;
  text-align: center;
}
.recommand-limit::before,
.recommand-limit::after {
  display: block;
  content: "";
  height: 1px;
  background: var(--primary-embellish-color);
  flex-basis: 33%;
  flex-grow: 1;
}
.recommand-area {
  text-align: center;
  padding: 0.4rem;
  margin-bottom: 4rem;
}
</style>