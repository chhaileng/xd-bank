import React, { useCallback } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';
import Alert from 'antd/lib/alert';
import message from 'antd/lib/message'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false)

  const onFinish = useCallback((values) => {
    setLoading(true)
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `username=${values.username}&password=${values.password}`,
    }).then(res => {
      setLoading(false)
      if (res.redirected) {
        message.success('Login success')
        history.push('/')
      } else {
        message.error('Login failed')
      }
    }).catch(e => {
      setLoading(false)
      message.error('An unknown error occurred.')
    })
  }, [setLoading, history]);

  return (
    <div style={{maxWidth: '400px', margin: 'auto'}}>
      <Typography.Title level={3}>xD Bank Login</Typography.Title>
      <Alert style={{marginBottom: 20}}
        description="Use any unique username and any password. Nothing is checked. Your user will be stored in memory and removed after 3 hours ^.^"
        type="info"
      />
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={{
          // eslint-disable-next-line
          required: 'Please input your ${name}',
          string: {
            // eslint-disable-next-line
            max: 'Limit to ${max} characters only',
          },
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, max: 10 }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
        </Form.Item>
      </Form>
    </div>
  )
} 