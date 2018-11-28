import request from '@utils/request'
/**  response =  {
 *   Id
 *   IsWorking
 *   EndTime
 *   ActivityType
 *   ActivityName
 *   ProductCount
 *   BeginTime
 *   StoreId
 *   PersonCount
 *   Status
 *   }
 **/
export const getStoreActivitys = ({
  page = 1,
  size = 10,
  isWorking = true,
} = {}) => {
  return request({
    url: '/CActivity/GetStoreActivitys',
    data: {
      size, // 分页大小
      page, // 页码
      isWorking, //  是否当前生效,null不区分,true 仅查询生效中的活动,false查询过期活动
    },
  })
}

export const getActivitySku = ({
  keyWords,
  classId,
  activityId = 'dfaebda1-437d-48fd-a3d3-2e87a1e3eb34',
  page = 1,
  size = 10,
} = {}) => {
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
}

export const getOfflineActivitys = ({ pageNo = 1, pageSize = 10 } = {}) => {
  return request({
    url: '/ShoppingMall/getXianXIaActiveList',
    data: {
      pageSize: pageSize,
      currentPage: pageNo,
    },
  })
}

export const getOfflineActivityDetail = id => {
  return request({
    url: '/ShoppingMall/getXianXIaActiveDetial',
    data: {
      IntegralactiveMangerId: id,
    },
  })
}
export const getMemberInformation = id => {
  return request({
    url: '/member/GetMemberInformation',
    data: {
      id,
    },
  })
}

export default {
  getStoreActivitys,
  getMemberInformation,
  getActivitySku,
  getOfflineActivitys,
  getOfflineActivityDetail,
}
