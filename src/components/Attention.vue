<template>
  <div>
    <div class="attention-page" ref="attentionPage" v-show="!loading">
      <SearchContent></SearchContent>
      <div class="navigation-area" ref="navigationArea">
        <div class="description-att-title" id="description-att-title">
          <h3>都在看</h3>
        </div>
        <div class="description-att-content" id="description-att-content">
          <div class="att-search-bar">
            <ul>
              <li
                v-for="(item, index) in BarTagData"
                :key="index"
                @click.stop="clickClassifyNotify"
              >
                {{ item }}
              </li>
            </ul>
            <div
              class="show-all-stiky"
              @click="controlShowAllAnimation($event)"
            >
              <p>{{ showAllMenuText }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="description-wrap" ref="descriptionWrap">
        <div
          v-bind:class="[controlTransition, 'att-search-bar-detail']"
          ref="allListContent"
          @animationend="animationEndTing($event)"
        >
          <div class="att-search-bar-detail-title">
            <h3>所有列表</h3>
          </div>
          <div class="att-search-bar-detail-all">
            <ul>
              <li
                v-for="(item, index) in BarTagData"
                :key="index"
                @click.stop="clickClassifyNotify"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <!-- 详细信息 -->
        <div
          class="description-att-details-contents"
          ref="attDetail"
          @touchmove="checkScreenHeight($event)"
          @touchstart="getTouchStart($event)"
          @touchend="getTouchEnd($event)"
        >
          <div class="att-details-warp">
            <div class="att-detail-contentbox" ref="attDetailContentboxLeft">
              <div
                class="att-content-cell"
                v-for="(item, index) in getArticleDataLeft"
                :key="index"
                @click="clickArticle"
              >
                <div class="show-img-unorder">
                  <img :src="item.articleIMG" alt />
                </div>
                <div class="att-show-img-desiription">
                  <h4 class="att-show-title">{{ item.articleTitle }}</h4>
                  <div class="att-show-text-des-synopsis">
                    {{ item.articleContent }}
                  </div>
                  <div class="att-show-text-des">
                    <div class="att-show-user-avatar-wrap">
                      <img
                        :src="item.userinfo.userAvatar"
                        alt
                        class="att-show-user-avatar"
                      />
                    </div>
                    <p class="att-show-net-name">
                      {{ item.userinfo.userNetName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="att-detail-contentbox" ref="attDetailContentboxRight">
              <div
                class="att-content-cell"
                v-for="(item, index) in getArticleDataRight"
                :key="index"
                @click="clickArticle"
              >
                <div class="show-img-unorder">
                  <img :src="item.articleIMG" alt />
                </div>
                <div class="att-show-img-desiription">
                  <h4 class="att-show-title">{{ item.articleTitle }}</h4>
                  <div class="att-show-text-des-synopsis">
                    {{ item.articleContent }}
                  </div>
                  <div class="att-show-text-des">
                    <div class="att-show-user-avatar-wrap">
                      <img
                        :src="item.userinfo.userAvatar"
                        alt
                        class="att-show-user-avatar"
                      />
                    </div>
                    <p class="att-show-net-name">
                      {{ item.userinfo.userNetName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LightHint
        :conorlDisplay="showRemainContent"
        :reminContentUseHTML="reminContentUseHTML"
      ></LightHint>
      <dataRefreshHint :finish="pullupRefresh"></dataRefreshHint>
    </div>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import SearchContent from "@/components/component/SearchContent";
import axios from "axios";
import URL from "@/serviceAPI.config";
import commonMethods from "./commonmethods/default";
import dataFinishedTips from "@/components/component/dataFinishedTips";
import dataLoadingTips from "@/components/component/dataLoadingTips";
import LightHint from "@/components/component/LightHint";
import dataRefreshHint from "@/components/component/dataRefreshHint";
import Loading from "@/components/skleton/Loading";
export default {
  data() {
    return {
      msg: "hello",
      computeDetailsHeight: 0,
      screenHeight: 0, //屏幕高度
      subtractionForHeight: 0, //底部的高度
      searchBarHeight: 0, //搜索框高度
      attentionTileAndListHeigth: 0, //标题与List高度
      controlTransition: "using-transition-hidden-end", //用来控制动画的初始类
      controlTransitionOPtions: [
        "using-transition-display",
        "using-transition-hidden",
      ], //用来控制动画的类
      controlTransitionAuxiliary: [
        "using-transition-display-end",
        "using-transition-hidden-end",
      ], //用来控制动画的辅助类

      // 以下是数据类
      getStyleSheets: undefined,
      BarTagData: undefined, //标签数据
      getArticleData: [], // 文章总数据
      getArticleDataLeft: [], // 文章左数据
      getArticleDataRight: [], // 文章右数据
      sendSignForArticle: "", // 发送ajax的接口
      artileLength: 6, // 开始默认是6.发送ajax的接口
      ArtileCutPoint: 0, // 左右数据分割的地方.

      showAllMenuText: "全部", // 控制显示全部的小按钮信息显示.
      dataFindished: false, // 请求是否完成的参数
      page: 1,

      showRemainContent: true, // 是否隐藏提示
      reminContentUseHTML: "", //  提示内容
      touchOrgin: 0, //用户触摸的位置.
      pullupRefresh: false,
      timerout: null,
      loading: true,
    };
  },
  components: {
    SearchContent,
    dataLoadingTips,
    dataFinishedTips,
    LightHint,
    dataRefreshHint,
    Loading,
  },
  methods: {
    setShowBatDetailElemHeight() {
      var searchBar = document.getElementById("search-bar-elem");
      console.log(searchBar);
      // var descriptionAttContent = document.getElementById(
      //   "description-att-title"
      // );
      // var searchBarElem = document.getElementById("description-att-content");
      this.screenHeight = document.documentElement.clientHeight; //int // 获得屏幕的高度

      // 获得searchbar的高度
      this.searchBarHeight = this.returnFilterNum(
        getComputedStyle(searchBar).height
      ); // 此属性可以兼容到IE9. IE8不支持. str =>float

      this.attentionTileAndListHeigth = this.returnFilterNum(
        getComputedStyle(this.$refs.navigationArea).height
      ); // 标题加list的高度
      this.subtractionForHeight =
        this.screenHeight -
        this.attentionTileAndListHeigth -
        this.searchBarHeight; // 屏幕高度 - (搜索框高度 + 标题和list的高度)  == 底部内容的高度

      console.log(this.screenHeight);
      console.log(this.searchBarHeight);
      console.log(this.attentionTileAndListHeigth);
      console.log(this.subtractionForHeight);
    },
    returnFilterNum(str) {
      if (!parseFloat(str)) {
        console.log(str);
        console.log("数字转换出现错误");
        return false;
      }
      return parseFloat(str);
    },
    setStyle() {
      this.getStyleSheets = document.styleSheets[0];
      // console.log(this.SubtractionForHeight);
      // console.log(this.attentionTileAndListHeigth);

      this.getStyleSheets.insertRule(
        ".attention-page{height:" + this.screenHeight + "px;",
        0
      ); //设置内容盒子外部的高度

      this.getStyleSheets.insertRule(
        ".description-wrap{height:" +
          this.subtractionForHeight +
          "px;top:" +
          (this.searchBarHeight + this.attentionTileAndListHeigth) +
          "px}",
        0
      ); //设置内容盒子外部的高度

      // 设置内容盒子总的高度
      this.getStyleSheets.insertRule(
        ".att-search-bar-detail{height:" + this.subtractionForHeight + "px;",
        0
      );
    },
    controlShowAllAnimation(event) {
      // 控制文字的显示动画
      this.controlTransition =
        this.controlTransition == this.controlTransitionOPtions[0]
          ? this.controlTransitionOPtions[1]
          : this.controlTransitionOPtions[0]; // 用来控制动画

      //控制文字显示
      console.log(this.controlTransition);

      if (this.controlTransition == "using-transition-display") {
        this.showAllMenuText = "收起";
      } else {
        this.showAllMenuText = "全部";
      }
    },
    animationEndTing(ev) {
      // 控制动画结束的函数
      var getClassStr = ev.target.className.toLocaleLowerCase().split(" ");
      getClassStr.forEach((item, index, arr) => {
        if (this.controlTransitionOPtions.indexOf(item) != -1) {
          if (item == this.controlTransitionOPtions[0]) {
            this.$refs.allListContent.classList.add(
              this.controlTransitionAuxiliary[0]
            );
            this.$refs.allListContent.classList.remove(
              this.controlTransitionAuxiliary[1]
            );
          } else if (item == this.controlTransitionOPtions[1]) {
            this.$refs.allListContent.classList.add(
              this.controlTransitionAuxiliary[1]
            );
            this.$refs.allListContent.classList.remove(
              this.controlTransitionAuxiliary[0]
            );
          }
        }
      });
      //console.log(this.controlTransitionOPtions.join(' '));
    },

    getTag() {
      axios
        .get(URL.getMateral, { params: { csign: "articletag" } })
        .then((arg) => {
          this.BarTagData = arg.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArticle() {
      axios
        .get(URL.getArticle, {
          params: {
            csign: this.sendSignForArticle,
            page: this.page,
          },
        })
        .then((arg) => {
          console.log(arg);
          this.getArticleData = arg.data.data;
          this.ArtileCutPoint = Math.ceil(this.getArticleData.length / 2); // 左右分割数据的地方
          if (arg.data.finished) {
            commonMethods.ShowLoginTips(this, "<p>已经加载全部内容</p>");
          }
          this.getArticleDataLeft = [];
          this.getArticleDataRight = [];
          this.getArticleData.forEach(
            function (item, index) {
              if (index % 2 == 0) {
                this.getArticleDataLeft.push(item);
              } else {
                this.getArticleDataRight.push(item);
              }
            }.bind(this)
          );
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 得到触摸的原始位置.
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
          // 如果timer已经存在.就清除此事件
          if (this.timerout !== null) {
            clearTimeout(this.timerout);
            console.log("清除事件");
          }
          this.timerout = setTimeout(() => {
            this.page += 1;
            this.getArticle();
          }, 300);
        }.bind(this),
        function () {
          this.pullupRefresh = true;
        }.bind(this)
      );
    },
    // 用户松开的位置
    getTouchEnd(event) {
      let touchLocalEnd = event.changedTouches[0].clientY;
      if (touchLocalEnd - this.touchOrgin > 40) {
        this.page = 1;
        this.getArticle();
      }
      this.pullupRefresh = false;
    },
    clickArticle() {
      commonMethods.ShowLoginTips(
        this,
        "<p>没有制作文章页面.不可进入文章详情页面</p>"
      );
    },
    clickClassifyNotify() {
      commonMethods.ShowLoginTips(this, "<p>分类文章功能未实现</p>");
    },
  },

  created() {
    this.getTag();
    this.getArticle();
  },
  mounted() {
    this.setShowBatDetailElemHeight();
    this.setStyle();
  },
};
</script>

<style  scoped>
.attention-page {
  position: relative;
  width: 20rem;
}
.description-wrap {
  /* padding: 0.6rem 0 0.6rem 0.4rem; */
  /* padding: 50px 0 0.6rem 0.4rem; */
  position: absolute;
  width: 100%;
  left: 0px;
  top: 128px;
}
.navigation-area {
  position: fixed;
  width: 100%;
  top: 48px;
  height: 80px;
  z-index: 99;
  background: var(--primary-bg-color);
}
.navigation-area .description-att-title h3 {
  border-left: 4px solid var(--primary-embellish-color);
  font-size: 18px;
  font-weight: normal;
  padding-left: 0.5rem;
  padding: 0 0.5rem;
}
.navigation-area .description-att-content {
  padding: 0.5rem 0 0.5rem 0;
}
.navigation-area .description-att-content .att-search-bar {
  position: relative;
  min-height: 1.2rem;
}

.navigation-area .description-att-content .att-search-bar ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.2rem;
  overflow-y: hidden;
  overflow-x: scroll;
  /* width: 84%; */
  align-items: center;
}
.navigation-area .description-att-content .att-search-bar ul li {
  white-space: nowrap;
  margin: 0.45rem 0.2rem;
  padding: 0.3rem 0.3rem;
  background-color: var(--primary-embellish-color);
  border-radius: 20px;
  min-height: 1.4rem;
}

.navigation-area .description-att-content .show-all-stiky {
  width: 16%;
  height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: var(--primary-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
.description-wrap .att-search-bar-detail {
  width: 100%;
  /* background: pink; */
  position: fixed;
  left: 0px;
  /* padding: 0.5rem 0 0 0.5rem; */
}

/* 
动画的整体执行逻辑如下:(一共四帧 : 动画隐藏/动画显示执行/动画显示结束 / 动画隐藏执行 /) -
  - 首先让整体动画执行在动画隐藏.
      visibility: hidden !important;
      z-index: -99 !important;
      opacity: 0 !important;

  - 之后点击 => 动画显示执行
    - 马上删除第一帧
    - visibility与 z-index马上进行显示
    - 设置opacity为0,否则会闪屏.之后opacity慢慢进行变化

  - 动画显示执行结束:
    - 动画显示开始生效
      - 设置opacity为1 !important,这个时候没有opacity,此opacity生效.

  - 动画消失执行
    - 马上删除第三帧
    - 仅变化opacity. => 隐藏

  - 动画消失执行结束 (opacity消失,但是并没有隐藏)=> 执行第一步
*/

.using-transition-hidden-end {
  visibility: hidden !important;
  z-index: -99 !important;
  opacity: 0 !important;
}
.using-transition-display-end {
  opacity: 1 !important;
}
.using-transition-display {
  visibility: visible;
  opacity: 0;
  z-index: 99;
  animation-delay: 0ms;
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-name: list-detail-display;
  animation-iteration-count: 1;
  background: var(--secondary-bg-color);
}
.using-transition-hidden {
  z-index: 99;
  visibility: visible;
  animation-delay: 0ms;
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-name: list-detail-hidden;
  animation-iteration-count: 1;
  background: var(--secondary-bg-color);
}
@keyframes list-detail-display {
  10% {
    opacity: 0;
    background: linear-gradient(top, #0b0b0d 1%, #e5353e 10%);
  }
  20% {
    opacity: 0.1;
    background: linear-gradient(top, #0b0b0d 10%, #e5353e 20%);
  }
  30% {
    opacity: 0.2;
    background: linear-gradient(top, #0b0b0d 20%, #e5353e 35%);
  }
  40% {
    opacity: 0.3;
    background: linear-gradient(top, #0b0b0d 30%, #e5353e 45%);
  }
  50% {
    opacity: 0.4;
    background: linear-gradient(top, #0b0b0d 40%, #e5353e 55%);
  }
  60% {
    opacity: 0.5;
    background: linear-gradient(top, #0b0b0d 50%, #e5353e 65%);
  }
  70% {
    opacity: 0.6;
    background: linear-gradient(top, #0b0b0d 60%, #e5353e 75%);
  }
  80% {
    opacity: 0.7;
    background: linear-gradient(top, #0b0b0d 75%, #e5353e 85%);
  }
  90% {
    opacity: 0.8;
    background: linear-gradient(top, #0b0b0d 88%, #e5353e 95%);
  }
  100% {
    opacity: 0.9;
    background: linear-gradient(top, #0b0b0d 100%, #e5353e 100%);
  }
}
@keyframes list-detail-hidden {
  100% {
    opacity: 0;
    background: linear-gradient(top, #0b0b0d 1%, #e5353e 20%);
  }
  80% {
    opacity: 0.1;
    background: linear-gradient(top, #0b0b0d 10%, #e5353e 20%);
  }
  70% {
    opacity: 0.2;
    background: linear-gradient(top, #0b0b0d 20%, #e5353e 35%);
  }
  60% {
    opacity: 0.3;
    background: linear-gradient(top, #0b0b0d 30%, #e5353e 45%);
  }
  50% {
    opacity: 0.4;
    background: linear-gradient(top, #0b0b0d 40%, #e5353e 55%);
  }
  40% {
    opacity: 0.5;
    background: linear-gradient(top, #0b0b0d 50%, #e5353e 65%);
  }
  30% {
    opacity: 0.6;
    background: linear-gradient(top, #0b0b0d 60%, #e5353e 75%);
  }
  20% {
    opacity: 0.7;
    background: linear-gradient(top, #0b0b0d 75%, #e5353e 85%);
  }
  10% {
    opacity: 0.8;
    background: linear-gradient(top, #0b0b0d 88%, #e5353e 95%);
  }
  1% {
    opacity: 0.9;
    background: linear-gradient(top, #ffffff 100%, #0b0b0d 100%);
  }
}

.description-wrap .att-search-bar-detail .att-search-bar-detail-title {
  /* padding: 1rem; */
  border-left: 4px solid var(--primary-embellish-color);
  font-size: 18px;
  font-weight: normal;
  padding-left: 0.5rem;
  padding: 0 0.5rem;
}
.description-wrap .att-search-bar-detail .att-search-bar-detail-all {
}
.description-wrap .att-search-bar-detail .att-search-bar-detail-all ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
}
.description-wrap .att-search-bar-detail .att-search-bar-detail-all ul li {
  white-space: nowrap;
  flex-basis: auto;
  border: 1px solid var(--secondady-embellish-color);
  border-radius: 20px;
  padding: 0.2rem 0.4rem;
  color: var(--white-color);
  text-align: center;
}

.description-wrap .description-att-details-contents {
  display: block;
  width: 100%;
  /* background: var(--btn-color); */
  position: absolute;
  left: 0px;
  /* top: 0px; */
  z-index: 1;
  /* padding: .6rem; */
  padding-bottom: 50px;
}
.description-wrap .description-att-details-contents .att-details-warp {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.6rem;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox {
  flex-basis: 8rem;
  flex-grow: 1;
  /* background-color: pink; */
  padding: 0.4rem;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell {
  background-color: var(--secondary-bg-color);
  border-radius: 20px;
  margin: 0.4rem 0px;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-details-contentbox
  .att-content-cell
  .show-img-unorder {
  border-radius: 10px;
  /* border: 1px solid red; */
  overflow: hidden;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .show-img-unorder
  img {
  width: 100%;
}

.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .att-show-img-desiription
  h4 {
  font-size: 0.8rem;
  font-weight: normal;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .att-show-img-desiription
  .att-show-text-des-synopsis {
  padding: 0.4rem 0.4rem 0.2rem 0.4rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .att-show-img-desiription
  .att-show-title {
  text-align: center;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .att-show-img-desiription
  .att-show-text-des {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  padding: 0.2rem 0.4rem 0.4rem 0.4rem;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .att-show-img-desiription
  .att-show-text-des
  .att-show-user-avatar-wrap {
  overflow: hidden;
  vertical-align: bottom;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .att-show-img-desiription
  .att-show-text-des
  .att-show-user-avatar-wrap
  img {
  vertical-align: middle;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .att-show-img-desiription
  .att-show-text-des
  .att-show-user-avatar {
  width: 1rem;
  border-radius: 50%;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox
  .att-content-cell
  .att-show-img-desiription
  .att-show-text-des
  p {
  line-height: 100%;
}
.description-wrap
  .description-att-details-contents
  .att-details-warp
  .att-detail-contentbox {
  /* flex-basis: 8rem;
  flex-grow: 1;
  background-color: red; */
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>