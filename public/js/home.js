function getParams(url = '') {
  url = url || location.search
  let params = {}
  if (url.indexOf('?') !== -1) {
	let str = url.substr(url.indexOf('?') + 1)
	let strs = str.split('&')
	strs.forEach(item => {
	  let arrs = item.split('=')
	  params[arrs[0].toLowerCase()] = arrs[1]
	})
  }
  return params
}

const params = getParams();
// const appid = 'wx23a21da8306b9e79';
const defaultOpt = {
  method: 'GET',
  data: {},
  params: {},
  headers: {
	code: params.code || '',
  },
};
const jsApiList = [
  'scanQRCode', 'openLocation',
  'updateAppMessageShareData',
  'onMenuShareAppMessage',
  'chooseImage',
  'getLocation',
];

/*if (!params.state || params.state !== 'redirected') {
 const url = location.href
 sessionStorage.removeItem('token')
 location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=redirected#wechat_redirect`
 }*/

function request(url, data) {
  let config = {
	...defaultOpt,
	url,
  }
  if (config.method.toUpperCase() === 'GET') {
	config.params = data
  }
  else {
	config.data = data
  }
  return axios(config)
}

function loadData(url, data) {
  return new Promise(async resolve => {
	try {
	  let res = await request(url, data)
	  console.log(`[loadData] ${url} success`, res)
	  if (res.status === 200 && res.data.success) {
		resolve({success: true, data: res.data.data || res.data, message: res.data.message || '请求成功!'})
	  }
	  resolve({success: false, data: res.data.data || res.data, message: res.data.message || '业务失败!'})
	} catch (e) {
	  resolve({success: false, data: e, message: '网络异常!'})
	}
  })
}

async function getToken() {
  let token = sessionStorage.getItem('token')
  token && (token = JSON.parse(token))
  let now = Date.now()
  if (token && now < token.expires_time) {
	console.log('get token from cache')
	return Promise.resolve({success: true, data: token})
  }
  else {
	let res = await loadData('/wechat/getWebAccess')
	console.log('get token from wechat')
	if (res.success) {
	  let {access_token, openid, expires_in} = res.data
	  sessionStorage.setItem('token', JSON.stringify({
		access_token, openid, expires_time: now + (expires_in - 200) * 1000
	  }))
	  return Promise.resolve(res)
	}
	return Promise.resolve(res)
  }
}

const getUserInfo = ({access_token, openid}) => loadData('/wechat/getUserInfo', {access_token, openid});
const getWxConfig = (url) => loadData('/wechat/getWxConfig', {url});

const vm = new Vue({
  el: '#app',
  data() {
	return {
	  userInfo: null,
	  text: 'hello wechat',
	  img: '/imgs/1.jpg',
	  pickedImage: '',
	}
  },
  mounted() {
	this.getUserInfo()
  },
  methods: {
	scan() {
	  wx && wx.scanQRCode({
		needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
		success: function (res) {
		  var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
		},
	  });
	},
	async openLocation() {
	  let location = await this.getLocation('gcj02')
	  let latitude = 0, longitude = 0
	  if (location.success) {
		latitude = location.data.latitude
		longitude = location.data.longitude
	  }
	  wx.openLocation({
		latitude, // 纬度，浮点数，范围为90 ~ -90
		longitude, // 经度，浮点数，范围为180 ~ -180。
		name: '', // 位置名
		address: '', // 地址详情说明
		scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
		infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
	  });
	},
	pickImage() {
	  wx.chooseImage({
		count: 1, // 默认9
		sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		success: function (res) {
		  vm.pickedImage = res.localIds[0]
		  vm.$dialog.alert({
			message: res.localIds,
		  })
		},
	  });
	},
	getLocation(type = 'wgs84') {
	  return new Promise(resolve => {
		wx.getLocation({
		  type, // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
		  success(res) {
			resolve({success: true, data: res})
		  },
		  fail(e) {
			resolve({success: false, data: e})
		  },
		});
	  })
	},
	async getUserInfo() {
	  let token = await getToken()
	  console.log('get token', token)
	  if (token.success) {
		let info = await getUserInfo(token.data)
		console.log('getUserInfo', info)
		if (info.success) {
		  this.userInfo = info.data
		}
	  }
	},
  },
  computed: {
	list() {
	  if (!this.userInfo) return []
	  return [
		{key: '国家', val: this.userInfo.country},
		{key: '省份', val: this.userInfo.province},
		{key: '城市', val: this.userInfo.city},
		{key: '姓名', val: this.userInfo.nickname},
	  ]
	},
  },
});

getWxConfig(encodeURIComponent(location.href))
	.then(res => {
	  console.log(res)
	  if (res.success) {
		wx && wx.config({...res.data, debug: false, jsApiList});

		wx.ready(function () {
		  console.log('wx is ready')
		  wx.onMenuShareAppMessage({
			title: 'hello wechat', // 分享标题
			desc: 'welcome to home', // 分享描述
			link: location.href.split('?')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: '', // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () {
			  console.log('分享成功!')
			},
		  });
		});
		wx.error(function (res) {
		  console.log('wx error', res)
		});
		/*		wx.updateAppMessageShareData({
		 title: 'hello wechat', // 分享标题
		 desc: 'welcome to home', // 分享描述
		 link: location.href.split('?')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		 imgUrl: '', // 分享图标
		 success: function () {
		 // 设置成功
		 console.log('分享成功!')
		 },
		 });*/

	  }
	})
