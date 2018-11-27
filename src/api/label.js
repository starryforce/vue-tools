import request from '@utils/request'

export const getLabelList = ({ pageNo = 1, pageSize = 100 } = {}) => {
  return request({
    url: '/GuideLabels/GetMemberLabelList',
    data: {
      CurrentPage: pageNo,
      PageSize: pageSize,
    },
  })
}

export const getLabelDetail = id => {
  return request({
    url: '/GuideLabels/GetLabelDetail',
    data: {
      Id: id,
    },
  })
}

export const batchAddCustomer = (labelID, customerIDList = []) => {
  return request({
    url: '/tocustomer/labelbatchaddcustomer',
    data: {
      labelId: labelID,
      customerIds: customerIDList,
    },
  })
}

export const batchRemoveCustomer = (labelID, customerIDList = []) => {
  return request({
    url: '/tocustomer/labelbatchremovecustomer',
    data: {
      labelId: labelID,
      customerIds: customerIDList,
    },
  })
}

export default {
  getLabelList,
  getLabelDetail,
  batchAddCustomer,
  batchRemoveCustomer,
}
