<template>
  <div>
    <SearchBar></SearchBar>

    <div class="movie-intro-mess-wrap">
      <div class="movie-intro-mess" v-if="responseDataForMovie.imgLinkOfMovie">
        <div
          class="display-cover"
          v-bind:style="{'backgroundImage':'url('+responseDataForMovie.imgLinkOfMovie+')'}"
        >
          <!-- <img :src="responseDataForMovie.imgLinkOfMovie" alt /> -->
        </div>
        <div class="intro-text-movie">
          <div class="intro-text-left">
            <h3 class="movie-title-zhch">{{responseDataForMovie.chinaNameOfMovie}}</h3>
            <h3 class="movie-title-orgin">{{responseDataForMovie.englishNameOfMovie}}</h3>
            <p>
              类型：
              <span>{{responseDataForMovie.movieTagOfLoL | addSpace}}</span>
            </p>
            <p>
              文学创作 :
              <span>{{responseDataForMovie.movieCreator}}</span>
            </p>
          </div>
          <div class="intro-text-right">
            <p>
              导演 ：
              <span>{{responseDataForMovie.movieDirector}}</span>
            </p>
            <p>
              主演 ：
              <span>{{responseDataForStar|arrToStr}}</span>
            </p>
            <p>
              时间线：
              <span>{{responseDataForMovie.movieOccurrenceTime}}</span>
            </p>
            <div class="btn-list" id="watchBtn" v-if="responseDataForMovie.extend">
              <button
                @click="watchedTheVideoMethod"
              >看过 {{responseDataForMovie.extend.movieHaveSeeAndWantTosee.haveSee}}</button>
              <button
                @click="iWantToWatchThat"
              >想看 {{responseDataForMovie.extend.movieHaveSeeAndWantTosee.wantToSee}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="movie-outline">
        <div class="common-title">
          <h5>故事简介</h5>
          <span class="downward-allow">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrow" />
            </svg>
          </span>
        </div>
        <div class="outlin-description-text">
          <p class="line-clamp">{{responseDataForMovie.movieSynopsis}}</p>
        </div>
      </div>
      <div class="part-actor-wrap">
        <div class="common-title">
          <h5>演员列表</h5>
          <span class="downward-allow">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrow" />
            </svg>
          </span>
        </div>
        <div class="show-actor-wrap">
          <ul class="part-actor">
            <!-- <img :src="responseDataForStar[0].starImg" alt="" style="width:200px;height:200px"> -->

            <li class="part-actor-cell" v-for=" (item,index) in responseDataForStar" :key="index">
              <a href="javascript:void(0);">
                <span
                  class="dispaly_actor_img"
                  v-bind:style="{backgroundImage: 'url('+item.starImg+')'}"
                ></span>
                <h6>{{item.chinaNameOfStar}}</h6>
                <h6>
                  <!-- <span>饰:</span> -->
                  {{item.englishNameOfStar}}
                </h6>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="star-for-the-movie" v-if="responseDataForExtend.movieHaveSeeAndWantTosee">
        <div class="module-title">
          <div class="module-title-left">评分</div>
          <div
            class="module-title-right"
          >共{{responseDataForExtend.movieHaveSeeAndWantTosee.wantToSee}}想看 {{responseDataForExtend.movieHaveSeeAndWantTosee.haveSee}}人看过</div>
        </div>

        <div class="module-content">
          <div class="star-conclusion">
            <p class="average-score">{{responseDataForExtend.movieScore}}</p>
            <span class="comment-number">{{responseDataForExtend.scoreLength}}人评论</span>
          </div>

          <div class="star-distribution-list-wrap" ref="starDistribution">
            <div class="star-distribution-list">
              <div class="star-distribution">
                <div class="star-symbot">
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                </div>
                <div class="star-bar">
                  <div class="class-bar-core"></div>
                </div>
                <div class="number-of-people">
                  <span>{{PeopleScoreOne}}</span>
                </div>
              </div>
            </div>
            <div class="star-distribution-list">
              <div class="star-distribution">
                <div class="star-symbot">
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                </div>
                <div class="star-bar">
                  <div class="class-bar-core"></div>
                </div>
                <div class="number-of-people">
                  <span>{{PeopleScoreTwo}}</span>
                </div>
              </div>
            </div>
            <div class="star-distribution-list">
              <div class="star-distribution">
                <div class="star-symbot">
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                </div>
                <div class="star-bar">
                  <div class="class-bar-core"></div>
                </div>
                <div class="number-of-people">
                  <span>{{PeopleScoreThree}}</span>
                </div>
              </div>
            </div>
            <div class="star-distribution-list">
              <div class="star-distribution">
                <div class="star-symbot">
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                </div>
                <div class="star-bar">
                  <div class="class-bar-core"></div>
                </div>
                <div class="number-of-people">
                  <span>{{PeopleScoreFour}}</span>
                </div>
              </div>
            </div>
            <div class="star-distribution-list">
              <div class="star-distribution">
                <div class="star-symbot">
                  <img
                    src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/star-not-graded.png"
                    alt
                  />
                </div>
                <div class="star-bar">
                  <div class="class-bar-core"></div>
                </div>
                <div class="number-of-people">
                  <span>{{PeopleScoreFive}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comment-area-wrap">
        <div class="common-title">
          <h5>评论</h5>
          <span class="downward-allow">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrow" />
            </svg>
          </span>
        </div>
        <article v-for="(item,index) in commentData_deep" :key="index">
          <div class="comment-area">
            <div class="comment-annotation">
              <div class="comment-annotation-top">
                <div class="annotation-left">
                  <div class="user-info">
                    <div class="useravator">
                      <img :src="item[5].userAvatar" alt />
                    </div>
                    <div class="user-id">{{item[5].userNetName}}</div>
                  </div>
                  <div class="user-comment-star">{{item[3].score |returnStar}}</div>
                </div>
                <div class="annotation-right">
                  <div class="comment-date">{{item[6]}}</div>
                </div>
              </div>
              <div class="comment-content">
                <p>{{item[1].comment}}</p>
                <div class="other-intertact">
                  <a href="javascript:void(0);">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-zantongfill" />
                    </svg>
                    {{item[2].supportTheCommnent}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
        <div class="tips">点击查看更多评论...</div>
        <LightHint :conorlDisplay="showRemainContent" :reminContentUseHTML="reminContentUseHTML"></LightHint>
      </div>
    </div>
    <FooterPage></FooterPage>
  </div>
</template>

<script>
import SearchBar from "./component/SearchBar";
import FooterPage from "./component/FooterPage";
import axios from "axios";
import URL from "@/serviceAPI.config";
import joinArr from "@/components/filters/joinArr";
import AddSpaceToinTheString from "@/components/filters/AddSpaceToinTheString";
import numberTranslateStar from "@/components/filters/numberTranslateStar";
import LightHint from "./component/LightHint";
import commonMethods from "./commonmethods/default";

export default {
  data() {
    return {
      videoImg: require("@/assets/image/22857bface4d3e8586c8f45858d4fa92662013.jpg"),
      starKey: 10001, // 这个是临时进行设置的.这个需要页面进行跳转 // 这个是电影ID

      responseDataForMovie: [],
      responseDataForStar: [],
      responseDataForUser: [],
      responseDataForExtend: [],
      PeopleAllSroceLength: 0,
      PeopleScoreOne: "", // 这里
      PeopleScoreTwo: "",
      PeopleScoreThree: "",
      PeopleScoreFour: "",
      PeopleScoreFive: "",
      commentData_deep: [], // 已经整理好的用户评论数据
      userData_deep: [],
      fillCommentData: [],
      firstEnterPage: true,

      // 验证用户登录变量
      checkUserLogin: undefined, // 确认用户是否已经登陆.
      saveDataAboutToken: undefined, // 存储用户的数据.用于验证用户登录
      userAccount: 0, // 存储用户的ID

      // 提示条
      showRemainContent: true, // 是否隐藏提示
      reminContentUseHTML: "请登录", //  提示内容
    };
  },
  components: {
    SearchBar,
    FooterPage,
    LightHint,
  },
  filters: {
    returnStar(likeNum) {
      return numberTranslateStar(likeNum);
    },
    arrToStr(arr) {
      return joinArr(arr);
    },
    addSpace(str) {
      return AddSpaceToinTheString(str);
    },
  },
  computed: {
    //计算属性
  },
  watch: {
    // 用来监控数据.当指定数据发生改变的时候去执行.
  },
  updated() {
    // 当页面数据发生改变的时候执行.
    let getVotes = this.$refs.starDistribution.getElementsByClassName(
      "star-bar"
    );
    console.log(getVotes);
    this.userVotesAnima(this.PeopleScoreOne, getVotes[0]);
    this.userVotesAnima(this.PeopleScoreTwo, getVotes[1]);
    this.userVotesAnima(this.PeopleScoreThree, getVotes[2]);
    this.userVotesAnima(this.PeopleScoreFour, getVotes[3]);
    this.userVotesAnima(this.PeopleScoreFive, getVotes[4]);
  },
  methods: {
    getMovieInfo() {
      // 请求数据
      axios
        .post(URL.getmoviedateil, {
          sendmajor: this.starKey,
        })
        .then((arg) => {
          console.log(arg);
          this.responseDataForMovie = arg.data.data; // 得到用户全部数据
          this.responseDataForStar = arg.data.data.starData; // 得到明星数据
          this.responseDataForUser = arg.data.data.userData; // 得到用户数据
          this.responseDataForExtend = arg.data.data.extend; // 得到电影扩展数据

          // console.log(this.responseDataForStar);
          // console.log(this.responseDataForUser);
          // console.log(this.responseDataForExtend);

          this.PeopleallGiveASroceLength(); // 计算出所有评分的人数.

          // 整合评论区的数据
          this.commentData_deep = this.deepCopy(
            this.responseDataForExtend.movieCommentFromUser,
            []
          ); // 深层拷贝用户评论数据
          console.log("评论区数据");
          console.log(this.responseDataForExtend.movieCommentFromUser);
          console.log(this.commentData_deep);
          this.userData_deep = this.deepCopy(this.responseDataForUser); // 深层拷贝用户数据
          this.commentDataTidy(this.userData_deep, this.commentData_deep); // 整合用户评论数据和用户数据.
        })
        .catch((err) => {
          console.log("请求失败");
          console.log(err);
        });
    },
    PeopleallGiveASroceLength() {
      // 计算出所有评分的人数
      let obj = this.responseDataForExtend.movieScoreList;
      for (let key in obj) {
        this.PeopleAllSroceLength += obj[key];
      }
      console.log(this.PeopleAllSroceLength);
      this.calculateUserPercentPre(obj, this.PeopleAllSroceLength); //计算完之后,计算出百分比
    },

    calculateUserPercentPre(obj, denominator) {
      // console.log(Object.keys(obj));
      for (let key in obj) {
        switch (
          key // 根据参数的不同,计算出不同的百分比
        ) {
          case "one":
            this.PeopleScoreOne = this.calculateUserPercent(
              obj.one,
              denominator,
              1
            );
            break;
          case "two":
            this.PeopleScoreTwo = this.calculateUserPercent(
              obj.two,
              denominator,
              2
            );
            break;
          case "three":
            this.PeopleScoreThree = this.calculateUserPercent(
              obj.three,
              denominator,
              3
            );
            break;
          case "four":
            this.PeopleScoreFour = this.calculateUserPercent(
              obj.four,
              denominator,
              4
            );
            break;
          case "five":
            this.PeopleScoreFive = this.calculateUserPercent(
              obj.five,
              denominator,
              5
            );
            break;
          case "six":
            break;
          default:
            console.log("err 434");
        }
      }
    },
    calculateUserPercent(numerator, denominator, rankNum) {
      let denominator_ = parseFloat(denominator);
      let numerator_ = parseFloat(numerator);
      if (isNaN(denominator_) || isNaN(numerator_)) {
        return "-";
      }
      let returnPercent =
        denominator_ <= 0
          ? "0%"
          : Math.round((numerator_ / denominator_) * 1000) / 10 + "%";
      return returnPercent;
    },
    deepCopy(src, dist_) {
      let dist = dist_ || {};
      for (var i in src) {
        if (typeof src[i] == "object") {
          //这里一定要初始化对象，不然传递null进去，没有对象指针，
          //无法将生成的对象赋值到dist[i]上
          dist[i] = src[i].constructor === Array ? [] : {};
          //递归执行，dist[i] 已经赋初始值
          this.deepCopy(src[i], dist[i]);
        } else {
          dist[i] = src[i];
        }
      }
      return dist;
    },
    // 整理数据函数
    commentDataTidy(userData, commentData) {
      console.log("用户数据开始");
      console.log(commentData);
      console.log(userData);
      console.log("用户数据结束");

      commentData.forEach((item, index) => {
        // 循环用户评论数据
        item.forEach((item_, index_, arr_) => {
          // 再循环用户数据
          // 查找出所需要的数据
          let saveUserId;
          let addCommentData;
          if (item_.commentUser) {
            // 查找到用户ID
            //查找出commentUser
            saveUserId = item_.commentUser;
            // console.log(item_.commentUser);
            //console.log(this.returnsUserDataBasedOnTheUserId(item_.commentUser, userData));
            item.push(
              this.returnsUserDataBasedOnTheUserId(item_.commentUser, userData)
            ); // 数组里面包对象有问题.涉及到数据库中的设计就是这样的.这里暂不修改.回头再看.
          }
          if (item_.addCommentData) {
            // 查找出时间.
            addCommentData = item_.addCommentData;
            item.push(this.changeDateFormateBaseOnNumber(item_.addCommentData)); // 得到转换的时间
            console.log(this.commentData_deep[0]);
          }
        });
      });
    },
    returnsUserDataBasedOnTheUserId(userid, data) {
      // 辅助整理数据的函数 => 整理出用户数据
      // 根据ID返回用户数据
      // 用户ID.总的数据,
      // console.log(userid);
      // console.log(data);
      for (let item in data) {
        // typeof data == object
        if (data[item].userAccount == userid) {
          // 进行循环
          return data[item];
          // console.log(data[item]);
        }
      }
    },
    // 转换用户日期
    changeDateFormateBaseOnNumber(number) {
      let transmateNum = parseInt(number); // 转换为数字.
      if (!(typeof transmateNum == "number")) {
        console.log("时间转换出错");
        return "-";
      }
      let dateFormat = new Date(transmateNum);
      let getYear = dateFormat.getFullYear();
      let getMonth = dateFormat.getMonth() + 1;
      let getDay = dateFormat.getDate();
      let returnStr = getYear + "-" + getMonth + "-" + getDay;
      return returnStr;
    },
    userVotesAnima(percent_, elementDom_) {
      let percent = parseFloat(percent_); // 百分比
      let domIncreaseInside = elementDom_.getElementsByClassName(
        "class-bar-core"
      )[0]; //里面的元素
      let domWrapWidth = parseInt(window.getComputedStyle(elementDom_).width); // 获得外部的宽度.
      let calculateWidth = (percent * domWrapWidth) / 100; // 根据比例获得宽度
      domIncreaseInside.style.width = calculateWidth + "px"; // 设置宽度
      console.log(calculateWidth);
    },

    // 用户点击已经看过要触发的事件.
    watchedTheVideoMethod() {
      // 首先需要确认用户是否已经登陆.
      if (!this.checkUserLogin) {
        commonMethods.ShowLoginTips(this, "<p>请登陆之后进行操作.</p>");
        console.log("用户没有登录");
        return false;
      }
      // 需要传递用户ID以及电影ID.
      axios
        .post(URL.watchedthemovie, {
          movieid: this.starKey,
          userid: this.userAccount,
        })
        .then((data) => {
          let temporaryVar = data.data;
          if (temporaryVar.code == 200) {
            commonMethods.ShowLoginTips(this, "<p>增加成功!</p>");
            this.changeMoiveExtentWatch("haveSee");
          } else if (temporaryVar.code == 300) {
            commonMethods.ShowLoginTips(
              this,
              "<p>远程服务器异常,请稍后重试</p>"
            );
          } else if (temporaryVar.code == 301) {
            commonMethods.ShowLoginTips(this, "<p>增加失败,请稍后重试</p>");
          } else if (temporaryVar.code == 302) {
            commonMethods.ShowLoginTips(this, "<p>参数有误</p>");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改看过与想看的人数
    changeMoiveExtentWatch(prope) {
      if (prope == "haveSee" || prope == "wantToSee") {
        this.responseDataForMovie.extend.movieHaveSeeAndWantTosee[prope] += 1;
      }
    },
    // 用户点击我想看要触发的事件.
    iWantToWatchThat() {
      if (!this.checkUserLogin) {
        commonMethods.ShowLoginTips(this, "<p>请登陆之后进行操作.</p>");
        console.log("用户没有登录");
        return false;
      }

      axios
        .post(URL.wanttowatchthemovie, {
          movieid: this.starKey,
          userid: this.userAccount,
        })
        .then((data) => {
          let temporaryVar = data.data;
          if (temporaryVar.code == 200) {
            // 添加到我的想看成功
            commonMethods.ShowLoginTips(
              this,
              "<p>添加到我的想看列表中成功</p>"
            );
            this.changeMoiveExtentWatch("wantToSee");
          } else if (temporaryVar.code == 201) {
            // 用户已经收藏
            commonMethods.ShowLoginTips(this, "<p>已经在您的收藏列表中啦</p>");
          } else if (temporaryVar.code == 300) {
            // 数据库发现错误
            commonMethods.ShowLoginTips(
              this,
              "<p>远程系统发现错误,请稍后重试</p>"
            );
          } else if (temporaryVar.code == 301) {
            //参数错误
            commonMethods.ShowLoginTips(
              this,
              "<p>请求参数检测到错误.请稍后刷新页面重试</p>"
            );
          } else if (temporaryVar.code == 302) {
            // 用户表中添加失败
            commonMethods.ShowLoginTips(
              this,
              "<p>添加到我的想看列表中失败.请稍后重试</p>"
            );
          } else if (temporaryVar.code == 303) {
            // 我的想看人数添加失败
            commonMethods.ShowLoginTips(
              this,
              "<p>添加到我的想看列表中成功.但是我的想看人数增加失败了</p>"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    //    this.getMovieInfo(); => 涉及到星星的增长动画
    console.log("电影代码");
    this.starKey = this.$route.query.moviecode || 10001;
    console.log();
    commonMethods.contratToken(
      function (state, data) {
        this.checkUserLogin = state;
        this.saveDataAboutToken = data;
        this.userAccount = localStorage.getItem("userID");
      }.bind(this)
    );
  },
  mounted() {
    // mount生命周期
    // this.PeopleallGiveASroceLength();
    // 不应该放在这里进行操作用户百分比的动态增长
    this.getMovieInfo();
  },
};
// 请求会执行两次 .这个先不管.
</script>

<style scoped>
/*  */
.movie-intro-mess-wrap {
  position: relative;
}
.movie-intro-mess-wrap .movie-intro-mess {
  flex-wrap: nowrap;
  width: 20rem;
  padding: 0.4rem;
  position: relative;
  /* color: white; */
  /* 如果没有设置定位，z-index是不管用的 */
  /* z-index: 66; */
}
.movie-intro-mess-wrap .movie-intro-mess .display-cover {
  height: 10rem;
  background-size: cover;
  position: relative;
}
.movie-intro-mess-wrap .movie-intro-mess .display-cover img {
  width: 100%;
}
.movie-intro-mess-wrap .movie-intro-mess .display-cover::after {
  content: "";
  display: block;
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 3rem;
  opacity: 1;
  width: 100%;
  background-image: -webkit-linear-gradient(
    bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );
}
.movie-intro-mess-wrap .movie-intro-mess::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url("//p0.meituan.net/148.208/movie/22857bface4d3e8586c8f45858d4fa92662013.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(50px);
  z-index: -99;
}
.movie-intro-mess-wrap .movie-intro-mess .intro-text-movie {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 0.4rem;
}
.movie-intro-mess-wrap .movie-intro-mess .intro-text-left {
  flex-basis: 50%;
  max-width: 50%;
  flex-grow: 1;
  flex-shrink: 0;
  /* overflow: hidden; */
}
.movie-intro-mess-wrap .movie-intro-mess p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  padding: 0.1rem 0;
}
.movie-intro-mess-wrap .movie-intro-mess h3 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  padding: 0.1rem 0;
}
.movie-intro-mess-wrap .movie-intro-mess span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  padding: 0.1rem 0;
}
.movie-intro-mess-wrap .movie-intro-mess h6 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  padding: 0.1rem 0;
}
.movie-intro-mess-wrap .movie-intro-mess .intro-text-right {
  flex-basis: 50%;
  max-width: 50%;
  flex-grow: 1;
  flex-shrink: 0;
  overflow: hidden;
}
.movie-intro-mess-wrap .movie-intro-mess .btn-list {
  padding-top: 0.4rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.4rem;
}
.movie-intro-mess-wrap .movie-intro-mess .btn-list button {
  flex: 50%;
  flex-grow: 1;
  height: 1.4rem;
  border-radius: 20px;
  border: none;
  background: var(--primary-embellish-color);
  color: var(--white-color);
}
.movie-intro-mess-wrap .movie-outline {
  padding: 0.6rem;
  font-size: 16px;
}
.common-title {
  padding: 0.4rem 0;
}
.common-title h5 {
  float: left;
  font-size: 0.8rem;
}
.common-title .downward-allow {
  float: right;
}
.common-title .downward-allow .icon {
  font-size: 1rem;
  /* svg是使用font-size进行设置的 */
  color: var(--primary-embellish-color);
}
.common-title::before,
.common-title::after {
  content: "";
  display: block;
  height: 0px;
  visibility: hidden;
  clear: both;
}

.movie-intro-mess-wrap .movie-outline .outlin-description-text {
  background: var(--secondary-bg-color);
}
.movie-intro-mess-wrap .movie-outline .outlin-description-text .line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-line-clamp: 5;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 各个属性之间的用处
  -webkit-box-orient 盒内元素的朝向 => 朝上
  这里做个标记,以后再来看这些东西 !! 20200805
   */
}
.movie-intro-mess-wrap .movie-outline .outlin-description-text p {
  font-weight: 400;
}

.movie-intro-mess-wrap .part-actor-wrap {
  width: 100%;
  padding: 0.6rem;
}
.movie-intro-mess-wrap .part-actor-wrap .show-actor-wrap {
  overflow-x: scroll;
  overflow-y: hidden;
}
.movie-intro-mess-wrap .part-actor-wrap .part-actor {
  display: inline-flex;
  /* 这里使用的是inline-flex
  他与flex的区别是.
    - 不会换行
    - 内部的元素是inline-block形式的
   */

  flex-direction: row;
  gap: 0.4rem;
}
.movie-intro-mess-wrap .part-actor-wrap .part-actor .part-actor-cell {
  text-align: center;
}
.movie-intro-mess-wrap .part-actor-wrap .part-actor .part-actor-cell a {
  display: block;
  background: var(--secondary-bg-color);
  color: var(--white-color);
  border-radius: 6px;
}
.movie-intro-mess-wrap .part-actor-wrap .part-actor .part-actor-cell a h6 {
  padding: 0.2rem;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.movie-intro-mess-wrap .part-actor-wrap .part-actor .part-actor-cell a h6 span {
  color: gainsboro;
  text-align: center;
}
.movie-intro-mess-wrap
  .part-actor-wrap
  .part-actor
  .part-actor-cell
  a
  .dispaly_actor_img {
  width: 84px;
  height: 84px;
  display: inline-block;
  /* background: url("https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/300x0/v2/https://flxt.tmsimg.com/v9/AllPhotos/223266/223266_v9_bb.jpg"); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
}

.movie-intro-mess-wrap .star-for-the-movie {
  padding: 0.4rem;
  /* background: palegreen; */
}

.movie-intro-mess-wrap .star-for-the-movie .module-title {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.4rem 0;
}

.movie-intro-mess-wrap .star-for-the-movie .module-title .module-title-left {
  flex-basis: 40%;
  flex-grow: 1;
  font-size: 0.8rem;
}
.movie-intro-mess-wrap .star-for-the-movie .module-title .module-title-right {
  flex-basis: 40%;
  flex-grow: 1;
  text-align: right;
  padding-right: 1rem;
}

.movie-intro-mess-wrap .star-for-the-movie .module-content {
  background: var(--secondary-bg-color);
  padding: 0.4rem;
}
.movie-intro-mess-wrap .star-for-the-movie .module-content::before,
.movie-intro-mess-wrap .star-for-the-movie .module-content::after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}

.movie-intro-mess-wrap .star-for-the-movie .module-content .star-conclusion {
  float: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  /* background: #ffb400; */
}
.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-conclusion
  .average-score {
  font-size: 2rem;
  color: var(--primary-embellish-color);
}
.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-conclusion
  .comment-number {
  color: var(--primary-embellish-color);
  font-size: 12px;
}

.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap {
  float: left;
  width: 50%;
}
.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap
  img {
  width: 0.4rem;
  height: 0.4rem;
}

.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap
  .star-distribution-list {
  padding: 0.2rem 0;
}
.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap
  .star-distribution-list
  .star-distribution {
  display: flex;
  flex-direction: row;
  /* background: pink; */
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.4rem;
}
.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap
  .star-distribution-list
  .star-distribution
  .star-symbot {
  font-size: 0px;
  text-align: right;
  flex-basis: 2rem;
}

.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap
  .star-distribution-list
  .star-distribution
  .star-bar {
  width: 4rem;
  height: 0.4rem;
  background: var(--line-color);
}
.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap
  .star-distribution-list
  .star-distribution
  .star-bar
  .class-bar-core {
  width: 0px;
  height: 100%;
  background: var(--primary-embellish-color);
  transition: all 1s;
}
.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap
  .star-distribution-list
  .star-distribution
  .number-of-people
  span {
  vertical-align: top;
}
.movie-intro-mess-wrap
  .star-for-the-movie
  .module-content
  .star-distribution-list-wrap
  .star-distribution-list
  .star-distribution
  .number-of-people {
  padding-left: 0.1rem;
  /* line-height:.4rem; */
  font-size: 0.4rem;
}

/* 评论区域 */

.comment-area-wrap {
  width: 20rem;
  padding: 0.4rem 0.4rem 1.2rem 0.4rem;
  /* background: pink; */
}
.comment-area-wrap article {
  padding: 0.6rem 0 0.4rem 1rem;
  border-bottom: 1px solid black;
}

.comment-area {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.comment-area .user-avatar {
  flex-basis: 10%;
  flex-grow: 1;
}
.comment-area .comment-annotation {
  flex-basis: 90%;
  flex-grow: 1;
}
.comment-area .comment-annotation .comment-annotation-top {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.4rem;
  align-items: center;
}
.comment-area .comment-annotation .comment-annotation-top .annotation-left {
  flex-basis: 50%;
  max-width: 10rem;
}
.comment-area
  .comment-annotation
  .comment-annotation-top
  .annotation-left
  .user-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.4rem;
  align-items: center;
}
.comment-area
  .comment-annotation
  .comment-annotation-top
  .annotation-left
  .user-info
  .useravator {
  border-radius: 50%;
  overflow: hidden;
  width: 2rem;
  height: 2rem;
}
.comment-area
  .comment-annotation
  .comment-annotation-top
  .annotation-left
  .user-comment-star {
  text-align: left;
  padding-left: 2.2rem;
}
.comment-area
  .comment-annotation
  .comment-annotation-top
  .annotation-left
  .user-info
  .useravator
  img {
  width: 2rem;
}
.comment-area
  .comment-annotation
  .comment-annotation-top
  .annotation-left
  .user-id {
  white-space: nowrap;
}
.comment-area .comment-annotation .comment-annotation-top .annotation-right {
  flex-basis: 50%;
  align-self: center;
  text-align: right;
}
.comment-area .comment-annotation .comment-content {
  padding-left: 1rem;
}
.comment-area .comment-annotation .comment-content .other-intertact {
  float: right;
  flex-basis: 50%;
}
.comment-area .comment-annotation .comment-content .other-intertact a {
  color: var(--primary-embellish-color);
}
.comment-area .comment-annotation .comment-content .other-intertact .icon {
  font-size: 0.6rem;
}
.comment-area-wrap .tips {
  text-align: center;
}
::-webkit-scrollbar {
  display: none;
  width: 0px;
  height: 0px;
}
/* 
致命BUG:v-bind:style="{'backgroundImage':'url('+responseDataForMovie.imgLinkOfMovie+')'}"

 */
</style>

