<template>
  <div class="">
      <div>
        总榜：NO 1

PK榜：NO 3

PK榜：NO 3
      </div>
      <div class="rank-page">
        <div class="tabs"
          v-for="(rankType,index) in rankTypes" :key="index">
          <div class="tab"  @click="e => switchTab(e,rankType.key)">
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
import ranklist from './ranklist';

export default {
  components: {
    ranklist,
  },
  data() {
    return {
      currentTab: 'total',
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
          key: 'final',
        },
      ],
      rankData: {
        total: [
          {
            img: '',
            name: '小王',
            star: 40,
          },
          {
            img: '',
            name: '小王',
            star: 30,
          },
          {
            img: '',
            name: '小王',
            star: 20,
          },
          {
            img: '',
            name: '小王',
            star: 10,
          },
          {
            img: '',
            name: 'yuki',
            star: 40,
          },
        ],
        pk: [
          {
            img: '',
            name: '小王',
            result: '5胜1负',
            star: 40,
          },
          {
            img: '',
            name: '小王',
            result: '5胜1负',
            star: 30,
          },
          {
            img: '',
            name: '小王',
            result: '5胜1负',
            star: 20,
          },
          {
            img: '',
            name: '小王',
            result: '5胜1负',
            star: 10,
          },
          {
            img: '',
            name: 'yuki',
            result: '5胜1负',
            star: 40,
          },
        ],
        final: [
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
          {
            img: '',
            name: '小王',
            avgScore: '99分/5次',
          },
        ],
      },
    };
  },
  computed: {
    selectedTab() {
      return this.currentTab;
    },
  },
  methods: {
    switchTab(e, tabKey) {
      this.currentTab = tabKey;
      console.log(tabKey, 'adsfa');
    },
  },
};
</script>

<style lang="less">

</style>
