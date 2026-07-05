import '../App.css'
import { useAuthentication } from '../context/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Avatar, Space } from 'antd';
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

export default function Header() {
    const useStyles = createStyles(({ token }) => ({
        root: {
            backgroundColor: token.colorFillAlter,
            border: `1px solid ${token.colorBorder}`,
            borderRadius: token.borderRadius,
        },
    }));
    const menuStyles = {
        root: {
            backgroundColor: '#fff',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
        },
        item: {
            padding: '8px 12px',
            fontSize: '14px',
        },
        itemTitle: {
            fontWeight: '500',
        },
        itemIcon: {
            color: '#1890ff',
            marginInlineEnd: '8px',
        },
        itemContent: {
            backgroundColor: 'transparent',
        },
    };
    const navigate = useNavigate();
    const authenticate = useAuthentication();
    const items = [
        {
            key: '1',
            label: (<a onClick={() => navigate('/settings')}>Settings</a>),
            icon: <SettingOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: (<a onClick={() => authenticate.logoutAction()}>Logout</a>),
            icon: <LogoutOutlined />,
            danger: true,
        }]

    const { styles } = useStyles();
    const sharedProps = {
        menu: { items },
        placement: 'bottomRight',
        classNames: { root: styles.root },
    };

    return(
        <div className='header'>
            <div className='logo' onClick={()=>navigate("/")}>MyFinance</div>
            {authenticate.token && 
                <Dropdown {...sharedProps} styles={menuStyles} triger={'click'}>
                    <Space wrap size={16}>
                        <Avatar shape="square" size="large" icon={<UserOutlined />} />
                    </Space>
                </Dropdown> 
            }
            
        </div>
    )
}