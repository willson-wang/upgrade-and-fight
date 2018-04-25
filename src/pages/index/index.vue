<template>
  <div class="container index-bg" :style="{'background': indexBg}">
    <div class="userinfo" @click="bindViewTap">
      <head-photo :user-info="userInfo"></head-photo>
      <div><i class="icon icon-star1"></i></div>
      <div>{{personHourglassInfo.star_num}}</div>
    </div>
    <div class="progress-wrap">
      <div class="ec-canvas">
        <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
      </div>
      <p class="progress-totle">共10关</p>
      <div class="progress-button" @click="startHourglass">开始闯关</div>
    </div>
    <ul class="column">
      <li v-for="(item, index) in menuList" :key="index" @click="linkTo(item.key)" class="animated shake">
        <p><img :src="item.url" alt="img"></p>
        <p>{{item.title}}</p>
      </li>
    </ul>
    <div class="rank animated shake" @click="linkTo('rank')" >
      <p><img :src="rankImgUrl" alt="img"></p>
      <p>排行榜</p>
    </div>
  </div>
</template>

<script>
// 首页
import { wxNavigateTo, wxShowToast, wxGetStorage } from '@/utils/wechat';
import card from '@/components/card';
import headPhoto from '@/components/head-photo';
import getWechatInfo from '@/utils/mixins';
import { getRankBroadInfo } from '@/api/common';
// import bgUrl from '../../../static/images/bg-big.jpg';
import errUrl from '../../../static/images/err.png';
import exmaUrl from '../../../static/images/exams.png';
import rankUrl from '../../../static/images/ranks.png';
import pkUrl from '../../../static/images/PK.png';
import { getOptions } from './options';

export default {
  data() {
    return {
      motto: 'Hello World',
      userInfo: {},
      checkPoint: 7,
      menuList: [
        {
          title: '错题库',
          key: 'error',
          url: errUrl,
        },
        {
          title: 'PK场',
          key: 'pk',
          url: pkUrl,
        },
        {
          title: '终极考核室',
          key: 'final',
          url: exmaUrl,
        },
      ],
      rankImgUrl: rankUrl,
      indexBg: 'url(http://ww1.sinaimg.cn/large/b0f3038egy1fqo7nsmo8gj20hs0vktaw.jpg)',
      personHourglassInfo: {},
    };
  },
  mixins: [getWechatInfo],
  components: {
    card,
    headPhoto,
  },
  computed: {
    leftRotate() {
      return this.deg > 180 ? `rotate(${this.deg - 180}deg)` : 0;
    },
    rightRotate() {
      return this.deg > 180 ? 'rotate(180deg)' : `rotate(${this.deg}deg)`;
    },
    deg() {
      return (this.checkPoint / 10) * 360;
    },
    ec() {
      const opt = getOptions(this.personHourglassInfo.guan_num);
      console.log('ec', this.personHourglassInfo.guan_num);
      return { options: opt };
    },
  },
  methods: {
    bindViewTap() {
      const url = '../logs/main';
      wx.navigateTo({ url });
    },
    startHourglass() {
      wxNavigateTo('../hourglass/main').catch((e) => {
        console.log('../hourglass/main', e);
      });
      this.init = false;
    },
    linkTo(key) {
      const STATUS = {
        go: function (name) {
          STATUS[`state_${name}`] && STATUS[`state_${name}`]();
        },
        state_pk: function () {
          wxShowToast({
            title: '开发中，敬请期待...',
          });
          // wxNavigateTo('../pk/main');
        },
        state_error: function () {
          wxNavigateTo('../errorlog/main');
        },
        state_final: function () {
          wxNavigateTo('../finalexam/main');
        },
        state_rank: function () {
          wxNavigateTo('../rank/main');
        },
      };
      STATUS.go(key);
    },
  },
  created() {
    this.init = true;
    this.getUserInfo();
  },
  onShow() {
    console.log(this.init);
    if (this.init) return;
    wxGetStorage('userId').then((res) => {
      console.log('onshow userId', res);
      getRankBroadInfo({ cst_id: res.data }).then((r) => {
        this.personHourglassInfo = r.data.data;
        console.log('r show', this.personHourglassInfo);
      });
    });
  },
};
</script>

<style scoped lang="less">
@import '../../assets/less/index.less';
@import '../../assets/iconfont/iconfont.wxss';
.index-bg {
  background-size: cover;
}

.ec-canvas {
  width: 100%;
  height: 160px;

  ec-canvas {
    width: 160px;
    height: 160px;
  }
}

.userinfo {
  display: flex;
  width: 100%;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: flex-start;
  color: @color-white;

  div {
    font-size: 16px;
    width: 64px;
    margin-left: 10px;
    text-align: center;
  }

  i {
    font-size: 30px;
    color: #ffff99;
  }

}

.progress-wrap {
  flex: 1 0 180px;
  position: relative;
  width: 100%;
  color: @color-white;
  margin-bottom: 20px;

  .progress-totle {
    position: absolute;
    bottom: 28%;
    left: 44%;
    color: @color-white;
    font-size: 14px;
  }

  .progress-button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
}

.column {
  flex: 1 0 auto;
  width: 100%;
  display: flex;
  padding-top: 15px;
  color: @color-white;
  li {
    flex: 1 0 33.3%;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 16px;
    img {
      width: 60px;
      height: 60px;
    }
  } 
}

.rank {
  flex: 1 0 auto;
  width: 100%;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  padding-bottom: 30px;
  margin-top: 10px;
  color: @color-white;
  img {
    width: 50px;
    height: 30px;
  }
  i {
    font-size: 40px;
  }
}

</style>
