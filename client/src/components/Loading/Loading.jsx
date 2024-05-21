import { Spin } from 'antd';

export default function Loading({ children, isLoading = false, delay = 200 }) {
  return (
    <Spin spinning={isLoading} delay={delay}>
      {children}
    </Spin>
  );
}
