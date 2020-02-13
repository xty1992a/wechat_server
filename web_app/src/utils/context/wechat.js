import "weixin-js-sdk";
import * as helper from "./helper";
import * as GPS from "./GPS_convert";

const wx = window.wx;

export default class Wechat {

  constructor(config) {
    this.$options = config;
  }

  ready() {
    console.log("is wechat ready");
    return new Promise(resolve => {
      if (this.isReady) return resolve(true);
      wx.config(this.$options);

      wx.ready(() => {
        console.log("wechat ready");
        this.isReady = true;
        resolve(true);
      });
    });
  }

  async getLocation() {
    const result = await helper.promisify(wx.getLocation)({type: "gcj02",});
    if (result.success) {
      result.result = result.data;
      const point = GPS.gcj02_To_Bd09(result.data.longitude, result.data.latitude);
      result.data = {
        latitude: point.lat,
        longitude: point.lng,
      };
    }
    return result;
  }

  shareMessage(data) {
    return helper.promisify(wx.updateAppMessageShareData)(data);
  }

  previewImage(data) {
    return helper.promisify(wx.previewImage)(data);
  }

  async scanCode({needResult}) {
    console.log("wechat scan code");
    const result = await helper.promisify(wx.scanQRCode)({
      needResult: +needResult,
      scanType: ["qrCode", "barCode"]
    });
    if (result.success) {
      console.log("result ", result.data);
      result.result = result.data;
      result.data = result.data.resultStr;
    }
    return result;
  }

}