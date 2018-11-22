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
  size = 1,
  page = 10,
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

export const getMemberInformation = id => {
  return request({
    url: '/member/GetMemberInformation',
    data: {
      id,
    },
  })
}

export default { getStoreActivitys, getMemberInformation }
