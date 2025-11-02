// src/components/EditProfile.js
import React, { useState } from 'react';
import { Layout, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SideBar from './SideBar';
import '../styles/EditProfile.styles.css';

const { Content } = Layout;

function EditProfile() {
  const [form] = Form.useForm();
  const [profilePicture, setProfilePicture] = useState(null);

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    // Here you would typically send the form data to your backend
    // and handle the profile picture upload.
  };

  const handleProfilePictureChange = (info) => {
    if (info.file.status === 'done') {
      // You can store the file info or URL here.
      setProfilePicture(info.file);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Layout className="edit-profile-layout">
      <SideBar />
      <Layout className="edit-profile-content-layout">
        <Content className="edit-profile-content">
          <div className="edit-profile-container">
            <Form
              form={form}
              name="editProfile"
              onFinish={onFinish}
              layout="vertical"
              className="edit-profile-form"
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your email!' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="bio"
                label="Bio"
                rules={[{ message: 'Please input your bio!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Profile Picture">
                <Upload
                  name="avatar"
                  listType="picture"
                  showUploadList={false}
                  onChange={handleProfilePictureChange}
                >
                  <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                </Upload>
                {profilePicture && (
                  <img
                    src={URL.createObjectURL(profilePicture.originFileObj)}
                    alt="profile"
                    style={{ width: '100px', marginTop: '10px' }}
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default EditProfile;