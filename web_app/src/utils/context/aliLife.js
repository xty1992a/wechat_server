import * as GPS from "./gps_convert";

export default class AliLife {

  ready() {
    return new Promise(resolve => {
      const ali = window.AlipayJSBridge;
      if (ali) {
        this.alipay = ali;
        return resolve(true);
      }
      document.addEventListener("AlipayJSBridgeReady", () => {
        this.alipay = ali;
        resolve(true);
      }, false);
    });
  }

  getLocation() {
    return new Promise(resolve => {
      this.alipay.call(
        "getCurrentLocation",
        {requestType: 0, bizType: "didi"},
        result => {
          let data = null;

          if (!result.error) {
            const point = GPS.gcj02_To_Bd09(result.longitude, result.latitude);
            data = {
              latitude: point.lat,
              longitude: point.lng,
            };
          }
          resolve({
            success: !result.error,
            data,
            result
          });
        });
    });
  }

  scanCode({type, needResult, actionType}) {
    return new Promise(resolve => {
      console.log("actionType: ", actionType || (needResult ? "scan" : "route"));
      this.alipay.call("scan", {
        type,
        // 优先取actionType,没有则看needResult
        actionType: actionType || (needResult ? "scan" : "scanAndRoute")
      }, result => {
        resolve({
          success: !result.error,
          data: result.codeContent,
          result
        });
      });
    });
  }

  previewImage(data) {
    return new Promise(resolve => {
      this.alipay.call("imageViewer", {
        images: data.urls.map(u => ({u, t: u}))
        /* [{
          u: 'https://gw.alipayobjects.com/zos/rmsportal/TVIpxsgyWyvrUKHwOvPY.jpg',
          t: 'https://gw.alipayobjects.com/zos/rmsportal/BSccQoKEYEaKgUAGMkdr.jpg'
        }]*/,
        init: data.urls.indexOf(data.current)
      }, result => {
        resolve({
          success: !result.error,
          data: result
        });
      });
    });
  }
}