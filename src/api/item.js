import request from '@utils/request'

export const searchSku = ({
  keyWords,
  classId,
  activityId,
  page = 1,
  size = 10,
} = {}) => {
  if (activityId)
    return request({
      url: '/CActivity/GetActivitySku',
      data: {
        KeyWords: keyWords,
        ClassId: classId,
        ActivityId: activityId,
        Page: page,
        Size: size,
      },
    })
  else
    return request({
      url: '/GuideItem/ItemSearch',
      data: {
        Keyword: keyWords,
        ClassId: classId,
        CurrentPage: page,
        PageSize: size,
      },
    })
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
  searchSku,
  getItemList,
  getItemClassList,
}
