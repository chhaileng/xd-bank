import React from 'react';
import Button from 'antd/lib/button'
import Statistic from 'antd/lib/statistic'
import Row from 'antd/lib/row'
import Space from 'antd/lib/space'
import Typography from 'antd/lib/typography'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import Alert from 'antd/lib/alert'
import message from 'antd/lib/message'

import crypto from 'crypto';

import TransactionHistory from './TransactionHistory';

const randomHash = () => crypto.randomBytes(10).toString('hex');

export default function Home({ user, setUser }) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

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
          message.success('Transfer success')
          setVisible(false);
          form.resetFields();
        } else {
          message.error(res.error)
        }

        setConfirmLoading(false);
      })
      .catch(e => {
        message.error('An unknown error occurred.')
        setVisible(false);
        setConfirmLoading(false);
      });
  }

  const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required',
    types: {
      // eslint-disable-next-line
      number: '${label} is not a valid number',
    },
    number: {
      // eslint-disable-next-line
      range: '${label} must be between ${min} and ${max}',
    },
  };

  // const data = [
    // {
    //   transaction_id: ''
    //   amount: 12,
    //   username: 'sok',
    //   remark: 'Breakfast',
    //   balance: 23222,
    // },
    // {
    //   amount: -43,
    //   username: 'sao',
    //   remark: 'Dinner',
    //   balance: 20001.3,
    // },
    // {
    //   amount: 20000,
    //   username: 'xd_bank',
    //   remark: 'Initial Balance',
    //   balance: 2000,
    // },
  // ];

  // add unique key to array
  const transactions = user ? user.transactions.map(t => ({ ...t, key: randomHash()})) : []
  transactions.reverse()

  return user ? (
    <>
    <Space size="middle" direction="vertical" style={{width: '100%'}}>
      <Row>
        <Statistic title="Account Name" value={user.username} style={{ textTransform: 'uppercase' }} />
        <Statistic title="Balance" prefix="$" value={user.balance} style={{  margin: '0 32px', textTransform: 'uppercase' }} />
      </Row>
      <Row>
        <Button size="small" type="primary" onClick={showModal}>Transfer</Button>
        
      </Row>
      <Typography.Title level={5}>Transaction History</Typography.Title>
      <TransactionHistory data={transactions} />
    </Space>
    <Modal
        title="Transfer"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        maskClosable={false}
        okText="Transfer"
        okButtonProps={{form: 'form-transfer', key: 'submit', htmlType: 'submit'}}
      >
        <Alert style={{marginBottom: 20}}
          description="You can transfer to a known account or just a random account. ^^"
          type="info"
        />
        <Form labelCol={{span: 4}} wrapperCol={{span: 19}} validateMessages={validateMessages} form={form} onFinish={handleTransfer}>
          <Form.Item name="username" label="Account" rules={[{ required: true }]}>
            <Input placeholder="Account name (put anything)" />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, type: 'number', min: 1, max: 10000 }]}>
            <InputNumber placeholder="Amount to transfer" style={{width: '100%'}} />
          </Form.Item>
          <Form.Item name="remark" label="Remark">
            <Input placeholder="Remark (optional)" />
          </Form.Item>
        </Form>
        <Alert style={{marginBottom: 20}}
          description="Warning: This page is vulnerable to CSRF attacks!"
          type="warning"
        />
      </Modal>
    </>
  ) : (
    ''
  )
} 