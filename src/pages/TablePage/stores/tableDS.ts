import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';
import Record from 'choerodon-ui/pro/lib/data-set/Record';

// 推荐导出一个函数用于生成ds
// 这里传入了一个字段用来设置查询 以得到不用的数据 同时进行组件的复用
const getTableDSProps = (): DataSetProps => ({
  autoQuery: true, // 在创建成功后进行查询
  fields: [
    {
      name: 'serialNumber', // 字段名
      label: '单据编号', // 字段标签 可以在form或者table上生成对应的label
      type: FieldType.string, // 字段类型, 决定以什么组件进行渲染
    },
    {
      name: 'title',
      label: '标题',
      type: FieldType.string,
      required: true, // 是否必填
    },
    {
      name: 'description',
      label: '描述',
      type: FieldType.string,
    },
    {
      name: 'status',
      type: FieldType.boolean,
      label: '状态',
      trueValue: 1, // 配置 trueValue 可以使得一个boolean类型的真值不为true
      falseValue: 0, // 配置 falseValue 可以使得一个boolean类型的假值不为true
    },
    {
      name: 'operator',
      type: FieldType.string,
      label: '操作人',
    },
    {
      name: 'remark',
      type: FieldType.string,
      label: '备注',
    },
    {
      name: 'startTime',
      type: FieldType.date,
      label: '开始时间',
    },
    {
      name: 'endTime',
      type: FieldType.date,
      label: '结束时间',
    },
    {
      name: 'createTime',
      type: FieldType.dateTime,
      label: '创建时间',
    },
  ],
  queryFields: [
    {
      name: 'serialNumber',
      label: '单据编号',
      type: FieldType.string,
    },
    {
      name: 'title',
      label: '标题',
      type: FieldType.string,
    },

    {
      name: 'status',
      type: FieldType.number,
      label: '状态',
      // 设置 lookup 可以将一个文本框类型变成一个下拉框类型
      // 项目上更常见使用code
      lookupUrl: '/_api/standard-table/code/status',
    },
    {
      name: 'startTime',
      type: FieldType.date,
      label: '开始时间',
    },
    {
      name: 'endTime',
      type: FieldType.date,
      label: '结束时间',
      // 校验器 注意对于不会用到的但是在需要使用的属性之前的参数需要加下划线 _
      async validator(value, _name, record) {
        const startTime = (record as Record).get('startTime');
        if (startTime && value) {
          return startTime <= value ? true : '开始时间不能大于结束时间';
        }
        return true;
      },
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
