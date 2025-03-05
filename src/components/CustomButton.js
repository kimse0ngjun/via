import { Button } from 'antd';

const CustomButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default CustomButton;
