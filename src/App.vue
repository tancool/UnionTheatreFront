<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    //mounted => 生命周期中可以操作DOM.
    var clientWidth = document.documentElement.clientWidth;
    var appElem = document.getElementById("app");

    if (clientWidth > 780) { // 如果屏幕宽度大于780增加的样式
      var sheets = document.styleSheets[0];
      // console.log(sheets);
      sheets.insertRule(
        "#app{display: flex;flex-direction: row;margin-left: auto;margin-right: auto;width: 780px;}",
        0
      );
      // sheets.insertRule("body{background-color: red;}", 0);
    }
  },
};
</script>

<style>
</style>
