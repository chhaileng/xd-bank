import { Statistic, Table, Typography } from 'antd';

export default function TransactionHistory({ data = [] }) {
  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: amount => <Typography.Text type={amount > 0 ? 'success' : 'danger'}>{amount > 0 ? '+' : ''}{amount}</Typography.Text>,
    },
    {
      title: 'To / From',
      dataIndex: 'username',
      key: 'username',
      render: username => <Typography.Text style={{textTransform: 'uppercase'}}>{username}</Typography.Text>
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Balance',
      key: 'balance',
      dataIndex: 'balance',
      render: balance => <Statistic prefix="$" value={balance} valueStyle={{fontSize: 'inherit'}} />
    }
  ];
  
  return(
    <Table columns={columns} dataSource={data} />
  )
}