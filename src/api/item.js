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

export const getItemClassList = () => {
  return request({
    url: '/GuideItem/GetItemClassList',
  })
}

export default {
  searchSku,
  getItemClassList,
}
