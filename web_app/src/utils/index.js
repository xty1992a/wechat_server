export const getParams = (url = '') => {
  url = url || location.search;
  let params = {};
  if (url.indexOf('?') !== -1) {
	let str = url.substr(url.indexOf('?') + 1);
	let strs = str.split('&');
	strs.forEach(item => {
	  let arrs = item.split('=');
	  params[arrs[0].toLowerCase()] = arrs[1]
	})
  }
  return params
};

export function isWechatClient() {
  if (!navigator) return false;
  const ua = navigator.userAgent.toLowerCase();
  return /MicroMessenger/i.test(ua);
}
