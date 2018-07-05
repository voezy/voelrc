import Vue from 'vue'
import App from '../App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'

import {
  Button,
  Row,
  Col,
  Container,
  Main,
  Header,
  Radio,
  RadioGroup,
  RadioButton,
  Form,
  FormItem,
  Input,
  Upload,
  Tooltip,
  Tabs,
  TabPane,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.use(VueRouter)

let vm = new Vue({
  components: {
    App
  },
  template: '<App/>'
})
vm.$mount('#app')
