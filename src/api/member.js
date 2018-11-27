import request from '@utils/request'

export const getMemberList = ({
  nick,
  mobile,
  employeeId,
  isFaceId,
  labelIds, // 标签ID，多个用逗号(,)隔开
  customerName,
  page = 1,
  size = 10,
} = {}) => {
  return request({
    url: '/tocustomer/customerlist',
    data: {
      nick,
      mobile,
      employeeId,
      isFaceId,
      labelIds,
      customerName,
      currentPage: page,
      pageSize: size,
    },
  })
}

export const getMemberInformation = id => {
  return request({
    url: '/tocustomer/customerget',
    data: {
      customerId: id,
    },
  })
}
export const getConsume = id => {
  return request({
    url: '/tocustomer/consumeget',
    data: {
      customerId: id,
    },
  })
}
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
  getMemberInformation,
  getConsume,
  getAssets,
  getCouponList,
  getIntegralList,
  getRechargeList,
}
