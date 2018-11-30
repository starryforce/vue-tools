import request from '@utils/request'

/**
 * @param {Object} request - 请求体
 * @param {number} request.PageSize - 一页多少
 * @param {number} request.page - 页码
 * @param {string} request.accountId - 顾客id
 *
 * @returns {string} provName - 省名字
 * @returns {string} cityName - 市名字
 * @returns {string} addressLable - 地址标签
 * @returns {string} name - 收件人
 * @returns {string} id - 地址id
 * @returns {string} accountId - 会员id
 * @returns {string} createTime - 创建时间
 * @returns {number} isDefault - 是否默认地址0不是1是
 * @returns {string} cityCode - 市编码
 * @returns {string} provCode - 省编码
 * @returns {string} distName - 区名称
 * @returns {string} detail - 详细地址
 * @returns {string} distCode - 地区编码
 * @returns {number} isDelete - 是否删除0不是1是
 * @returns {string} zipCode - 邮编
 * @returns {string} userId - 客户 ID
 */
export const getMemberAddressList = ({
  pageNo = 1,
  pageSize = 100,
  memberID,
} = {}) => {
  return request({
    url: '/GuideAddress/CGetAddressList',
    data: {
      page: pageNo,
      PageSize: pageSize,
      accountId: memberID,
    },
  })
}

/**
 *
 * @param {Object} request - 请求体
 * @param {string} request.memberID - 会员id
 * @param {string} request.cityName - 市名
 * @param {string} [request.tag] - 标签
 * @param {string} request.zipCode - 邮编
 * @param {string} request.districtCode - 地区编码
 * @param {string} request.cityCode - 市编码
 * @param {string} request.proName - 省名称
 * @param {string} request.mobile - 收货人电话
 * @param {string} request.detail - 详细地址
 * @param {string} [request.addressID] - 地址id 传就是改
 * @param {bool} request.isDefault - 是否默认地址
 * @param {string} request.accountId - 会员id
 * @param {string} request.districtName - 地区名称
 * @param {string} request.name - 收货人名字
 * @param {string} request.provinceCode - 省编码
 */
export const editMemberAddress = ({
  zipCode,
  provinceCode,
  provinceName,
  cityCode,
  cityName,
  districtCode,
  districtName,
  detail,
  name,
  mobile,
  tag,
  isDefault,
  memberID,
  addressID,
}) => {
  return request({
    url: '/GuideAddress/CAddOrEditAddress',
    data: {
      zipCode,
      proCode: provinceCode,
      proName: provinceName,
      cityCode,
      cityName,
      distCode: districtCode,
      distName: districtName,
      detail,
      name,
      phone: mobile,
      lable: tag,
      isDefault,
      addressId: addressID,
      accountId: memberID,
    },
  })
}

export default {
  getMemberAddressList,
  editMemberAddress,
}
