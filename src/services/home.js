/**
 * Created by duoyi on 2017/4/1.
 */
/**
 * Created by duoyi on 2017/3/29.
 */
import xhr from './index'

export default {
  addGood: xhr.post.bind(null, '/goods/good'),
  updateGood: xhr.put.bind(null, '/goods/good'),
  delStore: xhr.del.bind(null, '/goods/good'),
  addStore: xhr.post.bind(null, '/goods/query'),
  getStore: xhr.get.bind(null, '/goods/query'),
  getSearch: xhr.get.bind(null, '/goods/search'),
  // 下单
  makeOrder: xhr.post.bind(null, '/sales/sale'),
  // 销售查询
  checkOrder: xhr.get.bind(null, '/sales/goodRecord'),
  checkOrderById: xhr.get.bind(null, '/sales/good'),
  // 查询明细
  checkAll: xhr.get.bind(null, '/sales/queryAll'),
  // 查询详细
  checkById: xhr.get.bind(null, '/sales/detail'),
  toSearch (data, supplierId) {
    const len = data.length
    let arr = []
    for (let i = 0; i < len; i++) {
      if ((!supplierId) || supplierId === data[i].supplierId) {
        arr.push({
          supplier: data[i].supplier,
          supplierId: data[i].supplierId,
          value: data[i].id,
          name: data[i].name,
          unit: data[i].unit,
          spell: data[i].spell,
          inventory: data[i].inventory,
          pack: data[i].packFee,
          weight: data[i].weighFee,
          label: `${data[i].id}(${data[i].name})`
        })
      }
    }
    return arr
  }
}
