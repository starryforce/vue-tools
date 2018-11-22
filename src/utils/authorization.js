import DateTimeFormat from 'format-date-time'
import md5 from 'md5'

class Authorization {
  constructor(ssid = 1, storeId = 1, token = null) {
    this.params = {
      app: '贝卡导购',
      appKey: 'ad0b9b9829a76f4e',
      appSecret: '50b4172964cf9aac2ae00e243cb205af',
      ssid: ssid,
      storeId: storeId,
      token: token || '58f00bee9d6a47889ee8d92467dd35e3',
    }
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

  $getSign(res) {
    return md5(
      `appKey=${res.appKey}&nonceStr=${res.nonceStr}&timeStamp=${res.timeStamp}`
    )
  }

  getHeaders() {
    var defaultFormatter = new DateTimeFormat()
    var res = {
      nonceStr: this.$getNonceStr(),
      appKey: this.params.appKey,
      timeStamp: defaultFormatter.now('yyyy-MM-dd HH:mm:ss'),
      sign: '',
    }
    res.sign = this.$getSign(res)
    return res
  }
}

export default Authorization
