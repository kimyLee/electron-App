/**
 * Created by kimmy on 2017/4/2.
 */
/**
 * Created by duoyi on 2017/4/1.
 */
import xhr from './index'

export default {
  addCustomer: xhr.post.bind(null, '/customers/customer'),
  getCustomer: xhr.get.bind(null, '/customers/query'),
  updateCustomer: xhr.put.bind(null, '/customers/customer'),
  delCustomer: xhr.del.bind(null, '/customers/customer'),
  searchCustomer: xhr.get.bind(null, '/customers/search'),
  // 借款
  borrowMoney: xhr.post.bind(null, '/customers/debit'),
  getBorrowMoney: xhr.get.bind(null, '/customers/loandetails'),
  // 查询欠款
  checkLoan: xhr.get.bind(null, '/customers/loantotal'),
  // 数据转化也写在这里， 这样就不用再组件里面写数据处理
  toSearch (data) {
    const len = data.length
    let arr = []
    for (let i = 0; i < len; i++) {
      arr.push({
        value: data[i].id,
        spell: data[i].spell,
        name: data[i].name,
        loan: data[i].loan,
        credit: data[i].credit,
        label: `${data[i].id} (${data[i].name})`
      })
    }
    return arr
  }
}
