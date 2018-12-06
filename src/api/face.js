import request from '@utils/request'

/**
 * @param {Object} request - 请求体
 * @param {number} request.pageNo - 当前页码 例子：1
 * @param {number} request.pageSize - 每页显示数目 例子：10
 *
 * @typedef {Object} ToShopMemberObject 到店会员信息
 * @property {number} growup - 会员成长值
 * @property {string} memberCard - 会员卡号
 * @property {string} expectedDate - 预产期
 * @property {number} consumAmount - 交易金额
 * @property {number} ksUserTag - 旷视用户类型
 * @property {number} grade - 会员等级
 * @property {number} isFaceId - 是否已经人脸识别 0：否 1：是
 * @property {string} picUrl - 头像地址
 * @property {number} consumCount - 交易次数
 * @property {string} gradeName - 会员等级名称
 * @property {string} birthday - 生日
 * @property {string} faceIdUrl - faceid图片地址
 * @property {number} unitPrice - 客单价
 * @property {string} buyerNick - 会员名
 * @property {string} toShopTime - 最近到店时间
 * @property {string} customerName - 姓名
 * @property {number} isUpdategrade - 是否手动修改等级 0：否 1：是
 * @property {string} firstTradeTime - 第一次交易时间
 * @property {number} ksAge - 预测的年龄
 * @property {string} customerId - 会员ID
 * @property {string} ksUserId - 旷视用户ID
 * @property {string} createTime - 注册时间
 * @property {number} ksGender - 性别 0: 男 1:女
 * @property {number} memberAmount - 会员卡余额
 * @property {string} lastTradeTime - 最后交易时间
 * @property {string} babyBirthday - 宝宝生日
 * @property {string} lastActivityTime - 最后参加活动时间
 * @property {string} ksFaceId - 旷视faceid
 * @property {number} isGeneral - 是否通用会员 0：否 1：是
 * @property {string} mobile - 手机号
 * @property {string} ksTime - 进店时间
 * @property {number} isRealName - 是否已经实名认证 0：否 1：是
 * @property {number} integralCount - 积分余额
 * @property {number} isPay - 是否是付费会员 0：否 1：是
 * @property {string} ksShopId - 旷视店铺ID
 *
 * @returns {number} totalCount - 记录总数
 * @returns {ToShopMemberObject[]} toShopList - 到店对象集合
 */
export const todayFaceList = ({ pageNo = 1, pageSize = 10 } = {}) => {
  return request({
    url: '/tocustomer/toshoplist',
    data: {
      currentPage: pageNo,
      pageSize: pageSize,
    },
  })
}

/**
 *
 * @param {Object} request - 请求体
 * @param {string} request.memberID - 会员ID
 * @param {string} request.ksFaceID - 旷视faceid
 */
export const bindFace = ({ memberID, ksFaceID }) => {
  return request({
    url: '/tocustomer/faceidbind',
    data: {
      customerId: memberID,
      ksFaceId: ksFaceID,
    },
  })
}

/**
 *
 * @param {string} ksFaceID - 旷视的faceid
 */
export const unbindFace = ksFaceID => {
  return request({
    url: '/tocustomer/faceidremove',
    data: {
      ksFaceId: ksFaceID,
    },
  })
}

export default {
  todayFaceList,
  bindFace,
  unbindFace,
}
