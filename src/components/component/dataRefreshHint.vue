<template>
  <div>
    <div v-bind:class="[{'refresh-hidden':!finish},'refresh-hint']">
      <p>松开刷新</p>
    </div>
  </div>
</template>

<script>
export default {
    props:['finish'],
};
</script>

<style scoped>
.refresh-hint {
  position: fixed;
  top: 140px;
  width: 100%;
  z-index: 999;
}
.refresh-hint p {
  text-align: center;
  background: var(--secondady-embellish-color);
}
.refresh-hidden {
  display: none;
}
</style>