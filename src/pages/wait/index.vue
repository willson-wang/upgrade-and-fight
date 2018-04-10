<template>
  <div class="container wait-wrap">
    <div class="wait-friendhead">
      <head-photo :user-info="userInfo"></head-photo>
    </div>
    <div class="wait-loading">等待好友响应.......</div>
    <div class="wait-selfhead">
      <head-photo :user-info="userInfo"></head-photo>
    </div>
    <div class="wait-btn">
      <button type="button" @click="cancelHandler">取消</button>
    </div>
  </div>
</template>

<script>
// 邀请好友等待页面
import headPhoto from '@/components/head-photo';
import { wxSetStorage, wxLogin, wxGetUserInfo, wxGetStorage, wxNavigateTo } from '@/utils/wechat';

export default {
  components: {
    headPhoto,
  },
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    getUserInfo() {
      // 调用登录接口
      wxGetStorage('userInfo').then((res) => {
        if (res.data) {
          this.userInfo = JSON.parse(res.data);
          return;
        }

        wxLogin().then(() => {
          return wxGetUserInfo();
        }).then((response) => {
          this.userInfo = response.userInfo;
          wxSetStorage({ key: 'userInfo', data: JSON.stringify(response.userInfo) });
        });
      });
    },
    cancelHandler() {
      wxNavigateTo('../pk/main');
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/less/index.less';
@import '../../assets/iconfont/iconfont.wxss';

  .wait-wrap {
    justify-content: flex-start;
    .wait-friendhead, .wait-selfhead {
      flex: 0 0 200px;
      display: flex;
      align-items: center;
    }
    .wait-btn {
      flex: 0 0 80px;
      display: flex;
      align-items: center;
      button {
        display: block;
        width: 120px;
        border: 1px solid @color-bdr;
      }
    }
  }
</style>

