import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import color from '@/components/color'
import Index from '@/components/Index';
import Attention from '@/components/Attention';
import Theaters from '@/components/Theaters';
import MyAccount from "@/components/MyAccount";
import MovieDetailInfo from "@/components/MovieDetailInfo";
import TopLevelRouter from "@/components/TopLevelRouter";
import Login from "@/components/Login";
import MyOrder from "@/components/MyOrder";
import MyCard from "@/components/MyCard";
import MyWants from "@/components/MyWants";
import MyWallet from "@/components/MyWallet";

Vue.use(Router)


export default new Router({
  // mode:"history",
  routes: [
    {
      // 主菜单
      path: '/',
      name: 'main',
      components: {
        default: TopLevelRouter,
      },
      children: [
        {
          // 首页页面
          path: "/",
          name: "Index",
          component: Index,
        },
        {
          // 都在看
          path: '/attention',
          name: "attention",
          component: Attention,
        },
        {
          // 购票
          path: '/theaters',
          name: "theaters",
          component: Theaters,
        },
        {
          // 我的票夹夹
          path: '/MyWallet',
          name: "MyWallet",
          component: MyWallet,
        },
        {
          // 我的账户页面
          path: '/myaccount',
          name: "MyAccount",
          component: MyAccount,
        },

      ]
    },
    {
      // 注册页面
      path: '/login',
      name: "login",
      component: Login,
    },
    {
      // 电影详情页面
      path: '/moviedetail',
      name: "MovieDetailInfo",
      component: MovieDetailInfo,
    },
    {
      // 我的订单页面
      path: '/myorder',
      name: "MyOrder",
      component: MyOrder,
    },
    {
      //我的优惠卡页面
      path: '/MyCard',
      name: "MyCard",
      component: MyCard,
    },
    {
      // 我的想看页面
      path: '/MyWants',
      name: "MyWants",
      component: MyWants,
    },

  ]
})

// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
