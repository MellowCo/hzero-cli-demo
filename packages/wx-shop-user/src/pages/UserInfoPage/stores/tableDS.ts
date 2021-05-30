import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';

// 推荐导出一个函数用于生成ds
// 这里传入了一个字段用来设置查询 以得到不用的数据 同时进行组件的复用
const getTableDSProps = (): DataSetProps => ({
  autoQuery: true, // 在创建成功后进行查询
  fields: [
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

export default getTableDSProps;
