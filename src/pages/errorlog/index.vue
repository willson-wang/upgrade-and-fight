<template>
  <div class="container">
      <div class="all-error"
          v-for="(error,index) in errorLogs" :key="index">
        <div class="error-item">
          <div class="question">{{error.question}}</div>
          <div class="log-at">收藏于: {{error.logAt}}</div>
          <div class="bookmark">取消收藏</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorLogs: [
        {
          question: '云客的全称是什么？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
        {
          question: '云客的全称是什么？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
        {
          question: '云客的CEO是谁？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
        {
          question: '云客的CEO是谁？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
        {
          question: '云客的CEO是谁？',
          logAt: '2018-2-16 17:09:09',
          bookmark: true,
        },
      ],
    };
  },
};
</script>

<style lang="less">

</style>
