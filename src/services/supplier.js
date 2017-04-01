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
  getSupplier: xhr.get.bind(null, '/suppliers/supplier')
  // 数据转化也写在这里， 这样就不用再组件里面写数据处理
}
