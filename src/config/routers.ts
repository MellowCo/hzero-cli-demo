import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const routerConfig: RoutersConfig = [
  {
    path: '/table-page',
    component: () => import('../pages/TablePage'),
    models: [],
    title: '基础表格',
    authorized: true,
  }, // Insert New Router
  {
    path: '/hzero-boot/test1',
    component: () => import('../pages/test1/Test1Page'),
    authorized: true,
    title: '区块测试页',
  },
];
export default routerConfig;
