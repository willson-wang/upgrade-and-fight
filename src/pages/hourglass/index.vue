<template>
  <div class="hourglass">
    <div class="scoreTotle">
      <i class="icon icon-star1"></i>
      <span>{{currentScoreTotle}}/50</span>
    </div>
    <garden @linkTo="linkTo" v-for="item in gardenList" :key="item.garden" :order="item.garden" :starts="item.score" :left="item.left"></garden>
  </div>
</template>

<script>
// 闯关答题页面
import garden from '@/components/garden';
import { wxNavigateTo, wxGetStorage } from '@/utils/wechat';
import { getHourglass } from '@/api/hourglass';

export default {
  name: 'hourglass',
  components: {
    garden,
  },

  data() {
    return {
      gardenList: [
        {
          garden: 1,
          score: 5,
          left: 100,
        },
        {
          garden: 2,
          score: 4,
          left: 60,
        },
        {
          garden: 3,
          score: 4.5,
          left: 80,
        },
        {
          garden: 4,
          score: 0,
          left: 70,
        },
        {
          garden: 5,
          score: 0,
          left: 120,
        },
        {
          garden: 6,
          score: 0,
          left: 100,
        },
        {
          garden: 7,
          score: 0,
          left: 105,
        },
        {
          garden: 8,
          score: 0,
          left: 140,
        },
        {
          garden: 9,
          score: 0,
          left: 130,
        },
        {
          garden: 10,
          score: 0,
          left: 110,
        },
      ],
    };
  },
  computed: {
    newGardenList() {
      return this.gardenList.reverse();
    },
    currentScoreTotle() {
      let totle = 0;
      this.gardenList.forEach((item) => {
        totle += item.score;
      });
      return totle;
    },
  },
  methods: {
    linkTo(order) {
      console.log(order);
      wxNavigateTo(`../hourglass-subject/main?order=${order}`);
    },
  },
  mounted() {
    wxGetStorage('userInfo').then((res) => {
      if (res.data) {
        const userInfo = JSON.parse(res.data);
        console.log(userInfo);
        getHourglass({ cst_id: '1' }).then((response) => {
          console.log(response);
        });
      }
    });
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/iconfont/iconfont.wxss';
  .hourglass {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    .scoreTotle {
      position: fixed;
      left: 10px;
      top: 20px;
      i,span {
        display: block;
        width: 80px;
        text-align: center;
      }
      i {
        font-size: 30px;
      }
    }
  }
</style>

