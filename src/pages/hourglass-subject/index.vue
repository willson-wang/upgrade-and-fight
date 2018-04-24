<template>
  <div class="container hourglass-bg" :style="{'background-image': backgroundImage}">
    <subject :subject-list="subjectList" @selectEmit="selectHandler" :select="select" :result="result" :current-subject-order="currentSubjectOrder" :current-item="currentItem" :type="1" :is-correct="isCorrect" :cls-name="clsName"></subject>
  </div>
</template>

<script>
// 闯关具体答题
import subject from '@/components/subject';
import { getHourglassSubject, getHourglassSubjectAnswer } from '@/api/hourglass';
import wx, { dialog, wxGetStorage } from '../../utils/wechat';
// import imgUrl from '../../../static/images/bg-big.jpg';

export default {
  name: 'hourglassSubject',
  components: {
    subject,
  },
  data() {
    return {
      subjectList: [],
      select: false,
      result: 0,
      currentSubjectOrder: 1,
      currentItem: '',
      timer: '',
      isCorrect: false,
      clsName: '',
    };
  },
  computed: {
    backgroundImage() {
      return 'url(https://miao.su/images/2018/04/24/hourglass-bg1198f.jpg)';
    },
  },
  methods: {
    selectHandler({ id, index, order }) {
      this.currentItem = index;
      this.select = true;
      console.log(id);
      getHourglassSubjectAnswer({ chuangguan_id: this.chuangguanId, answer_id: id }).then((response) => {
        console.log(response);
        const data = response.data.data;
        this.isCorrect = data.is_right;
        this.clsName = data.is_right ? 'active' : 'error';
        if (data.is_right) {
          this.result += 0.5;
        }
        if (+order >= 10) {
          const str = this.result >= 3 ? '恭喜少年闯关成功!' : '很遗憾闯关失败!';
          const content = `${str},摘得${this.result}颗星星`;
          dialog({
            title: '',
            showCancel: false,
            content,
          }).then((res) => {
            if (res.confirm) {
              wx.navigateBack({ delta: 1 });
            }
          });
          return;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.currentItem = '';
          this.select = false;
          this.currentSubjectOrder += 1;
          this.chuangguanId = this.chuangguanIds[this.currentSubjectOrder - 1].chuangguan_id;
          this.getEveryHourglassSubject(this.chuangguanId, this.currentSubjectOrder);
        }, 500);
      });
    },
    getEveryHourglassSubject(chuangguanId, order) {
      getHourglassSubject({ chuangguan_id: chuangguanId }).then((res) => {
        this.subjectList.length = 0;
        this.subjectList.push({
          order,
          title: res.data.data.question,
          list: res.data.data.answer,
        });
        this.isCorrect = false;
        this.clsName = '';
      });
    },
  },
  onUnload() {
    console.log('onUnload');
    this.subjectList.length = 0;
    this.select = false;
    this.result = 0;
    this.currentSubjectOrder = 1;
    this.currentItem = '';
    this.timer = '';
    this.isCorrect = false;
    this.clsName = '';
    clearTimeout(this.timer);
  },
  onLoad(opt) {
    wxGetStorage('chuangguanIds').then((res) => {
      console.log(res);
      this.chuangguanIds = JSON.parse(res.data);
      this.chuangguanId = this.chuangguanIds[this.currentSubjectOrder - 1].chuangguan_id;
      this.getEveryHourglassSubject(this.chuangguanId, this.currentSubjectOrder);
    });
    console.log('onload', opt, this.currentSubjectOrder);
  },
};
</script>

<style lang="less" scoped>
.container {
  justify-content: flex-start;
}

.hourglass-bg {
  background-size: cover;
  background-position:center;
}
</style>





