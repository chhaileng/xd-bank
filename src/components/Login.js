import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';
import Alert from 'antd/lib/alert';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();

  const onFinish = (values) => {
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `username=${values.username}&password=${values.password}`,
    }).then(res => {
      if (res.redirected) {
        history.push('/')
      }
    })
  };

  return (
    <div style={{maxWidth: '400px', margin: 'auto'}}>
      <Typography.Title level={3}>Login to xD Bank</Typography.Title>
      <Alert style={{marginBottom: 20}}
        description="Use any unique username and any password. Nothing is stored or checked ^.^"
        type="info"
      />
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
} 