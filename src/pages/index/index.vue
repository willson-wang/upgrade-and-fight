<template>
  <div class="container">
    <div class="userinfo" @click="bindViewTap">
      <head-photo :user-info="userInfo"></head-photo>
      <div><i class="icon icon-star1"></i></div>
      <div>66</div>
    </div>
    <div class="progress-wrap">
      <div class="progress-circle">
        <div class="pie_left"><div class="left" :style="{transform: leftRotate}"></div></div>
        <div class="pie_right"><div class="right" :style="{transform: rightRotate}"></div></div>
        <div class="mask">
          <p>第{{checkPoint * 1}}关</p>
        </div>
      </div>
      <p class="progress-totle">共10关</p>
      <div class="progress-button" @click="startHourglass">开始闯关</div>
    </div>
    <ul class="column">
      <li v-for="(item, index) in menuList" :key="index" @click="linkTo(item.key)">
        <p><img :src="item.url" alt="img"></p>
        <p>{{item.title}}</p>
      </li>
    </ul>
    <div class="rank" @click="linkTo('rank')">
      <p><img :src="rankImgUrl" alt="img"></p>
      <p>排行榜</p>
    </div>
  </div>
</template>

<script>
// 首页
import { wxNavigateTo } from '@/utils/wechat';
import card from '@/components/card';
import headPhoto from '@/components/head-photo';
import getWechatInfo from '@/utils/mixins';
// import imgRankUrl from '../../../static/images/rank.png';
// import imgErrorUrl from '../../../static/images/error.png';
// import imgExamUrl from '../../../static/images/exam.jpg';
// import imgPkUrl from '../../../static/images/pk.jpg';

export default {
  data() {
    return {
      motto: 'Hello World',
      userInfo: {},
      checkPoint: 1,
      menuList: [
        {
          title: '错题库',
          key: 'error',
          url: 'http://bpic.588ku.com/element_origin_min_pic/17/07/17/08422e8854043dcffccf8fc0193d63da.jpg',
        },
        {
          title: 'PK场',
          key: 'pk',
          url: 'http://bpic.588ku.com/element_origin_min_pic/17/09/20/b7cb900c6b825ed77026c885eb173de7.jpg',
        },
        {
          title: '终极考核室',
          key: 'final',
          url: 'http://bpic.588ku.com/element_origin_min_pic/17/01/12/3573ee12f445250eda12d4ec286962f3.jpg',
        },
      ],
      rankImgUrl: 'http://bpic.588ku.com/element_origin_min_pic/16/11/12/6925f876ea91c5463bc40113ee298fdb.jpg',
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
  },
  methods: {
    bindViewTap() {
      const url = '../logs/main';
      wx.navigateTo({ url });
    },
    startHourglass() {
      wxNavigateTo('../hourglass/main');
    },
    linkTo(key) {
      const STATUS = {
        go: function (name) {
          STATUS[`state_${name}`] && STATUS[`state_${name}`]();
        },
        state_pk: function () {
          wxNavigateTo('../pk/main');
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
    this.getUserInfo();
  },
};
</script>

<style scoped lang="less">
@import '../../assets/less/index.less';
@import '../../assets/iconfont/iconfont.wxss';
.userinfo {
  display: flex;
  width: 100%;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: flex-start;

  div {
    font-size: 16px;
    width: 64px;
    margin-left: 10px;
    text-align: center;
  }

  i {
    font-size: 30px;
  }
}

.progress-wrap {
  flex: 1 0 240px;
  position: relative;
  width: 100%;
    .progress-circle {
    width: 200px; 
    height: 200px; 
    position: absolute; 
    border-radius: 50%; 
    background: @color-progress;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);

    .pie_left, .pie_right {
      width: 200px; 
      height: 200px; 
      position: absolute; 
      top: 0;
      left: 0;
    }
    .left, .right {
      display: block; 
      width:200px; 
      height:200px; 
      background:@color-shallow-gray; 
      border-radius: 50%; 
      position: absolute; 
      top: 0; 
      left: 0; 
      transform: rotate(0deg); 
    }
    .pie_right, .right { 
      clip:rect(0,auto,auto,100px); 
    }
    .pie_left, .left { 
      clip:rect(0,100px,auto,0); 
    }
    .mask { 
      width: 160px; 
      height: 160px; 
      border-radius: 50%; 
      left: 20px; 
      top: 20px; 
      background: @color-white;
      position: absolute; 
      text-align: center; 
      line-height: 160px; 
      font-size: 16px;
    }
  }

  .progress-totle {
    position: absolute;
    bottom: 36%;
    left: 42%;
    color: @color-font-disabled;
  }

  .progress-button {
    position: absolute;
    bottom: 0;
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
  li {
    flex: 1 0 33.3%;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 16px;
    img {
      width: 80px;
      height: 80px;
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
  img {
    width: 50px;
    height: 50px;
  }
  i {
    font-size: 40px;
  }
}

</style>
