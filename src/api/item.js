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

export const getItemClassList = () => {
  return request({
    url: '/GuideItem/GetItemClassList',
  })
}

export const getItems = () => {
  return request({
    url: '/GuideItem/MyStoreItemSearch',
    data: {
      CurrentPage: 1,
      PageSize: 2000,
    },
  })
}

export const getTicket = () => {
  return request({
    url: '/GuideWeChat/GetScanTicketEncode',
    data: {
      url: 'http://brt.test.bebefocus.com/', // window.location.href.split('#')[0]
    },
  })
}

export default {
  searchItem,
  getItemList,
  getItemClassList,
  getItems,
  getTicket,
}
