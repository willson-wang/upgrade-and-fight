<template>
  <div class="rank-list-container">
    <div class="rank-list" v-for="(item,index) in ranklist" :key="index">
      <div v-if="type === 'pk' || type === 'exam'"></div>
      <div v-if="type === 'total'" class="rank-user">
        <div>{{ item.rank }}</div>
        <div class="avatar">
            <img :src="item.customer.avatar_url"/>
        </div>
        <div class="user-name">{{item.customer && item.customer.username}}</div>
      </div>
      <div class="rank-result" v-if="type === 'pk'">{{item.result}}</div>
      <div v-if="type === 'pk' || type === 'exam'">{{item.avgScore}}</div>
      <div class="star" v-else>
        <i class="icon icon-star1"></i>
        <div class="star-number">{{item.star_num}}</div>
      </div>
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
.rank-list-container {
  display: flex;
  flex-direction: column;
  // align-items: flex-between;
  .rank-list {
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    .rank-user {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 60rpx;
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
    .star {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100rpx;
      color: #ffff99;
      .star-number {
            color: #FFF;
            margin-left: 20rpx;
          }
    }
  }
}

</style>
