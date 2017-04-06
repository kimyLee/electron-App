/**
 * Created by kimmy on 2017/4/4.
 */
export default {
  goTarget (target) {
    if (target[0] === '!') {
      document.querySelector('#' + target.substring(1) + ' input').focus()
    } else {
      document.getElementById(target).focus()
    }
  }
}
