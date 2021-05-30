import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  {
    path: '/user-info',
    component: () => import('../pages/UserInfoPage'),
    models: [],
    title: '用户信息',
    authorized: true,
  },
  {
    path: '/wx-shop-user/hello',
    component: () => import('../pages/hello/HelloWxShopUserPage'),
    authorized: true,
    title: 'Hello WxShopUser',
  },
];
export default config;
