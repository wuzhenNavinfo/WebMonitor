import Main from '@/components/Main'
import Query from '@/components/Query'

let routes = [
  {
    path: '/',
    component: Main,
    name: 'Main' // name需要保持唯一,通过router.push({name:'Login'})方式切换路由
  },{
    path: '/query',
    component: Query,
    name: 'Query' // name需要保持唯一,通过router.push({name:'Login'})方式切换路由
  }
];

export default routes;
