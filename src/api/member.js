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

export const getCouponList = ({
  id,
  couponType, // 优惠券类型0未使用1已经使用2已过期
  isSend, // 是否邮费券
  page,
  size,
}) => {
  return request({
    url: '/CCoupon/CGetCouponList',
    data: {
      customerId: id,
      Page: page,
      PageSize: size,
      CouponType: couponType,
      IsSend: isSend,
    },
  })
}
export const getIntegralList = ({
  id,
  changeType, //	变更类型 0：消费赠送 1：活动赠送 2：消费扣除 3：手动修改
  page,
  size,
}) => {
  return request({
    url: '/tocustomer/integrallist',
    data: {
      customerId: id,
      Page: page,
      PageSize: size,
      changeType: changeType,
    },
  })
}

export const getRechargeList = ({
  id,
  changeType, // 变更类型 0：充值 1：消耗 空表示查询所有
  page,
  size,
}) => {
  return request({
    url: '/tocustomer/rechargerecordlist',
    data: {
      customerId: id,
      Page: page,
      PageSize: size,
      changeType: changeType,
    },
  })
}

export default {
  getMemberList,
  getBaseInformation,
  getConsume,
  getAssets,
  getCouponList,
  getIntegralList,
  getRechargeList,
}
