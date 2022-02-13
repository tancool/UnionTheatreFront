import axios from 'axios';
import URL from "@/serviceAPI.config";
axios.defaults.withCredentials = true;
let abc = 666; // 别的函数在回调函数中打印abc.并没有打印出来
export default {
    checkLoginState: function (callback) {
        // console.log(localStorage.getItem("userID"));
        if (localStorage.getItem("userID")) { // 如果存在用户,进行提醒
            return true;
        }
        return false;
    },
    ShowLoginTips: function (this_, showUserStr, callback) { // 用户提醒条
        // 这里没有办法再简化了.
        // 显示给用户提醒
        this_.reminContentUseHTML = showUserStr;
        this_.showRemainContent = false;
        clearTimeout(this_.timerUsingShow);
        (function (that) {
            // 这里使用的是闭包.函数持续引用外部的变量
            that.timerUsingShow = setTimeout(function () {
                that.showRemainContent = true;
                that.reminContentUseHTML = "";
                if (callback) {
                    callback();
                }
            }, 1500);
        })(this_);
    },
    contratToken: function (callback) { // 通用对比token的函数. callback有两个参数.第一个参数是状态值.第二个参数保存的是值
        let userAccout = localStorage.getItem("userID") || undefined;
        let userToken = localStorage.getItem("token") || undefined;

        if (!userAccout || !userToken) { // 如果两个之中有一个不存在,返回的结果就是true.
            if (callback) {
                callback(false, '');

            } else {
                return false;
            }
            return false;
        }
        axios
            .post(URL.contrastToken, { // 这里的参数是和localStorage相对应的.在这里写固定了.
                accout: userAccout,
                token: userToken,
            })
            .then((data) => {
                let reciveData = data.data;
                if (reciveData.code == 200) {
                    if (callback) {
                        callback(true, reciveData.data);
                        //========================================
                        // 函数在定义的时候也许定义域和函数作用域范围就已经指定了.
                        // 而this是在运行的时候才指定的.
                        // console.log('abc'+abc); // 而这个abc是可以打印出来的.
                        //========================================
                    } else {
                        return true;
                    }
                    // that.checkUserLogin = true;
                    // that.saveDataAboutToken = reciveData.data;
                } else if (reciveData.code == 400) { // 意外报错
                    if (callback) {
                        callback(false, reciveData.data);

                    }
                    else {
                        return false;
                    }
                } else if (reciveData.code == 500) { // 查询数据不存在
                    if (callback) {
                        callback(false, reciveData.data);

                    } else {
                        return false;
                    }
                }
            })
            .catch(
                (err) => {
                    console.log("对比token请求发生错误");
                    if (callback) {
                        callback(false, '');

                    } else {
                        return false;
                    }
                    return false;
                }
            );
    },
    detectScreenHeight: function (touchorgin, touchnow, callbackloading, callbackrefresh) {
        // 往下滑动是负数. 滑动到-40进行加载
        // console.log(touchnow - touchorgin)
        if (touchnow - touchorgin < -40) {
            let clientHeight =
                (document.documentElement && document.documentElement.clientHeight) ||
                window.innerHeight; // 可视区的高度

            let scrollHeight =
                (document.documentElement && document.documentElement.scrollHeight) ||
                document.body.scrollHeight; // 得到元素的高度

            let scrollTop =
                (document.documentElement && document.documentElement.scrollTop) ||
                window.scrollY; // scroll值


            if (scrollTop + clientHeight == scrollHeight) {
                //根据不同的参数确认不同的页数
                if (callbackloading) {
                    callbackloading();
                }
            }
        } else {
            console.log(touchnow - touchorgin);
            if (touchnow - touchorgin > 40) {
                console.log(touchnow - touchorgin);
                if (callbackrefresh) {
                    callbackrefresh();
                }
            }
        }

    }
};