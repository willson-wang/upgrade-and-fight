import { wxGet } from '@/utils/wechat';

// 获取闯关列表
export function getHourglass(data = {}) {
  console.log(data);
  return wxGet({
    url: '/api/index.php?r=chuang-guan/get-chuang-guan-list',
    data,
  });
}

export default {};
