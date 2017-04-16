/**
 * Created by kimmy on 2017/4/3.
 */
import xhr from './index'

export default {
  getDetail: xhr.get.bind(null, '/stocks/inoutorder'),
  getDetailById: xhr.get.bind(null, '/stocks/orderdetail'),
  delIO: xhr.del.bind(null, '/stocks/orderdetail'),
  setInGood: xhr.post.bind(null, '/stocks/stock'),
  // 数据转化也写在这里， 这样就不用再组件里面写数据处理
  toSearch (data) {
    const len = data.length
    let arr = []
    for (let i = 0; i < len; i++) {
      arr.push({
        value: data[i].id,
        code: data[i].spell,
        name: data[i].name,
        supplier: data[i].supplier,
        label: `${data[i].id}  ${data[i].name}`
      })
    }
    return arr
  }
}
