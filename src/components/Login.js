import React, { useCallback } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';
import Alert from 'antd/lib/alert';
import message from 'antd/lib/message';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false)
  const { t } = useTranslation();

  const onFinish = useCallback((values) => {
    setLoading(true)
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `username=${values.username}&password=${values.password}`,
    }).then(res => {
      setLoading(false)
      if (res.redirected) {
        message.success(t('login.message.success'))
        history.push('/')
      } else {
        message.error(t('login.message.failed'))
      }
    }).catch(e => {
      setLoading(false)
      message.error(t('message.error'))
    })
  }, [setLoading, history, t]);

  return (
    <div style={{maxWidth: '400px', margin: 'auto'}}>
      <Typography.Title level={3}>{t('login.header')}</Typography.Title>
      <Alert style={{marginBottom: 20}}
        description={t('login.info')}
        type="info"
      />
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={{
          // eslint-disable-next-line
          required: t('login.validate.required'),
          string: {
            // eslint-disable-next-line
            max: t('login.validate.string.max'),
          },
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, max: 10 }]}
        >
          <Input prefix={<UserOutlined />} placeholder={t('login.username')} autoCapitalize="none" autoCorrect="off" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password
            autoCapitalize="none" autoCorrect="off" 
            prefix={<LockOutlined />}
            type="password"
            placeholder={t('login.password')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>{t('login.login')}</Button>
        </Form.Item>
      </Form>
    </div>
  )
} 