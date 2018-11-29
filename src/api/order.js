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
 *  @param {Object} request - 请求体
 * @param {string} request.memberID - 用户 ID
 * @param {string} request.rechargeID - 充值活动 ID
 * @returns {string} orderID - 充值订单 ID
 */
export const createRecharge = ({ memberID, rechargeID }) => {
  return request({
    url: '/BOrders/BCreateRecharge',
    data: { CustomerId: memberID, RechargeId: rechargeID },
  })
}

/**
 * @param {string} memberID - 会员 ID
 * @returns {string} orderID - 会员升级订单 ID
 */
export const createSuperVip = memberID => {
  return request({
    url: '/BOrders/BCreateSuperVip',
    data: { Id: memberID },
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
/**
 * @param {string} request.CustomerId - 购买人Id
 * @param {string} request.AddressId - 地址ID,自提时可为空
 * @param {bool} request.IsPostBySelf - 是否自提
 * @param {number} request.UsePoint - 使用的积分数量
 * @param {string} request.CouponIds - 使用的优惠券数组 例子：["c1","c2"]
 * @param {string} [request.SkuBuycount] - 商品skuID 和购买数量集合 例子：集合[{"SkuId":"1","BuyCount":2}]
 */
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

/**
 * @param {Object} request - 请求体
 * @param {string} request.addressID - 地址ID,自提时可为空
 * @param {number} request.usePoint - 使用的积分数量
 * @param {string} request.customerID - 购买人Id
 * @param {bool} request.isPostBySelf - 是否自提
 * @param {string} request.skuBuycount - sku和购买的数量,json数组 例子：集合[{“SkuId“:“1“,“BuyCount“:2}]
 * @param {string} request.buyerMsg - 下单留言
 * @param {string} request.couponIDs - 使用的优惠券数组
 * @param {number} request.totalAmount - 订单总金额,用于校验
 */
export const createOrder = ({
  addressID,
  usePoint,
  customerID,
  isPostBySelf,
  skuBuycount,
  buyerMsg,
  couponIDs,
  totalAmount,
} = {}) => {
  return request({
    url: '/BOrders/BCreateOrder',
    data: {
      addressID,
      usePoint,
      customerID,
      isPostBySelf,
      skuBuycount,
      buyerMsg,
      couponIDs,
      totalAmount,
    },
  })
}

export default {
  getRecharge,
  createRecharge,
  getOrders,
  preCreate,
  createOrder,
}
