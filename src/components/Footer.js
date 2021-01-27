import { Link } from 'react-router-dom'
import Layout from 'antd/lib/layout'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'

export default function Footer() {
  return (
    <Layout.Footer>
      <Row>
        <Col flex="none">© Copyright xD Bank | 2021</Col>
        <Col flex="auto" style={{textAlign: 'right'}}>
          <Space size="middle">
            <a href="https://github.com/chhaileng/xd-bank" target="_blank" rel="noopener noreferrer">Source Code</a>
            <Link to="/faq">FAQ</Link>
          </Space>
        </Col>
      </Row>
    </Layout.Footer>
  )
}