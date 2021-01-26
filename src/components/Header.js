import PageHeader from 'antd/lib/page-header'
import Button from 'antd/lib/button'
import Tooltip from 'antd/lib/tooltip'
import Badge from 'antd/lib/badge'
import { LockTwoTone , MailOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom'

export default function Header({ user }) {
  const history = useHistory();
  
  const logout = () => {
    fetch('/logout', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
    }).then(res => {
      if (res.redirected) {
        history.push('/')
      }
    })
  }

  return (
    <PageHeader
      title={<Link to="/">xD Bank</Link>}
      tags={<Tooltip title="! Secure Bank by Zer0xdz"><LockTwoTone twoToneColor="#52c41a" /></Tooltip>}
      extra={ user ? [
        <Badge key="inbox" count={2} size="small"><Tooltip title="Fake Inbox"><Button size="small" icon={<MailOutlined />} onClick={() => {history.push('/inbox')}}>Inbox</Button></Tooltip></Badge>,
        <Tooltip key="signout" title="Logout of Account"><Button size="small" danger onClick={logout}>Logout</Button></Tooltip>
      ] : []}
    >
    </PageHeader>
  )
}