import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';

const getTableDSProps = (): DataSetProps => ({
  autoQuery: true, // 在创建成功后进行查询
  // 表格显示的字段
  fields: [
    {
      name: 'id',
      label: '员工编号',
      type: FieldType.string,
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

export default getTableDSProps;
