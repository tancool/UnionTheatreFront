<template>
  <div class="advertiseHot" @click="openTheVoice($event)">
    <div ></div>
    <video :src="videoSrc" autoplay="autoplay" muted loop="loop"   ref="videoElem" @canplay="canplayVideo">
      <!-- html最新规范 : 必须要设置静音才可以自动播放 -->
      <source :src="videoSrc" type="vodep/mp4" />
    </video>
    <p v-bind:class="[voiceActive ? 'tips-for-hidden' : '', 'tips-for-user']">轻触视频即可开启或者关闭视频声音 :)</p>
  </div>
</template>

<script>
export default {
  props: ["videoSrc"],
  data() {
    return {
      voiceActive:false,
    //   videoSrc: require("../assets/video/tank-aebf53a172b780575aa07ca4f6b0bcc1.mp4"),
    };
  },
  methods:{
    openTheVoice(event){
      this.$refs.videoElem.muted = !this.$refs.videoElem.muted;
      this.voiceActive = true;
    },
    canplayVideo(){
      setTimeout(function(){
        this.voiceActive = true;
      }.bind(this),4000);
    }
  }
};
</script>
<style scoped>
.advertiseHot {
  width: 100%;
  position: relative;
}
.advertiseHot .shade {
  width: 100%;
  background: var(--text-color-dark);
  height: 100%;
  position: absolute;
  z-index: 10;
  opacity: 0.1;
}
.advertiseHot video {
  width: 100%;
  position: relative;
  /* 如果此元素不设置定位,就会把父元素[父元素属性设置为realtive.]的高给撑起来.(父元素没有设置高度) */
  z-index: 55;
}
.tips-for-user{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 99;
  padding: 10px;
  background: var(--primary-embellish-color);
  border-radius: 6px;
  white-space: nowrap;
}
.tips-for-hidden{
  display: none;
}
</style>