import axios from 'axios'
import Authorization from './authorization'
import store from '@state/store'

const config = {
  method: 'post',
  baseURL: (process.env.VUE_APP_API_BASE_URL || '') + '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 8000,
  withCredentials: true,
  responseType: 'json',
}
// 加载不显示加载提示最小时间值
const MIN_TIME = 300
// 请求组（判断当前请求数）
let _requests = []

const requestUtil = axios.create(config)

const authorization = new Authorization()

// request 拦截器
requestUtil.interceptors.request.use(
  config => {
    // 2. 带上token

    const authHeaders = authorization.getHeaders()
    if (authHeaders) {
      config.headers = Object.assign({}, config.headers, authHeaders)
    } else {
      // 重定向到登录页面
    }
    // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    if (config.method === 'post') {
      if (
        config.data.prototype === FormData.prototype ||
        config.url.endsWith('path') ||
        config.url.endsWith('mark') ||
        config.url.endsWith('patchs')
      ) {
      } else {
        // config.data = qs.stringify(config.data)
      }
    }
    return config
  },

  error => {
    // 请求错误时
    // console.log('request:', error)
    // 1. 判断请求超时
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      // console.log('timeout请求超时')
      // return service.request(originalRequest);//再重复请求一次
    }
    // 2. 需要重定向到错误页面
    const errorInfo = error.response
    // console.log(errorInfo)
    if (errorInfo) {
      // error =errorInfo.data  //页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
      // const errorStatus = errorInfo.status // 404 403 500 ...
      // router.push({
      //   path: `/error/${errorStatus}`,
      // })
    }
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
  }
)

// response 拦截器
requestUtil.interceptors.response.use(
  response => {
    let data
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data === undefined) {
      data = JSON.parse(response.request.responseText)
    } else {
      data = response.data
    }

    // 根据返回的code值来做不同的处理
    switch (data.code) {
      case 200:
        // console.log(data.msg)
        break
      default:
        const err = new Error(data.msg)
        err.data = data
        err.response = response
        throw err
    }
    return data
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    // console.error(err)
    return Promise.reject(err) // 返回接口返回的错误信息
  }
)

/**
 * 添加请求，显示loading
 * @param {请求配置} config
 */
function pushRequest(config) {
  // console.log(`${config.url}--begin`)
  _requests.push(config)
  store.dispatch('notice/show_spinner')
}

/**
 * 移除请求，无请求时关闭loading
 * @param {请求配置} config
 */
function popRequest(config) {
  // console.log(`${config.url}--end`)
  let _index = _requests.findIndex(r => {
    return r === config
  })
  if (_index > -1) {
    _requests.splice(_index, 1)
  }
  if (!_requests.length) {
    store.dispatch('notice/hide_spinner')
  }
}

export default function $axios({
  url,
  data = {},
  isSilence = false,
  method = 'POST',
} = {}) {
  let _opts = {
    method,
    url,
  }
  let _data = Object.assign({}, data)
  const _query = {}
  for (let _key in _data) {
    if (_data.hasOwnProperty(_key) && _data[_key] !== '') {
      _query[_key] = _data[_key]
    }
  }
  let _timer = null
  if (method.toLocaleUpperCase() === 'POST') {
    _opts.data = _query
  } else {
    _opts.params = _query
  }
  return new Promise((resolve, reject) => {
    let _random = {
      stamp: Date.now(),
      url: `${config.api + url}`,
    }
    if (!isSilence) {
      _timer = setTimeout(() => {
        pushRequest(_random)
      }, MIN_TIME)
    }
    requestUtil(_opts)
      .then(res => {
        clearTimeout(_timer)
        popRequest(_random)
        resolve(res.data)
      })
      .catch(res => {
        // let _response = res.response
        // let _message = null
        clearTimeout(_timer)
        popRequest(_random)
        if (!isSilence) {
          // Vue.$vux.toast.show({
          //   text:
          //     _response.data && _response.data.error
          //       ? _response.data.error
          //       : _message,
          //   type: 'warn',
          //   width: '10em',
          // })
        }
        reject(res)
      })
  })
}
