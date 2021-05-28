import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router
  {
    path: '/wx-shop-user/hello',
    component: () => import('../pages/hello/HelloWxShopUserPage'),
    authorized: true,
    title: 'Hello WxShopUser',
  },
];

export default config;
