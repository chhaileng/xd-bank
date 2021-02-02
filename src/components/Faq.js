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
    en: {
      q: 'What is xD Bank?',
      a_html: 'It is a small application that does some trasfering money like a bank.'
    },
    km: {
      q: 'អ្វីទៅជា xD Bank?',
      a_html: 'វាជាកម្មវិធីតូចមួយ ដែលអាចធ្វើការផ្ញើប្រាក់បាន ដូចជាធនាគាដែរ ។'
    }
  },
  {
    en: {
      q: 'For what it is made?',
      a_html: 'I made this application for security demonstration purpose.'
    },
    km: {
      q: 'តើវាបង្កើតឡើងដើម្បីអ្វី?',
      a_html: 'ខ្ញុំបង្កើតកម្មវិធីនេះដើម្បីធ្វើបទបង្ហាញពីចន្លោះប្រហោង និងសុវត្ថិភាពនៃកម្មវិធី ។'
    }
  },
  {
    en: {
      q: 'What vulnerabilities on this website?',
      a_html: 'Actually I made this for demonstration about XSS and CSRF.'
    },
    km: {
      q: 'តើមានចន្លោះប្រហោងអ្វីខ្លះនៅលើកម្មវិធីនេះ?',
      a_html: 'ខ្ញុំបង្កើតកម្មវិធីនេះឡើងដើម្បីបង្ហាញពីចន្លោះប្រហោះ និងគ្រោះថ្នាក់នៃ XSS និង CSRF ។'
    }
  },
  {
    en: {
      q: 'Is it safe to use this application?',
      a_html: 'YES! user information in this application is not stored or checked. Users and sessions are stored on memory and removed after 3 hours. Moreover, it is hosted on Heroku Free Dyno. So when the Dyno goes sleep, all data will be removed.'
    },
    km: {
      q: 'តើវាមានសុវត្ថិភាពទេក្នុងការប្រើប្រាស់កម្មវិធីនេះ?',
      a_html: 'បាទ! ព័ត៌មានរបស់អ្នកប្រើប្រាស់មិនត្រូវបានផ្ទុក ឬពិនិត្យទេ ។ គណនីអ្នកប្រើប្រាស់ និង sessions ត្រូវបានផ្ទុកនៅលើ memory និងត្រូវបានលុបចោលវិញនៅ ៣ ម៉ោងបន្ទាប់ ។ ម្យ៉ាងទៀត​កម្មវិធីនេះដំណើរការនៅលើ Heroku Free Dyno ដូចនេះរាល់ពេល Dyno sleep ព័ត៌មានផ្សេងៗនឹងត្រូវលុបចោល ។'
    }
  },
  {
    en: {
      q: 'How to access to application source code?',
      a_html: 'The source code of this application is availble on <a href="https://github.com/chhaileng/xd-bank">GitHub</a>.'
    },
    km: {
      q: 'តើធ្វើដូចម្តេចដើម្បីបានប្រភពកូដនៃកម្មវិធី?',
      a_html: 'ប្រភពកូដនៃកម្មវិធីនេះ មាននៅលើ <a target="_blank" ref="noopener noreferrer" href="https://github.com/chhaileng/xd-bank">GitHub</a> ។'
    }
  },
  {
    en: {
      q: 'About',
      a_html: 'Made by <a target="_blank ref="noopener noreferrer" href="https://www.chhaileng.com">Chhaileng</a>'
    },
    km: {
      q: 'អំពីកម្មវិធី',
      a_html: 'បង្កើតដោយ <a href="https://www.chhaileng.com">ឆ័យឡេង</a>'
    }
  },
]


export default function Faq() {
  const history = useHistory();
  const location = useLocation();
  const [searchText, setSearchText] = React.useState('')
  const { t, i18n } = useTranslation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  const onSearch = value => {
    history.push(`/faq?q=${encodeURIComponent(value.trim())}`)
  }

  const filtered = query ? faqs.filter(faq => {
    const matchedQuestionEn = faq.en.q.toLowerCase().includes(query.toLowerCase())
    const tmpSpan = document.createElement('span')
    tmpSpan.innerHTML = faq.en.a_html
    const matchedAnswerEn = tmpSpan.innerText.toLowerCase().includes(query.toLowerCase())
    const matchedQuestionKm = faq.km.q.toLowerCase().includes(query.toLowerCase())
    tmpSpan.innerHTML = faq.km.a_html
    const matchedAnswerKm = tmpSpan.innerText.toLowerCase().includes(query.toLowerCase())
    return matchedQuestionEn || matchedAnswerEn || matchedQuestionKm || matchedAnswerKm
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
              <Collapse.Panel header={faq[i18n.language].q} key={index+1}>
                <div style={{width: '100%'}} dangerouslySetInnerHTML={{__html: faq[i18n.language].a_html}} />
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