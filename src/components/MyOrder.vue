<template>
  <div>
    <TopBar :title="title" v-on:clickarrow="skiptoPage"></TopBar>
    <div class="my-order-choose-bar">
      <ul @click="switchBar">
        <li v-bind:class="[WhichBarToSelect==0?'click-effect':'']">
          <a href="javascript:void(0);" data-num="0">全部</a>
        </li>

        <li v-bind:class="[WhichBarToSelect==1?'click-effect':'']">
          <a href="javascript:void(0);" data-num="1">待支付</a>
        </li>
        <li v-bind:class="[WhichBarToSelect==2?'click-effect':'']">
          <a href="javascript:void(0);" data-num="2">待激活</a>
        </li>
        <li v-bind:class="[WhichBarToSelect==3?'click-effect':'']">
          <a href="javascript:void(0);" data-num="3">待评价</a>
        </li>
        <li v-bind:class="[WhichBarToSelect==4?'click-effect':'']">
          <a href="javascript:void(0);" data-num="4">心愿单</a>
        </li>
      </ul>
    </div>

    <div
      class="display-order-area"
      @touchmove="checkScreen($event)"
      @touchstart="getTouchStart($event)"
      @touchend="getTouchEnd($event)"
    >
      <div class="not-order not-order-hidden">
        <img src="http://ddbuy.7-orange.cn/img/noData.1c06e1e1.jpeg" alt />
        <p>暂时没有相关订单</p>
      </div>
      <div class="display-order" v-for="(item,index) in displayInterFaceData" :key="index">
        <div class="user-order-mess">
          <div class="display-order-img">
            <img :src="item.imgLinkOfMovie" alt />
          </div>
          <div class="display-order-content">
            <div class="display-order-content-left">
              <div class="product-title">
                <h3>{{item.chinaNameOfMovie}}</h3>
              </div>
              <div class="product-more-text">
                <p>
                  类型:
                  <span>{{item.movieTagOfLoL}}</span>
                </p>
                <p>
                  导演:
                  <span>{{item.movieDirector}}</span>
                </p>
              </div>
            </div>
            <div class="display-order-content-right">
              <div class="display-price">
                <p>{{item.orderStateText}}</p>
                <p>
                  <span>¥:</span>
                  {{item.actualPriceOfOneWhenPaying}}
                </p>
                <p>
                  <span>X</span>
                  {{item.buyCount}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="comput-info">
          <div class="left-side">
            <span>VR设备激活码</span>
            <span>{{item.orderValueOnly}}</span>
          </div>
          <div class="right-side">
            <p>
              总价:
              <span>{{item.actualPayPrice}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <LightHint :conorlDisplay="showRemainContent" :reminContentUseHTML="reminContentUseHTML"></LightHint>
    <dataLoadingTips :finish="dataFindished"></dataLoadingTips>
    <dataFinishedTips :finish="dataFindished"></dataFinishedTips>
    <dataRefreshHint :finish="pullupRefresh"></dataRefreshHint>
  </div>
</template>

<script>
// 这里少了一个下拉刷新.先不做.
import TopBar from "@/components/component/TopBar";
import axios from "axios";
import URL from "@/serviceAPI.config";
import LightHint from "./component/LightHint";
import dataFinishedTips from "@/components/component/dataFinishedTips";
import dataLoadingTips from "@/components/component/dataLoadingTips";
import commonMethods from "./commonmethods/default";
import dataRefreshHint from "@/components/component/dataRefreshHint";
export default {
  data() {
    return {
      title: "我的订单",
      checkUserLogin: undefined, // 用户是否登录.使用token验证
      WhichBarToSelect: 0,
      saveDataAboutToken: undefined, // token接收到的数据.暂未使用该变量
      reciveUserId: 0, // 用户ID.默认是0.在created阶段从本地存储中获取.
      reminContentUseHTML: "",
      showRemainContent: true,
      //------------------------------
      saveDataForAjax: [], //接收到的用户订单信息.一次性全返回完毕.
      saveMovieCodeArr: [], // 保存电影代码.用于接收电影信息.
      saveMovieMess: [], // 保存ajax接收到的电影信息
      //--------------保存ajax的变量----------------
      allDataAlreadyRenturn: false, // 所有数据是否已经拿到.
      displayInterFaceData: [], // 全部订单的所有数据
      // displayInterFaceDataForUnpaid: [], // 未支付订单数据. 状态码为1
      // displayInterFaceDataForWaitActivate: [], // 等待激活数据 状态码为2
      // displayInterFaceDataForWaitevaluation: [], // 等待评价 状态码为3
      // displayInterFaceDataForCollect: [], // 心愿单 状态码为4
      // disPlayData: [], //显示在用户界面的数据
      pages: 1, //请求第几页.
      dataFindished: false, // 控制数据加载完成与否的提示条

      touchOrgin: 0, //用户触摸的位置.
      pullupRefresh: false, //下拉刷新的加载条
      timerout: null,
    };
  },
  watch: {
    // 验证完token之后会返回数据
    checkUserLogin: function (newVal, oldVal) {
      if (newVal === true) {
        console.log("用户已经登录");
        // console.log(this.saveDataAboutToken);
      } else {
        this.$router.push({ name: "login", params: { from: "shoppingcar" } });
      }
    },
    // 如果用户切换选项卡. 数据发生改变.并执行ajax请求
    WhichBarToSelect: function (newVal, oldVal) {
      this.pages = 1; // 页数清为0
      this.allDataAlreadyRenturn = false; // 所有数据清空
      this.getDateForUser();
    },
  },
  methods: {
    // 这个是路由跳转
    skiptoPage() {
      this.$router.push({ name: "MyAccount" });
    },
    switchBar(event) {
      if (!this.checkUserLogin) {
        // 如果用户没有登录.不做任何操作
        return false;
      }
      //只有在用户点击的是a标签才会进行操作
      if (event.target.tagName.toLowerCase() == "a") {
        let tagNum =
          event.target.dataset.num || event.target.getAttribute("data-num");
        // 如果相等.不做任何操作.返回.
        if (this.WhichBarToSelect == tagNum) {
          return;
        }
        this.WhichBarToSelect = tagNum; // 修改点击的值.
        this.pages = 1;
        this.dataFindished = false;
      }
    },
    // 发送ajax得到数据.在得到验证数据之后再请求.请求得到用户的数据
    getDateForUser() {
      // 如果用户没有登录,不做任何操作.监控数据已经跳转路由了
      if (!this.checkUserLogin) {
      } else {
        axios
          .post(URL.getAllOrder, {
            userKey: this.reciveUserId,
            findKey: this.WhichBarToSelect,
            pages: this.pages,
          })
          .then((data) => {
            // 拿到数据之后还需要再次请求.得到电影的简略信息.
            let temporarySaveData = data.data;
            // 如果请求成功
            if (temporarySaveData.code == 200) {
              this.filterMoiveMessBaseOnReciveData(temporarySaveData.data); // 经过这一步处理之后.数据已经被保存在了this.saveMovieCodeArr下.是同步进行的.
              // 保存完之后再次发送ajax.
              //console.log(abc); => 这个不能输出回调函数文件中的abc
              if (temporarySaveData.finished) {
                this.dataFindished = true;
              }
              this.getMovieMessDetail(); // 得到电影详细的信息.
            } else {
              //如果请求失败.不在继续往下请求.并尝试报错.
              commonMethods.ShowLoginTips(
                this,
                "<p>订单查询加结果查询失败,请稍后重试</p>"
              );
            }
          })
          .catch((err) => {
            console.log(err);
            commonMethods.ShowLoginTips(
              this,
              "<p>请求订单信息时发生错误,请稍后重试</p>"
            );
          });
      }
    },
    filterMoiveMessBaseOnReciveData(recivedataforajax) {
      this.saveDataForAjax = recivedataforajax;
      this.saveMovieCodeArr = this.saveDataForAjax.map((item, index) => {
        return item.productCode;
      });
    },
    getMovieMessDetail() {
      // 请求电影的详细信息.
      axios
        .post(URL.getSimpleMoviesMess, {
          keys: this.saveMovieCodeArr,
        })
        .then((data) => {
          let temporaryVar = data.data;
          // console.log(temporaryVar);
          if (temporaryVar.code == 200) {
            // 代表请求数据成功
            this.saveMovieMess = temporaryVar.data;
            this.allDataAlreadyRenturn = true; // 所有的结果都已经查询到.
            console.log("所有数据都已经请求到");
            // console.log(this.saveDataForAjax);
            // console.log(this.saveMovieMess);
            this.displayInterFaceDataTidy();
            this.pages = this.pages + 1; // 每次请求之后.页数加一
          } else if (temporaryVar.code == 400) {
            this.allDataAlreadyRenturn = true; // 所有的结果都已经查询到.
            console.log("电影详情结果查询失败,请稍后重试");
            commonMethods.ShowLoginTips(
              this,
              "<p>电影详情结果查询失败,请稍后重试</p>"
            );
          }
        })
        .catch((err) => {
          console.log("请求电影详情失败,请稍后重试");
        });
    },
    // 整理用户数据
    displayInterFaceDataTidy() {
      if (this.saveDataForAjax.length != this.saveMovieMess.length) {
        console.log("警告:数据长度不一");
      }
      this.displayInterFaceData = this.saveDataForAjax.map((item, index) => {
        let temporaryVar = {};
        temporaryVar.orderValueOnly = item.orderValueOnly; // 机器码
        temporaryVar.actualPayPrice = item.actualPayPrice; // 实际支付价格
        temporaryVar.actualPriceOfOneWhenPaying =
          item.actualPriceOfOneWhenPaying; // 实际几个
        temporaryVar.buyCount = item.buyCount; // 购买个数
        temporaryVar.orderState = item.orderState;
        switch (item.orderState) {
          case 1:
            temporaryVar.orderStateText = "未支付";
            break;
          case 2:
            temporaryVar.orderStateText = "待激活";
            break;
          case 3:
            temporaryVar.orderStateText = "待评价";
            break;
          case 4:
            temporaryVar.orderStateText = "心愿单";
            break;
          default:
            console.log("意外的值");
        }

        let conformFilterCodation = this.saveMovieMess.find((item_, index) => {
          return item_.movieCode == item.productCode;
        });
        temporaryVar.imgLinkOfMovie = conformFilterCodation.imgLinkOfMovie; // 图片链接
        temporaryVar.movieDirector = conformFilterCodation.movieDirector; // 导演
        temporaryVar.chinaNameOfMovie = conformFilterCodation.chinaNameOfMovie; // 标题
        temporaryVar.movieTagOfLoL = conformFilterCodation.movieTagOfLoL; // 分类
        return temporaryVar;
      });
      console.log(this.displayInterFaceData);
      // // 数据整理为一个大类之后.再次分类.
      // this.disPlayData = this.displayInterFaceData;
      // this.displayInterFaceData.forEach((item, index) => {
      //   if (item.orderState == 1) {
      //     this.displayInterFaceDataForUnpaid.push(item); // 未支付订单数据 01
      //   } else if (item.orderState == 2) {
      //     this.displayInterFaceDataForWaitActivate.push(item); // 等待激活 02
      //   } else if (item.orderState == 3) {
      //     this.displayInterFaceDataForWaitevaluation.push(item); // 等待评分 03
      //   } else if (item.orderState == 4) {
      //     this.displayInterFaceDataForCollect.push(item); // 心愿单 04
      //   }
      // }); // 各种数据已经分类完毕
    },
    insertPageInitOperate() {
      this.WhichBarToSelect = this.$route.query.ToswitchBarNum || 0;
      this.reciveUserId = localStorage.getItem("userID"); // 用户ID选择了从本地进行获取.
      // console.log(this.reciveUserId);
      commonMethods.contratToken(
        function (state, data) {
          this.checkUserLogin = state;
          this.saveDataAboutToken = data;
          this.getDateForUser(); // 验证完数据之后再请求ajax.
        }.bind(this)
      );
    },
    // 得到触摸的原始位置.触摸事件
    getTouchStart(event) {
      this.touchOrgin = event.changedTouches[0].clientY;
    },
    // 屏幕移动事件
    checkScreen(event) {
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
            this.getDateForUser();
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
        this.getDateForUser();
      }
      this.pullupRefresh = false;
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
    this.insertPageInitOperate();
  },
};
</script>

<style scoped>
.display-order-area {
  padding: 0.4rem;
}
.display-order-area .display-order {
  padding: 0.4rem 0;
  background: var(--secondary-bg-color);
  border-bottom: 1px solid var(--line-color);
}
.display-order-area .display-order .user-order-mess {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.4rem;
}
.display-order-area .display-order .user-order-mess .display-order-img {
  flex-basis: 40%;
  flex-grow: 1;
}
.display-order-area .display-order .user-order-mess .display-order-img img {
  object-fit: cover;
  object-position: center;
}
.display-order-area .display-order .user-order-mess .display-order-content {
  flex-basis: 60%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.display-order-area
  .display-order
  .user-order-mess
  .display-order-content
  .display-order-content-left {
  flex-basis: 50%;
  flex-grow: 1;
}
.display-order-area
  .display-order
  .user-order-mess
  .display-order-content
  .display-order-content-left {
  flex-basis: 50%;
  flex-grow: 1;
}
.display-order-area
  .display-order
  .user-order-mess
  .display-order-content
  .display-order-content-left
  .product-more-text
  p {
  white-space: nowrap;
}
.display-order-area
  .display-order
  .user-order-mess
  .display-order-content
  .display-order-content-right {
  flex-basis: 20%;
  flex-grow: 1;
}

.display-order-area
  .display-order
  .user-order-mess
  .display-order-content
  .display-order-content-right
  .display-price
  p {
  text-align: right;
}
.display-order .comput-info::after,
.display-order .comput-info::before {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}
.display-order .comput-info .left-side {
  float: left;
}
.display-order .comput-info .right-side {
  float: right;
}
/* 以上是新添加的代码 */

.my-order-choose-bar {
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  top: 48px;
  height: 40px;
  width: 20rem;
  position: fixed;
  background: var(--primary-bg-color);
}
.my-order-choose-bar ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.my-order-choose-bar ul li {
  flex-basis: 20%;
  flex-shrink: 1;
  flex-grow: 1;
  text-align: center;
  position: relative;
  font-size: 14px;
  padding-bottom: 0.2rem;
  transition: all 0.5s;
}
.my-order-choose-bar ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.my-order-choose-bar .click-effect a {
  color: var(--primary-embellish-color);
  font-weight: bolder;
}
.my-order-choose-bar .click-effect::after {
  position: absolute;
  display: block;
  content: "";
  height: 2px;
  background: var(--primary-embellish-color);
  width: 10%;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  opacity: 0;
  animation-name: category-bottom-animate;
  animation-duration: 0.8s;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes category-bottom-animate {
  0% {
    opacity: 0;
    width: 20%;
  }
  30% {
    opacity: 0.4;
    width: 30%;
  }
  100% {
    opacity: 1;
    width: 60%;
  }
}

.display-order-area {
  /* position: absolute;
  top: 80px; */
  padding-top: 88px;
}
.display-order-area img {
  width: 100%;
}
.display-order-area .not-order-hidden {
  display: none;
}
.display-order-area .not-order p {
  text-align: center;
}
</style>