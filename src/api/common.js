import http from '@/utils/http';

export function saveUserInfo(params = {}) {
  return http.postRequest({
    url: '/api/index.php?r=customer/save-customer',
    params,
  });
}

export function getSessionKey(params = {}) {
  return http.getRequest({
    url: '/api/index.php?r=customer/authcode',
    params,
  });
}

// 获取排行榜个人信息
export function getRankBroadInfo(params = {}) {
  return http.getRequest({
    url: '/api/index.php?r=rank-broad/persion-info',
    params,
  });
}

export default {};
