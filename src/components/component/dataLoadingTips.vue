<template>
  <div>
    <div v-bind:class="[{'loading-hidden':finish},'loading-elem']">
      <p>下拉加载数据🚀🚀</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["finish"],
};
</script>

<style scoped>
.loading-elem {
  text-align: center;
  padding: 0.4rem;
}
.loading-hidden {
  display: none;
}
</style>