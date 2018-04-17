import { wxSetStorage, wxLogin, wxGetUserInfo, wxGetStorage } from '@/utils/wechat';

export default {
  methods: {
    loginWeChat() {
      wxLogin().then((res) => {
        console.log('login', res);
        if (res.code) {
          // wxPost({
          //   url: '',
          //   data: { code: res.code },
          // }).then((res) => {
          //   console.log(res);
          // }).catch((error) => {
          //   console.log(error);
          // });
        }
        return wxGetUserInfo();
      }).then((response) => {
        this.userInfo = response.userInfo;
        wxSetStorage({ key: 'userInfo', data: JSON.stringify(response.userInfo) });
      });
    },
    getUserInfo() {
      // 调用登录接口
      wxGetStorage('userInfo').then((res) => {
        if (res.data) {
          this.userInfo = JSON.parse(res.data);
          return;
        }
        this.loginWeChat();
      }).catch(() => {
        this.loginWeChat();
      });
    },
  },
};
