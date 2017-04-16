/**
 * Created by kimmy on 2017/4/3.
 */
import xhr from './index'

export default {
  addFeeType: xhr.post.bind(null, '/costs/cost'),
  getFeeType: xhr.get.bind(null, '/costs/query'),
  updateFeeType: xhr.put.bind(null, '/costs/cost'),
  delFeeType: xhr.del.bind(null, '/costs/cost'),
  searchFeeType: xhr.get.bind(null, '/costs/search'),
  checkFee: xhr.get.bind(null, '/costs/queryCostOrder'),
  addFee: xhr.post.bind(null, '/costs/costOrder'),
  // 删除费用单
  delFee: xhr.put.bind(null, '/costs/deleteCostOrder'),
  // 收入支出
  addIn: xhr.post.bind(null, '/costs/getOrder'),
  getIn: xhr.get.bind(null, '/costs/getOrder'),
  addOut: xhr.post.bind(null, '/costs/outOrder'),
  getOut: xhr.get.bind(null, '/costs/outOrder'),
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
