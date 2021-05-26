import React, { FC } from 'react';
import { Form, TextField, TextArea, DatePicker } from 'choerodon-ui/pro';

import Record from 'choerodon-ui/pro/lib/data-set/Record';

const EditDetail: FC<{
  record: Record;
  readOnly?: boolean;
  isNew?: boolean;
}> = props => {
  const { record, readOnly = false, isNew = false } = props;
  return (
    <div>
      <Form disabled={readOnly} record={record}>
        {!isNew && <TextField name="id" disabled />}
        <TextField name="name" />
        <TextArea name="desc" />
        <TextField name="charger" />
        <DatePicker name="date" />
      </Form>
    </div>
  );
};

export default EditDetail;
