<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    console.log('app created and cache logs by setStorageSync');
  },
};
</script>

<style lang="less">
@import (reference) './assets/less/index.less';
/*
Blue #20A0FF Success #13CE66 Warning #F7BA2A Danger #FF4949
Black #1F2D3D  Light Black #324057 Extra Light Black #475669
Dark White #F9FAFC Extra Light Gray #d1dbe5
*/ 
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: @color-body-bg;
  color: @color-font1;
  overflow: hidden;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

page {
  height: 100%;
}
</style>
