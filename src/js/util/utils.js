export default {
  isMobile () {
    let UA = window.navigator.userAgent
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(UA)) {
      return true
    } else {
      return false
    }
  },
  ctlInput: {
    /**
     * 获取当前光标所在行在原字符串中的起始位置(该行首字符位置)
     * @param {*} str 原字符串
     * @param {*} curLoc 光标位置
     */
    getRowStart (str, curLoc) {
      const rowStart = str.slice(0, curLoc).lastIndexOf('\n') + 1
      return rowStart
    },
    /**
     * 在字符串特定位置插入新字符串
     * @param {*} str 原字符串
     * @param {*} loc 插入位置
     * @param {*} newStr 新字符串
     */
    insert (str, loc, newStr) {
      return str.slice(0, loc) + newStr + str.slice(loc)
    },
    /**
     *
     * @param {*} inputObj 输入框对象, input或者textaera
     */
    toNexRow (inputObj) {
      const curLoc = inputObj.selectionStart
      const rowStart = this.getRowStart(inputObj.value, curLoc)
      const latterPartStr = inputObj.value.slice(rowStart, inputObj.value.length)
      const rowEnd = rowStart + latterPartStr.indexOf('\n')
      inputObj.setSelectionRange(rowEnd + 1, rowEnd + 1)
    }
  }
}
