import request from '@utils/request'

export const getCurrentUser = () => {
  return request({
    url: '/user/GetCurrentUser',
  })
}

export const getStoreList = () => {
  return request({
    url: '/store/GetStoreList',
    data: { condition: '', state: '', desc: 0, currentPage: 1, pageSize: 10 },
  })
}

// 默认全部导出
export default {
  getCurrentUser,
  getStoreList,
}
