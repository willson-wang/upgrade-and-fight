<template>
  <div class="rank-container">
    <div class="rank-list" v-for="(item,index) in ranklist" :key="index">
      <div class="rank-user">
        <div>{{ item.rank }}</div>
        <div class="avatar">
            <img :src="item.customer.avatar_url"/>
        </div>
        <div class="user-name">{{item.customer && item.customer.username}}</div>
      </div>
      <div class="rank-result" v-if="type === 'pk'">{{item.result}}</div>
      <div v-if="type === 'exam'">{{item.avgScore}}</div>
      <div v-else>{{item.star}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: 'String',
    },
    ranklist: {
      type: 'Array',
    },
  },
  mounted() {
    console.log(this.type, this.ranklist, '=========');
  },
};
</script>

<style lang="less">
.rank-container {
  display: flex;
  align-items: flex-start;
  .rank-list {
    display: flex;
    justify-content: space-around;
    height: 80rpx;
    .rank-user {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .avatar {
        img {
          width: 40rpx;
          height: 40rpx;
          border-radius: 20rpx;
          margin: 20rpx;
          margin-right: 20rpx;
        }

      }
      .user-name {
        font-size: 28rpx;
      }
    }
  }
}

</style>
