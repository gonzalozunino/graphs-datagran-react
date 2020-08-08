import React, { useState, useEffect } from "react";
import api from "../api";
import { Row, Col, Spin, Table } from "antd";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postsByUser, setPostsByUser] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [selectedUserId, setUserId] = useState("");
  const [selectedPostId, setPostId] = useState("");

  const postColumns = [
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      onCell: ({ userId }) => {
        return {
          onClick: () => setUserId(userId),
        };
      },
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      onCell: ({ id }) => {
        return {
          onClick: () => setPostId(id),
        };
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
  ];

  const postsByUserColumns = [
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
  ];

  const postCommentsColumns = [
    {
      title: "PostId",
      dataIndex: "postId",
      key: "postId",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await api.get("/posts");

      setTimeout(() => {
        setPosts(posts.data);
      }, 2500);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPostsByUser = async () => {
      const posts = await api.get("/posts", {
        userId: selectedUserId,
      });

      setPostsByUser(posts.data);
    };

    fetchPostsByUser();
  }, [selectedUserId]);

  useEffect(() => {
    const fetchPostsComments = async () => {
      const posts = await api.get(`/posts/${selectedPostId}/comments`);

      setPostComments(posts.data);
    };

    fetchPostsComments();
  }, [selectedPostId]);

  return (
    <>
      <Row>
        {!posts.length && (
          <Col span={24} align="middle" justify="center">
            <Spin size="large" />
          </Col>
        )}

        {posts.length > 0 && (
          <Col span={24}>
            <Table columns={postColumns} dataSource={posts} />
          </Col>
        )}

        {postsByUser.length > 0 && (
          <Col span={24}>
            <Table columns={postsByUserColumns} dataSource={postsByUser} />
          </Col>
        )}

        {postComments.length > 0 && (
          <Col span={24}>
            <Table columns={postCommentsColumns} dataSource={postComments} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default Posts;
