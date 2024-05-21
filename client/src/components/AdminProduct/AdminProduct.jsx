import { Button, Form, Upload, Modal, message, Input, Space } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import { useEffect, useState, useRef } from 'react';
import { getBase64, isJsonString } from '../../utils';
import * as ProductServive from '../../services/ProductService';
import ProductModal from './ProductModal';
import Loading from '../Loading/Loading';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

export default function AdminProduct() {
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    type: '',
    countInStock: '',
    rating: '',
  });

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleAddProduct = async () => {
    const res = await ProductServive.createProduct(product);
    if (res.status === 'OK') {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
    setIsModalOpen(false);
    setIsEditProduct(false);
    setProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      countInStock: '',
      rating: '',
    });
    getAllProduct();
  };

  const handleUpdateProduct = async () => {
    const storageData = localStorage.getItem('access_token');
    if (!storageData || !isJsonString(storageData)) {
      throw new Error('No token found');
    }
    const tokenData = JSON.parse(storageData);
    const res = await ProductServive.updateProduct(
      selectedRow,
      product,
      tokenData
    ).then((res) => res.data);

    if (res.status === 'OK') {
      message.success(res.message);
    } else {
      message.error(res.message);
    }

    setIsModalOpen(false);
    setIsEditProduct(false);
    setSelectedRow(null);
    setProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      countInStock: '',
      rating: '',
    });
    getAllProduct();
  };

  const handleDeleteProduct = async () => {
    const storageData = localStorage.getItem('access_token');
    if (!storageData || !isJsonString(storageData)) {
      throw new Error('No token found');
    }
    const tokenData = JSON.parse(storageData);
    const res = await ProductServive.deleteProduct(selectedRow, tokenData).then(
      (res) => res.data
    );

    if (res.status === 'OK') {
      message.success(res.message);
    } else {
      message.error(res.message);
    }

    setIsConfirmModalOpen(false);
    setIsEditProduct(false);
    setSelectedRow(null);
    setProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      countInStock: '',
      rating: '',
    });
    getAllProduct();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleClickAddProduct = () => {
    setProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      countInStock: '',
      rating: '',
    });
    setIsModalOpen(true);
    setIsEditProduct(false);
  };

  const handleImageChange = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setProduct({
      ...product,
      image: file.preview,
    });
  };

  const getAllProduct = async () => {
    setIsLoading(true);
    const res = await ProductServive.getAllProduct().then((res) => res.data);
    setProducts(res);
    setIsLoading(false);
  };

  const getProductDetails = async () => {
    if (selectedRow) {
      setIsLoading(true);
      const productDetails = await ProductServive.getProductDetails(
        selectedRow
      ).then((res) => res.data);

      setProduct({
        name: productDetails.name,
        price: productDetails.price,
        description: productDetails.description,
        image: productDetails.image,
        type: productDetails.type,
        countInStock: productDetails.countInStock,
        rating: productDetails.rating,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [selectedRow]);

  const handleEditProductClick = async () => {
    if (selectedRow) {
      setSelectedRow(null);
      setIsModalOpen(true);
      setIsEditProduct(true);
    }
  };

  const handleDeleteProductClick = async () => {
    if (selectedRow) {
      setSelectedRow(null);
      setIsConfirmModalOpen(true);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
  };

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
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        {
          text: 'Programming',
          value: 'programming',
        },
        {
          text: 'Laptop',
          value: 'laptop',
        },
      ],
      onFilter: (value, record) => value === record.type,
    },
    {
      title: 'Stock',
      dataIndex: 'countInStock',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: () => (
        <div className="w-16 flex justify-between">
          <DeleteOutlined
            onClick={handleDeleteProductClick}
            className="text-red-600 text-2xl"
          />
          <EditOutlined
            onClick={handleEditProductClick}
            className="text-yellow-400 text-2xl"
          />
        </div>
      ),
    },
  ];

  const tableData =
    products?.length &&
    products.map((product) => ({ ...product, key: product._id }));

  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <Button type="primary" onClick={handleClickAddProduct}>
        Add Product
      </Button>
      <Loading isLoading={isLoading}>
        <div className="mt-5">
          <TableComponent
            data={tableData}
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setSelectedRow(record._id);
                },
              };
            }}
          />
        </div>
      </Loading>
      <ProductModal
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
      />
    </div>
  );
}
