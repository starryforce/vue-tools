import DateTimeFormat from 'format-date-time'
import md5 from 'md5'

const privateInfo = {
  app: '贝卡导购',
  appKey: 'ad0b9b9829a76f4e',
  appSecret: '50b4172964cf9aac2ae00e243cb205af',
}
class Authorization {
  constructor(
    siid = 'f9eab77eb5d2fdc4392404b98726ebc037454767',
    storeId = '000508010101', // "a693a3d3-3353-4446-9c11-ddabd841c14e",
    token = '58f00bee9d6a47889ee8d92467dd35e3'
  ) {
    this.siid = siid
    this.storeId = storeId
    this.token = token
  }

  $getNonceStr(length = 32) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const max = chars.length
    let nonce = ''

    for (let i = 0; i < length; i++) {
      nonce += chars.charAt(Math.floor(Math.random() * max))
    }
    return nonce
  }

  $getSign({ timeStamp, nonceStr }) {
    return md5(
      `${privateInfo.appSecret}appKey=${
        privateInfo.appKey
      }nonceStr=${nonceStr}timeStamp=${timeStamp}${privateInfo.appSecret}`
    )
  }

  getHeaders() {
    var defaultFormatter = new DateTimeFormat()
    const nonceStr = this.$getNonceStr()
    const timeStamp = defaultFormatter.now('YYYY-MM-DD HH:mm:ss')
    const sign = this.$getSign({
      timeStamp,
      nonceStr,
    })
    return {
      nonceStr: nonceStr,
      appKey: privateInfo.appKey,
      timeStamp: timeStamp,
      sign: sign,
      siid: this.siid,
      storeId: this.storeId,
      token: this.token,
    }
  }
}

export default Authorization
