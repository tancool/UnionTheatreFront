<template>
  <div class="banner-for-word">
    <div class="banner-wrap" id="banner-wrap">
      <ul
        id="banner-warp-ul"
        @touchstart="bannerTouchStart($event)"
        @touchmove="bannerTouchMove($event)"
        @touchend="bannerTouchEnd($event)"
        @transitionend="BannerTransitionEndEvent"
        @click="clickBanner"
      >
        <li>
          <img v-if="ImgAndText" :src="ImgAndText.bannerImgOne.url" alt />
          <!-- {{ImgAndText.bannerImgOne.url}} -->
        </li>
        <li>
          <img v-if="ImgAndText" :src="ImgAndText.bannerImgTwo.url" alt />
        </li>
        <li>
          <img v-if="ImgAndText" :src="ImgAndText.bannerImgThree.url" alt />
        </li>
        <li>
          <img v-if="ImgAndText" :src="ImgAndText.bannerImgOne.url" alt />
        </li>
      </ul>
      <div class="swiper-mask" id="swiper-mask">
        <h4
          class="mask-desiription-text"
          v-if="ImgAndText&&chooseDot=='0'"
        >{{ImgAndText.bannerImgOne.text}}</h4>
        <h4
          class="mask-desiription-text"
          v-if="ImgAndText&&chooseDot=='1'"
        >{{ImgAndText.bannerImgTwo.text}}</h4>
        <h4
          class="mask-desiription-text"
          v-if="ImgAndText&&chooseDot=='2'"
        >{{ImgAndText.bannerImgThree.text}}</h4>
        <ul id="swiper-dot">
          <!-- <li :class="[chooseDot =='active'?'active':'',chooseDot =='active'?'active!':'']"></li>
                可以使用多个三目表达式
          -->
          <li v-bind:class="[chooseDot=='0'?'active':'']"></li>
          <li v-bind:class="[chooseDot=='1'?'active':'']"></li>
          <li v-bind:class="[chooseDot=='2'?'active':'']"></li>
        </ul>
      </div>
    </div>
    <LightHint :conorlDisplay="showRemainContent" :reminContentUseHTML="reminContentUseHTML"></LightHint>
  </div>
</template>
<script>
import LightHint from "@/components/component/LightHint";
import commonMethods from "@/components/commonmethods/default";
export default {
  props: ["ImgAndText"],
  data() {
    return {
      // 以下是数据部分
      chooseDot: 0, // 控制小圆点
      bannerWrap: undefined,
      imgList: undefined,
      imgsElem: undefined,
      bannerDot: undefined,
      bannerDotChild: undefined,
      clientWidth: 0,
      XAxisNow: 0, // X轴现在的坐标.用于自动化
      chooseImgNow: 0, //现在选择的图片
      saveSetInterval: undefined,
      saveTouchStart: 0, // 存储用户点击的X轴
      saveMoveOffsetX: 0, // 存储中间点击的X轴位置
      saveTouchEnd: 0, // 最后落手的X轴位置

      saveUserTouchDistance: 0,
      bannerRundirection: 0,

      showRemainContent: true, // 是否隐藏提示
      reminContentUseHTML: "", //  提示内容
    };
  },
  methods: {
    // 初始化轮播图信息
    Baner() {
      var that = this; // 这里有一个重大的BUG,原因是因为在定时器下,会丢失this的指向
      this.bannerWrap = document.getElementById("banner-wrap");
      this.imgList = document.getElementById("banner-warp-ul");
      this.imgsElem = this.imgList.children;
      this.bannerDot = document.getElementById("banner-warp-ul");
      this.bannerDotChild = this.bannerDot.children;
      this.clientWidth = document.documentElement.clientWidth;
      // var XAxisNow = 0; // X轴坐标
      // var YAxisNow = 0; // Y轴坐标
      // var touchXAxisStrat = 0; //手指触摸的X轴坐标
      // var touchYAxisNow = 0; // 手指触摸的Y轴坐标
      // var chooseImgNow = 0; // 当前选中的图片
      // var saveSetInterval = undefined;
      this.BanderAutoplay();
      // function SwitchCover(exeAnimations) {
      //   //切换图执行的函数
      //   XAxisNow = -(chooseImgNow * clientWidth);
      //   imgList.style.transition = "transform 1.6s";
      //   imgList.style.transform = "translateX(" + XAxisNow + "px)";
      // }
    },

    BannerTransitionEndEvent() {
      if (this.chooseImgNow >= 3) {
        this.imgList.style.transition = "";
        this.imgList.style.transform = "";
      }
    },

    // 执行自动播放
    BanderAutoplay() {
      clearInterval(this.saveSetInterval);
      this.saveSetInterval = setInterval(
        function () {
          this.BanerControlImgNum(1);
        }.bind(this),
        2400
      );
    },
    // 控制数字
    BanerControlImgNum(derection) {
      derection > 0 ? this.chooseImgNow++ : this.chooseImgNow--;
      this.chooseImgNow = this.chooseImgNow <= 0 ? 0 : this.chooseImgNow;
      this.chooseImgNow = this.chooseImgNow % this.imgsElem.length; //写这一行的目的是为了控制不能等于四.以防万一.
      this.chooseDot = this.chooseImgNow % (this.imgsElem.length - 1);
      this.SwitchCover();
    },

    //切换图执行的函数
    SwitchCover() {
      this.XAxisNow = -(this.chooseImgNow * this.clientWidth);
      this.imgList.style.transition = "transform 1.6s";
      this.imgList.style.transform = "translateX(" + this.XAxisNow + "px)";
    },

    // 在触摸开始的时候,记录其初始坐标
    bannerTouchStart(event) {
      clearInterval(this.saveSetInterval);
      this.saveTouchStart = event.changedTouches[0].clientX;
    },

    // 持续移动的时候.修改其值.
    bannerTouchMove(event) {
      this.saveMoveOffsetX =
        event.changedTouches[0].clientX - this.saveTouchStart;
      // 在第一张图.向左滑动
      if (this.chooseImgNow == 0 && this.saveMoveOffsetX > 0) {
        return false;
      } else if (this.chooseImgNow == 3 && this.saveMoveOffsetX < 0) {
        return false;
      } else {
        this.imgList.style.transition = "";
        this.imgList.style.transform =
          "translateX(" + (this.XAxisNow + this.saveMoveOffsetX) + "px)";
      }
    },
    // 在结束移动的时候进行计算其位置.
    bannerTouchEnd(event) {
      // 重新开启定时器.
      if (this.chooseImgNow == 0 && this.saveMoveOffsetX > 0) {
        this.BanderAutoplay();
      } else if (this.chooseImgNow == 3 && this.saveMoveOffsetX < 0) {
        // 往右移动是禁止的
        this.BanderAutoplay();
      } else {
        if (this.saveMoveOffsetX > 100) {
          this.BanerControlImgNum(-1);
        } else if (this.saveMoveOffsetX < -100) {
          // 如果小于100.代表的是向右边移动
          this.BanerControlImgNum(1);
        } else {
          // 否则不执行数据的变化,而是直接进行动画过渡.
          this.BanerControlImgNum(1);
        }
        setTimeout(
          function () {
            this.BanderAutoplay();
          }.bind(this),
          300
        );
      }
    },
    clickBanner() {
      commonMethods.ShowLoginTips(
        this,
        "<p>轮播图按照自己的思路没有写好,已经学会正确的写法😂</p>"
      );
    },
  },
  mounted() {
    this.Baner();
  },
  components: {
    LightHint,
  },
};
</script>
<style scoped>
.banner-for-word {
  width: 20rem;
  height: 10rem;
  overflow: hidden;
  position: relative;
}
.banner-wrap {
  width: 400%;
  height: 100%;
}
.banner-wrap #banner-warp-ul {
  height: 100%;
}
.banner-wrap #banner-warp-ul li {
  width: 25%;
  height: 100%;
  float: left;
}
.banner-wrap #banner-warp-ul li img {
  width: 100%;
}
/* .banner-wrap #banner-warp-ul li:nth-of-type(1) {
  background: red;
}
.banner-wrap #banner-warp-ul li:nth-of-type(2) {
  background: green;
}
.banner-wrap #banner-warp-ul li:nth-of-type(3) {
  background: blue;
}
.banner-wrap #banner-warp-ul li:nth-of-type(4) {
  background: red;
} */
.banner-for-word .swiper-mask {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 3rem;
  opacity: 1;
  width: 100%;
  background-image: -webkit-linear-gradient(
    bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );
  /* 设置line-height => 对li也有用 */
}
.banner-for-word .swiper-mask .mask-desiription-text {
  padding: 0 0 0 0.6rem;
  flex-basis: 50%;
  line-height: 3rem;
  font-weight: border;
  font-size: 1rem;
  color: var(--primary-embellish-color);
}

.banner-for-word .swiper-mask ul {
  position: absolute;
  right: 1.2rem;
  bottom: 0.8rem;
}
.banner-for-word .swiper-mask ul li {
  float: left;
  width: 6px;
  height: 6px;
  margin: 0 6px;
  border-radius: 10px;
  background: white;
  opacity: 1;
}
.banner-for-word .swiper-mask ul .active {
  background: red;
}
</style>