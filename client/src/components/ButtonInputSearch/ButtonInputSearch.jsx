import ButtonComponent from '../ButtonComponent/ButtonComponent';
import InputComponent from '../InputComponent/InputComponent';
import { SearchOutlined } from '@ant-design/icons';

export default function ButtonInputSearch(props) {
  const {
    size,
    placeholder,
    textbutton = 'Search',
    bordered,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(13, 92, 182)',
    colorButton = '#fff',
  } = props;
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
      className="w-[400px]"
    >
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{
          background: backgroundColorButton,
          border: !bordered && 'none',
        }}
        icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  );
}
