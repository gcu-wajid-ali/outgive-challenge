import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;

const ConfirmationModal = ({ title, description, itemId }: any) => {
  confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: description,

    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },

    onCancel() { },
  });
};

export default ConfirmationModal;