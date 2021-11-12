import React, { useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Breadcrumb, Layout, Typography } from "antd";
import axios from "axios";
import { SERVER_URL } from "../../Constants";
const { Title } = Typography;

const HelpQueueDetail = (props) => {
  const [queueInfo, setQueueInfo] = useState(null);
  const [queuePosition, setQueuePosition] = useState(-1);
  const [counter, setCounter] = useState(null);
  const API_URL = SERVER_URL + "/api/help-queue/" + props.match.params.id + "/";

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setQueueInfo(res.data);
      setCounter(
        Math.round((new Date() - new Date(res.data.timestamp)) / 1000)
      );
    });

    axios
      .get(API_URL + "get_queue_position/")
      .then((res) => setQueuePosition(res.data.position));
  }, []);

  useEffect(() => {
    counter && setTimeout(() => setCounter(counter + 1), 1000);
    if (counter % 5 == 0) {
      // every 5 seconds, poll bc I'm too lazy to implement websockets
      axios
        .get(API_URL + "get_queue_position/")
        .then((res) => setQueuePosition(res.data.position))
        .catch((res) => {
          // redirect to help queue form
          window.location.href = window.location.href.replace(
            "/" + props.match.params.id,
            ""
          );
        });
    }
  }, [counter]);

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
        {queueInfo ? (
          <>
            <p>{queueInfo.name}</p>
            <p>{queueInfo.question}</p>
          </>
        ) : null}
        <p>You are in position {queuePosition} in the queue.</p>
        <p>
          Time Waiting: {new Date(counter * 1000).toISOString().substr(11, 8)}
        </p>
      </Content>
    </Layout>
  );
};

export default HelpQueueDetail;
