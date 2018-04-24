<template>
  <div class="error-log-container">
    <div class="all-error scroll-view">
      <div class="error-item" v-for="(error,index) in errorLogs" :key="index">
        <div class="title">
          <div class="question">{{error.question}}</div>
          <div class="bookmark" @click="e => cancelBookmark(e,error.id)">取消收藏</div>
        </div>
        <div class="log-at">收藏于: {{error.created_on}}</div>
      </div>
      <div class="loading" v-if="scrollView.loading">正在加载...</div>
      <div class="loading-over" v-if="scrollView.loadingOver">已加载全部</div>
    </div>
  </div>
</template>

<script>
import { getErrorLibList, cancelCollect } from '@/api/errorlog';

export default {
  data() {
    return {
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
  },
  onPullDownRefresh() {
    this.init(true);
  },
  onReachBottom() {
    this.scrollToLower();
  },
  methods: {
    init() {
      getErrorLibList({ pageno: 1 }).then(
        (res) => {
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
          if (res.data.data === false) {
            this.scrollView.loadingOver = true;
          } else {
            // res;
          }
        },
      );
    },
    cancelBookmark(e, questId) {
      cancelCollect({ quest_id: questId });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less">

.error-log-container {
  min-height: 100vh;
  background-color: #F2F2F2;
  .all-error {
    .error-item {
      padding-top: 50rpx;
      padding-bottom: 40rpx;
      border-bottom: 1rpx solid #797979;
      position: relative;
      .title {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .question {
          font-size: 36rpx;
          color: #333333;
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
        color: #333333;
        position: absolute;
        bottom: 0;
        right: 200rpx;
      }
    }
  }
}
</style>
