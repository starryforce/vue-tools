import request from '@utils/request'

export const getGuideEmployeeDetail = () => {
  return request({
    url: '/GuideEmployee/GetGuideEmployeeDetail',
  })
}

export const getGuideEmployeeInviteList = ({ page = 1, size = 10 } = {}) => {
  return request({
    url: '/GuideEmployee/GetGuideEmployeeInviteList',
    data: {
      currentPage: page, // 页码
      pageSize: size, // 分页大小
    },
  })
}

export default {
  getGuideEmployeeDetail,
  getGuideEmployeeInviteList,
}
