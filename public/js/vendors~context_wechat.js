(window.webpackJsonp=window.webpackJsonp||[]).push([["vendors~context_wechat"],{"./node_modules/weixin-js-sdk/index.js":
/*!*********************************************!*\
  !*** ./node_modules/weixin-js-sdk/index.js ***!
  \*********************************************/
/*! no static exports found */function(module,exports){eval('! function (e, n) {\n  module.exports = n(e)\n}(window, function (e, n) {\n  function i(n, i, t) {\n    e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i),\n    function(e) {\n      c(n, e, t)\n    }) : u(n, t)\n  }\n  function t(n, i, t) {\n    e.WeixinJSBridge ? WeixinJSBridge.on(n,\n    function(e) {\n      t && t.trigger && t.trigger(e),\n      c(n, e, i)\n    }) : t ? u(n, t) : u(n, i)\n  }\n  function o(e) {\n    return e = e || {},\n    e.appId = C.appId,\n    e.verifyAppId = C.appId,\n    e.verifySignType = "sha1",\n    e.verifyTimestamp = C.timestamp + "",\n    e.verifyNonceStr = C.nonceStr,\n    e.verifySignature = C.signature,\n    e\n  }\n  function r(e) {\n    return {\n      timeStamp: e.timestamp + "",\n      nonceStr: e.nonceStr,\n      package: e.package,\n      paySign: e.paySign,\n      signType: e.signType || "SHA1"\n    }\n  }\n  function a(e) {\n    return e.postalCode = e.addressPostalCode,\n    delete e.addressPostalCode,\n    e.provinceName = e.proviceFirstStageName,\n    delete e.proviceFirstStageName,\n    e.cityName = e.addressCitySecondStageName,\n    delete e.addressCitySecondStageName,\n    e.countryName = e.addressCountiesThirdStageName,\n    delete e.addressCountiesThirdStageName,\n    e.detailInfo = e.addressDetailInfo,\n    delete e.addressDetailInfo,\n    e\n  }\n  function c(e, n, i) {\n    "openEnterpriseChat" == e && (n.errCode = n.err_code),\n    delete n.err_code,\n    delete n.err_desc,\n    delete n.err_detail;\n    var t = n.errMsg;\n    t || (t = n.err_msg, delete n.err_msg, t = s(e, t), n.errMsg = t),\n    (i = i || {})._complete && (i._complete(n), delete i._complete),\n    t = n.errMsg || "",\n    C.debug && !i.isInnerInvoke && alert(JSON.stringify(n));\n    var o = t.indexOf(":");\n    switch (t.substring(o + 1)) {\n    case "ok":\n      i.success && i.success(n);\n      break;\n    case "cancel":\n      i.cancel && i.cancel(n);\n      break;\n    default:\n      i.fail && i.fail(n)\n    }\n    i.complete && i.complete(n)\n  }\n  function s(e, n) {\n    var i = e,\n    t = v[i];\n    t && (i = t);\n    var o = "ok";\n    if (n) {\n      var r = n.indexOf(":");\n      "confirm" == (o = n.substring(r + 1)) && (o = "ok"),\n      "failed" == o && (o = "fail"),\n      -1 != o.indexOf("failed_") && (o = o.substring(7)),\n      -1 != o.indexOf("fail_") && (o = o.substring(5)),\n      "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"),\n      "config" == i && "function not exist" == o && (o = "ok"),\n      "" == o && (o = "fail")\n    }\n    return n = i + ":" + o\n  }\n  function d(e) {\n    if (e) {\n      for (var n = 0,\n      i = e.length; n < i; ++n) {\n        var t = e[n],\n        o = h[t];\n        o && (e[n] = o)\n      }\n      return e\n    }\n  }\n  function u(e, n) {\n    if (! (!C.debug || n && n.isInnerInvoke)) {\n      var i = v[e];\n      i && (e = i),\n      n && n._complete && delete n._complete,\n      console.log(\'"\' + e + \'",\', n || "")\n    }\n  }\n  function l(e) {\n    if (! (k || w || C.debug || x < "6.0.2" || V.systemType < 0)) {\n      var n = new Image;\n      V.appId = C.appId,\n      V.initTime = A.initEndTime - A.initStartTime,\n      V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime,\n      N.getNetworkType({\n        isInnerInvoke: !0,\n        success: function(e) {\n          V.networkType = e.networkType;\n          var i = "https://open.weixin.qq.com/sdk/report?v=" + V.version + "&o=" + V.isPreVerifyOk + "&s=" + V.systemType + "&c=" + V.clientVersion + "&a=" + V.appId + "&n=" + V.networkType + "&i=" + V.initTime + "&p=" + V.preVerifyTime + "&u=" + V.url;\n          n.src = i\n        }\n      })\n    }\n  }\n  function p() {\n    return (new Date).getTime()\n  }\n  function f(n) {\n    T && (e.WeixinJSBridge ? n() : S.addEventListener && S.addEventListener("WeixinJSBridgeReady", n, !1))\n  }\n  function m() {\n    N.invoke || (N.invoke = function(n, i, t) {\n      e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t)\n    },\n    N.on = function(n, i) {\n      e.WeixinJSBridge && WeixinJSBridge.on(n, i)\n    })\n  }\n  function g(e) {\n    if ("string" == typeof e && e.length > 0) {\n      var n = e.split("?")[0],\n      i = e.split("?")[1];\n      return n += ".html",\n      void 0 !== i ? n + "?" + i: n\n    }\n  }\n  if (!e.jWeixin) {\n    var h = {\n      config: "preVerifyJSAPI",\n      onMenuShareTimeline: "menu:share:timeline",\n      onMenuShareAppMessage: "menu:share:appmessage",\n      onMenuShareQQ: "menu:share:qq",\n      onMenuShareWeibo: "menu:share:weiboApp",\n      onMenuShareQZone: "menu:share:QZone",\n      previewImage: "imagePreview",\n      getLocation: "geoLocation",\n      openProductSpecificView: "openProductViewWithPid",\n      addCard: "batchAddCard",\n      openCard: "batchViewCard",\n      chooseWXPay: "getBrandWCPayRequest",\n      openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",\n      startSearchBeacons: "startMonitoringBeacons",\n      stopSearchBeacons: "stopMonitoringBeacons",\n      onSearchBeacons: "onBeaconsInRange",\n      consumeAndShareCard: "consumedShareCard",\n      openAddress: "editAddress"\n    },\n    v = function() {\n      var e = {};\n      for (var n in h) e[h[n]] = n;\n      return e\n    } (),\n    S = e.document,\n    I = S.title,\n    y = navigator.userAgent.toLowerCase(),\n    _ = navigator.platform.toLowerCase(),\n    k = !(!_.match("mac") && !_.match("win")),\n    w = -1 != y.indexOf("wxdebugger"),\n    T = -1 != y.indexOf("micromessenger"),\n    M = -1 != y.indexOf("android"),\n    P = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"),\n    x = function() {\n      var e = y.match(/micromessenger\\/(\\d+\\.\\d+\\.\\d+)/) || y.match(/micromessenger\\/(\\d+\\.\\d+)/);\n      return e ? e[1] : ""\n    } (),\n    A = {\n      initStartTime: p(),\n      initEndTime: 0,\n      preVerifyStartTime: 0,\n      preVerifyEndTime: 0\n    },\n    V = {\n      version: 1,\n      appId: "",\n      initTime: 0,\n      preVerifyTime: 0,\n      networkType: "",\n      isPreVerifyOk: 1,\n      systemType: P ? 1 : M ? 2 : -1,\n      clientVersion: x,\n      url: encodeURIComponent(location.href)\n    },\n    C = {},\n    L = {\n      _completes: []\n    },\n    B = {\n      state: 0,\n      data: {}\n    };\n    f(function() {\n      A.initEndTime = p()\n    });\n    var O = !1,\n    E = [],\n    N = {\n      config: function(e) {\n        C = e,\n        u("config", e);\n        var n = !1 !== C.check;\n        f(function() {\n          if (n) i(h.config, {\n            verifyJsApiList: d(C.jsApiList)\n          },\n          function() {\n            L._complete = function(e) {\n              A.preVerifyEndTime = p(),\n              B.state = 1,\n              B.data = e\n            },\n            L.success = function(e) {\n              V.isPreVerifyOk = 0\n            },\n            L.fail = function(e) {\n              L._fail ? L._fail(e) : B.state = -1\n            };\n            var e = L._completes;\n            return e.push(function() {\n              l()\n            }),\n            L.complete = function(n) {\n              for (var i = 0,\n              t = e.length; i < t; ++i) e[i]();\n              L._completes = []\n            },\n            L\n          } ()),\n          A.preVerifyStartTime = p();\n          else {\n            B.state = 1;\n            for (var e = L._completes,\n            t = 0,\n            o = e.length; t < o; ++t) e[t]();\n            L._completes = []\n          }\n        }),\n        m()\n      },\n      ready: function(e) {\n        0 != B.state ? e() : (L._completes.push(e), !T && C.debug && e())\n      },\n      error: function(e) {\n        x < "6.0.2" || ( - 1 == B.state ? e(B.data) : L._fail = e)\n      },\n      checkJsApi: function(e) {\n        var n = function(e) {\n          var n = e.checkResult;\n          for (var i in n) {\n            var t = v[i];\n            t && (n[t] = n[i], delete n[i])\n          }\n          return e\n        };\n        i("checkJsApi", {\n          jsApiList: d(e.jsApiList)\n        },\n        (e._complete = function(e) {\n          if (M) {\n            var i = e.checkResult;\n            i && (e.checkResult = JSON.parse(i))\n          }\n          e = n(e)\n        },\n        e))\n      },\n      onMenuShareTimeline: function(e) {\n        t(h.onMenuShareTimeline, {\n          complete: function() {\n            i("shareTimeline", {\n              title: e.title || I,\n              desc: e.title || I,\n              img_url: e.imgUrl || "",\n              link: e.link || location.href,\n              type: e.type || "link",\n              data_url: e.dataUrl || ""\n            },\n            e)\n          }\n        },\n        e)\n      },\n      onMenuShareAppMessage: function(e) {\n        t(h.onMenuShareAppMessage, {\n          complete: function(n) {\n            "favorite" === n.scene ? i("sendAppMessage", {\n              title: e.title || I,\n              desc: e.desc || "",\n              link: e.link || location.href,\n              img_url: e.imgUrl || "",\n              type: e.type || "link",\n              data_url: e.dataUrl || ""\n            }) : i("sendAppMessage", {\n              title: e.title || I,\n              desc: e.desc || "",\n              link: e.link || location.href,\n              img_url: e.imgUrl || "",\n              type: e.type || "link",\n              data_url: e.dataUrl || ""\n            },\n            e)\n          }\n        },\n        e)\n      },\n      onMenuShareQQ: function(e) {\n        t(h.onMenuShareQQ, {\n          complete: function() {\n            i("shareQQ", {\n              title: e.title || I,\n              desc: e.desc || "",\n              img_url: e.imgUrl || "",\n              link: e.link || location.href\n            },\n            e)\n          }\n        },\n        e)\n      },\n      onMenuShareWeibo: function(e) {\n        t(h.onMenuShareWeibo, {\n          complete: function() {\n            i("shareWeiboApp", {\n              title: e.title || I,\n              desc: e.desc || "",\n              img_url: e.imgUrl || "",\n              link: e.link || location.href\n            },\n            e)\n          }\n        },\n        e)\n      },\n      onMenuShareQZone: function(e) {\n        t(h.onMenuShareQZone, {\n          complete: function() {\n            i("shareQZone", {\n              title: e.title || I,\n              desc: e.desc || "",\n              img_url: e.imgUrl || "",\n              link: e.link || location.href\n            },\n            e)\n          }\n        },\n        e)\n      },\n      updateTimelineShareData: function(e) {\n        i("updateTimelineShareData", {\n          title: e.title,\n          link: e.link,\n          imgUrl: e.imgUrl\n        },\n        e)\n      },\n      updateAppMessageShareData: function(e) {\n        i("updateAppMessageShareData", {\n          title: e.title,\n          desc: e.desc,\n          link: e.link,\n          imgUrl: e.imgUrl\n        },\n        e)\n      },\n      startRecord: function(e) {\n        i("startRecord", {},\n        e)\n      },\n      stopRecord: function(e) {\n        i("stopRecord", {},\n        e)\n      },\n      onVoiceRecordEnd: function(e) {\n        t("onVoiceRecordEnd", e)\n      },\n      playVoice: function(e) {\n        i("playVoice", {\n          localId: e.localId\n        },\n        e)\n      },\n      pauseVoice: function(e) {\n        i("pauseVoice", {\n          localId: e.localId\n        },\n        e)\n      },\n      stopVoice: function(e) {\n        i("stopVoice", {\n          localId: e.localId\n        },\n        e)\n      },\n      onVoicePlayEnd: function(e) {\n        t("onVoicePlayEnd", e)\n      },\n      uploadVoice: function(e) {\n        i("uploadVoice", {\n          localId: e.localId,\n          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1\n        },\n        e)\n      },\n      downloadVoice: function(e) {\n        i("downloadVoice", {\n          serverId: e.serverId,\n          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1\n        },\n        e)\n      },\n      translateVoice: function(e) {\n        i("translateVoice", {\n          localId: e.localId,\n          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1\n        },\n        e)\n      },\n      chooseImage: function(e) {\n        i("chooseImage", {\n          scene: "1|2",\n          count: e.count || 9,\n          sizeType: e.sizeType || ["original", "compressed"],\n          sourceType: e.sourceType || ["album", "camera"]\n        },\n        (e._complete = function(e) {\n          if (M) {\n            var n = e.localIds;\n            try {\n              n && (e.localIds = JSON.parse(n))\n            } catch(e) {}\n          }\n        },\n        e))\n      },\n      getLocation: function(e) {},\n      previewImage: function(e) {\n        i(h.previewImage, {\n          current: e.current,\n          urls: e.urls\n        },\n        e)\n      },\n      uploadImage: function(e) {\n        i("uploadImage", {\n          localId: e.localId,\n          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1\n        },\n        e)\n      },\n      downloadImage: function(e) {\n        i("downloadImage", {\n          serverId: e.serverId,\n          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1\n        },\n        e)\n      },\n      getLocalImgData: function(e) { ! 1 === O ? (O = !0, i("getLocalImgData", {\n          localId: e.localId\n        },\n        (e._complete = function(e) {\n          if (O = !1, E.length > 0) {\n            var n = E.shift();\n            wx.getLocalImgData(n)\n          }\n        },\n        e))) : E.push(e)\n      },\n      getNetworkType: function(e) {\n        var n = function(e) {\n          var n = e.errMsg;\n          e.errMsg = "getNetworkType:ok";\n          var i = e.subtype;\n          if (delete e.subtype, i) e.networkType = i;\n          else {\n            var t = n.indexOf(":"),\n            o = n.substring(t + 1);\n            switch (o) {\n            case "wifi":\n            case "edge":\n            case "wwan":\n              e.networkType = o;\n              break;\n            default:\n              e.errMsg = "getNetworkType:fail"\n            }\n          }\n          return e\n        };\n        i("getNetworkType", {},\n        (e._complete = function(e) {\n          e = n(e)\n        },\n        e))\n      },\n      openLocation: function(e) {\n        i("openLocation", {\n          latitude: e.latitude,\n          longitude: e.longitude,\n          name: e.name || "",\n          address: e.address || "",\n          scale: e.scale || 28,\n          infoUrl: e.infoUrl || ""\n        },\n        e)\n      },\n      getLocation: function(e) {\n        e = e || {},\n        i(h.getLocation, {\n          type: e.type || "wgs84"\n        },\n        (e._complete = function(e) {\n          delete e.type\n        },\n        e))\n      },\n      hideOptionMenu: function(e) {\n        i("hideOptionMenu", {},\n        e)\n      },\n      showOptionMenu: function(e) {\n        i("showOptionMenu", {},\n        e)\n      },\n      closeWindow: function(e) {\n        i("closeWindow", {},\n        e = e || {})\n      },\n      hideMenuItems: function(e) {\n        i("hideMenuItems", {\n          menuList: e.menuList\n        },\n        e)\n      },\n      showMenuItems: function(e) {\n        i("showMenuItems", {\n          menuList: e.menuList\n        },\n        e)\n      },\n      hideAllNonBaseMenuItem: function(e) {\n        i("hideAllNonBaseMenuItem", {},\n        e)\n      },\n      showAllNonBaseMenuItem: function(e) {\n        i("showAllNonBaseMenuItem", {},\n        e)\n      },\n      scanQRCode: function(e) {\n        i("scanQRCode", {\n          needResult: (e = e || {}).needResult || 0,\n          scanType: e.scanType || ["qrCode", "barCode"]\n        },\n        (e._complete = function(e) {\n          if (P) {\n            var n = e.resultStr;\n            if (n) {\n              var i = JSON.parse(n);\n              e.resultStr = i && i.scan_code && i.scan_code.scan_result\n            }\n          }\n        },\n        e))\n      },\n      openAddress: function(e) {\n        i(h.openAddress, {},\n        (e._complete = function(e) {\n          e = a(e)\n        },\n        e))\n      },\n      openProductSpecificView: function(e) {\n        i(h.openProductSpecificView, {\n          pid: e.productId,\n          view_type: e.viewType || 0,\n          ext_info: e.extInfo\n        },\n        e)\n      },\n      addCard: function(e) {\n        for (var n = e.cardList,\n        t = [], o = 0, r = n.length; o < r; ++o) {\n          var a = n[o],\n          c = {\n            card_id: a.cardId,\n            card_ext: a.cardExt\n          };\n          t.push(c)\n        }\n        i(h.addCard, {\n          card_list: t\n        },\n        (e._complete = function(e) {\n          var n = e.card_list;\n          if (n) {\n            for (var i = 0,\n            t = (n = JSON.parse(n)).length; i < t; ++i) {\n              var o = n[i];\n              o.cardId = o.card_id,\n              o.cardExt = o.card_ext,\n              o.isSuccess = !!o.is_succ,\n              delete o.card_id,\n              delete o.card_ext,\n              delete o.is_succ\n            }\n            e.cardList = n,\n            delete e.card_list\n          }\n        },\n        e))\n      },\n      chooseCard: function(e) {\n        i("chooseCard", {\n          app_id: C.appId,\n          location_id: e.shopId || "",\n          sign_type: e.signType || "SHA1",\n          card_id: e.cardId || "",\n          card_type: e.cardType || "",\n          card_sign: e.cardSign,\n          time_stamp: e.timestamp + "",\n          nonce_str: e.nonceStr\n        },\n        (e._complete = function(e) {\n          e.cardList = e.choose_card_info,\n          delete e.choose_card_info\n        },\n        e))\n      },\n      openCard: function(e) {\n        for (var n = e.cardList,\n        t = [], o = 0, r = n.length; o < r; ++o) {\n          var a = n[o],\n          c = {\n            card_id: a.cardId,\n            code: a.code\n          };\n          t.push(c)\n        }\n        i(h.openCard, {\n          card_list: t\n        },\n        e)\n      },\n      consumeAndShareCard: function(e) {\n        i(h.consumeAndShareCard, {\n          consumedCardId: e.cardId,\n          consumedCode: e.code\n        },\n        e)\n      },\n      chooseWXPay: function(e) {\n        i(h.chooseWXPay, r(e), e)\n      },\n      openEnterpriseRedPacket: function(e) {\n        i(h.openEnterpriseRedPacket, r(e), e)\n      },\n      startSearchBeacons: function(e) {\n        i(h.startSearchBeacons, {\n          ticket: e.ticket\n        },\n        e)\n      },\n      stopSearchBeacons: function(e) {\n        i(h.stopSearchBeacons, {},\n        e)\n      },\n      onSearchBeacons: function(e) {\n        t(h.onSearchBeacons, e)\n      },\n      openEnterpriseChat: function(e) {\n        i("openEnterpriseChat", {\n          useridlist: e.userIds,\n          chatname: e.groupName\n        },\n        e)\n      },\n      launchMiniProgram: function(e) {\n        i("launchMiniProgram", {\n          targetAppId: e.targetAppId,\n          path: g(e.path),\n          envVersion: e.envVersion\n        },\n        e)\n      },\n      miniProgram: {\n        navigateBack: function(e) {\n          e = e || {},\n          f(function() {\n            i("invokeMiniProgramAPI", {\n              name: "navigateBack",\n              arg: {\n                delta: e.delta || 1\n              }\n            },\n            e)\n          })\n        },\n        navigateTo: function(e) {\n          f(function() {\n            i("invokeMiniProgramAPI", {\n              name: "navigateTo",\n              arg: {\n                url: e.url\n              }\n            },\n            e)\n          })\n        },\n        redirectTo: function(e) {\n          f(function() {\n            i("invokeMiniProgramAPI", {\n              name: "redirectTo",\n              arg: {\n                url: e.url\n              }\n            },\n            e)\n          })\n        },\n        switchTab: function(e) {\n          f(function() {\n            i("invokeMiniProgramAPI", {\n              name: "switchTab",\n              arg: {\n                url: e.url\n              }\n            },\n            e)\n          })\n        },\n        reLaunch: function(e) {\n          f(function() {\n            i("invokeMiniProgramAPI", {\n              name: "reLaunch",\n              arg: {\n                url: e.url\n              }\n            },\n            e)\n          })\n        },\n        postMessage: function(e) {\n          f(function() {\n            i("invokeMiniProgramAPI", {\n              name: "postMessage",\n              arg: e.data || {}\n            },\n            e)\n          })\n        },\n        getEnv: function(n) {\n          f(function() {\n            n({\n              miniprogram: "miniprogram" === e.__wxjs_environment\n            })\n          })\n        }\n      }\n    },\n    b = 1,\n    R = {};\n    return S.addEventListener("error",\n    function(e) {\n      if (!M) {\n        var n = e.target,\n        i = n.tagName,\n        t = n.src;\n        if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {\n          e.preventDefault(),\n          e.stopPropagation();\n          var o = n["wx-id"];\n          if (o || (o = b++, n["wx-id"] = o), R[o]) return;\n          R[o] = !0,\n          wx.ready(function() {\n            wx.getLocalImgData({\n              localId: t,\n              success: function(e) {\n                n.src = e.localData\n              }\n            })\n          })\n        }\n      }\n    },\n    !0),\n    S.addEventListener("load",\n    function(e) {\n      if (!M) {\n        var n = e.target,\n        i = n.tagName;\n        n.src;\n        if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {\n          var t = n["wx-id"];\n          t && (R[t] = !1)\n        }\n      }\n    },\n    !0),\n    n && (e.wx = e.jWeixin = N),\n    N\n  }\n});\n\n//# sourceURL=webpack:///./node_modules/weixin-js-sdk/index.js?')}}]);