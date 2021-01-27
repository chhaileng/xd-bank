import React from 'react'
import PageHeader from 'antd/lib/page-header'
import Button from 'antd/lib/button'
import Tooltip from 'antd/lib/tooltip'
// import Badge from 'antd/lib/badge'
import message from 'antd/lib/message'
import { LockTwoTone } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom'

export default function Header({ user }) {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const logout = React.useCallback(() => {
    setLoading(true);
    fetch('/logout', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
    }).then(res => {
      setLoading(false)
      if (res.redirected) {
        message.info('Account logged out')
        history.push('/login')
      }
    }).catch(e => {
      setLoading(false)
      message.error('An unknown error occurred.')
    })
  }, [setLoading, history])

  return (
    <PageHeader
      title={<Link to="/">xD Bank</Link>}
      tags={<Tooltip title="! Secure Bank by Zer0xdz"><LockTwoTone twoToneColor="#52c41a" /></Tooltip>}
      extra={ user ? [
        // <Badge key="inbox" count={2} size="small"><Tooltip title="Fake Inbox"><Button size="small" icon={<MailOutlined />} onClick={() => {history.push('/inbox')}}>Inbox</Button></Tooltip></Badge>,
        <Link key="faq" to="/faq" style={{marginRight: 12}}>FAQ</Link>,
        <Tooltip key="signout" title="Logout of Account"><Button size="small" danger onClick={logout} loading={loading}>Logout</Button></Tooltip>
      ] : [<Link key="faq" to="/faq" style={{marginRight: 12}}>FAQ</Link>]}
    >
    </PageHeader>
  )
}