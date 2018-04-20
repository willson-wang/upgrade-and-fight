<template>
  <div class="hourglass" :style="{'background-image': backgroundImage}">
    <div class="scoreTotle">
      <i class="icon icon-star1"></i>
      <span>{{currentScoreTotle}}/50</span>
    </div>
    <garden @linkTo="linkTo" v-for="(item, key) in gardenList" :key="key" :order="item.garden" :starts="item.rank" :left="item.left">
    </garden>
  </div>
</template>

<script>
// 闯关答题页面
import garden from '@/components/garden';
import { wxNavigateTo, wxGetStorage } from '@/utils/wechat';
import { getHourglass } from '@/api/hourglass';
import imgUrl from '../../../static/images/bg.png';

const POSITION = {
  1: {
    left: '17%',
  },
  2: {
    left: '7%',
  },
  3: {
    left: '6%',
  },
  4: {
    left: '9%',
  },
  5: {
    left: '14%',
  },
  6: {
    left: '20%',
  },
  7: {
    left: '28%',
  },
  8: {
    left: '34%',
  },
  9: {
    left: '38%',
  },
  10: {
    left: '37%',
  },
};
export default {
  name: 'hourglass',
  components: {
    garden,
  },

  data() {
    return {
      gardenList: [],
    };
  },
  computed: {
    currentScoreTotle() {
      let totle = 0;
      this.gardenList.forEach((item) => {
        totle += item.rank;
      });
      return totle;
    },
    backgroundImage() {
      return `url(${imgUrl})`;
    },
  },
  methods: {
    linkTo(order) {
      console.log(this.gardenList[this.gardenList.length - (+order - 1)]);
      const isGoNext = order > 1 ? (this.gardenList[this.gardenList.length - (+order - 1)].rank >= 3) : true;
      const chuangguanIds = JSON.stringify(this.gardenList[this.gardenList.length - order].list);
      if (isGoNext) {
        console.log(wxNavigateTo, chuangguanIds);
        wxNavigateTo(`../hourglass-subject/main?order=${order}&chuangguan_ids=${chuangguanIds}`);
      }
    },
  },
  mounted() {
    wxGetStorage('userInfo')
    .then((res) => {
      if (res.data) {
        const userInfo = JSON.parse(res.data);
        console.log(userInfo);
        return wxGetStorage('userId');
      }
    })
    .then((r) => {
      if (r.data) {
        return getHourglass({ cst_id: r.data });
      }
    })
    .then((response) => {
      const info = response.data.data;
      const arr = [];
      for (const props in info) {
        if (info.hasOwnProperty(props)) {
          info[props].left = POSITION[props].left;
          info[props].garden = props;
          arr.push(info[props]);
        }
      }
      this.gardenList = arr.reverse();
    })
    .catch((err) => {
      console.log(err);
    });
  },
  onLoad() {},
};
</script>

<style lang="less" scoped>
// 直接使用background引入背景图片路径有问题，所以改成动态设置背景图，这里需要注意的是，如果是本地图片，动态设置也不行，需要把图片大小转化成满足转成base64要求大小，另外也已使用在线图片
  @import '../../assets/iconfont/iconfont.wxss';
  .hourglass {
    height: 154%;
    box-sizing: border-box;
    overflow: auto;
    // background-image: url('../../../static/images/bg.png');
    background-size: cover;
    background-position:center;
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

