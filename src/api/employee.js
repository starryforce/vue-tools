import request from '@utils/request'

/**
 *
 * @description  导购端读取店员详情
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

/**
 *
 * @description 导购端读取店员邀请会员列表
 *
 * @typedef {Object} GuideEmployeeInviteHistory - 对象属性
 * @property {string} employeeId - 店员id
 * @property {string} customerMobile - 会员手机号
 * @property {string} customerId - 会员id
 * @property {string} id - 记录id
 * @property {string} customerName - 会员名称
 *
 * @param {number} request.pageNo - 页码 例子：1
 * @param {number} request.pageSize - 页大小 例子：10
 * @returns {GuideEmployeeInviteHistory[]} 邀请会员列表
 */
export const getGuideEmployeeInviteList = ({
  pageNo = 1,
  pageSize = 10,
} = {}) => {
  return request({
    url: '/GuideEmployee/GetGuideEmployeeInviteList',
    data: {
      currentPage: pageNo,
      pageSize: pageSize,
    },
  })
}

export const getTicketUrl = () => {
  return request({
    url: '/GuideWeChat/GetTicketUrl',
  })
}

export const employeeLogin = ({ mobile, password }) => {
  return request({
    url: '/GuideEmployee/EmployeeLogin',
    data: {
      Mobile: mobile,
      passWord: password,
    },
  })
}

export const getEmpleeAssignAmounts = () => {
  return request({
    url: '/GuideEmployee/GetEmpleeAssignAmounts',
    data: {
      CurrentPage: 1,
      PageSize: 100,
      Year: parseInt(Date.now() / 31556926000 + 1970),
      Month: parseInt(((Date.now() / 31556926000 + 1970) % 1) * 12 + 1),
    },
  })
}

export default {
  getGuideEmployeeDetail,
  getGuideEmployeeInviteList,
  getTicketUrl,
  getEmpleeAssignAmounts,
  employeeLogin,
}
