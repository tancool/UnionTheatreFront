const DEVELOPURL = "";
// const DEVELOPURL = "http://127.0.0.1:3000";
const BASEURL = "http://123.56.156.208:3000";
// const BASEURL = "http://127.0.0.1:3000";

const movieURL = '/movie';
const materal = '/materal';
const article = '/article';
const theaters = '/theaters';
const user = '/user';
const userorder = '/userorder';
const usercart = '/usercart';
const URL = {
    getMovies: BASEURL + movieURL + '/getmovie',
    getMateralBG: BASEURL + movieURL + '/getmateral',
    getMateral: BASEURL + materal + '/get',
    getArticle: BASEURL + article + '/getarticle',
    getTheaters: BASEURL + theaters + '/gettheaters',
    addtoshoppingcart: BASEURL + theaters + '/addtoshoppingcart',// 添加到购物车接口
    getmoviedateil: BASEURL + movieURL + '/getmoviedateil', // 获取电影详细信息
    watchedthemovie: BASEURL + movieURL + '/watchedthemovie', // 看过
    wanttowatchthemovie: BASEURL + movieURL + '/wanttowatchthemovie', // 我的想看
    getVertify: BASEURL + user + '/setVerifyCode',
    registerForphone: BASEURL + user + '/registeraccount',
    loginForAccount: BASEURL + user + '/loginForAccount',
    contrastToken: BASEURL + user + '/contrasttoken', // 对比token
    getAllOrder: BASEURL + userorder + '/allproduct', // 得到所有商品信息
    getSimpleMoviesMess: BASEURL + movieURL + '/getmoviesimplemess', // 根据电影ID.获得电影的信息
    getmyWants: BASEURL + movieURL + '/getmycollection', // 根据电影ID.获得电影的信息
    userBuyTicket: BASEURL + userorder + '/buyticket',// 用户购买电影的接口
    userCancelCollect: BASEURL + userorder + '/cancelcollect',//用户取消收藏的接口
    userShoppingCart: BASEURL + usercart + '/getusernotparmentinfo',//用户购物车接口
    settleAccounts: BASEURL + usercart + '/settleaccounts',//用户购物车接口
}
export default URL;

