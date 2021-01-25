import React from 'react';
import { Button, Statistic, Row, Space, Typography, Modal } from 'antd';

import TransactionHistory from './TransactionHistory';

export default function Home({ user }) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
 
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const data = [
    {
      key: '1',
      amount: 12,
      username: 'sok',
      remark: 'Breakfast',
      balance: 23222,
    },
    {
      key: '2',
      amount: -43,
      username: 'sao',
      remark: 'Dinner',
      balance: 20001.3,
    },
    {
      key: '3',
      amount: 20000,
      username: 'xd_bank',
      remark: 'Initial Balance',
      balance: 2000,
    },
  ];

  return user ? (
    <>
    <Space size="middle" direction="vertical" style={{width: '100%'}}>
      <Row>
        <Statistic title="Account Name" value={user.username} style={{ textTransform: 'uppercase' }} />
        <Statistic title="Balance" prefix="$" value={user.money} style={{ margin: '0 32px' }} />
      </Row>
      <Row>
        <Button size="small" type="primary" onClick={showModal}>Transfer</Button>
        
      </Row>
      <Typography.Title level={5}>Transaction History</Typography.Title>
      <TransactionHistory data={data} />
    </Space>
    <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  ) : (
    ''
  )
} 