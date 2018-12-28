import request from '@utils/request'

/**
 *
 * @description 获取充值策略(活动)
 *
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
    data: {
      CustomerId: memberID,
      RechargeId: rechargeID,
    },
  })
}

/**
 * @param {string} memberID - 会员 ID
 * @returns {string} orderID - 会员升级订单 ID
 */
export const createSuperVip = memberID => {
  return request({
    url: '/BOrders/BCreateSuperVip',
    data: {
      Id: memberID,
    },
  })
}

/**
 *
 * @param {Object} request - 请求体
 * @param {number} request.pageNo - 分页序号
 * @param {string} request.pageSize - 分页大小
 * @param {number} [request.orderStatus] - 订单状态 例子：0待支付,1,待发货,2,待收货,3,交易成功,4交易关闭,5买家删除,6退款中,7退款成功,8拒绝退款,9退货成功
 * @param {string} [request.payingType] - 支付方式 例子：0支付宝,1微信,2现金,3银行卡,4余额,5无需支付,6积分
 * @param {number} [request.postType] - 发货类型 例子：空不筛选,0自提,1快递,3无需物流(虚拟订单等等)
 * @param {string} [request.buyerName] - 购买人昵称
 * @param {string} [request.orderNo] - 订单编号
 * @param {string} [request.receiverName] - 收货人姓名
 * @param {string} [request.skuName] - 商品名称关键字
 * @param {string} [request.skuCode] - 商品编码
 * @param {string} [request.receiverPhone] - 收货人电话
 * @param {datetime} [request.beginTime] - 创建开始时间
 * @param {string} [request.endTime] - 创建结束时间
 * @param {string} [request.sellerID] - 店员Id
 * @param {string} [request.buyerID] - 购买人Id
 *
 * @returns {string} OrderNo - 订单编号
 * @returns {string} OrderStatus - 订单状态
 * @returns {string} Id -
 * @returns {string} CouponAmount - 优惠券优惠的金额
 * @returns {string} UsePoint - 使用的积分数量
 * @returns {string} IsOnline - 是否线上订单
 * @returns {string} PostAmount - 邮费
 * @returns {string} TotalAmount - 订单总金额
 * @returns {string} UseBalance - 使用的余额
 * @returns {string} CreateTime -
 * @returns {string} PayType - 支付方式
 * @returns {string} BuyerMsg - 买家留言
 * @returns {string} BuyerId - 购买人Id
 * @returns {string} ProductName - 订单名称
 * @returns {string} VipAmount - vip优惠金额
 * @returns {string} DetailList - 商品数组 object
 * @returns {string} BuyerNick - 购买人昵称
 * @returns {string} SkuSum - 商品数量
 * @returns {string} FullAmount - 满减优惠金额
 * @returns {string} CouponPostAmount - 优惠优惠的邮费金额
 * @returns {string} LimitAmount - 限时折扣优惠的金额
 */
export const getOrderList = ({
  pageNo = 1,
  pageSize = 20,
  orderNo,
  sellerID,
  buyerID,
  orderStatus,
  beginTime,
  buyerName,
  receiverName,
  endTime,
  payingType,
  postType,
  skuName,
  skuCode,
  receiverPhone,
} = {}) => {
  return request({
    url: '/BOrders/GetOrdersForB',
    data: {
      Page: pageNo,
      Size: pageSize,
      OrderNo: orderNo,
      BuyerName: buyerName,
      ReceiverName: receiverName,
      SellerId: sellerID,
      EndTime: endTime ? endTime + ' 23:59:59' : '',
      OrderStatus: orderStatus,
      BeginTime: beginTime ? beginTime + ' 00:00:00' : '',
      BuyerId: buyerID,
      PayingType: payingType,
      SkuName: skuName,
      SkuCode: skuCode,
      ReceiverPhone: receiverPhone,
      PostType: postType,
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

/**
 * @param {string} orderID - 订单 ID
 * @returns {string} ok - 成功
 */
export const cancelOrder = orderID => {
  return request({
    url: '/BOrders/OrderCloseBySeller',
    data: {
      Id: orderID,
    },
  })
}

/**
 * @param {string} orderID - 订单 ID
 *
 * @returns {string} SkuList - 所有的商品集合
 * @returns {string} VipAmount - vip优惠金额
 * @returns {string} OrderStatus - 订单状态
 * @returns {string} OrderType - 订单类型
 * @returns {string} PayType - 支付类型
 * @returns {string} OldTotalAmount - 优惠前的总金额
 * @returns {string} ReceiverAddress - 收货地址
 * @returns {string} BuyerId - 购买人Id
 * @returns {string} UsePoint - 使用的积分数量
 * @returns {string} CreateTime -
 * @returns {string} CutList - 所有的优惠集合
 * @returns {string} LimitAmount - 限时折扣优惠的金额
 * @returns {string} ProductName - 订单名称
 * @returns {string} ReceiverName - 收货人姓名
 * @returns {string} FullAmount - 满减优惠金额
 * @returns {string} TotalAmount - 订单总金额
 * @returns {string} CouponAmount - 优惠券优惠的金额
 * @returns {string} CouponPostAmount - 优惠优惠的邮费金额
 * @returns {string} UseBalance - 使用的余额
 * @returns {string} PostAmount - 邮费
 * @returns {string} BuyerMsg - 买家留言
 * @returns {string} OrderNo - 订单编号
 * @returns {string} ReceiverPhone - 收货人电话
 */
export const getOrderDetail = orderID => {
  return request({
    url: '/BOrders/GetOrderDetailForB',
    data: {
      Id: orderID,
    },
  })
}

/**
 * @param {string} orderID - 订单 ID
 * @param {string} payType - 支付类型 : 2 现金支付,3 POS机刷卡
 *
 */
export const payOrder = ({ orderID, payType }) => {
  return request({
    url: '/BOrders/HandPaySuccess',
    data: {
      OrderId: orderID,
      PayType: payType,
      ErpPayType: payType + '',
    },
  })
}

/**
 * @param {string} orderID - 订单 ID
 * @param {string} payType - 支付类型 : 2 现金支付,3 POS机刷卡
 *
 */
export const payOrderbyCode = ({ orderID, authCode, orderNo }) => {
  return request({
    url: '/BOrders/BOrderPay',
    data: {
      OrderId: orderID,
      AuthCode: authCode,
      OrderNo: orderNo,
    },
  })
}

export const payOrderbyCode2 = () => {
  return request({
    url: '/BOrders/BOrderPay2',
  })
}

export const changeOrder = ({ orderID, newPrice, newPost } = {}) => {
  return request({
    url: '/BOrders/ChangePriceBySeller',
    data: {
      orderID,
      newPrice,
      newPost,
    },
  })
}

/**
 *
 * @description 自提订单生成时会检验门店库存状态，此时门店一定是有所有商品的，立即可以自提
 * @param {String} orderID - 订单号
 */
export const confirmPickUp = orderID => {
  return request({
    url: '/BOrders/PostBySelfSend',
    data: {
      Id: orderID,
    },
  })
}

export const CreateReturnOrder = ({
  orderID,
  items,
  returnReason = '',
} = {}) => {
  return request({
    url: '/GuideReturnOrder/BAddOrEditReturnOrder',
    data: {
      Tid: orderID,
      ReturnType: 0,
      ReturnSkuIds: items,
      ReturnReason: returnReason,
    },
  })
}

/**
 *
 * @description 导购端退货订单获取list
 * @param {number} request.pageNo - 页码
 * @param {number} request.pageSize - 一页个数
 * @param {number} request.isPass - 门店是否审核 0未审核1审核过
 * @param {number} [request.state] - 订单状态 0：顾客申请，1：门店同意，2：门店驳回，3：顾客已发货，4：已收货，5：收货拒绝，6：中台同意，7：中台驳回，8：已退款（已退换）不填全部
 * @param {number} [request.payType] - 支付类型0支付宝,1微信支付,2现金,3银行卡（不填全部）
 * @param {string} [request.memberID] - 会员id
 * @param {string} [request.orderNo] - 退单单号
 * @param {string} [request.beginTime] - 开始时间
 * @param {string} [request.endTime] - 结束时间
 *
 * @typedef {Object} ReturnInfo Info - 退款订单详情
 * @property {string} Id - 退款订单id
 * @property {string} returnOrderNo - 退款订单编号
 * @property {string} time - 退货时间
 * @property {string} receiverPhone - 手机号
 * @property {string} orderStatus - 订单状态
 * @property {string} returnType - 退货类型
 * @property {string} buyerNick - 退款者昵称
 * @property {string} payType - 关联订单支付方式
 *
 * @typedef {Object} ReturnOrderDetail Info - 退款订单详情
 * @property {string} SkuName - 商品名
 * @property {string} PicUrl - 商品图片
 * @property {number} SalePrice - 售价
 * @property {number} Num - 退款数量
 *
 * @returns {ReturnOrderDetail[]} DetailList - 退款订单退货详情
 * @returns {ReturnInfo} Info - 退款订单详情
 */
export const getReturnOrders = ({
  pageNo = 1,
  pageSize = 20,
  state,
  payType,
  orderNo,
  beginTime,
  endTime,
  isPass,
  memberID,
} = {}) => {
  return request({
    url: '/GuideReturnOrder/BGetReturnOrderList',
    data: {
      Page: pageNo,
      PageSize: pageSize,
      PayType: payType,
      State: state,
      OrderNo: orderNo,
      BeginTime: beginTime,
      EndTime: endTime,
      IsPass: isPass,
      AccountId: memberID,
    },
  })
}

/**
 * @description 导购端获取某个退款订单详细
 * @param {string} orderID - 退款订单Id
 *
 * @returns {string} Nick - 购买人昵称
 * @returns {[]} BackDetailList - 换货的商品详情
 * @returns {string} Id - 退款订单Id
 * @returns {string} Imgs - 退款时添加的退款照片照片
 * @returns {string} Phone - 购买人电话
 * @returns {string} No - 退款订单No
 * @returns {string} Discribe - 退款原因
 * @returns {[]} OrderDetailList - 退款单中的商品详情
 * @returns {string} Time - 生成退款时间
 */
export const getReturnDetail = orderID => {
  return request({
    url: '/GuideReturnOrder/GetReturnOrderDetail',
    data: {
      ReturnOrderId: orderID,
    },
  })
}

/**
 * @description 退货申请门店是否同意
 * @param {string} request.orderID - 退款订单Id
 * @param {bool} request.isPass - 是否同意
 * @param {string} [request.reason] - 拒绝原因
 */
export const confirmReturn = ({ orderID, isPass, reason } = {}) => {
  return request({
    url: '/GuideReturnOrder/ShopPass',
    data: {
      returnOrderId: orderID,
      isPass,
      reason,
    },
  })
}

/**
 *
 * @description 退货订单确认收货
 * @param {string} request.orderID - 退货订单id
 * @param {bool} request.IsPass - 是否确认
 * @param {string} [request.Reason] - 不通过填写的理由
 */
export const confirmReturnItem = ({ orderID, isPass, reason } = {}) => {
  return request({
    url: '/GuideReturnOrder/ConfirmGood',
    data: {
      returnOrderId: orderID,
      isPass,
      reason,
    },
  })
}

export default {
  getRecharge,
  createRecharge,
  getOrderList,
  createSuperVip,
  preCreate,
  createOrder,
  cancelOrder,
  getOrderDetail,
  payOrder,
  payOrderbyCode,
  CreateReturnOrder,
  payOrderbyCode2,
  changeOrder,
  getReturnOrders,
  confirmReturn,
  confirmReturnItem,
  getReturnDetail,
  confirmPickUp,
}
