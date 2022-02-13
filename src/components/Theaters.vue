<template>
  <div>
    <div class="theachers-page" v-if="!loading">
      <SearchContent></SearchContent>

      <div class="theaters-filter-bar">
        <ul>
          <li
            @click="operateFilterList(1)"
            v-bind:class="[controlChooseFilterBar==1?FilterBarClassName:'']"
          >
            <p>正在热映</p>
          </li>
          <li
            @click="operateFilterList(2)"
            v-bind:class="[controlChooseFilterBar==2?FilterBarClassName:'']"
          >
            <p>当下趋势</p>
          </li>
          <li
            @click="operateFilterList(3)"
            v-bind:class="[controlChooseFilterBar==3?FilterBarClassName:'']"
          >
            <p>最受期待</p>
          </li>
          <li
            @click="operateFilterList(4)"
            v-bind:class="[controlChooseFilterBar==4?FilterBarClassName:'']"
          >
            <p>得分最高</p>
          </li>
        </ul>
      </div>
      <div
        class="theaters-wrap"
        @touchmove="checkScreenHeight"
        @touchstart="getTouchStart($event)"
        @touchend="getTouchEnd($event)"
        ref="theatersContent"
      >
        <div class="movies-list-wrap">
          <div
            class="movie-detail-box"
            v-for="(item,index) in saveTheatersDataForHot"
            :key="index"
            @click.stop="goToMovieDetail(item.movieCode)"
          >
            <div class="movie-img" :style="{backgroundImage:'url('+item.imgLinkOfMovie+')'}">
              <!-- <img :src="" alt /> -->
            </div>
            <div class="movie-intro">
              <div class="movie-intro-title">
                <h3>{{item.chinaNameOfMovie}}</h3>
              </div>
              <div class="movie-intro-text">
                <div>
                  <p>
                    类型：
                    <span>{{item.movieGenre}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    豆瓣评分：
                    <span>{{item.score}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    导演：
                    <span>{{item.movieDirector}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    首映日期:
                    <span>{{item.movieReleaseDate | numtranslate}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="add-item">
              <div class="add-item-button">
                <span @click.stop="buyTheProduct(item.movieCode)">购买</span>
              </div>
            </div>
          </div>

          <LightHint :conorlDisplay="showRemainContent" :reminContentUseHTML="reminContentUseHTML"></LightHint>
          <dataLoadingTips :finish="dataFindished"></dataLoadingTips>
          <dataFinishedTips :finish="dataFindished"></dataFinishedTips>
          <dataRefreshHint :finish="pullupRefresh"></dataRefreshHint>
        </div>
      </div>
    </div>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import SearchContent from "@/components/component/SearchContent";
import URL from "@/serviceAPI.config";
import axios from "axios";
import numTranslateDate from "@/components/filters/numTranslateDate";
import commonMethods from "@/components/commonmethods/default";
import LightHint from "@/components/component/LightHint";
import dataFinishedTips from "@/components/component/dataFinishedTips";
import dataLoadingTips from "@/components/component/dataLoadingTips";
import dataRefreshHint from "@/components/component/dataRefreshHint";
import Loading from "@/components/skleton/Loading";
export default {
  data() {
    return {
      controlChooseFilterBar: 1, // 控制显示条
      FilterBarClassName: "choose-this-item", // 控制类的显示
      saveSearchKey: "", // 保存搜索框的数据. (搜索框功能没实现)

      // 默认全是倒序.
      saveTheatersDataForHot: [], // 保存服务器的数据 正在热映
      saveTheatersDataForAttention: [], // 保存服务器的数据 当下趋势
      saveTheatersDataForExpect: [], // 保存服务器的数据 最受期待
      saveTheatersDataForHeightScore: [], // 保存服务器的数据  得分最高
      savepagesForHot: 1, // 保存页数
      savepagesForAttention: 1, // 保存页数
      savepagesForExpect: 1, // 保存页数
      savepagesForHeightScore: 1, // 保存页数
      saveSign: 1, // 发送的标识.用于标识不同的类.和后台约定好的参数

      // 用于检测用户是否已经登录
      checkUserLogin: undefined, // 用户是否登录
      saveDataAboutToken: undefined, // 接收到的数据

      // 提示条用到的变量
      showRemainContent: true, // 是否隐藏提示
      reminContentUseHTML: "请登录", //  提示内容

      // 购买时候发送给服务器的内容.
      // 用户ID
      userAccount: undefined,

      // 用于检测屏幕 => 该变量已经被抽象出来的.
      // clientHeight: 0, // 可视区的高度
      // scrollHeight: 0, // 总元素的宽度
      // scrollTop: 0, // 网上偏移的高度

      dataFindished: false, // 控制数据加载提示条
      touchOrgin: 0, //用户触摸的位置.
      pullupRefresh: false,
      timerout: null,
      loading: true,
    };
  },
  methods: {
    // 点击顶部横向选项条
    /*
    处理逻辑:
      - 当用户点击的时候.不执行页数清零的操作.
      - 由不同的变量控制不同的页数.
    */
    operateFilterList(i) {
      this.controlChooseFilterBar = i; // 控制颜色的导航条
      this.saveSign = i; // 发送给服务器的标识.
      this.dataFindished = false;
      switch (this.saveSign) {
        case 1:
          this.getTheaters(this.savepagesForHot);
          break;
        case 2:
          this.getTheaters(this.savepagesForAttention);
          break;
        case 3:
          this.getTheaters(this.savepagesForExpect);
          break;
        case 4:
          this.getTheaters(this.savepagesForHeightScore);
          break;
        default:
          console.log("出现错误");
      }
    },

    // 获得AJAX的操作.
    getTheaters(_page) {
      axios
        .get(URL.getTheaters, {
          params: {
            csign: this.saveSign, //类
            pages: _page, // 页数
          },
        })
        .then((data) => {
          let temporaryVar = data.data;
          console.log(data.data);
          if (temporaryVar.code == 200) {
            this.saveTheatersDataForHot = temporaryVar.data;
            console.log(this.saveTheatersDataForHot[0]);
            if (temporaryVar.finished) {
              this.dataFindished = true;
              // 这里应该清除掉事件.
            }
            this.loading = false;
          } else if (temporaryVar.code == 300) {
            commonMethods.ShowLoginTips(this, "<p>参数传递错误,请稍后重试</p>");
          } else if (temporaryVar.code == 400) {
            commonMethods.ShowLoginTips(
              this,
              "<p>数据库查询错误,请稍后重试</p>"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 得到触摸的原始位置.触摸事件
    getTouchStart(event) {
      this.touchOrgin = event.changedTouches[0].clientY;
    },
    // 检测屏幕.用于下拉刷新.移动事件
    checkScreenHeight(event) {
      let touchLocalNow = event.changedTouches[0].clientY;
      commonMethods.detectScreenHeight(
        this.touchOrgin,
        touchLocalNow,
        function () {
          if (this.timerout !== null) {
            clearTimeout(this.timerout);
          }
          this.timerout = setTimeout(() => {
            switch (this.saveSign) {
              case 1:
                this.savepagesForHot += 1;
                this.getTheaters(this.savepagesForHot);
                break;
              case 2:
                this.savepagesForAttention += 1;
                this.getTheaters(this.savepagesForAttention);
                break;
              case 3:
                this.savepagesForExpect += 1;
                this.getTheaters(this.savepagesForExpect);
                break;
              case 4:
                this.savepagesForHeightScore += 1;
                this.getTheaters(this.savepagesForHeightScore);
                break;
              default:
                console.log("出现错误");
            }
          }, 300);
        }.bind(this),
        function () {
          this.pullupRefresh = true;
        }.bind(this)
      );
    },
    getTouchEnd(event) {
      let touchEnd = event.changedTouches[0].clientY;
      1;
      // 移动大于40的时候
      if (touchEnd - this.touchOrgin > 40) {
        this.dataFindished = false;
        this.savepagesForHot = 1;
        this.getTheaters(this.savepagesForHot);
      }
      this.pullupRefresh = false;
    },
    // 当用户点击购买.
    buyTheProduct(id) {
      // 检测用户是否已经登陆
      if (!this.checkUserLogin) {
        commonMethods.ShowLoginTips(this, "<p>请登陆后再进行操作</p>");
        return false;
      }
      if (!this.userAccount) {
        console.log("未获取到用户ID.终止请求");
        return false;
      }

      // 如果用户已经.就把此条信息添加到用户购物车当中.并且跳转到用户购物车.
      /* 
     发送的内容
      - 用户ID
      - 电影ID
      */
      axios
        .post(URL.addtoshoppingcart, {
          userid: this.userAccount,
          movieid: id,
        })
        .then((data) => {
          let temporaryVar = data.data;
          console.log(temporaryVar);
          if (temporaryVar.code == 200) {
            // 新插入数据成功
            commonMethods.ShowLoginTips(
              this,
              "<p>该电影商品已成功添加到我的票夹夹中.</p>"
            );
          } else if (temporaryVar.code == 202) {
            // 增加商品成功
            commonMethods.ShowLoginTips(
              this,
              "<p>新增该电影一份成功.可在我的票夹夹中更方便的添加商品数量</p>"
            );
          } else if (temporaryVar.code == 400) {
            // 数据库发生异常.
            commonMethods.ShowLoginTips(
              this,
              "<p>查询发生未知错误.请稍后重试</p>"
            );
          } else if (temporaryVar.code == 300) {
            // 参数传递错误.
            commonMethods.ShowLoginTips(this, "<p>参数有误.请重新刷新页面</p>");
          } else if (temporaryVar.code == 301) {
            // 该用户不存在.请重新登录.
            commonMethods.ShowLoginTips(this, "<p>该用户不存在,请重新登录</p>");
          } else if (temporaryVar.code == 302) {
            // 新增数据失败
            commonMethods.ShowLoginTips(
              this,
              "<p>该商品添加到购物车失败,请稍后重试</p>"
            );
          } else if (temporaryVar.code == 303) {
            // 插入订单失败
            commonMethods.ShowLoginTips(this, "<p>插入订单失败,请稍后重试</p>");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToMovieDetail(movieid) {
      this.$router.push({
        name: "MovieDetailInfo",
        query: { moviecode: movieid },
      });
    },
  },
  filters: {
    numtranslate(arg) {
      return numTranslateDate(arg);
    },
  },
  created() {
    this.getTheaters(this.savepagesForHot);
    commonMethods.contratToken(
      function (state, data) {
        this.checkUserLogin = state;
        this.saveDataAboutToken = data;
        this.userAccount = localStorage.getItem("userID");
      }.bind(this)
    );
  },
  components: {
    SearchContent,
    LightHint,
    dataFinishedTips,
    dataLoadingTips,
    dataRefreshHint,
    Loading,
  },

  // 这里豆瓣评分应该放在最后一栏，做个标记
};
</script>

<style  scoped>
.theachers-page {
  padding-bottom: 50px;
}
.finished-wrap {
  margin: 0 auto;
  text-align: center;
}
.theaters-wrap {
  padding: 80px 0.4rem 0.4rem 0.4rem;
}
.theaters-filter-bar {
  padding-bottom: 0.6rem;
  position: fixed;
  top: 48px;
  width: 100%;
  height: 32px;
  background: var(--primary-bg-color);
}

.theaters-filter-bar ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-items: center;
  align-items: center;
}
.theaters-filter-bar ul li {
  flex-basis: 25%;
  flex-grow: 1;
  text-align: center;
  position: relative;
  padding-bottom: 4px;
}
.choose-this-item {
  font-weight: bolder;
  color: var(--primary-embellish-color);
}
.choose-this-item:after {
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
.theaters-wrap .movies-list-wrap {
}
.theaters-wrap .movies-list-wrap .movie-detail-box {
  width: 100%;
  background: var(--secondady-module-color);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.5rem;
  padding: 0.4rem 0px;
  border-bottom: 1px solid rgba(40, 41, 43, 0.5);
}

.theaters-wrap .movies-list-wrap .movie-detail-box .movie-img {
  flex-basis: 25%;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.theaters-wrap .movies-list-wrap .movie-detail-box .movie-img img {
  width: 100%;
  border-radius: 10px;
}
.theaters-wrap .movies-list-wrap .movie-detail-box .movie-intro {
  flex-basis: auto;
  flex-grow: 1;
  padding: 0.2rem 0 0 0.4rem;
}
.theaters-wrap
  .movies-list-wrap
  .movie-detail-box
  .movie-intro
  .movie-intro-title {
  padding-bottom: 0.3rem;
}
.theaters-wrap
  .movies-list-wrap
  .movie-detail-box
  .movie-intro
  .movie-intro-text {
}
.theaters-wrap
  .movies-list-wrap
  .movie-detail-box
  .movie-intro
  .movie-intro-text
  > div {
  padding-bottom: 0.2rem;
}

.theaters-wrap .movies-list-wrap .movie-detail-box .add-item {
  flex-basis: 20%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 3rem;
}
.theaters-wrap .movies-list-wrap .movie-detail-box .add-item .add-item-button {
  background: var(--primary-embellish-color);
  padding: 0.2rem 0.8rem;
  border-radius: 10px;
}
.theaters-wrap
  .movies-list-wrap
  .movie-detail-box
  .add-item
  .add-item-button
  span {
  color: var(--white-color);
  background: none;
  border: none;
}
</style>