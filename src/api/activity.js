import request from '@utils/request'

export const getStoreActivitys = (size, page, isWorking = true) => {
  return request({
    url: '/api/CActivity/GetStoreActivitys',
    data: {
      size, // 分页大小
      page, // 页码
      isWorking, //  是否当前生效,null不区分,true 仅查询生效中的活动,false查询过期活动
    },
  })
}
export class StoreActivity {
  Id
  IsWorking
  EndTime
  ActivityType
  ActivityName
  ProductCount
  BeginTime
  StoreId
  PersonCount
  Status
}

export const getMemberInformation = id => {
  return request({
    url: '/member/GetMemberInformation',
    data: {
      id,
    },
  })
}

export default {}
