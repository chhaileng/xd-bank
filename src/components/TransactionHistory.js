import Statistic from 'antd/lib/statistic';
import Table from 'antd/lib/table';
import Typography from 'antd/lib/typography';
import { useTranslation } from 'react-i18next';

export default function TransactionHistory({ data = [] }) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('home.transaction.amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: amount => <Typography.Text type={amount > 0 ? 'success' : 'danger'}>
        {amount > 0 ? '+' : ''}{amount.toLocaleString('en-US', {maximumFractionDigits: 2})}
      </Typography.Text>
      ,
    },
    {
      title: t('home.transaction.to_from'),
      dataIndex: 'username',
      key: 'username',
      render: username => <Typography.Text style={{textTransform: 'uppercase'}}>{username}</Typography.Text>
    },
    {
      title: t('home.transaction.remark'),
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: t('home.transaction.balance'),
      key: 'balance',
      dataIndex: 'balance',
      render: balance => <Statistic prefix="$" value={balance} valueStyle={{fontSize: 'inherit'}} />
    }
  ];
  
  return(
    <Table columns={columns} dataSource={data} />
  )
}
