import React, { useState } from "react";
import { Layout, Space } from 'antd';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AimOutlined, ContactsOutlined, HomeOutlined, LogoutOutlined, ShopOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const { Header, Footer } = Layout;

const userJson: any = localStorage.getItem('user');
const user = JSON.parse(userJson);


const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    location.reload();
};

const sign: any = {
    label: 'Sign',
    key: 'SubMenu',
    icon: <UserOutlined />,
    children: [
        {
            label: (
                <Link to={"/sign_in"}>Sign In</Link>
            ),
            icon: <ContactsOutlined />,
            key: '3',
        },
        {
            label: (
                <Link to={"/sign_up"}>Sign Up</Link>
            ),
            icon: <UserAddOutlined />,
            key: '4',
        },
    ],
}

const item: MenuProps['items'] = [
    {
        label: (
            <Link to={"/"}>Home</Link>
        ),
        icon: <HomeOutlined />,
        key: '1',
    },
    {
        label: (
            <Link to={"/shop"}>Shop</Link>
        ),
        icon: <ShopOutlined />,
        key: '2',
    },

    (!user) ? sign : {
        label: (
            <Link to={"/"} onClick={() => handleLogout()}>Logout</Link>
        ),
        icon: <LogoutOutlined />,
        key: '9',
    },

    (user && user.role == "admin") ? {
        label: (
            <Link to={"/admin"}></Link>
        ),
        icon: <AimOutlined />,
        key: '5',
    } : "",
];

export const Client = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <React.Fragment>
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                    <Header style={{
                        textAlign: 'center',
                        color: '#fff',
                        paddingInline: 0
                    }}>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={item} style={{ width: '100%' }} />
                    </Header>
                    <Layout>
                        <Outlet />
                    </Layout>
                    <Footer style={{
                        textAlign: 'center',
                        color: 'black',
                    }}>Phan Thanh Dong - dongptph 28020 - edu.fpt.vn </Footer>
                </Layout>
            </Space>
        </React.Fragment>
    )
}
