import request from '@utils/request'
/**
 * @returns {number} activityPrice - 价格
 * @returns {string} endTime - 结束时间
 * @returns {string} id - 活动ID
 * @returns {datetime} beginTime - 开始时间
 * @returns {string} giveCoupons - 赠送优惠券
 * @returns {string} activityName - 活动名称
 * @returns {number} giveMoney - 赠送金额
 */
export const getRecharge = () => {
  return request({
    url: '/cactivity/GetRecharge',
  })
}

/**
 * @param {string} request.memberID - 用户 ID
 * @param {string} request.rechargeID - 充值活动 ID
 * @returns {string} id - 充值订单号
 */
export const createRecharge = ({ memberID, rechargeID }) => {
  return request({
    url: '/BOrders/BCreateRecharge',
    data: { CustomerId: memberID, RechargeId: rechargeID },
  })
}

export const getOrders = ({
  OrderNo,
  SellerId,
  BuyerId,
  OrderStatus,
  BeginTime,
  EndTime,
  PostType,
  pageNo = 1,
  pageSize = 10,
} = {}) => {
  return request({
    url: '/BOrders/GetOrdersForB',
    data: {
      OrderNo,
      SellerId,
      BuyerId,
      OrderStatus,
      BeginTime,
      EndTime,
      PostType,
      Page: pageNo,
      Size: pageSize,
    },
  })
}

export const preCreate = ({
  CustomerId,
  AddressId,
  IsPostBySelf,
  UsePoint,
  CouponIds,
  SkuBuycount,
} = {}) => {
  return request({
    url: '/BOrders/PreCreateOrder',
    data: {
      CustomerId,
      AddressId,
      IsPostBySelf,
      UsePoint,
      CouponIds,
      SkuBuycount,
    },
  })
}

export default {
  getRecharge,
  createRecharge,
  getOrders,
  preCreate,
}
