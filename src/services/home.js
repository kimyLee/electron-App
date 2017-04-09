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
  getStore: xhr.get.bind(null, '/goods/query')
}
