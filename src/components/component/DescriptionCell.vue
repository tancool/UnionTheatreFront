<template>
  <div class="description-cell-wrap">
    <div class="description-cell-title">
      <div class="word-local-left">
        <h5>{{leftTitle}}</h5>
      </div>
      <div class="word-local-right">
        <p>{{rightTips}}</p>
      </div>
    </div>
    <div class="description-cell-content">
      <MovieCell v-for="(item,index) in transmitData" :key="index" :sendCellData="item"  :sendCellDataExtend="transmitDateExtend[index]"></MovieCell>
    </div>
  </div>
</template>

<script>
import MovieCell from "./MovieCell";
export default {
  props: ["leftTitle", "rightTips", "transmitData","transmitDateExtend"],
  data() {
    return {};
  },
  components: {
    MovieCell,
  },
};
</script>

<style scoped>
.description-cell-wrap {
  background-color: var(--primary-bg-color);
}
.description-cell-wrap .description-cell-title {
  height: 40px;
  /* border: 1px solid red; */
  /* background: white; */
  padding: 0.6rem 0;
  color: var(--whitegray-color);
}
.description-cell-wrap .description-cell-title::after,
.description-cell-wrap .description-cell-title::before {
  content: "";
  display: block;
  height: 0;
  overflow: hidden;
  clear: both;
}
.description-cell-wrap .description-cell-title .word-local-left {
  width: 50%;
  float: left;
}
.description-cell-wrap .description-cell-title .word-local-left h5 {
  height: 100%;
  line-height: 100%;
  font-size: 0.8rem;
  padding-left: 20px;
}
.description-cell-wrap .description-cell-title .word-local-right {
  width: 50%;
  float: left;
}
.description-cell-wrap .description-cell-title .word-local-right p {
  float: right;
  line-height: 100%;
  font-size: 0.8rem;
  padding-right: 20px;
}
.description-cell-content {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row;
  /* grid-template-columns: repeat(3, 1fr); */
  padding: 0.4rem;
  gap: 0.4rem;
}
</style>