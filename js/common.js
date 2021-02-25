$(function () {
    var ENV = myutil.getapi();//环境
    var isLogin = false;
    var scrolling = false;
    var before = $(window).scrollTop();
    init();

    // $(window).on('scroll', function () {
    //     if (!scrolling) {
    //         scrolling = true;
    //         (!window.requestAnimationFrame)
    //             ? setTimeout(autoHideHeader, 250)
    //             : requestAnimationFrame(autoHideHeader);
    //     }
    // });

    // function autoHideHeader() {
    //     var after = $(window).scrollTop();
    //     if (before < after) {
    //         console.log('上');
    //         $(".headerbox").slideUp(600);
    //         before = after;
    //     };
    //     if (before > after) {
    //         $(".headerbox").slideDown(600);
    //         before = after;
    //     };
    //     // var currentTop = $(window).scrollTop();
    //     //
    //     // ( belowNavHeroContent.length > 0 )
    //     //     ? checkStickyNavigation(currentTop) // secondary navigation below intro
    //     //     : checkSimpleNavigation(currentTop);
    //     //
    //     // previousTop = currentTop;
    //
    //     scrolling = false;
    // }

    //返回顶部
    $("#backtop").click(function () {
        $("body,html").animate({scrollTop: 0}, 500)
    });

//关闭顶部广告
    $(".indexclose").click(function () {
        $(".indexAdbox").hide();
        $("body").css("padding-top", "80px");
    });

    // 根据页面路径判断logo是否显示
    var HomePage = window.location.pathname;
    if (HomePage == "/") HomePage = "/index.html";
    if (HomePage.includes('activity')) HomePage = "/activity.html";
    if (HomePage.includes('notice')) HomePage = "/notice.html";
    if (HomePage.includes('/baike')) HomePage = "/baike.html";
    if (HomePage.includes('/news/')) HomePage = "/news.html";
    if (HomePage.includes('/support')) HomePage = "/support.html";
    if (HomePage.indexOf("index") > -1) {
        //    是移动端  跳移动端界面
        if (myutil.isMobile()) {
            window.location.href = myutil.getmobile(ENV);
        }
        //banner 区视频
        // var player = videojs('video', {
        //     muted: true,
        //     controls: false,
        //     autoplay: true,
        //     loop: true,
        //     preload: 'auto'
        // });
        var player2 = videojs('video2', {
            muted: true,
            controls: false,
            autoplay: true,
            loop: true,
            preload: 'auto'
        });
        var mySwiper = new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
                delay: 5000
            },
            watchOverflow: true,
            slideChangeTransitionStart: function () {
                player.pause();
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        // 鼠标覆盖停止自动切换与隐藏前进后退按钮
        mySwiper.el.onmouseover = function () {
            mySwiper.navigation.$nextEl.removeClass('hide');
            mySwiper.navigation.$prevEl.removeClass('hide');
            mySwiper.autoplay.stop();
        };
        // 鼠标覆盖停止自动切换与隐藏前进后退按钮
        mySwiper.el.onmouseout = function () {
            mySwiper.navigation.$nextEl.addClass('hide');
            mySwiper.navigation.$prevEl.addClass('hide');
            mySwiper.autoplay.start();
        };

        var mySwiper2 = new Swiper('.swiper-container2', {
            grabCursor: true,
            loop: true, // 循环模式选项
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

        });
        //鼠标覆盖停止自动切换与隐藏前进后退按钮
        mySwiper2.el.onmouseover = function () {
            mySwiper2.navigation.$nextEl.removeClass('hide');
            mySwiper2.navigation.$prevEl.removeClass('hide');
        }
        //鼠标覆盖停止自动切换与隐藏前进后退按钮
        mySwiper2.el.onmouseout = function () {
            mySwiper2.navigation.$nextEl.addClass('hide');
            mySwiper2.navigation.$prevEl.addClass('hide');
        };
        // if ($(".indexAdbox").length > 0) {
        //     $("body").css("padding-top", "145px");
        //     $(".indexAdbox").fadeIn();
        // } else {
        //     $("body").css("padding-top", "65px");
        // }

        //点击充值续费
        $(".refundList li").click(function () {
            if (isLogin) {
                window.location.href = "/xianniu/recharge.html"
            } else {
                $("#loginbtn").trigger("click");
            }
        })

        //    屏幕小于1500  首页右侧广告图隐藏
        let ClientWidth = document.body.clientWidth;
        if (ClientWidth >= 1500) {
            $(".index_right_adbox").removeClass("hide")
        }
    } else {
        // $(".headLogo").removeClass("noVisible");
        // $(".headerbox").removeClass("years");
    }

    //活动列表页面
    if (HomePage == "/activity.html" && $('#activityPage').length > 0 || HomePage.indexOf("index") > -1) {
        let nowtime = new Date().getTime();
        $(".activeList li").each(function (index, item) {
            let starttime = new Date($(this).attr('data-start-date')).getTime();
            let endtime = new Date($(this).attr('data-end-date')).getTime();
            if (starttime > nowtime) {
                $(this).find('.will').removeClass('hide').siblings().addClass('hide');
            } else if (nowtime > endtime) {
                $(this).find('.end').removeClass('hide').siblings().addClass('hide');
            } else {
                $(this).find('.ing').removeClass('hide').siblings().addClass('hide');
            }
        })
    }
    //游戏支持页面
    if (HomePage.includes('/support')) {
        $(".title_list").on("click", "li", function () {
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass("active");
            $(".con_list").find("section").eq(index).show().siblings().hide();
        })
    }

    //顶部导航颜色
    switch (HomePage) {
        case "/index.html":
            $(".indexNav").addClass("active").siblings().removeClass("active");
            break;
        case "/recharge.html":
            $(".rechargeNav").addClass("active").siblings().removeClass("active");
            break;
        case "/notice.html":
            $(".noticeNav").addClass("active").siblings().removeClass("active");
            break;
        case "/activity.html":
            $(".activityNav").addClass("active").siblings().removeClass("active");
            break;
        case "/baike.html":
            $(".helpNav").addClass("active").siblings().removeClass("active");
            break;
        case "/about.html":
            $(".aboutNav").addClass("active").siblings().removeClass("active");
            break;
        case "/news.html":
            $(".gameNav").addClass("active").siblings().removeClass("active");
            break;
        case "/support.html":
            $(".supportNav").addClass("active").siblings().removeClass("active");
            break;
    }

    //百科页面
    if (HomePage.includes('/baike')) {
        //列表页切换tab
        $(".baikeListRight_top li").click(function () {
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(".baikeListCon ul").eq(index).removeClass('hide').siblings().addClass('hide');
        });

        //搜索
        $("#searchBtn").click(function () {
            var searchval = $("#searchInput").val();
            window.location.href = myutil.getwww(ENV) + '/xianniu/baikesearch.html?sq=' + searchval;
        });

        //enter 搜索
        $("#searchInput").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#searchBtn").trigger("click");
            }
        });

        //关闭
        $(".baike_dialogBox_close").click(function () {
            $(".baike_mask").addClass('hide');
        });
        //教程无用
        $(".problem_no").click(function () {
            $(".baike_mask").removeClass('hide');
        });
        //教程有用
        $(".problem_yes").click(function () {
            var id = $(".noticeDetail_tit").attr("data-id");
            $.ajax({
                url: myutil.getdomin(ENV) + '/open/market/course/used',
                method: "POST",
                data: {course_id: id},
                success: function (res) {
                    if (res.code == 0) {
                        $(".baikeIsGoodBox .problem").text("评论成功，感谢您的参与！");
                        $(".baikeIsGoodBox .problem_num").removeClass('hide').find("span").text(res.data.used_num);
                        $(".baikeIsGoodBox .btn").hide();
                    } else {
                        alert(res.msg);
                    }
                }
            })
        });
        //搜索联想
        // var countries = [
        //     { value: 'Andorra', data: 'AD' },
        //     // ...
        //     { value: 'Zimbabwe', data: 'ZZ' }
        // ];

        $('#searchInput').autocomplete({
            serviceUrl: myutil.getdomin(ENV) + '/open/market/course/title',
            type: "GET",
            deferRequestBy: 500,
            paramName: 'keyword',
            params: {size: 10},
            deferRequestBy: 500,
            minChars: 2,
            transformResult: function (res, originalQuery) {
                var result = {
                    suggestions: []
                };
                var arr = JSON.parse(res).data;
                arr.forEach(function (item, index) {
                    result.suggestions.push({
                        "value": item
                    })
                });
                return result;
            },
        });

    }


//    呼出注册登录弹窗 1注册 2忘记密码  3登录
    var showtype = Number(myutil.getUrlParam('showtype'));

    if (showtype === 3) {
        $("#loginmask").show();
        $("body").addClass("overflow");
        openlogin();
    } else if (showtype === 1) {
        $("#loginmask").show();
        $("body").addClass("overflow");
        openreg();
    } else if (showtype === 2) {
        $("#loginmask").show();
        $("body").addClass("overflow");
        openforget();
    }

    $("#loginbtn").on("click", function () {
        $("#loginmask").show();
        $("body").addClass("overflow");
        openlogin();
    })
    $("#regbtn").on("click", function () {
        $("#loginmask").show();
        $("body").addClass("overflow");
        openreg();
    });

    function init() {
        myutil.gotouser(ENV);
        myutil.keepchannellink('.channelLink');
        var userInfo = myutil.getUserInfo();
        var token = myutil.getCookie('token') || myutil.getUrlParam('token');
        //判断是否登录设置头像
        if (token && userInfo != null && userInfo != '') {
            isLogin = true;
            $("#logined").removeClass('hide');
            $("#unlogined").addClass('hide');
            $("#nickname").text(userInfo.nickname);
            $("#avatar").attr("src", userInfo.avatar);
            document.getElementById('avatar').onerror = function () {
                $(this).attr('src', '/images/touxiang.png')
                this.onerror = null;
            };
            // $(".refundList li").attr("",)

        } else {
            isLogin = false;
            $("#logined").addClass('hide');
            $("#unlogined").removeClass('hide');
        }
    }

    //退出登录
    $('#loginout').click(function () {
        myutil.removeCookie('user_info', true);
        myutil.removeCookie('token', true);
        myutil.removeCookie('url_target', true);
        localStorage.removeItem('user_info');
        localStorage.removeItem('token');
        localStorage.removeItem('url_target');
        // location.reload();
        var myurl = window.location.origin + window.location.pathname;
        location.href = myurl;
    });

    //下载
    if ($('.client_download').length != 0) {
        $.get(myutil.getPicLink(ENV) + '/pc/download/config.json', function (data) {
            var from = myutil.getUrlParam('src_channel');
            var refer = myutil.getUrlParam('refer');
            if (from == '') from = 'guanwang';
            var downConfig = data.down_platform[from];
            if (!downConfig) {
                downConfig = data.down_platform['guanwang']
            }
            windowsDownloadUrl = downConfig.windows.download_url;
            if (refer && refer.length == 8) {
                var a = windowsDownloadUrl.split("pc");
                var b = windowsDownloadUrl.split("/");
                var c = b[b.length - 1].split(".exe");
                windowsDownloadUrl = a[0] + 'refer/pc' + a[1] + '?n=' + c[0] + '$' + refer + '$.exe';
            }
            $('.client_download').attr('href', windowsDownloadUrl);
        });
    }
    //  安卓下载
    if ($('.android_download').length != 0) {
        $.get(myutil.getPicLink(3) + '/android/download/config.json', function (data) {
            // var from = myutil.getUrlParam('src_channel');
            // var refer = myutil.getUrlParam('refer');
            androidDownloadUrl = data.xianniu.android.download_url;
            $('.android_download').attr('href', androidDownloadUrl);
        });
    }
    /**
     * 获取免费时长
     */
    var freetime = 5;
    if ($('.freeTimeInfo').length != 0) {
        $.ajax({
            url: myutil.getwww(ENV) + '/xianniu/niu.json',
            methods: 'GET',
            success: function (data) {
                freetime = data['public']['time'];
                $('.freeTimeInfo').text(freetime)
            },
            error: function (error) {
                $('.freeTimeInfo').text(freetime)
            }
        })
    }

    //添加统计代码
    // var _hmt = _hmt || [];
    // (function () {
    //     var hm = document.createElement("script");
    //     hm.src = "https://hm.baidu.com/hm.js?9ad507de3c55e6400ea52bf92b8e5b12";
    //     var s = document.getElementsByTagName("script")[0];
    //     s.parentNode.insertBefore(hm, s);
    // })();
    window._agl = window._agl || [];
    (function () {
        _agl.push(
            ['production', '_f7L2XwGXjyszb4d1e2oxPybgD']
        );
        (function () {
            var agl = document.createElement('script');
            agl.type = 'text/javascript';
            agl.async = true;
            agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(agl, s);
        })();
    })();

    (function () {
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
    //诸葛
    (function () {
        if (window.zhuge) return;
        window.zhuge = [];
        window.zhuge.methods = "_init identify track trackRevenue getDid getSid getKey setSuperProperty setUserProperties setWxProperties setPlatform".split(" ");
        window.zhuge.factory = function (b) {
            return function () {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(b);
                window.zhuge.push(a);
                return window.zhuge;
            }
        };
        for (var i = 0; i < window.zhuge.methods.length; i++) {
            var key = window.zhuge.methods[i];
            window.zhuge[key] = window.zhuge.factory(key);
        }
        window.zhuge.load = function (b, x) {
            if (!document.getElementById("zhuge-js")) {
                var a = document.createElement("script");
                var verDate = new Date();
                var verStr = verDate.getFullYear().toString() + verDate.getMonth().toString() + verDate.getDate().toString();

                a.type = "text/javascript";
                a.id = "zhuge-js";
                a.async = !0;
                a.src = 'https://zgsdk.zhugeio.com/zhuge.min.js?v=' + verStr;
                a.onerror = function () {
                    window.zhuge.identify = window.zhuge.track = function (ename, props, callback) {
                        if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
                            callback();
                        } else if (Object.prototype.toString.call(props) === '[object Function]') {
                            props();
                        }
                    };
                };
                var c = document.getElementsByTagName("script")[0];
                c.parentNode.insertBefore(a, c);
                window.zhuge._init(b, x)
            }
        };
        window.zhuge.load('611c7767eff1418393122082f71a8939', { //配置应用的AppKey
            superProperty: { //全局的事件属性(选填)
                '应用名称': '鲜牛官网'
            },
            adTrack: false,//广告监测开关，默认为false
            zgsee: false,//视屏采集开关， 默认为false
            autoTrack: true,
            //启用全埋点采集（选填，默认false）
            singlePage: false, //是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）
            visualizer: true  //可视化埋点开关
        });
    })();
});

////////////////////////公共代码/////////////////////
myutil = {
    /**
     * 获取api接口
     */
    getapi: function () {
        var domain = $('html').attr("domain");
        var result;
        if (domain.indexOf("dev-api") > -1) {
            result = 1;
        } else {
            result = 3;
        }
        return result;
    },
    /**
     * 获取www
     */
    getwww: function (ENV) {
        var wwwlinks = '';
        switch (ENV) {
            case 1:
                wwwlinks = "//dev-www.xianniu.com";
                break;
            case 2:
                wwwlinks = "//test-www.xianniu.com";
                break;
            case 4:
                wwwlinks = "//vf-www.xianniu.com";
                break;
            case 3:
                wwwlinks = "//www.xianniu.com";
                break;
        }
        return wwwlinks;
    },
    /**
     * 获取api
     */
    getdomin: function (ENV) {
        var dominlinks = '';
        switch (ENV) {
            case 1:
                dominlinks = "//dev-api.xianniu.com";
                break;
            case 2:
                dominlinks = "//test-api.xianniu.com";
                break;
            case 4:
                dominlinks = "//vf-api.xianniu.com";
                break;
            case 3:
                dominlinks = "//webapi.xianniu.com";
                break;
        }
        return dominlinks;
    },
    /***
     * 去用户中心
     */
    gotouser: function (ENV) {
        var userlinks = '';
        switch (ENV) {
            case 1:
                userlinks = "//dev-user.xianniu.com"
                break;
            case 2:
                userlinks = "//test-user.xianniu.com";
                break;
            case 4:
                userlinks = "//vf-user.xianniu.com";
                break;
            case 3:
                userlinks = "//user.xianniu.com";
                break;
        }
        $("#gotouser").attr("href", userlinks)
    },
    /***
     * 去移动端相应的页面
     */
    getmobile: function (ENV) {
        var waplinks = '';
        switch (ENV) {
            case 1:
                waplinks = "//dev-wap.xianniu.com";
                break;
            case 2:
                waplinks = "//test-wap.xianniu.com";
                break;
            case 4:
                waplinks = "//vf-wap.xianniu.com";
                break;
            case 3:
                waplinks = "//wap.xianniu.com";
                break;
        }
        return waplinks;
    },
    /***
     *  返回图片服务器的地址
     */
    getPicLink: function (ENV) {
        var piclinks = '';
        switch (ENV) {
            case 1:
                piclinks = "//dev-picture.xianniu.com";
                break;
            case 2:
                piclinks = "//test-picture.xianniu.com";
                break;
            case 4:
                piclinks = "//vf-picture.xianniu.com";
                break;
            case 3:
                piclinks = "//picture.xianniu.com";
                break;
        }
        return piclinks;
    },
    /**
     * 保持渠道信息
     * @param {*} classname
     */
    keepchannellink: function (classname) {
        var $channel = $(classname);
        var search = window.location.search;
        $channel.each(function (index, item) {
            var selfLink = item.href;
            $(this).attr('href', selfLink + search)
        })
    },
    /**
     * http 请求
     */
    gethttp: function (url, data, success) {
        $.ajax({
            type: "GET",
            url: baseurl + url,
            data: data,
            dataType: "json",
            success: success
        });
    },
    /**
     * 读取cookie
     * @param key
     * @param isDomain 是否读取跨域cookie
     */
    getCookie: function (key, isDomain) {
        var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        }
        return '';
    },

    getUserInfo: function () {
        var userInfoStr = this.getCookie('user_info');
        if (userInfoStr == '') return null;
        var userInfo = JSON.parse(userInfoStr);
        return userInfo;
    },

    /**
     * 设置cookie
     * @param key
     * @param cvalue
     * @param value 单位小时
     * @param isDomain 是否设置domain，解决跨域访问
     */
    setCookie: function (key, value, exdays, isDomain) {
        var cstr = key + "=" + value;
        // 时间
        if (exdays > 0) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
            var expires = "; expires=" + d.toUTCString();
            cstr = cstr + expires;
        }
        // 域名
        if (isDomain) {
            var domain = getDomain();
            // ProjectConfig.log('cookie设置的域名:' + domain);
            cstr = cstr + '; domain=' + domain;
        }
        //path
        cstr = cstr + '; path=/';
        document.cookie = cstr;
    },

    /**
     * 删除cookie
     * @param name
     */
    removeCookie: function (key, isDomain) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(key);
        if (cval != null && cval != '') {
            var cstr = key + "=" + '' + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            // 域名
            if (isDomain) {
                var domain = this.getDomain();
                cstr = cstr + '; domain=' + domain;
            }
            cstr = cstr + '; path=/';
            document.cookie = cstr;
        }
    },

    /**
     * 获取dommain，格式示例：.xianniu.com
     */
    getDomain: function () {
        var hostname = window.location.hostname;
        var hostList = hostname.split('.');
        var domain = '';
        for (var i = 1; i < hostList.length; i++) {
            domain = domain + '.' + hostList[i];
        }
        return domain;
    },

    /**
     * 读取地址栏参数
     * @param name
     */
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return '';
    },
    /**
     * 是不是移动端
     * @param name
     */
    isMobile: function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var is_mobile = false;
        if ((sUserAgent.match(/(ipod|iphone os|midp|ucweb|android|windows ce|windows mobile)/i))) {
            is_mobile = true;
        }
        return is_mobile;
    }
};
