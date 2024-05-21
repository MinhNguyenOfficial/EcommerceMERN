import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
const items = [
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'Users',
    // children: [
    //   {
    //     key: '11',
    //     label: 'Option 1',
    //   },
    //   {
    //     key: '12',
    //     label: 'Option 2',
    //   },
    //   {
    //     key: '13',
    //     label: 'Option 3',
    //   },
    //   {
    //     key: '14',
    //     label: 'Option 4',
    //   },
    // ],
  },
  {
    key: 'product',
    icon: <AppstoreOutlined />,
    label: 'Products',
    // children: [
    //   {
    //     key: '21',
    //     label: 'Option 1',
    //   },
    //   {
    //     key: '22',
    //     label: 'Option 2',
    //   },
    //   {
    //     key: '23',
    //     label: 'Submenu',
    //     children: [
    //       {
    //         key: '231',
    //         label: 'Option 1',
    //       },
    //       {
    //         key: '232',
    //         label: 'Option 2',
    //       },
    //       {
    //         key: '233',
    //         label: 'Option 3',
    //       },
    //     ],
    //   },
    // ],
  },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

//---------------------------------------------------------------

export default function AdminPage() {
  const [selectedKey, setSelectedKey] = useState();
  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return <AdminUser />;
      case 'product':
        return <AdminProduct />;
      default:
        return <>Welcome to admin dashboard</>;
    }
  };
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };
  const handleClick = ({ key }) => {
    setSelectedKey(key);
  };
  return (
    <div className="flex h-screen">
      <Menu
        className="h-screen"
        mode="inline"
        defaultSelectedKeys={['231']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={items}
        onClick={handleClick}
      />
      <div className='w-full'>{renderPage(selectedKey)}</div>
    </div>
  );
}
