import { Table } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

export default function TableComponent(props) {
  const { selectionType = 'checkbox', data, columns } = props;
  return (
    <Table
      {...props}
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
    />
  );
}
