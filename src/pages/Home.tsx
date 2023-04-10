import { Alert, Spin, Watermark } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React from "react";

const userJson: any = localStorage.getItem('user');
const user = JSON.parse(userJson);

export const HomePage = () => {
    return (
        <React.Fragment>
            <Content style={{
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: '#fff',
            }}>
                <Spin tip="Loading...">
                    <Watermark
                        height={30}
                        width={130}
                        image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
                    >
                        <h1 style={{ fontSize: "40px", fontWeight: 900, color: "black" }}>Hello <span style={{ color: "red", }}>{user ? user?.name : "?"}</span></h1>
                        <div style={{ height: 370 }} />
                    </Watermark>
                </Spin>
            </Content>
        </React.Fragment>
    )
}