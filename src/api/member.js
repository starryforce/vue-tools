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

// http://114.55.4.22:9009/ApiFile/object/fa4ef56e-5ad0-4fd5-9958-6d8d41b343f5.html
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
