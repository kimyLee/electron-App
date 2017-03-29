/**
 * Created by duoyi on 2017/3/24.
 */
function init (data) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(data)
    }, 50)
  })
}
export default {
  getTodo () {
    return init([
      {val: '做事情22323', checked: true},
      {val: '做事情1232323', checked: true}
    ])
  }
}
