<template>
  <div class="container pk-wrap">
    <div class="pk-card">
      <div class="pk-card-img">
        <head-photo :user-info="userInfo"></head-photo>
      </div>
      <div class="pk-card-ranking">2</div>
      <div class="pk-card-score">PK战绩：4胜1负</div>
      <div class="pk-card-star">共斩获20颗 <i class="icon icon-star1"></i></div>
    </div>
    <div class="pk-btn">
      <button open-type="share">邀请好友PK</button>
    </div>
    <rank @tabchange="tabChange" :tabs="tabs" :items="friendItems"></rank>
  </div>
</template>

<script>
// PK场
import rank from '@/components/rank';
import headPhoto from '@/components/head-photo';
import { wxSetStorage, wxLogin, wxGetUserInfo, wxGetStorage, wxHideShareMenu } from '@/utils/wechat';

export default {
  name: 'pk',
  components: {
    rank,
    headPhoto,
  },
  data() {
    return {
      tabs: ['PK榜'],
      friendItems: [
        {
          order: '1',
          name: '张三',
          rate: '5胜1负',
          score: 40,
        },
        {
          order: '2',
          name: '张三',
          rate: '5胜1负',
          score: 30,
        },
        {
          order: '3',
          name: '张三',
          rate: '5胜1负',
          score: 20,
        },
        {
          order: '4',
          name: '张三',
          rate: '5胜1负',
          score: 10,
        },
        {
          order: '5',
          name: '张三',
          rate: '5胜1负',
          score: 10,
        },
      ],
    };
  },
  methods: {
    tabChange(index) {
      console.log(index);
    },
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
  },
  created() {
    this.getUserInfo();
    wxHideShareMenu().then((res) => {
      console.log(res);
    });
  },
  onShareAppMessage(res) {
    console.log(res);
    return {
      title: '我在【升级打怪】向你发起了挑战,少年有胆就战!',
      path: '/pages/hourglass-subject/main',
      imageUrl: '../../static/images/home.png',
      success: function (response) {
        // 转发成功
        console.log(response);
        // wxNavigateTo();
      },
      fail: function (response) {
        // 转发失败
        console.log(response);
      },
    };
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/less/index.less';
@import '../../assets/iconfont/iconfont.wxss';

.pk-wrap {
  justify-content: flex-start;
  padding-bottom: 10px;
  overflow: auto;
}

.pk-card {
  flex: 0 0 120px;
  width: 60%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  border: 1px solid @color-bdr;
  margin: 40px 0 20px;

  .pk-card-img {
    position: absolute;
    top: -40px;
  }

  .pk-card-ranking {
    flex: 0 0 30px;
    width: 100%;
    text-align: right;
    padding-right: 30px;
  }

  .pk-card-score, .pk-card-star {
    flex: 0 0 40px;
    line-height: 40px;
  }

  .pk-card-star {
    display: flex;
    i {
      font-size: 22px;
      margin-left: 5px;
    }
  }
}

.pk-btn {
  flex: 0 0 60px;
  button {
    display: block;
    width: 140px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    border: 1px solid @color-bdr;
    text-align: center;
    cursor: pointer;
  }
}
</style>

