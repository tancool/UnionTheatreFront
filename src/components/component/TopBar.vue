<template>
  <div class="top-bar-wrap">
    <div class="top-bar">
      <div class="left-btn" @click="triggerEvent">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow1" />
        </svg>
      </div>
      <div class="text-derection-at-content">{{title}}</div>
    </div>
    <div class="oder-category-list"></div>
    <div class="show-content"></div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    triggerEvent() {
      this.$emit("clickarrow");
    },
  },
};
</script>

<style  scoped>
.top-bar-wrap{
  position: fixed;
  top: 0px;
  width: 20rem;
  height: 48px;
  background: var(--primary-bg-color);
  z-index: 99;

}
.top-bar-wrap .top-bar {
  /* 
  这里会出现一个BUG,如果设置100%的会出现占不满全屏的问题.
  100%的取值是根据父级
   */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
  /* background: var(--secondary-bg-color); */
  padding: 0 0.4rem;
  height: 100%;
}
.top-bar-wrap .top-bar .left-btn {
  position: absolute;
  top: 50%;
  left: 0.6rem;
  transform: translateY(-50%);
}
.top-bar-wrap .top-bar .left-btn .icon{
  font-weight: border;
}
.top-bar-wrap .top-bar .text-derection-at-content {
  flex-basis: auto;
  flex-grow: 1;
  text-align: center;
  font-size: .8rem
}
</style>