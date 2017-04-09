/**
 * Created by duoyi on 2017/4/1.
 */
import xhr from './index'

export default {
  /** params:{
     "name": "hh",
     "phone": "13573444556"
     } */
  addSupplier: xhr.post.bind(null, '/suppliers/supplier'),
  getSupplier: xhr.get.bind(null, '/suppliers/supplier'),
  updateSupplier: xhr.put.bind(null, '/suppliers/supplier'),
  delSupplier: xhr.del.bind(null, '/suppliers/supplier'),
  // 获取转账
  getTransition: xhr.get.bind(null, '/suppliers/transfer'),
  putTransition: xhr.put.bind(null, '/suppliers/transfer'),
  addTransition: xhr.post.bind(null, '/suppliers/transfer'),
  putNowMoney: xhr.put.bind(null, '/suppliers/amount'),
  getNowMoney: xhr.get.bind(null, '/suppliers/amount'),
  // 提成
  getTiCheng: xhr.get.bind(null, '/suppliers/settlement'),
  setTiCheng: xhr.put.bind(null, '/suppliers/settlement'),
  addTiCheng: xhr.post.bind(null, '/suppliers/settlement'),
  // 数据转化也写在这里， 这样就不用再组件里面写数据处理
  toSearch (data) {
    const len = data.length
    let arr = []
    for (let i = 0; i < len; i++) {
      arr.push({value: data[i].id, label: data[i].name})
    }
    return arr
  }
}
