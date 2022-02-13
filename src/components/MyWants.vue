<template>
  <div>
    <TopBar :title="title" v-on:clickarrow="skiptoPage"></TopBar>
    <div class="wants-list-cell">
      <div class="list-cell-title">
        <div class="cell-title-options">
          <!-- <h5>排序</h5> -->
          <span>
            <!-- 这是一个小按钮 -->
          </span>
        </div>
      </div>
      <ul class="options-list">
        <li @click="clickViewsAllData">
          <a href="javascript:void(0);" v-bind:class="[onWhichOne==0?'active':'']">查看所有</a>
        </li>
        <li @click="clickAccordingToCollect">
          <a href="javascript:void(0);" v-bind:class="[onWhichOne==1?'active':'']">
            收藏日期
            <svg class="icon" aria-hidden="true" v-if="temporaryArrowForCollect==1">
              <use xlink:href="#icon-direction-down" />
            </svg>
            <svg class="icon" aria-hidden="true" v-if="temporaryArrowForCollect==0">
              <use xlink:href="#icon-direction-up" />
            </svg>
          </a>
        </li>
        <li @click="clickAccordToReleaseDate">
          <a href="javascript:void(0);" v-bind:class="[onWhichOne==2?'active':'']">
            上映日期
            <svg class="icon" aria-hidden="true" v-if="temporaryArrowForRelease==1">
              <use xlink:href="#icon-direction-down" />
            </svg>
            <svg class="icon" aria-hidden="true" v-if="temporaryArrowForRelease==0">
              <use xlink:href="#icon-direction-up" />
            </svg>
          </a>
          <!-- // IP地址 185.199.111.153 -->
        </li>
      </ul>
    </div>

    <div
      class="my-wants-options-list"
      @touchmove="checkScreenHeight($event)"
      @touchstart="getTouchStart($event)"
      @touchend="getTouchEnd($event)"
    >
      <div class="display-my-wants-content" v-for="(item,index) in ReciveDataForAll" :key="index">
        <div class="wants-content-bar-in-all-row">
          <div class="show-img">
            <img :src="item.movie.imgLinkOfMovie" alt />
          </div>
          <div class="show-text">
            <h4>{{item.movie.chinaNameOfMovie}}</h4>
            <p>
              类型:
              <span>{{item.movie.movieTagOfLoL | addSpace}}</span>
            </p>
            <p v-if="onWhichOne == 1 ">
              收藏日期:
              <!-- |numTranslateDate -->
              <span>{{item.collectdata | dateTranslateDate}}</span>
            </p>
            <p v-if="onWhichOne == 2 ||onWhichOne == 0">
              上映日期:
              <!-- |numTranslateDate -->
              <span>{{item.movie.movieReleaseDate | dateTranslateDate}}</span>
            </p>
          </div>
        </div>
        <div class="choose-dot" ref="choose-dot" @click="myWantsOperate(item.movie.movieCode)">
          <div class="dot1"></div>
          <div class="dot2"></div>
          <div class="dot3"></div>
        </div>
      </div>
    </div>

    <div v-bind:class="[shadeCoverage]" ref="shadeCoverageDom">
      <div class="row-single">
        <div class="operate-btns operate-top">
          <button @click="buyTicket">购票</button>
          <button @click="cancelCollcet">取消收藏</button>
        </div>
        <div class="operate-btns operate-cannel" @click="cancelShade">
          <button>取消操作</button>
        </div>
      </div>
    </div>
    <div
      v-bind:class="[{'control-purchase-hidden':controlPurchaseHidden},'purchase-prompt']"
      v-html="insertP"
    ></div>
    <dataFinishedTips :finish="dataFindished"></dataFinishedTips>
    <dataLoadingTips :finish="dataFindished"></dataLoadingTips>
    <dataRefreshHint :finish="pullupRefresh"></dataRefreshHint>
  </div>
</template>

<script>
import TopBar from "@/components/component/TopBar";
import axios from "axios";
import URL from "@/serviceAPI.config";
import commonMethods from "./commonmethods/default";
import AddSpaceToinTheString from "@/components/filters/AddSpaceToinTheString";
import numTranslateDate from "@/components/filters/numTranslateDate";
import dataFinishedTips from "@/components/component/dataFinishedTips";
import dataLoadingTips from "@/components/component/dataLoadingTips";
import dataRefreshHint from "@/components/component/dataRefreshHint";
export default {
  data() {
    return {
      title: "我的想看",
      shadeCoverage: "shade-hidden",
      checkUserLogin: undefined, // 用户是否登录
      saveDataAboutToken: undefined, // 接收到的数据

      // ===========axios数据开始===========
      pages: 1, //页数. axios用
      reciveId: 0, //用户ID. 初始化的时候读取
      sort: "desc", //asc升序,desc降序. / 默认是降序
      findKey: 1, // 筛选参数.与后台进行约定.
      // ===========axios数据结束===========

      ReciveDataForAll: [], // 查看所有的数据
      ReciveDataForColllectData: [], // 存储收藏的数据
      ReciveDataForReleaseData: [], // 存储上映日期的数据

      // 控制横向滚动条的变量
      onWhichOne: 0, // 在哪一个上面.默认是在第零个上面.也就是查看所有. // oneWhitchOne与 findKey是相关关联的
      // onBehalfViewsAllBar: 0, //0代表倒序 => 查看所有.查看所有用不到倒序.
      onBehalfCollectBar: 0, // 0 代表倒序
      onBehalfReleaseDataBar: 0, // 0 代表倒序
      // temporaryArrowForAll: "↓",
      temporaryArrowForCollect: 1, // 1代表降序. 0代表升序
      temporaryArrowForRelease: 1, // 1代表降序, 0代表升序
      sendServerMovieId: "", // 用于向服务器发送数据的电影ID.
      timer: undefined, // 取消定时器.
      calculateP: 0, // 计算值用于控制提示条.
      insertP: "", //插入的内容.
      controlPurchaseHidden: true, // 默认是不显示
      dataFindished: false, // 控制数据加载提示条

      touchOrgin: 0, //用户触摸的位置.
      pullupRefresh: false, //下拉刷新的加载条
      timerout: null,
    };
  },
  watch: {
    checkUserLogin: function (newVal, oldVal) {
      if (newVal) {
        // 如果用户已经登陆就是true
        console.log("用户已经登录");
      } else {
        // 否则就是false => 跳转到用户登录界面
        console.log("用户尚未登陆");
        this.$router.push({ name: "login", params: { from: "mywants" } });
      }
    },
  },
  filters: {
    addSpace(str) {
      return AddSpaceToinTheString(str);
    },
    dateTranslateDate(num) {
      return numTranslateDate(num);
    },
  },
  methods: {
    // 这个是路由跳转
    skiptoPage() {
      this.$router.push({ name: "MyAccount" });
    },
    // 按钮事件 :我的想看操作按钮.粉红色的小点点
    myWantsOperate(movieId) {
      // 通过此方法接收到数据
      this.shadeCoverage = "shade";
      this.sendServerMovieId = movieId;
      console.log(this.sendServerMovieId); // 通过此方法动态访问其值
    },

    // 请求成功显示给用户进程条
    displayPruchasePrompt() {
      let that = this;
      this.timer = setInterval(function () {
        console.log("我被执行了");
        if (that.calculateP >= 9) {
          clearInterval(that.timer);
          that.calculateP = 0;
          return false;
        }
        that.controlPurchaseHidden = false;
        that.calculateP++;
        switch (that.calculateP) {
          case 1:
            that.insertP += "<p>正在向服务器发送您的订单信息...</p>";
            break;
          case 2:
            that.insertP += "<p>正在查询您的购买地区以及相关认证信息...</p>";
            break;
          case 3:
            that.insertP += "<p>假设您已经支付订单所需金额...</p>";
            break;
          case 4:
            that.insertP += "<p>出票准备中,正在为您下发唯一机器码...</p>";
            break;
          case 5:
            that.insertP += "<p >购票成功!已经成功推送该电影至您的设备</p>";
            break;
          case 6:
            that.insertP += "<p>我的想看中已经删除该电影数据</p>";
            break;
          case 7:
            that.insertP += "<p>您可在我票夹夹中查看购买历史记录</p>";
            break;
          case 8:
            that.insertP += "<p>感谢您对联盟大剧院的支持:)</p>";
            break;
          default:
            that.insertP = "";
            that.controlPurchaseHidden = true;
            that.shadeCoverage = "shade-hidden";
        }
      }, 1000);
    },
    //按钮事件 => 取消收藏
    cancelCollcet() {
      console.log(this.sendServerMovieId);
      // 发送数据到后台.分别是ID与电影名称.
      axios
        .post(URL.userCancelCollect, {
          userid: this.reciveId,
          movieid: this.sendServerMovieId,
        })
        .then((data) => {
          let temporaryVar = data.data;
          if (temporaryVar.code == 200) {
            this.requestErrDisplayContent(
              "<p>删除成功</p>",
              function () {
                this.shadeCoverage = "shade-hidden";
              }.bind(this)
            );
          } else if (temporaryVar.code == 300) {
            this.requestErrDisplayContent("<p>意外的错误,请稍后重试</p>");
          } else if (temporaryVar.code == 301) {
            this.requestErrDisplayContent(
              "<p>未查询到该收藏信息,请稍后重试</p>"
            );
          } else if (temporaryVar.code == 303) {
            this.requestErrDisplayContent("<p>删除数据失败,请稍后重试</p>");
          } else if (temporaryVar.code == 400) {
            this.requestErrDisplayContent("<p>参数错误,请确认请求参数正确</p>");
          }
        })
        .catch((err) => {
          this.requestErrDisplayContent(
            "<p>意外的错误,请检查网络是否正常联通</p>"
          );
          console.log(err);
        });
    },
    // 按钮事件 => 购票
    buyTicket() {
      axios
        .post(URL.userBuyTicket, {
          userid: this.reciveId,
          movieid: this.sendServerMovieId,
        })
        .then((data) => {
          console.log(data);
          let temporaryVal = data.data;
          if (temporaryVal.code == 200) {
            // 200是请求成功
            console.log(this);
            this.displayPruchasePrompt();
          } else if (temporaryVal.code == 400) {
            this.requestErrDisplayContent("<p>请求参数有误</p>");
            // 参数错误
          } else if (temporaryVal.code == 300) {
            //未在收藏夹中查到此信息
            this.requestErrDisplayContent("<p>未在您的收藏夹中寻找到此电影</p>");
          } else if (temporaryVal.code == 301) {
            // 为寻找到此电影信息
            this.requestErrDisplayContent("<p>请求参数有误</p>");
          } else if (temporaryVal.code == 302) {
            // 插入数据库失败
            this.requestErrDisplayContent("<p>插入数据库失败</p>");
          } else if (temporaryVal.code == 303) {
            // 删除数据失败
            this.requestErrDisplayContent("<p>删除数据失败</p>");
          } else if (temporaryVal.code == 304) {
            // 查询过程中发现错误
            this.requestErrDisplayContent("<p>查询过程中发现错误</p>");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 提醒内容.
    requestErrDisplayContent(remandcontent, callback) {
      this.insertP = remandcontent; //插入的内容.
      this.controlPurchaseHidden = false; // 默认是不显示
      setTimeout(
        function () {
          this.insertP = "";
          console.log(1238);
          this.controlPurchaseHidden = true;
          if (callback) {
            callback();
          }
        }.bind(this),
        1500
      );
    },
    //  按钮事件 : 点击取消操作.隐藏阴影.
    cancelShade() {
      if (!this.checkUserLogin) {
        return false;
      }
      this.shadeCoverage = "shade-hidden";
    },
    // 点击查看所有的事件
    clickViewsAllData() {
      if (!this.checkUserLogin) {
        return false;
      }
      if (this.onWhichOne == 0) {
        // 如果已经在此按钮上,就不做任何操作
        return false;
      }
      this.onWhichOne = 0;
      this.findKey = 1; // 把查询参数置为0
      this.pages = 1;
      this.dataFindished = false;
      this.getMyWants(); // 紧接着请求ajax
    },
    //点击我的收藏
    clickAccordingToCollect() {
      if (!this.checkUserLogin) {
        return false;
      }
      // 如果已经在此按钮上
      if (this.onWhichOne == 1) {
        if (this.sort == "desc") {
          this.sort = "asc";
          this.temporaryArrowForCollect = 0;
        } else {
          this.sort = "desc";
          this.temporaryArrowForCollect = 1;
        }
      } else {
        // 如果没有在此按钮上
        this.onWhichOne = 1;
        this.sort = "desc";
        this.temporaryArrowForRelease = 1;
        this.onBehalfCollectBar = 0; // 0 代表倒序
        this.onBehalfReleaseDataBar = 0; // 0 代表倒序
        this.findKey = 2;
      }
      // 发送ajax请求
      this.pages = 1;
      this.dataFindished = false;
      this.getMyWants();
    },
    // 点击上映日期
    clickAccordToReleaseDate() {
      if (!this.checkUserLogin) {
        return false;
      }
      if (this.onWhichOne == 2) {
        if (this.sort == "desc") {
          this.sort = "asc";
          this.temporaryArrowForRelease = 0;
        } else {
          this.sort = "desc";
          this.temporaryArrowForRelease = 1;
        }
      } else {
        this.onWhichOne = 2;
        this.sort = "desc";
        this.temporaryArrowForCollect = 1;
        this.onBehalfCollectBar = 0; // 0 代表倒序
        this.onBehalfReleaseDataBar = 0; // 0 代表倒序
        this.findKey = 3;
      }
      this.pages = 1;
      this.dataFindished = false;
      this.getMyWants();
    },
    getMyWants() {
      // 首页进入AJAX请求
      if (!this.checkUserLogin) {
        console.log("用户没有登录.停止请求");
        return false;
        this.$router.push({ name: "login" });
      }
      axios
        .post(URL.getmyWants, {
          userId: this.reciveId,
          sort: this.sort,
          pages: this.pages,
          findKey: this.findKey,
        })
        .then((data) => {
          let temporarVar = data.data;
          if (temporarVar.code == 200) {
            // console.log("请求用户数据成功");
            this.ReciveDataForAll = temporarVar.data;
            if (temporarVar.finished) {
              this.dataFindished = true;
            }
            console.log(this.ReciveDataForAll);
          } else if (temporarVar.code == 300) {
            console.log("查询发生错误,请稍后重试");
            // 给用户以提示.
          } else if (temporarVar.code == 304) {
            console.log("请求参数发生错误");
            // 请求参数发生了错误.
          }
        })
        .catch((err) => {
          console.log("请求用户数据失败");
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
            this.getMyWants();
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
        this.getMyWants();
      }
      this.pullupRefresh = false;
    },
  },
  components: {
    TopBar,
    dataLoadingTips,
    dataFinishedTips,
    dataRefreshHint,
  },
  created() {
    // 检测用户是否登录
    commonMethods.contratToken(
      function (state, data) {
        this.checkUserLogin = state;
        this.saveDataAboutToken = data;
        this.reciveId = localStorage.getItem("userID");
        this.getMyWants();
      }.bind(this)
    );
  },
  mounted() {},
};
</script>

<style scoped>
.purchase-prompt {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.6rem;
  color: white;
  border-radius: 8px;
  z-index: 999;
  white-space: nowrap;
  text-align: center;
  letter-spacing: 1px;
}
.purchase-prompt p {
  padding: 0.4rem;
}
.control-purchase-hidden {
  display: none;
}

.shade {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  width: 100vw;
  height: 100vh;
  display: block;
}
.shade-hidden {
  display: none;
}
.row-single {
  position: absolute;
  width: 12rem;
  /* height: 6rem; */
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.row-single {
  padding: 0.4rem;
}
.row-single .operate-top {
  padding: 0.4rem;
}
.row-single .operate-cannel {
  padding: 0.4rem;
  width: 100%;
}
.row-single .operate-btns {
  display: flex;
  gap: 1rem;
  flex-direction: row;
  flex-wrap: nowrap;
}
.row-single .operate-btns button {
  flex-basis: 100%;
  border: none;
  background: none;
  border-radius: 20px;
}

/* 遮罩层结束 */
.my-wants-options-list {
  padding: 96px 0.4rem 0.4rem 0.4rem;
  background: var(--secondary-bg-color);
}

.wants-list-cell {
  background: var(--primary-bg-color);
  /* background: red; */
  z-index: 99;
  position: fixed;
  top: 48px;
  width: 20rem;
  height: 48px;
}
.wants-list-cell .list-cell-title {
}

.wants-list-cell .list-cell-title .cell-title-options {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.4rem;
}

.wants-list-cell .list-cell-title .cell-title-options h5 {
  font-size: 0.8rem;
}
.wants-list-cell .list-cell-title .cell-title-options span {
  line-height: 100%;
  height: 100%;
  display: inline-block;
}
.wants-list-cell .options-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
  padding: 0.6rem 0.6rem 0.6rem 0.6rem;
}
.wants-list-cell .options-list li {
  flex-basis: 20%;
  flex-grow: 1;
  text-align: center;
}
.wants-list-cell .options-list a {
  transition: all 0.5s;
}
.wants-list-cell .options-list .active {
  background: var(--primary-embellish-color);
  display: inline-block;
  border-radius: 8px;
  padding: 0.1rem 0.4rem;
}

/* 箭头滚向开始*/

/* 箭头滚向结束*/
.my-wants-options-list .display-my-wants-content {
  position: relative;
}
.my-wants-options-list .display-my-wants-content .wants-content-bar-in-all-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0 0.4rem;
  align-items: center;
  border-bottom: 1px solid var(--line-color);
}
.my-wants-options-list
  .display-my-wants-content
  .wants-content-bar-in-all-row
  .show-img {
  /* background: red; */
  flex-basis: 40%;
  padding: 0.2rem;
}
.my-wants-options-list
  .display-my-wants-content
  .wants-content-bar-in-all-row
  .show-img
  img {
  width: 100%;
  border-radius: 4px;
}
.my-wants-options-list
  .display-my-wants-content
  .wants-content-bar-in-all-row
  .show-text {
  /* background: red; */
  flex-basis: 60%;
  padding-left: 0.6rem;
}
.my-wants-options-list
  .display-my-wants-content
  .wants-content-bar-in-all-row
  .show-text
  p {
  padding: 0.2rem;
}
.my-wants-options-list .display-my-wants-content .choose-dot {
  width: 20px;
  height: 20px;
  /* background: pink; */
  position: absolute;
  right: 10%;
  top: 10%;
}
.my-wants-options-list .display-my-wants-content .choose-dot div {
  width: 4px;
  height: 4px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  position: absolute;
  background: var(--primary-embellish-color);
  border-radius: 8px;
  animation: alternate 0.4s;
  transition: all 0.6s;
}
.my-wants-options-list .display-my-wants-content .choose-dot div:hover {
  background: var(--secondady-embellish-color);
}
.my-wants-options-list .display-my-wants-content .choose-dot div:hover {
}
.my-wants-options-list .display-my-wants-content .choose-dot .dot1 {
  top: -2px;
}
.my-wants-options-list .display-my-wants-content .choose-dot .dot2 {
  top: 6px;
}
.my-wants-options-list .display-my-wants-content .choose-dot .dot3 {
  top: 14px;
}
</style>