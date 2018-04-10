export function dialog(opt) {
  const defaultOpt = {
    title: '提示',
    content: '这是一个模态弹窗',
    showCancel: true,
    cancelText: '取消',
    confirmText: '确认',
  };
  const { title, content, showCancel, cancelText, confirmText } = Object.assign({}, defaultOpt, opt);

  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxSetStorage({ key, data }) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxGetStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxGetUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxHideShareMenu() {
  return new Promise((resolve, reject) => {
    wx.hideShareMenu({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxNavigateTo(url) {
  return new Promise((resolve, reject) => {
    wx.navigateTo({
      url,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export default wx;
