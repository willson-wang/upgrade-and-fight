<template>
  <div class="container">
    <subject :subject-list="subjectList" @selectEmit="selectHandler" :select="select" :result="result" :current-subject-order="currentSubjectOrder" :current-item="currentItem"></subject>
  </div>
</template>

<script>
// 闯关具体答题
import subject from '@/components/subject';
import subjectList from './data';
import wx, { dialog } from '../../utils/wechat';

export default {
  name: 'hourglassSubject',
  components: {
    subject,
  },
  data() {
    return {
      subjectList,
      select: false,
      result: 0,
      currentSubjectOrder: 1,
      currentItem: '',
      timer: '',
    };
  },
  methods: {
    selectHandler({ item, index, order }) {
      this.currentItem = index;
      this.select = true;
      if (item.isCorrect) {
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
            wx.navigateTo({ url: '../hourglass/main' });
          }
        });
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.currentItem = '';
        this.select = false;
        this.currentSubjectOrder += 1;
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  justify-content: flex-start;
}
</style>





