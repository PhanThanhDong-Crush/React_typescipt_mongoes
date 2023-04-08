import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { IProduct, IProductDetail } from "../types/interface";
import { Avatar, Button, Card, Divider, Form, Image, Input, Layout, Skeleton, Switch } from "antd";
import { Link, useParams } from "react-router-dom";
import { EditOutlined, EllipsisOutlined, GitlabOutlined, LoadingOutlined, PartitionOutlined, SearchOutlined, SendOutlined, SettingOutlined } from "@ant-design/icons";
import { apiAllPro } from "../api/product";

const { Meta } = Card;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface IProp {
    products: IProduct[]
}
export const ProductDetail = (prop: IProp) => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProductDetail>();

    useEffect(() => {
        setProduct(prop.products.find((pro: IProductDetail) => pro._id == id))
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values: any) => {

    };

    return (
        <React.Fragment>
            <Content style={{
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: '#fff',
            }}>

                <div className="item" style={{ width: "100%", margin: "0px auto 100px auto" }}>
                    <Image src={product?.image} width={"100%"} />
                    <Divider orientation="left" orientationMargin="0" style={{ textAlign: "left", color: "red" }}>
                        <Link to={"/product/" + product?._id}><h2><GitlabOutlined /> {product?.name}</h2></Link>
                        <h3><span style={{ color: "black" }}><PartitionOutlined /> {product?.categoryId.name}</span> - {product?.price}</h3>
                    </Divider>
                    <p style={{ width: 700, textAlign: "left", lineHeight: "30px", color: "black" }}><LoadingOutlined /> {product?.desc}</p>
                </div>
                <hr />
                <div className="comments">
                    <Card style={{ width: "300px", textAlign: "left" }}>
                        <Meta
                            avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                    <Form
                        {...Layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{ maxWidth: "800px", display: "flex", marginTop: "50px" }}
                    >
                        <Form.Item name="content" rules={[{ required: true }]}>
                            <Input placeholder="Content " />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: "-60px" }}>
                                <SendOutlined />
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </React.Fragment >
    )
}