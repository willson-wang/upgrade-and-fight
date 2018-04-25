<template>
  <div class="rank-container">
    <div class="bg" :style="{'background-image': indexBg}"></div>
      <div class="rank-overview">
        <div class="rank-avatar">
          <div class="userinfo">
            <head-photo :user-info="userInfo"></head-photo>
            <div class="star">
              <i class="icon icon-star1"></i>
              <div class="star-number">{{myRank.star_num}}</div>
            </div>
          </div>
        </div>
        <div class="rank-rst">
          <div class="total-ov">总榜: NO {{myRank.total_rank}}</div>
          <div class="pk-ov">PK榜: {{'无' || myRank.pk_rank}}</div>
          <div class="final-ov">考核榜: {{'无' || myRank.exam_rank}}</div>
        </div>
      </div>
      <div class="rank-page">
        <div class="tabs">
          <div class="tab"
            v-for="(rankType,index) in rankTypes" :key="index"
            @click="e => switchTab(e,rankType.key)"
            :class="rankType.key === currentTab ? 'current' : ''">
            {{rankType.title}}
          </div>
        </div>
        <div class="tab-content">
          <ranklist :type="selectedTab" :ranklist="rankData[selectedTab]"></ranklist>          
        </div>
      </div>
  </div>
</template>

<script>
import headPhoto from '@/components/head-photo';
import { getRankBoardPersonalInfo, getRankBoardOverview } from '@/api/rank';

import getWechatInfo from '@/utils/mixins';
import ranklist from './ranklist';
import bgUrl from '../../../static/images/bg-big.jpg';

export default {
  components: {
    headPhoto, ranklist,
  },
  data() {
    return {
      indexBg: `url(${bgUrl})`,
      userInfo: {},
      currentTab: 'total',
      myRank: {
        exam_rank: '',
        guan_num: '',
        pk_rank: '',
        star_num: '',
        total_rank: '',
      },
      rankTypes: [
        {
          title: '总榜',
          key: 'total',
        },
        {
          title: 'PK榜',
          key: 'pk',
        },
        {
          title: '考核榜',
          key: 'exam',
        },
      ],
      rankData: {
        total: [
        ],
        pk: [
        ],
        exam: [
        ],
      },
    };
  },
  computed: {
    selectedTab() {
      return this.currentTab;
    },
  },
  mixins: [getWechatInfo],
  methods: {
    switchTab(e, tabKey) {
      this.currentTab = tabKey;
      console.log(tabKey, 'adsfa');
    },
  },
  mounted() {
    getRankBoardPersonalInfo({}).then(
      (res) => {
        if (res.retCode === 0) {
          this.myRank = res.data;
        }
      },
    );
    console.log('rankrankrank;');
    getRankBoardOverview({}).then(
      (res) => {
        if (res.retCode === 0) {
          this.rankData = res.data;
        }
      },
    );
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="less">
@import '../../assets/less/index.less';
@import '../../assets/iconfont/iconfont.wxss';
.rank-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100vh;

    z-index: 0;
  }
  .rank-overview {
    position: relative;
    margin-top: 100rpx;
    .rank-avatar {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      
      .userinfo {
        display: flex;
        align-items: flex-end;
        .star {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffff99;
          .star-number {
            color: #FFF;
          }
        }
      }
    }
    .rank-rst {
      width: 560rpx;
      height: 300rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: auto;
      font-size: 32rpx;
    }
  }
  .rank-page {
    flex-grow: 1;
    margin-top: 60rpx;
    // background-color:  rgb(40,168,168);
    width: 90%;
    z-index: 2;
    .tabs {
      display: flex;
      justify-content: space-between;
      .tab {
        font-size: 40rpx;
        flex-grow: 1;
        text-align: center;
        &.current {
          border-bottom: 1px solid #FFF;
        }
      }
    }
  }
}
</style>
