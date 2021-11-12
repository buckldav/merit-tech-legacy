import React, { useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Breadcrumb, Layout, Typography, Form, Input, Button } from "antd";
const { Title } = Typography;
import { SERVER_URL } from "../../Constants";
import axios from "axios";

const HelpQueue = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    axios.post(SERVER_URL + "/api/help-queue/", values).then((res) => {
      console.log(res.data.id);
      window.location.href = window.location.href + "/" + res.data.id;
    });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Help Queue</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Title>Help Queue</Title>
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name.",
              },
            ]}
            wrapperCol={{
              span: 8,
            }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Question"
            name="question"
            rules={[
              {
                required: true,
                message: "Please input your question.",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default HelpQueue;
