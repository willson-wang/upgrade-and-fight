<template>
  <div class="rank-container">
    <div class="rank-list" v-for="(item,index) in ranklist" :key="index">
      <div>
        <div class="avatar"></div>
        <div>{{item.name}}</div>
      </div>
      <div v-if="type === 'pk'">{{item.result}}</div>
      <div v-if="type === 'final'">{{item.avgScore}}</div>
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

<style>

</style>
