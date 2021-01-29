import React from 'react';
import PageHeader from 'antd/lib/page-header';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import message from 'antd/lib/message';
import { LockTwoTone, GlobalOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function Header({ user }) {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const { t, i18n } = useTranslation();

  const logout = React.useCallback(() => {
    setLoading(true);
    fetch('/logout', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
    }).then(res => {
      setLoading(false)
      if (res.redirected) {
        message.info(t('message.logout'))
        history.push('/login')
      }
    }).catch(e => {
      setLoading(false)
      message.error(t('message.error'))
    })
  }, [setLoading, history, t])

  const languageMenus = (
    <Menu>
      <Menu.Item style={{textAlign: 'center'}} onClick={() => i18n.changeLanguage('km')}>{t('header.khmer')}</Menu.Item>
      <Menu.Item style={{textAlign: 'center'}} onClick={() => i18n.changeLanguage('en')}>{t('header.english')}</Menu.Item>
    </Menu>
  )

  const defaultMenus = [
    <Dropdown key="lang" overlay={languageMenus} placement="bottomCenter">
      <Button icon={<GlobalOutlined />} type="text">{i18n.language === 'km' ? t('header.khmer') : t('header.english')}</Button>
    </Dropdown>,
  ]

  return (
    <PageHeader
      title={<Link to={user ? '/' : '/login'}>xD Bank</Link>}
      tags={<Tooltip title={t('header.secure_bank')}><LockTwoTone twoToneColor="#52c41a" /></Tooltip>}
      extra={ user ? [
        ...defaultMenus,
        <Tooltip key="signout" title={t('header.logout_description')}><Button size="small" danger onClick={logout} loading={loading}>{t('header.logout')}</Button></Tooltip>
      ] : [...defaultMenus]}
    >
    </PageHeader>
  )
}