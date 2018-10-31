import camelCase from 'lodash/camelCase'

// 自动注册 api 文件夹下的所有接口
const requireModule = require.context('.', false, /\.js$/)
const modules = {}
requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return
  const modulePath = camelCase(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  )
  modules[modulePath] =
    requireModule(fileName).default || requireModule(fileName)
})

export default modules
