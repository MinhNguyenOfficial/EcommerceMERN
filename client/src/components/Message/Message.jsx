import { message } from 'antd';

const succsess = (content = 'Success') => {
  message.success(content);
};

const error = (content = 'Error') => {
  message.error(content);
};

const warning = (content = 'Warning') => {
  message.warning(content);
};

export { succsess, error, warning };
