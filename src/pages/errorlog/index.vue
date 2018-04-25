<template>
  <div class="error-log-container">
    <div class="bg" :style="{'background-image': indexBg}"></div>
    <div class="all-error scroll-view">
      <div class="error-item" v-for="(error,index) in errorLogs" :key="index">
        <div class="title">
          <div class="question">{{error.question}}</div>
          <div class="bookmark" @click="e => cancelBookmark(e,index,error.id)">取消收藏</div>
        </div>
        <div class="log-at">收藏于: {{error.created_on}}</div>
      </div>
      <div class="loading" v-if="scrollView.loading">正在加载...</div>
      <div class="loading-over" v-if="scrollView.loadingOver">已加载全部</div>
    </div>
    <div v-if="errorLogs.length === 0">您还没有错题~</div>
  </div>
</template>

<script>
import { getErrorLibList, cancelCollect } from '@/api/errorlog';
import bgUrl from '../../../static/images/bg-whale.jpg';

function data() {
  return {
    indexBg: `url(${bgUrl})`,
    pagination: {
      pageIndex: 1,
    },
    scrollView: {
      loading: false,
      loadingOver: false,
      scrollY: true,
    },
    errorLogs: [
    ],
  };
}

export default {
  data,
  onShow() {
    this.init();
  },
  onPullDownRefresh() {
    this.init(true);
  },
  onReachBottom() {
    this.scrollToLower();
  },
  methods: {
    init(isRefresh = false) {
      getErrorLibList({ pageno: 1 }).then(
        (res) => {
          if (isRefresh) {
            this.errorLogs = res.data;
          }
          this.errorLogs = res.data;
          console.log(res, '---');
        },
        (err) => {
          console.log('xxx', err);
        },
      );
    },
    // scroll
    scrollToLower() {
      this.pagination.pageIndex += 1;
      const { pageIndex = 1 } = this.pagination;
      this.scrollView.loading = true;
      this.scrollView.loadingOver || getErrorLibList({ pageno: pageIndex }).then(
        (res) => {
          this.scrollView.loading = false;
          if (res.retCode === 0) {
            this.errorLogs = this.errorLogs.concat(res.data);
          }
          if (res.data === false || res.data.length === 0) {
            this.scrollView.loadingOver = true;
          } else {
            // res;
          }
        },
        (err) => {
          console.log('errrrrr', err);
        },
      );
    },
    cancelBookmark(e, index, questId) {
      cancelCollect({ quest_id: questId });
      this.errorLogs.splice(index, 1);
    },
  },
  mounted() {
  },
};
</script>

<style lang="less">

.error-log-container {
  min-height: 100vh;
  background-color: #F2F2F2;
  .bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100vh;
  }
  .all-error {
    height: 100%;
    .error-item {
      padding-top: 50rpx;
      padding-bottom: 40rpx;
      padding-left: 50rpx;
      padding-right: 50rpx;
      border-bottom: 1rpx solid #797979;
      position: relative;
      color: #FFF;
      .title {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .question {
          font-size: 36rpx;
          word-wrap: auto;
          flex-grow: 1;
          max-width:500rpx;
        }
        .bookmark {
          font-size: 24rpx;
          text-align: center;
          line-height: 50rpx;
          width: 150rpx;
          height: 50rpx;
          padding: 10rpx 20rpx;
          border: 1rpx solid rgba(121,121,121,1);
          border-radius: 10rpx;
        }
      }
      .log-at {
        font-size: 18rpx;
        font-weight: 400;
        position: absolute;
        bottom: 0;
        right: 50rpx;
      }
    }
  }
}
</style>
