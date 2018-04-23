import http from '@/utils/http';
import { wxGetStorage } from '@/utils/wechat';

// 获取错题库列表
export function getErrorLibList(params = {}) {
  return wxGetStorage('userInfo')
    .then((res) => {
      if (res.data) {
        const userInfo = JSON.parse(res.data);
        console.log(userInfo);
        return wxGetStorage('userId');
      }
    })
    .then(
      (res) => {
        const p = Object.assign(params, { cst_id: res.data });
        http.getRequest({
          url: '/api/index.php?r=error-lib/list',
          params: p,
        });
      },
    );
}

// 取消收藏
export function cancelCollect(params = {}) {
  return wxGetStorage('userInfo')
    .then((res) => {
      if (res.data) {
        const userInfo = JSON.parse(res.data);
        console.log(userInfo);
        return wxGetStorage('userId');
      }
    })
    .then(
      (res) => {
        const p = Object.assign(params, { cst_id: res.data });
        http.postRequest({
          url: '/api/index.php?r=error-lib/cancel-collect',
          params: p,
        });
      },
    );
}

export default {};
