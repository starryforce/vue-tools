import request from '@utils/request'

/**
 *
 * @typedef {Object} GuideEmployeeKpiDetail - 对象属性
 * @property {string} activationCount - 激活人数
 * @property {string} customerCount - 会员数
 * @property {string} repurchaseCount - 复购人数
 * @property {string} currentRepurchaseCount - 当前复购人数
 * @property {number} currentCustomerCount - 当前会员数
 * @property {number} currentSalesAmount - 当前销售额
 * @property {string} currentActivationCount - 当前激活人数
 * @property {string} salesAmount - 销售额
 * @property {number} month - 月份
 *
 * @typedef {Object} GuideEmployeeDetail - 客户信息
 * @property {number} totalAssignAmount - 总改价额度
 * @property {string} role - 角色
 * @property {string} storeName - 所属店铺姓名
 * @property {string} storeId - 所属店铺id
 * @property {number} lastAssignAmount - 剩余改价额度
 * @property {string} employeeId - 销售员id
 * @property {GuideEmployeeKpiDetail} kpiDetail - Kpi
 * @property {string} employeeName - 姓名
 *
 * @returns {GuideEmployeeDetail} employeeInfo - 会员信息
 */
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

export const getTicketUrl = () => {
  return request({
    url: '/GuideWeChat/GetTicketUrl',
  })
}

export default {
  getGuideEmployeeDetail,
  getGuideEmployeeInviteList,
  getTicketUrl,
}
