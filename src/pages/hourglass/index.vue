<template>
  <div class="hourglass" :style="{'background-image': backgroundImage}">
    <div class="hourglass-content" :style="{'background-image': ''}">
      <div class="scoreTotle">
        <i  class="icon icon-star1"></i>
        <span>{{currentScoreTotle}}/50</span>
      </div>
      <garden @linkTo="linkTo" v-for="(item, key) in gardenList" :key="key" :order="item.garden" :starts="item.rank" :left="item.left">
      </garden>
    </div>
  </div>
</template>

<script>
// 闯关答题页面
import garden from '@/components/garden';
import { wxNavigateTo, wxGetStorage, wxSetStorage, wxShowToast } from '@/utils/wechat';
import { getHourglass } from '@/api/hourglass';
// import imgUrl from '../../../static/images/hourglass-bg.png';
import imgUrl2 from '../../../static/images/bg.png';

const POSITION = {
  1: {
    left: '30%',
  },
  2: {
    left: '36%',
  },
  3: {
    left: '24%',
  },
  4: {
    left: '32%',
  },
  5: {
    left: '32%',
  },
  6: {
    left: '26%',
  },
  7: {
    left: '44%',
  },
  8: {
    left: '40%',
  },
  9: {
    left: '40%',
  },
  10: {
    left: '40%',
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
      return 'url(http://ww1.sinaimg.cn/large/b0f3038egy1fqo7ptfv4wj20ch0k77gj.jpg)';
    },
    backgroundImage2() {
      return `url(${imgUrl2})`;
    },
  },
  methods: {
    linkTo(order) {
      console.log(this.gardenList[this.gardenList.length - (+order - 1)]);
      const isGoNext = order > 1 ? (this.gardenList[this.gardenList.length - (+order - 1)].rank >= 3) : true;
      const chuangguanIds = JSON.stringify(this.gardenList[this.gardenList.length - order].list);
      if (isGoNext) {
        console.log(wxNavigateTo, chuangguanIds);
        wxSetStorage({ key: 'chuangguanIds', data: chuangguanIds });
        wxNavigateTo(`../hourglass-subject/main?order=${order}`).catch((e) => {
          console.log('error', e);
        });
      } else {
        wxShowToast({
          title: '亲! 请先解锁上一关！',
        });
      }
    },
  },
  onShow() {
    // 放在onshow的目的是，在其它页面使用navigateBack时，能够重新调用一次接口
    console.log('hourglass mounted');
    wxGetStorage('userInfo')
    .then((res) => {
      if (res.data) {
        const userInfo = JSON.parse(res.data);
        console.log('userInfo', userInfo);
        return wxGetStorage('userId');
      }
    })
    .then((r) => {
      console.log('r', r);
      if (r.data) {
        console.log('cst_id', r.data);
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
  onLoad() {
    console.log('hourglass onload');
  },
};
</script>

<style lang="less" scoped>
// 直接使用background引入背景图片路径有问题，所以改成动态设置背景图，这里需要注意的是，如果是本地图片，动态设置也不行，需要把图片大小转化成满足转成base64要求大小，另外也已使用在线图片
  @import '../../assets/less/index';
  @import '../../assets/iconfont/iconfont.wxss';
  .hourglass {
    height: 154%;
    box-sizing: border-box;
    overflow: auto;
    // background-image: url('../../../static/images/bg.png');
    background-size: cover;
    background-position:center;
    .hourglass-content {
      width: 100%;
      height: 100%;
      overflow: auto;
      background-size: cover;
      background-position:center;
    }
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
        color: #ffff99;
      }
    }
  }
</style>

