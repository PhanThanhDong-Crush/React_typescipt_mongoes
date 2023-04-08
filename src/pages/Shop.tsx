import { Alert, Button, Col, Divider, Form, Image, Input, Layout, Pagination, Row, Watermark } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { ICategory, IProduct } from "../types/interface";
import { Link } from "react-router-dom";
import { Menu, Switch } from 'antd';
import type { MenuTheme } from 'antd/es/menu';
import { PieChartOutlined, SearchOutlined } from '@ant-design/icons';

interface IProp {
    products: IProduct[],
    categories: ICategory[],
    filterCategory: (id: number) => void
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
export const Shop = (prop: IProp) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        setProducts(prop.products);
        setCategories(prop.categories);
    }, [prop]);

    const [theme, setTheme] = useState<MenuTheme>('light');

    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };

    const filterCategory = (_id: any) => {
        prop.filterCategory(_id);
    }

    const load = () => {
        location.reload()
    }

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const Products = prop.products;
        const searchProduct = Products.filter(pro => pro.name.toLocaleLowerCase().includes(values.name.toLocaleLowerCase()));
        if (searchProduct.length == 0) {
            alert(`There are no products with the name - ${values.name} `);
        }
        else {
            setProducts(searchProduct);
        }
    };

    return (
        <React.Fragment>
            <Sider>
                <Menu style={{ width: "100%", height: "100%" }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    theme={theme}
                    mode="inline"
                >
                    <Menu.Item key={1} icon={<PieChartOutlined />} onClick={() => load()}>
                        <h5 style={{ color: "red" }}>All</h5>
                    </Menu.Item>
                    {categories.map((cate: ICategory) => {
                        return (
                            <Menu.Item key={cate._id} icon={<PieChartOutlined />} onClick={() => filterCategory(cate._id)}>
                                <h5>{cate.name}</h5>
                            </Menu.Item>
                        )
                    })}
                    <p style={{ color: "dark", marginLeft: "25px" }}> <Switch onChange={changeTheme} style={{ width: "20px" }} />Change Style</p>
                </Menu>

            </Sider>
            <Content style={{
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: '#fff',
            }}>
                <Form
                    {...Layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 300, display: "flex", marginLeft: "1000px", marginBottom: "30px" }}
                >
                    <Form.Item name="name" rules={[{ required: true }]}>
                        <Input placeholder="Name Pro ?" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            <SearchOutlined />
                        </Button>
                    </Form.Item>
                </Form>
                <Row>
                    {products.map((pro: IProduct) => {
                        return (
                            <Col className="gutter-row" span={6}>
                                <Image src={pro.image} width={200} />
                                <h2 style={{ marginTop: "-20px" }}><Link to={"/product/" + pro._id}>{pro.name}</Link></h2>
                            </Col>
                        )
                    })}
                </Row>
                <Pagination defaultCurrent={1} total={50} />
            </Content>
        </React.Fragment>
    )
}