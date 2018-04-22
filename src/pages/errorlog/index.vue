<template>
  <div class="error-log-container">
      <div class="all-error">
        <div class="error-item" v-for="(error,index) in errorLogs" :key="index">
          <div class="title">
            <div class="question">{{error.question}}</div>
            <div class="bookmark" @click="e => cancelBookmark(e,error.id)">取消收藏</div>
          </div>
          <div class="log-at">收藏于: {{error.created_on}}</div>
        </div>
      </div>
  </div>
</template>

<script>
import { getErrorLibList, cancelCollect } from '@/api/errorlog';

export default {
  data() {
    return {
      errorLogs: [
        {
          id: '68',
          type: 1,
          question: 'ERP中签约的置业顾问是A，上了云客后数据同步到云客，而置业顾问A这时候离职了，把这个客户分给置业顾问B，那签约的业绩属于A还是属于B的？ ',
          created_on: '2018-04-14 19:02:43',
          modified_on: '2018-04-14 19:02:43',
          answer: {
            quest_id: 68,
            question: 'ERP中签约的置业顾问是A，上了云客后数据同步到云客，而置业顾问A这时候离职了，把这个客户分给置业顾问B，那签约的业绩属于A还是属于B的？ ',
            answer: [
              {
                label: 'A',
                answer: '属于置业顾问A',
                answer_id: 189,
                is_right: 1,
              },
              {
                label: 'B',
                answer: '属于置业顾问B',
                answer_id: 190,
                is_right: 0,
              },
            ],
          },
          bookmark: true,
        },
        {
          id: '68',
          type: 1,
          question: 'ERP中签约的置业顾问是A，上了云客后数据同步到云客，而置业顾问A这时候离职了，把这个客户分给置业顾问B，那签约的业绩属于A还是属于B的？ ',
          created_on: '2018-04-14 19:02:43',
          modified_on: '2018-04-14 19:02:43',
          answer: {
            quest_id: 68,
            question: 'ERP中签约的置业顾问是A，上了云客后数据同步到云客，而置业顾问A这时候离职了，把这个客户分给置业顾问B，那签约的业绩属于A还是属于B的？ ',
            answer: [
              {
                label: 'A',
                answer: '属于置业顾问A',
                answer_id: 189,
                is_right: 1,
              },
              {
                label: 'B',
                answer: '属于置业顾问B',
                answer_id: 190,
                is_right: 0,
              },
            ],
          },
          bookmark: true,
        },
        {
          id: '68',
          type: 1,
          question: 'ERP中签约的置业顾问是A，上了云客后数据同步到云客，而置业顾问A这时候离职了，把这个客户分给置业顾问B，那签约的业绩属于A还是属于B的？ ',
          created_on: '2018-04-14 19:02:43',
          modified_on: '2018-04-14 19:02:43',
          answer: {
            quest_id: 68,
            question: 'ERP中签约的置业顾问是A，上了云客后数据同步到云客，而置业顾问A这时候离职了，把这个客户分给置业顾问B，那签约的业绩属于A还是属于B的？ ',
            answer: [
              {
                label: 'A',
                answer: '属于置业顾问A',
                answer_id: 189,
                is_right: 1,
              },
              {
                label: 'B',
                answer: '属于置业顾问B',
                answer_id: 190,
                is_right: 0,
              },
            ],
          },
          bookmark: true,
        },
        {
          id: '68',
          type: 1,
          question: 'ERP中签约的置业顾问是A，上了云客后数据同步到云客，而置业顾问A这时候离职了，把这个客户分给置业顾问B，那签约的业绩属于A还是属于B的？ ',
          created_on: '2018-04-14 19:02:43',
          modified_on: '2018-04-14 19:02:43',
          answer: {
            quest_id: 68,
            question: 'ERP中签约的置业顾问是A，上了云客后数据同步到云客，而置业顾问A这时候离职了，把这个客户分给置业顾问B，那签约的业绩属于A还是属于B的？ ',
            answer: [
              {
                label: 'A',
                answer: '属于置业顾问A',
                answer_id: 189,
                is_right: 1,
              },
              {
                label: 'B',
                answer: '属于置业顾问B',
                answer_id: 190,
                is_right: 0,
              },
            ],
          },
          bookmark: true,
        },
      ],
    };
  },
  methods: {
    cancelBookmark(e, questId) {
      cancelCollect({ quest_id: questId });
    },
  },
  created() {
    getErrorLibList({ pageno: 1 });
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
