import http from '@/utils/http';
import { wxGetStorage } from '@/utils/wechat';

// 排行榜个人信息
export function getRankBoardPersonalInfo(params = {}) {
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
        return http.getRequest({
          url: '/api/index.php?r=rank-broad/persion-info',
          params: p,
        }).then(
          (result) => {
            return result.data;
          },
        );
      },
    );
}

export function getRankBoardOverview(params = {}) {
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
        return http.getRequest({
          url: '/api/index.php?r=rank-broad/rank-broads',
          params: p,
        }).then(
          (result) => {
            return result.data;
          },
        );
      },
    );
}

export default {};
