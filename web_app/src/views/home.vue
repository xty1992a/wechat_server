<template>
  <div class="home-page">
    <address-block :address="address" @change="addressChange"/>
    <ui-button @click="pickImage">pickImage</ui-button>
    <ui-button @click="close">退出</ui-button>
    <ui-button @click="startRecord">开始录音</ui-button>
    <ui-button @click="stopRecord">停止录音</ui-button>
    <ui-button @click="playRecord">播放录音</ui-button>
    <ui-button @click="uploadRecord">上传录音</ui-button>

    <vueCropper
            style="height: 300px;"
            ref="cropper"
            @realTime="realTime"
            :img="option.img"
            :autoCropWidth="140"
            :autoCropHeight="140"
            :centerBox="true"
            :fixedBox="true"
            :auto-crop="true"
    />
    <div class="show-preview">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img" alt>
      </div>
    </div>


    <div class="wrap" ref="wrap">
      <div class="slide" ref="slide" style="transform: translateY(0)">
        <p v-for="i in 30">item {{i}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import AlloyTouch from 'alloytouch'
  import {VueCropper} from 'vue-cropper'

  import AddressBlock from '../components/AddressBlock'
  import {getWxConfig} from '../api'

  const jsApiList = [
	'scanQRCode', 'openLocation',
	'updateAppMessageShareData',
	'onMenuShareAppMessage',
	'chooseImage', 'openAddress',
	'getLocation', 'closeWindow',
	'startRecord', 'stopRecord',
	'playVoice', 'uploadVoice',
  ];

  export default {
	name: 'home-page',
	components: {AddressBlock, VueCropper},
	data() {
	  return {
		avatar: '',
		address: null,
		option: {
		  img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
		  size: 300,
		  outputType: 'png',
		},
		previews: {},
	  }
	},
	async mounted() {
	  let res = await getWxConfig(encodeURIComponent(location.href));
	  console.log(res);
	  if (res.success) {
		wx && wx.config({...res.data, debug: false, jsApiList});
		wx.ready(() => {
		  this.checkJsApi();
		  this.share();
		});
		wx.error(function (res) {
		  console.log('wx error', res)
		});
	  }

	  this.init()
	},
	methods: {
	  init() {
		let wrap = this.$refs.wrap;
		let slide = this.$refs.slide;
		this.alloyTouch = new AlloyTouch({
		  touch: wrap,//反馈触摸的dom
		  step: 36,//用于校正到step的整数倍
		  bindSelf: false,
		  initialValue: 0,
		  max: 0,
		  min: wrap.clientHeight - slide.clientHeight,
		  change: value => {
			slide.style.transform = `translateY(${value}px)`
		  },
		  animationEnd: value => {
			console.log('animationEnd', value)
		  },
		})
	  },

	  startRecord() {
		wx && wx.startRecord()
	  },
	  stopRecord() {
		wx.stopRecord({
		  success: res => {
			console.log('record has stop');
			this.localId = res.localId;
		  },
		  fail: err => {
			console.log(err, 'record fail')
		  },
		});
	  },

	  playRecord() {
		if (!this.localId) {
		  this.$message('请先录音!');
		  return
		}
		wx.playVoice({
		  localId: this.localId,
		});
	  },
	  uploadRecord() {
		wx.uploadVoice({
		  localId: this.localId,
		  isShowProgressTips: 1, // 默认为1，显示进度提示
		  success: (res) => {
			console.log(res.serverId);
		  },
		  fail: err => {
			console.log(err)
		  },
		});
	  },
	  checkJsApi() {
		wx && wx.checkJsApi({
		  jsApiList,
		  success: res => {
			if (res.errMsg === 'checkJsApi:ok') {
			  console.log(res.checkResult);
			}
		  },
		});
	  },
	  share() {
		wx && wx.onMenuShareAppMessage({
		  title: 'hello wechat', // 分享标题
		  desc: 'welcome to home', // 分享描述
		  link: location.href.split('?')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		  imgUrl: '', // 分享图标
		  type: 'link', // 分享类型,music、video或link，不填默认为link
		  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		  success: function () {
			console.log('分享成功!');
		  },
		});
	  },
	  pickImage() {
		wx && wx.chooseImage({
		  count: 1, // 默认9
		  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		  success: res => {
			this.option.img = res.localIds[0];
			console.log(this.option.img)
		  },
		});
	  },

	  close() {
		wx && wx.closeWindow()
	  },

	  realTime(data) {
		console.log(data);
		this.avatar = data.url;
		this.previews = data;
	  },
	  addressChange(address) {
		this.address = address
	  },
	},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .home-page {
    padding: 10px;

    .show-preview {
      width: 140px;
      height: 140px;
      overflow: hidden;
      border-radius: 50%;
      margin: 5px;

      img {
      }
    }

    .wrap {
      margin: auto;
      border: 1px solid #e5e5e5;
      width: 300px;
      height: 300px;
      overflow: hidden;

      p {
        line-height: 36px;
      }
    }
  }
</style>
