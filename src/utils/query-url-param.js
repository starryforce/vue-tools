import qs from 'qs'

// 查找链接中 search 参数对应的值，为解码之后的平坦字符串
export default function(name) {
  const searchObject = qs.parse(window.location.search.split('?')[1])
  if (searchObject[name]) {
    return searchObject[name]
  } else {
    return ''
  }
}
