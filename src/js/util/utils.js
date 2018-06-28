export default {
  isMobile () {
    let UA = window.navigator.userAgent
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(UA)) {
      return true
    } else {
      return false
    }
  }
}
