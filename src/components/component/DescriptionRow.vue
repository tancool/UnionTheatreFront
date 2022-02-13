<template>
  <div>
    <div class="description-row-wrap">
      <div class="description-content-title">
        <div class="word-local-left">
          <h5>{{describeTitle}}</h5>
        </div>
        <div class="word-local-right">
          <p>查看全部</p>
        </div>
      </div>
      <div class="soon-movie-wrap">
        <div class="coming-soon-movie" id="comingsoonMovie">
          <MovieCell  v-for="(item,index) in transmitData" :key="index" :sendCellData="item" :sendCellDataExtend="transmitDateExtend[index]"></MovieCell>
          <!-- 这里不可以使用简写 -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import MovieCell from "./MovieCell";

export default {
  props: ["test", "transmitData","transmitDateExtend","describeTitle"], // 如果和数据不重名,这里并不会有拦截的情况发生.
  data() {
    return {};
  },
  mounted() {
    let CheckScreenWidth = document.documentElement.clientWidth;
    CheckScreenWidth = CheckScreenWidth > 750 ? 750 : CheckScreenWidth;
    // console.log(CheckScreenWidth * 3);
    // var getComingSoonMovieEl = document.getElementById("comingsoonMovie");
    // // console.log(document.styleSheets[0]);
    var getSheets = document.styleSheets[0];
    getSheets.insertRule(
      ".coming-soon-movie{width:" + CheckScreenWidth * 4 + "px}"
    );
  },
  components: {
    MovieCell,
  },
};
</script>

<style scoped>
.description-row-wrap {
  margin-top: -8px;
  padding-top: 0.6rem;
  border-radius: 10px;
  background-color: var(--secondary-bg-color);
  z-index: 999;
  position: relative;
  border: 1px solid var(--secondary-bg-color);
  padding-bottom: 0.1rem;
  width: 20rem;
  /* 这里如果不指定其宽度的话,此元素就会被子元素给撑开.  */
}
.description-content-title {
  height: 1.2rem;
  /* border: 1px solid red; */
  padding: 0 0 0.4rem 0;
  color: var(--whitegray-color);
}
.description-content-title .word-local-left {
  width: 50%;
  float: left;
}
.description-content-title .word-local-left h5 {
  height: 100%;
  line-height: 100%;
  font-size: 0.8rem;
  padding-left: 20px;
}
.description-content-title .word-local-right {
  width: 50%;
  float: left;
}
.description-content-title .word-local-right p {
  float: right;
  line-height: 100%;
  font-size: 0.8rem;
  padding-right: 20px;
}
.soon-movie-wrap {
  width: 100%;
  /* overflow: auto; */
  overflow-x: scroll;
  overflow-y: hidden;
}
.coming-soon-movie {
  /* height: 12rem; */
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* overflow: hidden; */
}
::-webkit-scrollbar {
  /* height: 0px; */
  /* width: 0px; */
}
</style>