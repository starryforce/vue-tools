let AliCloudClient = require('./aliCloudClient')

let aliClient = new AliCloudClient({
  AccessKeyId: 'LTAICnwsneR8AZt6',
  AccessKeySecret: '9pbTnJ7b2xF6HP3VgI6pMnWpVuLFWE',
  serverUrl: 'https://cdn.aliyuncs.com',
})

const fs = require('fs')
const co = require('co')
const path = require('path')
const oss = require('ali-oss')

// 构建oss对象
const store = oss({
  accessKeyId: 'LTAICnwsneR8AZt6',
  accessKeySecret: '9pbTnJ7b2xF6HP3VgI6pMnWpVuLFWE',
  bucket: 'bk-official-website',
  region: 'oss-cn-beijing',
})

;(() => {
  const root = path.resolve(__dirname, '../dist')
  const files = []
  // 递归取出所有文件夹下所有文件的路径
  function readDirSync(p) {
    const pa = fs.readdirSync(p)
    pa.forEach(e => {
      const currentPath = `${p}/${e}`
      const info = fs.statSync(currentPath)
      if (info.isDirectory()) {
        readDirSync(currentPath)
      } else {
        files.push(currentPath)
      }
    })
  }
  readDirSync(root)

  co(function*() {
    // 遍历文件
    for (let index = 0; index < files.length; index += 1) {
      const e = files[index]
      const result = yield store.put(e.replace(root, ''), e)
      // 提交文件到oss，这里要注意，阿里云不需要创建新文件夹，只有有路径，没有文件夹会自动创建
      console.log(result)
    }
  }).then(() => {
    // 获取解析列表
    aliClient
      .get('/', {
        Action: 'RefreshObjectCaches',
        ObjectPath: 'brt.test.bebefocus.com/',
        ObjectType: 'Directory',
      })
      .then(function(data) {
        console.log(data.body)
      })
      .catch(function(err) {
        console.log(err)
      })
  })
})()
