import request from '@utils/request'

export const searchItem = ({
  keyword,
  classID,
  activityID,
  pageNo = 1,
  pageSize = 20,
} = {}) => {
  if (activityID) {
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
  } else {
    return request({
      url: '/GuideItem/ItemSearch',
      data: {
        Keyword: keyword,
        ClassId: classID,
        CurrentPage: pageNo,
        PageSize: pageSize,
      },
    })
  }
}

/**
 *
 * @description 商品详情
 *
 * @param {string} itemID - 商品 ID
 */
export const getItemDetail = itemID => {
  return request({
    url: '/GuideItem/ItemDetailGet',
    data: {
      Id: itemID,
    },
  })
}

/**
 *
 * @description 搜索商品
 *
 * @param {Object} request - 关键字
 * @param {string} [request.keyword] - 关键字
 * @param {string} [request.classID] - 分类Id
 * @param {number} request.pageNo - 页码
 * @param {number} request.pageSize - 页大小
 */
export const getItemList = ({ keyword, classID, pageNo, pageSize }) => {
  return request({
    url: '/GuideItem/ItemSearch',
    data: {
      Keyword: keyword,
      ClassId: classID,
      CurrentPage: pageNo,
      PageSize: pageSize,
    },
  })
}

/**
 *
 * @description 获取商品目录
 */
export const getItemClassList = () => {
  return request({
    url: '/GuideItem/GetItemClassList',
  })
}

/**
 *
 * @description 获取本店有货商品列表
 *
 * @param {number} request.pageNo - 页码
 * @param {number} request.pageSize - 页大小
 */
export const myStoreItemList = ({ pageNo = 1, pageSize = 2000 } = {}) => {
  return request({
    url: '/GuideItem/MyStoreItemSearch',
    data: {
      CurrentPage: pageNo,
      PageSize: pageSize,
    },
  })
}

export const getTicket = () => {
  return request({
    url: '/GuideWeChat/GetScanTicketEncode',
    data: {
      url: window.location.href.split('#')[0],
    },
  })
}

export default {
  searchItem,
  getItemList,
  getItemDetail,
  getItemClassList,
  myStoreItemList,
  getTicket,
}
