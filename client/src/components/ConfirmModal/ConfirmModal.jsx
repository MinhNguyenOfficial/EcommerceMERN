import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

export default function ConfirmModal({
  title,
  content,
  onOk,
  onCancel,
  isOpen,
}) {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
    >
      <p>{content}</p>
    </Modal>
  );
}
