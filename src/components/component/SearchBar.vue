<template>
  <div>
    <div class="header">
      <div class="contaion-bar">
        <div class="logo" @click="welcome">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-movie-fill" />
          </svg>
        </div>
        <div class="srearch-bar">
          <div class="embellish-input">
            <div class="input-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo" />
              </svg>
            </div>
            <div class="input-content">
              <input type="text" placeholder="欢迎使用联盟大剧院" />
            </div>
          </div>
        </div>
        <div class="gamer" @click="welcome">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-server" />
          </svg>
        </div>
      </div>
    </div>
    <LightHint :conorlDisplay="showRemainContent" :reminContentUseHTML="reminContentUseHTML"></LightHint>
  </div>
</template>

<script>
// 顶部导航条
import LightHint from "@/components/component/LightHint";
import commonMethods from "@/components/commonmethods/default";
export default {
  data() {
    return {
      showRemainContent: true, // 是否隐藏提示
      reminContentUseHTML: "", //  提示内容
    };
  },
  methods: {
    welcome() {
      console.log(123);
      commonMethods.ShowLoginTips(this, "<p>欢迎使用联盟大剧院</p>");
    },
  },
  components:{
    LightHint,
  }
};
</script>
<style scoped>
.contaion-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-bg-color);
}
.logo {
  width: 3rem;
  max-width: 14rem;
  padding: 4px;
  text-align: center;
}
.logo .icon {
  width: 1.6rem;
  height: 1.6rem;
  color: var(--primary-embellish-color);
}

.srearch-bar {
  max-width: 14rem;
  width: 14rem;
  position: relative;
  height: 100%;
}
.srearch-bar .embellish-input {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 1.4rem;
  width: 90%;
  background: white;
  border-radius: 20px;
}
.srearch-bar .embellish-input .input-icon {
  float: left;
  width: 15%;
  text-align: center;
  height: 100%;
  text-align: center;
}
.srearch-bar .embellish-input .input-icon svg {
  display: inline-block;
  width: 20px;
  height: 100%;
}
.srearch-bar .embellish-input .input-content {
  float: left;
  width: 70%;
  text-align: center;
  height: 100%;
  overflow: hidden;
}

.srearch-bar .embellish-input .input-content input {
  border: none;
  outline: none;
  border-radius: 5px;
  width: 100%;
  height: 100%;
}

.contaion-bar .gamer {
  width: 3rem;
  max-width: 3rem;
  text-align: center;
}
.contaion-bar .gamer .icon {
  width: 1.6rem;
  height: 1.6rem;
  color: var(--secondady-embellish-color);
  /* display: inline-block;
  width: 44px;
  height: 100%; */
}
</style>