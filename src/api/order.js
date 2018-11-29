import request from '@utils/request'
/**  response =  {
 *   id
 *   activityPrice
 *   beginTime
 *   endTime
 *   giveCoupons
 *   activityName
 *   giveMoney
 *   }
 **/
export const getRecharge = () => {
  return request({
    url: '/cactivity/GetRecharge',
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
  getOrders,
  preCreate,
}
