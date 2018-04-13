import { wxSetStorage, wxLogin, wxGetUserInfo, wxGetStorage } from '@/utils/wechat';

export default {
  methods: {
    loginWeChat() {
      wxLogin().then(() => {
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
