import Main from '@/components/Main'

let routes = [
  {
    path: '/',
    component: Main,
    name: 'Main' // name需要保持唯一,通过router.push({name:'Login'})方式切换路由
  },
];

export default routes;
