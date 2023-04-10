import React, { useEffect, useState } from "react";
import { ICategory, IProduct } from "../../types/interface";
import { Space, Table, Button, Image, Popconfirm, message, Menu, Form, Input, Layout, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from "react-router-dom";
import { DownCircleOutlined, PieChartOutlined, PlusOutlined, SearchOutlined, UpCircleOutlined } from "@ant-design/icons";
import { apiAllPro } from "../../api/product";

interface IProp {
    products: IProduct[]
    categories: ICategory[],
    filterCategory: (_id: any) => void
    deleteProduct: (_id: any) => void
    BigMall: () => void
    MallBig: () => void
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
export const Products = (prop: IProp) => {
    const [data, setData] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    useEffect(() => {
        setData(prop.products.map((pro: IProduct) => {
            return { ...pro, key: pro._id }
        }));
        setCategories(prop.categories);
    }, [prop])


    const confirm = () => {
        message.info('Clicked on Yes.');
    };

    const OnClickDelete = (_id: any) => {
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            prop.deleteProduct(_id)
        }
    }

    const BigMallProducts = () => {
        prop.BigMall();
    }
    const MallBigProducts = () => {
        prop.MallBig()
    }
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
            setData(searchProduct);
        }
    };

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (<Image
                width={200}
                src={image}
            />)
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Category',
            dataIndex: 'categoryId.name',
            key: 'categoryId.name',
            render: (_, record) => <p>{record.categoryId.name}</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" danger onClick={() => OnClickDelete(record._id)}>Delete</Button>
                    <Link to={'/admin/products/' + record._id} ><Button type="primary">Edit</Button></Link>
                </Space>
            ),
        },
    ];

    return (
        <React.Fragment>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1>
                    Products
                    <span style={{ fontSize: 20, margin: "0 20px" }} onClick={() => BigMallProducts()}><UpCircleOutlined /></span>
                    <span style={{ fontSize: 20 }} onClick={() => MallBigProducts()}><DownCircleOutlined /></span>
                </h1>
                <Menu style={{ display: "flex", fontSize: "12px" }}>
                    <Menu.Item key={0} style={{ paddingBottom: "50px" }}>
                        <p style={{ color: "red" }} onClick={() => load()}>Category</p>
                    </Menu.Item>
                    {categories.map((cate: ICategory) => {
                        return (
                            <Menu.Item key={cate._id} onClick={() => filterCategory(cate._id)} style={{ paddingBottom: "50px" }}>
                                <p style={{ color: "gray" }}>{cate.name}</p>
                            </Menu.Item>
                        )
                    })}
                </Menu>
                <Link to={"/admin/products/add"} ><Button type="primary" shape="circle"><PlusOutlined /></Button></Link>
            </div>
            <Divider orientation="left" orientationMargin="0" style={{ textAlign: "left", color: "red" }}>
                <Form
                    {...Layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 110, display: "flex", marginBottom: "30px" }}
                >
                    <Form.Item name="name" rules={[{ required: true }]}>
                        <Input placeholder="Search name " />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: "-60px" }}>
                            <SearchOutlined />
                        </Button>
                    </Form.Item>
                </Form>
            </Divider>
            <Table columns={columns} dataSource={data} />
        </React.Fragment>
    )
}