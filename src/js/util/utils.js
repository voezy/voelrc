export default {
  /**
   * 判断是否为移动客户端
   */
  isMobile () {
    let UA = window.navigator.userAgent
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(UA)) {
      return true
    } else {
      return false
    }
  },
  /**
   * 生成下载
   * @param {string} filename 文件名
   * @param {*} content 文件内容
   */
  genDownLoad (filename, content) {
    let link = document.createElement('a')
    let blobObj = new Blob([content], {type: 'text/plain'})
    link.download = filename
    link.href = URL.createObjectURL(blobObj)
    link.click()
    URL.revokeObjectURL(blobObj)
  },
  /**
   * 将秒数转换为lrc时间标签中 [mm:ss.xx] 的格式
   * @param {number} sec
   */
  genTimestamp (sec) {
    let timestamp
    // latterSec是不足1分钟部分
    let mm, ss, xx, latterSec

    mm = Math.floor(sec / 60)
    latterSec = sec - mm * 60
    ss = Math.floor(latterSec)
    xx = Math.round((latterSec - ss) * 100)

    if ((mm + '').length === 1) {
      mm = '0' + mm
    }

    if ((ss + '').length === 1) {
      ss = '0' + ss
    }

    if ((xx + '').length === 1) {
      xx += '0'
    }

    timestamp = '[' + mm + ':' + ss + '.' + xx + ']'

    return timestamp
  },
  /**
   * 包含一些处理input组件和字符串的方法
   */
  ctlInput: {
    /**
     * 获取当前光标所在行在原字符串中的起始位置(该行首字符位置)
     * @param {object} inputObj 原输入框对象
     */
    getRowStart (inputObj) {
      let str = inputObj.value
      let curLoc = inputObj.selectionStart
      let rowStart = str.slice(0, curLoc).lastIndexOf('\n') + 1

      return rowStart
    },
    /**
    * 获取当前光标所在行在原字符串中的结束位置(该行后方换行符位置)
    * @param {object} inputObj 原输入框对象
    */
    getRowEnd (inputObj) {
      const rowStart = this.getRowStart(inputObj)
      const latterPartStr = inputObj.value.slice(rowStart, inputObj.value.length)
      const rowEnd = rowStart + latterPartStr.indexOf('\n')

      if (rowEnd === -1) {
        return 0
      } else {
        return rowEnd
      }
    },
    /**
     * 获取输入框光标所在行(行数从0开始)
     * @param {object} inputObj 输入框对象(input或textarea)
     */
    getCurrRow (inputObj) {
      const rowStart = this.getRowStart(inputObj)
      const matchRS = inputObj.value.slice(0, rowStart).match(/\n/g)
      let currRow
      if (matchRS && matchRS.length) {
        currRow = matchRS.length
      } else {
        currRow = 0
      }

      return currRow
    },
    /**
     * 获取输入框内字符串行数(包括只含回车符的空行)
     * @param {object} inputObj
     */
    getTotalRowNum (inputObj) {
      return inputObj.value.split('\n').length
    },
    /**
     * 在字符串特定位置插入新字符串
     * @param {string} str 原字符串
     * @param {number} loc 插入位置
     * @param {string} insertWords 新字符串
     */
    insert (str, loc, insertWords) {
      return str.slice(0, loc) + insertWords + str.slice(loc)
    },
    /**
     * 在原字符串指定行的开头处加入新字符串
     * @param {string} str 原字符串
     * @param {number} rowNum 要插入第几行(行数从0开始)
     * @param {string} insertWords 要插入的新字符串
     */
    insertToRowStart (str, rowNum, insertWords) {
      // 根据回车符进行分行
      let subStrArr = str.split('\n')
      let newStr = ''
      // 插入新字符串到指定行
      subStrArr[rowNum] = insertWords + subStrArr[rowNum]

      for (let i = 0; i < subStrArr.length; i++) {
        // 最后一行不加回车符
        newStr += i === subStrArr.length - 1 ? subStrArr[i] : subStrArr[i] + '\n'
      }

      return newStr
    },
    /**
     * 聚焦到输入框某一行的开头处
     * @param {object} inputObj 输入框对象
     * @param {number} rowNum 行数
     */
    focusInRowStart (inputObj, rowNum) {
      let subStrArr = inputObj.value.split('\n')
      let formerLength = 0

      for (let i = 0; i <= rowNum; i++) {
        formerLength += subStrArr[i].length + 1
      }

      inputObj.focus()
      inputObj.setSelectionRange(formerLength, formerLength)
    }
  }
}
