import TableComponent from '../TableComponent/TableComponent';
import { Button, Form, Upload, Modal, message, Input, Space } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import { getBase64, isJsonString } from '../../utils';
import * as UserServive from '../../services/UserService';
import Loading from '../Loading/Loading';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

export default function AdminUser() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    isAdmin: false,
    phone: '',
  });
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const getAllUser = async () => {
    const storageData = localStorage.getItem('access_token');
    if (!storageData || !isJsonString(storageData)) {
      throw new Error('No token found');
    }
    const tokenData = JSON.parse(storageData);
    const res = await UserServive.getAllUser(tokenData);
    setUsers(res.data);
    console.log(res);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'True',
          value: 'True',
        },
        {
          text: 'False',
          value: 'False',
        },
      ],
      onFilter: (value, record) => value === record.isAdmin,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: () => (
        <DeleteOutlined
          // onClick={handleDeleteProductClick}
          className="text-red-600 text-2xl"
        />
      ),
    },
  ];

  const tableData =
    users?.length &&
    users.map((user) => ({
      ...user,
      key: user._id,
      isAdmin: user.isAdmin ? 'True' : 'False',
    }));

  return (
    <div>
      <h1>Quản lý user</h1>
      <Button type="primary">Add Admin</Button>
      <div className="mt-5">
        <TableComponent
          data={tableData}
          columns={columns}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => {
          //       setSelectedRow(record._id);
          //     },
          //   };
          // }}
        />
      </div>
      {/* <ProductModal
        isLoading={isLoading}
        isModalOpen={isModalOpen}
        handleOk={isEditProduct ? handleUpdateProduct : handleAddProduct}
        handleCancel={handleCancel}
        product={product}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        isEditProduct={isEditProduct}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={'Confirm'}
        content={`Are you want to delete product: ${product.name}?`}
        onOk={handleDeleteProduct}
        onCancel={() => setIsConfirmModalOpen(false)}
      /> */}
    </div>
  );
}
