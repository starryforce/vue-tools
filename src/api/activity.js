import request from '@utils/request'

/**
 *
 * @description 获取线上活动列表
 *
 * @param {Object} request - 请求
 * @param {number} request.pageNo - 页码
 * @param {string} request.pageSize - 分页大小
 * @param {bool} [request.isWorking] - 是否当前生效,null不区分,true 仅查询生效中的活动,false查询过期活动
 *
 * @returns {string} Id - 活动ID
 * @returns {bool} IsWorking - 是否生效
 * @returns {string} EndTime - 结束时间
 * @returns {string} ActivityType - 活动类型
 * @returns {string} ActivityName - 活动名称
 * @returns {number} ProductCount - 商品数量
 * @returns {datetime} BeginTime - 开始时间
 * @returns {string} StoreId - 店铺ID
 * @returns {number} PersonCount - 参与人数
 * @returns {string} Status - 活动状态
 */
export const getStoreActivitys = ({
  pageNo = 1,
  pageSize = 20,
  isWorking = true,
} = {}) => {
  return request({
    url: '/CActivity/GetStoreActivitys',
    data: {
      Page: pageNo,
      Size: pageSize,
      IsWorking: isWorking,
    },
  })
}

/**
 *
 * @description 获取线下活动的列表数据
 *
 * @typedef {Object} XianXIaActiveResponse - 线下活动信息
 * @property {string} IntegralActiveDetialPicPath - 活动内容地址
 * @property {string} IntegralActiveName - 活动名称
 * @property {string} StoreNum - 限制人数
 * @property {number} ParticipateCount - 参与人数
 * @property {string} IntegralActiveId - 活动id
 * @property {datetime} StartTime - 报名开始时间
 * @property {string} registrationTime - 报名截止时间（活动开始时间为报名截止时间前一天）
 * @property {string} EndTime - 活动结束时间
 * @property {string} ConsumptionIntegral - 消耗积分
 * @property {string} ActivePicPath - 活动图片地址
 *
 * @param {Object} request - 请求体
 * @param {string} request.pageNo - 页码
 * @param {string} request.pageSize - 页大小
 *
 * @returns {XianXIaActiveResponse[]} activityList - 活动列表数据
 */
export const getOfflineActivitys = ({ pageNo = 1, pageSize = 20 } = {}) => {
  return request({
    url: '/ShoppingMall/getXianXIaActiveList',
    data: {
      currentPage: pageNo,
      pageSize: pageSize,
    },
  })
}
/**
 *
 * @description  获取线下活动的详情
 *
 * @typedef {Object} customer - 客户信息
 * @property {string} PicUrl - 会员头像
 * @property {string} BuyerNick - 昵称
 * @property {string} CustomerId - 会员id
 *
 * @param {string} activityID - 积分活动记录id
 * @returns {number} ConsumptionIntegral - 消耗积分
 * @returns {customer[]} Listcustomers - 参与会员的列表
 * @returns {string} ActivePicPath - 活动图片地址
 * @returns {string} IntegralActiveName - 活动名称
 * @returns {string} StoreName - 店铺
 * @returns {string} IntegralActiveId - 活动id
 * @returns {string} EndTime - 结束时间
 * @returns {string} StoreNum - 限制人数
 * @returns {string} ParticipateCount - 参与人数
 * @returns {string} ActiveState - 状态
 * @returns {datetime} StartTime - 开始时间
 */
export const getOfflineActivityDetail = activityID => {
  return request({
    url: '/ShoppingMall/getXianXIaActiveDetial',
    data: {
      IntegralactiveMangerId: activityID,
    },
  })
}

/**
 *
 * @description  线下活动兑换
 *
 * @param {string} request.activityID - 积分活动ID
 * @param {string} request.memberID - 用户id
 */
export const pointExchange = ({ activityID, memberID }) => {
  return request({
    url: '/ShoppingMall/ExchangeIntegralMall',
    data: {
      IntegralactivemangerId: activityID,
      CustomerId: memberID,
    },
  })
}

/**
 *
 * @description 核销兑换记录详情
 *
 * @param {string} exchangeRecordID - 活动兑换记录id
 */
export const integralactiveRecordId = exchangeRecordID => {
  return request({
    url: '/ShoppingMall/WriteoffIntegralMallL',
    data: {
      IntegralactiveRecordId: exchangeRecordID,
    },
  })
}

export const getActivitySku = ({
  keyword,
  classID,
  activityID = '',
  pageNo = 1,
  pageSize = 20,
} = {}) => {
  return request({
    url: '/CActivity/GetActivitySku',
    data: {
      KeyWords: keyword,
      ClassId: classID,
      ActivityId: activityID,
      Page: pageNo,
      Size: pageSize,
    },
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

export default {
  getStoreActivitys,
  getMemberInformation,
  getActivitySku,
  getOfflineActivitys,
  getOfflineActivityDetail,
  pointExchange,
}
