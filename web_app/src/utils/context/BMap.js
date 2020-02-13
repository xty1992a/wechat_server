import * as helper from "./helper";

const dftOptions = {
  ak: "AYaM1mMV2BSChZjk9MuPFgCw"
};

export default class BMap {
  constructor(options) {
    this.$options = {...dftOptions, ...options};
  }

  ready() {
    console.log("is bmap ready");
    return new Promise(async resolve => {
      if (this.map) return resolve(true);
      await this.init();
      console.log("bmap ready", this.map);
      resolve(true);
    });
  }

  init() {
    return new Promise(async resolve => {
      window.__getpositionbybaidumaploaded__ = () => {
        window.__getpositionbybaidumaploaded__ = null;
        this.map = window.BMap;
        resolve();
      };
      helper.loadModule(`http://api.map.baidu.com/api?v=2.0&ak=${this.$options.ak}&callback=__getpositionbybaidumaploaded__`);
    });
  }

  getLocation() {
    return new Promise(resolve => {
      const geolocation = new this.map.Geolocation();
      geolocation.getCurrentPosition(res => {
          const {lng, lat} = res.point;
          resolve({
            success: true,
            data: {
              latitude: lat,
              longitude: lng,
            },
            result: res
          });
        },
        err => {
          resolve({
            success: false,
            data: err,
            message: err.mf,
            result: null
          });
        });
    });

  }
}