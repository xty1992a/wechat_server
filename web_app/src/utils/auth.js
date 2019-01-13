import {getParams} from './index'
import {APP_ID, isWechat} from '../config'

const params = getParams();
console.log('isWechat', isWechat);
if (!params.state || params.state !== 'redirected') {
  if (isWechat) {
	const url = encodeURIComponent(location.href);
	setTimeout(() => {
	  let redirectUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=redirected#wechat_redirect`;
	  console.log('will jump', redirectUrl);
	  window.location.href = redirectUrl
	}, 500)
  }
}
