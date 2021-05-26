import React, { FC, useContext } from 'react';
import { Table } from 'choerodon-ui/pro';
import { TableButtonType } from 'choerodon-ui/pro/lib/table/enum';
import { Renderer } from 'choerodon-ui/pro/lib/field/FormField';
// @ts-ignore
import { Button as ButtonPermission } from 'hzero-front/lib/components/Permission';
// @ts-ignore
import { operatorRender } from 'hzero-front/lib/utils/renderer';

import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import style from '../index.less';
import Store from '../stores';
import { handleDealWithRecord, handleLineDelete } from '../utils';

const { Column } = Table;

const TablePage: FC = () => {
  const { tableDs } = useContext(Store);

  /**
   * 操作列渲染器
   */
  const operatorsRenderer: Renderer = ({ record, dataSet }) => {
    const operators = [
      {
        key: 'edit',
        ele: (
          <ButtonPermission
            type="text"
            onClick={() => {
              handleDealWithRecord(dataSet!, record!);
            }}
          >
            编辑
          </ButtonPermission>
        ),
        len: 2,
        title: '编辑',
      },
      {
        key: 'delete',
        ele: (
          <ButtonPermission
            type="text"
            onClick={() => {
              handleLineDelete(dataSet!, record!);
            }}
          >
            删除
          </ButtonPermission>
        ),
        len: 2,
        title: '删除',
      },
      {
        key: 'detail',
        ele: (
          <ButtonPermission
            type="text"
            onClick={() => {
              // 对于弹窗方式可以这样写
              handleDealWithRecord(dataSet!, record!, true);
              // 如果跳转详情可以
              // history.push('detail-path');
            }}
          >
            详情
          </ButtonPermission>
        ),
        len: 2,
        title: '详情',
      },
    ];
    return operatorRender(operators, record, {
      limit: 3,
      label: '更多',
    });
  };

  return (
    <div className={style['table-wrapper']}>
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
    </div>
  );
};

export default TablePage;
