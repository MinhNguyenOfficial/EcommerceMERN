import { Table, Button } from 'antd';
import { useState } from 'react';

export default function TableComponent(props) {
  const { selectionType = 'checkbox', data, columns, handleDelete } = props;
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows.map((selectedRow) => selectedRow._id));
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  console.log(selectedRows);
  return (
    <>
      <div className="h-10">
        {selectedRows.length > 0 && (
          <Button type="primary" onClick={() => handleDelete(selectedRows)}>
            Delete
          </Button>
        )}
      </div>
      <Table
        {...props}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
}
