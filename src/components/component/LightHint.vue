<template>
  <div>
    <div v-bind:class="['light-hint',{'light-hint-hidden':conorlDisplay}]">
      <div class="wrap" v-html="reminContentUseHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
    // hiddenHintForInput => 
  props: ["conorlDisplay", "reminContentUseHTML"],
  data() {
    return {
      //   hiddenHintForInput: false,
      //   renderInputContentErr: "text",
    };
  },
};
</script>

<style  scoped>
.light-hint {
  padding: 1rem;
  color:var(--white-color);
  border-radius: 8px;
  background: rgba(229, 53, 62, 0.9);
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 99999;
}
.light-hint .wrap div {
  padding: 0 0 0.2rem 0;
}
.light-hint .wrap div p {
  white-space: nowrap;
}

.light-hint-hidden {
  display: none;
  visibility: hidden;
}
</style>