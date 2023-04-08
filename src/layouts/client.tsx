import React, { useState } from "react";
import { Layout, Space } from 'antd';
import { Link, Outlet } from "react-router-dom";
import { AimOutlined, ContactsOutlined, HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const items: MenuProps['items'] = [
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
    {
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
    },
    {
        label: (
            <Link to={"/admin"}></Link>
        ),
        icon: <AimOutlined />,
        key: '5',
    },
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
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ width: '100%' }} />
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
