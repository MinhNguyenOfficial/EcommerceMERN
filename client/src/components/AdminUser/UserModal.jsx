import { Button, Form, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FormInput from '../FormInput/FormInput';
import Loading from '../Loading/Loading';

export default function UserModal({
  isModalOpen,
  handleOk,
  handleCancel,
  product,
  handleImageChange,
  handleInputChange,
  isEditProduct = false,
  isLoading = false,
}) {
  return (
    <Modal
      title={isEditProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
      open={isModalOpen}
      onOk={handleOk}
      okText={isEditProduct ? 'Lưu sản phẩm' : 'Thêm sản phẩm'}
      onCancel={handleCancel}
    >
      <Loading isLoading={isLoading}>
        <form action="" className="flex flex-col gap-5">
          <FormInput
            label={'Name'}
            onChange={handleInputChange}
            value={product.name}
            name="name"
          />
          <FormInput
            label={'Price'}
            onChange={handleInputChange}
            value={product.price}
            name="price"
          />
          <FormInput
            label={'Description'}
            onChange={handleInputChange}
            value={product.description}
            name="description"
          />
          <FormInput
            label={'Type'}
            onChange={handleInputChange}
            value={product.type}
            name="type"
          />
          <FormInput
            label={'Stock'}
            onChange={handleInputChange}
            value={product.countInStock}
            name="countInStock"
          />

          <div className="flex w-full justify-between items-center">
            <label htmlFor="">Image</label>
            <Upload maxCount={1} name="image" onChange={handleImageChange}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>
          {product.image && <img src={product.image} alt="" />}
        </form>
      </Loading>
    </Modal>
  );
}
