<template>
  <div class="index-page">
    <Skeleton v-show="dataLoading"></Skeleton>
    <div v-if="!dataLoading">
      <SearchBar></SearchBar>
      <Advertise :videoSrc="videoSrc"></Advertise>
      <DescriptionRow
        :transmitData="AttentionData"
        :transmitDateExtend="AttentionDataExtend"
        :describeTitle="DescriptionTitleForcomingSoon"
      ></DescriptionRow>
      <DescriptionCell
        :transmitData="willComingData"
        :leftTitle="DescriptionTitleForHot"
        :rightTips="DescriptionTipsForcomingSoon"
        :transmitDateExtend="willComingExtend"
      ></DescriptionCell>
      <Swiper :ImgAndText="BannerImgAndIcon.bannerImg"></Swiper>
      <DescriptionRow
        :transmitData="favorData"
        :transmitDateExtend="favorDataExtend"
        :describeTitle="DescriptionTitleForEvaluate"
      ></DescriptionRow>
      <FooterPage></FooterPage>
    </div>
  </div>
</template>

<script>
// import '../assets/css/default.css';
import SearchBar from "./component/SearchBar";
import Advertise from "./component/Advertise";
import DescriptionRow from "./component/DescriptionRow";
import DescriptionCell from "./component/DescriptionCell";
import Swiper from "./component/Swiper";
import FooterPage from "./component/FooterPage";
import axios from "axios";
import URL from "@/serviceAPI.config";
import Skeleton from "@/components/skleton/index";
export default {
  data() {
    return {
      hi: 123,
      videoSrc: "http://cdn.tanplay.com/hero.mp4",
      ScreenWidth: 0,
      // moiveImg: require("../assets/image/testbg.jpg"),
      DescriptionTitleForcomingSoon: "即将上映",
      DescriptionTitleForHot: "热度最高",
      DescriptionTipsForcomingSoon: "查看所有",
      DescriptionTitleForEvaluate: "最受好评",
      AttentionData: undefined, //热度数据
      AttentionDataExtend: undefined, // 热度数据扩展
      BannerImgAndIcon: {}, // 大图
      willComingData: undefined, //存储即将上映的数据
      willComingExtend: undefined, // 即将上映的扩展数据
      favorData: undefined, // 存储最受好评,
      favorDataExtend: undefined, //存储即将上映的扩展信息
      saveLimit: 9,
      dataLoading: true,
    };
  },
  components: {
    SearchBar,
    Advertise,
    DescriptionRow,
    DescriptionCell,
    Swiper,
    FooterPage,
    Skeleton,
  },
  created() {
    // 在这个周期与在MOUNTED生命周期操作ajax都是可以的.
    this.getAttentionImg();
    this.getBanner();
    this.getCellImg();
    this.getFavorData();
  },
  updated() {},
  methods: {
    // 获得热度图片
    getAttentionImg() {
      axios
        .get(URL.getMovies, {
          params: {
            searchKey: "",
            searchVal: "",
            descstr: "movieAttention",
            desc: -1,
            pages: 1,
            limit: this.saveLimit,
            csign: "attention",
          },
        })
        .then((arg) => {
          this.AttentionData = arg.data.data;
          this.AttentionDataExtend = arg.data.dataExtend;
          console.log(arg);
          // console.log(this.AttentionDataExtend);
        })
        .catch((err) => {
          // 提示用户数据发生错误
          console.log(err);
        });
    },

    // 获取Banner图片
    getBanner() {
      axios
        .get(URL.getMateralBG, {
          params: { csign: "banner" },
        })
        .then((arg) => {
          this.BannerImgAndIcon = arg.data.data;
          // console.log(this.BannerImgAndIcon.bannerImg.bannerImgOne);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取即将上映的数据
    getCellImg() {
      axios
        .get(URL.getMovies, {
          params: {
            searchKey: "",
            csign: "willcoming",
            limit: 9,
          },
        })
        .then((arg) => {
          this.willComingData = arg.data.data;
          this.willComingExtend = arg.data.dataExtend;
          console.log(this.willComingExtend);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取用户最喜欢的数据
    getFavorData() {
      axios
        .get(URL.getMovies, {
          params: {
            searchKey: "",
            csign: "favor",
            limit: 9,
          },
        })
        .then((arg) => {
          // console.log(arg);
          this.favorData = arg.data.data;
          this.favorDataExtend = arg.data.dataExtend;
          this.dataLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 可以操作DOM的时期.ajax也可以在这里
  },
};
</script>
<style scoped>
.index-page {
  padding-bottom: 50px;
}
</style>