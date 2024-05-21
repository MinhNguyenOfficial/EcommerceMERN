import { useSelector } from 'react-redux';
import InputForm from '../../components/InputForm/InputForm';
import { useState, useEffect } from 'react';
import * as UserService from '../../services/UserService';
import { message, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';

export default function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleUpdate = async () => {
    const userUpdatedData = { email, name, phone, address, avatar };
    const res = await UserService.updateUser(user?.id, userUpdatedData);
    if (res.status === 'OK') {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  const handleChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setAvatar(file.preview);
  };
  return (
    <div className="w-[1270px] mx-auto">
      <h1 className="text-xl my-1">Thông tin người dùng</h1>
      <div className="flex flex-col mx-auto w-[700px] gap-5 border-[#ccc] items-center p-5 rounded-xl border">
        <div className="flex gap-3 items-center w-[350px]">
          <p>Email</p>
          <InputForm value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex gap-3 items-center w-[350px]">
          <p>Name</p>
          <InputForm value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex gap-3 items-center w-[350px]">
          <p>Phone</p>
          <InputForm value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="flex gap-3 items-center w-[350px]">
          <p>Address</p>
          <InputForm
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex gap-3 items-center w-[350px]">
          <p>Avatar</p>
          <Upload maxCount={1} onChange={handleChangeAvatar}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          {avatar && (
            <img src={avatar} alt="" className="h-16 w-16 rounded-full" />
          )}
        </div>
        <Button onClick={handleUpdate} type="primary">
          Update
        </Button>
      </div>
    </div>
  );
}
