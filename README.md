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

[模块列表](https://open.hand-china.com/document-center/doc/product/10002/10329?doc_id=31531)

![image-20210525195300324](https://gitee.com/MellowCo/BlobImg/raw/master/20210525195300.png)



## 2 启动

### 1 启动项目

```shell
npm run start #通过api方式
npm run start:mock #通过mock方式
```

### 2 更改api地址

* 默认的api地址 http://hzero-backend.open-front.hand-china.com

  ![image-20210525203017676](https://gitee.com/MellowCo/BlobImg/raw/master/20210525203017.png)

* 在`src/config/.env.yml` 更改环境变量

```yml
API_HOST: http://hzero-backend.open-front.hand-china.com
# 更改开发的api地址
API_HOST: http://10.6.1.65:8080
```

### 3 404问题

![image-20210525211758831](https://gitee.com/MellowCo/BlobImg/raw/master/20210525211758.png)

* 1 配置子模块路由

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
npm run build:ms
```

![image-20210525213603385](https://gitee.com/MellowCo/BlobImg/raw/master/20210525213603.png)

* 3 以上选一种就行

### 4 创建子模块

```shell
hzero-cli g sm module-name
# 商城的用户模块
hzero-cli g sm wx-shop-user
```

![image-20210528215231585](https://gitee.com/MellowCo/BlobImg/raw/master/20210528215238.png)





### 4 生成页面模板

> 基于 [UmiJS - 插件化的企业级前端应用框架](https://umijs.org/zh-CN)

* 点击工具

![image-20210525203742448](https://gitee.com/MellowCo/BlobImg/raw/master/20210525203742.png)

* 选中资源，模板

> 模板 生成的是页面
>
> 区块 是在现有的页面，添加组件

![image-20210525203602013](https://gitee.com/MellowCo/BlobImg/raw/master/20210525203602.png)

* 填写路由信息

![image-20210530205814843](https://gitee.com/MellowCo/BlobImg/raw/master/20210530205821.png)

* 在pages下会生成页面文件

![image-20210530205938331](https://gitee.com/MellowCo/BlobImg/raw/master/20210530205938.png)

* 在`config/routers`下生成路由信息

![image-20210530210011369](https://gitee.com/MellowCo/BlobImg/raw/master/20210530210011.png)

* 效果

  ![image-20210530210028530](https://gitee.com/MellowCo/BlobImg/raw/master/20210530210028.png)

## 3 开发

> 修改生成的模板，创建用户信息页面

### 1 定义用户

> 新建 types/User.ts 用于定义类型

```ts
export interface IUser {
  id: string;
  name: string;
  desc: string;
  mobile: string;
  birthday: string;
}

export interface IQueryUser extends IUser {
  page: number;
  size: number;
}

```

### 2 修改dataSet，数据源

> 修改 stores/tableDS.ts

```js
const getTableDSProps = (): DataSetProps => ({
  autoQuery: true, // 在创建成功后进行查询
  // 表格显示的字段
  fields: [
    {
      name: 'id',
      label: 'id',
      type: FieldType.number,
    },
    {
      name: 'name',
      label: '姓名',
      type: FieldType.string,
    },
    {
      name: 'desc',
      label: '描述',
      type: FieldType.string,
    },
    {
      name: 'mobile',
      type: FieldType.string,
      label: '电话',
    },
    {
      name: 'birthday',
      type: FieldType.date,
      label: '生日',
    },
  ],
  // 查询字段
  queryFields: [
    {
      name: 'id',
      label: '用户id',
      type: FieldType.number,
    },
    {
      name: 'name',
      label: '姓名',
      type: FieldType.string,
    },
    {
      name: 'mobile',
      type: FieldType.string,
      label: '电话',
    },
    {
      name: 'birthday',
      type: FieldType.date,
      label: '生日',
    },
  ],
  // 处理请求相关内容 此处用来做mock处理
  transport: {
    // 当使用ds.query()或者触发查询的时候可以调用的接口地址
    read: {
      url: '/_api/standard-table/query',
      method: 'get',
    },
    // 当使用ds.delete()或者触发删除的时候可以调用的接口地址
    destroy: {
      url: '/_api/standard-table/delete',
      method: 'delete',
    },
    // 当使用ds.submit()或者触发保存的时候可以调用的接口地址
    submit: {
      url: '/_api/standard-table/submit',
      method: 'post',
    },
  },
});
```

### 3 修改页面中组件

> 修改 components/TablePage.tsx

```tsx
<Table
    dataSet={tableDs!}
    buttons={[
        [
            TableButtonType.delete,
            {
                color: ButtonColor.default,
            },
        ],
    ]}
    queryFieldsLimit={3}
    pagination={{
        showPager: true,
    }}
    rowHeight={34}
    >
		<Column name="id" />
        <Column name="name" />
        <Column name="desc" />
        <Column name="mobile" />
        <Column name="birthday" />
    <Column header="操作" renderer={operatorsRenderer} width={230} />
</Table>
```

> 修改 EditDetail.tsx

```tsx
<Form disabled={readOnly} record={record}>
    {!isNew && <TextField name="id" disabled />}
    <TextField name="name" />
    <TextArea name="desc" />
    <TextField name="mobile" />
    <DatePicker name="birthday" />
</Form>
```

### 4 修改mock文件

> _mock.ts

[Mock.js (mockjs.com)](http://mockjs.com/)

* 遍历生成

```ts
import { IQueryUser, IUser } from './types/User';

const getFakeList = (req: Request, res: Response) => {
  const result: IUser[] = [];

  const params = req.query as Partial<IQueryUser>;

  const { size = 10 } = params;

  for (let i = 0; i < size; i++) {
    result.push({
      id: Mock.Random.id(),
      name: Mock.Random.cname(),
      desc: Mock.Random.csentence(),
      mobile: Mock.Random.integer(),
      birthday: Mock.Random.date(),
    });
  }

  return res.json({
    content: result,
    success: true,
    totalElements: size * 10,
  });
};
```

* 模板生成

```ts
const fakeListTemlate = {
  success: '@boolean',
  totalElements: '@integer(60, 100)',
  'content|10': [
    {
      id: '@id',
      name: '@cname',
      desc: '@csentence',
      mobile: '@integer',
      birthday: '@date',
    },
  ],
};

const getFakeList = Mock.mock(fakeListTemlate);
```

![image-20210530212738715](https://gitee.com/MellowCo/BlobImg/raw/master/20210530212738.png)

