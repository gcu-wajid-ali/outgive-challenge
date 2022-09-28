import { Layout, Menu } from 'antd';
import { MENU_ITEMS } from '../../constants/constants';
import './Header.css';

const { Header } = Layout;

const PageHeader = () => {
    const selectedMenu = 'home';

    return (
        <Header className='header'>
            <Menu
                theme="dark"
                mode="horizontal"
                items={MENU_ITEMS}
                selectedKeys={[selectedMenu]}
            />
        </Header>
    )
};

export default PageHeader;
