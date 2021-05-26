## 1安装

### 1 cli全局环境

```shell
npm install -g hzero-cli --registry http://nexus.saas.hand-china.com/content/groups/hzero-npm-group # 安装 HZERO-CLI 工具
```

### 2 创建项目

```shell
hzero-cli new sample # 创建 HZERO 前端项目
```

### 3 选择版本号，正式版

![image-20210525195103437](https://gitee.com/MellowCo/BlobImg/raw/master/20210525195110.png)

### 4 选择功能模块

![image-20210525195300324](https://gitee.com/MellowCo/BlobImg/raw/master/20210525195300.png)

 [每个功能模块对应的api接口文档]([用户相关API (hand-china.com)](https://open.hand-china.com/hzero-docs/v1.3/zh/docs/service/iam/user/))

![image-20210525195347539](https://gitee.com/MellowCo/BlobImg/raw/master/20210525195347.png)

## 2 开发

### 1 启动项目

```shell
yarn start #通过api方式
yarn start:mock #通过mock方式
```

### 2 更改api地址

* 默认的api地址 http://hzero-backend.open-front.hand-china.com

  ![image-20210525203017676](https://gitee.com/MellowCo/BlobImg/raw/master/20210525203017.png)

* 在`src/config/.env.yml` 更改环境变量

```yml
API_HOST: http://hzero-backend.open-front.hand-china.com
# 更改开发的api地址
API_HOST: 103.1.1.6
```

### 3 404问题

![image-20210525211758831](https://gitee.com/MellowCo/BlobImg/raw/master/20210525211758.png)

* 1 配置路由

  * 在`src/utils/getModuleRouters.js` 添加模块的路由

  ```js
  import { getModuleRouters } from 'utils/utils';
  // 模块路由
  import * as hzeroFrontHpfmRouters from 'hzero-front-hpfm/lib/utils/router';
  import * as hzeroFrontHiamRouters from 'hzero-front-hiam/lib/utils/router';
  
  export default app => getModuleRouters(app, 
  [hzeroFrontHpfmRouters, hzeroFrontHiamRouters]);
  ```

* 2 将模块打包的子模块中，运行`build:ms`，选择模块

```shell
yarn build:ms
```

![image-20210525213603385](https://gitee.com/MellowCo/BlobImg/raw/master/20210525213603.png)

* 3 以上选一种就行

### 4 生成页面模板

> 基于 [UmiJS - 插件化的企业级前端应用框架](https://umijs.org/zh-CN)

* 点击工具

![image-20210525203742448](https://gitee.com/MellowCo/BlobImg/raw/master/20210525203742.png)

* 选中资源，模板

> 模板 生成的是页面
>
> 区块 是在现有的页面，添加组件

![image-20210525203602013](https://gitee.com/MellowCo/BlobImg/raw/master/20210525203602.png)

* 填写信息

![image-20210525204254820](https://gitee.com/MellowCo/BlobImg/raw/master/20210525204254.png)

* 在pages下会生成页面文件

![image-20210525204552222](https://gitee.com/MellowCo/BlobImg/raw/master/20210525204552.png)

* 在`config/routers`下生成路由信息

![image-20210525204718037](https://gitee.com/MellowCo/BlobImg/raw/master/20210525204718.png)

