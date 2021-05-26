import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router
  {
    path: '/demo-test/hello',
    component: () => import('../pages/hello/HelloDemoTestPage'),
    authorized: true,
    title: 'Hello DemoTest',
  },
];

export default config;
