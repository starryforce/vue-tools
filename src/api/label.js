import request from '@utils/request'
/**
 *
 * @param {Object} [request] - 请求体
 * @param {number} [request.pageNo] - 页码
 * @param {number} [request.pageSize] - 页大小
 */
export const getLabelList = ({ pageNo = 1, pageSize = 100 } = {}) => {
  return request({
    url: '/GuideLabels/GetMemberLabelList',
    data: {
      CurrentPage: pageNo,
      PageSize: pageSize,
    },
  })
}
/**
 *
 * @param {string} id - 标签ID
 */
export const getLabelDetail = id => {
  return request({
    url: '/GuideLabels/GetLabelDetail',
    data: {
      Id: id,
    },
  })
}
/**
 *
 * @param {Object} request - 请求体
 * @param {string} request.labelID - 标签 ID
 * @param {string[]} request.customerIDList - 会员 ID 集合
 */
export const batchAddCustomer = ({ labelID, customerIDList = [] }) => {
  return request({
    url: '/tocustomer/labelbatchaddcustomer',
    data: {
      labelId: labelID,
      customerIds: customerIDList,
    },
  })
}
/**
 *
 * @param {Object} request - 请求体
 * @param {string} request.labelID - 标签 ID
 * @param {string[]} request.customerIDList - 会员 ID 集合
 */
export const batchRemoveCustomer = ({ labelID, customerIDList = [] }) => {
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
