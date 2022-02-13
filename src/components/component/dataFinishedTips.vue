<template>
  <div>
    <div v-bind:class="[{'finish-hidden':!finish},'finished-wrap']">
      <p>我真的见底啦🐷🐷</p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['finish'],
};
</script>

<style scoped>
.finished-wrap {
  text-align: center;
  padding: 0.4rem;
}
.finish-hidden{
    display: none;
}
</style>