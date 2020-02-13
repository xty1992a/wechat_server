import * as helper from "./helper";

const event = new helper.EmitAble();

const {isWechat, isAlipay} = helper;

const dftOptions = {
  wxConfig: undefined,
  bMapConfig: undefined,
  BMapAK: "AYaM1mMV2BSChZjk9MuPFgCw",
  useBMap: !isWechat && !isAlipay
};

export default class Context {

  isReady = false;

  constructor(options) {
    console.log(options.wxConfig);
    this.$options = {...dftOptions, ...options};
  }


  async init() {
    console.log("context初始化开始！\n检测环境中...");
    if (isWechat) {
      if (this.wechat) return;
      if (!this.$options.wxConfig) {
        throw "缺少微信sdk配置参数";
      }
      await this.initWx();
    }

    if (isAlipay) {
      if (this.aliLife) return;
      await this.initAli();
    }

    console.log(this.$options);
    if (this.$options.useBMap) {
      if (this.bMap) return;
      await this.initBMap();
    }
  }

  initWx() {
    return new Promise(resolve => {
      import(/* webpackChunkName: "context_wechat" */"./wechat")
        .then(({default: Wechat}) => {
          console.log("wechat.js loaded");
          this.wechat = new Wechat(this.$options.wxConfig);
          resolve();
        })
        .catch(err => {
          console.log("加载wechat.js失败！");
        });
    });
  }

  initAli() {
    return new Promise(resolve => {
      import(/* webpackChunkName: "context_aliLife" */"./aliLife")
        .then(({default: AliLife}) => {
          this.aliLife = new AliLife();
          resolve();
        })
        .catch(err => {
          console.log("加载aliLife.js失败！");
        });
    });
  }

  initBMap() {
    console.log("init bmap");
    return new Promise(resolve => {
      import(/* webpackChunkName: "context_bMap" */"./BMap")
        .then(({default: BMap}) => {
          console.log("bmap.js loaded");
          this.bMap = new BMap({ak: this.$options.BMapAK});
          resolve();
        })
        .catch(err => {
          console.log("加载BMap失败！");
        });

    });
  }

  // 调用者实例化后，需要await该方法，保证对应组件初始化完成
  async ready() {
    await this.init();
    if (this.aliLife) return await this.aliLife.ready();
    if (this.wechat) return await this.wechat.ready();
    if (this.bMap) return await this.bMap.ready();
  }

  // 定位能力
  async getLocation() {
    if (this.wechat) return this.wechat.getLocation();
    if (this.aliLife) return this.aliLife.getLocation();
    if (this.bMap) return this.bMap.getLocation();
    return {success: false, message: "暂时无法获取地址"};
  }

  // 分享能力
  async shareMessage(data) {
    if (this.wechat) return this.wechat.shareMessage(data);

    return {success: false, message: "平台不支持"};
  }

  // 预览图片能力
  async previewImage(data) {
    if (this.wechat) return this.wechat.previewImage(data);
    if (this.aliLife) return this.aliLife.previewImage(data);
    return {success: false, message: "平台不支持"};
  }

  // 扫码能力
  async scanCode(data) {
    if (this.wechat) return this.wechat.scanCode(data);
    if (this.aliLife) return this.aliLife.scanCode(data);
    return {success: false, message: "平台不支持"};
  }
}