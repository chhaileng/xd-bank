import React from 'react';
import Button from 'antd/lib/button';
import Statistic from 'antd/lib/statistic';
import Row from 'antd/lib/row';
import Space from 'antd/lib/space';
import Typography from 'antd/lib/typography';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Alert from 'antd/lib/alert';
import message from 'antd/lib/message';
import crypto from 'crypto';
import { useTranslation } from "react-i18next";

import TransactionHistory from './TransactionHistory';

const randomHash = () => crypto.randomBytes(10).toString('hex');

export default function Home({ user, setUser }) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleTransfer = (values) => {
    setConfirmLoading(true);
    fetch('/transfer', {
      method: 'post',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `username=${values.username}&amount=${values.amount}&remark=${values.remark}`,
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          const updatedUser = res.user;
          setUser(updatedUser);
          message.success(t('home.message.transfer_success'))
          setVisible(false);
          form.resetFields();
        } else {
          message.error(res.error)
        }

        setConfirmLoading(false);
      })
      .catch(e => {
        message.error(t('message.error'))
        setVisible(false);
        setConfirmLoading(false);
      });
  }

  // add unique key to array
  const transactions = user ? user.transactions.map(t => ({ ...t, key: randomHash()})) : []
  transactions.reverse()

  return user ? (
    <>
    <Space size="middle" direction="vertical" style={{width: '100%'}}>
      <Row>
        <Statistic title={t('home.account_name')} value={user.username} style={{ textTransform: 'uppercase' }} />
        <Statistic title={t('home.balance')} prefix="$" value={user.balance} style={{  margin: '0 32px', textTransform: 'uppercase' }} />
      </Row>
      <Row>
        <Button size="small" type="primary" onClick={showModal}>{t('home.transfer')}</Button>
        
      </Row>
      <Typography.Title level={5}>{t('home.transaction_history')}</Typography.Title>
      <TransactionHistory data={transactions} />
    </Space>
    <Modal
        title={t('home.form.transfer')}
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        maskClosable={false}
        okText={t('home.form.transfer')}
        cancelText={t('home.form.cancel')}
        okButtonProps={{form: 'form-transfer', key: 'submit', htmlType: 'submit'}}
      >
        <Alert style={{marginBottom: 20}}
          description={t('home.form.info')}
          type="info"
        />
        <Form labelCol={{span: 5}} wrapperCol={{span: 18}} validateMessages={{
            // eslint-disable-next-line
            required: t('home.form.validate.required'),
            types: {
              // eslint-disable-next-line
              number: t('home.form.validate.types.number'),
            },
            number: {
              // eslint-disable-next-line
              range: t('home.form.validate.number.range')
            },
            string: {
              // eslint-disable-next-line
              max: t('home.form.validate.string.max')
            }
          }} 
          form={form} onFinish={handleTransfer}>
          <Form.Item name="username" label={t('home.form.account')} rules={[{ required: true, max: 10 }]}>
            <Input placeholder={t('home.form.account_placeholder')} autoCapitalize="none" autoCorrect="off" />
          </Form.Item>
          <Form.Item name="amount" label={t('home.form.amount')} rules={[{ required: true, type: 'number', min: 1, max: 10000 }]}>
            <InputNumber placeholder={t('home.form.amount_placeholder')} style={{width: '100%'}} />
          </Form.Item>
          <Form.Item name="remark" label={t('home.form.remark')}>
            <Input placeholder={t('home.form.remark_placeholder')} />
          </Form.Item>
        </Form>
        <Alert style={{marginBottom: 20}}
          description={t('home.form.warning')}
          type="warning"
        />
      </Modal>
    </>
  ) : (
    ''
  )
} 