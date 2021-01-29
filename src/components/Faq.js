import React from 'react';
import Typography from 'antd/lib/typography'
import Collapse from 'antd/lib/collapse'
import Input from 'antd/lib/input'
import Space from 'antd/lib/space'
import Alert from 'antd/lib/alert'
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const faqs = [
  {
    q: 'What is xD Bank?',
    a_html: 'It is a small application that does some trasfering money like a bank.'
  },
  {
    q: 'For what it is made?',
    a_html: 'I made this application for security demonstration purpose.'
  },
  {
    q: 'What vulnerabilities on this website?',
    a_html: 'Actually I made this for demonstration about XSS and CSRF.'
  },
  {
    q: 'Is it safe to use this application?',
    a_html: 'YES! user information in this application is not stored or checked. Users and sessions are stored on memory and got reset when Heroku Dyno go to sleep.'
  },
  {
    q: 'How to access to application source code?',
    a_html: 'The source code of this application is availble on <a href="https://github.com/chhaileng/xd-bank">GitHub</>.'
  },
  {
    q: 'About',
    a_html: 'Made by Chhaileng'
  },
]


export default function Faq() {
  const history = useHistory();
  const location = useLocation();
  const [searchText, setSearchText] = React.useState('')
  const { t } = useTranslation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  const onSearch = value => {
    history.push(`/faq?q=${encodeURIComponent(value.trim())}`)
  }

  const filtered = query ? faqs.filter(faq => {
    const matchedQuestion = faq.q.toLowerCase().includes(query.toLowerCase())
    const tmpSpan = document.createElement('span')
    tmpSpan.innerHTML = faq.a_html
    const matchedAnswer = tmpSpan.innerText.toLowerCase().includes(query.toLowerCase())
    return matchedQuestion || matchedAnswer
  }) : faqs;

  React.useEffect(() => {
    query && setSearchText(query)
  }, [setSearchText, query])
  
  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Typography.Title level={5}>{t('faq.header')}</Typography.Title>
      <Input.Search 
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={t('faq.search_placeholder')}
        onSearch={onSearch} 
        value={searchText} enterButton />
      <p style={{fontSize: 15}}>
        <span dangerouslySetInnerHTML={{__html: query ? `${t('faq.show_search_result')} "${query}"` : t('faq.show_all_faqs')}} />
      </p>
      {
        filtered.length > 0 ? (
          <Collapse accordion>
            {filtered.map((faq, index) => 
              <Collapse.Panel header={faq.q} key={index+1}>
                <div style={{width: '100%'}} dangerouslySetInnerHTML={{__html: faq.a_html}} />
              </Collapse.Panel>
            )}
          </Collapse>
        ) : (
          <p>{t('faq.no_result')}</p>
        )
      }
      <Alert style={{marginBottom: 20}}
        description={t('faq.warning')}
        type="warning"
      />
    </Space>
  )
} 