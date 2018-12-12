import request from '@utils/request'
/**
 * @param {Object} [request] - 请求参数
 * @param {number} request.pageNo - 当前页码 例子：1
 * @param {number} request.pageSize - 每页显示数目 例子：20
 * @param {string} [request.customerName] - 姓名 例子：张三
 * @param {string} [request.nick] - 会员昵称 例子：张三
 * @param {string} [request.mobile] - 手机号码
 * @param {string} [request.activityId] - 活动ID
 * @param {string} [request.employeeId] - 店员ID
 * @param {number} [request.isFaceId] - 是否完成人脸识别 -1:全部 0:未识别 1:已识别 例子：-1
 * @param {string} [request.labelIds] - 标签ID，多个用逗号(,)隔开
 * @param {string} [request.createTimeBegin] - 最小注册时间 例子：2018-01-01
 * @param {string} [request.createTimeEnd] - 最大注册时间 例子：2018-11-11
 * @param {string} [request.toShopTimeBegin] - 最小到店时间 例子：2018-01-01
 * @param {string} [request.toShopTimeEnd] - 最大到店时间 例子：2018-11-11
 * @param {string} [request.lastTradeTimeBegin] - 最小最后交易时间 例子：2018-01-01
 * @param {string} [request.lastTradeTimeEnd] - 最大最后交易时间 例子：2018-11-11
 *
 * @returns {number} totalCount 记录总数 例子：1000
 * @returns {CustomerInfo[]} customerList 会员对象集合
 */
export const getMemberList = ({
  pageNo = 1,
  pageSize = 50,
  nick,
  customerName,
  mobile,
  activityId,
  employeeId,
  isFaceId,
  labelIds,
  createTimeBegin,
  createTimeEnd,
  toShopTimeBegin,
  toShopTimeEnd,
  lastTradeTimeEnd,
  lastTradeTimeBegin,
} = {}) => {
  return request({
    url: '/tocustomer/customerlist',
    data: {
      lastTradeTimeBegin,
      createTimeEnd,
      nick,
      mobile,
      activityId,
      employeeId,
      currentPage: pageNo,
      pageSize: pageSize,
      isFaceId,
      createTimeBegin,
      labelIds,
      toShopTimeEnd,
      customerName,
      toShopTimeBegin,
      lastTradeTimeEnd,
    },
  })
}
/**
 * @typedef {Object} LabelInfo - 标签信息对象
 * @property {string} labelId - 标签ID
 * @property {string} labelName - 标签名称
 *
 * @typedef {Object} CusAttributeValue - 对象属性
 * @property {string} attrValue - 自定义属性值
 * @property {string} attrName - 自定义属性名
 *
 * @typedef {Object} CustomerInfo - 客户信息
 * @property {number} growup - 会员成长值
 * @property {string} memberCard - 会员卡号
 * @property {string} expectedDate - 预产期
 * @property {number} consumAmount - 交易金额
 * @property {number} grade - 会员等级
 * @property {LabelInfo[]} autoLabelInfo - 自动标签对象
 * @property {number} isFaceId - 是否已经人脸识别 0：否 1：是
 * @property {string} picUrl - 头像地址
 * @property {number} consumCount - 交易次数
 * @property {string} gradeName - 会员等级名称
 * @property {string} birthday - 生日
 * @property {number} unitPrice - 客单价
 * @property {string} employeeName - 所属导购员
 * @property {string} buyerNick - 会员名
 * @property {string} toShopTime - 最近到店时间
 * @property {string} customerName - 姓名
 * @property {number} isUpdategrade - 是否手动修改等级 0：否 1：是
 * @property {string} firstTradeTime - 第一次交易时间
 * @property {string} id - 会员ID
 * @property {string} storeName - 所属门店
 * @property {string} lastActivityTime - 最后参加活动时间
 * @property {string} createTime - 注册时间
 * @property {string[]} faceIdUrl - 人脸识别图片地址集合
 * @property {CusAttributeValue[]} attributeValue - 会员自定义属性值对象
 * @property {number} memberAmount - 会员卡余额
 * @property {string} lastTradeTime - 最后交易时间
 * @property {string} babyBirthday - 宝宝生日
 * @property {LabelInfo[]} labelInfo - 手动标签对象
 * @property {number} isGeneral - 是否通用会员 0：否 1：是
 * @property {string} mobile - 手机号
 * @property {number} isRealName - 是否已经实名认证 0：否 1：是
 * @property {number} integralCount - 积分余额
 * @property {number} isPay - 是否是付费会员 0：否 1：是
 *
 * @param {string} id - 会员 ID
 * @returns {CustomerInfo} customerInfo - 会员信息
 */
export const getBaseInformation = id => {
  return request({
    url: '/tocustomer/customerget',
    data: {
      customerId: id,
    },
  })
}
// consumeAmount	decimal		消费金额
// unitPrice	decimal		客单价
// lastActivityTime	string		最近参与活动的时间
// lastTradeTime	string		最后交易时间
// consumeCount	int		消费次数
// orderInfo	CusConsumeTradeObject[]		订单对象
export const getConsume = id => {
  return request({
    url: '/tocustomer/consumeget',
    data: {
      customerId: id,
    },
  })
}
// couponUsedCount	int		已使用优惠券数量
// memberAmount	decimal		储值金额
// couponUsableCount	int		可使用优惠券数量
// couponEexpiredCount	int		已过期优惠券数量
// integralCount	int		总积分
export const getAssets = id => {
  return request({
    url: '/tocustomer/assetsget',
    data: {
      customerId: id,
    },
  })
}

/**
 *
 * @param {string} [request.memberID] - 会员id（导购端要，c端不用填）
 * @param {number} request.pageNo - 页码
 * @param {number} request.pageSize - 一页几个
 * @param {number} request.status - 优惠券类型0未使用1已经使用2已过期
 * @param {bool} request.isPostCoupon - 是否邮费券
 *
 * @returns {string} discountExplain - 使用条件
 * @returns {string} couponId - 优惠券id
 * @returns {number} discountNum - 面额
 * @returns {string} name - 优惠券名字
 * @returns {string} availableTime - 有效期
 * @returns {string} discountType - 面额类型0打折1减价
 * @returns {string} id - 领取优惠券记录id
 */
export const getCouponList = ({
  memberID,
  status,
  isPostCoupon,
  pageNo,
  pageSize,
}) => {
  return request({
    url: '/CCoupon/CGetCouponList',
    data: {
      AccountId: memberID,
      Page: pageNo,
      PageSize: pageSize,
      CouponType: Number(status),
      IsSend: isPostCoupon,
    },
  })
}

/**
 *
 * @param {object} request - 请求体
 * @param {number} request.pageNo - 当前页码 例子：1
 * @param {number} request.pageSize - 每页显示数目 例子：10
 * @param {string} request.memberID - 会员ID
 * @param {string} [request.changeType] - 变更类型 0：消费赠送 1：活动赠送 2：消费扣除 3：手动修改
 *
 * @typedef {Object} IntegralObject
 * @property {number} changeType - 变更类型 0：消费赠送 1：老带新，老会员赠送 2：新会员注册赠送 3：充值赠送 4:分享赠送 5:活动赠送 6:消费扣除 7:手动修改
 * @property {string} relationTid - 消费关联的订单号
 * @property {datetime} changeTime - 变更时间
 * @property {number} changeCount - 变更数量
 * @property {string} customerId - 会员ID
 * @property {string} memo - 备注
 *
 * @returns {number} totalCount - 总记录数
 * @returns {IntegralObject[]} integralList - 积分对象集合
 */
export const getPointList = ({ pageNo, pageSize, memberID, changeType }) => {
  return request({
    url: '/tocustomer/integrallist',
    data: {
      currentPage: pageNo,
      pageSize: pageSize,
      customerId: memberID,
      changeType: Number(changeType),
    },
  })
}

/**
 *
 * @param {object} request - 请求体
 * @param {number} request.pageNo - 当前页码 例子：1
 * @param {number} request.pageSize - 每页显示数目 例子：10
 * @param {string} request.memberID - 会员ID
 * @param {string} [request.changeType] - 变更类型 0：充值 1：消耗 空表示查询所有
 *
 * @typedef {object} RechargeRecordObject
 * @property {number} changeType - 变更类型 0：充值 1：消耗
 * @property {number} payAmount - 支付金额
 * @property {number} changeAmount - 变更金额
 * @property {datetime} changeTime - 变更时间
 * @property {string} relationTid - 消费关联的订单号
 * @property {string} customerId - 会员ID
 * @property {number} giftAmount - 赠送金额
 * @property {number} balance - 余额
 *
 * @returns {number} totalCount - 记录总数
 * @returns {RechargeRecordObject[]} recordList - 记录集合对象
 */
export const getBalanceList = ({
  pageNo,
  pageSize,
  memberID,
  changeType, // 变更类型 0：充值 1：消耗 空表示查询所有
}) => {
  const realType = changeType === '2' ? '' : changeType
  return request({
    url: '/tocustomer/rechargerecordlist',
    data: {
      currentPage: pageNo,
      pageSize: pageSize,
      customerId: memberID,
      changeType: realType,
    },
  })
}

export default {
  getMemberList,
  getBaseInformation,
  getConsume,
  getAssets,
  getCouponList,
  getPointList,
  getBalanceList,
}
