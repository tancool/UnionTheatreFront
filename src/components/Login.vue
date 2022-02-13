<template>
  <div class="login-wrap" ref="loginWrap">
    <div class="login-box">
      <div class="login-title">
        <h6>登录</h6>
      </div>
      <div class="visibility-window">
        <div v-bind:class="[{'form-panel-switch-right':controlInterfaceMove},'form-panel-wrap']">
          <div class="form-panel-login-wrap">
            <div class="form-panel">
              <div class="login-bar">
                <span class="verify-code">手机号</span>
                <input type="text" placeholder="请输入五位以上的纯数字" v-model="createUserAccount" />
              </div>
              <div class="login-bar">
                <span class="verify-code">验证码</span>
                <input type="text" placeholder="请输入密码" v-model="createCertifyCode" />
                <span class="verify-btn" @click="reciveVerify">发送验证码</span>
              </div>
            </div>
            <div class="login-btn">
              <button @click="sendUserRegisterInfoForPhone">登录</button>
            </div>
          </div>
          <div class="form-panel-signup-wrap">
            <div class="form-panel">
              <div class="login-bar">
                <span class="verify-code">账号</span>
                <input type="text" placeholder="请输入账号" v-model="userAccount" />
              </div>
              <div class="login-bar">
                <span class="verify-code">密码</span>
                <input type="text" placeholder="请输入密码" v-model="userPass" />
                <span class="verify-btn" @click="forgetPass">忘记密码?</span>
              </div>
            </div>
            <div class="login-btn">
              <button @click="loginForAccount">密码登录</button>
            </div>
          </div>
        </div>
      </div>
      <div class="embellish-and-tips">
        <div class="login-options">
          <p ref="ControlInterFaceArea" @click="switchInterface">{{interFaceControlWord}}</p>
        </div>
        <div class="another-methods-login">
          <p>其他登陆方式</p>
        </div>
      </div>
      <div class="auxiliary-login">
        <div class="auxiliary method-one" @click="loginForWechat">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wechat" />
          </svg>
          <p>微信登陆</p>
        </div>

        <div class="auxiliary method-two" @click="loginForQQ">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_qq" />
          </svg>
          <p>QQ登陆</p>
        </div>
      </div>
      <div class="login-remand">
        <p>温馨提示</p>
        <p>
          未注册的手机号，登录时将自动注册
          <br />且代表同意
          <a href="javascript:#" @click="clickagreement">用户协议</a>
          <a href="javascript:#" @click="clickPrivacyPolicy">隐私策略</a>
        </p>
      </div>
      <a href="#" class="cancel-btn" @click="gobackPage">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-back" />
        </svg>
      </a>
            <div style="color: white;background: var(--primary-embellish-color);z-index: 29;">测试账号 : 7个7,密码是验证码.也可自由注册.</div>
      <p>小提示: <small>在您注册的时候,为了更快的体验效果.会在您注册之时,添加不多于40条的购物数据.不多于30条的想看数据.</small>您对此行为感到不舒服的话,可以登录公共账号:7个7.</p>
    </div>
    <div
      class="light-hint-wrap"
      v-bind:class="[{'light-hint-hidden':hiddenHintForCertify}]"
      @click="clickLightHintWrap"
      ref="lightHintWarp"
    >
      <div class="light-hint">
        <div class="wrap">
          <div>
            <p>--模拟短信验证码--</p>
            <p>您的验证码是:</p>
            <strong v-text="reciveCode"></strong>
          </div>
          <div>
            <p>有效时间 : {{takeEffectTime}}秒</p>
          </div>
          <div v-html="certifySendRemaidContent"></div>
          <div>
            <p>点击白色透明区域</p>
            <p>即可开始填写信息</p>
          </div>
          <div>
            <p style="text-decoration:underline">
              <strong>提醒</strong>:您正处于非安全网络环境下
            </p>
            <p style="font-style:italic">请勿填写任何真实信息</p>
          </div>
        </div>
      </div>
    </div>
    <LightHint :conorlDisplay="showRemainContent" :reminContentUseHTML="reminContentUseHTML"></LightHint>
</div>
</template>

<script>
import axios from "axios";
import URL from "@/serviceAPI.config";
import LightHint from "./component/LightHint";
import commonMethods from "./commonmethods/default";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      loginTitle: "登录",
      // clickBtnText: "切换账号密码登录",
      clientHeight: 0, //获得屏幕宽度
      interFaceControlWord: "切换到账号密码登录",
      controlInterfaceMove: false,

      showRemainContent: true, // 控制显示条隐藏于显示的变量
      reminContentUseHTML: "765", // 登录情况下给用户的提示.

      createUserAccount: "", // 用户输入的账号.默认手机
      userAccount: "100001", // 使用账号密码状态登录的账号
      // userPass: "hello world again😁", // 使用账号密码登录的密码
      userPass: "sas4f", // 使用账号密码登录的密码

      hiddenHintForCertify: true, // 用户获取验证码的提示条.
      reciveCode: "", // 服务器传过来的验证码
      createCertifyCode: "", // 用户输入的验证码
      CertifyTackEffect: false, // 验证码是否在生效期间
      takeEffectTime: 60, // 生效时间
      certifySendRemaidContent: "", // 重复点击的时候,给用户的提醒
      timer: undefined, // 控制时间的定时器
      timerUsingShow: undefined,

      checkUserLogin: undefined, //检查用户登录状态
      saveDataAboutToken: "", // 保存用户的数据
    };
  },
  methods: {
    getScreenData(arg) {
      return document.documentElement[arg];
      // 也可以使用fiex占满全屏
    },
    switchInterface() {
      this.controlInterfaceMove = !this.controlInterfaceMove;
      if (this.controlInterfaceMove) {
        this.interFaceControlWord = "切换到手机验证码登录";
      } else {
        this.interFaceControlWord = "切换到账号密码登录";
      }
    },
    reciveVerify() {
      // 接收验证码
      // 获得验证码的函数
      // 发送验证码
      if (!this.checkUserInput(this.createUserAccount)) {
        commonMethods.ShowLoginTips(
          this,
          "<p>请输入纯数字</p><p>数字位数大于5位就好了..</p>"
        );
        return false;
      }
      this.hiddenHintForCertify = !this.hiddenHintForCertify; // 控制class显示内容
      if (this.CertifyTackEffect) {
        // 如果验证码已经在s生效期间.仅进行提醒.
        this.certifySendRemaidContent = "<p>验证码正在生效期间</p>";
        return false;
      }
      axios
        .post(URL.getVertify)
        .then((data) => {
          // 已经获得验证码
          // console.log(data);
          this.reciveCode = data.data.data;
          this.CertifyTackEffect = true; //验证码正在生效期间
          this.timer = setInterval(() => {
            this.takeEffectTime--;
            if (this.takeEffectTime == 0) {
              // 验证码已经失效
              clearInterval(this.timer); // 清除定时器
              this.CertifyTackEffect = false;
              this.takeEffectTime = 60;
              this.certifySendRemaidContent = "";
              this.reciveCode = "";
              this.hiddenHintForCertify = true;
            }
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          // 发生意外错误的情况下全部还原
          clearInterval(this.timer); // 清除定时器
          this.CertifyTackEffect = false;
          this.takeEffectTime = 60;
          this.certifySendRemaidContent = "";
          this.reciveCode = "";
        });
    },

    sendUserRegisterInfoForPhone() {
      // 用户注册与手机登录
      // console.log(this.createUserAccount);
      if (!this.checkUserInput(this.createUserAccount)) {
        commonMethods.ShowLoginTips(
          this,
          "<p>请输入纯数字</p><p>数字位数大于5位就好了..</p>"
        );
        return false;
      }
      if (this.reciveCode == "") {
        // 如果没有接收验证码.
        commonMethods.ShowLoginTips(this, "<p>请获取验证码之后进行操作</p>");
        return false;
      }
      if (this.createCertifyCode != this.reciveCode) {
        commonMethods.ShowLoginTips(this, "<p>请输入正确的验证码</p>");
        return false;
      }
      axios
        .post(URL.registerForphone, {
          verifycode: this.createCertifyCode,
          accountform: this.createUserAccount,
          // certify == 证明
          // verify === 验证
        })
        .then((data) => {
          console.log(data);
          let returnResult = data.data;
          // console.log("===");
          // console.log(returnResult);
          if (returnResult.code == 302) {
            // 用户已经存在,执行跳转
            this.saveDataInLocal(returnResult);
            commonMethods.ShowLoginTips(
              this,
              "<p>登陆成功</p><p>正在跳转..</p>",
              function () {
                this.$router.go(-1); // 这里会丢失this的指向
                // 登录成功之后,同时往LocalStorage 里存储信息
              }.bind(this)
            ); // 这个是使用bind进行绑定this
          } else if (returnResult.code == 200) {
            // 注册成功
            this.saveDataInLocal(returnResult);
            commonMethods.ShowLoginTips(
              this,
              "<p>注册成功</p><p>正在跳转..</p>",
              function () {
                this.$router.go(-1);
              }.bind(this)
            );
          } else if (returnResult.code == 301) {
            //  位数小于八位
            commonMethods.ShowLoginTips(
              this,
              "<p>请输入纯数字</p><p>数字位数仅仅大于5位就好了..</p>"
            );
          } else if (returnResult.code == 300) {
            // 验证码错误
            commonMethods.ShowLoginTips(this, "<p>请输入正确的验证码</p>");
          } else if (returnResult.code == 400) {
            // 新用户插入失败.
            commonMethods.ShowLoginTips(
              this,
              "<p>注册账号失败</p><p>请稍后重试</p>"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkUserInput(str) {
      // 检查用户输入位数
      console.log(Number(str) && str.length < 5);
      if (Number(str) && str.length > 5) {
        return true;
      }
      return false;
    },
    forgetPass() {
      // 用户忘记密码的提示
      commonMethods.ShowLoginTips(
        this,
        "<p>统一使用一次性手机验证码登录</p><p>密码真的忘记了吗😁</p>"
      );
    },
    loginForAccount() {
      // 登陆账号
      let re = /\W+/g; // 正则表达式
      let account = this.userAccount.replace(re, ""); // 字符串的处理
      let pass = this.userPass.replace(re, ""); // 字符串的处理
      axios
        .post(URL.loginForAccount, {
          userCode: account,
          pass: pass,
        })
        .then((data) => {
          let reciveStateCode = data.data;
          console.log(reciveStateCode);
          if (reciveStateCode.code == 200) {
            // 登陆成功
            this.saveDataInLocal(reciveStateCode); // 登陆成功保存金localStorage
            commonMethods.ShowLoginTips(
              this,
              "<p>登陆成功</p>",
              function () {
                this.$router.go(-1);
              }.bind(this)
            );
          } else if (reciveStateCode.code == 300) {
            // 与账号要求符合
            commonMethods.ShowLoginTips(
              this,
              "<p>账号规范:</p><p>为纯数字</p>"
            );
          } else if (reciveStateCode.code == 301) {
            //查无此账号
            commonMethods.ShowLoginTips(
              this,
              "<p>查无此账号</p><p>请确认账号</p>"
            );
          } else if (reciveStateCode.code == 302) {
            // 密码错误
            commonMethods.ShowLoginTips(this, "<p>密码错误</p>");
          } else if (reciveStateCode.code == 303) {
            // 查询错误
            commonMethods.ShowLoginTips(
              this,
              "<p>系统正忙</p><p>请稍后重试</p>"
            );
          }
        })
        .catch((err) => {
          console.log(err);
          commonMethods.ShowLoginTips(
            this,
            "<p>请求正忙</p><p>请稍后再次重试</p>"
          );
        });
    },
    loginForWechat() {
      commonMethods.ShowLoginTips(this, "<p>未接入微信登录</p>");
    },
    loginForQQ() {
      commonMethods.ShowLoginTips(this, "<p>QQ登录也没有接入😂</p>");
    },
    clickagreement() {
      commonMethods.ShowLoginTips(this, "<p>用户使用协议界面未实现😂😂</p>");
    },
    clickPrivacyPolicy() {
      commonMethods.ShowLoginTips(this, "<p>隐私策略界面未实现😂😂😂 </p>");
    },
    clickLightHintWrap(event) {
      // 取消验证码背景显示
      if (event.target == this.$refs.lightHintWarp) {
        this.hiddenHintForCertify = true;
      }
    },

    gobackPage() {
      this.$router.push({name:"MyAccount"});
    },
    saveDataInLocal(returnResult) {
      // 登录成功之后保存进LocalStroge的信息
      localStorage.setItem("userID", returnResult.data.userAccount);
      // localStorage.setItem("userAvator", returnResult.data.userAvatar);
      // localStorage.setItem("userName", returnResult.data.userNetName);
      localStorage.setItem("token", returnResult.token); // 保存token
    },
    WhethereLogin() {
      console.log(localStorage.getItem("userID"));
      if (localStorage.getItem("userID")) {
      }
    },
  },
  mounted() {
    this.clientHeight = this.getScreenData("clientHeight");
    document.styleSheets[0].insertRule(
      ".login-wrap{height:" + this.clientHeight + "px}",
      0
    );
  },
  watch: {
    checkUserLogin: function (newVal, oldVal) {
      if (newVal) {
        commonMethods.ShowLoginTips(
          this,
          "<p>你已经登录过了</p>",
          function () {
            this.$router.go(-1);
          }.bind(this)
        );
      } else {
        console.log("用户没有登录,不做任何处理");
      }
    },
  },
  created() {
    commonMethods.contratToken(
      function (state, data) {
        this.checkUserLogin = state;
        this.saveDataAboutToken = data;
      }.bind(this)
    );
  },
  components: {
    LightHint,
  },
};
</script>

<style  scoped>
/*
// 也可以这样占满全屏
.login-wrap {
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-y;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("http://ddbuy.7-orange.cn/img/back2.a864ff79.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
*/

/* 轻提示代码开始 */
.light-hint {
  padding: 1rem;
  color: white;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.light-hint-hidden {
  display: none;
  visibility: hidden;
}
.light-hint .wrap div {
  padding: 0 0 0.2rem 0;
}
.light-hint .wrap div p {
  white-space: nowrap;
}
.light-hint-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(243, 232, 232, 0.2);
  z-index: 40;
}
/* 轻提示代码结束 */

.login-wrap .cancel-btn {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 1rem;
  height: 1rem;
}
.login-wrap .cancel-btn .icon {
  width: 1rem;
  height: 1rem;
  color: var(--primary-embellish-color);
  background: var(--primary-bg-color);
}
.login-wrap {
  width: 20rem;
  background-image: url("http://cdn.tanplay.com/bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
}
.login-wrap::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(11, 11, 13, 0.6);
  z-index: 10;
}
.login-wrap .login-box {
  width: 18rem;
  height: 22rem;
  border-radius: 20px;
  background: var(--primary-bg-color);
  opacity: 0.95;
  padding: 0.4rem 1rem 1rem 1rem;
  position: relative;
  z-index: 20;
}
.login-wrap .login-box .login-title {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: normal;
}
.login-wrap .login-box .login-title h6 {
  font-size: 1.2rem;
  font-weight: normal;
}
.form-panel-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* overflow-y: hidden; */
  /* overflow-x: scroll; */
  /* overflow: hidden; */
  /* gap: 1rem; */
  transition: all 0.8s;
}
.form-panel-switch-right {
  transform: translate(-16rem, 0);
}
.visibility-window {
  overflow: hidden;
}
.form-panel-wrap .form-panel-login-wrap {
  width: 16rem;
  flex-shrink: 0;
}
.form-panel-wrap .form-panel-signup-wrap {
  width: 16rem;
  flex-shrink: 0;
}
.login-wrap .form-panel {
  /* padding-bottom: 1rem; */
}
.login-wrap .form-panel .login-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* background-color: pink; */
  padding: 0.4rem 0.4rem 1rem 0.4rem;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.7rem;
}
.login-wrap .form-panel .login-bar .verify-code {
  white-space: nowrap;
  flex-basis: 4rem;
  flex-grow: 0;
  flex-shrink: 0;
}
.login-wrap .form-panel .login-bar input {
  border: none;
  background: var(--secondary-bg-color);
  height: 1.4rem;
  flex-grow: 1;
  width: 40%;
  border-radius: 10px;
  color: var(--white-color);
}
.login-wrap .form-panel .login-bar .verify-btn {
  background: var(--primary-embellish-color);
  padding: 0.1rem 0.1rem;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  /* font-size: 0.rem; */
  text-align: center;
}
.login-box .login-btn {
  width: 100%;
  text-align: center;
}
.login-box .login-btn button {
  width: 95%;
  border: none;
  padding: 0.8rem;
  font-size: 0.8rem;
  background: var(--primary-embellish-color);
  color: white;
  border-radius: 20px;
}

.login-wrap .embellish-and-tips {
  padding: 0.6rem 0;
}
.login-wrap .embellish-and-tips .login-options {
  padding: 0.4rem;
}
.login-wrap .embellish-and-tips .another-methods-login {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.login-wrap .embellish-and-tips .another-methods-login p {
  flex-basis: auto;
  padding: 0 0.4rem;
  /* 
  使用margin : 0 auto 居中的方式 => 必须是块级元素,且子元素必须指定其宽度
   */
}
.login-wrap .embellish-and-tips .another-methods-login::before {
  content: "";
  display: block;
  height: 1px;
  border-color: inherit;
  border-spacing: inherit;
  border-width: 1px 0 0;
  background: var(--primary-embellish-color);
  flex-basis: 1;
  flex-grow: 1;
  flex-basis: 33%;
}
.login-wrap .embellish-and-tips .another-methods-login::after {
  content: "";
  display: block;
  height: 1px;
  border-color: inherit;
  border-spacing: inherit;
  border-width: 1px 0 0;
  background: var(--primary-embellish-color);
  flex-basis: 1;
  flex-grow: 1;
  flex-basis: 33%;
}
.login-wrap .login-box .auxiliary-login {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
}
.login-wrap .login-box .auxiliary-login .auxiliary {
  text-align: center;
}
.login-wrap .login-box .auxiliary-login svg {
  width: 1rem;
  height: 1rem;
  color: var(--primary-embellish-color);
}
.login-wrap .login-remand {
  font-size: 14px;
}
.login-wrap .login-remand a {
  color: var(--primary-embellish-color);
}
</style>