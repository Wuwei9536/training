import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../page/hello.vue'
import GoodList from '../components/goodList/goodList.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Hello,
      children:[
        {
          path: '/',
          name: 'goodList',
          component: GoodList,
        },
        {
          path: '/1',
          name: 'goodList1',
          component: GoodList,
        },
        {
          path: '/2',
          name: 'goodList2',
          component: GoodList,
        },
        {
          path: '/3',
          name: 'goodList3',
          component: GoodList,
        },
        {
          path: '/4',
          name: 'goodList4',
          component: GoodList,
        }
      ]
    }
  ]
})
