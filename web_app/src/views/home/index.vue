<template>
    <div class="home">
        <section class="block">
            <h3>获取经纬度</h3>
            <ui-button @click="getLocation">获取位置</ui-button>
            <p style="padding-top: 10px;line-height: 1.7;">经纬信息: {{location | json}}</p>
        </section>

        <section class="block">
            <h3>扫码</h3>
            <ui-button @click="scanCode">点击扫码</ui-button>
            <p style="padding-top: 10px;line-height: 1.7;">扫码结果： {{scanMessage}}</p>
        </section>

        <section class="block">
            <h3>扫码跳转</h3>
            <ui-button @click="scanRoute">点击扫码</ui-button>
            <p style="padding-top: 10px;line-height: 1.7;">扫描链接二维码，将会跳转</p>
        </section>

        <section class="block">
            <h3>预览图片</h3>
            <div class="img-list">
                <img :src="item" alt=""
                     @click.stop="preview(item)"
                     v-for="item in imgList" :key="item">
            </div>
        </section>
    </div>
</template>

<script>
  import Context from "../../utils/context";
  import {getWxConfig} from "../../api";
  import * as helper from "../../utils/context/helper";

  const jsApiList = [
    "getLocation", "updateAppMessageShareData",
    "scanQRCode", "previewImage"
  ];

  export default {
    name: "home",
    components: {},
    data() {
      return {
        location: null,
        scanMessage: null,
        imgList: [
          "https://files.1card1.cn/mps/0/20200213/93f20363f732428faee990cea2bc47df.jpg",
          "https://files.1card1.cn/mps/0/20200213/0575c6b0bdc0432fb81f0057e38ab473.jpg",
          "https://files.1card1.cn/mps/0/20200213/64504197a00c4f2c97c9e3e2cda476fa.jpg",
          "https://files.1card1.cn/mps/0/20200213/d102a2df09ad4e73be563af38474fce9.jpg"
        ]
      };
    },
    filters: {
      json: s => JSON.stringify(s)
    },
    async created() {
      await this.init();
      // await this.getLocation();
      this.shareMessage();

    },
    methods: {
      async init() {
        const wxConfig = await this.getWXConfig();

        this.context = new Context({
          wxConfig,
          useBMap: false
        });
        await this.context.ready();

        console.log("context ready");
      },

      async getWXConfig() {

        if (!helper.isWechat) return;

        let res = await getWxConfig(encodeURIComponent(window.location.href));
        if (!res.success) return;

        return {...res.data, debug: false, jsApiList};
      },

      async preview(current) {
        const result = await this.context.previewImage({
          current,
          urls: this.imgList
        });

        console.log(result);
      },

      async scanCode() {
        const result = await this.context.scanCode({
          needResult: true
        });

        console.log("扫码结果：", result);
        if (!result.success) return;
        this.scanMessage = result.data;
      },

      async scanRoute() {
        console.log("scanRoute");
        const result = await this.context.scanCode({
          needResult: false
        });
        console.log("扫码结果：scanRoute", result);
      },

      shareMessage() {
        this.context.shareMessage({
          title: "飞越深渊", // 分享标题
          desc: "分享描述分享描述分享描述", // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581572587937&di=b2fe2dcdac96fb9705c97a5b2d3b05ef&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Faf906795ad32968f779b6140f9c28af427a054f7618b-66J3pW_fw658", // 分享图标
        });
      },

      async getLocation() {
        const location = await this.context.getLocation();
        console.log("经纬位置：", location);
        if (!location.success) return;

        this.location = location.data;
      }
    },
    computed: {},
  };
</script>

<style lang="less" rel="stylesheet/less">

    .home {
        padding: 10px;

        .block {
            margin-bottom: 10px;
            padding: 10px;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);

            h3 {
                line-height: 2;
            }
        }

        .img-list {
            img {
                width: 100%;
                height: 200px;
                object-fit: contain;
            }
        }
    }
</style>
