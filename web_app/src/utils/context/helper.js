const ua = window.navigator.userAgent;

export const isWechat = /MicroMessenger/i.test(ua);
export const isAlipay = /alipayclient/i.test(ua);

export const promisify = function (fn) {
  return function (options = {}) {
    return new Promise((resolve) => {
      options.success = e => {
        resolve({success: true, data: e});
      };
      options.fail = e => {
        resolve({success: false, data: e});
      };
      fn(options);
    });
  };
};

export class EmitAble {

  constructor() {
    this._task = {};
  }

  on(event, callback) {
    this._task[event] = this._task[event] || [];
    this._task[event].push(callback);
  }

  fire(event, payload) {
    const task = this._task[event] || [];
    task.forEach(callback => callback(payload));
  }

  off(event, callback) {
    const task = this._task[event] || [];
    this._task[event] = task.filter(cb => cb !== callback);
  }

  clear(event) {
    this._task[event] = null;
  }
}

export const loadModule = (url) =>{
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.addEventListener('load', () => resolve(true));
    script.addEventListener('error', () => resolve(false));
    document.head.appendChild(script);
  });
};

export const sleep = time => new Promise(r=> setTimeout(r, time));