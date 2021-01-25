import React from 'react';
import { Typography, Collapse, Input, Space } from 'antd';
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const faqs = [
  {
    q: 'What is xD Bank?',
    a: 'It is a small application made for web security demonstration purpose.'
  },
  {
    q: 'For what it is made?',
    a: 'As I mentioned it is for demonstration purpose only. Do not use it for real since there are a lot of security bugs on this application.'
  },
  {
    q: 'What vulnerabilities on this website?',
    a: 'Actually it is made for XSS and CSRF demo purpose. So it has these vulerabilities.'
  },
  {
    q: 'Is it safe to use this application?',
    a: 'Yes'
  },
  {
    q: 'What is xD Bank?',
    a: 'It is a very secure banking. LOL'
  },
  {
    q: 'What is xD Bank?',
    a: 'It is a very secure banking. LOL'
  },
  {
    q: 'What is xD Bank?',
    a: 'It is a very secure banking. LOL'
  },
  {
    q: 'What is xD Bank?',
    a: 'It is a very secure banking. LOL'
  },
  {
    q: 'What is xD Bank?',
    a: 'It is a very secure banking. LOL'
  },
  {
    q: 'Can I get the source code of this application?',
    a: 'Of cause, the source code of xD Banking is here'
  },
]


export default function Faq() {
  const onSearch = value => console.log(value);
  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Typography.Title level={5}>FAQs</Typography.Title>
      <Input.Search placeholder="input search text" onSearch={onSearch} enterButton />
      <Typography.Title level={5}>Show all FAQs</Typography.Title>
      <Collapse onChange={callback} accordion>
        {faqs.map((faq, index) => 
          <Panel header={faq.q} key={index+1}>
            <p>{faq.a}</p>
          </Panel>
        )}
      </Collapse>
    </Space>
  )
} 