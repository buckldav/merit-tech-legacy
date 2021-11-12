import React, { useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Breadcrumb, Layout, Typography, Form, Input, Button } from "antd";
const { Title } = Typography;
import { SERVER_URL } from "../../Constants";
import axios from "axios";

const HelpQueueManager = (props) => {
  const [token, setToken] = useState("");

  const onFinish = (values) => {
    console.log("Success:", values);
    axios.post(SERVER_URL + "/api-auth/login/", values).then((res) => {
      console.log(res.data);
    });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Help Queue Manager</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Title>Help Queue Manager</Title>
        {!token ? (
          <>
            <p>Please log in to manage the queue.</p>
            <Form
              name="help"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username.",
                  },
                ]}
                wrapperCol={{
                  span: 8,
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password.",
                  },
                ]}
                wrapperCol={{
                  span: 8,
                }}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <p>View QUEUE</p>
        )}
      </Content>
    </Layout>
  );
};

export default HelpQueueManager;
