import request from '@utils/request'

export const getMemberList = () => {
  return request({
    url: '/member/GetMemberList',
  })
}

export const getMemberInformation = id => {
  return request({
    url: '/member/GetMemberInformation',
    data: {
      id,
    },
  })
}

export const getLabelList = () => {
  return request({
    url: '/member/GetLabelList',
  })
}

export default {
  getMemberList,
  getMemberInformation,
  getLabelList,
}
