import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { IComment, IProduct, IProductDetail } from "../types/interface";
import { Avatar, Button, Card, Divider, Form, Image, Input, Layout } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GitlabOutlined, LoadingOutlined, PartitionOutlined, SendOutlined } from "@ant-design/icons";
import { apiAllPro, apiGetOneProDetail } from "../api/product";

const { Meta } = Card;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const userJson: any = localStorage.getItem('user');
const user = JSON.parse(userJson);

interface IProp {
    products: IProduct[]
    addCommet: (comment: any) => void
}
export const ProductDetail = (prop: IProp) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>();
    const [comments, setComments] = useState<any>();

    useEffect(() => {
        apiAllPro().then(({ data }) => setProduct(data.find((pro: IProductDetail) => pro._id == id)));
        apiGetOneProDetail(id).then(({ data }) => setComments(data.comments))
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        if (user) {
            const time = new Date();
            const comment = {
                content: values.content,
                times: time,
                productId: id,
                userId: user._id
            }
            prop.addCommet(comment);
            location.reload();
        }
        else {
            const confirm = window.confirm("You need to be logged in to make comments");
            if (confirm) {
                navigate("/sign_in");
            }
        }
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
                    {comments ? (comments.map((cm: any) => {
                        return (
                            <Card style={{ width: "400px", textAlign: "left" }} key={cm._id}>
                                <Meta
                                    avatar={<Avatar src={cm.userId.image} style={{ width: "50px", height: "50px" }} />}
                                    title={cm.userId.name}
                                    description={`${cm.content} - ${cm.times}`}

                                />
                            </Card>
                        )
                    })) : ""}
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