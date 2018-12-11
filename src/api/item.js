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

export default {
  searchItem,
  getItemList,
  getItemClassList,
}
