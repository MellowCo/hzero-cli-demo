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

## 2 启动

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

* 效果

  ![image-20210526205241947](https://gitee.com/MellowCo/BlobImg/raw/master/20210526205249.png)

## 3 开发

> 修改生成的模板，创建员工管理页面，有查询表格+新建、编辑、详情等操作

### 1 预定员工的基础信息

```json
{
  "id": "number",
  "name": "string",
  "desc": "string",
  "charger": "string",
  "date": "Date"
}
```

> 新建 types/Employee.ts 用于定义类型

```ts
export interface IEmployee {
  id: string;
  name: string;
  desc: string;
  charger: string;
  date: string;
}

export interface IQueryEmployee {
  id?: string;
  name?: string;
  charger?: string;
  date?: string;
  page?: number;
  size?: number;
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
      label: '员工编号',
      type: FieldType.number,
    },
    {
      name: 'name',
      label: '员工姓名',
      type: FieldType.string,
    },
    {
      name: 'desc',
      label: '员工描述',
      type: FieldType.string,
    },
    {
      name: 'charger',
      type: FieldType.string,
      label: '主管姓名',
    },
    {
      name: 'date',
      type: FieldType.date,
      label: '入职时间',
    },
  ],
  // 查询字段
  queryFields: [
    {
      name: 'id',
      label: '员工编号',
      type: FieldType.number,
    },
    {
      name: 'name',
      label: '员工姓名',
      type: FieldType.string,
    },
    {
      name: 'charger',
      type: FieldType.string,
      label: '主管姓名',
    },
    {
      name: 'date',
      type: FieldType.date,
      label: '入职时间',
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
    <Column name="charger" />
    <Column name="date" />
    <Column header="操作" renderer={operatorsRenderer} width={230} />
</Table>
```

> 修改 EditDetail.tsx

```tsx
<Form disabled={readOnly} record={record}>
    {!isNew && <TextField name="id" disabled />}
    <TextField name="name" />
    <TextArea name="desc" />
    <TextField name="charger" />
    <DatePicker name="date" />
</Form>
```

### 4 修改mock文件

> _mock.ts

[Mock.js (mockjs.com)](http://mockjs.com/)

* 遍历生成

```ts
import { IEmployee, IQueryEmployee } from './types/Employee';

const getFakeList = (req: Request, res: Response) => {
  const result: IEmployee[] = [];

  const params = req.query as IQueryEmployee;

  const { size = 10 } = params;

  for (let i = 0; i < size; i++) {
    result.push({
      id: Mock.Random.id(),
      name: Mock.Random.cname(),
      desc: Mock.Random.csentence(),
      charger: Mock.Random.cname(),
      date: Mock.Random.date(),
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
      id: '111',
      name: '@cname',
      desc: '@csentence',
      charger: '@cname',
      date: '@date',
    },
  ],
};

const getFakeList = Mock.mock(fakeListTemlate);
```

