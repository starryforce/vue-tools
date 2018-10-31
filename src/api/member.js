import request from '@utils/request'

export const getMemberList = () => {
  return request({
    url: '/member/GetMemberList',
  })
}
export const getLabelList = () => {
  return request({
    url: '/member/GetLabelList',
  })
}

export default {
  getMemberList,
  getLabelList,
}
