import request from '@utils/request'
/**  response =  {
 *   id
 *   activityPrice
 *   beginTime
 *   endTime
 *   giveCoupons
 *   activityName
 *   giveMoney
 *   }
 **/
export const getRecharge = () => {
  return request({
    url: '/cactivity/GetRecharge',
  })
}

export default {
  getRecharge,
}
