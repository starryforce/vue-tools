import request from '@utils/request'

export const getMemberList = ({ keyword, belong, face, labels }) => {
  return request({
    url: '/member/GetMemberList',
    data: { keyword, belong, face, labels },
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
