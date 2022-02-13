<template>
  <div>
    <TopBar :title="title" v-on:clickarrow="skiptoPage"></TopBar>
    <div class="desription-card-content-wrap">
      <div class="desription-card-content-img">
        <div class="card">
          <p>我是一张介绍会员卡的图片</p>
        </div>
        <!-- <img src="http://ddbuy.7-orange.cn/img/vip.3a5e7fe3.png" alt /> -->
      </div>
      <div class="desription-word">
        <h3>即刻绑定您的信用卡</h3>
        <div class="desription-card-content-text">
          <div class="content-text-cell">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-movie" />
            </svg>
            <p>定期推送大片</p>
          </div>
          <div class="content-text-cell">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-vipicon" />
            </svg>
            <p>畅享蓝光影视</p>
          </div>
          <div class="content-text-cell">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tequan" />
            </svg>
            <p>特权专属服务</p>
          </div>
          <div class="content-text-cell">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dingyichetequan" />
            </svg>
            <p>设备寄修服务</p>
          </div>
        </div>
      </div>
      <div class="binding-card-button">
        <button @click="clickBtnRemind">即刻开通</button>
      </div>
    </div>

    <div class="usign-card-exchange">
      <div class="desription-word">
        <span>1</span>
        <h3>礼品卡可以免费兑换</h3>

        <div class="exchange-content-wrap">
          <div class="exchange-content-box">
            <h6>今日专享</h6>
            <div class="exchange-content-list">
              <div class="content-cell">
                <div class="content-cell-show-content">
                  <div class="show-price">
                    <span>￥</span>89
                  </div>
                  <div class="show-condition-one">以及抽取限量联盟玩偶</div>
                  <div class="show-condition-two">全时段全平台可用</div>
                </div>
                <div class="click-jump-link-about-the-ticket">立即领取</div>
              </div>
              <div class="content-cell">
                <div class="content-cell-show-content">
                  <div class="show-price">
                    <span>￥</span>89
                  </div>
                  <div class="show-condition-one">以及抽取限量联盟玩偶</div>
                  <div class="show-condition-two">全时段全平台可用</div>
                </div>
                <div class="click-jump-link-about-the-ticket">立即领取</div>
              </div>
            </div>
          </div>
          <div class="exchange-content-box">
            <h6>本周特惠</h6>
            <div class="exchange-content-list">
              <div class="content-cell">
                <div class="content-cell-show-content">
                  <div class="show-price">
                    <span>￥</span>89
                  </div>
                  <div class="show-condition-one">以及抽取限量联盟玩偶</div>
                  <div class="show-condition-two">全时段全平台可用</div>
                </div>
                <div class="click-jump-link-about-the-ticket">立即领取</div>
              </div>
              <div class="content-cell">
                <div class="content-cell-show-content">
                  <div class="show-price">
                    <span>￥</span>89
                  </div>
                  <div class="show-condition-one">以及抽取限量联盟玩偶</div>
                  <div class="show-condition-two">全时段全平台可用</div>
                </div>
                <div class="click-jump-link-about-the-ticket">立即领取</div>
              </div>
              <div class="content-cell">
                <div class="content-cell-show-content">
                  <div class="show-price">
                    <span>￥</span>89
                  </div>
                  <div class="show-condition-one">以及抽取限量联盟玩偶</div>
                  <div class="show-condition-two">全时段全平台可用</div>
                </div>
                <div class="click-jump-link-about-the-ticket">立即领取</div>
              </div>
              <div class="content-cell">
                <div class="content-cell-show-content">
                  <div class="show-price">
                    <span>￥</span>89
                  </div>
                  <div class="show-condition-one">以及抽取限量联盟玩偶</div>
                  <div class="show-condition-two">全时段全平台可用</div>
                </div>
                <div class="click-jump-link-about-the-ticket">立即领取</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LightHint :conorlDisplay="showRemainContent" :reminContentUseHTML="reminContentUseHTML"></LightHint>
  </div>
</template>

<script>
import TopBar from "@/components/component/TopBar";
import LightHint from "./component/LightHint";
import commonMethods from "./commonmethods/default";
export default {
  data() {
    return {
      title: "我的礼品卡",
      showRemainContent: true, // 是否隐藏提示
      reminContentUseHTML: "", //  提示内容
    };
  },
  methods: {
    clickBtnRemind() {
      commonMethods.ShowLoginTips(
        this,
        "<p>感谢您能够点击到这里查看.绑定用户信用卡界面并未设计</p>"
      );
    },
    skiptoPage() {
      this.$router.push({ name: "MyAccount" });
    },
  },
  components: {
    TopBar,
    LightHint,
  },
};
</script>

<style scoped>
/* 我的礼品卡 */
.desription-card-content-wrap {
}
.desription-card-content-wrap .desription-card-content-img {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 10rem;
}
.desription-card-content-wrap .desription-card-content-img .card {
  width: 80%;
  height: 80%;
  border: 2px solid #a7884a;
  border-radius: 20px;
  text-align: center;
  position: relative;
}
.desription-card-content-wrap .desription-card-content-img .card p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  white-space: nowrap;
  font-size: 1rem;
  color: #a7884a;
}
.desription-card-content-wrap .desription-card-content-img img {
  width: 100%;
}
.desription-word {
  padding: 0.4rem 0.4rem 0 0rem;
}
.desription-word h3 {
  font-weight: normal;
  display: inline-block;
}
.desription-word > span {
  background: var(--primary-embellish-color);
  text-align: center;
  height: 100%;
  padding: 0 0.1rem;
  border-radius: 4px;
  color: white;
}
.desription-card-content-wrap .desription-word .desription-card-content-text {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.6rem 0.4rem 0.2rem 0.4rem;
  gap: 0.4rem;
}
.desription-card-content-wrap
  .desription-word
  .desription-card-content-text
  div {
  flex-basis: 20%;
  flex-grow: 1;
}
.desription-card-content-wrap
  .desription-word
  .desription-card-content-text
  .content-text-cell {
  text-align: center;
  background: var(--secondary-bg-color);
}
.desription-card-content-wrap
  .desription-word
  .desription-card-content-text
  .content-text-cell
  svg {
  width: 1.4rem;
  height: 1.4rem;
  color: var(--primary-embellish-color);
}
.desription-card-content-wrap
  .desription-word
  .desription-card-content-text
  .content-text-cell
  p {
  white-space: nowrap;
  margin: 0.6rem 0;
}
.desription-card-content-wrap .binding-card-button {
  width: 100%;
  padding: 0 5rem 0.4rem 5rem;
}
.desription-card-content-wrap .binding-card-button button {
  width: 100%;
  border: none;
  border-radius: 20px;
  background: var(--primary-embellish-color);
  padding: 1.2rem 0;
  color: var(--white-color);
  font-size: 0.8rem;
  line-height: 0px;
}

.usign-card-exchange {
  padding: 0.4rem;
}
.usign-card-exchange .desription-word .exchange-content-wrap {
  padding: 0.4rem 0;
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box {
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box {
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  h6 {
  padding: 0.2rem 0;
  font-size: 14px;
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list {
  display: flex;
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 0.4rem;
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell {
  background: var(--primary-embellish-color);
  padding: 0.4rem 0 0.4rem 0.4rem;
  position: relative;
  border: 1px solid black;
  border-radius: 4px;
  border-left: 1px dashed black;
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell::before,
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell::after {
  content: "";
  display: block;
  height: 0px;
  visibility: hidden;
  clear: both;
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell
  .content-cell-show-content {
  float: left;
}

.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell
  .show-price {
  font-size: 1.4rem;
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell
  .show-price
  span {
  font-size: 1rem;
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell
  .show-condition-one {
}
.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell
  .show-condition-two {
  color: var(--black-color);
}

.usign-card-exchange
  .desription-word
  .exchange-content-wrap
  .exchange-content-box
  .exchange-content-list
  .content-cell
  .click-jump-link-about-the-ticket {
  float: right;
  writing-mode: vertical-lr;
  text-align: center;
  position: absolute;
  /* left: 0; */
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 0.2rem;
}
</style>